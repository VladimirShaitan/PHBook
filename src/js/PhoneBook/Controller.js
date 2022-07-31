import {
    addContactSelector,
    addContactModalTitle
} from './config.js';

class Controller {
    #model = null
    #view = null

    constructor(Model, View) {
        this.model = Model;
        this.view = View;
    }

    init() {
        this.#handleContactAddBtn();
    }

    #handleContactAddBtn() {
        document.querySelector(addContactSelector)
            .addEventListener('click', this.#contactAddBtnHandler)
    }

    #contactAddBtnHandler = (e) => {
        e.stopPropagation();
        const addContactForm = this.#view.createAddContactFrom();
        addContactForm.addEventListener('submit', this.#addContactFormHandler);


        this.#view.modalHeader = addContactModalTitle;
        this.#view.modalBody = addContactForm;

        this.#view.openModal();
    }

    #addContactFormHandler = e => {
        e.preventDefault();
        e.stopPropagation();

        const {target} = e;

        const inputs = target.querySelectorAll('input');
        const data = Array.from(inputs)
            .reduce((acc, input) => {
                acc[input.name] = input.value
                return acc;
            }, {})


        // todo: Save data to localStorage
        // todo: Render from localStorage to frontend
        console.log(data)

        this.#view.closeModal();

        setTimeout(() => {
            this.#view.modalHeader = '';
            this.#view.clearModalBody();
        }, 150)

        target.removeEventListener('submit', this.#addContactFormHandler);
    }



    set model(ModelClass) {
        if(this.#model) throw new Error('Model is already been declared');
        if(!ModelClass) throw new Error('Model is invalid');
        this.#model = new ModelClass();
    }
    set view(ViewClass) {
        if(this.#view) throw new Error('View is already been declared');
        if(!ViewClass) throw new Error('View is invalid');
        this.#view = new ViewClass();
    }
}

export default Controller;