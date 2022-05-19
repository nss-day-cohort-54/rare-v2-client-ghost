import { Settings } from "../utils/Settings"
import { useHistory } from "react-router-dom"
import { deleteTag, sendTagEdit } from "../tags/TagManager"
import { useEffect, useState } from "react"
import { changeActive, getAllUsers } from "./UserManager"



export const UserButtonControls = ({ id, setRefreshState, isCheckbox, user, setUsers, isAdminCheckbox }) => {
    const history = useHistory()
    const [checkActive, setActive] = useState(false)
    let tag = ""
    if (isCheckbox) {
        tag = "anything-"
    } else {
        tag = "admin-"
    } 

    return <div>
        <dialog id={`${tag}${id}`}>
            {
                isCheckbox && user.user.is_active ? <div>Are you sure you want to disable this user?</div>
                    : isCheckbox ? <div>Would you like to reinstate user?</div>
                        : isAdminCheckbox && user.user.is_staff ? <div>Do you wish to disable admin?</div>
                            : <div>Would you like to reinstate user as admin?</div>
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
                                    .then(data => setUsers(data))
                                const buttonTarget = document.querySelector(`#anything-${id}`)
                                buttonTarget.close()
                            } else if (isAdminCheckbox) {
                                const status = user.user.is_staff
                                const userObject = {
                                    id: user.user.id,
                                    is_staff: !status,
                                    username: user.user.username,
                                    is_active: user.user.is_active
                                }
                                changeActive(userObject)
                                    .then(getAllUsers)
                                    .then(data => setUsers(data))
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
        {
            isAdminCheckbox ?
            <div>
                <input type="checkbox" id="is_staff"
                    name="is_staff" checked={user.user.is_staff} value={user.user.is_staff}
                    onChange={() => {
                        const buttonTarget = document.querySelector(`#anything-${id}`)
                        buttonTarget.showModal()
                    }} />
                <label>Admin</label></div>
            : isCheckbox ?
            <div>
                    <input type="checkbox" id="is_active"
                        name="is_active" checked={!user.user.is_active} value={user.user.is_active}
                        onChange={() => {
                            const buttonTarget = document.querySelector(`#anything-${id}`)
                            buttonTarget.showModal()
                        }} />
                    <label>Deactivate</label> </div>
                        
                    : ""
        }
    </div >
}

