<template>
  <div>
    <Row :gutter="20">
      <i-col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-pie style="height: 300px;" :value="pieData" text="用户组成"></chart-pie>
        </Card>
      </i-col>
      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-pie style="height: 300px;" :value="pieData_a" text="活动发布情况"></chart-pie>
        </Card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">

    </Row>
  </div>
</template>

<script>/* eslint-disable */
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import {getHomePageData} from "@/api/data";
import Example from './example.vue'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data () {
    return {
      userNum: '',
      user_student: '',
      user_teacher:'',
      user_manager:'',
      activityNum:'',
      activity_auditing:'',
      activity_approved:'',
      activity_rejected:'',
      activity_going: '',
      activity_end:'',
      postNum: '',
      postCommentNum:'',
      inforCardData: [
        { title: '总用户数', icon: 'md-person-add', count: 0, color: '#2d8cf0' },
        { title: '总活动数', icon: 'md-locate', count: 0, color: '#19be6b' },
        { title: '已完成活动数', icon: 'md-locate', count: 0, color: '#be8496' },
        { title: '总发帖数', icon: 'md-help-circle', count: 0, color: '#ff9900' },
        { title: '总评价数', icon: 'md-share', count: 0, color: '#a844ed' },
      ],
      pieData: [
      ],
      pieData_a: [
      ]
    }
  },
  mounted () {
    getHomePageData().then(res => {
      console.log(res.data);
      this.userNum = res.data.userNum;
      this.inforCardData[0].count = res.data.userNum;
      this.inforCardData[1].count = res.data.activityNum;
      this.inforCardData[2].count = res.data.postNum;
      this.inforCardData[3].count = res.data.postCommentNum;
      this.inforCardData[4].count = res.data.activityNumOfStatus[5];
      console.log(res.data.userNumOfStatus[0]);
      // console.log(this.pieData[0].value);
      this.pieData.push({name:'学生',value: res.data.userNumOfStatus[0]});
      this.pieData.push({name:'教师',value: res.data.userNumOfStatus[1]});
      this.pieData.push({name:'管理员',value: res.data.userNumOfStatus[2]});
      this.pieData_a.push({name:'审核中',value: res.data.activityNumOfStatus[1]});
      this.pieData_a.push({name:'未开始',value: res.data.activityNumOfStatus[2]});
      this.pieData_a.push({name:'已拒绝',value: res.data.activityNumOfStatus[3]});
      this.pieData_a.push({name:'开展中',value: res.data.activityNumOfStatus[4]});
    })
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
