import { useEffect, useState } from 'react';
import UserCard from '../components/cards/UserCard.tsx';
import { API_URL } from '../config.ts';

interface UserContainerProps {
    currentUser: UserInterface | null;
    updateCurrentUser: (updatedUser: UserInterface) => void;
}

const UsersContainer = ({currentUser}: UserContainerProps) => {
    const [users, setUsers] = useState<UserInterface[]>([]);

    useEffect(() => {
        const token = localStorage.token;

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
            let usersData = data;
            if (currentUser) {
                usersData = usersData.filter((user: UserInterface) => user.id !== currentUser.id);
            }

            setUsers(usersData)
        })
    }, [currentUser])

    return (
        <div>
            <div>
                All Users
            </div>
            <div>
                {users.length <= 0 ?
                    'Loading...'
                    :
                    <div className='flex'>
                        {users.map((user) => (
                            <UserCard user={user} />
                        ))}
                    </div>
                }
            </div>
        </div>
    )
};

export default UsersContainer;