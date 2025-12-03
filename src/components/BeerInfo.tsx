interface BeerInfoProps {
    beer: BeerInterface
}

const BeerInfo = ({beer}: BeerInfoProps) => {
    return (
        <div>
            {beer.name}
        </div>
    )
};

export default BeerInfo;