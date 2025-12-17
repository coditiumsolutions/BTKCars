using Microsoft.AspNetCore.Mvc;

namespace BtkCarsApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ConfigController : ControllerBase
{
    private readonly IWebHostEnvironment _env;

    public ConfigController(IWebHostEnvironment env)
    {
        _env = env;
    }

    [HttpGet("server-url")]
    public IActionResult GetServerUrl()
    {
        try
        {
            var serverIpPath = Path.Combine(_env.ContentRootPath, "..", "server-ip.txt");
            var serverUrl = System.IO.File.ReadAllText(serverIpPath).Trim();
            return Ok(new { serverUrl });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Failed to read server configuration", message = ex.Message });
        }
    }
}
