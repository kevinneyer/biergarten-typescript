import { NavLink } from "react-router";

interface NavBarProps {
    currentUser: UserInterface | null;
    logoutUser: () => void;
}

const NavBar = ({currentUser, logoutUser }: NavBarProps) => {
    return (
        <>
            {currentUser ?
            <div className='w-full bg-gray-400 text-black p-4 mb-2 rounded-md'>
                <div className="flex gap-4">
                    <NavLink to={`/beers`}>
                        <div>All Beers</div>
                    </NavLink>
                    <NavLink to={`/users`}>
                        <div>All Users</div>
                    </NavLink>
                    <NavLink to={`/profile`}>
                        <div>My Profile</div>
                    </NavLink>
                    <div className="ml-auto" onClick={logoutUser}>Logout</div>
                </div>
            </div>
            :
            null}
      </>
    )
};

export default NavBar;