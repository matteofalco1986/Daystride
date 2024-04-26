using System;
using System.Collections.Generic;

namespace Daystride.Models;

public partial class UserDate
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public int? DateId { get; set; }

    public int? MoodId { get; set; }

    public int? ActivityId { get; set; }

    public virtual Activity? Activity { get; set; }

    public virtual Date? Date { get; set; }

    public virtual Mood? Mood { get; set; }
}
