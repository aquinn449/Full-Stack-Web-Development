 const Joi = require("joi");
 const users = require("../models/users-models"),
       emailValidator = require("email-validator");
   

/////

 const getAll = (req, res) => {
    users.getAllUsers((err, num_rows, results) => {
        //if(err) return res.sendStatus(401);
        if(err) return res.sendStatus(500);
        console.log(err)

        return res.status(200).send(results);
    })
}

  const create = (req, res) => {

      const schema = Joi.object({
          "first_name": Joi.string().required(),
          "last_name": Joi.string().required(),
          "email": Joi.string().required(),
          "password": Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-z]).{8,}$/).required()
      })

      const { error } = schema.validate(req.body);
      if(error) return res.status(400).send(error.details[0].message);

      let user = Object.assign({}, req.body);


       if(!emailValidator.validate(user['email']) || user['password'].length <=7 ) {
         return res.status(400).send('email and password must be vaild');
       }
         
       if(!emailValidator.validate(user['email']) || user['password'].length > 12){
         return res.status(400).send('email and password must be vaild and no longer than 12 charcaters');
       }

      users.addNewUser(user, function(err, id) {
          if(err) return res.send(500);
          //if(err) return res.sendStatus(401);

          return res.status(201).send({user_id: id})

      })
  }

 const login = (req, res) => {

    const schema = Joi.object({ 
        "email": Joi.string().required(),
        "password": Joi.string().required()
    })


    const { error } = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

      let email = req.body.email;
      let password = req.body.password;
  
      users.authenticate(email, password, (err, id) => {
          //console.log(err, id);
          if(err === 404 ) { console.log(err) 
             return res.status(400).send('Invalid email/password supplied')
          } 
          if(err) return res.sendStatus(400)
            
              users.getToken(id, (err, token) => {
                if(err) return res.sendStatus(500)

                  /// return existing token if already set (don't modify tokens)
                  if (token){
                      return res.status(200).send({user_id: id, session_token: token})
                  } else {
                      // but if not, complete login by creating a token for the user
                      users.setToken(id, (err, token) => {
                        if(err) return res.sendStatus(500)
                          return res.status(200).send({user_id: id, session_token: token})
                      })
                  }
                })
      })
    }

  
  
 const logout = (req, res) => {
    let token = req.get(('X-Authorization'));
      users.removeToken(token, function(err){
          if (err){
              return res.sendStatus(401);
          }else{
              return res.sendStatus(200);
          }
      });
      //return res.sendStatus(500);
     // return null;
  }

// const isAuthenticated = function(req, res, next) {
//     let token = req.get('X-Authorization');

//     users.getIdToken(token, (err, id) => {
//         if(err || id == null) {
//             return res.sendStatus(401);
//         }
//         next();
//     })
// }


module.exports = {
    getAll: getAll,
    create: create,
    login: login,
    logout: logout
    //isAuthenticated: isAuthenticated
}