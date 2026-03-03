using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;

namespace api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class InscripcionesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public InscripcionesController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Inscripciones
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Inscripcion>>> GetInscripciones()
    {
        return await _context.Inscripciones
            .Include(i => i.Estudiante)
            .Include(i => i.Curso)
            .ToListAsync();
    }

    // GET: api/Inscripciones/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Inscripcion>> GetInscripcion(int id)
    {
        var inscripcion = await _context.Inscripciones
            .Include(i => i.Estudiante)
            .Include(i => i.Curso)
            .FirstOrDefaultAsync(i => i.Id == id);

        if (inscripcion == null)
        {
            return NotFound();
        }

        return inscripcion;
    }

    // POST: api/Inscripciones
    [HttpPost]
    public async Task<ActionResult<Inscripcion>> PostInscripcion(Inscripcion inscripcion)
    {
        _context.Inscripciones.Add(inscripcion);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetInscripcion), new { id = inscripcion.Id }, inscripcion);
    }

    // PUT: api/Inscripciones/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutInscripcion(int id, Inscripcion inscripcion)
    {
        if (id != inscripcion.Id)
        {
            return BadRequest();
        }

        _context.Entry(inscripcion).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!InscripcionExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/Inscripciones/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteInscripcion(int id)
    {
        var inscripcion = await _context.Inscripciones.FindAsync(id);
        if (inscripcion == null)
        {
            return NotFound();
        }

        _context.Inscripciones.Remove(inscripcion);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool InscripcionExists(int id)
    {
        return _context.Inscripciones.Any(e => e.Id == id);
    }
}
