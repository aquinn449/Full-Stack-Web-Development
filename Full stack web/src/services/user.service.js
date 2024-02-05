
//POST request to login 

const login = (email, password) => {
    return fetch("http://localhost:3333/login",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })
    .then((response) => {
        if(response.status === 200) 
        {
            return response.json();
        } 
        else if(response.status === 400) 
        {
            throw "Bad request"
        }
          else 
        {
            throw "Something went wrong "
        }
    })
    .then((resJson) => {
        localStorage.setItem("user_id", resJson.user_id);
        localStorage.setItem("session_token", resJson.session_token);
        return resJson
    })
    .catch((error) => {
        console.log("Err", error)
        return Promise.reject(error)
    })
}

//POST request to get all users 

const getAll = () => {
    return fetch(`http://localhost:3333/users`,
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

//POST request to add user 

const AddUser = (first_name, last_name, email, password) => {

    return fetch(`http://localhost:3333/users`,
    {

        method: 'POST',
        headers: {
            "content-type": "application/json",
            "X-Authorization": localStorage.getItem("session_token")

        },

        body: JSON.stringify({
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "password": password
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

export const userService = {
    login,
    getAll,
    AddUser
}