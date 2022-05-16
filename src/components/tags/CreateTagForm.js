import React, { useState } from "react";
import { submitNewTag } from "./TagManager";


export const NewTagForm = ({ setRefreshState, editing }) => {
    const [newTagForm, setNewTagForm] = useState(false)
    const [form, updateForm] = useState({ label: "" })
    if (editing) {
        setNewTagForm(true)
    }


    return (
        <>
            {/* checks to see if add new tag button has been clicked */}
            {newTagForm === false ? <button onClick={() => setNewTagForm(true)}>Add new tag?</button> :
                // if add new tag button has been clicked
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="tag">Create a new tag</label>
                        <input
                            required autoFocus
                            type="text" id="tag"
                            className="form-control"
                            placeholder="add text"
                            value={form.label}
                            onChange={
                                (e) => {
                                    const copy = { ...form }
                                    copy.label = e.target.value
                                    updateForm(copy)
                                }
                            }
                        />
                        <div className="submitButtonCreateNewTagForm">
                            {/* when clicked will invoke the submit new tag function */}
                            <button onClick={() => {
                                const newTag = {
                                    label: form.label
                                }
                                submitNewTag(newTag)
                                updateForm({ label: "" })
                                setRefreshState(true)
                            }} className="submit-button">
                                Submit
                            </button>
                        </div>
                    </div>
                </fieldset>
            }
        </>
    )

}