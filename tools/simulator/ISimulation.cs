using System;
using System.Threading.Tasks;

namespace Simulator
{
    public interface ISimulation
    {
        Task RunAsync(SimulationContext context);
    }
}
