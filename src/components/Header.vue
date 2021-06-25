<template>
  <div class="m-content">
    <h3> 欢迎来到Wilson的博客</h3>
    <!-- 头像 -->
    <div class="block">
      <el-avatar :size="50" :src="user.avatar"></el-avatar>
      <div> {{this.user.username}}</div>
    </div>
    <div class="mction">
      <span><el-link href="/blogs" type="primary">主页</el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span><el-link href="/blog/add" type="success">发表博客</el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span><el-link v-show="this.hasLogin" type="danger" @click="logout">退出</el-link></span>
      <span><el-link v-show="!this.hasLogin" href="/login"  type="primary">登录</el-link></span>
    </div>
  </div>
</template>

<script>

export default {
  name: "Header",
  data() {
    return {
      user:{
        username: '',
        avatar: ''
      },
      hasLogin: false
    }
  },
  created() {
    // console.log('created')
    console.log(this.$store.getters.getUsers.userName)
    if(this.$store.getters.getUsers.userName){
    this.user.username =  (this.$store.getters.getUsers.userName)
      this.user.avatar = this.$store.getters.getUsers.avatar
      this.hasLogin = true
    }
  },
  methods: {
// 清空session，跳转到登录页面
    logout(){
      const _this = this
      _this.$axios.get("/logout",{
        headers:{
          'Authorization':localStorage.getItem("token")
        }
      }).then(res => {
        // console.log(res)
          _this.$store.commit("REMOVE_INFO")
          _this.$router.push("/login")
          this.hasLogin = false
      })
    }
  },
}
</script>

<style scope>
.m-content{
  margin:  0 auto;
  max-width: 960px;
  text-align: center;
}
.mction{
  margin: 10px 0;
}
</style>