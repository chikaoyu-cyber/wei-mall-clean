/* 微商城 —— 全站顶栏登录态（零依赖，静态页 / Vue 页通用）
   读 sessionStorage 中的 user-info，渲染「欢迎您，用户名 | 退出登录」或「请登录」。
   用 DOM API 拼装，不拼接 HTML 字符串，避免用户名里的特殊字符造成注入。 */
(function () {
  function render() {
    var slots = document.querySelectorAll(".auth-slot");
    if (!slots.length) return;
    var user = null;
    try { user = JSON.parse(sessionStorage.getItem("user-info") || "null"); } catch (e) { user = null; }
    var name = user && (user.username || user.name || user.nickName) || "";

    Array.prototype.forEach.call(slots, function (slot) {
      slot.textContent = "";
      if (name) {
        var hello = document.createElement("span");
        hello.textContent = "欢迎您，";
        var strong = document.createElement("b");
        strong.className = "auth-name";
        strong.textContent = name;
        var sep = document.createElement("span");
        sep.className = "auth-sep";
        sep.textContent = "|";
        var out = document.createElement("button");
        out.type = "button";
        out.className = "auth-out";
        out.textContent = "退出登录";
        out.onclick = function () {
          sessionStorage.removeItem("user-info");
          sessionStorage.removeItem("token");
          location.reload();
        };
        slot.appendChild(hello);
        slot.appendChild(strong);
        slot.appendChild(sep);
        slot.appendChild(out);
      } else {
        var login = document.createElement("a");
        login.className = "auth-out";
        login.href = "/login.html";
        login.textContent = "请登录";
        slot.appendChild(login);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
