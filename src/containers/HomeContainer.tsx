import { BrowserRouter, Routes, Route } from 'react-router';
import BeersContainer from './BeersContainer';
import BeerPageContainer from './BeerPageContainer';
import Login from '../components/Login';
import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import LandingPage from '../components/LandingPage';
import ProfileContainer from './ProfileContainer';
import { API_URL } from '../config.ts';

const HomeContainer = () => {
    const token = localStorage.token;
    const [currentUser, setCurrentUser] = useState<UserInterface | null>(null);
    const [userFetchComplete, setUserFetchComplete] = useState<boolean>(!token);

    useEffect(() => {
        if (token) {
            fetch(`${API_URL}/auto_login`, {
                headers: {
                    'Authorization': token
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.errors) {
                    alert(data.errors);
                    setUserFetchComplete(true);
                } 
                else {
                    setCurrentUser(data);
                    setUserFetchComplete(true);
                }
            })
            .catch(error => {
                console.error('Auto-login failed:', error);
                setUserFetchComplete(true);
            });
        }   
    }, [token]);
    
    const setUser = (response: LoginResponseInterface): void => {
        setCurrentUser(response.user);
        localStorage.token = response.token;
    };

    const logoutUser = (): void => {
        setCurrentUser(null);
        localStorage.removeItem('token');

        window.location.href = '/';
    };

    return (
        <> 
            <BrowserRouter>
                <NavBar currentUser={currentUser} logoutUser={logoutUser}/>
                <Routes>
                    <Route path='/' element={<LandingPage currentUser={currentUser} userFetchComplete={userFetchComplete} />} />
                    <Route path='/login' element={<Login setUser={setUser} currentUser={currentUser} />} />
                    <Route path='/beers' element={<BeersContainer currentUser={currentUser} />} />
                    <Route path='/beers/:beerId' element={<BeerPageContainer currentUser={currentUser} />} />
                    <Route path='/profile' element={<ProfileContainer currentUser={currentUser} />} />
                    <Route path='/users/:userId' element={<ProfileContainer currentUser={currentUser} />} />
                </Routes> 
            </BrowserRouter>
        </>
    );
};

export default HomeContainer;