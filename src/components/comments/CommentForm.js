// imports
// addComment from CommentManager
import { useState } from "react"
import { addComment } from "./CommentManager"

// export function that handles comment form entry
export const CommentForm = ({ postId, getComments }) => {
    // declare state variable for comment to add
    const [newComment, setComment] = useState("")
    const [subject, setSubject] = useState("")
    
    // function to handle comment submission
    const submitComment = () => {
        if(newComment.length > 0) {

            const copy = {}
            // gets comment content from state
            copy.content = newComment
            copy.subject = subject
            // adds postId
            copy.post_id = postId
            
            // sends to database 
            addComment(copy)
            .then(() => setComment(""))
            .then(() => setSubject(""))
            // refresh comment list
            .then(() => getComments(postId))
        } else {
            window.alert("Please fill out your comment before submitting.")
        }
    }
    return <>
        {/* 
            textarea form input
            button to submit comment
        */}
        <b>Create a Comment</b>
        <label htmlFor="subject">Subject:</label>
        <input id="subject" name="subject"
                    onChange={(e) => setSubject(e.target.value)}
                    value={subject}/>
        <label htmlFor="content">Comment:</label>
        <textarea id="content" name="content"
                    onChange={(e) => setComment(e.target.value)}
                    value={newComment}>
        </textarea>
        <button className="commentSubmit" onClick={() => submitComment()}>
            Submit Comment
        </button>
    </>
}