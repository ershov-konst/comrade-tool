const HID = window.require('node-hid');
import {createHashHistory} from "history";
import {useEffect} from 'react';
import EventEmitter from 'events';
import {SCREEN_WELCOME, SCREEN_PEDALS} from '../lib/constants';
import {connected, disconnected} from '../ducks/device/actions';

const history = createHashHistory();
const VENDOR_ID = 1155;
const PRODUCT_ID = 22352;
const CHECK_DEVICE_INTERVAL = 1000;

const event_bus = new EventEmitter();

/**
 * Main data parser
 * @param {Buffer} data - raw report data
 * @returns {Object}
 */
function parseDeviceData(data) {
    return {
        "axis1" : data.readUIntLE(9,2),
        "axis2" : data.readUIntLE(11,2),
        "axis3" : data.readUIntLE(13,2),
    }
}

/**
 * Selecting needed device from list
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

/**
 * Handle device connection
 * @param device
 */
function connect(device) {
    console.log(`Device connected`);

    window.onbeforeunload = function() {
        device.close();
    };

    const device_info = device.getDeviceInfo();

    device.on('data', function(data) {
        event_bus.emit('data', parseDeviceData(data));
    });
    device.on('error', function(err) {
        console.warn(err);
        console.log(`Device disconnected`);
        device.close();
        device = null;
        window.onbeforeunload = null;

        history.push(SCREEN_WELCOME);
        disconnected();

        wait();
    });

    connected(device_info);
    history.push(SCREEN_PEDALS);
}

/**
 * Init function
 */
export function init() {
    wait();
}


export function useDeviceData(handler, metric_name) {
    useEffect(() => {
        function localHandler (data) {
            handler(data[metric_name]);
        }
        event_bus.on('data', localHandler);

        return () => {
            event_bus.off('data', localHandler);
        };
    }, []);
}