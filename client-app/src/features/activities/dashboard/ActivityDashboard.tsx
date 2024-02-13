import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import useStore from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useEffect } from "react";
import ActivityFilters from "./ActivityFilters";

function ActivityDashboard() {
  const { activityStore } = useStore();
  const { loadActivities, activitiesRegistry } = activityStore;
  useEffect(() => {
    if (activitiesRegistry.size <= 1) loadActivities();
  }, [activitiesRegistry.size, loadActivities])


  if (activityStore.loadingInitial) return <LoadingComponent />
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityDashboard);