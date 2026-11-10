// 设置后台服务地址
axios.defaults.baseURL = "/api";
axios.defaults.timeout = 2000;
// request拦截器
axios.interceptors.request.use(
  config => {
    config.headers['authorization'] = sessionStorage.getItem("token")
    return config
  }
)
// 响应拦截器
axios.interceptors.response.use(
  response => response.data,
  err => {
    if (err.response.status === 401) {
      // 认证失败，需要重新登录
	  sessionStorage.removeItem("user-info")
      sessionStorage.removeItem("token")
      location.href = "/login.html";
    }
    return Promise.reject(err)
  }
)
const util = {
  isLogin(){
    return !!sessionStorage.getItem("user-info");
  },
  logout(){
    sessionStorage.removeItem("user-info")
    sessionStorage.removeItem("token")
    location.reload();
  },
  getUrlParam(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    }
    return "";
  },
  formatPrice(val) {
    if (typeof val === 'string') {
      if (isNaN(val)) {
        return null;
      }
      // 价格转为整数
      const index = val.lastIndexOf(".");
      let p = "";
      if (index < 0) {
        // 无小数
        p = val + "00";
      } else if (index === p.length - 2) {
        // 1位小数
        p = val.replace("\.", "") + "0";
      } else {
        // 2位小数
        p = val.replace("\.", "")
      }
      return parseInt(p);
    } else if (typeof val === 'number') {
      if (val == null) {
        return null;
      }
      const s = val + '';
      if (s.length === 0) {
        return "0.00";
      }
      if (s.length === 1) {
        return "0.0" + val;
      }
      if (s.length === 2) {
        return "0." + val;
      }
      const i = s.indexOf(".");
      if (i < 0) {
        return s.substring(0, s.length - 2) + "." + s.substring(s.length - 2)
      }
      const num = s.substring(0, i) + s.substring(i + 1);
      if (i === 1) {
        // 1位整数
        return "0.0" + num;
      }
      if (i === 2) {
        return "0." + num;
      }
      if (i > 2) {
        return num.substring(0, i - 2) + "." + num.substring(i - 2)
      }
    }
  },
  // 本机下单记录：后端只提供「按 id 查订单」，没有列表接口，
  // 因此把本浏览器创建过的订单号存下来，列表页再逐个向后端查真实详情。
  rememberOrder(id) {
    if (!id) return;
    const key = "wm-orders";
    let list = [];
    try { list = JSON.parse(localStorage.getItem(key) || "[]"); } catch (e) { list = []; }
    list = [String(id)].concat(list.filter(x => String(x) !== String(id))).slice(0, 30);
    localStorage.setItem(key, JSON.stringify(list));
  },
  myOrders() {
    try { return JSON.parse(localStorage.getItem("wm-orders") || "[]"); } catch (e) { return []; }
  },
  fmtTime(t) {
    if (!t) return "—";
    const s = String(t).replace("T", " ").replace(/\.\d+$/, "");
    return s.length > 16 ? s.substring(0, 16) : s;
  },
  store: {
    set(key, obj) {
      sessionStorage.setItem(key, JSON.stringify(obj))
    },
    get(key) {
      return JSON.parse(sessionStorage.getItem(key))
    },
    del(key) {
      sessionStorage.removeItem(key)
    }
  }
}
