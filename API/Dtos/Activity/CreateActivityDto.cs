namespace Daystride.Dtos.Activity
{
    public class CreateActivityDto
    {
        public int? TypeId { get; set; }

        public int? CategoryId { get; set; }
        public int? ColorId { get; set; }
        public int? UnitId { get; set; }

        public string? ActivityName { get; set; }
    }
}