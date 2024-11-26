import { Card, Spinner } from "react-bootstrap";
import { toTitleCase } from "../../lib/helpers";
import "./BluetoothDeviceCard.css";
import { isMobile } from "react-device-detect";

/**
 * displays a bluetooth device
 * @param device bluetooth device object to display
 */
export default function BluetoothDeviceCard({ connecting = false, device, onClick = () => { } }) {

    return (
        <Card onClick={onClick} className={"bluetooth-device-card " + (isMobile ? "mobile " : "") + (connecting ? "connecting " : "") + (device.Connected ? "connected " : "")+ (device.Paired ? "paired " : "")} >
            <Card.Body className={"d-flex flex-column gap-1 py-2 px-3"} style={{ backgroundColor: "white" }}>
                <strong className="name"><span className="user-select-none">{toTitleCase(device.Name)} <Spinner className="ms-1" size="sm" hidden={!connecting} variant="primary"></Spinner></span></strong>
                <small className="user-select-none">{device.Mac} <small hidden={!device.Connected}>- Connected</small></small>
            </Card.Body>
        </Card >

    )


}