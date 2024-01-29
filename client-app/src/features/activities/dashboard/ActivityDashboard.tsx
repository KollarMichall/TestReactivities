import { Grid} from "semantic-ui-react";
import ActivityList from "./ActivityList";
import useStore from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useEffect } from "react";

function ActivityDashboard() {
    const {activityStore} = useStore();
const {loadActivities, activities} = activityStore;
    useEffect(() => {
      if(activities.length <= 1) loadActivities();
    }, [activities.length, loadActivities])
    
    
    if(activityStore.loadingInitial) return <LoadingComponent />
    return (
        <Grid>
            <Grid.Column width={10}>
            <ActivityList />
            </Grid.Column>
            <Grid.Column width={6}>
              <h2>Activity filter</h2>
            </Grid.Column>
        </Grid>
    );
}

export default observer(ActivityDashboard);