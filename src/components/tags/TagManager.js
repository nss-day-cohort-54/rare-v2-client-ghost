import { Settings } from "../utils/Settings"


export const getAllTags = () => {
  return fetch(`${Settings.API}/tags`, {
      headers:{
          "Authorization": `Token ${localStorage.getItem("token")}`
      }
  })
      .then(response => response.json())
}
export const getSingleTag = (id) => {
  return fetch(`${Settings.API}/tags/${id}`, {
      headers:{
          "Authorization": `Token ${localStorage.getItem("token")}`
      }
  })
      .then(response => response.json())
}
export const sendTagEdit = (tag) => {
  const id = tag.id
  return fetch(`${Settings.API}/tags/${id}`, {
      method: "PUT",
      headers:{
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(tag)
  })
}


export const submitNewTag = (tag) => {
  return fetch(`${Settings.API}/tags`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("token")}`
    }, body: JSON.stringify(tag)
  })
  .then(res => res.json())
}

export const deleteTag = (tagId) => {
  return fetch(`${Settings.API}/tags/${tagId}`, {
      method: "DELETE",
      headers:{
          "Authorization": `Token ${localStorage.getItem("token")}`
      }
  })
}