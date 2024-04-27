using API.Dtos.MoodEvent;
using API.Models;


namespace API.Mappers
{
    public static class MoodEventMappers
    {
        public static MoodEventDto ToMoodEventDto(this MoodEvent moodEventModel)
        {
            return new MoodEventDto
            {
                Id = moodEventModel.Id,
                UserId = moodEventModel.UserId,
                MoodId = moodEventModel.MoodId,
                Date = moodEventModel.Date
            };
        }
        public static MoodEvent ToMoodEventFromCreateMoodEventDto(this CreateMoodEventDto moodEventModel)
        {
            return new MoodEvent
            {
                UserId = moodEventModel.UserId,
                MoodId = moodEventModel.MoodId,
                Date = moodEventModel.Date
            };
        }
    }
}