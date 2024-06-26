
using Daystride.Models;
using Daystride.Dtos.Color;



namespace Daystride.Mappers
{
    public static class ColorMappers
    {
        public static ColorDto ToColorDto(this Color colorModel)
        {
            return new ColorDto
            {
                Id = colorModel.Id,
                ColorCode = colorModel.ColorCode
            };
        }
    }
}