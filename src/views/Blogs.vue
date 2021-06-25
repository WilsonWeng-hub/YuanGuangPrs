<template>
  <div>
    <Header></Header>
    <div class="block">
      <el-timeline>
        <el-timeline-item :timestamp="blog.created" placement="top" v-for="blog in blogs" :key="blog.id">
          <el-card>
            <h4>
              <!-- 标题路由跳转 -->
              <router-link :to="{name :'BlogDetail', params:{blogId:blog.id} }" >
                {{blog.title}}
                </router-link>
            </h4>
            <p>{{blog.description}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <!-- 分页 -->
      <el-pagination class="mpage"
        background
        layout="prev, pager, next"
        :current-page=currentPage
        :page-size=pageSize
        @current-change=page
        :total="total">
    </el-pagination>

      </el-pagination>
    </div>

  </div>
</template>

<script>
import Header from '../components/Header'
export default {
  name:"Blogs",
  components:{
    Header
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      blogs:{}
    }
  },
  created() {
    this.page(1)
  },
  methods: {
    page(currentPage){
      const _this = this
      _this.$axios.get("/blogs?currentPage=" + currentPage).then(res => {
      console.log(res)
      _this.blogs = res.data.data.records
      _this.currentPage = res.data.data.current
      _this.total = res.data.data.total
      _this.pageSize = res.data.data.size
      })
    }
  },
}
</script>

<style scope>
.mpage{
  margin: 0 auto;
  text-align: center;
}
</style>