import { Card } from "react-bootstrap";
import { isMobile } from "react-device-detect";
import "./ShortcutCard.css";
import "./Cards.css";
import { useState } from "react";
import { toast } from 'react-toastify';
import { SHORTCUT_ROUTE } from "../../config/RouteConstants";
import { SERVER_URL } from "../../config/ServerConstants";

export default function ShortcutCard({ name, icon, shortcutUrlName }) {

    const runShotcut= () =>{
        toast("Opening " + name);

        /** open shortcut */
        fetch(SERVER_URL +  SHORTCUT_ROUTE + "/" + shortcutUrlName, {
            method:"POST"
        });
    }

    return (
        <Card onClick={runShotcut} className={"shortcut-card p-3 main-card d-flex flex-column align-items-center " + (isMobile ? "mobile " : "")} >
                   <img className="mb-3" src={icon}></img>
            <Card.Title>{name}</Card.Title>
        </Card>
    )
}