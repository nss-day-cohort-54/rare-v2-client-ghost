import { fetchIt } from "../utils/Fetch";
import { Settings } from "../utils/Settings"


export const getAllPosts = () => {
  return fetch(`${Settings.API}/posts`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  })
    .then((res) => res.json())
}

// export function that fetches single post, needs param to take id as arg, then parse from json to js

export const getSinglePost = (postId) => {
  return fetch(`${Settings.API}/posts/${postId}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  })
    .then(res => res.json())
};
// export function that adds post

// for each post, return the fetch entries,

// method is POST
// headers

// body will have stringified json with (post) as arg
// then getAllPosts


// export function that deletes a single post "postId => {"
// return a fetch with /${postId},
// method: DELETE
export const deletePost = (id) => {
  return fetch(`${Settings.API}/posts/${id}`, {
    method: "DELETE",
    headers:{
        "Authorization": `Token ${localStorage.getItem("token")}`
    }
})
}

// export a function that edits a post "post => {"
// return fetch with /{post.id}
// method: PUT
// normal headers
// body is stringified json with entry passed as arg

export const updatePost = (post) => {
  return fetch(`${Settings.API}/posts/${post.id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(post)
  })
  .then(getAllPosts)
}

// get posts by user id
export const getUserPosts = (userId) => {
  return fetch(`${Settings.API}/posts?user=${userId}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  })
    .then(res => res.json())
};



export const getPostsByTag = (id) => {
  return fetchIt(`${Settings.API}/posts?tag_id=${id}`)
};
// get posts by categoryId
// export const getPostsByCategoryId = (categoryId) => {
//   return fetch(`http://localhost:8088/posts?categoryId=${categoryId}`)
//   .then(response => response.json())
// }

// create post
export const createPost = (post) => {
  return fetch(`${Settings.API}/posts`, {
    method: "POST",
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  }).then(getAllPosts)
};

export const searchPostTitles = titleString => {
  return fetch(`http://localhost:8088/posts?title=${titleString}`)
    .then(res => res.json())
};

export const searchPostCategories = categoryId => {
  return fetch(`http://localhost:8088/posts?category=${categoryId}`)
    .then(res => res.json())
};