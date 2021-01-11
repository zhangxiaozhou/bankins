<template>
  <div>
    <!--flex弹性盒子模型，justify-content：主抽 -->
    <div style="display: flex;justify-content: center;margin-top: 150px">
      <el-card style="width: 400px">
        <div slot="header" class="clearfix">
          <span>登录</span>
        </div>
        <table>
          <tr>
            <td>用户名</td>
            <td>
              <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
            </td>
          </tr>
          <tr>
            <td>密码</td>
            <td>
              <el-input type="password" v-model="user.password" placeholder="请输入密码"
                        @keydown.enter.native="doLogin"></el-input>
              <!-- @keydown.enter.native="doLogin"当按下enter键的时候也会执行doLogin方法-->
            </td>
          </tr>
          <tr>
            <!-- 占两行-->
            <td colspan="2">
              <!-- 点击事件的两种不同的写法v-on:click和 @click-->
              <!--<el-button style="width: 300px" type="primary" v-on:click="doLogin">登录</el-button>-->
              <el-button style="width: 300px" type="primary" @click="doLogin">登录</el-button>
            </td>
          </tr>
        </table>
      </el-card>
    </div>
  </div>
</template>
<script>
import jwtDecode from 'jwt-decode'
import qs from 'qs'

export default {
  //单页面中不支持前面的data:{}方式
  data() {
    return {
      user: {
        username: 'shengbo@tpl.cntaiping.com',
        password: '6:0TvEly'
      }
    }
  },
  methods: {
    showErrLogin(msg){
      this.$alert(msg, '登录失败', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${ action }`
          });
        }
      });
    },
    doLogin() {
      //登录前清理本地sessionStorage中token
      sessionStorage.removeItem("token")

      /* json格式提交： */
      let formData = qs.stringify(this.user);

      this.$http({
        method: "post",
        url: "/login",
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: formData
      }).then((res) => {

        console.log(res);

        if(res.status==200 && res.data.resultCode=='0000'){
          let token = res.data.token;
          sessionStorage.setItem("token", token);

          let userInfo = jwtDecode(token);
          sessionStorage.setItem("user", userInfo.sub);
          console.log(userInfo)

          this.$router.push("/");
        }else {
          this.showErrLogin(res.data.errMsg)
        }
      }).catch((response) => {
        this.showErrLogin('系统错误!')
        Promise.reject(response);
      })
    }
  }
}
</script>
