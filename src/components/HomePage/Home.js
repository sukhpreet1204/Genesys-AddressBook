import React, { useState } from "react";
import UserList from '../UserList/UserList';
import UserDetails from '../UserDetails/UserDetails';
import useFetch from '../../api/useFetch';
import "../../components/HomePage/home.scss";

const Home = () => {
    
    const { data: people, isPending, error } = useFetch('http://localhost:8080/people');
    const [user, setSelectedUser] = useState({})
    
    const handleUserId = (user) => {
        setSelectedUser(user)
    }

    return ( 
        <div className="home">
            { error && <div>{ error }</div>}
            { isPending && <div>Loading...</div>}
            { people && <UserList className="user-list" people={people} selectedUser={handleUserId} />}
            { people && <UserDetails className="user-details" userData={Object.keys(user).length? user:people[0]}></UserDetails>} 
        </div>
     );
}
 
export default Home;