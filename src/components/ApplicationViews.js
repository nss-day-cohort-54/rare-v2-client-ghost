import React, { useState, useEffect } from "react"
import { Route } from "react-router-dom"
import { Home } from "./home/Home.js"
import { AllPosts } from "./posts/AllPosts.js"
import { UserList } from "./users/UserList.js"
import { AllTags } from "./tags/AllTags.js"
import { AllCategories } from "./categories/AllCategories"
import { getAllTags } from "./tags/TagManager.js"
import { User } from "./users/User.js"
import { CreatePosts } from "./posts/CreatePosts.js"
import { MyPosts } from "./posts/MyPosts.js"
import { PostsByUser } from "./posts/PostsByUser.js"
import { SinglePost } from "./posts/SinglePost.js"
import { getCurrentUser } from "./users/UserManager";
import { NewTagForm } from "./tags/CreateTagForm.js"
import { CommentForm } from "./comments/CommentForm.js"

export const ApplicationViews = () => {
  //state to refresh state when new object is submitted
  const [refreshState, setRefreshState] = useState(false)
  const [currentUser, setUser] = useState()
  const [tags, setTags] = useState([])



    // use UseEffect to getAllTags and set the state of the tag array.
    useEffect(() => {
        getAllTags()
        .then(data => setTags(data))
        .then(getCurrentUser()
          .then(data => setUser(data)))
        .then(setRefreshState(false))
    },
    [refreshState])


  return (
    <>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/posts/all">
        <AllPosts currentUser={currentUser} refreshState={refreshState} setRefreshState={setRefreshState} />
      </Route>
      <Route exact path="/users">
        <UserList refreshState={refreshState}/>
      </Route>
      <Route exact path="/users/:userId(\d+)">
        <User listView={false} refreshState={refreshState} setRefreshState={setRefreshState}/>
      </Route>
      <Route path="/tags">
        <AllTags currentUser={currentUser} tags={tags} refreshState={refreshState} setRefreshState={setRefreshState} />
      </Route>
      <Route exact path="/newPost">
        <CreatePosts tags={tags} currentUser={currentUser} editing={false} />
      </Route>
      <Route exact path="/editPost/:postId(\d+)">
        <CreatePosts setRefreshState={setRefreshState} refreshState={refreshState} tags={tags} currentUser={currentUser} editing={true} />
      </Route>
      <Route exact path="/posts/single/:postId(\d+)">
        <SinglePost refreshState={refreshState} setRefreshState={setRefreshState} />
      </Route>
      <Route exact path="/posts/myPosts">
        <MyPosts currentUser={currentUser} refreshState={refreshState} setRefreshState={setRefreshState} />
      </Route>
      <Route exact path="/posts/user/:userId(\d+)">
        <PostsByUser />
      </Route>
      <Route exact path="/posts/single/:postId(\d+)/createComment">
        <CommentForm />
      </Route>
      <Route exact path="/posts/single/:postId(\d+)/createComment/:commentId(\d+)">
        <CommentForm />
      </Route>
      {/* 
      <Route exact path="/posts/create">
        <CreatePost />
      </Route> */}
      <Route exact path="/categories">
        <AllCategories refreshState={refreshState} setRefreshState={setRefreshState} />
      </Route>
    </>
  )
}
