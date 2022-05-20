import { fetchIt } from "../utils/Fetch"
import { Settings } from "../utils/Settings"

// get all subs by user id
export const getSubsForFollower = (followerId) => {
    return fetch(`${Settings.API}/subscriptions?follower=${followerId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())

}

// post new sub relationship
export const addSub = (new_sub) => {
    return fetch(`${Settings.API}/subscriptions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        }, body: JSON.stringify(new_sub)
    })
        .then(res => res.json())

}
// delete sub relationship
export const deleteSub = (subId) => {
    return fetch(`${Settings.API}/subscriptions/${subId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
}