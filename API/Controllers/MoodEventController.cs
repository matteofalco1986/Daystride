using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Daystride.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Identity.Client;
using API.Dtos.MoodEvent;
using API.Mappers;


namespace API.Controllers
{
    [EnableCors("AllowOriginPolicy")]
    [ApiController]
    [Route("api/moodevents")]
    public class MoodEventController : ControllerBase
    {
        private readonly DayStrideContext _context;
        public MoodEventController(DayStrideContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
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

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var moodEvent = await _context.MoodEvents.FindAsync(id);
            if (moodEvent == null)
            {
                return NotFound();
            }
            return Ok(moodEvent.ToMoodEventDto());
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CreateMoodEventDto moodEventDto)
        {
            var moodEventModel = moodEventDto.ToMoodEventFromCreateMoodEventDto();
            await _context.MoodEvents.AddAsync(moodEventModel);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = moodEventModel.Id }, moodEventModel.ToMoodEventDto());
        }

        [Authorize]
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateMoodEventDto moodEventDto)
        {


            var moodEventModel = await _context.MoodEvents.FirstOrDefaultAsync(moodEvent => moodEvent.Id == id);
            if (moodEventModel == null)
            {
                return NotFound();
            }

            moodEventModel.UserId = moodEventDto.UserId;
            moodEventModel.MoodId = moodEventDto.MoodId;
            moodEventModel.Date = moodEventDto.Date;


            await _context.SaveChangesAsync();

            return Ok(moodEventModel.ToMoodEventDto());
        }

    }
}