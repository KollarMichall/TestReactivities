import { useEffect, useState } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import useStore from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ActivityFormValues } from '../../../app/models/activity';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Formik , Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextAreaInput from '../../../app/common/form/MyTextAreaInput';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { v4 as uuid } from 'uuid';

function ActivityForm() {
  const navigate = useNavigate();
  const { activityStore } = useStore();
  const { loading, loadActivity, loadingInitial, createActivity, updateActivity } = activityStore;
  const { id } = useParams();

  const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());
  const validationSchema = Yup.object({
    title: Yup.string().required("The title is a required field"),
    description: Yup.string().required("The description is a required field"),
    category: Yup.string().required("The category is a required field"),
    date: Yup.string().required("The date is a required field"),
    city: Yup.string().required("The city is a required field"),
    venue: Yup.string().required("The venue is a required field"),
});

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(new ActivityFormValues(activity)))
  }, [id, loadActivity]);

  function handleFormSubmit(activity: ActivityFormValues) {
    if (!activity.id) {
        let newActivity = {
            ...activity,
            id: uuid()
        }
        createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`))
    } else {
        updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
    }
}
  if (loadingInitial) return <LoadingComponent content='Loading activity...' />
  return (
    <Segment clearing>
      <Header content='Activity Details' sub color='teal'/>
      <Formik validationSchema={validationSchema} enableReinitialize initialValues={activity} onSubmit={values => handleFormSubmit(values)}>
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className='ui form' onSubmit={handleSubmit}>
            <MyTextInput placeholder='Title' name='title'/>
            <MyTextAreaInput rows={3} name="description" placeholder="Description"/>
            <MySelectInput options={categoryOptions} placeholder='Category' name='category'/>
            <MyDateInput 
            placeholderText='Date' 
            name='date' 
            showTimeSelect
            timeCaption='time'
            dateFormat={'MMMM d, yyyy h:mm aa'}
            />
      <Header content='Location Details' sub color='teal'/>
            <MyTextInput placeholder='City' name='city'/>
            <MyTextInput placeholder='Venue' name='venue'/>
            <Button disabled={isSubmitting || !dirty || !isValid} loading={isSubmitting} floated="right" positive type="submit" content="Submit" />
            <Button as={Link} to='/activities' floated="right" type="button" content="Cancel" />
          </Form>
        )}
      </Formik>

    </Segment>
  );
}

export default observer(ActivityForm);
