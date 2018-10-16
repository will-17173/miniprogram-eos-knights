export function formatNumber(n) {
  const str = n.toString();
  return str[1] ? str : `0${str}`;
}

export function formatTime(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const t1 = [year, month, day].map(formatNumber).join('/');
  const t2 = [hour, minute, second].map(formatNumber).join(':');

  return `${t1} ${t2}`;
}

// 时间格式化
export const timeAgo = (secondTime) => {
  const time = new Date(secondTime * 1000);
  const today = new Date();

  const [year, month, date, hour, minute] = [
    time.getFullYear(),
    time.getMonth() + 1,
    time.getDate(),
    time.getHours(),
    time.getMinutes(),
  ].map((value) => {
    if (value < 10) {
      return `0${value}`;
    }

    return value;
  });

  const diffminute = (today.getTime() - secondTime * 1000) / (60 * 1000);

  if (diffminute <= 5) {
    return '刚刚';
  }

  if (year < today.getFullYear()) {
    return `${year}-${month}-${date} ${hour}:${minute}`;
  }

  if (
    time.getDate() === today.getDate() &&
    time.getMonth() === today.getMonth()
  ) {
    return `${hour}:${minute}`;
  }

  if (
    time.getDate() === today.getDate() - 1 &&
    time.getMonth() === today.getMonth()
  ) {
    return `昨日 ${hour}:${minute}`;
  }

  return `${month}-${date} ${hour}:${minute}`;
};

// 显示繁忙提示
export const showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000,
});

// 显示成功提示
export const showSuccess = text => wx.showToast({
  title: text,
  icon: 'success',
});

// 显示失败提示
export const showModal = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false,
  });
};

// 格式化数字
// a.1~1000，显示具体的数字
// b.1000~9999,显示 X.X 千
// c.10000~99999,显示X.X 万
// d.100000以上，显示XX万
// 上万时，小数点后保留一位，且不是整数，显示+
export const formatNumUnit = (n) => {
  let dotted = -1;
  let afterDotted = 0;
  n += 0;
  let addIcon = '';
  if (n >= 100000) {
    addIcon = (n % 10000) ? '+' : '';
    n = `${Math.floor(n / 10000)}w${addIcon}`;
  } else if (n >= 10000) {
    addIcon = (n % 10000) ? '+' : '';
    n = (n / 10000).toString();
    dotted = n.indexOf('.');
    if (dotted) {
      afterDotted = n.substring(dotted + 1, dotted + 2);
      if (afterDotted && +afterDotted !== 0) {
        n = `${n.substring(0, dotted + 2)}w`;
      } else {
        n = `${n.substring(0, dotted)}w`;
      }
    }
    n += addIcon;
  }
  return n;
};

// 模板替换
export const replaceTmpl = (str, options) => {
  for (const key in options) {
    if (options.hasOwnProperty(key)) {
      const value = options[key];
      str = str.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
    }
  }
  return str;
};

// 函数去抖动
export const debounce = (func, wait) => {
  let timer = null;
  return function () {
    const ctx = this;
    const args = arguments;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      func.apply(ctx, args);
    }, wait);
  };
};

export default {
  formatNumber,
  formatTime,
  timeAgo,
  showBusy,
  showSuccess,
  showModal,
  formatNumUnit,
  replaceTmpl,
  debounce,
};
