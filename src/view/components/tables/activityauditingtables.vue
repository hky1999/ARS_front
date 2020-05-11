<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>
  </div>
</template>

<script>/* eslint-disable */
import qs from 'qs';
import Tables from '_c/tables'
import { getActivityDataofStatus } from '@/api/data'
export default {
  name: 'activity_auditing_tables_page',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        { title: '活动ID', key: 'aid', sortable: true },
        { title: '活动名', key: 'aname', sortable: true },
        { title: '活动发布者ID', key: 'uid', sortable: true },
        { title: '活动类型', key: 'type', sortable: true },
        { title: '活动地点', key: 'place', sortable: true },
        { title: '预计参与人数', key: 'expNum', editable: true },
        { title: '已参与人数', key: 'joinNum', editable: true },
        { title: '活动申请时间', key: 'buildTime', editable: true },
        { title: '活动开始时间', key: 'beginTime', editable: true },
        { title: '活动结束时间', key: 'endTime', editable: true },
        { title: '活动状态', key: 'status', editable: true },
        { title: '审核人id', key: 'auditor', editable: true },
        { title: '审核时间', key: 'checkTime', editable: true },
        {
          title: 'Handle',
          key: 'handle',
          options: ['delete'],
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '你确定要删除吗?'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('on-delete', params)
                    vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                  }
                }
              }, [
                h('Button', '自定义删除')
              ])
            }
          ]
        }
      ],
      tableData: []
    }
  },
  methods: {
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
      })
    })
  }
}
</script>

<style>

</style>
