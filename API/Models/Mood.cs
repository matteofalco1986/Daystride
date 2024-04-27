using System;
using System.Collections.Generic;
using API.Models;

namespace Daystride.Models;

public partial class Mood
{
    public int Id { get; set; }

    public string? MoodName { get; set; }

    public virtual ICollection<UserDate> UserDates { get; set; } = new List<UserDate>();
    public virtual ICollection<MoodEvent> MoodEvents { get; set; } = new List<MoodEvent>();
}
