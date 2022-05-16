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

export const ApplicationViews = () => {
  //state to refresh state when new object is submitted
  const [refreshState, setRefreshState] = useState(false)
  const [currentUser, setUser] = useState()
  const [tags, setTags] = useState([])

  useEffect(
    () => {
      getCurrentUser()
        .then(data => setUser(data))
    },
    []
  )


    // use UseEffect to getAllTags and set the state of the tag array.
    useEffect(() => {
        getAllTags()
        .then(data => setTags(data))
        .then(setRefreshState(false))
    },
    [refreshState])


  return (
    <>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/posts/all">
        <AllPosts />
      </Route>
      <Route exact path="/users">
        <UserList />
      </Route>
      <Route exact path="/users/:userId(\d+)">
        <User listView={false} />
      </Route>
      <Route path="/tags">
        <AllTags tags={tags} refreshState={refreshState} setRefreshState={setRefreshState} />
      </Route>
      <Route exact path="/newPost">
        <CreatePosts currentUser={currentUser} editing={false} />
      </Route>
      <Route exact path="/editPost/:postId(\d+)">
        <CreatePosts currentUser={currentUser} editing={true} />
      </Route>
      <Route exact path="/posts/single/:postId(\d+)">
        <SinglePost />
      </Route>
      <Route exact path="/posts/myPosts">
        <MyPosts refreshState={refreshState} setRefreshState={setRefreshState} />
      </Route>
      <Route exact path="/posts/user/:userId(\d+)">
        <PostsByUser />
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
