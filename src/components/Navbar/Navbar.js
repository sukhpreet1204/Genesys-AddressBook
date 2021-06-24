import { Link } from 'react-router-dom';
import "../../components/Navbar/navbar.scss";


const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Address Book</h1>
            <div className="links">
            <Link to="/">Home</Link>
            <Link to="/create">Create User</Link>
            </div>
        </nav>
      );
}
 
export default Navbar;