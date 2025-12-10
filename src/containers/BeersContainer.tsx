import { useEffect, useState } from "react";
import BeerCard from "../components/BeerCard";
import { NavLink } from "react-router";
interface BeersContainerProps {
    currentUser: UserInterface | null;
}

const BeersContainer = ({currentUser}: BeersContainerProps) => {
    const [beers, setBeers] = useState<BeerInterface[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('http://127.0.0.1:3000/api/v1/beers')
        .then(res => res.json())
        .then((data: BeerInterface[]) => {
            setBeers(data);
            setIsLoading(false);
        })
    }, []);

    return(
        <div>
            {isLoading ? 'Loading' :
            currentUser ?
            <div className="grid grid-cols-4 gap-4">
                {beers.map((beer: BeerInterface, idx) => 
                    <BeerCard beer={beer} key={idx} />
                )}
            </div>
            :
            <div>
                You Must Be Logged In to View This Page
                <button 
                    className='bg-blue-200 p-2 rounded-sm' 
                    type="button"
                >
                    <NavLink
                        to={`/login`}
                        className={({ isActive }) =>
                            isActive ? "text-red-500" : "text-black"
                        }
                        >
                        Login
                    </NavLink>
                </button>
            </div>
            
        }
        </div>
    );
};

export default BeersContainer;