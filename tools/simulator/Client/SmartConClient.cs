using System;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace Simulator.Client
{
    public class SmartConClient
    {
        public SmartConClient(HttpClient httpClient)
        {
            HttpClient = httpClient;
        }

        public HttpClient HttpClient { get; }

        // Gets the list of services on github.
        public async Task<ApiResult<SessionList>> GetSessions()
        {
            var request = new HttpRequestMessage(HttpMethod.Get, "/api/sessions");


            using (var response = await HttpClient.SendAsync(request).ConfigureAwait(false))
            {
                var stream = await response.Content.ReadAsStreamAsync();

                if (response.IsSuccessStatusCode)
                {
                    return ApiResult<SessionList>.Success((int)response.StatusCode, DeserializeJsonFromStream<SessionList>(stream));
                }

                var content = await StreamToStringAsync(stream);
                return ApiResult<SessionList>.Failed((int)response.StatusCode, content);
            }
        }

        // Gets the list of services on github.
        public async Task<ApiResult<SessionList>> DiscoverSessions()
        {
            var content = new StringContent("{}", Encoding.UTF8, "application/json");
            using (var response = await HttpClient.PostAsync("/api/discover", content))
            {
                var stream = await response.Content.ReadAsStreamAsync();

                if (response.IsSuccessStatusCode)
                {
                    return ApiResult<SessionList>.Success((int)response.StatusCode, DeserializeJsonFromStream<SessionList>(stream));
                }

                var message = await StreamToStringAsync(stream);
                return ApiResult<SessionList>.Failed((int)response.StatusCode, message);
            }
        }

        public async Task<ApiResult<string>> FavoriteSession(SessionList sessions)
        {
            var content = new StringContent(JsonConvert.SerializeObject(sessions), Encoding.UTF8, "application/json");
            using (var response = await HttpClient.PostAsync("/api/favorite", content))
            {
                var stream = await response.Content.ReadAsStreamAsync();
                if (response.IsSuccessStatusCode)
                {
                    return ApiResult<string>.Success((int)response.StatusCode, "");
                }

                var message = await StreamToStringAsync(stream);
                return ApiResult<string>.Failed((int)response.StatusCode, message);
            }
        }

        private static T DeserializeJsonFromStream<T>(Stream stream)
        {
            if (stream == null || stream.CanRead == false)
                return default(T);

            using (var sr = new StreamReader(stream))
            {
                using (var jtr = new JsonTextReader(sr))
                {
                    var jr = new JsonSerializer();
                    var searchResult = jr.Deserialize<T>(jtr);
                    return searchResult;
                }
            }
        }

        private static async Task<string> StreamToStringAsync(Stream stream)
        {
            string content = null;
            if (stream != null)
            {
                using (var sr = new StreamReader(stream))
                {
                    content = await sr.ReadToEndAsync();
                }
            }
            return content;
        }
    }
}
