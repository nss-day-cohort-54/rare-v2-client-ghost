// imports
// deleteComment from CommentManager.js

import { ButtonControls } from "../buttonControls/ButtonControls"
import { Settings } from "../utils/Settings"
import { deleteComment } from "./CommentManager"


// export single comment component
export const Comment = ({ postId, commentObject, currentAuthor, getComments, refreshState, setRefreshState }) => {
    // currentAuthor should be boolean defined where Comment component is invoked
    // true if the current user is the comment's author
    // in JSX, delete comment button is then displayed

    // function for deleteComment
    // takes parameter of comment's id
    // calls deleteComment from CommentManager
    // refresh list
    
    const removeComment = (commentId) => {
        deleteComment(commentId)
            .then(() => getComments(postId))
    }

    return <div className="comment" key={`comment--${commentObject.id}`}>


        {/* 
                JSX for comment
                should have 
                    content
                    author
                deleteComment displayed if comment author is current user
            */}
        <div>Subject: {commentObject.subject}</div>

        <div>{commentObject.content}</div>

        <div>By: {commentObject.author?.user.username} on {commentObject.created_on}</div>

        {
            currentAuthor
                ? <div>
                    <ButtonControls
                        isComment={true}
                        postId={postId}
                        id={commentObject.id}
                        getComments={getComments}
                        setRefreshState={setRefreshState} />
                </div>
                : null
        }
    </div>
}