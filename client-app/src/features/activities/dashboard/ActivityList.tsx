import { Fragment, FunctionComponent } from "react";
import { Header } from "semantic-ui-react";
import useStore from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";


const ActivityList: FunctionComponent = () => {
    const { activityStore } = useStore();
    const { groupedAcitivies } = activityStore;
    return (
        <>
            {groupedAcitivies.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color="teal">
                        {group}
                    </Header>
                    {activities.map(activity => (
                        <ActivityListItem key={activity.id} activity={activity} />
                    ))}
                </Fragment>
            ))}
        </>

    );
}

export default observer(ActivityList);


