import { getAllTags } from "./TagManager"
import React, { useEffect, useState } from "react";
import { NewTagForm } from "./CreateTagForm";



export const AllTags = ({refreshState, setRefreshState}) => {

    const [tags, setTags] = useState([])

    // use UseEffect to getAllTags and set the state of the tag array.
    useEffect(() => {
        getAllTags()
        .then(data => setTags(data))
        .then(setRefreshState(false))
    },
    [refreshState])

    return <>
        <div>All Tags</div>
        {tags.map((tag) => {
            return <div key={`tag--${tag.id}`}>{tag.label} 
            <button>edit</button> <button>delete</button>
            </div>
        })}
        <div className="CreateNewTagFormContainer">
            <NewTagForm setRefreshState={setRefreshState} />
        </div>
    </>
}