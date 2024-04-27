

namespace API.Dtos.MoodEvent
{
    public class CreateMoodEventDto
    {
        public int? UserId { get; set; }
        public int? MoodId { get; set; }
        public DateOnly? Date { get; set; }
    }
}