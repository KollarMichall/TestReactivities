import { Grid} from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
interface Props{
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectAktivity: (id: string) => void;
    cancelSelectAktivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void
}
function ActivityDashboard({activities, selectedActivity, selectAktivity, cancelSelectAktivity, editMode, openForm, closeForm, createOrEdit} : Props) {
    return (
        <Grid>
            <Grid.Column width={10}>
            <ActivityList activities={activities}
            selectAktivity={selectAktivity}
            />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode &&
                <ActivityDetails activity={selectedActivity} cancelSelectAktivity={cancelSelectAktivity} openForm={openForm}/>}
                {editMode &&
                    <ActivityForm activity={selectedActivity} closeForm={closeForm} createOrEdit={createOrEdit}/>
                }
            </Grid.Column>
        </Grid>
    );
}

export default ActivityDashboard;