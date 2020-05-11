<template>
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
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即添加</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</template>

<script>
/* eslint-disable */
export default {
  name: 'info_page',
  data() {
    return {
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
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
}
</script>
