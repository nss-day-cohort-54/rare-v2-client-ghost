// imports
import React, { useState } from "react";
import { submitNewCategory } from "./CategoryManager";


export const NewCategoryForm = ({ setRefreshState }) => {
    const [newCategoryForm, setNewCategoryForm] = useState(false)
    const [form, updateForm] = useState({ label: "" })



    return (
        <>
        {/* checks to see if add new category button has been clicked */}
            {newCategoryForm === false ? <button onClick={() => setNewCategoryForm(true)}>Add new category?</button> :
                // if add new category button has been clicked
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="category">Create a new category</label>
                        <input
                            required autoFocus
                            type="text" id="category"
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
                        <div className="submitButtonCreateNewCategoryForm">

                            {/* when clicked will invoke the submit new category function */}
                            <button onClick={() => {
                                const newCategory = {
                                    label: form.label
                                }
                                submitNewCategory(newCategory)
                                updateForm({ label: "" })
                                .then(() => setRefreshState(true))
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


