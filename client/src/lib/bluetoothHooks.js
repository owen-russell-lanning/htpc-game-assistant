import { useEffect, useRef, useState } from "react";
import { getPairedBluetoothDevices, scanForBluetoothDevies } from "./bluetooth";


/**
 * gets scanned devices from the server
 * @param shouldScan if true, the hook will get scanned devices
 * @return a list of scanned devices
 */
export function useScannedBluetoothDevices(shouldScan) {
    const [devices, setDevices] = useState([]);
    const shouldScanRef = useRef(shouldScan);

    const runScan = async () => {
        if (shouldScanRef.current) {
            try {
                const devs = await scanForBluetoothDevies()
                setDevices(devs);
            } catch {

            }


            runScan();
        }
    }

    useEffect(() => {
        shouldScanRef.current = shouldScan;
        if (shouldScan) {
            runScan();
        }

    }, [shouldScan]);

    return devices;

}


/**
 * gets paired devices from the server
 * @param runInterval interval in seconds to update devices
 * @returns a list of paired devices
 */
export function usePairedBluetoothDevices(runInterval) {
    const [devices, setDevices] = useState(null);


    const pullDevices = async () => {
        const result = await getPairedBluetoothDevices();
        setDevices(result);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            pullDevices();
        }, runInterval * 1000);

        pullDevices();
        return () => clearInterval(interval);
    }, []);

    return devices;
}