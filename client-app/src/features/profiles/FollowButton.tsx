import { FunctionComponent, SyntheticEvent } from "react";
import { Profile } from "../../app/models/profile";
import { Button, Reveal } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import useStore from "../../app/stores/store";

interface FollowButtonProps {
    profile: Profile;
}

const FollowButton: FunctionComponent<FollowButtonProps> = ({ profile }) => {
const {profileStore, userStore} = useStore();
const {updateFollowing, loading} = profileStore;

if(userStore.user?.username === profile.username) return null;

const handleFollow = (e: SyntheticEvent, username: string) => {
    e.preventDefault();
    profile.following ? updateFollowing(username, false) :  updateFollowing(username, true); 
}

    return (
        <Reveal animated="move">
            <Reveal.Content visible style={{ width: '100%' }}>
                <Button fluid loading={loading} color="teal" content={profile.following ? "Following" : "Not following" } />
            </Reveal.Content>
            <Reveal.Content hidden style={{ width: '100%' }}>
                <Button
                    fluid
                    basic
                    loading={loading}
                    color={profile.following ? 'red' : 'green'}
                    content={profile.following ? 'Unfollow' : 'Follow'}
                    onClick={(e) => handleFollow(e, profile.username)}
                />
            </Reveal.Content>
        </Reveal>
    );
};

export default observer(FollowButton);
