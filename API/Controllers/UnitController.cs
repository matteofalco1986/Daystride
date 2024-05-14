using Microsoft.AspNetCore.Mvc;
using Daystride.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;


namespace Daystride.Controllers
{
    [EnableCors("AllowOriginPolicy")]
    [ApiController]
    [Route("api/units")]
    public class UnitController : ControllerBase
    {
        private readonly DayStrideContext _context;
        public UnitController(DayStrideContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var units = await _context.Units.ToListAsync();
            return Ok(units);
        }
    }
}