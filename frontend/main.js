import 'core-js/stable';
import 'regenerator-runtime/runtime';
import execute from './modules/promises';
import LoginSignIn from './modules/LoginSignIn';
import LoginSignUp from './modules/LoginSignUp';
import Contact from './modules/Contact';
import './assets/css/style.css';
//import './assets/css/custom.css';

const loginSignIn = new LoginSignIn('.frm-sign-in');
const loginSignUp = new LoginSignUp('.frm-sign-up');
const contact = new Contact('.needs-validation');

loginSignIn.init();
loginSignUp.init();
contact.init();

execute();