using System;
using System.Collections.Generic;

namespace Daystride.Models;

public partial class Mood
{
    public int Id { get; set; }

    public string? MoodName { get; set; }

    public virtual ICollection<UserDate> UserDates { get; set; } = new List<UserDate>();
}
