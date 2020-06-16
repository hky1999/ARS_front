<template>
  <div>
    <Card>
      <Modal
        v-model="modalVisible"
        title="活动信息">
        <el-form ref="form1" :model="aInfo" label-width="80px">
          <el-form-item label="活动名:">
            <span>{{aInfo.aname}}</span>
          </el-form-item>
          <el-form-item label="发起者:">
            <span>{{aStarterName}}</span>
          </el-form-item>
          <el-form-item label="活动地点:">
            <span>{{aInfo.place}}</span>
          </el-form-item>
          <el-form-item label="活动描述:">
            <span>{{aInfo.description}}</span>
          </el-form-item>
        </el-form>
        <div slot="footer" style="display:flex; margin-left: 320px;bottom: 12px;background: white">
          <Button type="primary" size="large" @click="getComment">
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
        width = 1000px>
        <tables ref="tables" editable searchable search-place="top" v-model="commentData" :columns="comment_columns"/>
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
import { getAllActivityData } from '@/api/data'
import { getActivityInfoByAid } from '@/api/activity'
import { getActivityCommentByAid } from '@/api/activity'
import { deleteActivityComment } from '@/api/activity'
export default {
  name: 'activity_tables_page',
  components: {
    Tables
  },
  data () {
    return {
      modalVisible_comment: false,
      modalVisible: false,
      columns: [
        { title: '活动ID', key: 'aid',sortable: true,searchable :false, width: 90, },
        { title: '活动名', key: 'aname', width: 200,},
        { title: '活动发布者ID', key: 'uid', sortable: true, width: 130, },
        { title: '活动类型', key: 'type', width: 120, },
        { title: '活动地点', key: 'place', width: 120, },
        { title: '预计参与人数', key: 'expNum',sortable: true, width: 130, },
        { title: '已参与人数', key: 'joinNum',sortable: true,  width: 130, },
        { title: '申请时间', key: 'buildTime',sortable: true,  width: 110, },
        { title: '开始时间', key: 'beginTime',sortable: true,  width: 110, },
        { title: '结束时间', key: 'endTime',sortable: true, width: 110, },
        { title: '活动状态', key: 'status',width: 100,},
        //{ title: '审核人id', key: 'auditor', width: 100, },
        //{ title: '审核时间', key: 'checkTime', width: 110, },
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
      aInfo:{
        aid: '',
        aname:'',
        uid: '',
        type: '',
        place: '',
        expNum: '',
        joinNum: '',
        beginTime: '',
        endTime: '',
        buildTime:'',
        status:'',
        description:'',
        auditor:'',
        checkTime:''
      },
      aStarterName:'',
      commentData: [],
      comment_columns: [
        { title: '评价ID', key: 'cid', sortable: true, width: 100, },
        { title: '评价者', key: 'uname', sortable: true, width: 135, },
        { title: '评价内容', key: 'comment', sortable: true ,width: 450,},
        { title: '评价时间', key: 'time', width: 150, },
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
                      this.handleCommentDelete(params.index)
                    }
                  }
                }, [h('Button', '删除')],)
              ]);
            }
          ]
        }
      ],
    }
  },
  methods: {
    flashTable(){
      getAllActivityData().then(res => {
        console.log(res.data.activityList);
        this.tableData = res.data.activityList;
        this.tableData.forEach(o => {
          let status_ = "";
          let type_ = "";
          switch (o['status']) {
            case 2:
              status_ = "已批准";
              break;
            case 3:
              status_ = "已拒绝";
              break;
            case 4:
              status_ = "在开展";
              break;
            case 5:
              status_ = "已结束";
              break;
            default:
              status_ = "审核中";
              break;
          }
          o['status'] = status_;
          switch (o['type']) {
            case 10:
              type_ = "博雅-综合";
              break;
            case 11:
              type_ = "博雅-文化艺术";
              break;
            case 12:
              type_ = "博雅-政治经济";
              break;
            case 13:
              type_ = "博雅-人才培养";
              break;
            case 14:
              type_ = "博雅-理工科技";
              break;
            case 20:
              type_ = "学术讲座";
              break;
            case 30:
              type_ = "学生会话";
              break;
            default:
              type_ = "社团活动";
              break;
          }
          o['type'] = type_;
        })
      })
    },
    show(index) {
      this.modalVisible = true;
      let aid_ = qs.stringify({activityId: this.tableData[index].aid});
      getActivityInfoByAid(aid_).then(res => {
          console.log(res.data.activityInfo);
          console.log(res.data.starterName);
          this.aInfo = res.data.activityInfo;
          this.aStarterName = res.data.starterName;
          console.log(this.aInfo);
          console.log(this.aStarterName);
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
    },
    getComment(){
      this.modalVisible_comment = true;
      let aid_ = qs.stringify({activityId: this.aInfo.aid});
      getActivityCommentByAid(aid_).then(res => {
          console.log(res.data.commentList);
          console.log(res.data.nameList);
          this.commentData = res.data.commentList;
          let i = 0;
          this.commentData.forEach(o => {
          o['uname'] = res.data.nameList[i];
          i = i+1;
          })}
      );
    },
    handleCommentDelete(index){
      let submit = qs.stringify({commentId:this.commentData[index].cid});
      deleteActivityComment(submit).then(res => {
          console.log(res.data);
          if (res.data.flag) {
            this.$Notice.success({title: '活动评论删除成功'});
            //this.flashTable();
            let aid_ = qs.stringify({activityId: this.aInfo.aid});
            getActivityInfoByAid(aid_).then(res => {
                console.log(res.data.activityInfo);
                console.log(res.data.starterName);
                this.aInfo = res.data.activityInfo;
                this.aStarterName = res.data.starterName;
                console.log(this.aInfo);
                console.log(this.aStarterName);
              }
            );
            getActivityCommentByAid(aid_).then(res => {
              console.log(res.data.commentList);
              console.log(res.data.nameList);
              this.commentData = res.data.commentList;
              let i = 0;
              this.commentData.forEach(o => {
                o['uname'] = res.data.nameList[i];
                i = i+1;
              })}
            );
          } else {
            this.$Notice.error({title: '活动评论删除失败,' + res.data.msg});
          }
        }
      )
    }
  },
  mounted () {
    getAllActivityData().then(res => {
      console.log(res.data.activityList);
      this.tableData = res.data.activityList;
      this.tableData.forEach(o => {
        let status_ = "";
        switch (o['status']) {
          case 2:
            status_ = "已批准";
            break;
          case 3:
            status_ = "已拒绝";
            break;
          case 4:
            status_ = "在开展";
            break;
          case 5:
            status_ = "已结束";
            break;
          default:
            status_ = "审核中";
            break;
        }
        o['status'] = status_;
        let type_ = "";
        switch (o['type']) {
          case 10:
            type_ = "博雅-综合";
            break;
          case 11:
            type_ = "博雅-文化艺术";
            break;
          case 12:
            type_ = "博雅-政治经济";
            break;
          case 13:
            type_ = "博雅-人才培养";
            break;
          case 14:
            type_ = "博雅-理工科技";
            break;
          case 20:
            type_ = "学术讲座";
            break;
          case 30:
            type_ = "学生会话";
            break;
          default:
            type_ = "社团活动";
            break;
        }
        o['type'] = type_;
      })
    })
  }
}
</script>

<style>

</style>
