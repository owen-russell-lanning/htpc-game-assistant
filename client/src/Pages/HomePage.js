import PageSelectorCard from "../Components/Cards/PageSelectorCard";
import ShortcutCard from "../Components/Cards/ShortcutCard";
import { BLUETOOTH_ROUTE, STEAM_LINK_LOGO } from "../config/RouteConstants";
import Page from "./Page";
import { Bluetooth } from "react-bootstrap-icons";


export default function HomePage() {
    return (
        <Page title="Home">
            <h4 className="mb-3">Shortcuts</h4>
            <div className="d-flex flex-row w-100 flex-wrap gap-3 mb-5">
                <ShortcutCard shortcutUrlName="steamlink" name="Steam Link" icon={STEAM_LINK_LOGO}></ShortcutCard>
            </div>
            <h4 className="mb-3" >Settings</h4>
            <div className="d-flex flex-row w-100 flex-wrap gap-3">

                <PageSelectorCard link={BLUETOOTH_ROUTE} icon={<Bluetooth size={18}></Bluetooth>} title="Bluetooth" description="Manage bluetooth devices"></PageSelectorCard>
            </div>
        </Page>
    )
}