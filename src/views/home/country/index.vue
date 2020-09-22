<template>
  <div class="app-container">
    <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="英文简称" prop="shortName">
        <el-input
          v-model="queryParams.shortName"
          placeholder="请输入英文简称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="中文名称" prop="nameZh">
        <el-input
          v-model="queryParams.nameZh"
          placeholder="请输入中文名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="英文名称" prop="nameEn">
        <el-input
          v-model="queryParams.nameEn"
          placeholder="请输入英文名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="货币类型" prop="currencyType">
        <el-select v-model="queryParams.currencyType" placeholder="请选择货币类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="货币符号" prop="currencySymbol">
        <el-input
          v-model="queryParams.currencySymbol"
          placeholder="请输入货币符号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="汇率" prop="exchange">
        <el-input
          v-model="queryParams.exchange"
          placeholder="请输入汇率"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="small">
          <el-option label="上架" value="1" />
          <el-option label="下架" value="2" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="货币类型英文" prop="currencyTypeEn">
        <el-input
          v-model="queryParams.currencyTypeEn"
          placeholder="请输入货币类型英文"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="未知 保留" prop="changecoe">
        <el-input
          v-model="queryParams.changecoe"
          placeholder="请输入未知 保留"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="未知 保留" prop="ennamea">
        <el-input
          v-model="queryParams.ennamea"
          placeholder="请输入未知 保留"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="未知 保留" prop="ennameb">
        <el-input
          v-model="queryParams.ennameb"
          placeholder="请输入未知 保留"
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
          v-hasPermi="['home:country:add']"
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['home:country:edit']"
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['home:country:remove']"
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete(countryList)"
        >删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          v-hasPermi="['home:country:export']"
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col> -->
    </el-row>

    <el-table v-loading="loading" :data="countryList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="编号" align="center" prop="id" /> -->
      <el-table-column label="英文简称" align="center" prop="shortName" />
      <el-table-column label="中文名称" align="center" prop="nameZh" />
      <el-table-column label="英文名称" align="center" prop="nameEn" />
      <el-table-column label="货币类型" align="center" prop="currencyType" />
      <el-table-column label="货币符号" align="center" prop="currencySymbol" />
      <el-table-column label="汇率" align="center" prop="exchange" />
      <el-table-column label="租金计算单位" align="center" prop="unit" >
        <template slot-scope="scope">
          <span v-if="scope.row.unit==1">天</span>
          <span v-if="scope.row.unit==2">周</span>
          <span v-else>月</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <span v-if="scope.row.status==1" style="color: #13ce66;">上架</span>
          <span v-else style="color: #ff4949;">下架</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="货币类型英文" align="center" prop="currencyTypeEn" /> -->
      <!-- <el-table-column label="未知 保留" align="center" prop="changecoe" />
      <el-table-column label="未知 保留" align="center" prop="ennamea" />
      <el-table-column label="未知 保留" align="center" prop="ennameb" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['home:country:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-hasPermi="['home:country:remove']"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
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

    <!-- 添加或修改国家对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">
        <el-form-item label="英文简称" prop="shortName">
          <el-input v-model="form.shortName" placeholder="请输入英文简称" />
        </el-form-item>
        <el-form-item label="中文名称" prop="nameZh">
          <el-input v-model="form.nameZh" placeholder="请输入中文名称" />
        </el-form-item>
        <el-form-item label="英文名称" prop="nameEn">
          <el-input v-model="form.nameEn" placeholder="请输入英文名称" />
        </el-form-item>
        <el-form-item label="货币符号" prop="currencySymbol">
          <el-input v-model="form.currencySymbol" placeholder="请输入货币符号" />
        </el-form-item>
        <el-form-item label="货币类型" prop="currencyType">
          <el-select v-model="form.currencyType" placeholder="请选择货币类型">
            <el-option
              v-for="item in currencyTypeData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        
        <!-- <el-form-item label="汇率" prop="exchange">
          <el-input v-model="form.exchange" placeholder="请输入汇率" />
        </el-form-item> -->
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="上架" value="1" />
            <el-option label="下架" value="2" />
          </el-select>
        </el-form-item>

        <el-form-item label="租金计算单位" prop="unit">
          <el-select v-model="form.unit" placeholder="请选择租金计算单位">
            <el-option label="天" value="1" />
            <el-option label="周" value="2" />
            <el-option label="月" value="3" />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="货币类型英文" prop="currencyTypeEn">
          <el-input v-model="form.currencyTypeEn" placeholder="请输入货币类型英文" />
        </el-form-item> -->
        <!-- <el-form-item label="未知 保留" prop="changecoe">
          <el-input v-model="form.changecoe" placeholder="请输入未知 保留" />
        </el-form-item>
        <el-form-item label="未知 保留" prop="ennamea">
          <el-input v-model="form.ennamea" placeholder="请输入未知 保留" />
        </el-form-item>
        <el-form-item label="未知 保留" prop="ennameb">
          <el-input v-model="form.ennameb" placeholder="请输入未知 保留" />
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
import { listCountry, getCountry, delCountry, addCountry, updateCountry, exportCountry } from '@/api/home/country'

export default {
  name: 'Country',
  data() {
    return {
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
      // 国家表格数据
      countryList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        shortName: undefined,
        nameZh: undefined,
        nameEn: undefined,
        currencyType: undefined,
        currencySymbol: undefined,
        exchange: undefined,
        status: undefined,
        currencyTypeEn: undefined,
        changecoe: undefined,
        ennamea: undefined,
        ennameb: undefined,
        unit: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        createTime: [
          { required: true, message: '创建时间不能为空', trigger: 'blur' }
        ],
        updateTime: [
          { required: true, message: '修改时间不能为空', trigger: 'blur' }
        ],
        shortName: [
          { required: true, message: '请输入英文简称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度最大20个字符', trigger: 'blur' }
        ],
        nameZh: [
          { required: true, message: '请输入中文名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度最大20个字符', trigger: 'blur' }
        ],
        nameEn: [
          { required: true, message: '请输入英文名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度最大20个字符', trigger: 'blur' }
        ],
        currencyType: [
          { required: true, message: '请选择货币类型', trigger: 'change' }
        ],
        currencySymbol: [
          { required: true, message: '请输入货币符号', trigger: 'blur' },
          { min: 1, max: 5, message: '长度最大5个字符', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        unit: [
          { required: true, message: '请选择租金计算单位', trigger: 'change' }
        ]
      },
      currencyTypeData: [
        { value: '美元', label: '美元' },
        { value: '韩元', label: '韩元' },
        { value: '日元', label: '日元' },
        { value: '港币', label: '港币' },
        { value: '英镑', label: '英镑' },
        { value: '欧元', label: '欧元' },
        { value: '加拿大元', label: '加拿大元' },
        { value: '澳大利亚元', label: '澳大利亚元' }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询国家列表 */
    getList() {
      this.loading = true
      listCountry(this.queryParams).then(response => {
        this.countryList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        shortName: undefined,
        nameZh: undefined,
        nameEn: undefined,
        currencyType: undefined,
        currencySymbol: undefined,
        exchange: undefined,
        status: undefined,
        unit: undefined,
        currencyTypeEn: undefined,
        changecoe: undefined,
        ennamea: undefined,
        ennameb: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      console.log(selection)
      this.ids = selection.map(item => item.nameZh)
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '新增国家或地区'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getCountry(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改国家或地区'
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateCountry(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addCountry(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('新增成功')
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      console.log(this.ids)
      const ids = row.nameZh || this.ids
      this.$confirm('是否确认删除国家中文名称为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delCountry(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(function() {})
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有国家数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportCountry(queryParams)
      }).then(response => {
        this.download(response.msg)
      }).catch(function() {})
    }
  }
}
</script>
