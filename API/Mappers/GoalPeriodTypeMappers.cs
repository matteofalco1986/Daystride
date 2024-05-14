
using Daystride.Dtos.GoalPeriodType;
using Daystride.Models;

namespace Daystride.Mappers
{
    public static class GoalPeriodTypeMappers
    {
        public static GoalPeriodTypeDto ToGoalPeriodTypeDto(this GoalPeriodType goalPeriodTypeModel)
        {
            return new GoalPeriodTypeDto
            {
                Id = goalPeriodTypeModel.Id,
                GoalPeriodName = goalPeriodTypeModel.GoalPeriodName
            };
        }
    }
}