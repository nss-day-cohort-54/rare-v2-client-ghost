import { useState, useEffect } from "react"
import { getCurrentUser } from "../users/UserManager"
import { Post } from "./Post"
import { getUserPosts } from "./PostManager"

export const MyPosts = ( { refreshState, setRefreshState, currentUser }) => {
    const [posts, setPosts] = useState([])


    useEffect(() => {
        getUserPosts(currentUser?.id)
            .then((data) => setPosts(data))
            .then(() => setRefreshState(false))
    }, [currentUser, refreshState])


    return <>
        {
            posts.map(post => {
                return <div key={`post-${post.id}`}>
                    <Post listView={true} cardView={true} post={post} currentUser={currentUser} setRefreshState={setRefreshState} refreshState={refreshState}/>
                </div> 
            })
        }
    </>
}