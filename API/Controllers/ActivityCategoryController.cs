using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Daystride.Models;
using Microsoft.EntityFrameworkCore;
using Daystride.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;



namespace Daystride.Controllers
{
    [EnableCors("AllowOriginPolicy")]
    [ApiController]
    [Route("api/activitycategories")]
    public class ActivityCategoryController : ControllerBase
    {
        private readonly DayStrideContext _context;
        public ActivityCategoryController(DayStrideContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var activityCategories = await _context.ActivityCategories.ToListAsync();
            return Ok(activityCategories);
        }
    }
}