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
        <div slot="footer" style="display:flex; margin-left: 420px;bottom: 12px;background: white">
          <Button type="primary" size="large" @click="modalVisible=false">
            关闭
          </Button>
        </div>
      </Modal>
      <Modal
        v-model="modalVisible_1"
        title="请填写驳回理由">
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
          <el-form-item label="驳回理由:">
            <el-input v-model="feedback_reason" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" style="display:flex; margin-left: 350px;bottom: 12px;background: white">
          <Button type="warning" size="large" @click="handleOperate1">
            驳回
          </Button>
          <Button type="primary" size="large" @click="modalVisible_1=false">
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
import { getActivityDataofStatus } from '@/api/data'
import { authorizeActivityByAid } from '@/api/activity'
import { getActivityInfoByAid } from '@/api/activity'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'activity_auditing_tables_page',
  components: {
    Tables
  },
  data () {
    return {
      modalVisible: false,
      modalVisible_1: false,
      feedback_reason: '',
      columns: [
        { title: '活动ID', key: 'aid', sortable: true, width: 90, },
        { title: '活动名', key: 'aname', width: 200,},
        { title: '活动发布者ID', key: 'uid', sortable: true, width: 135, },
        { title: '活动类型', key: 'type',width: 120, },
        { title: '活动地点', key: 'place',width: 120, },
        { title: '预计参与人数', key: 'expNum',sortable: true,  width: 130, },
        { title: '已参与人数', key: 'joinNum',sortable: true, width: 130, },
        { title: '申请时间', key: 'buildTime', sortable: true, width: 110, },
        { title: '开始时间', key: 'beginTime',sortable: true, width: 110, },
        { title: '结束时间', key: 'endTime',sortable: true, width: 110, },
        { title: '活动状态', key: 'status', width: 100,},
        {
          title: '操作',
          key: 'handle',
          width: 210,
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
                h('Poptip', {
                  props: {
                    confirm: true,
                    title: '你确定要批准这个活动?'
                  },
                  on: {
                    'on-ok': () => {
                      this.handleOperate(params.index,true)
                    }
                  }
                }, [h('Button', '批准')],),
                h('Button', {
                  props: {
                    type: 'warning',
                  },
                  on: {
                    click: () => {
                      this.beforeOperate1(params.index)
                    }
                  }
                }, '驳回'),
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
    }
  },
  methods: {
    flashTable(){
      let status = qs.stringify({status: 1});
      getActivityDataofStatus(status).then(res => {
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
      console.log(this.auditorId);
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    },
    handleOperate (index, yesorno) {
      var submit;
      if(yesorno) {
        submit = qs.stringify({activityId: this.tableData[index].aid, auditor: this.auditorId, operation: 'Yes', reason: ''});
      }
      else{
        submit = qs.stringify({activityId: this.tableData[index].aid, auditor: this.auditorId, operation: 'No',reason: ''});
      }
      console.log(submit);
      authorizeActivityByAid(submit).then(res => {
        console.log(res.data);
        if (res.data.flag) {
          this.$Notice.success({title: '操作成功'});
          this.flashTable();
        } else {
          this.$Notice.error({title: '操作失败,' + res.data.msg});
        }
      })
    },
    beforeOperate1(index){
      this.modalVisible_1 = true;
      this.feedback_reason = '';
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
    handleOperate1 () {
      var submit;
      submit = qs.stringify({activityId: this.aInfo.aid, auditor: this.auditorId, operation: 'No',reason: this.feedback_reason});
      console.log(submit);
      authorizeActivityByAid(submit).then(res => {
        console.log(res.data);
        if (res.data.flag) {
          this.$Notice.success({title: '操作成功'});
          this.flashTable();
          this.modalVisible_1 = false;
        } else {
          this.$Notice.error({title: '操作失败,' + res.data.msg});
        }
      })
    },
  },
  computed:{
    ...mapGetters({
      auditorId: 'getuid'
    }),
  },
  mounted () {
    let status = qs.stringify({status: 1});
    getActivityDataofStatus(status).then(res => {
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
