using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Simulator.Client;

namespace Simulator.Simulations
{
    public class UserSimulation : ISimulation
    {

        private readonly ILogger _logger;
        private readonly SmartConClient _client;

        public UserSimulation(SmartConClient client, ILogger<UserSimulation> logger)
        {
            _client = client;
            _logger = logger;
        }

        public async Task RunAsync(SimulationContext context)
        {
            _logger.LogInformation("Get Sessions");
            var result = await _client.GetSessions();
            if (!result.Succeeded)
            {
                _logger.LogInformation("Failed: Get Sessions");
                return;
            }
            _logger.LogInformation($"Sessions: Version: [App: {result.Content.Version.App}]");

            var random = new Random();
            // Only discover sessions when version is 2.0
            if (result.Content.Version.App == "2.0")
            {
                await DiscoverSessions();
            }
            if (random.Next(0, 10) == 0)
            {
                await FavoriteSessions(5, result.Content);
            }
        }

        private async Task DiscoverSessions()
        {
            var random = new Random();
            var result = await _client.DiscoverSessions();
            if (!result.Succeeded)
            {
                _logger.LogInformation("Failed: Discover Sessions");
                return;
            }

            _logger.LogInformation($"Discovered Session: Version: [App: {result.Content.Version.App}, Model: {result.Content.Version.Model}]");
            if (result.Content.Version.Model == "1.0")
            {
                if (random.Next(0, 10) == 0)
                {
                    await FavoriteSessions(2, result.Content);
                }
            }
            else if (result.Content.Version.Model == "2.0")
            {
                if (random.Next(0, 1) == 0)
                {
                    await FavoriteSessions(10, result.Content);
                }
            }
        }

        private Task FavoriteSessions(int max, SessionList sessions)
        {
            var favorites = new SessionList { Version = sessions.Version };
            var random = new Random();
            var count = random.Next(1, max);
            _logger.LogInformation($"Favorite Sessions: Count: {count}");
            return Task.WhenAll(Enumerable.Range(0, random.Next(1, max)).Select(i => _client.FavoriteSession(favorites)));
        }
    }
}
