import { useEffect, useState } from 'react';
import UserCard from '../components/cards/UserCard.tsx';
import { API_URL } from '../config.ts';
import LoginCallout from '../components/LoginCallout.tsx';

interface UserContainerProps {
    currentUser: UserInterface | null;
    updateCurrentUser: (updatedUser: UserInterface) => void;
}


const UsersContainer = ({currentUser}: UserContainerProps) => {
    const [users, setUsers] = useState<UserInterface[]>([]);
    const token = localStorage.token;
    
    useEffect(() => {
        fetch(`${API_URL}/users`, {
            headers: {
                'Authorization': token
            }
        })
        .then((res) => {
            if (!res.ok) {
                alert('Something went wrong!');
                return;
            }

            return res.json();
        })
        .then(data => {
            // let usersData;
            // if (currentUser) {
            //     usersData = data.filter((user: UserInterface) => user.id !== currentUser.id);
            // } else {
            //     usersData = data;
            // }

            setUsers(data)
        })
    }, [currentUser, token]);

    return (
        <div>
            {users.length <= 0 ? 'Loading...'
                :
                currentUser ?
                    <div className='mt-[25px] w-full flex flex-wrap justify-between gap-4'>
                        {users.map((user) => (
                            <UserCard user={user} key={user.id} />
                        ))}
                    </div>
                :
                <LoginCallout />
            }
        </div>
    );
};

export default UsersContainer;