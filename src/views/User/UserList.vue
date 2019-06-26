<template>
  <div class="userList">
    <el-card shadow="never">
      <el-form :model="userSearchForm" ref="userSearchForm" label-width="40%" size="small">
        <el-row>
          <el-col :span="6">
            <el-form-item label="登录名：">
              <el-input v-model="userSearchForm.mimian"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户名：">
              <el-input v-model="userSearchForm.mimian"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户状态：">
              <el-input v-model="userSearchForm.mimian"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="text-align: center;">
            <el-button size="small" @click="resetUserSearchForm">清空</el-button>
            <el-button size="small" type="primary" @click="searchUserList">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <br>
    <el-table :data="tableData" border>
      <el-table-column prop="userId" label="ID" min-width="28%" header-align="center"></el-table-column>
      <el-table-column prop="loginName" label="登录名" min-width="20%" header-align="center"></el-table-column>
      <el-table-column prop="userName" label="用户名" min-width="20%" header-align="center"></el-table-column>
      <el-table-column prop="lastLoginTime" label="最近登录时间" min-width="20%" header-align="center" align="center"></el-table-column>
      <el-table-column prop="userState" label="用户状态" min-width="7%" header-align="center" align="center"></el-table-column>
      <el-table-column prop="userOperate" label="操作" min-width="5%" header-align="center" align="center"></el-table-column>
    </el-table>
    <br>
    <el-row>
      <el-col :span="24" style="text-align: center;">
        <el-pagination :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400"></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getUserList } from '../../api/index'

export default {
  data () {
    return {
      userSearchForm: {
        mimian: ''
      },
      tableData: []
    }
  },
  created () {
    this.$get(getUserList).then(res => {
      if (res && res.code === '2000') {
        this.tableData = res.data
      }
    })
  },
  methods: {
    resetUserSearchForm () {
      this.userSearchForm.mimian = ''
    },
    searchUserList () {
      console.log(this.$refs['userSearchForm'])
    }
  }
}
</script>
