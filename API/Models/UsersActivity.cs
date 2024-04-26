using System;
using System.Collections.Generic;

namespace Daystride.Models;

public partial class UsersActivity
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public int? TypeId { get; set; }

    public int? CategoryId { get; set; }

    public int? ColorId { get; set; }

    public int? GoalPeriodTypeId { get; set; }

    public int? Goal { get; set; }

    public int? CurrentCount { get; set; }

    public int? UnitId { get; set; }

    public int? TimeRangeId { get; set; }

    public DateOnly? StartDate { get; set; }

    public DateOnly? EndDate { get; set; }

    public string? ActivityName { get; set; }

    public string? ReminderMessage { get; set; }

    public virtual ActivityCategory? Category { get; set; }

    public virtual Color? Color { get; set; }

    public virtual GoalPeriodType? GoalPeriodType { get; set; }

    public virtual TimeRange? TimeRange { get; set; }

    public virtual ActivityType? Type { get; set; }

    public virtual Unit? Unit { get; set; }
}
