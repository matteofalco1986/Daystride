using System;
using System.Collections.Generic;

namespace Daystride.Models;

public partial class ActivityType
{
    public int Id { get; set; }

    public string ActivityTypeName { get; set; } = null!;

    public virtual ICollection<Activity> Activities { get; set; } = new List<Activity>();

    public virtual ICollection<UsersActivity> UsersActivities { get; set; } = new List<UsersActivity>();
}
