import { Project, ProjectStatus } from '../models/project.js';


type Listener<T> = (items: T[]) => void;

export class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

export class ProjectState extends State<Project>{
    private projects: Project[] = [];

    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance
        }
        return this.instance = new ProjectState();
    }



    addProject(title: string, description: string, numberOfPeople: number) {
        const newProject = new Project(Math.random().toString(), title, description, numberOfPeople, ProjectStatus.Active)
        this.projects.push(newProject);
        this.updateListeners();
    }

    moveProject(projectId: string, newSatus: ProjectStatus) {
        const project = this.projects.find(prj => prj.id === projectId);
        if (project && project.status !== newSatus) {
            project.status = newSatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}

export const projectState = ProjectState.getInstance();