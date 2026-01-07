import { NavLink } from "react-router";

interface BeerCardProps {
    beer: BeerInterface;
}

const BeerCard = ({beer}: BeerCardProps) => {
    return (
        <>
            <div className='bg-white flex flex-col text-black p-4 max-h-[300px] min-h-[300px] rounded-lg shadow-sm shadow-white'>
                <div>
                    <div>{beer.name}</div>
                    <div>{beer.brewery}</div>
                </div>
                <div className='mt-4'>
                    <button 
                        className='bg-blue-200 p-2 rounded-sm' 
                        type="button"
                    >
                        <NavLink
                            to={`/beers/${beer.id}`}
                            className={({ isActive }) =>
                                isActive ? "text-red-500" : "text-black"
                            }
                            >
                            See More Info
                        </NavLink>
                    </button>
                </div>
            </div>
        </>
    );
};

export default BeerCard;