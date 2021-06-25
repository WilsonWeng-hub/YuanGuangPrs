<template>
  <div>
    <el-container>
      <el-header>
        <img src="../assets/logo.png" class="Login-logo">
      </el-header>
      <el-main>
        <el-form ref="LoginForm" :model="LoginForm" label-width="80px" :rules="rules" class="Login-form">

          <el-form-item label="用户名" prop="username">
            <el-input v-model="LoginForm.username"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="LoginForm.password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('LoginForm')">登录</el-button></el-button>
            <el-button @click="resetForm('LoginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>

  </div>
</template>

<script>
export default {
  name:"Login.vue",
  data() {
    return {
       LoginForm: {
          username: 'wilson',
          password: '111111'
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' },
            { min: 6, max: 8 , message: '长度在 6 到 8 个字符', trigger: 'blur'}
          ],
        }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          this.$axios.post("/login",this.LoginForm).then(res => {
            // console.log(res)
            console.log(res.headers)
            // 获取验证信息，保存到Store
            const token = res.headers['authorization']
            const userInfo = res.data.data;
            console.log('userInfo')

            console.log(userInfo)
            _this.$store.commit("SET_TOKEN",token)
            _this.$store.commit("SET_USERINFO",userInfo)
            _this.$router.push("/blogs")
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scope>
    .el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
   .el-main {
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  .Login-logo {
      width: 50px;
      height: 50px;
      margin-top: 5px;
  }

  .Login-form {
    max-width: 500px;
    margin: 0 auto;
  }
  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>