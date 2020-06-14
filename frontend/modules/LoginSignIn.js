import validator from 'validator';

export default class LoginSignInAndUp {
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
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        let isError = false;

        if(!validator.isEmail(emailInput.value)) {
            alert('O e-mail é obrigatório!');
            isError = true;
            return;
        }

        if(passwordInput.value.length < 6 ||  passwordInput.value.length > 20) {
            alert('A senha precisa conter de 6 há 20 caracteres');
            isError = true;
            return;
        }

        if(!isError) el.submit();
    }
}