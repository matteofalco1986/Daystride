using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Daystride.Dtos.Date;
using Daystride.Models;


namespace Daystride.Mappers
{
    public static class DateMappers
    {
        public static DateDto ToDateDto(this Date dateModel)
        {
            return new DateDto
            {
                Id = dateModel.Id,
                Date1 = dateModel.Date1
            };
        }
    }
}