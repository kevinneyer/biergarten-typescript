import { useEffect, useState } from 'react';
import BeerCard from '../components/cards/BeerCard';
import { API_URL } from '../config.ts';
import LoginCallout from '../components/LoginCallout.tsx';
import Filters from '../components/Filters.tsx';
import { SyncLoader } from 'react-spinners';

interface BeersContainerProps {
    currentUser: UserInterface | null;
}

interface DataObject {
    beers: BeerInterface[];
    styles: string[];
}

const BeersContainer = ({currentUser}: BeersContainerProps) => {
    const [beers, setBeers] = useState<BeerInterface[]>([]);
    const [filterStyles, setFilterStyles] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [style, setStyle] = useState<string | null>(null);
    const [fetchError, setFetchError] = useState<boolean>(false);
    
    const slugify = (text: string): string => {
        return text.toLowerCase().replace(/\s+/g, '-');
    };

    useEffect(() => {
        const queryParams = new URLSearchParams();
        if (style) {
            const slug = slugify(style);
            queryParams.append('style', slug);
        }
        const queryString = queryParams.toString();
        const url = `${API_URL}/beers?${queryString}`;

        fetch(url)
        .then((res) => {
            if (!res.ok) {
                setBeers([]);
                setIsLoading(false);
                setFetchError(true);
                return;
            }

            return res.json();
        })
        .then((data: DataObject) => {
            setBeers(data.beers);
            setFilterStyles(data.styles);
            setFetchError(false);
            setIsLoading(false);
        })
    }, [style]);

    const onFilterChange = (newStyle: string | null): void => {
        if (newStyle !== style) {
            setStyle(newStyle);
            setIsLoading(true);
            setFetchError(false);
        }
    };

    return(
        <div>
            <div className='absolute mt-[5px]'>
                <Filters 
                    filterStyles={filterStyles}
                    onFilterChange={onFilterChange}   
                />
            </div>
            <div className='pt-15 h-full'>
                {isLoading ? 
                    <div className='pt-15'>
                        <SyncLoader 
                            color='#fff'
                            size='10px'
                        />
                    </div> 
                :
                    !fetchError ?
                        <div>
                            {currentUser ?
                                <div className="grid grid-cols-4 gap-4">
                                    {beers.map((beer: BeerInterface, idx) => 
                                        <BeerCard beer={beer} key={idx} />
                                    )}
                                </div>
                            :
                                <LoginCallout />
                            }
                        </div>
                    :
                    'Something Went Wrong.'
                }
            </div>
        </div>
    );
};

export default BeersContainer;