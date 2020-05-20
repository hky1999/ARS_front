<template>
  <div>
    <Card>
      <Modal
        v-model="modalVisible"
        title="帖子信息">
        <el-form ref="form1" :model="pInfo" label-width="80px">
          <el-form-item label="题目">
            <el-tag type="info">{{pInfo.postTitle}}</el-tag>
          </el-form-item>
          <el-form-item label="发布者">
            <el-tag type="info">{{pStarterName}}</el-tag>
          </el-form-item>
          <el-form-item label="发帖时间">
            <el-tag type="info">{{pInfo.postTime}}</el-tag>
          </el-form-item>
          <el-form-item label="评价数">
            <el-tag type="info">{{pInfo.commentNum}}</el-tag>
          </el-form-item>
          <el-form-item label="内容">
            <el-tag type="info">{{pInfo.content}}</el-tag>
          </el-form-item>
        </el-form>
        <div slot="footer" style="display:flex; margin-left: 320px;bottom: 12px;background: white">
          <Button type="primary" size="large" @click="modalVisible_comment=true">
            查看评价
          </Button>
          <Button type="primary" size="large" @click="modalVisible=false">
            关闭
          </Button>
        </div>
      </Modal>
      <Modal
        v-model="modalVisible_comment"
        title="评价"
        width = 1200px>
        <tables ref="tables" editable searchable search-place="top" v-model="commentData" :columns="comment_columns" @on-delete="handleDelete"/>
        <div slot="footer" style="display:flex; margin-left: 420px;bottom: 12px;background: white">
          <Button type="primary" size="large" @click="modalVisible_comment=false">
            关闭
          </Button>
        </div>
      </Modal>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>
  </div>
</template>

<script>/* eslint-disable */
import qs from 'qs';
import Tables from '_c/tables'
import { getAllPost } from '@/api/post'
import { getPostByPid } from '@/api/post'

export default {
  name: 'post_tables_page',
  components: {
    Tables
  },
  data () {
    return {
      modalVisible: false,
      modalVisible_comment: false,
      columns: [
        { title: '帖子ID', key: 'pid', sortable: true, width: 100, },
        { title: '题目', key: 'postTitle', sortable: true ,width: 150,},
        { title: '发布者ID', key: 'uid', sortable: true, width: 120, },
        { title: '版块&主题', key: 'postType', sortable: true, width: 120, },
        { title: '内容', key: 'content', sortable: true, width: 220, },
        { title: '评价数', key: 'commentNum', editable: true, width: 100, },
        { title: '发帖时间', key: 'postTime',sortable: true, editable: true, width: 110, },
        {
          title: '操作',
          key: 'handle',
          width: 100,
          button: [
            (h, params, vm) => {
              return h('div',[
                h('Button', {
                  props: {
                    type: 'primary',
                  },
                  on: {
                    click : () => {
                      this.show(params.index)
                    }
                  }
                }, '查看'),
              ]);
            }
          ]
        }
      ],
      tableData: [],
      commentData: [],
      comment_columns: [
        { title: '评价ID', key: 'pcid', sortable: true, width: 100, },
        { title: '评价者', key: 'childName', sortable: true, width: 135, },
        { title: '被评价者', key: 'fatherName', sortable: true, width: 135, },
        { title: '评价内容', key: 'postComment', sortable: true ,width: 250,},
        { title: '评价时间', key: 'pcTime',sortable: true, editable: true, width: 130, },
        {
          title: '操作',
          key: 'handle',
          button: [
            (h, params, vm) => {
              return h('div',[
                h('Button', {
                  props: {
                    type: 'primary',
                  },
                  on: {
                    click : () => {
                      this.handleDelete()
                    }
                  }
                }, '删除'),
              ]);
            }
          ]
        }
      ],
      pInfo:{
        pid: '',
        uid:'',
        postType: '',
        postTime: '',
        postTitle: '',
        content:'',
        commentNum:'',
      },
      pStarterName: '',
    }
  },
  methods: {
    flashTable(){
      getAllPost().then(res => {
        this.tableData = res.data.postList;
      })
    },
    show(index) {
      this.modalVisible = true;
      let pid_ = qs.stringify({postId: this.tableData[index].pid});
      getPostByPid(pid_).then(res => {
          console.log(res.data.post);
          this.pInfo = res.data.post;
          this.pStarterName = res.data.username;
          this.commentData = res.data.postComments;
        }
      );
    },
    handleDelete (params) {
      console.log(params)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted () {
    getAllPost().then(res => {
      console.log(res.data.postList);
      console.log(res.data.userList);
      this.tableData = res.data.postList;
    })
  }
}
</script>

<style>

</style>
