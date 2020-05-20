<template>
  <div>
    <Card>
      <Modal
        v-model="modalVisible"
        title="活动信息"
        width = "600">
        <el-form ref="form1" :model="aInfo" label-width="80px">
          <el-form-item label="活动名">
            <span>{{aInfo.aname}}</span>
          </el-form-item>
          <el-form-item label="发起者">
            <el-tag type="info">{{aStarterName}}</el-tag>
          </el-form-item>
          <el-form-item label="活动地点">
            <el-tag type="info">{{aInfo.place}}</el-tag>
          </el-form-item>
          <el-form-item label="活动描述">
            <el-tag type="info">{{aInfo.description}}</el-tag>
          </el-form-item>
        </el-form>
        <div slot="footer" style="display:flex; margin-left: 420px;bottom: 12px;background: white">
          <Button type="primary" size="large" @click="modalVisible=false">
            关闭
          </Button>
        </div>
      </Modal>
      <Modal
        v-model="modalVisible_delete"
        title="请确认活动信息，删除将无法恢复"
        width = "600"
        ok-text = "确定删除"
        cancel-text="返回"
        @on-ok="handleDelete"
        loading = true
        @on-cancel="modalVisible_delete=false">
        <el-form ref="form1" :model="aInfo" label-width="80px">
          <el-form-item label="活动名">
            <span>{{aInfo.aname}}</span>
          </el-form-item>
          <el-form-item label="发起者">
            <el-tag type="info">{{aStarterName}}</el-tag>
          </el-form-item>
          <el-form-item label="活动地点">
            <span>{{aInfo.place}}</span>
          </el-form-item>
          <el-form-item label="活动描述">
            <span>{{aInfo.description}}</span>
          </el-form-item>
        </el-form>
      </Modal>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"/>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>
  </div>
</template>

<script>/* eslint-disable */
import qs from 'qs';
import Tables from '_c/tables'
import { getActivityDataofStatus } from '@/api/data'
import { getActivityInfoByAid } from '@/api/activity'
export default {
  name: 'activity_auditing_tables_page',
  components: {
    Tables
  },
  data () {
    return {
      modalVisible: false,
      modalVisible_delete: false,
      columns: [
        { title: '活动ID', key: 'aid', sortable: true, width: 100, },
        { title: '活动名', key: 'aname', sortable: true ,width: 250,},
        { title: '活动发布者ID', key: 'uid', sortable: true, width: 135, },
        { title: '活动类型', key: 'type', sortable: true, width: 120, },
        { title: '活动地点', key: 'place', sortable: true, width: 120, },
        { title: '预计参与人数', key: 'expNum', editable: true, width: 130, },
        { title: '已参与人数', key: 'joinNum',sortable: true, editable: true, width: 130, },
        { title: '申请时间', key: 'buildTime', editable: true, width: 110, },
        { title: '开始时间', key: 'beginTime', editable: true, width: 110, },
        { title: '结束时间', key: 'endTime', editable: true, width: 110, },
        { title: '活动状态', key: 'status', editable: true , width: 100,},
        { title: '审核人id', key: 'auditor', editable: true, width: 100, },
        { title: '审核时间', key: 'checkTime', editable: true, width: 110, },
        {
          title: '操作',
          key: 'handle',
          width: 190,
          button: [
            (h, params) => {
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
                    type: 'warning',
                  },
                  on: {
                    click : () => {
                      this.beforeDelete(params.index)
                    }
                  }
                }, '删除'),
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
      let status = qs.stringify({status: 5});
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
    beforeDelete(index) {
      this.modalVisible_delete = true;
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
    handleDelete (index) {
      this.modalVisible_delete = false;
      this.$Message.info('删除成功');
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted () {
    let status = qs.stringify({status: 5});
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
      })
    })
  }
}
</script>

<style>

</style>
