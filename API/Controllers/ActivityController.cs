using Daystride.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Daystride.Mappers;
using Daystride.Models;
using Daystride.Dtos.Activity;
using Microsoft.AspNetCore.Cors;

namespace Daystride.Controllers
{
    [EnableCors("AllowOriginPolicy")]
    [ApiController]
    [Route("api/activities")]
    public class ActivityController : ControllerBase
    {
        private readonly DayStrideContext _context;
        public ActivityController(DayStrideContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var query = from activity in _context.Activities
                        join activityType in _context.ActivityTypes
                            on activity.TypeId equals activityType.Id
                        join activityCategory in _context.ActivityCategories
                            on activity.CategoryId equals activityCategory.Id
                        join unit in _context.Units
                            on activity.UnitId equals unit.Id
                        join color in _context.Colors
                            on activity.ColorId equals color.Id
                        join GoalPeriodType in _context.GoalPeriodTypes
                        on activity.GoalPeriodTypeId equals GoalPeriodType.Id
                        select new
                        {
                            activity.Id,
                            activity.TypeId,
                            activity.CategoryId,
                            activity.ColorId,
                            activity.UnitId,
                            activity.GoalPeriodTypeId,
                            activity.ActivityName,
                            activityType.ActivityTypeName,
                            activityCategory.ActivityCategoryName,
                            color.ColorCode,
                            unit.UnitName,
                            GoalPeriodType.GoalPeriodName
                        };
            var activities = await query.ToListAsync();
            return Ok(activities);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var query = from activity in _context.Activities
                        join activityType in _context.ActivityTypes
                            on activity.TypeId equals activityType.Id
                        join activityCategory in _context.ActivityCategories
                            on activity.CategoryId equals activityCategory.Id
                        join unit in _context.Units
                            on activity.UnitId equals unit.Id
                        join color in _context.Colors
                            on activity.ColorId equals color.Id
                        join GoalPeriodType in _context.GoalPeriodTypes
                        on activity.GoalPeriodTypeId equals GoalPeriodType.Id
                        where activity.Id == id
                        select new
                        {
                            activity.Id,
                            activity.TypeId,
                            activity.CategoryId,
                            activity.ColorId,
                            activity.GoalPeriodTypeId,
                            activity.UnitId,
                            activity.ActivityName,
                            activityType.ActivityTypeName,
                            activityCategory.ActivityCategoryName,
                            color.ColorCode,
                            unit.UnitName,
                            GoalPeriodType.GoalPeriodName
                        };
            var activityToReturn = await query.FirstOrDefaultAsync();

            if (activityToReturn == null)
            {
                return NotFound();
            }
            return Ok(activityToReturn);
        }

        [Authorize]
        [HttpPost]
        public IActionResult Add([FromBody] CreateActivityDto activityDto)
        {
            var activityModel = activityDto.ToActivityFromCreateActivityDto();
            _context.Activities.Add(activityModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = activityModel.Id }, activityModel.ToActivityDto());
        }


    }
}