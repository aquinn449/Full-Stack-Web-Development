
//Getting all articles method 

const getAll = () => {
    return fetch("http://localhost:3333/articles")
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

//Getting single article method 

const getOne = (article_id) => {
    return fetch("http://localhost:3333/articles/" + article_id)
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

// The POST function for adding article

const AddArticle = (title, author, article_text) => {
    return fetch(`http://localhost:3333/articles/`, {

        method: 'POST',
        headers: {
            "content-type": "application/json",
            "X-Authorization": localStorage.getItem("session_token")

        },
        body: JSON.stringify({
            "title": title,
            "author": author,
            "article_text": article_text
        })
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

export const articleService = {
    getAll,
    getOne,
    AddArticle
}

