
import { User } from "./User"


export const DeactivatedUsers = ({ refreshState, sortedUsers, setClicked, clicked, setUsers }) => {


    
    return <>
        <div className="singleUser">
            <div>Username</div>
            <div>First Name</div>
            <div>Last Name</div>
            <div>Email</div>
            <div>Type</div>
            <div>Active</div>
        </div>
        {
            deactivatedUserList.map(user => {
                return <div key={`user-${user.id}`}>
                    <User user={user} listView={true} setUsers={setUsers} isCheckbox={true}/>
                </div>
            })
        }
        {/* 
        map over users and invoke <User /> component for each
        add any other jsx tags as needed for styling
    */}
    <button class="button is-outlined" onClick={setClicked(!clicked)}>Deactivated Users</button>
    </>
}