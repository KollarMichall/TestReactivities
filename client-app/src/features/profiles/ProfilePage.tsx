import { FunctionComponent, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { observer } from "mobx-react-lite";
import useStore from "../../app/stores/store";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../app/layout/LoadingComponent";

interface ProfilePageProps {
    
}
 
const ProfilePage: FunctionComponent<ProfilePageProps> = () => {
    const {username} = useParams<{username: string}>();
    const {profileStore} = useStore();
    const {loadingProfile, loadProfile, profile, setActiveTab} = profileStore;
        
    useEffect(() => {
        if (username) loadProfile(username);
       return () => {
        setActiveTab(0);
       }
    }, [loadProfile, username, setActiveTab]);

    //if (loadingProfile)  return <LoadingComponent inverted content='Loading profile...' />

    return ( 
        <Grid>
            <Grid.Column width={16}>
                {profile && 
                <>
                    <ProfileHeader profile={profile}/>
                    <ProfileContent profile={profile}/>
                </>
                }
            </Grid.Column>
        </Grid>
     );
}
 
export default observer(ProfilePage);