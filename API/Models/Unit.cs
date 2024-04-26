using System;
using System.Collections.Generic;

namespace Daystride.Models;

public partial class Unit
{
    public int Id { get; set; }

    public string? UnitName { get; set; }

    public virtual ICollection<Activity> Activities { get; set; } = new List<Activity>();

    public virtual ICollection<UsersActivity> UsersActivities { get; set; } = new List<UsersActivity>();
}
