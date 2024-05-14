using Daystride.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Daystride.Mappers;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;



namespace Daystride.Controllers
{
    [EnableCors("AllowOriginPolicy")]
    [ApiController]
    [Route("api/dates")]
    public class DateController : ControllerBase
    {
        private readonly DayStrideContext _context;
        public DateController(DayStrideContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var dates = await _context.Dates.ToListAsync();
            return Ok(dates);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var date = await _context.Dates.FindAsync(id);
            if (date == null)
            {
                return NotFound();
            }
            return Ok(date.ToDateDto());
        }
    }
}