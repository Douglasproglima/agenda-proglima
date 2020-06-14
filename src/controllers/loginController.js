const Login = require("../models/LoginModel");

exports.index = (req, res) => {
  if (req.session.user) return res.render("index");
  return res.render("login");
};

exports.reset = (req, res) => {
  console.log('TESTE');
  return res.render('login-reset-pass');
};

exports.register = async function (req, res) {
  try {
    const login = new Login(req.body);
    await login.register();
    
    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(function () {
        return res.redirect("back");
      });
      return;
    }

    req.flash("success", "Seu usuário foi criado com sucesso.");
    req.session.save(function () {
      return res.redirect("back");
    });
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};

exports.login = async function (req, res) {
  try {
    const login = new Login(req.body);
    await login.login();
    
    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(function () {
        return res.redirect("back");
      });
      return;
    }

    req.flash("success", "Autenticação realizada com sucesso.");
    req.session.user = login.user;
    req.session.save(function () {
      return res.redirect("/home");
    });
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};

exports.edit = async function(req, res) {
  console.log('EDIT LOGICONTROLLER');
  try {
      if(!req.params.id) return res.render('404');
      const user = new Login(req.body);
      await user.edit(req.params.email);
      
      if(user.errors.length > 0) {
          req.flash('errors', contact.errors);
          req.session.save(() => res.redirect('back')); //Back -> Redireciona para page anterior
          return;
      }
      
      req.flash('success', 'A senha foi resetada para 123456.');
      req.session.save(() => res.redirect(`/`)); //Back -> Redireciona para page anterior
      return;    
  } catch (error) {
      console.log(e);
      return res.render('404');
  }
};

exports.logout = function (req, res) {
  req.session.destroy();
  res.redirect("/");
};
