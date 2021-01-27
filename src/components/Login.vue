<template>
  <div class="login-container">
    <div class="login-background"
         :style="backgroundStyle">
    </div>
    <img :src="logo"
         class="logo" />
    <!--flex弹性盒子模型，justify-content：主抽 -->
    <div class="login-form">
      <div style="width: 100%;display: flex;justify-content: center;">
        <div class="login-form-title">
          <span>太平人寿银保通系统</span>
        </div>
      </div>
      <el-card style="width: 375px ;border-radius: 15px;padding-top: 50px;font-size:14px;display: flex;justify-content: center;">

        <table style="border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #419bff;">
            <td style="color:#419bff;">用户名</td>
            <td>
              <input v-model="user.username"
                     class="login-input"
                     placeholder="请输入用户名" />
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #419bff;">
            <td style="color:#419bff">密码</td>
            <td>
              <input type="password"
                     class="login-input"
                     v-model="user.password"
                     placeholder="请输入密码"
                     @keydown.enter="doLogin" />
              <!-- @keydown.enter.native="doLogin"当按下enter键的时候也会执行doLogin方法-->
            </td>
          </tr>
          <tr>
            <!-- 占两行-->
            <td colspan="2"
                width="300px"
                style="padding-top: 60px;padding-bottom: 10px;"
                align="center"
                valign="middle">
              <!-- 点击事件的两种不同的写法v-on:click和 @click-->
              <!--<el-button style="width: 300px" type="primary" v-on:click="doLogin">登录</el-button>-->
              <el-button class="login-btn"
                         @click="doLogin">登录</el-button>
            </td>
          </tr>
        </table>
      </el-card>
    </div>
    <div style="text-align: center; font-size: 12px;position: absolute;width: 100%;">
      <span class="footer">版权所有 © 2001-2021中国太平保险集团有限责任公司</span>
    </div>
  </div>
</template>
<script>
import jwtDecode from 'jwt-decode'
import qs from 'qs'
import logo from "../assets/login-logo.png";
import backgroundImage from "../assets/background.png";
export default {
  //单页面中不支持前面的data:{}方式
  data () {
    return {
      logo,
      backgroundStyle: {
        background: "url(" + backgroundImage + ") no-repeat",
        "-o-background-size": "cover",
        "background-size": "cover",
        "background-position": "center"
      },
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    showErrLogin (msg) {
      this.$alert(msg, '登录失败', {
        confirmButtonText: '确定',
        /*callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          });
        }*/
      });
    },
    doLogin () {
      if (this.user.username === '') {
        this.showErrLogin('请输入用户名')
        return false
      }
      if (this.user.password === '') {
        this.showErrLogin('请输入密码')
        return false
      }
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

        if (res.status == 200 && res.data.resultCode == '0000') {
          let token = res.data.token;
          sessionStorage.setItem("token", token);

          let userInfo = jwtDecode(token);
          sessionStorage.setItem("user", userInfo.sub);
          sessionStorage.setItem("userName", userInfo.realName);
          console.log(userInfo)

          this.$router.push("/");
        } else {
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
<style scoped>
.login-container {
  height: 100%;
  width: 100%;
}
.login-container .footer {
  color: #fff;
  position: fixed;
  bottom: 15px;
  padding-top: 55px;
  margin-left: -140px;
}
.login-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.login-form {
  position: fixed;
  left: 50%;
  top: 50%;
  margin-top: -125px;
  margin-left: 200px;
  /*display: flex;*/
  justify-content: center;
}
.login-form-title {
  position: absolute;
  text-align: center;
  background: linear-gradient(135deg, transparent 30px, #419bff 0) top left,
    linear-gradient(-135deg, transparent 30px, #419bff 0) top right,
    linear-gradient(-45deg, transparent 30px, #419bff 0) bottom right,
    linear-gradient(45deg, transparent 30px, #419bff 0) bottom left;
  background-size: 50% 50%;
  background-repeat: no-repeat;
  color: #ffffff;
  height: 40px;
  width: 300px;
  padding-top: 10px;
  font-size: 20px;
  margin-top: -25px;
}
.logo {
  width: 200px;
  margin: 40px 0 0 40px;
  pointer-events: auto;
}
.login-input {
  border-radius: 4px;
  border: 0px;
  box-sizing: border-box;
  color: #606266;
  background-color: #ffffff;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}

.login-btn {
  width: 120px;
  background-color: orange;
  color: #ffffff;
  font-size: 16px;
  border-radius: 25px;
}
</style>
