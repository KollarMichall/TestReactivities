import { FunctionComponent } from "react";
import { Tab } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowings from "./ProfileFollowings";
import useStore from "../../app/stores/store";
import ProfileActivities from "./profileActivities";

interface ProfileContentProps {
    profile: Profile
}
 
const ProfileContent: FunctionComponent<ProfileContentProps> = ({profile}) => {
    const {profileStore} = useStore();
    const panes = [
        {menuItem: 'About', render: () => <ProfileAbout/>},
        {menuItem: 'Photos', render: () => <ProfilePhotos profile={profile}/>},
        {menuItem: 'Events', render: () => <ProfileActivities/>},
        {menuItem: 'Followers', render: () => <ProfileFollowings/>},
        {menuItem: 'Following', render: () => <ProfileFollowings/>},
    ];
    return ( <Tab
                menu={{fluid: true, vertical: true}}
                menuPosition="right"
                panes={panes}
                onTabChange={(_, data) => profileStore.setActiveTab(data.activeIndex as number)}
    /> );
}
 
export default observer(ProfileContent);