const topApp = {
  template:`
  <div class="top">
    <div class="py-container">
      <div class="shortcut">
        <ul class="fl">
          <li class="f-item">欢迎来到微商城！</li>
          <li class="f-item" v-if="!user">
            <a href="/login.html">请登录</a>
          </li>
          <li class="f-item" v-else>
            欢迎您 <span style="color: #c2185b">{{user.username}}</span>
            <span @click="util.logout()"><a href="#">退出登录</a></span>
          </li>
        </ul>
        <ul class="fr">
          <li class="f-item"><a href="/">首页</a></li>
          <li class="f-item space"></li>
          <li class="f-item"><a href="/search.html">去购物</a></li>
          <li class="f-item space"></li>
          <li class="f-item"><a href="/cart.html">我的购物车</a></li>
        </ul>
      </div>
    </div>
  </div>
  `,
  data(){
    return {
      user: null,
      util
    }
  },
  mounted(){
    this.user = this.util.store.get("user-info")
  },
  methods:{

  },
}

Vue.component("top", topApp);
