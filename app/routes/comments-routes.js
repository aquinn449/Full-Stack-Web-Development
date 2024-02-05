const comments = require("../controllers/comments"),
auth = require('../lib/authentication');


module.exports = function(app) {

    app.route("/articles/:article_id/comments")
    .get(comments.getAll)
    .post(comments.create);

    app.route("/comments/:comment_id")
    //.get(comments.getOne)
    //.patch(comments.updateComment)
    .delete(auth.isAuthenticated, comments.deleteComment);
}