using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using Daystride.Models;
using Daystride.Dtos;
using Microsoft.Extensions.Configuration.UserSecrets;
using Daystride.Dtos.UsersActivity;

namespace Daystride.Mappers
{
    public static class UsersActivityMappers
    {
        public static UsersActivityDto ToUsersActivityDto(this UsersActivity usersActivityModel)
        {
            return new UsersActivityDto
            {
                Id = usersActivityModel.Id,
                UserId = usersActivityModel.UserId,
                TypeId = usersActivityModel.TypeId,
                CategoryId = usersActivityModel.CategoryId,
                ColorId = usersActivityModel.ColorId,
                GoalPeriodTypeId = usersActivityModel.GoalPeriodTypeId,
                Goal = usersActivityModel.Goal,
                CurrentCount = usersActivityModel.CurrentCount,
                UnitId = usersActivityModel.UnitId,
                TimeRangeId = usersActivityModel.TimeRangeId,
                StartDate = usersActivityModel.StartDate,
                EndDate = usersActivityModel.EndDate,
                ActivityName = usersActivityModel.ActivityName,
                ReminderMessage = usersActivityModel.ReminderMessage
            };
        }
        public static UsersActivity ToUsersActivityFromCreateUsersActivityDto(this CreateUsersActivityDto usersActivityModel)
        {
            return new UsersActivity
            {
                UserId = usersActivityModel.UserId,
                TypeId = usersActivityModel.TypeId,
                CategoryId = usersActivityModel.CategoryId,
                ColorId = usersActivityModel.ColorId,
                GoalPeriodTypeId = usersActivityModel.GoalPeriodTypeId,
                Goal = usersActivityModel.Goal,
                CurrentCount = usersActivityModel.CurrentCount,
                UnitId = usersActivityModel.UnitId,
                TimeRangeId = usersActivityModel.TimeRangeId,
                StartDate = usersActivityModel.StartDate,
                EndDate = usersActivityModel.EndDate,
                ActivityName = usersActivityModel.ActivityName,
                ReminderMessage = usersActivityModel.ReminderMessage
            };
        }
    }
}