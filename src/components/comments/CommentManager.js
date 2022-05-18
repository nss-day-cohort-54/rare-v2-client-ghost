import { fetchIt } from "../utils/Fetch"
import { Settings } from "../utils/Settings"

// getCommentsByPostId
export const getCommentsByPostId = (postId) => {
    return fetch(`${Settings.API}/comments?post=${postId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    }).then(response => response.json())
}

// deleteComment
export const deleteComment = (commentId) => {
    return fetch(`${Settings.API}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
}

// addComment
export const addComment = (newComment) => {
    return fetch(`${Settings.API}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        }, body: JSON.stringify(newComment)
    })
        .then(res => res.json())
}
