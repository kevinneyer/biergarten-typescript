import { useEffect, useState } from 'react';
import BeerCard from '../components/cards/BeerCard';
import { API_URL } from '../config.ts';
import LoginCallout from '../components/LoginCallout.tsx';
interface BeersContainerProps {
    currentUser: UserInterface | null;
}

const BeersContainer = ({currentUser}: BeersContainerProps) => {
    const [beers, setBeers] = useState<BeerInterface[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch(`${API_URL}/beers`)
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
                <LoginCallout />
            }
        </div>
    );
};

export default BeersContainer;