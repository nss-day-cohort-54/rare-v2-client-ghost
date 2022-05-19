import { Settings } from "../utils/Settings"
import { useHistory } from "react-router-dom"
import { deleteTag, sendTagEdit } from "../tags/TagManager"
import { useEffect, useState } from "react"
import { changeActive, getAllUsers } from "./UserManager"



export const UserButtonControls = ({ id, setRefreshState, isCheckbox, user, setUsers }) => {
    const history = useHistory()
    const [checkActive, setActive] = useState(false)

    return <div>
        <dialog id={`anything-${id}`}>

            {
                user.user.is_active ? <div>Are you sure you want to disable this user?</div>
                    : <div>Would you like to reinstate user?</div>
            }

            <div>
                <button
                    onClick={
                        (e) => {
                            e.preventDefault()
                            if (isCheckbox) {
                                const status = user.user.is_active
                                const userObject = {
                                    id: user.user.id,
                                    is_staff: user.user.is_staff,
                                    username: user.user.username,
                                    is_active: !status
                                }
                                changeActive(userObject)
                                .then(getAllUsers)
                                .then(data=>setUsers(data))
                                const buttonTarget = document.querySelector(`#anything-${id}`)
                                buttonTarget.close()
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

        <input type="checkbox" id="is_active"
            name="is_active" checked={!user.user.is_active} value={user.user.is_active}
            onChange={() => {
                const buttonTarget = document.querySelector(`#anything-${id}`)
                buttonTarget.showModal()
            }} />
            <label>Deactivate</label>
    </div >
}

