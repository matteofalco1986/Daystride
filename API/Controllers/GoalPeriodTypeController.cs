using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Daystride.Data;
using Microsoft.AspNetCore.Mvc;
using Daystride.Mappers;
using Daystride.Dtos.GoalPeriodType;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;



namespace Daystride.Controllers
{
    [EnableCors("AllowOriginPolicy")]
    [ApiController]
    [Route("api/goalperiodtypes")]
    public class GoalPeriodTypeController : ControllerBase
    {
        private readonly DayStrideContext _context;
        public GoalPeriodTypeController(DayStrideContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetAll()
        {
            var goalPeriodTypes = _context.GoalPeriodTypes.ToList()
                .Select(s => s.ToGoalPeriodTypeDto());
            return Ok(goalPeriodTypes);
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var goalPeriodType = _context.GoalPeriodTypes.Find(id);
            if (goalPeriodType == null)
            {
                return NotFound();
            }
            return Ok(goalPeriodType.ToGoalPeriodTypeDto());
        }
    }
}