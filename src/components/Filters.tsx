import { useState } from 'react';

interface FiltersProps {
    filterStyles: string[];
    onFilterChange: (style: string) => void;
}
const Filters = ({filterStyles, onFilterChange}: FiltersProps) => {
    const [styleFilterOpen, setStyleFilterOpen] = useState<boolean>(false);
    const [style, setStyle] = useState<string | null>(null);
    // const [styleText, setStyleText] = useState<string>('Select a Style')

    const height = styleFilterOpen ? '150px' : '40px';

    const styleFilterHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const styleValue = (e.target as HTMLInputElement).value;
        setStyle(styleValue);
        // setStyleText(`${styleValue} Selected`);
        onFilterChange(styleValue);
    };

    return (
        <div>
            <div 
                className='w-[250px] bg-white  rounded-md border-2 border-black cursor-pointer text-black overflow-y-scroll'
                style={{
                    height: height 
                }}
                onClick={() => setStyleFilterOpen(!styleFilterOpen)}
            >  
                <div className='py-[5px] w-full text-center'>
                    {style ? `${style} Selected` : 'Select a Style'}
                </div>
                <div className='flex flex-col text-black w-full relative'>
                    {styleFilterOpen ? filterStyles.map((filter) => (
                        <input
                            className='text-sm text-left bg-white border border-solid border-grey-200 cursor-pointer rounded pl-md pr-[30px] w-full h-11 truncate shadow-xs'
                            type='button' 
                            value={filter}
                            onClick={(e) => styleFilterHandler(e)}
                        />
                    ))
                    : null}
                </div>
            </div>
        </div>
    );
};

export default Filters;