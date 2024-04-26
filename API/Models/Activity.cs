using System;
using System.Collections.Generic;

namespace Daystride.Models;

public partial class Activity
{
    public int Id { get; set; }

    public int? TypeId { get; set; }

    public int? CategoryId { get; set; }

    public int? ColorId { get; set; }

    public int? GoalPeriodTypeId { get; set; }

    public int? UnitId { get; set; }

    public int? TimeRangesId { get; set; }

    public string? ActivityName { get; set; }

    public virtual ActivityCategory? Category { get; set; }

    public virtual Color? Color { get; set; }

    public virtual GoalPeriodType? GoalPeriodType { get; set; }

    public virtual TimeRange? TimeRanges { get; set; }

    public virtual ActivityType? Type { get; set; }

    public virtual Unit? Unit { get; set; }

    public virtual ICollection<UserDate> UserDates { get; set; } = new List<UserDate>();
}
