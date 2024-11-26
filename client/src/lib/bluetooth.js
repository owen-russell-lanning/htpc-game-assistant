import { SERVER_URL } from "../config/ServerConstants";

export async function scanForBluetoothDevies() {
    const resp = await fetch(SERVER_URL + "/bluetooth/scan");
    if (!resp.ok) {
        return [];
    }

    const content = await resp.json();
    return content.map(BluetoothDevice.fromObj);
}


export async function getPairedBluetoothDevices() {
    const resp = await fetch(SERVER_URL + "/bluetooth/paired");
    if (!resp.ok) {
        return [];
    }

    const content = await resp.json();
    return content.map(BluetoothDevice.fromObj);
}


export class BluetoothDevice {
    constructor(name, mac, paired, connected) {
        this.Name = name;
        this.Mac = mac;
        this.Paired = paired;
        this.Connected = connected;
    }


    /**
     * @returns true if the bluetooth device has a real which isn't a mac address
     */
    hasRealName() {
        var parts = this.Name.split(":");
        if (parts.length == 6) {
            return false;
        }

        parts = this.Name.split("-");
        if (parts.length == 6) {
            return false;
        }

        return true;
    }

    async connect() {
        const resp = await fetch(SERVER_URL + "/bluetooth/connect?" + new URLSearchParams({ mac: this.Mac }));
        if (!resp.ok) {
            return [];
        }

        const data = await resp.text();
        return data == "true";

    }

    async remove() {
        const resp = await fetch(SERVER_URL + "/bluetooth/paired", {
            method: 'DELETE',
            body: JSON.stringify({ mac: this.Mac }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        });

        return resp.ok;
    }

    static fromObj(obj) {
        return new BluetoothDevice(obj["name"], obj["mac"], obj["paired"], obj["connected"]);
    }
}