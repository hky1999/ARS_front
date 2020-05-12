<template>
  <div>
  <Button type="primary" @click="modalVisible = true" style="margin-top: 10px;">新增用户</Button>
  <Modal
    v-model="modalVisible"
    title="新增用户">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.password_confirm" type="password"></el-input>
      </el-form-item>
      <el-form-item label="身份">
        <el-radio-group v-model="form.status">
          <el-radio label="学生" name="status"></el-radio>
          <el-radio label="教师" name="status"></el-radio>
          <el-radio label="管理员" name="status"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <!--<el-form-item>-->
        <!--<el-button type="primary" @click="onSubmit">立即添加</el-button>-->
        <!--<el-button>取消</el-button>-->
      <!--</el-form-item>-->
    </el-form>
    <div slot="footer" style="margin-left: 340px;bottom: 12px;background: white">
      <Button type="primary" size="large" @click='onSubmit'>
        提交
      </Button>
    </div>
  </Modal>
  </div>
</template>

<script>/* eslint-disable */
  import qs from 'qs';
  import { addUserIntoDB } from '@/api/user'
    export default {
      name: "testPage.vue",
      data () {
        return {
          modalVisible: false,
          form: {
            name: '',
            username:'',
            password: '',
            password_confirm: '',
            status: '',
            phone: '',
            email: ''
          }
        }
      },
      computed: {
        content () {
          return this.$t('content')
        }
      },
      methods: {
        onSubmit() {
          console.log(this.form);
          switch (this.form.status) {
            case "学生":
              this.form.status = 0;
              break;
            case "教师":
              this.form.status = 1;
              break;
            default:
              this.form.status = 2;
              break;
          }
          console.log(this.form);
          let submit = qs.stringify(this.form);
          addUserIntoDB(submit).then(res => {
              console.log(res.data);
              if(res.data.flag){
                this.$Notice.success({title:'用户添加成功'});
                this.$refs['form'].resetFields();
                this.modalVisible=false;
              }
              else{
                this.$Notice.error({title:'用户添加失败,'+res.data.msg});
              }
          }
          )
        }
      }
    }
</script>

<style scoped>

</style>
