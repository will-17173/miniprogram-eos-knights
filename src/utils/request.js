const request = {
  get(url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        data,
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
        },
        success(res) {
          if (res.statusCode !== 200) {
            wx.showToast({
              title: '网络出错，稍后再试',
              icon: 'none',
            });
            return false;
          }
          resolve(res.data);
        },
        fail(error) {
          reject(error);
        },
        complete() {},
      });
    });
  },
  post(url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        data,
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        success(res) {
          resolve(res.data);
        },
        fail(error) {
          reject(error);
        },
        complete() {},
      });
    });
  },
};

export default request;
