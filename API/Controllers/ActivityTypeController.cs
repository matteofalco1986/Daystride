using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Daystride.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;

namespace Daystride.Controllers
{
    [EnableCors("AllowOriginPolicy")]
    [ApiController]
    [Route("api/activitytypes")]
    public class ActivityTypeController : ControllerBase
    {
        private readonly DayStrideContext _context;
        public ActivityTypeController(DayStrideContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var activityTypes = await _context.ActivityTypes.ToListAsync();
            return Ok(activityTypes);
        }
    }
}