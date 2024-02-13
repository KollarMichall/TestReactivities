import { FunctionComponent } from "react";
import { Activity } from "../../../app/models/activity";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

interface ActivityListItemProps {
    activity: Activity;
}
 
const ActivityListItem: FunctionComponent<ActivityListItemProps> = ({activity}: ActivityListItemProps) => {
  
    return ( 
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="tiny" circular src='/assets/user.png' alt="user"/>
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                            <Item.Description>Hosted by KolliM</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name="clock"/> {format(activity.date!, 'dd MMM yyyy h:mm aa')}
                <Icon name="marker"/> {activity.venue}
            </Segment>
            <Segment secondary>
                Attendees go here
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button
                    as={Link}
                    to={`/activities/${activity.id}`}
                    floated="right"
                    content="View"
                    color="teal"
                />
            </Segment>
        </Segment.Group>
     );
}
 
export default ActivityListItem;