import { useState, useEffect } from "react"
import { getCurrentUser } from "../users/UserManager"
import { Post } from "./Post"
import { getUserPosts } from "./PostManager"

export const MyPosts = ( { refreshState, setRefreshState }) => {
    const [posts, setPosts] = useState([])
    const [currentUser, setUser] = useState()


    useEffect(() => {
        getCurrentUser()
        .then((data) => setUser(data.id))
    }, [refreshState])


    useEffect(() => {
        getUserPosts(currentUser)
            .then((data) => setPosts(data))
            .then(() => setRefreshState(false))
    }, [currentUser, refreshState])


    return <>
        {
            posts.map(post => {
                return <div key={`post-${post.id}`}>
                    <Post listView={true} cardView={true} post={post} />
                </div> 
            })
        }
    </>
}