const res = wx.getSystemInfoSync();

export const updataManager = () => {
  const updateManager = wx.getUpdateManager();
  updateManager.onCheckForUpdate((res) => {
    // 请求完新版本信息的回调
    if (res.hasUpdate) {
      console.log('有新版本啦！');
    }
  });

  updateManager.onUpdateReady(() => {
    wx.showModal({
      title: '更新提示',
      content: '有新版本啦！立即更新',
      showCancel: false,
      success(res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      },
    });
  });

  updateManager.onUpdateFailed(() => {
    // 新的版本下载失败
  });
};

export default {
  WIN_WIDTH: res.screenWidth,
  WIN_HEIGHT: res.screenHeight,
  IS_IOS: /ios/i.test(res.system),
  IS_ANDROID: /android/i.test(res.system),
  IS_IPX: /iphone x/i.test(res.model),
  STATUS_BAR_HEIGHT: res.statusBarHeight,
  DEFAULT_HEADER_HEIGHT: 46, // res.screenHeight - res.windowHeight - res.statusBarHeight
  DEFAULT_CONTENT_HEIGHT: res.screenHeight - res.statusBarHeight - wx.SNS_DEFAULT_HEADER_HEIGHT,
};
