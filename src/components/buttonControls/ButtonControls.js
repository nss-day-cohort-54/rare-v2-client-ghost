import { Settings } from "../utils/Settings"
import { deleteComment } from "../comments/CommentManager"
import { deletePost } from "../posts/PostManager"
import { useHistory } from "react-router-dom"
import { deleteTag, sendTagEdit } from "../tags/TagManager"
import { useEffect, useState } from "react"
import { deleteCategory, editCategory } from "../categories/CategoryManager"

export const ButtonControls = ({ isPost, id, commentId, getComments, isTags, setRefreshState, tag, isCategories, category, isComment }) => {
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
            : isCategories ? <div>Are you sure you want to delete this category?</div>
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
              } else if (isCategories) {
                deleteCategory(id)
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
              } else if (isComment) {
                deleteComment(commentId)
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
    {/* -------------edit button------------- */}
    <button onClick={() => {
      if (isPost) {
        history.push(`/editPost/${id}`)
      } else if (isTags) {
        // prompt allows user to enter info
        // tag.label is set as initial state for editing
        const val = prompt("Edit Tag:", tag.label)
        // prompt returns null if cancel button is pressed
        if (val !== null) {
          const newTag = {
            id: tag.id,
            label: val
          }
          sendTagEdit(newTag)
            .then(()=>setRefreshState(true))
        }
      } else if (isCategories) {
        // prompt state initialized with category label to edit
        const val = prompt("Edit Category:", category.label)
        if (val !== null) {
          const categoryEdit = {
            id: category.id,
            label: val
          }
          editCategory(categoryEdit)
            .then(()=>setRefreshState(true))
        }
      } else if (isComment) {
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

