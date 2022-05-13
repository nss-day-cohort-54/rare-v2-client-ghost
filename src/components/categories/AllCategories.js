import { getAllCategories } from "./CategoryManager";
import React, { useEffect, useState } from "react";
import { NewCategoryForm } from "./CreateCategoryForm";
import { getCurrentUser } from "../users/UserManager";


// declare and export function AllCategories which get all category objects

export const AllCategories = ({refreshState, setRefreshState}) => {

    const [categories, setCategories] = useState([])
    const [user, setUser] = useState({})
    const staff = user.is_staff
    useEffect(() => {
        getCurrentUser()
        .then(data => setUser(data))
    },
    [])

    // use UseEffect to getAllCategories and set the state of the category array.
    useEffect(() => {
        getAllCategories()
        .then(data => setCategories(data))
        .then(setRefreshState(false))
    },
    [refreshState])

    const AdminButtons = () => {
        return <><button>edit</button> <button>delete</button></>
    }

// return a map through the categories array that will have 
// edit and delete buttons  
    return <>
        <div>All Categories</div>
        {categories.map((category) => {
                
            return <div key={`category--${category.id}`}>{category.label}
                { staff ? AdminButtons() : "" }
                
            </div>
        })}
        <div className="CreateNewCategoryFormContainer">
            <NewCategoryForm setRefreshState={setRefreshState} />
        </div>
    </>
}

