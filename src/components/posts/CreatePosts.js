// imports React, useEffect, useSate, useHistory, sendPost, fetchTags
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getAllCategories } from "../categories/CategoryManager";
import { createPost, getSinglePost, updatePost } from "./PostManager";



export const CreatePosts = ( { currentUser }) => {

    const [posts, setPosts] = useState([])
    const [categories, setCategories] = useState([])
    const { postId } = useParams()
    const history = useHistory()
    const editMode = postId ? true : false

    const [post, setPost] = useState({
        title: "",
        category: 0,
        publication_date: Date.now(),
        image_url: "",
        content: "",
        approved: 1
    })

    useEffect(() => {
        getAllCategories()
        .then((categories) => {
            setCategories(categories)
            if (postId) {
                getSinglePost(parseInt(postId))
                    .then(post => {
                        setPost(post)
                    })
            }
        })
    }, [])

    const handleInputChange = (event) => {
        const newPost = { ...post }
        newPost[event.target.id] = event.target.value;
        setPost(newPost)
    }

    const createNewPost = () => {
        const category_id = parseInt(post.category)

        if (editMode) {
            updatePost({
                id: post.id,
                title: post.title,
                category: category_id,
                publication_date: post.publication_date,
                image_url: post.image_url,
                content: post.content,
                approved: post.approved,
                user: currentUser.id
            })
                .then(() => history.push("/posts"))

        } else {
            createPost({
                title: post.title,
                category: category_id,
                publication_date: new Date(),
                image_url: post.image_url,
                content: post.content,
                approved: false,
                user: currentUser.id

            })
                .then(() => history.push("/posts/myposts"))
        }

    }

    return (
        <form className="postForm">
            <h2 className="postForm__title">{editMode ? "Edit Post" : "Add Post"}</h2>
            <fieldset>
                <div className="form_group">
                    <label htmlFor="title"> Post Title: </label>
                    <input type="text" id="title" name="title" required autoFocus className="form-control"
                        placeholder="Post title"
                        value={post.title}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form_group">
                    <label htmlFor="image_url"> Image URL: </label>
                    <input type="text" id="image_url" name="image_url" required autoFocus className="form-control"
                        placeholder="Image Url"
                        value={post.image_url}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form_group">
                    <label htmlFor="content"> Content: </label>
                    <input type="text" name="content" id="content" required autoFocus className="form-control"
                        placeholder="Post content"
                        value={post.content}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form_group">
                    <label htmlFor="category"> Category: </label>
                    <select name="category" required autoFocus className="form-control" id="category" placeholder="pick"
                        value={categories.id}
                        onChange={handleInputChange}>
                        {categories.map((c) => {
                            return (
                                <option id="category" name="category" required autoFocus onChange={handleInputChange} key={c.id} value={c.id}>
                                    {c.label}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    createNewPost()
                }}
                className="bt btn-primary">
                {editMode ? "Save Changes" : "Create Post"}
            </button>
        </form>
    )
}
