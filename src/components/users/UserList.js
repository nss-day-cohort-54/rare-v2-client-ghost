// imports
// import { User } from "./User"
// get all users fetch
import { useEffect, useState } from "react"
import { DeactivatedUsers } from "./DeactivatedUsers"
import { User } from "./User"
import { getAllUsers } from "./UserManager"
import "./User.css"
// function that generates list of users
// invokes User function from User.js for each user
export const UserList = ({ refreshState }) => {
    // define needed state variables
    // users, setUsers = useState()
    const [users, setUsers] = useState([])
    const [clicked, setClicked] = useState(false)
    // define needed useEffects
    // useEffect(() => getUsers function and set as users state variable, [])
    useEffect(() => {
        getAllUsers()
            .then(userData => {
                setUsers(userData)
            })
    }, [])

    // sort by username, since username is in a depth of 1 in the api call
    // sort method is used to sort usernames alphabetically
    const sortedUsers = users.sort(
        (a, b) =>
            a.user.username.localeCompare(b.user.username)
    )
    const deactivatedUserList = sortedUsers.filter(user => user.user.is_active !== true)
    // return jsx
    return <div className="table-container">
        <table>
            <thead>
                <tr className="singleUser">
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Type</th>
                    <th>Active</th>
                    <th>Admin</th>
                </tr>
            </thead>
            {
                sortedUsers.map(user => {
                    return <div key={`user-${user.id}`}>
                        <User user={user} listView={true} setUsers={setUsers} isCheckbox={true} />
                    </div>
                })
            }
        </table>
        {/* 
        map over users and invoke <User /> component for each
        add any other jsx tags as needed for styling
    */}
        <button class="button is-outlined" onClick={() => setClicked(!clicked)}>Deactivated Users</button>
        {
            clicked
                ? deactivatedUserList.map(user => {
                    return <div key={`user-${user.id}`}>
                        <User user={user} listView={true} setUsers={setUsers} isCheckbox={true} />
                    </div>
                })
                : ""
        }
    </div>
}