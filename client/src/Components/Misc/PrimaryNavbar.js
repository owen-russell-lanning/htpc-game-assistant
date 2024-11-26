
import Navbar from "react-bootstrap/Navbar";
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import { HOME_ROUTE } from "../../config/RouteConstants";



export default function PrimaryNavbar({ }) {
    return (
        <Navbar bg="primary" data-bs-theme="dark" className="px-3">
            <Link to={HOME_ROUTE} >
                <Navbar.Brand>
                    <strong>HTPC Game Assistant</strong>
                </Navbar.Brand>
            </Link>
        </Navbar>
    )
}