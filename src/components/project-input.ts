import { Component } from './base-component.js';
import * as Validation from '../util/validation.js';
import { autobind } from '../decorators/autobind.js';
import { projectState } from '../state/project-state.js';



export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super("project-input", 'app', true, 'user-input');
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
        this.configure();
    }


    gatherInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDesc = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        const titleValidatable: Validation.Validatable = {
            value: enteredTitle,
            required: true
        }

        const descValidatable: Validation.Validatable = {
            value: enteredDesc,
            required: true,
            minLength: 3
        }

        const peopleValidatable: Validation.Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        }

        if (!Validation.validate(titleValidatable) || !Validation.validate(descValidatable) || !Validation.validate(peopleValidatable)) {
            alert('Invalid input values, please try again')
        } else {
            return [enteredTitle, enteredDesc, +enteredPeople]
        }
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent(): void {

    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';

    }


    @autobind
    private submitHandler(e: Event) {
        e.preventDefault();
        const userInput = this.gatherInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            this.clearInputs();
        }
    }
}