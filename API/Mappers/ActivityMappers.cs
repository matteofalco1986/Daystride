using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Daystride.Models;
using Daystride.Dtos.Activity;
using Daystride.Dtos;

namespace Daystride.Mappers
{
    public static class ActivityMappers
    {
        public static DTOs.ActivityDto ToActivityDto(this Activity activityModel)
        {
            return new DTOs.ActivityDto
            {
                Id = activityModel.Id,
                TypeId = activityModel.TypeId,
                CategoryId = activityModel.CategoryId,
                ColorId = activityModel.ColorId,
                UnitId = activityModel.UnitId,
                ActivityName = activityModel.ActivityName
            };
        }
        public static Activity ToActivityFromCreateActivityDto(this CreateActivityDto activityModel)
        {
            return new Activity
            {
                TypeId = activityModel.TypeId,
                CategoryId = activityModel.CategoryId,
                ColorId = activityModel.ColorId,
                UnitId = activityModel.UnitId,
                ActivityName = activityModel.ActivityName
            };
        }
    }
}