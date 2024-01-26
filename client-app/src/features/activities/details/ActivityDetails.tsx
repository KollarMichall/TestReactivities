import { FunctionComponent } from "react";
import { Activity } from "../../../app/models/activity";
import { Button, Card, Image } from "semantic-ui-react";

interface ActivityDetailsProps {
    activity: Activity;
    cancelSelectAktivity: () => void;
    openForm: (id: string) => void;
}

const ActivityDetails: FunctionComponent<ActivityDetailsProps> = ({ activity, cancelSelectAktivity, openForm}: ActivityDetailsProps) => {
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} alt={'img'}/>
            <Card.Content>
                <Card.Header>
                    {activity.title}
                </Card.Header>
                <Card.Meta><span>{activity.date}</span></Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button onClick={() => openForm(activity.id)}basic color="blue" content="Edit" />
                    <Button onClick={cancelSelectAktivity} basic color="grey" content="Cancel" />
                </Button.Group>
            </Card.Content>
        </Card>
    );
}

export default ActivityDetails;