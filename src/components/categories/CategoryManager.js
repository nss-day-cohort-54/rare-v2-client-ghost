// fetch all the categories
import { Settings } from "../utils/Settings"


export const getAllCategories = () => {
  return fetch(`${Settings.API}/categories`, {
      headers:{
          "Authorization": `Token ${localStorage.getItem("token")}`
      }
  })
      .then(response => response.json())
}

export const submitNewCategory = (category) => {
  return fetch(`${Settings.API}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("token")}`
    }, body: JSON.stringify(category)
  })
  .then(res => res.json())
}

export const deleteCategory = (id) => {
  return fetch(`${Settings.API}/categories/${id}`, {
      method: "DELETE",
      headers:{
          "Authorization": `Token ${localStorage.getItem("token")}`
      }
  })
}
export const editCategory = (cat) => {
  return fetch(`${Settings.API}/categories/${cat.id}`, {
      method: "PUT",
      headers:{
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(cat)
  })
}

