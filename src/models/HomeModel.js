const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    password_repeat: { type: String, required: true }
});

const HomeModel = mongoose.model('Home', HomeSchema);
//module.exports = HomeModel;

class Home {
    constructor(body) {
        this.body = body;
    }
}

module.exports = Home;