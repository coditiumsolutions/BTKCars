using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BtkCarsApi.DTOs;
using BtkCarsApi.Services;
using BtkCarsApi.Data;
using BtkCarsApi.Models;

namespace BtkCarsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ILogger<AuthController> _logger;
        private readonly ApplicationDbContext _context;

        public AuthController(IAuthService authService, ILogger<AuthController> logger, ApplicationDbContext context)
        {
            _authService = authService;
            _logger = logger;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var response = await _authService.LoginAsync(request);

                if (response == null)
                {
                    return Unauthorized(new { message = "Invalid email or password" });
                }

                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during login");
                return StatusCode(500, new { message = "An error occurred during login" });
            }
        }

        [HttpGet("health")]
        public IActionResult Health()
        {
            return Ok(new { status = "API is running", timestamp = DateTime.UtcNow });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Check if user already exists
                var existingUser = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email.ToLower() == request.Email.ToLower());

                if (existingUser != null)
                {
                    return BadRequest(new { message = "User with this email already exists" });
                }

                // Hash the password
                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);

                // Create new user
                var user = new User
                {
                    Email = request.Email,
                    Password = hashedPassword,
                    Role = request.Role
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return Ok(new { message = "User registered successfully", email = user.Email });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during registration");
                return StatusCode(500, new { message = "An error occurred during registration" });
            }
        }

        [HttpPost("seed-test-user")]
        public async Task<IActionResult> SeedTestUser()
        {
            try
            {
                var testEmail = "test@example.com";
                var existingUser = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == testEmail);

                if (existingUser != null)
                {
                    return Ok(new { message = "Test user already exists", email = testEmail, password = "password123" });
                }

                var user = new User
                {
                    Email = testEmail,
                    Password = BCrypt.Net.BCrypt.HashPassword("password123"),
                    Role = "user"
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Test user created successfully",
                    email = testEmail,
                    password = "password123"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating test user");
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
