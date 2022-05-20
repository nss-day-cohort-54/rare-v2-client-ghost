import { deleteCategory, getAllCategories } from "./CategoryManager";
import React, { useContext, useEffect, useState } from "react";
import { NewCategoryForm } from "./CreateCategoryForm";
import { getCurrentUser } from "../users/UserManager";
import { ButtonControls } from "../buttonControls/ButtonControls";
import { UserContext } from "../../UserContext";


// declare and export function AllCategories which get all category objects

export const AllCategories = ({ }) => {

    const [categories, setCategories] = useState([])
    const [user, setUser] = useState({})
    const { currentUser } = useContext(UserContext)
    const [refreshState, setRefreshState ] = useState(false)

    // use UseEffect to getAllCategories and set the state of the category array.
    useEffect(() => {
        getAllCategories()
            .then(data => setCategories(data))
    },
        [refreshState])
    
    useEffect(() => {
        if (refreshState === true){
            setRefreshState(false)
        }
    },
        [refreshState])
    

    // return a map through the categories array that will have 
    // edit and delete buttons  
    return <>
        <div>All Categories</div>
        {categories.map((category) => {
            return <div key={`category--${category.id}`}>{category.label}
                {currentUser.is_staff ? <ButtonControls isCategories={true} id={category.id} setRefreshState={setRefreshState} category={category}/> : ""}
                    
            </div>
        })}
        <div className="CreateNewCategoryFormContainer">
            <NewCategoryForm setRefreshState={setRefreshState} />
        </div>
    </>
}

