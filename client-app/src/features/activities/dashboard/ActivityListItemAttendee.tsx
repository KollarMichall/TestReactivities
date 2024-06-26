import { observer } from "mobx-react-lite";
import { FunctionComponent } from "react";
import { Image, List, Popup } from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";
import { Link } from "react-router-dom";
import ProfileCard from "../../profiles/ProfileCard";

interface ActivityListItemAttendeeProps {
    attendees: Profile[];
}
 
const ActivityListItemAttendee: FunctionComponent<ActivityListItemAttendeeProps> = ({attendees}: ActivityListItemAttendeeProps) => {
    const styles = {
        borderColor: 'orange',
        borderWidth: 2
    };
    return ( <List horizontal>
        {attendees.map(attendee => (
            <Popup hoverable key={attendee.username} trigger={
                <List.Item key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
             <Image size="mini" circular src={attendee.image || '/assets/user.png'} bordered
             style={attendee.following ? styles : null}/>
         </List.Item>

}>
    <Popup.Content>
        <ProfileCard profile={attendee}/>
    </Popup.Content>
                </Popup>

        ))}
    </List> );
}
 
export default observer(ActivityListItemAttendee);