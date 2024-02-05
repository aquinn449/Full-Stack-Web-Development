const db = require("../../database");
const crypto = require('crypto');

const getAllUsers = (done) => {
    const results = [];

    db.each(
        "SELECT * FROM users",
        [],
        (err, row) => {
            if(err) console.log("Something went wrong" + err);

            results.push({
                user_id: row.user_id,
                first_name: row.first_name,
                last_name: row.last_name,
                email: row.email
            });
        },
        (err, num_rows) => {
            return done(err, num_rows, results);
        }
    )
}

const getHash = function(password, salt){
    return crypto.pbkdf2Sync(password, salt, 100000, 256, 'sha256').toString('hex');
};

 const addNewUser = (user, done) => {

    const salt = crypto.randomBytes(64);
    const hash = getHash(user.password, salt); 

     const sql = 'INSERT INTO users (first_name, last_name, email, password, salt) VALUES (?,?,?,?,?)';
     let values = [user.first_name, user.last_name, user.email, hash, salt.toString('hex')];

     db.run(
         sql,
         values,
         function(err){
             if(err) return done(err, null);

             return done(null, this.lastID);
         }
     )

 }


const removeToken = (token, done) => {
    db.run(
        'UPDATE users SET session_token=null WHERE session_token=?',
        [token],
        function(err){return done(err)}
    )
};

const setToken = function(id, done){
    let token = crypto.randomBytes(16).toString('hex');
    db.run(
        'UPDATE users SET session_token=? WHERE user_id=?',
        [token, id],
        function(err){return done(err, token)}
    );
};

const getToken = function(id, done){
    db.get(
        'SELECT session_token FROM users WHERE user_id=?',
        [id],
        function(err, row){
          if (row && row.session_token){
            return done(null, row.session_token);
          }else{
            return done(null, null);
          } 
        }
    );
};

const authenticate = function(email, password, done){
    db.get(
        'SELECT user_id, password, salt FROM users WHERE (email=?)',
        [email],
        function(err, row) {

            if (err || !row){
                console.log("AUTH 1", err, row);
                return done(true); // return error = true (failed auth)
            }else{

                if(row.salt == null){
                    row.salt = '';
                }

                let salt = Buffer.from(row.salt, 'hex');

                if (row.password === getHash(password, salt)){
                    return done(false, row.user_id);
                }else{
                    console.log("failed passwd check");
                    return done(true); // failed password check
                }

            }
        }
    );
};

const getIdToken = function(token, done){
    if (token === undefined || token === null)
        return done(true, null);
    else {
        db.get(
            'SELECT user_id FROM users WHERE session_token=?',
            [token],
            function(err, row){
                if (row)
                    return done(null, row.user_id);
                return done(err, null);
            }
        )
    }
};

// const check_userExists = function(id, done){
//   if (id === undefined || id === null)
//       return done(true, null);
//   else {
//       db.get(
//           'SELECT * FROM users WHERE user_id=?',
//           [id],
//           function(err, row){
//               if (row != null)
//                   return done(null, row.user_id);
//               return done(err, null);
//           }
//       )
//   }
// };


module.exports = {
    getAllUsers: getAllUsers,
    getHash: getHash,
    addNewUser: addNewUser,
    getIdToken: getIdToken,
    //check_userExists: check_userExists,
    authenticate: authenticate,
    getToken: getToken,
    setToken: setToken,
    removeToken: removeToken
}