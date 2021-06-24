import React, {useEffect, useState}from "react";
import {getRandomColor, createImageFromInitials} from "../ProfilePicture/ProfilePicture";
import "../../components/UserList/userList.scss";

const UserList = ({people, selectedUser}) => {
    const [alphabetOrder, setAlphabetOrder] = useState({})
    people.sort((a,b)=> {
        if(a.name>b.name)
        return 1;
        else{
            return -1;
        }
    })

    useEffect(()=> {
        let dataObj = {};
        people.forEach(element => {
            let tempElement = element;
            tempElement["color"] = getRandomColor();
            if(dataObj[element.name[0]]){
                dataObj[element.name[0]].push(tempElement)
            }else {
                dataObj[element.name[0]] = [tempElement]
            }
        });
        setAlphabetOrder(dataObj)
    },[])

    
    

    const selectUserData = (user) => {
        selectedUser(user)
    }
    return ( 
        <div className="user-list">
            {Object.keys(alphabetOrder).map(alphabets=> 
                <>
                <details>
                <summary>{alphabets.toUpperCase()}</summary>
                {alphabetOrder[alphabets].map(people=> {
                    return (
                    <div onClick={()=>selectUserData(people)} className="user-preview" key={people.id}>
                        <div className="profileImage">{createImageFromInitials(people.name,people.color)}
                        <span className="nameDisplay">{people.name}</span>
                       </div>
                    </div>
                    )})
                }</details>
            </>   
            )}
        </div>
     );
}
 
export default UserList;