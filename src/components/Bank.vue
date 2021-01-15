<template>
  <div class="my-con">
    <el-container class="my-con">
      <el-header height="100"
                 class="my-header">
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <img :src="logo"
                   class="logo" />
              <h1 class="sys-name">太平人寿银保通系统</h1>
            </div>
          </el-col>
          <el-col :span="6"
                  :offset="10">
            <div class="user-info">{{userName}}</div>
          </el-col>
        </el-row>
      </el-header>

      <el-container>
        <el-aside width="220px"
                  class="bankins-menu">
          <el-row class="menu">
            <el-col :span="24">
              <el-menu default-active="2"
                       class="el-menu-vertical-demo"
                       router>
                <!-- <el-menu-item index="/realTrans" >
                  <i class="el-icon-arrow-right"></i>
                  <span slot="title">实时交易</span>
                </el-menu-item>
                <el-menu-item index="/trans">
                  <i class="el-icon-arrow-right"></i>
                  <span slot="title">非实时交易</span>
                </el-menu-item>
                <el-menu-item index="/buss">
                  <i class="el-icon-arrow-right"></i>
                  <span slot="title">业务数据查询</span>
                </el-menu-item>
              <el-menu-item index="/code">
                  <i class="el-icon-arrow-right"></i>
                  <span slot="title">产品代码转换</span>
                </el-menu-item>
                <el-menu-item index="/verifyRecord">
                  <i class="el-icon-arrow-right"></i>
                  <span slot="title">日终对账</span>
                </el-menu-item>
                <el-menu-item index="/policyOfService">
                  <i class="el-icon-arrow-right"></i>
                  <span slot="title">保全回传</span>
                </el-menu-item>  -->
                <el-menu-item v-for="menu in menus"
                              :key="menu.path"
                              :index="menu.path">
                  <i class="el-icon-arrow-right"></i>
                  <span slot="title">{{menu.name}}</span>
                </el-menu-item>

              </el-menu>
            </el-col>
          </el-row>
        </el-aside>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import logo from "../assets/logo.png";

export default {
  name: "Bank",
  data () {
    return {
      logo: logo,
      menus: [],
      userName: ""
    }
  },
  mounted () {
    this.userName = sessionStorage.getItem("userName");
    this.$http({
      method: "get",
      url: "/buss-process/api/rolePrimission/v1/rolePrimission"
    }).then((res) => {
      console.log(res.data);
      this.menus = res.data;
    });
  }
};
</script>

<style scoped>
.bankins-menu {
  margin-top: 3px;
  height: 100%;
  border-right: 1px solid #dfe4da;
}

.my-con {
  height: 100%;
}

.my-header {
  background-color: azure;
}

.logo {
  float: left;
}

.sys-name {
  line-height: 50px;
  font-size: 24px;
  color: #00479d;
  margin-left: 210px;
  padding-left: 10px;
  margin: 10px 0 0 20px;
  border-left: 2px solid #00479d;
}

.user-info {
  line-height: 50px;
  font-size: 18px;
  color: #222;
}

.menu {
  height: 100%;
}
</style>

