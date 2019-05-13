using Newtonsoft.Json;

namespace Simulator.Client
{
    public class Versions
    {
        [JsonProperty("app")]
        public string App { get; set; }

        [JsonProperty("model")]
        public string Model { get; set; }
    }
}