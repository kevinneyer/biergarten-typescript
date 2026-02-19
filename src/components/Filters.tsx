import { useState } from 'react';

interface FiltersProps {
    filterStyles: string[];
    onFilterChange: (style: string | null) => void;
    onSortChange: (sortString: string | null) => void;
}
const Filters = ({filterStyles, onFilterChange, onSortChange}: FiltersProps) => {
    const [styleFilterOpen, setStyleFilterOpen] = useState<boolean>(false);
    const [sortFilterOpen, setSortFilterOpen] = useState<boolean>(false);
    const [style, setStyle] = useState<string | null>(null);
    const [sort, setSort] = useState<string | null>(null);

    const sortLabels = ['ABV', 'Likes', 'Reviews', 'Rating'] ;
    const shouldShowClearButton = style || sort;
    const openHeight = '150px';
    const closedHeight = '40px';

    const styleFilterHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const styleValue = (e.target as HTMLInputElement).value;
        setStyle(styleValue);
        onFilterChange(styleValue);
    };

    const sortHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const value = (e.target as HTMLInputElement).value;
        setSort(value);
        onSortChange(value.toLowerCase());
    };

    const clearFilterHandler = () => {
        setStyle(null);
        setSort(null);
        onFilterChange(null);
        onSortChange(null);
    };

    return (
        <div className='flex'>
            <div 
                className='w-[250px] bg-white  rounded-md border-2 border-black cursor-pointer text-black overflow-y-scroll'
                style={{
                    height: styleFilterOpen ? openHeight : closedHeight 
                }}
                onClick={() => setStyleFilterOpen(!styleFilterOpen)}
            >  
                <div className='py-[5px] w-full text-center'>
                    {style ? `${style} Selected` : 'Select a Style'}
                </div>
                <div className='flex flex-col text-black w-full relative'>
                    {styleFilterOpen ? filterStyles.map((filter, index) => (
                        <input
                            key={index}
                            className='text-sm text-left bg-white border border-solid border-grey-200 cursor-pointer rounded pl-md pr-[30px] w-full h-11 truncate shadow-xs'
                            type='button' 
                            value={filter}
                            onClick={(e) => styleFilterHandler(e)}
                        />
                    ))
                    : null}
                </div>
            </div>
            <div 
                className='w-[150px] bg-white  rounded-md border-2 border-black cursor-pointer text-black overflow-y-scroll'
                style={{
                    height: sortFilterOpen ? openHeight : closedHeight 
                }}
                onClick={() => setSortFilterOpen(!sortFilterOpen)}
            >
                <div className='py-[5px] w-full text-center'>
                    {sort ? `${sort} Selected` : 'Sort By'}
                </div>
                <div className='flex flex-col text-black w-full relative'>
                    {sortFilterOpen ? sortLabels.map((label, index) => (
                        <input
                            key={index}
                            className='text-sm text-left bg-white border border-solid border-grey-200 cursor-pointer rounded pl-md pr-[30px] w-full h-11 truncate shadow-xs'
                            type='button' 
                            value={label}
                            onClick={(e) => sortHandler(e)}
                        />
                    ))
                : null}
                </div>
            </div>
            {shouldShowClearButton ?
                <div 
                    className='w-[150px] bg-white  rounded-md border-2 border-black cursor-pointer text-black overflow-y-scroll max-h-10 ml-auto'
                    onClick={clearFilterHandler}
                >
                    <div className='py-[5px] w-full text-center'>
                        Clear Filters
                    </div>
                </div>
            : null}
        </div>
    );
};

export default Filters;