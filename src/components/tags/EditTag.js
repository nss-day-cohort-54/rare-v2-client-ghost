import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getSingleTag, sendTagEdit, submitNewTag } from "./TagManager";


export const EditTag = ({setRefreshState}) => {

    const [tag, setTag] = useState({})
    const tagId = useParams()
    const history = useHistory()
    useEffect(() => {
        getSingleTag(tagId.tagId)
        .then(data => setTag(data))
    },
    [tagId])

    return (
        <>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="tag">Edit tag</label>
                    <input
                        required autoFocus
                        type="text" id="tag"
                        className="form-control"
                        value={tag.label}
                        onChange={
                            (e) => {
                                const copy = { ...tag }
                                copy.label = e.target.value
                                setTag(copy)
                            }
                        }
                    />
                    <div className="submitButtonCreateNewTagForm">
                        {/* when clicked will invoke the submit new tag function */}
                        <button onClick={(e) => {
                            e.preventDefault()
                            sendTagEdit(tag)
                            setRefreshState(true)
                            history.push('/tags')
                        }} className="submit-button">
                            Submit
                        </button>
                        <button onClick={()=>history.push('/tags')}>
                            Cancel
                        </button>
                    </div>
                </div>
            </fieldset>

        </>
    )

}