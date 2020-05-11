<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>
  </div>
</template>

<script>/* eslint-disable */
  import Tables from '_c/tables'
  import { getAllUserData } from '@/api/data'
  export default {
    name: 'user_tables_page',
    components: {
      Tables
    },
    data () {
      return {
        columns: [
          { title: '用户ID', key: 'uid', sortable: true },
          { title: '用户名', key: 'username', sortable: true },
          { title: '真实姓名', key: 'name', sortable: true },
          { title: '身份', key: 'status', editable: true },
          { title: '手机号', key: 'phone', editable: true },
          { title: '邮箱', key: 'email', editable: true },
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
      getAllUserData().then(res => {
        console.log(res.data.userList);
        this.tableData = res.data.userList;
        this.tableData.forEach(o => {
          let status_ = "";
          switch (o['status']) {
            case 0:
              status_ = "学生";
              break;
            case 1:
              status_ = "教师";
              break;
            default:
              status_ = "管理员";
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
