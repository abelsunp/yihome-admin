<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="用户ID" prop="id">
        <el-input
          v-model="queryParams.rev"
          placeholder="请输入用户ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="名字" prop="first">
        <el-input
          v-model="queryParams.first"
          placeholder="请输入名字"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="${comment}" prop="last">
        <el-input
          v-model="queryParams.last"
          placeholder="请输入${comment}"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="queryParams.email"
          placeholder="请输入邮箱"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="${comment}" prop="pwd">
        <el-input
          v-model="queryParams.pwd"
          placeholder="请输入${comment}"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="pictureId">
        <el-input
          v-model="queryParams.pictureId"
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
          v-hasPermi="['user:user:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['user:user:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['user:user:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['user:user:export']"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="用户ID" align="center" prop="id" />
      <!-- <el-table-column label="${comment}" align="center" prop="rev" /> -->
      <el-table-column label="用户名称" align="center" prop="first" />
      <!-- <el-table-column label="${comment}" align="center" prop="last" /> -->
      <el-table-column label="邮箱" align="center" prop="email" />
      <!-- <el-table-column label="${comment}" align="center" prop="pwd" /> -->
      <!-- <el-table-column label="${comment}" align="center" prop="pictureId" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['user:user:edit']"
          >修改</el-button>
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

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <!-- <el-form-item label="用户ID：" prop="id">
          <el-input v-model="form.rev" />
        </el-form-item> -->

        <el-form-item label="用户：" prop="id">
            <el-select v-model="form.id" placeholder="请选择用户" style="width:100%;" :disabled="currentSelectStatus" clearable @change="selectIDChange">
                <el-option
                    v-for="item in canSelectUser"
                    :key="item.userId"
                    :label="item.nickName"
                    :value="item.userName">
                </el-option>
            </el-select>
        </el-form-item>
        <!-- <el-form-item label="名字：" prop="first">
          <el-input v-model="form.first" placeholder="请输入名字" clearable/>
        </el-form-item> -->
        
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" clearable/>
        </el-form-item>
        <el-form-item label="用户组：" prop="groupIds">
            <el-select v-model="form.groupIds" placeholder="请选择用户组" multiple style="width:100%;">
                <el-option
                    v-for="item in systemUser"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <!-- <el-form-item label="${comment}" prop="pwd">
          <el-input v-model="form.pwd" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="pictureId">
          <el-input v-model="form.pictureId" placeholder="请输入${comment}" />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listUser, getUser, delUser, addUser, updateUser, exportUser,canSelect } from "@/api/process/process";
import { listGroup } from '@/api/process/group'
export default {
  name: "User",
  data() {
    return {
      currentSelectStatus:false,
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
        rev: undefined,
        first: undefined,
        last: undefined,
        email: undefined,
        pwd: undefined,
        pictureId: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        id:[
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        // first:[
        //   { required: true, message: '请输入名字', trigger: 'blur' },
        // ],
        email:[
          { type: 'email', required: true, message: '请输入邮箱', trigger: 'change' }
        ]
      },
      systemUser:[],
      canSelectUser:[],
      isEdit:false,
    };
  },
  created() {
    this.getList();


    listGroup().then(res=>{
      this.systemUser = res.rows
    })


    canSelect().then(res=>{
      this.canSelectUser = res.rows;
      console.log(res)
    })
  },
  methods: {
    selectIDChange(val){
      console.log(val)
      console.log(this.canSelectUser)
      this.canSelectUser.forEach(el=>{
        if(val==el.userName){
          this.form.first = el.nickName
          return;
        }
      })
    },
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listUser(this.queryParams).then(response => {
        this.userList = response.rows;
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
        rev: undefined,
        first: undefined,
        last: undefined,
        email: undefined,
        pwd: undefined,
        pictureId: undefined,
        groupIds:[]
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
      this.isEdit = false;
      this.currentSelectStatus = false;
      this.reset();
      this.open = true;
      this.title = "添加流程用户";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.isEdit = true;
      this.currentSelectStatus = true;
      this.reset();
      const id = row.id || this.ids
      getUser(id).then(response => {
        this.form = response.data.actIdUser;
        let usersData = []
        response.data.groups.forEach(element => {
          if(element.flag){
            usersData.push(element.id)
          }
        });

        this.form.groupIds = usersData
        
        this.open = true;
        this.title = "修改流程用户";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const obj = {};
            obj.id = this.form.id;
            obj.first = this.form.first;
            obj.email = this.form.email;
            if(this.form.groupIds.length==0){
              obj.groupIds = undefined
            }else{
              obj.groupIds = this.form.groupIds.join(',')
            }
          if (this.isEdit) {
            updateUser(obj).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {

            // id: 4545
            // first: 4545
            // email: 22@qq.com
            // groupIds: ceshi

            addUser(obj).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
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
      this.$confirm('是否确认删除流程用户ID为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delUser({ids:ids});
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