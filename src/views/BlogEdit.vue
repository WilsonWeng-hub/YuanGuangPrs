<template>
  <div>
    <Header></Header>
    <div class="m-content">
      <el-form ref="contentFormRef" :model="contentForm" label-width="80px" :rules="contentFormRules">
        <el-form-item label="标题" prop='title'>
          <el-input v-model="contentForm.title"></el-input>
        </el-form-item>

        <el-form-item label="摘要"  prop='description'>
          <el-input type="textarea" v-model="contentForm.description"></el-input>
        </el-form-item>


        <el-form-item label="内容"  prop='content'>
          <mavon-editor v-model="contentForm.content"></mavon-editor>
        </el-form-item>

        <el-form-item >
         <el-button type="primary" @click="submitForm('contentFormRef')">立即创建</el-button>
         <el-button @click="resetForm('contentFormRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
export default {
  name:"BlogEdit",
  components:{
    Header
  },
  data() {
    return {
      contentForm: {
        id:'',
        title: '',
        description: '',
        content: ''
      },
      contentFormRules:{
        title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请输入摘要', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this;
          this.$axios.post("/blog/edit", this.contentForm,{
            headers:{
              'Authorization':localStorage.getItem("token")
            }
          }).then(res => {
            // console.log(res)
            _this.$alert('操作成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.$router.push("/blogs")
              }
            });
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
  },
  created() {
      const blogId = this.$route.params.blogId;
      const _this = this;
      this.$axios.get("/blog/" + blogId).then(res => {
        _this.contentForm.title = res.data.data.title
        _this.contentForm.description = res.data.data.description
        _this.contentForm.content = res.data.data.content
        _this.contentForm.id = res.data.data.id
      })

    },
}
</script>

<style scope>
.m-content{
  text-align: center;
}
</style>