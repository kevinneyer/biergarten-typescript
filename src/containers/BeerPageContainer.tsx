import { useParams } from "react-router";
import { useEffect, useState } from "react";

const BeerPageContainer = () => {
    const { beerId } = useParams();
    const [showBeer, setShowBeer] = useState<BeerInterface | null>(null)

    useEffect(() => {
        fetch(`http://127.0.0.1:3000/api/v1/beers/${beerId}`)
        .then(res => res.json())
        .then(data => {
            setShowBeer(data);
        })
    });

    return (
        <>
            {showBeer ? showBeer.name : ''}
        </>
    )
};

export default BeerPageContainer;