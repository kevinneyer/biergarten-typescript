import { useState } from "react";

interface BeerInfoProps {
    beer: BeerInterface;
    isLiked: boolean;
    currentUser: UserInterface | null;
}

const BeerInfo = ({beer, isLiked, currentUser}: BeerInfoProps) => {
    const [beerIsLiked, setBeerIsLiked] = useState<boolean>(isLiked);

    const likeBeerHandler = (beerId: number): void => {
        if (currentUser) {
            fetch(`http://127.0.0.1:3000/api/v1/like/${beerId}`, {
                method: 'POST',
                'headers': {
                    'Content-Type': 'appilcation/json',
                    'accepts': 'appilcation/json',
                    "Authorization": localStorage.token
                },
            })
            .then(res => {
                if (res.ok) {
                    setBeerIsLiked(true);   
                } else {
                    alert('Something went wrong!');
                }
            })
        } else {
            alert('You must be logged in!');
        }
    };

    const unlikeBeerHandler = (beerId: number): void => {
        if (currentUser) {
            fetch(`http://127.0.0.1:3000/api/v1/like/${beerId}`, {
                method: 'DELETE',
                'headers': {
                    'Content-Type': 'appilcation/json',
                    'accepts': 'appilcation/json',
                    "Authorization": localStorage.token
                },
            })
            .then(res => {
                if (res.ok) {
                    setBeerIsLiked(false);   
                } else {
                    alert('Something went wrong!');
                }
            })
        } else {
            alert('You must be logged in!');
        }
    };

    return (
        <div className='flex flex-col items-center'>
            <img className='w-[300px] max-w-[300px]' src={beer.img_url} />
            <div>
                <div className='text-3xl font-bold'>{beer.name}</div>
                <div className='text-xl'>by {beer.brewery}</div>
            </div>
            <div className='w-[300px] max-w-[300px] text-left mt-[15px] flex flex-col gap-2'>
                <div><span className='font-bold'>ABV</span>: {beer.abv}%</div>
                <div><span className='font-bold'>Style:</span> {beer.style}</div>
                <div><span className='font-bold'>Tasting Notes:</span> {beer.tasting_notes}</div>
                <div><span className='font-bold'>Recommended For:</span> {beer.recommended_drinking}</div>
            </div>
            <div className='mt-3 flex gap-2 cursor-auto'>
                { !beerIsLiked ? 
                    <button 
                        className='bg-green-800 rounded-md w-[200px] p-2.5' type='button'
                        onClick={() => likeBeerHandler(beer.id)}    
                    >Like
                    </button>
                    :
                    <button 
                        className='bg-red-800 rounded-md w-[200px] p-2.5' type='button'
                        onClick={() => unlikeBeerHandler(beer.id)}    
                    >Dislike
                    </button>
                }
                <button className='bg-black rounded-md w-[200px] p-2.5' type='button'>Save for Later</button>
            </div>
        </div>
    )
};

export default BeerInfo;