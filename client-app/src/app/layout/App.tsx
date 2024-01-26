import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data)
    })
  }, [])
  const handleSelectAktivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id === id));
  }
  const handleCancelSelectAktivity = () => {
    setSelectedActivity(undefined);
  }
  const handleFormOpen = (id?: string) => {
    id ? handleSelectAktivity(id) : handleCancelSelectAktivity();
    setEditMode(true);
  }
  const handleFormClose = () => {
    setEditMode(false);
  }
  const handleCreateOrEditAktivity = (activity: Activity) => {
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
    : setActivities([...activities, activity])
    setSelectedActivity(activity);
    setEditMode(false);
  }
  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
     <ActivityDashboard 
     activities={activities}
     selectedActivity={selectedActivity}
     selectAktivity={handleSelectAktivity}
     cancelSelectAktivity={handleCancelSelectAktivity}
     editMode={editMode}
     openForm={handleFormOpen}
     closeForm={handleFormClose}
     createOrEdit={handleCreateOrEditAktivity}
     />
      </Container>
    </>
  )
}

export default App
