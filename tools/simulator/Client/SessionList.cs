using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Simulator.Client
{
    public class SessionList
    {
        [JsonProperty("version")]
        public Versions Version { get; set; }

        [JsonProperty("data")]
        public IEnumerable<Session> Sessions { get; set; }
    }
}