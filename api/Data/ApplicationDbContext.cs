using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Estudiante> Estudiantes { get; set; }
    public DbSet<Curso> Cursos { get; set; }
    public DbSet<Inscripcion> Inscripciones { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Define table names if they need to be strictly mapped, though they default to the DbSet names.
        modelBuilder.Entity<Estudiante>().ToTable("estudiantes");
        modelBuilder.Entity<Curso>().ToTable("cursos");
        modelBuilder.Entity<Inscripcion>().ToTable("inscripciones");

        // Set column names for Inscripciones
        modelBuilder.Entity<Inscripcion>(entity =>
        {
            entity.Property(e => e.EstudianteId).HasColumnName("estudiante_id");
            entity.Property(e => e.CursoId).HasColumnName("curso_id");
            entity.Property(e => e.FechaInscripcion).HasColumnName("fecha_inscripcion");
            entity.Property(e => e.Estado).HasColumnName("estado");
        });

        // Set column names for Cursos
        modelBuilder.Entity<Curso>(entity =>
        {
            entity.Property(e => e.NombreCurso).HasColumnName("nombre_curso");
            entity.Property(e => e.Descripcion).HasColumnName("descripcion");
            entity.Property(e => e.Creditos).HasColumnName("creditos");
        });

        // Set column names for Estudiantes
        modelBuilder.Entity<Estudiante>(entity =>
        {
            entity.Property(e => e.Nombre).HasColumnName("nombre");
            entity.Property(e => e.Apellido).HasColumnName("apellido");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.FechaNacimiento).HasColumnName("fecha_nacimiento");
        });

        // Configure relationships for Inscripciones
        modelBuilder.Entity<Inscripcion>()
            .HasOne(i => i.Estudiante)
            .WithMany(e => e.Inscripciones)
            .HasForeignKey(i => i.EstudianteId);

        modelBuilder.Entity<Inscripcion>()
            .HasOne(i => i.Curso)
            .WithMany(c => c.Inscripciones)
            .HasForeignKey(i => i.CursoId);
    }
}
