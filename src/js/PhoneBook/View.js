class View {
    #modal = null;
    #modalHeader = null;
    #modalBody = null;

    constructor() {
        const modalWindow = this.#createModal();
        this.#modal = new bootstrap.Modal(modalWindow, {
            backdrop: 'static'
        })
    }

    openModal() {
        this.#modal.show();
    }
    closeModal() {
        this.#modal.hide();
    }




    createAddContactFrom() {
        const form = document.createElement('form');
        form.innerHTML = `
            <div class="mb-3">
              <label for="contact-name" class="form-label">Contact name</label>
              <input name="contactName" type="text" class="form-control" id="contact-name" placeholder="John Doe">
            </div>
            <div class="mb-3">
              <label for="phone-number" class="form-label">Phone number</label>
              <input type="tel" name="phoneNumber" class="form-control" id="phone-number" placeholder="666-666-66-6">
            </div>
             <div class="mb-3">
              <label for="position" class="form-label">Position</label>
              <input type="text" name="position" class="form-control" id="position" placeholder="Developer">
            </div>
            <div>
                <button class="btn btn-success" type="submit">Add Contact</button>
                <button class="btn btn-danger" type="reset">Reset Form</button>
            </div>
        `

        return form;
    }


    #createModal() {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.classList.add('fade');
        modal.id = 'modal';
        modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header"></div>
                <div class="modal-body"></div>
            </div>
        </div>`;

        this.#modalHeader = modal.querySelector('.modal-header');
        this.#modalBody = modal.querySelector('.modal-body');
        document.body.append(modal);

        return modal;
    }

    set modalHeader(value) {
        if(typeof value !== 'string') throw new Error('Modal Header should be a string');
        this.#modalHeader.innerHTML = value;
    }

    set modalBody(value) {
        if( !(value instanceof HTMLFormElement)) throw new Error('Modal Body should be a HTML Form');
        this.#modalBody.append(value);
    }

    clearModalBody() {
        this.#modalBody.innerHTML = '';
    }
}

export default View;