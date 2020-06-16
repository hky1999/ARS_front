<template xmlns:word-break="http://www.w3.org/1999/xhtml">
  <div>
    <Card>
      <Modal
        v-model="modalVisible"
        title="帖子信息"
        width="900px">
        <el-form ref="form1" :model="pInfo" label-width="80px">
          <el-form-item label="题目:">
            <span style = "word-break:break-all">{{pInfo.postTitle}}</span>
          </el-form-item>
          <el-form-item label="发布者:">
            <span style = "word-break:break-all">{{pStarterName}}</span>
          </el-form-item>
          <el-form-item label="发帖时间:">
            <span style = "word-break:break-all">{{pInfo.postTime}}</span>
          </el-form-item>
          <el-form-item label="评价数:">
            <span style = "word-break:break-all">{{pInfo.commentNum}}</span>
          </el-form-item>
          <el-form-item label="内容:">
            <span style = "word-break:break-all">{{pInfo.content}}</span>
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
        v-model="modalVisible_delete"
        width="900px"
        title="请确认删除的帖子信息">
        <el-form ref="form1" :model="pInfo" label-width="80px">
          <el-form-item label="题目:">
            <span style = "word-break:break-all">{{pInfo.postTitle}}</span>
          </el-form-item>
          <el-form-item label="发布者:">
            <span style = "word-break:break-all">{{pStarterName}}</span>
          </el-form-item>
          <el-form-item label="发帖时间:">
            <span style = "word-break:break-all">{{pInfo.postTime}}</span>
          </el-form-item>
          <el-form-item label="评价数:">
            <span style = "word-break:break-all">{{pInfo.commentNum}}</span>
          </el-form-item>
          <el-form-item label="内容:">
            <span style = "word-break:break-all">{{pInfo.content}}</span>
          </el-form-item>
        </el-form>
        <div slot="footer" style="display:flex; margin-left: 700px;bottom: 12px;background: white">
          <Button type="warning" size="large" @click="deletePost">
            确认删除
          </Button>
          <Button type="primary" size="large" @click="modalVisible_delete=false">
            关闭
          </Button>
        </div>
      </Modal>
      <Modal
        v-model="modalVisible_comment"
        title="评价"
        width = 1200px>
        <tables ref="tables" editable searchable search-place="top" v-model="commentData" :columns="comment_columns"/>
        <div slot="footer" style="display:flex; margin-left: 420px;bottom: 12px;background: white">
          <Button type="primary" size="large" @click="modalVisible_comment=false">
            关闭
          </Button>
        </div>
      </Modal>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"/>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>
  </div>
</template>

<script>/* eslint-disable */
import qs from 'qs';
import Tables from '_c/tables'
import { getAllPost } from '@/api/post'
import { getPostByPid } from '@/api/post'
import { deletePostByPid } from '@/api/post'
import { deletePostCommentByPcid } from '@/api/post'
export default {
  name: 'post_tables_page',
  components: {
    Tables
  },
  data () {
    return {
      modalVisible: false,
      modalVisible_delete: false,
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
          width: 150,
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
                h('Button', {
                  props: {
                    type: 'error',
                  },
                  on: {
                    click : () => {
                      this.confirmDelete(params.index)
                    }
                  }
                }, '删除'),
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
        { title: '评价时间', key: 'pcTime', width: 110, },
        {
          title: '操作',
          key: 'handle',
          width: 100,
          button: [
            (h, params, vm) => {
              return h('div',[
                h('Poptip', {
                    props: {
                      confirm: true,
                      type: 'error',
                      title: '你确定要删除此评论吗?'
                    },
                    on: {
                      'on-ok': () => {
                        this.deletePostComment(params.index)
                      }
                    }
                  }, [h('Button', '删除')],)
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
      pDeleteIndex: ''
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
    confirmDelete(index){
      let pid_ = qs.stringify({postId: this.tableData[index].pid});
      getPostByPid(pid_).then(res => {
          console.log(res.data.post);
          this.pInfo = res.data.post;
          this.pStarterName = res.data.username;
          this.commentData = res.data.postComments;
        }
      );
      this.pDeleteIndex = index;
      this.modalVisible_delete = true;
    },
    handleDelete (params) {
      console.log(params)
    },
    deletePost(){
      let submit = qs.stringify({postId:this.tableData[this.pDeleteIndex].pid});
      deletePostByPid(submit).then(res => {
          console.log(res.data);
          if (res.data.flag) {
            this.$Notice.success({title: '帖子删除成功'});
            this.flashTable();
            this.modalVisible_delete = false;
          } else {
            this.$Notice.error({title: '帖子删除失败,' + res.data.msg});
          }
        }
      )
    },
    deletePostComment(index){
      let submit = qs.stringify({pcId:this.commentData[index].pcid});
      deletePostCommentByPcid(submit).then(res => {
          console.log(res.data);
          if (res.data.flag) {
            this.$Notice.success({title: '评论删除成功'});
            this.flashTable();
            let pid_ = qs.stringify({postId: this.pInfo.pid});
            // 刷新评论内容
            getPostByPid(pid_).then(res => {
                console.log(res.data.post);
                this.pInfo = res.data.post;
                this.pStarterName = res.data.username;
                this.commentData = res.data.postComments;
              }
            );
          } else {
            this.$Notice.error({title: '评论删除失败,' + res.data.msg});
          }
        }
      )
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
