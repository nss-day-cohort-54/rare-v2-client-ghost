import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import { ButtonControls } from "../buttonControls/ButtonControls"
import { CommentList } from "../comments/CommentsList"
import "./Post.css"
// function that renders a single post
export const Post = ({ listView, cardView, post, currentUser, setRefreshState, refreshState }) => {

    const [showComments, setShowComments] = useState(false)
  

    const formatDate = (postDate) => {
        let date = new Date(postDate)
        return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
    }

    return <>
        {/* Content needed in all posts list */}
        {/* Title, Author, Date, Category, Tags */}
        {
            listView && cardView && currentUser
                ? <div key={`post--${post.id}`} className="postCard">
                    <div className="cardTitle">
                        <div>
                            <Link to={`/posts/single/${post.id}`}>
                                {post.title}
                            </Link>
                        </div>
                        <div>{post.publication_date}</div>
                    </div>
                    <div className="cardImage">
                        <img src={`${post.image_url || "https://picsum.photos/300/100"}`} />
                    </div>
                    <div className="cardBottom">
                        <div>Author: {post.author?.user.first_name} {post.author?.user.last_name}</div>
                        <div className="cardFunctions">
                            <div>Reaction Count: 0</div>
                            {
                                post.author.id === currentUser?.id
                                    ? <div className="cardButtons">
                                        <ButtonControls isPost={true} id={post.id} />
                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                    <div>Category: {post.category.label}</div>
                </div>
                : listView
                    ? <div key={`post--${post.id}`} className="singlePost">
                        <div>
                            <Link to={`/posts/single/${post.id}`}>
                                {post.title}
                            </Link>
                            {
                                post.author?.id === currentUser?.id
                                    ? <ButtonControls isPost={true} id={post.id} manageTags={true} />

                                    : null
                            }
                        </div>
                        <div>{post.author?.user.first_name} {post.author?.user.last_name}</div>
                        <div>{post.publication_date}</div>
                        <div>{post.category.label}</div>
                        {/* <div>{post.tags.map(tag => <div key={`posttag${post.id}${tag.id}`}>{tag.label}</div>)}</div> */}
                    </div>
                    : //Detailed post single view 
                    <div key={`post--${post.id}`} className="postDetails">
                        <div className="postDetailsMain">
                            <div className="postDetailsTitle">
                                <div className="cardButtons">
                                    {   
                                        currentUser?.id === post.author.id
                                            ? <>
                                            <ButtonControls isPost={true} id={post.id} />
                                            <button>Manage Tags</button>
                                            </>
                                            : null
                                    }
                                </div>
                                <div>{post.title}</div>
                            </div>
                            <div><img src={`${post.imageUrl || "https://picsum.photos/300/100"}`} /></div>
                            <div className="postDetailsBelowCard">
                                <div>By
                                    <Link to={`/users/${post.author.id}`} >
                                        {post.author.user.username}
                                    </Link>
                                    <div>
                                        {formatDate(post.publication_date)}
                                    </div>

                                </div>
                            </div>
                            {
                                showComments
                                    ? <CommentList id={post.id} setRefreshState={setRefreshState} refreshState={refreshState}/>
                                    : 
                                    <>
                                    <div>{post.content}</div>
                                    {/* If post has tags */}
                                    {post.tags?.length > 0 ? 
                                    <div>
                                    Tags: 
                                    {post.tags.map(tag => {
                                        return <div key={`tag--${tag.id}`}>{tag.label}</div>
                                    })}
                                    </div>
                                    // if post has no tags
                                    :""}
                                    </>
                            }
                            {
                                showComments
                                    ? <button onClick={() => { setShowComments(false) }}>Show Post</button>
                                    : <button onClick={() => setShowComments(true)}>View Comments</button>
                            }
                        </div>
                    </div>
        }
    </>
}