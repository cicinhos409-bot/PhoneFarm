export interface Device {
  id: string;
  name: string;
  status: 'idle' | 'running' | 'error';
  lastSeen: string;
  osVersion: string;
  platform: 'android' | 'ios';
}

export interface DeviceSdk {
  listDevices: () => Promise<Device[]>;
  startDevice: (id: string) => Promise<void>;
  stopDevice: (id: string) => Promise<void>;
  getDevice: (id: string) => Promise<Device | null>;
  getStreamUrl: (id: string) => Promise<string>;
}

export const createDeviceSdk = (apiBaseUrl: string): DeviceSdk => {
  const api = {
    listDevices: async () => {
      const res = await fetch(`${apiBaseUrl}/devices`);
      if (!res.ok) throw new Error('Failed to list devices');
      return res.json();
    },
    startDevice: async (id: string) => {
      const res = await fetch(`${apiBaseUrl}/devices/${id}/start`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to start device');
    },
    stopDevice: async (id: string) => {
      const res = await fetch(`${apiBaseUrl}/devices/${id}/stop`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to stop device');
    },
    getDevice: async (id: string) => {
      const res = await fetch(`${apiBaseUrl}/devices/${id}`);
      if (!res.ok) return null;
      return res.json();
    },
    getStreamUrl: async (id: string) => {
      const res = await fetch(`${apiBaseUrl}/devices/${id}/stream`);
      if (!res.ok) throw new Error('Failed to get stream URL');
      const data = await res.json();
      return data.streamUrl;
    }
  };
  return api;
};

export default createDeviceSdk;