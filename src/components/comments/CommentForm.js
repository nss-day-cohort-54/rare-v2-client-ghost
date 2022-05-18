// imports
// addComment from CommentManager
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { addComment, editComment, getCommentsByPostId, getComments } from "./CommentManager"

// export function that handles comment form entry
export const CommentForm = ({ postId, getComments }) => {
    // declare state variable for comment to add
    const [newComment, setComment] = useState("")
    const [subject, setSubject] = useState("")
    const {postId, commentId} = useParams()
    const history = useHistory()
    
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

    const editMode = commentId ? true : false
    

    useEffect(() => {
        if (editMode) {
            getCommentById(commentId).then((res) => {
                setComment(res.content)
            })
        }
    },[])

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