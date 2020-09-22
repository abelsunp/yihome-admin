<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="84px">
      <el-form-item label="流程KEY：" prop="key">
        <el-input
          v-model="queryParams.key"
          placeholder="请输入流程KEY"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="名称：" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <!-- <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['user:user:add']"
        >新增</el-button> -->

        <el-upload
            class="uploadBpmnfile"
            :action="uploadImgUrl"
            name="processDefinition"
            :on-success="handleAvatarSuccess"
            :on-error="handleAvatarError"
            :before-upload="beforeAvatarUpload"
            :headers="headers">
            <el-button size="small" icon="el-icon-plus" type="primary">点击上传</el-button>
        </el-upload>



      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['user:user:edit']"
        >修改</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['user:user:remove']"
        >删除</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['user:user:export']"
        >导出</el-button>
      </el-col> -->
    </el-row>

    <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="流程ID" align="center" prop="id" :show-overflow-tooltip="true"/>
      <el-table-column label="流程KEY" align="center" prop="key" :show-overflow-tooltip="true"/>
      <el-table-column label="流程名称" align="center" prop="name" :show-overflow-tooltip="true"/>
      <el-table-column label="版本" align="center" prop="version" />
      <el-table-column label="流程描述" align="center" prop="description" :show-overflow-tooltip="true"/>
      <el-table-column label="所属分类" align="center" prop="category" />
      <el-table-column label="部署时间" align="center" prop="deploymentTime" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ parseTime(scope.row.deploymentTime) }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['user:user:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
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
import { listDefinition,definitionUpload,definitionDel } from '@/api/process/definition';
import { getToken } from '@/utils/auth'
export default {
  name: "Definition",
  data() {
    return {
      uploadImgUrl: process.env.VUE_APP_BASE_API + '/process/definition/upload',
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
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
      // 【请填写功能名称】表格数据
      userList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        key:undefined,
        name:undefined,
      },
      
    };
  },
  created() {
    this.getList();
  },
  methods: {
    beforeAvatarUpload(file){
        const str = file.name.substring(file.name.lastIndexOf("\.") + 1, file.name.length)=="bpmn";

        if(!str){
            this.$message({  message: '请上传bpmn文件', type: 'warning' });
        }

        return str;
    },
    handleAvatarSuccess(res, file){
        console.log(res);
        if(res.code===200){
            this.msgSuccess('上传成功')
            this.getList();
        }else{
            this.msgError(res.msg)
        }
    },
    handleAvatarError(res){
        console.log(res)
        this.msgError('上传失败')
    },
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listDefinition(this.queryParams).then(response => {
        this.userList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
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
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.deploymentId)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
        
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      
    },
    
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.deploymentId || this.ids;
      this.$confirm('是否确认删除流程ID为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return definitionDel({ids:ids});
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有流程用户数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportUser(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
<style>
.uploadBpmnfile .el-upload-list{
    display: none;
}
</style>