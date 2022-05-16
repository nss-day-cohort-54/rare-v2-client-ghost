import { Settings } from "../utils/Settings"
import { deleteComment } from "../comments/CommentManager"
import { deletePost } from "../posts/PostManager"
import { useHistory } from "react-router-dom"
import { deleteTag, sendTagEdit } from "../tags/TagManager"
import { useEffect, useState } from "react"

export const ButtonControls = ({ isPost, id, commentId, getComments, isTags, setRefreshState, tag }) => {
  const history = useHistory()
  const [singleTag, setSingleTag] = useState()
  useEffect(() => {
    setSingleTag(tag)
}, [tag])

  return <div>
    <dialog id={`anything-${id}`}>
      
      {
        isPost ? <div>Are you sure you want to delete this post?</div>
        : isTags ? <div>Are you sure you want to delete this tag?</div>
        : <div>Are you sure you want to delete this comment?</div>
      }
      
      <div>
        <button
          onClick={
            (e) => {
              e.preventDefault()
              if (isPost) {
                deletePost(id)
                  .then(
                    () => {
                      history.push("/")
                    })
              } else if (isTags) {
                deleteTag(id)
                  .then(
                    () => {
                      const buttonTarget = document.querySelector(`#anything-${id}`)
                      buttonTarget.close()
                    }
                  )
                  .then(
                    () => {
                      setRefreshState(true)
                    })
              } else {
                deleteComment(commentId)
                  .then(
                    () => {
                      getComments(id)
                    }
                  )
                  .then(
                    () => {
                      const buttonTarget = document.querySelector(`#anything-${id}`)
                      buttonTarget.close()
                    }
                  )
              }
            }
          }
        >Okay</button>
        <button
          onClick={
            (e) => {
              e.preventDefault()
              const buttonTarget = document.querySelector(`#anything-${id}`)
              buttonTarget.close()
            }
          }
        >Cancel
        </button>
      </div>

    </dialog>
    <button onClick={() => {
      if(isPost) {
        history.push(`/editPost/${id}`)
      } else if(isTags) {
          const val = prompt("Edit Tag:", tag.label)
          const newTag = {
            id:tag.id,
            label:val
          }
          sendTagEdit(newTag)
          .then(setRefreshState(true))
      } else {
        window.alert("Cannot edit comments")
      }
    }}>
      <img className="editIcon" src={`${Settings.EditIcon}`} width="25px" height="25px" />
    </button>
    <button onClick={() => {
      const buttonTarget = document.querySelector(`#anything-${id}`)
      buttonTarget.showModal()
    }}>
      <img className="deleteIcon" src={`${Settings.DeleteIcon}`} width="25px" height="25px" />
    </button>
  </div >
}

