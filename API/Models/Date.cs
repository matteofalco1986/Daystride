using System;
using System.Collections.Generic;

namespace Daystride.Models;

public partial class Date
{
    public int Id { get; set; }

    public DateOnly? Date1 { get; set; }

    public virtual ICollection<UserDate> UserDates { get; set; } = new List<UserDate>();
}
