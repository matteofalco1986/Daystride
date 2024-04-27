using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Daystride.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [EnableCors("AllowOriginPolicy")]
    [ApiController]
    [Route("api/")]
    public class MoodEventController : ControllerBase
    {
        private readonly DayStrideContext _context;
        public MoodEventController(DayStrideContext context)
        {
            _context = context;
        }

        [HttpGet("moodevents")]
        public async Task<IActionResult> GetAll()
        {
            var query = from me in _context.MoodEvents
                        join Moods in _context.Moods
                        on me.MoodId equals Moods.Id
                        select new
                        {
                            id = me.Id,
                            userId = me.UserId,
                            mood = Moods.MoodName,
                            date = me.Date
                        };
            var moodEvents = await query.ToListAsync();
            if (moodEvents.Count <= 0)
            {
                return NotFound();
            }
            return Ok(moodEvents);

        }
    }
}