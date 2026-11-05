import { createDeviceSdk } from './mockDeviceSdk';

let mockDevices: Map<string, any> = new Map();

function generateMockDevice(id: string): any {
  return {
    id,
    name: `Device ${id}`,
    status: 'idle',
    lastSeen: new Date().toISOString(),
    osVersion: '14.0',
    platform: 'android',
    id: id,
    name: `Device ${id}`,
    status: 'idle',
    lastSeen: new Date().toISOString(),
    osVersion: '14.0',
    platform: 'android',
    id,
    name: `Device ${id}`,
    status: 'idle',
    lastSeen: new Date().toISOString(),
    osVersion: '14.0',
    platform: 'android',
  };
}

export { createDeviceSdk } from './mockDeviceSdk';