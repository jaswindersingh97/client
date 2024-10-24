import styles from './SearchUser.module.css';
import React, { useContext, useEffect, useState } from 'react';
import downArrow from './../../../assets/DashboardPageComponents/DownArrow.svg';
import apiRequest from './../../../Apis/apiRequest';
import { AppContext } from '../../../Context/AppContext';
import generateInitials from '../../../Utils/generateInitials';

function SearchUser({selectedUser, setSelectedUser}) {
    const [search, setSearch] = useState("");
    const [userList, setUserList] = useState([]);
    const { token } = useContext(AppContext);

    useEffect(() => {
        const fetchUsers = async () => {
            if (search) {
                try {
                    const response = await apiRequest({
                        endpoint: `/secure/searchUser?email=${search}`,
                        method: 'get',
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
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

    const handleAssign = (user) => {
        setSelectedUser(user);
        setSearch("");  
        setUserList([]); 
    };

    const handleRemoveUser = () => {
        setSelectedUser(null);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {selectedUser ? (
                    <div className={styles.selectedUser}>
                        <p>{selectedUser.email}</p>
                        <span onClick={handleRemoveUser}>X</span>
                    </div>
                ) : (
                    <>
                        <input
                            type='text'
                            placeholder='Add an assignee'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <img src={downArrow} alt='downArrow' />
                    </>
                )}
            </div>

            {!selectedUser && userList.length > 0 && (
                <div className={styles.body}>
                    {userList.map((user) => (
                        <div key={user._id} className={styles.user}>
                            <span>{generateInitials(user.name)}</span> 
                            <p>{user.email}</p>
                            <button onClick={() => handleAssign(user)}>Assign</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchUser;
