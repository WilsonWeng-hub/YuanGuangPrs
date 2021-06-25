<template>
  <div>
    <Header></Header>
    <div class="mblog">
      <h2>{{blog.title}}</h2>
      <el-button type="primary" icon="el-icon-edit" size="mini" :v-show="blogOwner">
          <router-link :to="{name:'BlogEdit', params: {blogId : blog.id} }">
            编辑
          </router-link>
      </el-button>
      <el-divider></el-divider>
      <div v-html="blog.content" class="content markdown-body"></div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import 'github-markdown-css/github-markdown.css' // 然后添加样式markdown-body
export default {
  name:"BlogDetail.vue",
  components:{
    Header
  },
  data() {
    return {
      blog:{
        title: "moren",
        id: '',
        content: 'neirong'
      },
      blogOwner: false
    }
  },
  created() {
    // 获取内容

    const blogId = this.$route.params.blogId;
    const _this = this;
    this.$axios.get("/blog/" + blogId).then(res => {
      console.log('edit', res)
      _this.blog.title = res.data.data.title
      _this.blog.id = res.data.data.id
      // 转换为Mardown格式
      let MardownIt = require("markdown-it")
      let md = new MardownIt()
      let result = md.render(res.data.data.content)
      _this.blog.content = result
      _this.blogOwner = res.data.data.userId === this.$store.getters.getUsers.id ? true : false
      })
    },
}
</script>

<style scope>
.mblog{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 700px;
  padding: 20px 15px;
}

</style>