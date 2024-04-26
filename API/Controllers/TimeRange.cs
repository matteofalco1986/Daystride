using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Serialization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Daystride.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;


namespace Daystride.Controllers
{
    [EnableCors("AllowOriginPolicy")]
    [ApiController]
    [Route("api/timeranges")]
    public class TimeRange : ControllerBase
    {
        private readonly DayStrideContext _context;
        public TimeRange(DayStrideContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var timeRanges = await _context.TimeRanges.ToListAsync();
            return Ok(timeRanges);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var timeRange = await _context.TimeRanges.FindAsync(id);
            if (timeRange == null)
            {
                return NotFound();
            }
            return Ok(timeRange);
        }
    }
}