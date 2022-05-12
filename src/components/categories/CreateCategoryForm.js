// imports
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { submitNewCategory } from "./CategoryManager";


// def a function that will return a new category form

export const NewCategoryForm = ({setRefreshState}) => {
    const [newCategoryForm, setNewCategoryForm] = useState(false)
    const [form, updateForm] = useState({label: ""})




// return 
    // wrap in div className "form-group"
        // <label htmlFor="category" "create a new category" as text for label
        // input category
            // required autoFocus
            // type="text" id="category"
            // className="form-control"
            // placeholder="add text"
                // add an onChange function to update what we will send to the server as the user types
                    // accepts a parameter "e" 
                    //  => function body:
                        // defines a new variable, copy, which is equal to { ...form}
                        // set copy.label equal to e.target.value
                        // change the value of form by using updateForm and passing in copy as an argument
                        
                        // example:
                        return (
                            <>
                            {newCategoryForm === false ? <button onClick={() => setNewCategoryForm(true)}>Add new category?</button> : 
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
                    
                                            <button onClick={() => {
                                                const newCategory = {
                                                    label: form.label
                                                }
                                                submitNewCategory(newCategory)
                                                updateForm({label: ""})
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

                        
// add a button, which when clicked will invoke the submit new category function from the top of this module
/* <button onClick={submitNewCategory} className="submit-button">
                    Submit
                </button> */