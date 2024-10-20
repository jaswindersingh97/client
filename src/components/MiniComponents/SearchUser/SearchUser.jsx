import styles from './SearchUser.module.css';
import React, { useContext, useEffect, useState } from 'react';
import downArrow from './../../../assets/DashboardPageComponents/DownArrow.svg';
import apiRequest from './../../../Apis/apiRequest';
import { AppContext } from '../../../Context/AppContext';
import generateInitials from '../../../Utils/generateInitials';
function SearchUser() {
    const [search, setSearch] = useState("");
    const [userList, setUserList] = useState([]);
    const {token} = useContext(AppContext);
    useEffect(() => {
        const fetchUsers = async () => {
            if (search) {
                try {
                    const response = await apiRequest({endpoint:`/secure/searchUser?email=${search}`,method:'get',headers:{
                        Authorization:`Bearer ${token}`
                    }})
                    setUserList(response.data);
                } catch (error) {
                    console.error("Error fetching users:", error);
                    setUserList([]);
                }
            } else {
                setUserList([]);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            fetchUsers();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const handleAssign = (userId) => {
        // Handle assigning the user
        console.log("Assigning user:", userId);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <input
                    type='text'
                    placeholder='Add an assignee'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <img src={downArrow} alt='downArrow' />
            </div>
            <div className={styles.body}>
                {userList.length > 0 && (
                    userList.map((user) => (
                        <div key={user._id} className={styles.user}>
                            <span>{generateInitials(user.name)}</span> 
                            <p>{user.email}</p>
                            <button onClick={() => handleAssign(user._id)}>Assign</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default SearchUser;
