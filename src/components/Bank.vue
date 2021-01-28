<template>
  <div class="body-bg">
    <el-container class="my-con">
      <el-header height="100"
                 class="my-header">
        <el-row>
          <el-col :span="10">
            <div class="grid-content bg-purple">
              <img :src="logo"
                   class="logo" />
              <h3 class="sys-name">太平人寿银保通系统</h3>
            </div>
          </el-col>
          <el-col :span="6"
                  :offset="8">
            <div style="float: right;margin-top: 5px;width: 170px;"  >
				<span style="margin-right: 25px" class="user-info">{{userName}}，欢迎你</span>
				<span icon="el-icon-switch-button" @click="logout" class="user-info el-icon-switch-button" style="cursor: pointer;">退出</span>
			</div>
	
          </el-col>
        </el-row>
      </el-header>
	
      <el-container>
       <div style="border: solid 0px #e6e6e6; height: 100%;">
        <el-aside width="200px"
                  class="bankins-menu">
          <el-row class="menu">
            <el-col :span="24">
              <el-menu default-active="2"
                       class="el-menu-vertical-demo"
                       router
                       style="border-right:0px;">
                <el-menu-item v-for="menu in menus"
                              :key="menu.path"
                              :index="menu.path"
                              class="menu-font"
                              style="padding: 0px;margin-bottom: 10px;border-radius: 30px;height: 40px;margin: 10px 20px 20px;width: 150px;">
                  <!-- <i class="el-icon-arrow-right"></i> -->
                  <span slot="title" style="position: inherit;top: -8px;">{{menu.name}}</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
		</div>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import logo from "../assets/login-logo.png";

export default {
  name: "Bank",
  data () {
    return {
      logo: logo,
      menus: [],
      userName: ""
    }
  },
  methods:{
    logout(){
		sessionStorage.removeItem("token");
		this.$router.push("/login");
	},
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
  background-color: #3296ff;
  padding: 0 36px;
}

.logo {
  float: left;
  height: 39px;
  width: 117px;
}

.sys-name {
  line-height: 40px;
  font-family: STHeiti;
  color: #ffffff;
  margin-left: 210px;
  padding-left: 170px;
  margin: 10px 0 0 20px;
  font-weight: inherit;
  font-size: 18px;
  width: 180px;
}

.user-info {
  line-height: 50px;
  font-size: 15px;
  color: #fff;
}

.menu {
  height: 100%;
}

.logout-btn{
	cursor: pointer;
}
.body-bg{
	display: flex;
}
.menu-font{
	color: #66b1ff;
	text-align: center;
}
.el-menu-item:hover{
	color: #FFFFFF;
	background: #66b1ff;
}
.is-active{
	color: #FFFFFF;
	background: #66b1ff;
}
.is-active:before{
	content: "●";
	margin-right: 10px;
	position: inherit;
	top: -7px;
}

</style>

