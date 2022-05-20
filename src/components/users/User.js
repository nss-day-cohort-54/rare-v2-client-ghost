// imports
// get all posts by user
// get subs by user
// post sub relationship
// delete sub relationship

import { useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import "./User.css"
import { changeActive, createPhoto, getAllUsers, getSingleUser } from "./UserManager"
import { Link } from "react-router-dom"
import { SubForm } from "./SubForm"
import { getUserPosts } from "../posts/PostManager"
import { UserButtonControls } from "./UserButtonControl"
import { UserContext } from "../../UserContext"

// function that generates JSX for individual user element
export const User = ({ listView, user, refreshState, setUsers, setRefreshState }) => {
    // probably want a prop that indicates whether 
    // content is being generated in a list vs individual page
    const [viewUser, setViewUser] = useState(user)
    const [userPosts, setUserPosts] = useState([])
    const [postCount, setPostCount] = useState(0)
    const { userId } = useParams()
    const {currentUser} = useContext(UserContext)
    const [base64ImageState, setBase64ImageState] = useState()
    const [changePic, setChangePic] = useState(false)
    const [refreshProfile, setRefreshProfile] = useState(false)

    useEffect(
        () => {
            if (!listView) {
                getSingleUser(userId)
                    .then(userData => setViewUser(userData))
            }
        }, [userId, listView, refreshProfile]
    )

    useEffect(() => {
        if (refreshProfile === true)
        setRefreshProfile(false)
    }, [refreshProfile])

    useEffect(
        () => {
            if (viewUser) {
                getUserPosts(userId)
                    .then(data => setUserPosts(data))
                let count = userPosts.length
                setPostCount(count)
            }
        }, [viewUser]
    )
    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            setBase64ImageState(base64ImageString)
    
            // Update a component state variable to the value of base64ImageString
        });
    }

    // does subscribe button need an onclick?
    // yes
    // if subbed - onclick calls delete sub function
    // if not subbed - onclick calls add sub function

    return <>
        {listView
            ? <tbody> 
                <tr className="singleUser">
                    <td>
                        <Link to={`/users/${user.user.id}`}>
                            {user.user.username}
                        </Link>
                    </td>
                    <td>{user.user.first_name}</td>
                    <td>{user.user.last_name}</td>
                    <td>{user.user.email}</td>
                    <td>{user.user.is_staff ? "Admin" : "User"}</td>
                    <td>
                        <UserButtonControls user={user} id={user.id} setRefreshState={setRefreshState} isCheckbox={true} isAdminCheckbox={false} setUsers={setUsers} />
                    </td>
                    <td>
                        <UserButtonControls user={user} id={user.id} setRefreshState={setRefreshState} isAdminCheckbox={true} isCheckbox={false} setUsers={setUsers} />
                    </td>
                </tr>
            </tbody>
            : viewUser
                ? <tbody> 
                    <tr>
                        
                            {currentUser.id === viewUser.user.id? 
                            <td>Picture: <img src={`http://localhost:8088${viewUser.profileImageUrl?.photo || "https://www.themoviedb.org/t/p/w235_and_h235_face/j2De8KaACIbi4IX8WfUZGmCW1k2.jpg"}`} width={300} height={300} />

                            {changePic === false ?
                            <button onClick={()=>setChangePic(true)}>Upload New Picture?</button>
                            : //if upload new pic has been clicked
                            
                            <><input type="file" id="author_image" onChange={createImageString} />
                            <button onClick={() => {
                                const photoObject = {}
                                photoObject.author_image = base64ImageState
                                photoObject.author_id = currentUser.id
                                createPhoto(photoObject).then(() => setBase64ImageState(undefined)).then(() => setRefreshProfile(true))

                            }}>Upload</button>
                            
                            </>}
                            </td>
                            : //if not currentUser
                            
                            <td>Picture: <img src={`${viewUser.profileImageUrl.photo || "https://www.themoviedb.org/t/p/w235_and_h235_face/j2De8KaACIbi4IX8WfUZGmCW1k2.jpg"}`} width={300} height={300} /></td>
                            }
                        <td>Name: {viewUser.user.first_name} {viewUser.user.last_name}</td>
                        <td>Username: {viewUser.user.username}</td>
                        <td className="email-row" >Email: {viewUser.user.email}</td>
                        <td>Creation Date: {viewUser.user.date_joined}</td>
                        <td>Profile Type: {viewUser.user.is_staff ? "Admin" : "Author"}</td>
                        <td>
                            <Link to={`/posts/user/${viewUser.user.id}`}>
                                See Articles - Count: {postCount}
                            </Link>
                        </td>
                        <td>
                            <SubForm author={viewUser} />
                        </td>
                    </tr>
                </tbody>
                : null
        }

    </>
}