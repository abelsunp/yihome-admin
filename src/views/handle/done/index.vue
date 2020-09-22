<template>
  <div class="app-container" v-loading.fullscreen.lock="fullscreenLoading">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="84px">
      <el-form-item label="事项编号" prop="itemName">
        <el-input
          v-model="queryParams.itemName"
          placeholder="请输入事项编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="模块名称" prop="module">
        <el-input
          v-model="queryParams.module"
          placeholder="请输入模块名称 (必须以 uri 一致)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="任务 ID" prop="taskId">
        <el-input
          v-model="queryParams.taskId"
          placeholder="请输入任务 ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="任务名称" prop="taskName">
        <el-input
          v-model="queryParams.taskName"
          placeholder="请输入任务名称 (必须以表单页面名称一致)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      
      <el-form-item label="待办人 ID" prop="todoUserId">
        <el-input
          v-model="queryParams.todoUserId"
          placeholder="请输入待办人 ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="待办人名称" prop="todoUserName">
        <el-input
          v-model="queryParams.todoUserName"
          placeholder="请输入待办人名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="处理人 ID" prop="handleUserId">
        <el-input
          v-model="queryParams.handleUserId"
          placeholder="请输入处理人 ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="处理人名称" prop="handleUserName">
        <el-input
          v-model="queryParams.handleUserName"
          placeholder="请输入处理人名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="通知时间" prop="todoTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.todoTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择通知时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="处理时间" prop="handleTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.handleTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择处理时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    

    <el-table v-loading="loading" :data="itemList">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <!-- <el-table-column label="主键 ID" align="center" prop="id" /> -->
      <!-- <el-table-column label="事项编号" align="center" prop="itemName" />
      <el-table-column label="事项内容" align="center" prop="itemContent" /> -->


      <el-table-column label="事项内容" align="center" prop="itemName" class-name="same-color" fixed />
      <el-table-column label="事项编号" align="center" prop="businessId" />


      <el-table-column label="模块名称" align="center" prop="module" :show-overflow-tooltip="true" />
      <el-table-column label="任务 ID" align="center" prop="taskId" />
      <el-table-column label="任务名称" align="center" prop="taskName" :show-overflow-tooltip="true" />
      
      <el-table-column label="是否查看" align="center" prop="isView">
        <template slot-scope="scope">
          <span v-if="scope.row.isView">否</span>
          <span v-else>是</span>
        </template>
      </el-table-column>
      <el-table-column label="是否处理" align="center" prop="isHandle" >
        <template slot-scope="scope">
          <span>{{ scope.row.isView==0?'否':'是' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="待办人 ID" align="center" prop="todoUserId" :show-overflow-tooltip="true" />
      <el-table-column label="待办人名称" align="center" prop="todoUserName" :show-overflow-tooltip="true" >
        <template slot-scope="scope">
          <span v-for="item in systemUser" :key="item.userId">
            {{scope.row.todoUserName==item.userName?item.nickName:''}}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="处理人 ID" align="center" prop="handleUserId" :show-overflow-tooltip="true" />
      <el-table-column label="处理人名称" align="center" prop="handleUserName" :show-overflow-tooltip="true" >
      <template slot-scope="scope">
          <span v-for="item in systemUser" :key="item.userId">
            {{scope.row.handleUserName==item.userName?item.nickName:''}}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="通知时间" align="center" prop="todoTime" width="180" :show-overflow-tooltip="true" >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.todoTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理时间" align="center" prop="handleTime" width="180" :show-overflow-tooltip="true" >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.handleTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="代办任务名称" align="center" prop="nodeName" class-name="same-color" width="200" fixed="right">
        <template slot-scope="scope">
          <span style="background-color: #1ab394;border-radius: 10px;padding:4px 6px;color:#fff;">{{ scope.row.nodeName }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleEvent(scope.row)"
          >审批</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script>
import { listDoneItem } from "@/api/handle/matter";

import { listUser } from "@/api/system/user"
export default {
  name: "Item",
  components:{
  },
  data() {
    return {
        viewOrderTitle:'',
        fullscreenLoading:false,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 待办事项表格数据
      itemList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        itemName: undefined,
        itemContent: undefined,
        module: undefined,
        taskId: undefined,
        taskName: undefined,
        nodeName: undefined,
        isView: undefined,
        isHandle: undefined,
        todoUserId: undefined,
        todoUserName: undefined,
        handleUserId: undefined,
        handleUserName: undefined,
        todoTime: undefined,
        handleTime: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      systemUser:[],
    };
  },
  created() {
    this.getList();
    listUser().then(res=>{
      this.systemUser = res.rows;
    })
  },
  methods: {
    /** 查询待办事项列表 */
    getList() {
      this.loading = true;
      listDoneItem(this.queryParams).then(response => {
        this.itemList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        itemName: undefined,
        itemContent: undefined,
        module: undefined,
        taskId: undefined,
        taskName: undefined,
        nodeName: undefined,
        isView: undefined,
        isHandle: undefined,
        todoUserId: undefined,
        todoUserName: undefined,
        handleUserId: undefined,
        handleUserName: undefined,
        todoTime: undefined,
        handleTime: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
  }
};
</script>
<style>
.viewOrder .el-drawer__body{
    overflow: auto;
}
</style>