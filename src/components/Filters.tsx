import { useState } from 'react';

interface FiltersProps {
    filterStyles: string[];
    onFilterChange: (style: string | null) => void;
    onSortChange: (sortString: string | null) => void;
    onSortOrderChange: (sortString: string) => void;
}

const Filters = ({filterStyles, onFilterChange, onSortChange, onSortOrderChange}: FiltersProps) => {
    const [styleFilterOpen, setStyleFilterOpen] = useState<boolean>(false);
    const [sortFilterOpen, setSortFilterOpen] = useState<boolean>(false);
    const [style, setStyle] = useState<string | null>(null);
    const [sort, setSort] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<string>('ascending');

    const sortLabels = ['ABV', 'Likes', 'Reviews', 'Rating'] ;
    const shouldShowClearButton = style || sort;
    const openHeight = '150px';
    const closedHeight = '40px';

    const styleFilterHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>): void => {
        const styleValue = (e.target as HTMLInputElement).value;
        setStyle(styleValue);
        onFilterChange(styleValue);
    };

    const sortHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>): void => {
        const value = (e.target as HTMLInputElement).value;
        setSort(value);
        onSortChange(value.toLowerCase());
    };

    const sortOrderHandler = (stringVal: string): void => {
        setSortOrder(stringVal);
        onSortOrderChange(stringVal);
    };

    const clearFilterHandler = () => {
        setStyle(null);
        setSort(null);
        onFilterChange(null);
        onSortChange(null);
    };

    return (
        <div className='flex absolute w-full'>
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
            {sort ?
                <div className='ml-[15px] flex gap-[5px] mt-[5px]'>
                    <div 
                        className='flex justify-center items-center w-[100px] text-black rounded-full text-center h-[30px] cursor-pointer'
                        onClick={() => sortOrderHandler('ascending')}
                        style={{
                            // borderColor: sortOrder === 'ascending' ? 'oklch(21% 0.034 264.665)' : 'oklch(70.7% 0.022 261.325)',
                            backgroundColor: sortOrder === 'ascending' ? 'oklch(70.7% 0.022 261.325)' : 'oklch(96.7% 0.003 264.542)',
                        }}
                    >
                        Asc
                    </div>
                    <div 
                        className='flex justify-center items-center w-[100px] text-black rounded-full text-center h-[30px] cursor-pointer'
                        onClick={() => sortOrderHandler('descending')}
                        style={{
                            // borderColor: sortOrder === 'descending' ? 'oklch(21% 0.034 264.665)' : 'oklch(70.7% 0.022 261.325)',
                            backgroundColor: sortOrder === 'descending' ? 'oklch(70.7% 0.022 261.325)' : 'oklch(96.7% 0.003 264.542)',
                        }}
                    >
                        Desc
                    </div>
                </div>
            : null}
            {shouldShowClearButton ?
                <div 
                    className='ml-auto w-[150px] bg-white border-2 border-black rounded-md cursor-pointer text-black max-h-10 hover:bg-gray-400 transition-all ease-in-out'
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