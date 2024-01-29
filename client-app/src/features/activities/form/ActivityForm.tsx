import React, { useEffect, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import useStore from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Activity } from '../../../app/models/activity';
import LoadingComponent from '../../../app/layout/LoadingComponent';



function ActivityForm() {
  const navigate = useNavigate();
  const { activityStore } = useStore();
  const { loading, createActivity, updateActivity, loadActivity, loadingInitial } = activityStore;
  const {id} = useParams();

  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    description: '',
    category: '',
    date: '',
    city: '',
    venue: '',
  });
useEffect(() => {
  if(id) loadActivity(id).then((activity) => setActivity(activity!))
}, [id, loadActivity]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    activity.id ? 
    updateActivity(activity).then(()=> navigate(`/activities/${activity.id}`))
     : 
     createActivity(activity).then(()=> navigate(`/activities/${activity.id}`))
  };
if(loadingInitial) return <LoadingComponent content='Loading activity...'/>
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          name="title"
          value={activity.title}
          onChange={handleInputChange}
          placeholder="Title"
        />
        <Form.TextArea
          name="description"
          value={activity.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <Form.Input
          name="category"
          value={activity.category}
          onChange={handleInputChange}
          placeholder="Category"
        />
        <Form.Input
          type='date'
          name="date"
          value={activity.date}
          onChange={handleInputChange}
          placeholder="Date"
        />
        <Form.Input
          name="city"
          value={activity.city}
          onChange={handleInputChange}
          placeholder="City"
        />
        <Form.Input
          name="venue"
          value={activity.venue}
          onChange={handleInputChange}
          placeholder="Venue"
        />
        <Button loading={loading} floated="right" positive type="submit" content="Submit" />
        <Button as={Link} to='/activities' floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
}

export default observer(ActivityForm);
