import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getUserPosts } from "./PostManager"
import { Post } from "./Post"

export const PostsByUser = ({setRefreshState, refreshState}) => {
    const { userId } = useParams()
    const [posts, setPosts] = useState([])

    useEffect(
        () => {
            if(userId) {
                getUserPosts(userId)
                    .then(setPosts)
            }
        },
        [userId]
    )

    return <>
        {
            posts.map(post => {
                return <Post listView={true} cardView={true} post={post} setRefreshState={setRefreshState} refreshState={refreshState}/>
            })
        }
    
    </>

}