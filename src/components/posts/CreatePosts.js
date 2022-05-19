// imports React, useEffect, useSate, useHistory, sendPost, fetchTags
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getAllCategories } from "../categories/CategoryManager";
import { addTag, removeTag } from "../tags/TagManager";
import { createPost, getSinglePost, updatePost } from "./PostManager";
import { UserContext } from "../../UserContext";


export const CreatePosts = ({ tags, setRefreshState, refreshState }) => {
    const {currentUser} = useContext(UserContext)
    const [categories, setCategories] = useState([])
    const [originalPost, setOriginalPost] = useState({})
    const { postId } = useParams()
    const history = useHistory()
    const editMode = postId ? true : false

    const [post, setPost] = useState({
        title: "",
        publication_date: Date.now(),
        category:1,
        image_url: "",
        content: ""
        
    })

    const [selectedTags, setSelectedTags] = useState([])

    useEffect(() => {
        if (editMode) {
            const copy = {}
            copy.id = originalPost.id
            copy.category = originalPost.category?.id
            copy.title = originalPost.title
            copy.publication_date = originalPost.publication_date
            copy.image_url = originalPost.image_url
            copy.content = originalPost.content
            copy.approved = originalPost.approved
            // copy.author = originalPost.author.id
            setPost(copy)
        }

    }, [originalPost])

    useEffect(() => {
        getAllCategories()
            .then((categories) => {
                setCategories(categories)
                if (postId) {
                    getSinglePost(parseInt(postId))
                        .then(post => {
                            setOriginalPost(post)
                        })
                }
            })
    }, [refreshState])

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
                user: post.user,
                tags: selectedTags
            })
                .then(() => history.push("/posts/all"))

        } else {
            if (currentUser.is_staff === true) {

                createPost({
                    title: post.title,
                    category: category_id,
                    publication_date: new Date(),
                    image_url: post.image_url,
                    content: post.content,
                    user: currentUser.id,
                    approved: true,
                    tags: selectedTags
                    
                })
                .then(() => history.push("/posts/myposts"))
            } else {
                createPost({
                    title: post.title,
                    category: category_id,
                    publication_date: new Date(),
                    image_url: post.image_url,
                    content: post.content,
                    user: currentUser.id,
                    approved: false,
                    tags: selectedTags
                    
                })
                .then(() => history.push("/posts/myposts"))
    }}}

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
                        value={post.category}
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
            <fieldset>
                <div className="form_group">
                    <label htmlFor="tag"> Tags: </label>
                    {editMode == false ?
                        tags.map(tag => {
                            return <>
                                {selectedTags.includes(tag.id) ?
                                    //if the tag is in the array
                                    <>
                                        <input type="checkbox" key={`tag--${tag.id}`} checked={true} name={tag.label} value={tag.id} onClick={(e) => {
                                            const copy = [...selectedTags]
                                            const filteredCopy = copy.filter(t => t != e.target.value)
                                            setSelectedTags(filteredCopy)
                                        }} />
                                        <label htmlFor={tag.label}>{tag.label}</label>
                                    </>
                                    : //If a tag is not in the array
                                    <>
                                        <input type="checkbox" key={`tag--${tag.id}`} name={tag.label} value={tag.id} onClick={() => {
                                            const copy = [...selectedTags]
                                            copy.push(tag.id)
                                            setSelectedTags(copy)
                                        }
                                        } /><label htmlFor={tag.label}>{tag.label}</label>
                                    </>
                                }
                            </>

                        }) : 
                        tags.map(tag => {
                            return <>
                                {(originalPost.tags?.some(t => t.id === tag.id) ?
                                    <>
                                        <input type="checkbox" key={`tag--${tag.id}`} checked={true} name={tag.label} value={tag.id} 
                                        onClick={(e) => {
                                            const tag = {}
                                            tag.tag_id=e.target.value
                                            removeTag(tag, originalPost.id)
                                            .then(() => setRefreshState(true))

                                        }}/>
                                        <label htmlFor={tag.label}>{tag.label}</label>
                                    </>
                                    : <>
                                    <input type="checkbox" key={`tag--${tag.id}`} name={tag.label} value={tag.id} onClick={(e) => {
                                            const tag = {}
                                            tag.tag_id=e.target.value
                                            addTag(tag, originalPost.id)
                                            .then(() => setRefreshState(true))

                                        }}/>
                                    
                                    <label htmlFor={tag.label}>{tag.label}
                                    </label>
                                    </>
                        )}
                            </>
                        }
                        )
                    }
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
            <Link to="/posts/all" className="cancel-btn">Cancel</Link>
        </form>
    )
}
