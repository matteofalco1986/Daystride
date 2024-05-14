using Daystride.Data;
using Daystride.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;


namespace Daystride.Controllers
{
    [EnableCors("AllowOriginPolicy")]
    [ApiController]
    [Route("api/colors")]
    public class ColorController : ControllerBase
    {
        private readonly DayStrideContext _context;
        public ColorController(DayStrideContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetAll()
        {
            var colors = _context.Colors.ToList().Select(s => s.ToColorDto());
            return Ok(colors);
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var color = _context.Colors.Find(id);

            if (color == null)
            {
                return NotFound();
            }
            return Ok(color.ToColorDto());
        }
    }
}