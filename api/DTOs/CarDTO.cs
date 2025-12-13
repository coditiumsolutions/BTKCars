using System.ComponentModel.DataAnnotations;

namespace BtkCarsApi.DTOs
{
    public class CarDTO
    {
        public long Id { get; set; }

        [Required]
        public string Make { get; set; } = string.Empty;

        [Required]
        public string Model { get; set; } = string.Empty;

        public int? Year { get; set; }

        [Required]
        public decimal Price { get; set; }

        public int? Mileage { get; set; }

        public string? Transmission { get; set; }

        public string? FuelType { get; set; }

        public string? Description { get; set; }

        public string? ImageUrl { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }

    public class CreateCarRequest
    {
        [Required]
        public string Make { get; set; } = string.Empty;

        [Required]
        public string Model { get; set; } = string.Empty;

        public int? Year { get; set; }

        [Required]
        public decimal Price { get; set; }

        public int? Mileage { get; set; }

        public string? Transmission { get; set; }

        public string? FuelType { get; set; }

        public string? Description { get; set; }
    }

    public class UpdateCarRequest
    {
        [Required]
        public string Make { get; set; } = string.Empty;

        [Required]
        public string Model { get; set; } = string.Empty;

        public int? Year { get; set; }

        [Required]
        public decimal Price { get; set; }

        public int? Mileage { get; set; }

        public string? Transmission { get; set; }

        public string? FuelType { get; set; }

        public string? Description { get; set; }
    }
}
