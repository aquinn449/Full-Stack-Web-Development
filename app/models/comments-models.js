const db = require("../../database");
const articles = require("../models/articles-models"); 

const getAllComments = (id, done) => {
    const results = [];

    db.each(
        "SELECT * FROM comments WHERE article_id=?",
        [id],
        (err, row) => {
            if(err) console.log("Something went wrong" + err);

            results.push({ 
                comment_id: row.comment_id,
                comment_text: row.comment_text,
                date_published: new Date(row.date_published).toLocaleDateString(),
                article_id: row.article_id
            });
        },
        (err) => {
            return done(err, results);
        }
    )
}

const addNewComment = (comment, article_id, done) => {

    let date = Date.now();
    const sql = 'INSERT INTO comments (comment_text, date_published, article_id ) VALUES (?,?,?)';
    let values = [(comment.comment_text), date, article_id];
///
///   might be comments. rather then comment. 
///
    db.run(
        sql,
        values,
        function(err){
            if(err) return done(err, null);

            return done(null, this.lastID);
        }
    )

}

const getSingleComment = (id, done) => {
    const sql = 'SELECT * FROM comments WHERE comment_id=?'

    db.get(sql, [id], (err, row) => {
        if(err) return done(err)
        if(!row) return done(404)

        return done(null, {
            comment_id: row.comment_id,
            comment_text: row.comment_text,
            date_published: new Date(row.date_published).toLocaleDateString(),
            article_id: row.article_id
        })
    })
}

const updateComment = (id, comment, done) => {
    const sql = 'UPDATE comments SET comment_text=? WHERE comment_id=?'
    let values = [comment.comment_text, id];

    db.run(sql, values, (err) => {
        return done(err)
    })

}

 const deleteComment = (id, done) => {
     const sql = 'DELETE FROM comments WHERE comment_id=?'

     db.run(sql, [id], (err) => {
          return done(err)

     })
 }


module.exports = {
    getAllComments: getAllComments,
    addNewComment: addNewComment,
    getSingleComment: getSingleComment,
    updateComment: updateComment,
    deleteComment: deleteComment
}
