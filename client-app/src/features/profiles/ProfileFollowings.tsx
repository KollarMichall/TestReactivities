import { observer } from "mobx-react-lite";
import { FunctionComponent } from "react";
import { Card, Grid, Header, Tab } from "semantic-ui-react";
import useStore from "../../app/stores/store";
import ProfileCard from "./ProfileCard";

interface ProfileFollowingsProps {

}

const ProfileFollowings: FunctionComponent<ProfileFollowingsProps> = () => {
    const { profileStore } = useStore();
    const { profile, followings, loadingFollowings, activeTab } = profileStore;


    return (<Tab.Pane loading={loadingFollowings}>
        <Grid>
            <Grid.Column width={16}>
                <Header floated="left" icon={'user'}
                 content={activeTab === 3 ? `People following ${profile?.displayName}` : `People ${profile?.displayName} is following`} />
            </Grid.Column>
        </Grid>
        <Grid.Column width={16}>
            <Card.Group itemsPerRow={4}>
                {followings.map(profile => (
                    <ProfileCard key={profile.username} profile={profile}/>
                ))}
            </Card.Group>
        </Grid.Column>
    </Tab.Pane>);
}

export default observer(ProfileFollowings);