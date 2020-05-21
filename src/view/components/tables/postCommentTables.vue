<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"/>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>
  </div>
</template>

<script>/* eslint-disable */
  import qs from 'qs';
  import Tables from '_c/tables'
  import { getAllPostComment } from '@/api/post'
  import { deletePostCommentByPcid } from '@/api/post'

  export default {
    name: 'post_comment_tables_page',
    components: {
      Tables
    },
    data () {
      return {
        modalVisible: false,
        columns: [
          { title: '评价ID', key: 'pcid', sortable: true, width: 100, },
          { title: '对应帖子ID', key: 'pid', sortable: true, width: 130, },
          { title: '评价者ID', key: 'uid' , sortable: true, width: 135, },
          { title: '评价内容', key: 'postComment', sortable: true ,width: 250,},
          { title: '评价时间', key: 'pcTime', width: 110, },
          { title: '点赞数', key: 'likeNum' , sortable: true, width: 125, },
          { title: '评价数', key: 'commentNum' , sortable: true, width: 125, },
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
        tableData: [],
      }
    },
    methods: {
      flashTable(){
        getAllPostComment().then(res => {
          console.log(res.data.postCommentList);
          this.tableData = res.data.postCommentList;

        })
      },
      deletePostComment(index){
        let submit = qs.stringify({pcId:this.tableData[index].pcid});
        deletePostCommentByPcid(submit).then(res => {
            console.log(res.data);
            if (res.data.flag) {
              this.$Notice.success({title: '评论删除成功'});
              this.flashTable();
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
      },
    },
    mounted () {
      getAllPostComment().then(res => {
        console.log(res.data.postCommentList);
        this.tableData = res.data.postCommentList;

      })
    }
  }
</script>

<style>

</style>
