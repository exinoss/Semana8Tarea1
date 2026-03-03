using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace api.Models;

public class Curso
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(150)]
    public string NombreCurso { get; set; } = null!;

    [MaxLength(500)]
    public string? Descripcion { get; set; }

    [Required]
    public int Creditos { get; set; }

    [JsonIgnore]
    public ICollection<Inscripcion> Inscripciones { get; set; } = new List<Inscripcion>();
}
