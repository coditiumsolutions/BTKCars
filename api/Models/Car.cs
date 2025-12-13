using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BtkCarsApi.Models
{
    [Table("carsforsale")]
    public class Car
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }

        [Required]
        [Column("make")]
        [MaxLength(100)]
        public string Make { get; set; } = string.Empty;

        [Required]
        [Column("model")]
        [MaxLength(100)]
        public string Model { get; set; } = string.Empty;

        [Column("year")]
        public int? Year { get; set; }

        [Required]
        [Column("price")]
        public decimal Price { get; set; }

        [Column("mileage")]
        public int? Mileage { get; set; }

        [Column("transmission")]
        [MaxLength(50)]
        public string? Transmission { get; set; }

        [Column("fueltype")]
        [MaxLength(50)]
        public string? FuelType { get; set; }

        [Column("description")]
        public string? Description { get; set; }

        [Column("imageurl")]
        public string? ImageUrl { get; set; }

        [Column("createdat")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updatedat")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
