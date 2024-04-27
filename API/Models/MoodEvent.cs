using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Daystride.Models;

namespace API.Models
{
    public class MoodEvent
    {
        public int Id { get; set; }
        public int? MoodId { get; set; }
        public int? UserId { get; set; }
        public DateOnly? Date { get; set; }
        public virtual Mood? Mood { get; set; }

    }
}