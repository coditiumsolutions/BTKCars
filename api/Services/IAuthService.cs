using BtkCarsApi.DTOs;

namespace BtkCarsApi.Services
{
    public interface IAuthService
    {
        Task<LoginResponse?> LoginAsync(LoginRequest request);
        string GenerateJwtToken(string email, string role);
    }
}
