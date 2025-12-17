using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BtkCarsApi.Data;
using BtkCarsApi.DTOs;
using BtkCarsApi.Models;

namespace BtkCarsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<CarsController> _logger;
        private readonly IWebHostEnvironment _environment;

        public CarsController(
            ApplicationDbContext context,
            ILogger<CarsController> logger,
            IWebHostEnvironment environment)
        {
            _context = context;
            _logger = logger;
            _environment = environment;
        }

        // GET: api/cars
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarDTO>>> GetAllCars()
        {
            try
            {
                var cars = await _context.Cars
                    .OrderByDescending(c => c.CreatedAt)
                    .Select(c => new CarDTO
                    {
                        Id = c.Id,
                        Make = c.Make,
                        Model = c.Model,
                        Year = c.Year,
                        Price = c.Price,
                        Mileage = c.Mileage,
                        Transmission = c.Transmission,
                        FuelType = c.FuelType,
                        Description = c.Description,
                        ImageUrl = c.ImageUrl,
                        CreatedAt = c.CreatedAt,
                        UpdatedAt = c.UpdatedAt
                    })
                    .ToListAsync();

                return Ok(cars);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching cars");
                return StatusCode(500, new { message = "Error fetching cars" });
            }
        }

        // GET: api/cars/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CarDTO>> GetCar(long id)
        {
            try
            {
                var car = await _context.Cars.FindAsync(id);

                if (car == null)
                {
                    return NotFound(new { message = "Car not found" });
                }

                var carDto = new CarDTO
                {
                    Id = car.Id,
                    Make = car.Make,
                    Model = car.Model,
                    Year = car.Year,
                    Price = car.Price,
                    Mileage = car.Mileage,
                    Transmission = car.Transmission,
                    FuelType = car.FuelType,
                    Description = car.Description,
                    ImageUrl = car.ImageUrl,
                    CreatedAt = car.CreatedAt,
                    UpdatedAt = car.UpdatedAt
                };

                return Ok(carDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching car with id {CarId}", id);
                return StatusCode(500, new { message = "Error fetching car" });
            }
        }

        // POST: api/cars
        [HttpPost]
        public async Task<ActionResult<CarDTO>> CreateCar([FromForm] CreateCarRequest request)
        {
            try
            {
                string? imageUrl = null;

                // Handle image upload
                if (request.Image != null && request.Image.Length > 0)
                {
                    imageUrl = await SaveImage(request.Image);
                }

                var car = new Car
                {
                    Make = request.Make,
                    Model = request.Model,
                    Year = request.Year,
                    Price = request.Price,
                    Mileage = request.Mileage,
                    Transmission = request.Transmission,
                    FuelType = request.FuelType,
                    Description = request.Description,
                    ImageUrl = imageUrl
                };

                _context.Cars.Add(car);
                await _context.SaveChangesAsync();

                var carDto = new CarDTO
                {
                    Id = car.Id,
                    Make = car.Make,
                    Model = car.Model,
                    Year = car.Year,
                    Price = car.Price,
                    Mileage = car.Mileage,
                    Transmission = car.Transmission,
                    FuelType = car.FuelType,
                    Description = car.Description,
                    ImageUrl = car.ImageUrl,
                    CreatedAt = car.CreatedAt,
                    UpdatedAt = car.UpdatedAt
                };

                return CreatedAtAction(nameof(GetCar), new { id = car.Id }, carDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating car");
                return StatusCode(500, new { message = "Error creating car" });
            }
        }

        // PUT: api/cars/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCar(long id, [FromForm] UpdateCarRequest request)
        {
            try
            {
                var car = await _context.Cars.FindAsync(id);

                if (car == null)
                {
                    return NotFound(new { message = "Car not found" });
                }

                // Handle image upload
                if (request.Image != null && request.Image.Length > 0)
                {
                    // Delete old image if exists
                    if (!string.IsNullOrEmpty(car.ImageUrl) && !car.ImageUrl.StartsWith("http"))
                    {
                        DeleteImage(car.ImageUrl);
                    }

                    car.ImageUrl = await SaveImage(request.Image);
                }

                car.Make = request.Make;
                car.Model = request.Model;
                car.Year = request.Year;
                car.Price = request.Price;
                car.Mileage = request.Mileage;
                car.Transmission = request.Transmission;
                car.FuelType = request.FuelType;
                car.Description = request.Description;
                car.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Car updated successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating car with id {CarId}", id);
                return StatusCode(500, new { message = "Error updating car" });
            }
        }

        // DELETE: api/cars/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCar(long id)
        {
            try
            {
                var car = await _context.Cars.FindAsync(id);

                if (car == null)
                {
                    return NotFound(new { message = "Car not found" });
                }

                // Delete image if exists
                if (!string.IsNullOrEmpty(car.ImageUrl) && !car.ImageUrl.StartsWith("http"))
                {
                    DeleteImage(car.ImageUrl);
                }

                _context.Cars.Remove(car);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Car deleted successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting car with id {CarId}", id);
                return StatusCode(500, new { message = "Error deleting car" });
            }
        }

        private async Task<string> SaveImage(IFormFile image)
        {
            var uploadsFolder = Path.Combine(_environment.WebRootPath, "carsimage");
            Directory.CreateDirectory(uploadsFolder);

            var uniqueFileName = $"{Guid.NewGuid()}_{image.FileName}";
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(fileStream);
            }

            return $"/carsimage/{uniqueFileName}";
        }

        private void DeleteImage(string imageUrl)
        {
            try
            {
                var fileName = imageUrl.TrimStart('/');
                var filePath = Path.Combine(_environment.WebRootPath, fileName);

                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting image {ImageUrl}", imageUrl);
            }
        }
    }
}
