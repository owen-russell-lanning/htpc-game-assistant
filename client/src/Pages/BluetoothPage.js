import { Button, Spinner } from "react-bootstrap";
import PageTitle from "../Components/Text/PageTitle";
import SectionTitle from "../Components/Text/SectionTitle";
import Page from "./Page";
import Card from "react-bootstrap/Card";
import FullWidthMobileButton from "../Components/Button/FullWidthMobileButton";

import { usePairedBluetoothDevices, useScannedBluetoothDevices } from "../lib/bluetoothHooks";
import { useState } from "react";
import BluetoothDeviceCard from "../Components/Cards/BluetoothDeviceCard";
import { BluetoothDevice } from "../lib/bluetooth";
import { isMobile } from "react-device-detect";
import SectionContainer from "../Components/Containers/SectionContainer";
import ABModal from "../Components/Modals/ABModal";
import { toTitleCase } from "../lib/helpers";
import BluetoothDeviceModal from "../Components/Modals/BluetoothDeviceModal";


export default function BluetoothPage({ }) {

    /** modal controls */
    const [showBluetoothDeviceModal, setShowBluetoothDeviceModal] = useState(false);
    const [showConnectModal, setShowConnectModal] = useState(false);


    const [scanningForDevices, setScanningForDevices] = useState(false);
    const foundDevices = useScannedBluetoothDevices(scanningForDevices);
    const [hasSearched, setHasSearched] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [connectingToDevice, setConnectingToDevice] = useState(null);
    const pairedDevices = usePairedBluetoothDevices(10);

    const onConnectModalSelection = (selected) => {
        if (selected == "Connect") {
            connectToDevice(selectedDevice);
            setSelectedDevice(null);

        }
        else if (selected == "Cancel") {
            setSelectedDevice(null);
        }
    }

    const connectToDevice = async (device) => {
        if (connectingToDevice) {
            /** device already being connected to */
            return;
        }

        setConnectingToDevice(device);
        const res = await device.connect();
        setConnectingToDevice(null);

    }

    /**
     * 
     * @returns true if the device is in the paired devices list
     */
    const inPairedDevices = (device) => {
        if (pairedDevices === null) {
            return false;
        }

        for (var i = 0; i < pairedDevices.length; i++) {
            if (pairedDevices[i].Mac == device.Mac) {
                return true;
            }
        }
        return false;
    }


    return (
        <Page title="Bluetooth" className="d-flex flex-column gap-4">
            <BluetoothDeviceModal show={showBluetoothDeviceModal} onHide={() =>{setShowBluetoothDeviceModal(false)}} device={selectedDevice}></BluetoothDeviceModal>
            <ABModal onSubmit={onConnectModalSelection} buttonBVariant="danger" optionA="Connect" optionB="Cancel" text={"Connect to " + (selectedDevice ? toTitleCase(selectedDevice.Name) : "") + "?"} show={showConnectModal} onHide={() => { setShowConnectModal(false) }}></ABModal>
            <PageTitle>Manage Bluetooth</PageTitle>
            <SectionContainer titleIcon={<Spinner hidden={!scanningForDevices} variant="primary" size="sm" animation="border" role="status"></Spinner>} className="d-flex flex-column gap-3" title="Search For Devices" subtitle="Any bluetooth devices found will appear here.">
                <div className={"d-flex gap-3 " + (isMobile ? "flex-column " : "flex-row flex-wrap ")}>
                    <span hidden={!hasSearched || foundDevices.length != 0}>No Devices Found</span>
                    {
                        connectingToDevice ? <BluetoothDeviceCard connecting={true} device={connectingToDevice}></BluetoothDeviceCard> : []
                    }
                    {foundDevices.filter(d => d.hasRealName() && (connectingToDevice == null || connectingToDevice.Mac != d.Mac) && !inPairedDevices(d)).map((d) => {
                        return <BluetoothDeviceCard onClick={() => { setSelectedDevice(d); setShowConnectModal(true) }} device={d}></BluetoothDeviceCard>
                    })}
                </div>
                {
                    scanningForDevices ?
                        <FullWidthMobileButton onClick={() => { setScanningForDevices(false); }}>Stop Searching</FullWidthMobileButton> :
                        <FullWidthMobileButton onClick={() => { setScanningForDevices(true); setHasSearched(true) }}>Search</FullWidthMobileButton>
                }

            </SectionContainer>
            <SectionContainer title="Paired Devices">
                {pairedDevices === null ?
                    <Spinner hidden={pairedDevices != null} size="lg" variant="primary"></Spinner> :

                    pairedDevices.map((d) => {
                        return <BluetoothDeviceCard onClick={() =>{setSelectedDevice(d); setShowBluetoothDeviceModal(true)}} device={d}></BluetoothDeviceCard>
                    })}

                <span hidden={pairedDevices == null || pairedDevices.length != 0}>No Devices Paired</span>
            </SectionContainer>
        </Page>
    )
}