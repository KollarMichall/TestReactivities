import { FunctionComponent } from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

interface ActivityFiltersProps {
    
}
 
const ActivityFilters: FunctionComponent<ActivityFiltersProps> = () => {
    return ( <>
    <Menu vertical size="large" style={{width: "100%", marginTop: "25px"}} >
        <Header icon={'filter'} attached color="teal" content='Filters'/>
        <Menu.Item content='All activities'/>
        <Menu.Item content="I'm going"/>
        <Menu.Item content="I'm hosting"/>
        </Menu>
        <Header/>
        <Calendar/>
    </> );
}
 
export default ActivityFilters;