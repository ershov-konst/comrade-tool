//import HID from 'node-hid'
const HID = window.require('node-hid');
import {SCREEN_WELCOME, SCREEN_PEDALS} from '../lib/constants';

const VENDOR_ID = 1155;
const PRODUCT_ID = 22352;
const CHECK_DEVICE_INTERVAL = 1000;




export default function init(store, history) {
    /**
     *
     * @returns {*}
     */
    function getDevice() {
        let devices = HID.devices();
        let device_info = devices.find(d => {
            return d.vendorId === VENDOR_ID && d.productId === PRODUCT_ID;
        });

        return device_info ? new HID.HID(device_info.path) : null;
    }

    /**
     * Waiting for connecting devices
     */
    function wait() {
        let interval_id = setInterval(() => {
            const d = getDevice();
            if (d) {
                clearInterval(interval_id);
                connect(d);
            }
        }, CHECK_DEVICE_INTERVAL);
    }

    function connect(device) {
        console.log(`Device connected`);
        history.push(SCREEN_PEDALS);


        device.on('data', function(data) {
            //console.log(data);
            /*console.log({
                "axis1" : data.readUIntLE(9,2),
                "axis2" : data.readUIntLE(11,2),
                "axis3" : data.readUIntLE(13,2),
            });*/
        });
        device.on('error', function(err) {
            console.log(err);
        });
    }





    wait();
}