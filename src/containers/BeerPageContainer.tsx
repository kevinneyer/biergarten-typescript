import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Reviews from "../components/Reviews";
import BeerInfo from "../components/BeerInfo";

const BeerPageContainer = () => {
    const { beerId } = useParams();
    const [showBeer, setShowBeer] = useState<BeerInterface | null>(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:3000/api/v1/beers/${beerId}`)
        .then(res => res.json())
        .then(data => {
            setShowBeer(data);
        })
    }, [beerId]);

    return (
        <div className='px-[50px]'>
            <div className='pt-10 grid grid-cols-2 gap-4'>
                {showBeer ? <BeerInfo beer={showBeer} /> : null}
                <Reviews beer={showBeer} />
            </div>
        </div>
    )
};

export default BeerPageContainer;