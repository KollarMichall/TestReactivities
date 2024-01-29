import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import {v4 as uuid} from 'uuid';
import agent from "../api/agent";

export default class ActivityStore {
    activities: Activity[] = [];
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    constructor() {
        makeAutoObservable(this);
    }
    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
               this.setActivity(activity);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if(activity) { 
            this.selectedActivity = activity;
            return activity;
        }
        else{
            this.setLoadingInitial(true);
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => this.selectedActivity = activity);
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
                
            }
        }
    }
    private getActivity(id: string) {
        return this.activities.find(x => x.id === id);
    }
    private setActivity(activity: Activity) {
        activity.date = activity.date.split('T')[0];
        this.activities.push(activity);
    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(x => x.id === id);
    }
    createActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            activity.id = uuid();
           await agent.Activities.create(activity);
            runInAction(() => {
                this.activities.push(activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activities = [...this.activities.filter(x => x.id !== activity.id) , activity];
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
               await agent.Activities.delete(id);
               runInAction(() => {
                   this.activities = [...this.activities.filter(x => x.id !== id)];
                   this.loading = false;
                })
                
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })

        }
    }
}

