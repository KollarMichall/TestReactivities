import { FunctionComponent } from "react";
import { Activity } from "../../../app/models/activity";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import ActivityListItemAttendee from "./ActivityListItemAttendee";

interface ActivityListItemProps {
    activity: Activity;
}
 
const ActivityListItem: FunctionComponent<ActivityListItemProps> = ({activity}: ActivityListItemProps) => {
  
    return ( 
        <Segment.Group>
            <Segment>
            {activity.isCancelled &&
                    <Label attached='top' color='red' content='Cancelled' style={{ textAlign: 'center' }} />}
              
                <Item.Group>
                    <Item>
                        <Item.Image size="tiny" circular src={activity.host?.image || '/assets/user.png'} alt="user"/>
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                            <Item.Description>Hosted by <Link to={`/profiles/${activity.hostUsername}`}>{activity.host?.displayName}</Link></Item.Description>
                            {activity.isHost && (
                                <Item.Description>
                                    <Label basic color='orange'>
                                        You are hosting this activity!
                                    </Label>
                                </Item.Description>
                            )}
                            {activity.isGoing && !activity.isHost && (
                                <Item.Description>
                                    <Label basic color='green'>
                                        You are going to this activity!
                                    </Label>
                                </Item.Description>
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name="clock"/> {format(activity.date!, 'dd MMM yyyy h:mm aa')}
                <Icon name="marker"/> {activity.venue}
            </Segment>
            <Segment secondary>
               <ActivityListItemAttendee attendees={activity.attendees!}/>
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