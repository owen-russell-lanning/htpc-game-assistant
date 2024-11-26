import Card from "react-bootstrap/Card";
import SectionTitle from "../Text/SectionTitle";
import "./SectionContainer.css";

export default function SectionContainer({ className = "", children, title, subtitle, titleIcon }) {
    return (
        <div className="section-container p-4" >

            <div className="d-flex flex-row gap-3 align-items-center">
                <SectionTitle className="mb-1">{title}</SectionTitle>
                {titleIcon ?? []}
            </div>
            <p className="mb-3">{subtitle}</p>
            <div className={className}>
                {children}
            </div>

        </div>
    )
}