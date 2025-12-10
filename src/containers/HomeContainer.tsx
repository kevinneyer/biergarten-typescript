import { BrowserRouter, Routes, Route } from "react-router";
import BeersContainer from "./BeersContainer";
import BeerPageContainer from "./BeerPageContainer";
import Login from "../components/Login";
import { useState, useEffect } from 'react';
import NavBar from "../components/NavBar";
import LandingPage from "../components/LandingPage";

const HomeContainer = () => {
    const [currentUser, setCurrentUser] = useState<UserInterface | null>(null);

    useEffect(() => {
        const token = localStorage.token;
        if (token) {
            fetch('http://localhost:3000/api/v1/auto_login', {
                headers: {
                    "Authorization": token
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.errors) {
                    alert(data.errors);
                } 
                else {
                    setCurrentUser(data);
                }
            })
        } 
    }, []);
    
    const setUser = (response: LoginResponseInterface): void => {
        setCurrentUser(response.user);
        localStorage.token = response.token;
    };

    const logoutUser = (): void => {
        setCurrentUser(null);
        localStorage.removeItem('token');
    };

    return (
        <>
            
            <BrowserRouter>
            <NavBar currentUser={currentUser} logoutUser={logoutUser}/>
                <Routes>
                    <Route path='/' element={<LandingPage currentUser={currentUser} />} />
                    <Route path='/login' element={ <Login setUser={setUser} currentUser={currentUser} />} />
                    <Route path='/beers' element={<BeersContainer currentUser={currentUser} />} />
                    <Route path='/beers/:beerId' element={<BeerPageContainer />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default HomeContainer;