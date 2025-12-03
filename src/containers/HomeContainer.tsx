import { BrowserRouter, Routes, Route } from "react-router";
import BeersContainer from "./BeersContainer";
import BeerPageContainer from "./BeerPageContainer";

const HomeContainer = () => {
    return (
        <>
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