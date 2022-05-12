import { Settings } from "../utils/Settings"


export const getAllTags = () => {
  return fetch(`${Settings.API}/tags`, {
      headers:{
          "Authorization": `Token ${localStorage.getItem("token")}`
      }
  })
      .then(response => response.json())
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