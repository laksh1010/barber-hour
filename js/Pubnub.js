import { pubnubSubscribeKey } from './env';
const apiHost = `http://pubsub.pubnub.com/v1/push/sub-key/${pubnubSubscribeKey}`;

export default class Pubnub {
  static _sendRequest(deviceID, type, channel) {
    fetch(`${apiHost}/devices/${deviceID}?type=gcm&${type}=${channel}`);
  }

  static enablePushNotificationsOnChannel(channel, deviceID) {
    this._sendRequest(deviceID, 'add', channel);
  }

  static disablePushNotificationsOnChannel(channel, deviceID) {
    this._sendRequest(deviceID, 'remove', channel);
  }
}
