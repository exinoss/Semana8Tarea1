using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

public class Inscripcion
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int EstudianteId { get; set; }
    
    [ForeignKey("EstudianteId")]
    public Estudiante? Estudiante { get; set; }

    [Required]
    public int CursoId { get; set; }

    [ForeignKey("CursoId")]
    public Curso? Curso { get; set; }

    [Required]
    public DateTime FechaInscripcion { get; set; } = DateTime.UtcNow;

    [Required]
    [MaxLength(50)]
    public string Estado { get; set; } = "Activo";
}
