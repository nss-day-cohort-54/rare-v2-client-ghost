import { useState, useEffect, useContext } from "react"

import { Post } from "./Post"
import { getUserPosts } from "./PostManager"
import { UserContext } from "../../UserContext";

export const MyPosts = ( { refreshState, setRefreshState }) => {
    const {currentUser} = useContext(UserContext)
    const [posts, setPosts] = useState([])


    useEffect(() => {
        if (currentUser) {

            
            getUserPosts(currentUser?.id)
            .then((data) => setPosts(data))
            .then(() => setRefreshState(true))
        }
        
    }, [currentUser])


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