using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace api.Models;

public class Estudiante
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Nombre { get; set; } = null!;

    [Required]
    [MaxLength(100)]
    public string Apellido { get; set; } = null!;

    [Required]
    [EmailAddress]
    [MaxLength(150)]
    public string Email { get; set; } = null!;

    [Required]
    public DateTime FechaNacimiento { get; set; }

    [JsonIgnore]
    public ICollection<Inscripcion> Inscripciones { get; set; } = new List<Inscripcion>();
}
