import { BrowserRouter, Routes, Route } from "react-router";
import BeersContainer from "./BeersContainer";
import BeerPageContainer from "./BeerPageContainer";
import Login from "../components/Login";
import { useState, useEffect } from 'react';

const HomeContainer = () => {
    const [currentUser, setCurrentUser] = useState<UserInterface | null>(null);
    
    return (
        <>
            <Login />
            <BrowserRouter>
                <Routes>
                    <Route path='/beers' element={<BeersContainer />} />
                    <Route path='/beers/:beerId' element={<BeerPageContainer />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default HomeContainer;