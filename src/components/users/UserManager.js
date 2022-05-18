import { fetchIt } from "../utils/Fetch"
import { Settings } from "../utils/Settings"

// get all users fetch
// server returns user array with following properties for each user
// id
// first_name
// last_name
// username
// email
export const getAllUsers = () => {
    return fetch(`${Settings.API}/authors`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })  
.then(res => res.json())
}


export const getCurrentUser = () => {
    return fetch(`${Settings.API}/users`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getSingleUser = (id) => {
    return fetch(`${Settings.API}/authors/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const changeActive = (user) => {
    return fetch(`${Settings.API}/users/${user.id}`, {
        method: "PUT",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(user)
    })
}
