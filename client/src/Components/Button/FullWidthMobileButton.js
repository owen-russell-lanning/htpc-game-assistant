import { Button } from "react-bootstrap";
import { isMobile } from "react-device-detect";

export default function FullWidthMobileButton({className = "", onClick = () =>{}, children, width ="fit-content" }) {

    var style = {};
    if (!isMobile) {
        style.width = width;
    }

    return (
        <Button onClick={onClick} className={(isMobile ? "w-100 " : "") + className} style={style}>{children}</Button>
    )
}