const Contact = require('../models/ContactModel');

exports.index = (req, res) => {
    res.render('contact', {
        contact: {}
    });
};

exports.register = async (req, res) => {
    try {
        const contact =  new Contact(req.body);
        await contact.register();

        if(contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect('back')); //Back -> Redireciona para page anterior
            return;
        }
        
        req.flash('success', 'Contato registrado com sucesso.');
        //req.session.save(() => res.redirect(`/contact/${contact.contact._id}`)); //Back -> Redireciona para page anterior
        req.session.save(() => res.redirect(`/agenda`)); //Back -> Redireciona para page anterior
        return;
    } catch (error) {
        console.log(e);
        return res.render('404');
    }
};

exports.editIndex = async function(req, res) {
    if(!req.params.id) return res.render('404');

    const contact = await Contact.getById(req.params.id);
    if(!contact) return res.render('404');

    res.render('contact', { contact });
};

exports.edit = async function(req, res) {
    try {
        if(!req.params.id) return res.render('404');
        const contact = new Contact(req.body);
        await contact.edit(req.params.id);
        
        if(contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect('back')); //Back -> Redireciona para page anterior
            return;
        }
        
        req.flash('success', 'Contato alterado com sucesso.');
        //req.session.save(() => res.redirect(`/contact/${contact.contact._id}`)); //Back -> Redireciona para page anterior
        req.session.save(() => res.redirect(`/agenda`)); //Back -> Redireciona para page anterior
        return;    
    } catch (error) {
        console.log(e);
        return res.render('404');
    }
};

exports.delete = async function(req, res) {
    if(!req.params.id) return res.render('404');

    const contact = await Contact.delete(req.params.id);
    if(!contact) return res.render('404');

    req.flash('success', 'Registro removido com sucesso');
    req.session.save(() => res.redirect(`/agenda`));
    return;
};