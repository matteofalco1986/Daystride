using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos.MoodEvent
{
    public class UpdateMoodEventDto
    {
        public int? UserId { get; set; }
        public int? MoodId { get; set; }
        public DateOnly? Date { get; set; }
    }
}