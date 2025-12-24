import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Reviews from "../components/Reviews";
import BeerInfo from "../components/BeerInfo";

const BeerPageContainer = () => {
    const { beerId } = useParams();
    const [showBeer, setShowBeer] = useState<BeerInterface | null>(null);
    const [beerIsLiked, setBeerIsLiked] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.token;
        fetch(`http://127.0.0.1:3000/api/v1/beers/${beerId}`, {
            headers: {
                "Authorization": token
            }
        })
        .then(res => res.json())
        .then(data => {
            setShowBeer(data.beer);
            setBeerIsLiked(data.is_liked);
        })
    }, [beerId]);

    return (
        <div className='px-[50px]'>
            <div>
                {showBeer ? 
                <div className='pt-10 grid grid-cols-2 gap-8'>
                    <BeerInfo beer={showBeer} isLiked={beerIsLiked}/> 
                    <Reviews beer={showBeer} />
                </div>
                :
                'Loading...'
                }
            </div>
        </div>
    )
};

export default BeerPageContainer;