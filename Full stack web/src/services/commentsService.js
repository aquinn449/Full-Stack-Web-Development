
//getting all comments function 

const getAll = (article_id) => {
    return fetch(`http://localhost:3333/articles/${article_id}/comments`,
    {

        method: 'GET',
        headers: {
            "X-Authorization": localStorage.getItem("session_token"),
            "content-type": "application/json"

        },
    })

    
    .then((response) => {
        if(response.status === 200) {
            return response.json();
        } else {
            throw "Something went wrong "
        }
    })
    .then((resJson) => {
        return resJson
    })
    .catch((error) => {
        console.log("Err", error)
        return Promise.reject(error)
    })
}

// POST request fro adding comment 

const AddComment = (comment_text, article_id) => {

    return fetch(`http://localhost:3333/articles/${article_id}/comments`,
    {

        method: 'POST',
        headers: {
            "content-type": "application/json"

        },

        body: JSON.stringify({
            comment_text
        }),
    })

    .then((response) => {
        if(response.status === 201) {
            return response.json();
        } else {
            throw "Something went wrong "
        }
    })
    .then((resJson) => {
        return resJson
    })
    .catch((error) => {
        console.log("Err", error)
        return Promise.reject(error)
    })
}

//DELETE function to delete single comment 

const DeleteComment = (comment_id) => {

    return fetch(`http://localhost:3333/comments/${comment_id}`, 
    {
        method: 'DELETE',
        headers: {
            "X-Authorization": localStorage.getItem("session_token"),
            "content-type": "application/json"

        },

    })

    .then((response) => {
        if(response.status === 200) 
        {
            return response.json();
        } 
        else if(response.status === 400) 
        {
            throw "Comment not deleted"
        }
          else 
        {
            throw "Something went wrong "
        }
    })
    .then((resJson) => {
        return resJson
    })
    .catch((error) => {
        console.log("Err", error)
        return Promise.reject(error)
    })

}

export const commentsService = {
    getAll,
    AddComment,
    DeleteComment
}