<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <!-- <el-form-item label="${comment}" prop="rev">
        <el-input
          v-model="queryParams.rev"
          placeholder="请输入${comment}"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="组ID" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入组ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="${comment}" prop="type">
        <el-input
          v-model="queryParams.type"
          placeholder="请输入${comment}"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['user:group:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['user:group:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['user:group:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['user:group:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="groupList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="组ID" align="center" prop="id" />
      <!-- <el-table-column label="${comment}" align="center" prop="rev" /> -->
      <el-table-column label="名称" align="center" prop="name" />
      <!-- <el-table-column label="${comment}" align="center" prop="type" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['user:group:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['user:group:remove']"
          >删除</el-button>
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleCommission(scope.row)"
            v-hasPermi="['user:group:remove']"
          >佣金规则</el-button> -->
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

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="组ID：" prop="id" >
          <el-input v-model="form.id" placeholder="请输入组ID" :disabled="currentSelectStatus" />
        </el-form-item>
        <el-form-item label="名称：" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="用户：" prop="userIds">
            <el-select v-model="form.userIds" placeholder="请选择用户" multiple style="width:100%;">
                <el-option
                    v-for="item in systemUser"
                    :key="item.id"
                    :label="item.first"
                    :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>


    <el-drawer
      title="佣金"
      :visible.sync="viewCommissionStatus"
      custom-class="demo-drawer"
      size="880px">
      <div style="padding:0 16px;">
        <commission-component v-if="viewCommissionStatus" ref="commissionComponent" current-type="3" :current-id="commissionId"  />
      </div>
    </el-drawer>


  </div>
</template>

<script>
import { listGroup, getGroup, delGroup, addGroup, updateGroup, exportGroup } from "@/api/process/group";
import { listProcessUsers } from "@/api/process/process";
import commissionComponent from "@/components/commission";
export default {
  name: "Group",
  components:{
    commissionComponent
  },
  data() {
    return {
      commissionId:undefined,
      viewCommissionStatus:false,
      currentSelectStatus:false,
        systemUser:[],
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
      groupList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        rev: undefined,
        name: undefined,
        type: undefined,
      },
      // 表单参数
      form: {
        id: undefined,
        rev: undefined,
        name: undefined,
        type: undefined,
        userIds: undefined,
      },
      // 表单校验
      rules: {
        id: [
            { required: true, message: '请输入组ID', trigger: 'blur' },
        ],
        name :[
            { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        // userIds: [
        //     { required: true, message: '请选择用户', trigger: 'change' }
        // ],
      },
      status:true,
    };
  },
  created() {
    this.getList();
    listProcessUsers().then(res=>{
        this.systemUser = res.rows
    })
  },
  methods: {
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listGroup(this.queryParams).then(response => {
        this.groupList = response.rows;
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
        name: undefined,
        userIds:[],
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
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.currentSelectStatus = false;
        this.status = true;
      this.reset();
      this.open = true;
      this.title = "添加流程用户组";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.currentSelectStatus = true;
        this.status = false;
      this.reset();
      const id = row.id || this.ids
      getGroup(id).then(response => {
        this.form = response.data.actIdGroup;
        let usersData = []
        response.data.users.forEach(element => {
          if(element.flag){
            usersData.push(element.id)
          }
        });
        this.form.userIds = usersData
        this.open = true;
        this.title = "修改流程用户组";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
            const obj = {};
            obj.id = this.form.id;
            obj.name = this.form.name;

            if(this.form.userIds.length==0){
              obj.userIds = undefined
            }else{
              obj.userIds = this.form.userIds.join(',')
            }



            if (this.status) {
                addGroup(obj).then(response => {
                    if (response.code === 200) {
                        this.msgSuccess("新增成功");
                        this.open = false;
                        this.getList();
                    } else {
                        this.msgError(response.msg);
                    }
                });
            } else {
              
              updateGroup(obj).then(response => {
                  if (response.code === 200) {
                      this.msgSuccess("修改成功");
                      this.open = false;
                      this.getList();
                  } else {
                      this.msgError(response.msg);
                  }
              });
            }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除租ID为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delGroup({ids:ids});
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有【请填写功能名称】数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportGroup(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    },
    handleCommission(row){
      this.viewCommissionStatus = true;
      this.commissionId = row.id;
      setTimeout(()=>{
          this.$refs.commissionComponent.getList();
        },10)
      console.log(row)
    }
  }
};
</script>