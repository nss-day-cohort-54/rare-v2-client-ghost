import { getAllTags } from "./TagManager"
import React, { useContext, useEffect, useState } from "react";
import { NewTagForm } from "./CreateTagForm";
import { getCurrentUser } from "../users/UserManager";
import { ButtonControls } from "../buttonControls/ButtonControls";
import { UserContext } from "../../UserContext";
import "../categories/AllCategories.css"



export const AllTags = ({refreshState, setRefreshState, tags}) => {
    const { currentUser } = useContext(UserContext)

    return <>
        <div>All Tags</div>
        {tags.map((tag) => {
            
            return <div key={`tag--${tag.id}`} className="list-container">
                    {
                        currentUser.is_staff
                        ? <div className="cardButtons">
                            <ButtonControls 
                                isTags={true} 
                                id={tag.id} 
                                tag={tag}
                                setRefreshState={setRefreshState} />
                            </div>
                        : null
                    }
                    <h3> {tag.label} </h3>
                </div>
        })}
        <div className="CreateNewTagFormContainer">
            <NewTagForm setRefreshState={setRefreshState} />
        </div>
    </>
}

