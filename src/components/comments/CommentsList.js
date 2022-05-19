// imports
// function that gets comments by postId
// function that deletes comments by commentId
// function that adds a comment
// Component for comment form

import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { CommentStateContext, CommentStateProvider } from "../../CommentStateContext"
import { getCurrentUser } from "../users/UserManager"
import { Comment } from "./Comment"
import { CommentForm } from "./CommentForm"
import { getCommentsByPostId } from "./CommentManager"


// export component CommentList that is a single post's comments

// From Individual Post Component
// <CommentList postId={id} /> - displayed on a boolean
export const CommentList = ({setRefreshState, refreshState}) => {
    // declare state variable for comments array
    // const [comments, setComments] = useState([])
    const [comments, setComments] = useState([])
    const [user, setUser] = useState({})
    const { postId } = useParams()
    const {commentState, setCommentState} = useContext(CommentStateContext)
    
    const userId = user.id
    // useEffect that pulls comments by postId
    useEffect(
        () => {
            if (postId) {
                getCommentsByPostId(postId)

                .then(data => setComments(data))
                
                .then(() => setCommentState(false))

            }
            
        },
        [postId, commentState]
    )
    useEffect(
        () => {
            getCurrentUser()
                .then(data => setUser(data))
        },
        []
    )





    /* 
        invoke function
        getCommentsByPostId()
            then set comments from returned data
            .then((comments) => setComments(comments))
        empty dependency array to run on page load
    */



    // any other functions?
    // deleteComment
    // takes commentId param
    // invokes fetch function deleteComment()

    // addComment
    // builds proper comment


    return <>
        <b>Comments</b>
        
        {
            comments.map(comment => {
                let currentAuthor = comment.author?.id === userId
                return <div key={`comment--${comment.id}`}>
                    <Comment postId={postId} commentObject={comment} currentAuthor={currentAuthor} setRefreshState={setRefreshState}/>
                </div>
            })
        }
        {/* <CommentForm postId={postId} /> */}
        <CommentForm postId={postId} getCommentsByPostId={getCommentsByPostId} />
        {/* 
        map over comments and invoke comment component
        other needed JSX tags for styling
    */}<br></br>

    </>
}