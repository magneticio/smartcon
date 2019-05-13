using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Simulator.Client;
using Simulator.Simulations;

namespace Simulator
{
    class Program
    {
        public static async Task Main(string[] args)
        {
            var host = new HostBuilder()
                .ConfigureAppConfiguration((hostingContext, config) =>
                {
                    config.AddJsonFile("appsettings.json", optional: true);
                    config.AddEnvironmentVariables();

                    if (args != null)
                    {
                        config.AddCommandLine(args);
                    }
                })
                .ConfigureServices((hostContext, services) =>
                {
                    services.AddOptions();
                    services.Configure<SimulationOptions>(hostContext.Configuration.GetSection("Simulation"));
                    services.Configure<SmartConOptions>(hostContext.Configuration.GetSection("SmartCon"));

                    services.AddHostedService<SimulationService>();
                    services.AddHttpClient<SmartConClient>("smartcon", (s, c) =>
                    {
                        var o = s.GetRequiredService<IOptions<SmartConOptions>>().Value;
                        c.BaseAddress = new Uri(o.Url);
                        c.DefaultRequestHeaders.Add("Accept", "application/json");
                        c.DefaultRequestHeaders.Add("User-Agent", "SmartCon-Simulator");
                    });


                    // Simulations
                    services
                        .AddTransient<ISimulation, UserSimulation>();
                })
                .ConfigureHostConfiguration(configHost =>
                {
                    configHost.SetBasePath(Directory.GetCurrentDirectory());
                    configHost.AddJsonFile("hostsettings.json", optional: true);
                    configHost.AddEnvironmentVariables(prefix: "SMARTCON_");
                    configHost.AddCommandLine(args);
                })
                .ConfigureLogging((hostingContext, logging) =>
                {
                    logging.AddConfiguration(hostingContext.Configuration.GetSection("Logging"));
                    logging.AddConsole();
                })
                .Build();


            await host.RunAsync();
        }
    }
}
