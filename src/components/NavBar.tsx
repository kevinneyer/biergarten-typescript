import { NavLink } from "react-router";

interface NavBarProps {
    currentUser: UserInterface | null;
    logoutUser: () => void;
}

const NavBar = ({currentUser, logoutUser }: NavBarProps) => {
    return (
        <div className='w-full flex'>
            {currentUser ?
            <div>
                <NavLink to={`/beers`}>
                    <div>All Beers</div>
                </NavLink>
                <NavLink to={`/users`}>
                    <div>All Users</div>
                </NavLink>
                <div onClick={logoutUser}>Logout</div>
            </div>
            :
            null}
        </div>
    )
};

export default NavBar;