import { useEffect, useState } from "react";
import BeerCard from "../components/BeerCard";

const BeersContainer = () => {
    const [beers, setBeers] = useState<BeerInterface[]>([]);

    useEffect(() => {
        fetch('http://127.0.0.1:3000/api/v1/beers')
        .then(res => res.json())
        .then((data: BeerInterface[]) => {
            setBeers(data);
        })
 
    }, []);

    return(
        <div>
            <div className="grid grid-cols-4 gap-4">
                {beers.map((beer: BeerInterface, idx) => 
                    <BeerCard beer={beer} key={idx} />
                )}
            </div>
        </div>
    );
};

export default BeersContainer;