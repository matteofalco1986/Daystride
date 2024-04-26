using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Daystride.Mappers;
using Daystride.Models;
using Microsoft.AspNetCore.Cors;
using Daystride.Data;
using Microsoft.AspNetCore.Authorization;
using Daystride.Dtos.UsersActivity;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.Extensions.DependencyInjection;

// Your controller code...


namespace Daystride.Controllers
{
    [EnableCors("AllowOriginPolicy")]
    [ApiController]
    [Route("api/usersactivities")]
    public class UsersActivityController : ControllerBase
    {
        private readonly DayStrideContext _context;
        public UsersActivityController(DayStrideContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var usersActivities = await _context.UsersActivities.ToListAsync();
            var usersActivitiesDto = usersActivities.Select(s => s.ToUsersActivityDto());
            return Ok(usersActivitiesDto);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var query = from ua in _context.UsersActivities
                        where ua.Id == id
                        join Units in _context.Units
                        on ua.UnitId equals Units.Id
                        join Colors in _context.Colors
                        on ua.ColorId equals Colors.Id
                        select new
                        {
                            id = ua.Id,
                            userId = ua.UserId,
                            TypeId = ua.TypeId,
                            CategoryId = ua.CategoryId,
                            ColorId = ua.ColorId,
                            Color = Colors.ColorCode,
                            GoalPeriodTypeId = ua.GoalPeriodTypeId,
                            Goal = ua.Goal,
                            CurrentCount = ua.CurrentCount,
                            unitId = ua.UnitId,
                            unit = Units.UnitName,
                            TimeRangeId = ua.TimeRangeId,
                            StartDate = ua.StartDate,
                            EndDate = ua.EndDate,
                            ActivityName = ua.ActivityName,
                            ReminderMessage = ua.ReminderMessage
                        };
            var usersActivity = await query.ToListAsync();

            if (usersActivity == null)
            {
                return NotFound();
            }
            return Ok(usersActivity[0]);
        }

        [Authorize]
        [HttpGet("byDate")]
        public async Task<IActionResult> GetByDate([FromQuery] int userId, [FromQuery] DateOnly date)
        {
            var query = from ua in _context.UsersActivities
                        where ua.UserId == userId && ua.StartDate == date
                        join Units in _context.Units
                        on ua.UnitId equals Units.Id
                        join Colors in _context.Colors
                        on ua.ColorId equals Colors.Id
                        select new
                        {
                            id = ua.Id,
                            userId = ua.UserId,
                            TypeId = ua.TypeId,
                            CategoryId = ua.CategoryId,
                            ColodId = ua.ColorId,
                            Color = Colors.ColorCode,
                            GoalPeriodTypeId = ua.GoalPeriodTypeId,
                            Goal = ua.Goal,
                            CurrentCount = ua.CurrentCount,
                            unitId = ua.UnitId,
                            unitName = Units.UnitName,
                            TimeRangeId = ua.TimeRangeId,
                            StartDate = ua.StartDate,
                            EndDate = ua.EndDate,
                            ActivityName = ua.ActivityName,
                            ReminderMessage = ua.ReminderMessage
                        };

            if (query.Count() == 0)
            {
                return NotFound();
            }

            var usersActivities = await query.ToListAsync();
            return Ok(usersActivities);
        }


        [Authorize]
        [HttpPost]

        public async Task<IActionResult> Add([FromBody] CreateUsersActivityDto usersActivityDto)
        {
            var usersActivityModel = usersActivityDto.ToUsersActivityFromCreateUsersActivityDto();

            // Assuming usersActivityModel has a startDate and endDate properties that are DateTime types
            DateOnly StartDate = (DateOnly)usersActivityModel.StartDate;
            DateOnly? EndDate = (DateOnly)usersActivityModel.EndDate;

            // Check if the StartDate is after EndDate and handle it appropriately (could throw an exception or handle another way)
            if (StartDate > EndDate)
            {
                return BadRequest("The start date must be before the end date.");
            }

            while (StartDate <= EndDate)
            {
                var dailyActivity = new UsersActivity
                {
                    UserId = usersActivityModel.UserId,
                    TypeId = usersActivityModel.TypeId,
                    CategoryId = usersActivityModel.CategoryId,
                    ColorId = usersActivityModel.ColorId,
                    GoalPeriodTypeId = usersActivityModel.GoalPeriodTypeId,
                    Goal = usersActivityModel.Goal,
                    CurrentCount = usersActivityModel.CurrentCount,
                    UnitId = usersActivityModel.UnitId,
                    TimeRangeId = usersActivityModel.TimeRangeId,
                    StartDate = StartDate,
                    EndDate = StartDate,
                    ActivityName = usersActivityModel.ActivityName,
                    ReminderMessage = usersActivityModel.ReminderMessage
                };

                await _context.UsersActivities.AddAsync(dailyActivity);
                StartDate = StartDate.AddDays(1); // Increment the date by one day
            }

            await _context.SaveChangesAsync();

            // Optionally, modify the return statement to reflect what should be returned
            return Ok("Activities added successfully");
        }

        // ADD ONE ACTIVITY ONLY
        // [Authorize]
        // [HttpPost]
        // public async Task<IActionResult> Add([FromBody] CreateUsersActivityDto usersActivityDto)
        // {
        //     var usersActivityModel = usersActivityDto.ToUsersActivityFromCreateUsersActivityDto();
        //     await _context.UsersActivities.AddAsync(usersActivityModel);
        //     await _context.SaveChangesAsync();
        //     return CreatedAtAction(nameof(GetById), new { id = usersActivityModel.Id }, usersActivityModel.ToUsersActivityDto());
        // }

        [Authorize]
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateUsersActivityDto usersActivityDto)
        {


            var usersActivityModel = await _context.UsersActivities.FirstOrDefaultAsync(activity => activity.Id == id);
            if (usersActivityModel == null)
            {
                return NotFound();
            }

            usersActivityModel.UserId = usersActivityDto.UserId;
            usersActivityModel.TypeId = usersActivityDto.TypeId;
            usersActivityModel.CategoryId = usersActivityDto.CategoryId;
            usersActivityModel.ColorId = usersActivityDto.ColorId;
            usersActivityModel.GoalPeriodTypeId = usersActivityDto.GoalPeriodTypeId;
            usersActivityModel.Goal = usersActivityDto.Goal;
            usersActivityModel.CurrentCount = usersActivityDto.CurrentCount;
            usersActivityModel.UnitId = usersActivityDto.UnitId;
            usersActivityModel.TimeRangeId = usersActivityDto.TimeRangeId;
            usersActivityModel.StartDate = usersActivityDto.StartDate;
            usersActivityModel.EndDate = usersActivityDto.EndDate;
            usersActivityModel.ActivityName = usersActivityDto.ActivityName;
            usersActivityModel.ReminderMessage = usersActivityDto.ReminderMessage;

            await _context.SaveChangesAsync();

            return Ok(usersActivityModel.ToUsersActivityDto());
        }

        [Authorize]
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var usersActivityModel = await _context.UsersActivities.FirstOrDefaultAsync(activity => activity.Id == id);
            if (usersActivityModel == null)
            {
                return NotFound();
            }
            _context.UsersActivities.Remove(usersActivityModel);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}