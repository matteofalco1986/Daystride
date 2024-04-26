using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Daystride.Dtos.UsersActivity
{
    public class CreateUsersActivityDto
    {
        public int? UserId { get; set; }

        public int? TypeId { get; set; }

        public int? CategoryId { get; set; }

        public int? ColorId { get; set; }

        public int? GoalPeriodTypeId { get; set; }
        public int? Goal { get; set; }

        public int? CurrentCount { get; set; } = 0;

        public int? UnitId { get; set; }

        public int? TimeRangeId { get; set; }

        public DateOnly? StartDate { get; set; }

        public DateOnly? EndDate { get; set; }
        public string? ActivityName { get; set; }
        public string? ReminderMessage { get; set; }

    }
}