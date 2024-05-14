namespace API.Dtos.MoodEvent
{
    public class MoodEventDto
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? MoodId { get; set; }
        public DateOnly? Date { get; set; }
    }
}