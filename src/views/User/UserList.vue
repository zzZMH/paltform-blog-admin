<template>
  <div class="userList">
    <el-card shadow="never">
      <el-form :model="userSearchForm" ref="userSearchForm" label-width="40%" size="small">
        <el-row>
          <el-col :span="6">
            <el-form-item label="用户登录名：">
              <el-input v-model="userSearchForm.mimian"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户姓名：">
              <el-input v-model="userSearchForm.mimian"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户状态：">
              <el-input v-model="userSearchForm.mimian"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="text-align: center;">
            <el-button size="small">清空</el-button>
            <el-button size="small" type="primary">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <br>
    <el-table :data="tableData" border>
      <el-table-column prop="date" label="日期" min-width="5%" header-align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" min-width="10%" header-align="center"></el-table-column>
      <el-table-column prop="address" label="地址" min-width="5%" header-align="center"></el-table-column>
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
export default {
  data () {
    return {
      userSearchForm: {
        mimian: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>
