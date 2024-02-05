const Joi = require("joi");
const comments = require("../models/comments-models");
const articles = require("../models/articles-models");

const getAll = (req, res) => {

    let article_id = parseInt(req.params.article_id);

    comments.getAllComments( article_id, (err, results) => {
        if(err) return res.sendStatus(500);

        return res.status(200).send(results);
    })
}

//
//
//
//
///      Look at article id its a forgein key 
///
///
//

const create = (req, res) => {

    let article_id = parseInt(req.params.article_id);

    articles.getSingleArticle(article_id, (err, result) => {
        if(err == 404) return res.sendStatus(404);
        if(err) return res.sendStatus(500);


    const schema = Joi.object({
        "comment_text": Joi.string().required()
    })

    const { error } = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let comment = Object.assign({}, req.body);

    comments.addNewComment(comment, article_id, (err, id) => {
        if(err) return res.sendStatus(500);

        return res.status(201).send({comment_id: id})

    })
    })
}

const getOne = (req, res) => {
    let comment_id = parseInt(req.params.comment_id);

    comments.getSingleComment(comment_id, (err, result) => {
        if(err == 404) return res.sendStatus(404)
        if(err) return res.sendStatus(500)

        return res.status(200).send(result)
    })
}

const updateComment = (req, res) => {
    let comment_id = parseInt(req.params.comment_id);

    comments.getSingleComment(comment_id, (err, result) => {
        if(err == 404) return res.sendStatus(404);
        if(err) return res.sendStatus(500);

        const schema = Joi.object({
            "comment_text": Joi.string()
        })
    
        const { error } = schema.validate(req.body);
        if(error) return res.status(400).send(error.details[0].message); 

        if(req.body.hasOwnProperty("comment_text")) {
            result.comment_text = req.body.comment_text
        }
        
        comments.updateComment(comment_id, result, (err, id) => {
            if(err) {
                console.log(err)
                return res.sendStatus(500)
            }

            return res.sendStatus(200)
        })
})

}

const deleteComment = (req, res) => {
    let comment_id = parseInt(req.params.comment_id);

    comments.getSingleComment(comment_id, (err, result) => {
       if(err === 404) return res.sendStatus(404)
       if(err) return res.sendStatus(500);

       return res.status(200).send("Comment has succesfully been deleted ");
   })

   comments.deleteComment(comment_id, (err, id) => {
      { 
         if(err) return res.sendStatus(404);
      }
   })
}


module.exports = {
    getAll: getAll,
    create: create,
    getOne: getOne,
    updateComment: updateComment,
    deleteComment: deleteComment
}