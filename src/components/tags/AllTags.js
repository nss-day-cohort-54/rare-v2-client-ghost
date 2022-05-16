import { getAllTags } from "./TagManager"
import React, { useEffect, useState } from "react";
import { NewTagForm } from "./CreateTagForm";
import { getCurrentUser } from "../users/UserManager";
import { ButtonControls } from "../buttonControls/ButtonControls";



export const AllTags = ({refreshState, setRefreshState, tags, currentUser}) => {



    return <>
        <div>All Tags</div>
        {tags.map((tag) => {
            
            return <div key={`tag--${tag.id}`}>{tag.label} 
                    {
                        currentUser.is_staff
                        ? <div className="cardButtons">
                            <ButtonControls 
                                isTags={true} 
                                id={tag.id} 
                                setRefreshState={setRefreshState} />
                            </div>
                        : null
                    }
                </div>
        })}
        <div className="CreateNewTagFormContainer">
            <NewTagForm setRefreshState={setRefreshState} />
        </div>
    </>
}

