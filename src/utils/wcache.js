// https://github.com/qq273681448/wCache/blob/master/src/wcache.js
const postfix = '_deadtime';

function put(k, v, t) {
  wx.setStorageSync(k, v);
  const seconds = parseInt(t);
  if (seconds > 0) {
    let timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000 + seconds;
    wx.setStorageSync(k + postfix, `${timestamp}`);
  } else {
    wx.removeStorageSync(k + postfix);
  }
}

function get(k, def) {
  const deadtime = parseInt(wx.getStorageSync(k + postfix));
  if (deadtime) {
    if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
      if (def) { return def; } return;
    }
  }
  const res = wx.getStorageSync(k);
  if (res !== undefined) {
    return res;
  }
  return def;
}

function remove(k) {
  wx.removeStorageSync(k);
  wx.removeStorageSync(k + postfix);
}

function clear() {
  wx.clearStorageSync();
}

export default {
  put,
  get,
  remove,
  clear,
};
