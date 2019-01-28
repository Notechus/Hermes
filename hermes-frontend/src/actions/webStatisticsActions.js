import { UPDATE_STATISTICS_SUCCESS } from "reducers/webStatisticsReducer";

export const updateStatistics = (name, value) => ({
  type: UPDATE_STATISTICS_SUCCESS,
  name,
  value
});
