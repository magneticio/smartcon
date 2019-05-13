using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Simulator
{
    public class SimulationService : IHostedService
    {

        private readonly ILogger _logger;
        private readonly SimulationOptions _options;
        private readonly IEnumerable<ISimulation> _simulations;

        public SimulationService(
            IEnumerable<ISimulation> simulations,
            ILogger<SimulationService> logger,
            IOptions<SimulationOptions> options)
        {
            _logger = logger;
            _options = options.Value;
            _simulations = simulations;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Simulation Starting");
            _logger.LogInformation("Simulation Started");

            var context = new SimulationContext();
            while (!cancellationToken.IsCancellationRequested)
            {
                await Task.Delay(1000 / _options.SimulationRate);
                if (!cancellationToken.IsCancellationRequested)
                {
                    await Task.WhenAll(_simulations.Select(sim => sim.RunAsync(context)));
                }
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Simulation Stopping");
            _logger.LogInformation("Simulation Stopped");
            return Task.CompletedTask;
        }
    }
}