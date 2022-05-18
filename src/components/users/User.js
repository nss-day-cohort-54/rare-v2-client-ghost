// imports
// get all posts by user
// get subs by user
// post sub relationship
// delete sub relationship

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import "./User.css"
import { changeActive, getAllUsers, getSingleUser } from "./UserManager"
import { Link } from "react-router-dom"
import { SubForm } from "./SubForm"
import { getUserPosts } from "../posts/PostManager"

// function that generates JSX for individual user element
export const User = ({ listView, user, refreshState, setUsers }) => {
    // probably want a prop that indicates whether 
    // content is being generated in a list vs individual page
    const [viewUser, setViewUser] = useState(user)
    const [userPosts, setUserPosts] = useState([])
    const [postCount, setPostCount] = useState(0)
    const { userId } = useParams()
    const [checkActive, setActive] = useState(false)

    useEffect(
        () => {
            if(!listView) {
                getSingleUser(userId)
                    .then(userData => setViewUser(userData))
            }
        }, [userId, listView]
    )

    useEffect(
        () => {
            if(viewUser) {
                getUserPosts(userId)
                .then(data => setUserPosts(data))
                let count = userPosts.length
                setPostCount(count)
            }
        }, [viewUser]
    )
        
    // does subscribe button need an onclick?
        // yes
        // if subbed - onclick calls delete sub function
        // if not subbed - onclick calls add sub function

    return <>
        {listView 
            ? <div className="singleUser">
                <div>
                    <Link to={`/users/${user.user.id}`}>
                    {user.user.username}
                    </Link>
                </div>
                <div>{user.user.first_name}</div>
                <div>{user.user.last_name}</div>
                <div>{user.user.email}</div>
                <div>{user.user.is_staff ? "Admin" : "User"}</div>
                <div>
                    <input type="checkbox" id="is_active" name="is_active" checked={!user.user.is_active}
                        onChange={()=> {
                            // sets checkbox to opposite of current state
                            setActive(!checkActive)
                            const userObject = {
                                id: user.user.id,
                                is_staff: user.user.is_staff,
                                username: user.user.username,
                                is_active: checkActive
                            }
                            changeActive(userObject)
                            .then(getAllUsers)
                            .then(data=>setUsers(data))}}/>
                    <label>Deactivate</label>
                </div>
            </div> 
            : viewUser
                ? <div>
                    <div>Picture: <img src={`${viewUser.user.profileImageUrl || "https://www.themoviedb.org/t/p/w235_and_h235_face/j2De8KaACIbi4IX8WfUZGmCW1k2.jpg"}`} width={300} height={300} /></div>
                    <div>Name: {viewUser.user.first_name} {viewUser.user.last_name}</div>
                    <div>Username: {viewUser.user.username}</div>
                    <div>Email: {viewUser.user.email}</div>
                    <div>Creation Date: {viewUser.user.date_joined}</div>
                    <div>Profile Type: {viewUser.user.is_staff ? "Admin" : "Author"}</div>
                    <div>
                        <Link to={`/posts/user/${viewUser.user.id}`}>
                        See Articles - Count: {postCount}
                        </Link>
                    </div>
                    <div>
                        <SubForm author={viewUser} />
                    </div>
                </div>
                : null
        }
    
    </>
}