using System;

namespace Simulator.Client
{
    public class ApiResult<T>
    {

        public T Content { get; protected set; }

        public int StatusCode { get; protected set; }

        public bool Succeeded { get; protected set; }

        public string ErrorMessage { get; protected set; }

        public static ApiResult<T> Success(int statusCode, T content)
        {
            return new ApiResult<T> { Succeeded = true, StatusCode = statusCode, Content = content };
        }

        public static ApiResult<T> Failed(int statusCode, string message)
        {
            return new ApiResult<T> { Succeeded = false, StatusCode = statusCode, ErrorMessage = message };
        }
    }
}