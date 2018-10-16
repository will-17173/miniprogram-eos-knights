export default function (store) {
  wx.getSetting({
    success: (res) => {
      if (res.errMsg === 'getSetting:ok' && res.authSetting['scope.userInfo']) {
        const openId = wx.getStorageSync('open_id');
        if (!openId) {
          wx.getUserInfo({
            success(res) {
              wx.setStorageSync('userInfo', res.userInfo);
            },
          });

          wx.login({
            success: (res) => {
              if (res.code) {
                store.dispatch('LOGIN', {
                  code: res.code,
                });
              }
            },
          });
        }
      }
    },
  });
}
