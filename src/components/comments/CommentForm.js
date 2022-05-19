// imports
// addComment from CommentManager
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { addComment, getCommentsByPostId, getCommentById, editComment, getSingleComment } from "./CommentManager"

// export function that handles comment form entry
export const CommentForm = ({ setRefreshState, refreshState }) => {
    // declare state variable for comment to add

    const [subject, setSubject] = useState("")
    const [originalComment, setOriginalComment] = useState({})
    const { postId, commentId } = useParams()

    const history = useHistory()

    const editMode = commentId ? true : false

    const [newComment, setComment] = useState({
        content: "",
        subject: "",
        created_on: Date.now()

    })

    useEffect(() => {
        if (editMode) {
            getSingleComment(commentId).then((res) => {
                const copy = {}
                copy.id = originalComment.id
                copy.content = originalComment.content
                copy.subject = originalComment.subject
                copy.created_on = originalComment.created_on
                setComment(copy)
            })
        }
    }, [originalComment])

    useEffect(() => {
        if (commentId) {
            getSingleComment(parseInt(commentId))
                .then(newComment => {
                    setOriginalComment(newComment)
                })
        }
    }, [refreshState])

    const handleInputChange = (event) => {
        const updatedComment = { ...newComment }
        updatedComment[event.target.id] = event.target.value;
        setComment(updatedComment)
    }

    // function to handle comment submission
    const submitComment = () => {
        if (newComment.length === 0) {
            window.alert("Please fill out your comment before submitting.")
        } else {
            if (editMode) {
                editComment({
                    id: newComment.id,
                    content: newComment.content,
                    subject: newComment.subject,
                    created_on: newComment.created_on,
                    post: postId
                })
                    .then(() => history.push(`/posts/single/${postId}`))
            } else {
                addComment({
                    id: newComment.id,
                    content: newComment.content,
                    subject: newComment.subject,
                    created_on: newComment.created_on,
                    post_id: postId,
                    author: parseInt(localStorage.getItem("token"))
                })
                    .then(() => history.push(`/posts/single/${postId}`))
            }
        }
    }


    return <>
        {/* 
            textarea form input
            button to submit comment
        */}
        <form className="commentForm">
            <h2 className="commentForm__title"><b>{editMode ? "Edit Post" : "Add Post"}</b></h2>
            <fieldset>
                <div className="form_group">
                    <label htmlFor="subject"> Subject: </label>
                    <input type="text" id="subject" name="subject" required autoFocus className="form-control"
                        placeholder="Comment Subject"
                        value={newComment.subject}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form_group">
                    <label htmlFor="content"> Content: </label>
                    <input type="text" id="content" name="content" required autoFocus className="form-control"
                        placeholder="Comment Content"
                        value={newComment.content}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <button type="submitComment"
                onClick={evt => {
                    
                    evt.preventDefault()
                    submitComment()
                    
                    
                }}
                className="bt btn-primary">
                {editMode ? "Save Changes" : "Create Comment"}
            </button>
            <Link to="/posts/single/${postId}" className="cancel-btn">Cancel</Link>
        </form>
    </>

}    