import React, { useState, useEffect } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface ActivityFormProps {
  activity: Activity | undefined;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
  submitting: boolean;
}

function ActivityForm({ activity: selectedActivity, closeForm, createOrEdit, submitting}: ActivityFormProps) {
    const inicialize = selectedActivity ?? {
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: '',
    };
  const [activity, setActivity] = useState(inicialize);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    createOrEdit(activity)
  };

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
        <Button loading={submitting} floated="right" positive type="submit" content="Submit" />
        <Button onClick={closeForm} floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
}

export default ActivityForm;
