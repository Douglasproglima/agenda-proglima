import validator from 'validator';

export default class Contact {
    constructor(formClassHtml) { 
        this.form = document.querySelector(formClassHtml);
    }

    init() {
        this.events();
    }

    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            this.validate(event);
        });
    }

    validate(event) {
        const el = event.target;
        const name = el.querySelector('input[name="name"]');
        const lastName = el.querySelector('input[name="lastName"]');
        const email = el.querySelector('input[name="email"]');
        const phoneNumber = el.querySelector('input[name="phoneNumber"]');
        let isError = false;

        if(email.value.length <= 0 && !validator.isEmail(email.value)) {
            alert('O e-mail é obrigatório!');
            isError = true;
            return;
        }

        if(name.value.length <= 0) {
            alert('O nome é obrigatório');
            isError = true;
            return;
        }

        if(email.value.length <= 0 && phoneNumber.value.length <= 0) {
            alert('Informe pelo ao menos um dos campos "E-mail" ou "Celular"');
            isError = true;
            return;
        }

        if(!isError) el.submit();
    }
}