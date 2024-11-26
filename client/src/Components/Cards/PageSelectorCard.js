import Card from 'react-bootstrap/Card';
import "./PageSelectorCard.css";
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';
import "./Cards.css";

/**
 * a card used to select a page 
 * 
 */
export default function PageSelectorCard({ link, icon, title, description }) {
    return (

        <Card className={"page-selector-card p-3 main-card " + (isMobile ? "mobile " : "")}>
            <Link to={link}>
                <Card.Title className='d-flex flex-row gap-1 align-items-center text-primary user-select-none'>
                    {icon}
                    {title}
                </Card.Title>
                <Card.Text className='user-select-none'>{description}</Card.Text>
            </Link>
        </Card >

    )
}