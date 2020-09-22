<template>
  <div class="app-container">
    <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="98px">
      <!-- <el-form-item label="编码" prop="code">
        <el-input
          v-model="queryParams.code"
          placeholder="请输入编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="城市名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入城市名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="城市英文名称" prop="nameEn">
        <el-input
          v-model="queryParams.nameEn"
          placeholder="请输入城市英文名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="所属国家id" prop="countryId">
        <el-input
          v-model="queryParams.countryId"
          placeholder="请输入所属国家id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="所属国家名称" prop="countryId">
        <!-- <el-input
          v-model="queryParams.countryName"
          placeholder="请输入所属国家名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        /> -->

        <el-select v-model="queryParams.countryId" placeholder="请选择国家" clearable size="small">
          <el-option
            v-for="item in countryNameData"
            :key="item.id"
            :label="item.nameZh"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="展示排序" prop="orderNo">
        <el-input
          v-model="queryParams.orderNo"
          placeholder="请输入展示排序"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="热门排序" prop="hot">
        <el-input
          v-model="queryParams.hot"
          placeholder="请输入热门排序"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="图片链接  保留" prop="imgurl">
        <el-input
          v-model="queryParams.imgurl"
          placeholder="请输入图片链接  保留"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="small">
          <el-option label="有效" value="1" />
          <el-option label="无效" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['home:city:add']"
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['home:city:edit']"
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['home:city:remove']"
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          v-hasPermi="['home:city:export']"
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col> -->
    </el-row>

    <el-table ref="table" v-loading="loading" :data="cityList" @selection-change="handleSelectionChange" @row-click="clickRow">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="编号" align="center" prop="id" />
      <el-table-column label="编码" align="center" prop="code" /> -->
      <el-table-column label="城市名称" align="center" prop="name" />
      <el-table-column label="城市英文名称" align="center" prop="nameEn" />
      <!-- <el-table-column label="所属国家id" align="center" prop="countryId" /> -->
      <el-table-column label="所属国家名称" align="center" prop="countryName">
        <template slot-scope="scope">
          <span v-for="item in countryNameData" :key="item.id">
            {{ scope.row.countryId==item.id?item.nameZh:'' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="展示排序" align="center" prop="orderNo">
        <template slot-scope="scope">
          {{ scope.row.orderNo==0?'':scope.row.orderNo }}
        </template>
      </el-table-column>
      <el-table-column label="热门排序" align="center" prop="hot">
        <template slot-scope="scope">
          {{ scope.row.hot==0?'':scope.row.hot }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="图片链接  保留" align="center" prop="imgurl" /> -->
      <el-table-column label="附近地点" align="center">
        <template slot-scope="scope">
          <!-- {{scope.row.id}} -->
          <!-- 当前的城市ID 与地址表里面的cityId 相同则显示地址的名称 -->
          <!-- <span v-for="item in addressData" :key="item.id" style="margin-right: 5px;margin-bottom: 5px;">
            <el-tag v-if="scope.row.id==item.cityId&&item.name!=''" closable @close="handleCloseAddress(scope.row,item)"> {{ item.name }} </el-tag>
          </span>
          <el-button
            size="mini"
            type="text"
            @click="handleAddAddress(scope.row)"
          >新增地点<i class="el-icon-plus el-icon--right" /></el-button> -->

          <el-button type="primary" icon="el-icon-view" size="mini" @click.stop="viewAddress(scope.row)">查看附近地点</el-button>

        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <span v-if="scope.row.status==1" style="color: #13ce66;">有效</span>
          <span v-else style="color: #ff4949;">失效</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['home:city:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-hasPermi="['home:city:remove']"
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

    <!-- 添加或修改城市管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">
        <!-- <el-form-item label="编码" prop="code">
          <el-input v-model="form.code" placeholder="请输入编码" />
        </el-form-item> -->
        <el-form-item label="城市名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入城市名称" />
        </el-form-item>
        <el-form-item label="城市英文名称" prop="nameEn">
          <el-input v-model="form.nameEn" placeholder="请输入城市英文名称" />
        </el-form-item>
        <!-- <el-form-item label="所属国家id" prop="countryId">
          <el-input v-model="form.countryId" placeholder="请输入所属国家id" />
        </el-form-item> -->
        <el-form-item label="所属国家名称" prop="countryName">
          <el-select v-model="form.countryName" placeholder="请输入所属国家名称" @change="selectCountry">
            <el-option
              v-for="item in countryNameData"
              :key="item.id"
              :label="item.nameZh"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="展示排序" prop="orderNo">
          <el-input v-model="form.orderNo" placeholder="请输入展示排序" />
          <!-- <el-input-number v-model="form.orderNo" :min="0" :max="10000" placeholder="请输入展示排序" @change="handleNumberChange" /> -->
        </el-form-item>
        <el-form-item label="热门排序" prop="hot">
          <!-- <el-input-number v-model="form.hot" :min="0" :max="10000" placeholder="请输入展示排序" @change="handleNumberChange2" /> -->
          <el-input v-model="form.hot" placeholder="请输入展示排序" />
        </el-form-item>
        <!-- <el-form-item label="图片链接  保留" prop="imgurl">
          <el-input v-model="form.imgurl" placeholder="请输入图片链接  保留" />
        </el-form-item> -->
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="有效" value="1" />
            <el-option label="无效" value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-drawer
      :title="addressTitle"
      size="650px"
      custom-class="addressContainer"
      :visible.sync="addressOpen"
    >
      <div>
        <el-table v-loading="tableLoading" :data="addressData">
          <el-table-column prop="name" label="地点中文" />
          <el-table-column prop="nameEn" label="地点英文" />
          <el-table-column prop="detail" label="详细地址" />
          <el-table-column label="状态" align="center" prop="status">
            <template slot-scope="scope">
              <p v-if="scope.row.status==1" style="color: #13ce66;">有效</p>
              <p v-else style="color: #ff4949;">失效</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                v-hasPermi="['home:city:edit']"
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleAddressUpdate(scope.row)"
              >修改</el-button>
              <el-button
                v-hasPermi="['home:city:remove']"
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleAddressDelete(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: center;">
          <el-button v-hasPermi="['home:city:add']" style="margin-top: 32px;text-align: right;" type="primary" icon="el-icon-plus" @click="handleAddressAdd">
            新增地点
          </el-button>
        </div>
      </div>
    </el-drawer>

    <el-dialog
      :title="addtitle"
      :visible.sync="addAddressStatus"
      width="500px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="addressForm" :model="addressForm" :rules="addressRules" label-width="80px">
        <el-form-item label="中文地址" prop="name">
          <el-input v-model="addressForm.name" placeholder="请输入中文地址" />
        </el-form-item>
        <el-form-item label="英文地址" prop="nameEn">
          <el-input v-model="addressForm.nameEn" placeholder="请输入英文地址" />
        </el-form-item>
        <el-form-item label="详细地址" prop="detail">
          <el-input v-model="addressForm.detail" placeholder="请输入详细地址" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="addressForm.status" placeholder="请选择状态">
            <el-option label="有效" value="1" />
            <el-option label="失效" value="0" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitAddressForm('addressForm')">确 定</el-button>
        <el-button @click="addressCancel('addressForm')">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { listCity, getCity, delCity, addCity, updateCity, exportCity } from '@/api/home/city'
import { listCountry } from '@/api/home/country'
/* 附近地点方法 */
import { listAddress, getAddress, delAddress, addAddress, updateAddress, exportAddress } from '@/api/home/address'

export default {
  name: 'City',
  data() {
    return {
      addressOpen: false,
      addressTitle: '',
      addtitle: '',
      tableLoading: true,
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
      // 城市管理表格数据
      cityList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      addAddressStatus: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        code: undefined,
        name: undefined,
        nameEn: undefined,
        countryId: undefined,
        countryName: undefined,
        orderNo: undefined,
        hot: undefined,
        imgurl: undefined,
        status: undefined
      },
      // 表单参数
      form: {},
      addressForm: {},
      // 表单校验
      rules: {
        createTime: [
          { required: true, message: '创建时间不能为空', trigger: 'blur' }
        ],
        updateTime: [
          { required: true, message: '修改时间不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入城市名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度最大20个字符', trigger: 'blur' }
        ],
        nameEn: [
          { required: true, message: '请输入城市英文名称名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度最大20个字符', trigger: 'blur' }
        ],
        countryName: [
          { required: true, message: '请选择所属国家', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      },
      addressRules: {
        name: [
          { required: true, message: '请输入中文地址', trigger: 'blur' }
        ],
        nameEn: [
          { required: true, message: '请输入英文地址', trigger: 'blur' }
        ],
        detail: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        status :[
          { required: true, message: '请选择状态', trigger: 'blur' }
        ]
      },
      countryNameData: [],
      addressData: [],
      currentRow: {}// 点击查看附近地点 当前的表格的数据对象
    }
  },
  created() {
    this.getList()
  },
  methods: {
    viewAddress(row) {
      console.log(row, 111)
      const loading = this.$loading({
        lock: true,
        text: '拼命加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      listAddress({ cityId: row.id }).then(res => {
        loading.close()
        this.tableLoading = false
        if (res.code === 200) {
          this.addressOpen = true
          this.addressTitle = row.name + ' / 附近地点'
          this.addressData = res.rows
          /* 当前的城市数据 */
          this.currentRow = row
        } else {
          this.msgError(response.msg)
        }
      })
    },
    clickRow(row) {
      // this.$refs.table.toggleRowSelection(row);
      console.log(row)
      // this.addressOpen = true

      /* listAddress({cityId:row.id}).then(res => {

      }) */
    },

    // 删除当前城市中的地址  (废弃)
    handleCloseAddress(tableItem, item) {
      console.log(tableItem, item)
      this.$confirm('是否删除当前城市名称为<span style="color:#c33">' + tableItem.name + '</span>中附近地点为<span style="color:#c33">' + item.name + '</span>的地址数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }).then(function() {
        return delAddress(item.id)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(function() {})
    },

    handleAddAddress(currentRow) {
      // name: "中文地址"
      // nameEn: "英文地址"
      // detail: "详细地址"
      // cityId: "3"
      // addAddress({}).then(response => {
      //   if (response.code === 200) {
      //     this.msgSuccess("新增成功");
      //     this.getList();
      //   } else {
      //     this.msgError(response.msg);
      //   }
      // });

      console.log(currentRow, '当前的数据')
    },
    // 新增地点
    handleAddressAdd() {
      this.resetForm('addressForm')
      this.addtitle = '新增附近地点'
      this.addressForm = {}
      this.addAddressStatus = true
      this.statusButton = 1
    },
    handleAddressUpdate(row) {
      this.resetForm('addressForm')
      /*  */
      this.addtitle = '修改附近地点'
      /*
        当点击表格中的每一行数据并绑定到更新的form表单  this.addressForm
        因为当前的状态值已经与form表单绑定 当用户点击修改时 此时状态值已经与input绑定  会直接影响table的数据（双向数据绑定）
      */
      /* 通过address中的ID获取当前的详细信息 */
      getAddress(row.id).then(response => {
        console.log(response.data, 888888888888)
        this.addressForm = response.data
        this.addAddressStatus = true

        this.statusButton = 2
      })
    },
    handleAddressDelete(row) {
      this.$confirm('是否删除当前城市名称为<span style="color:#c33">' + this.currentRow.name + '</span>中附近地点为<span style="color:#c33">' + row.name + '</span>的地址数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }).then(function() {
        return delAddress(row.id)
      }).then(() => {
        this.customLoad()

        this.msgSuccess('删除成功')
      }).catch(function() {})
    },
    customLoad() {
      this.tableLoading = true
      listAddress({ cityId: this.currentRow.id }).then(res => {
        this.addressData = res.rows
        this.tableLoading = false
      })
    },
    submitAddressForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 判断是增加还是修改
          if (this.statusButton == 1) {
            addAddress({
              name: this.addressForm.name,
              nameEn: this.addressForm.nameEn,
              detail: this.addressForm.detail,
              status: this.addressForm.status,
              cityId: this.currentRow.id
            }).then(response => {
              this.addAddressStatus = false
              if (response.code === 200) {
                this.msgSuccess('新增成功')
                this.customLoad()
                /* listAddress({ cityId: this.currentRow.id }).then(res => {
                  this.addressData = res.rows;
                }) */
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            updateAddress(this.addressForm).then(response => {
              if (response.code === 200) {
                this.addAddressStatus = false
                this.msgSuccess('修改成功')
                this.customLoad()
                /* listAddress({ cityId: this.currentRow.id }).then(res => {
                  this.addressData = res.rows;
                }) */
              } else {
                this.msgError(response.msg)
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    addressCancel(formName) {
      this.addAddressStatus = false
    },
    /** 查询城市管理列表 */
    getList() {
      this.loading = true
      listCity(this.queryParams).then(response => {
        this.cityList = response.rows
        this.total = response.total
        this.loading = false
      })

      // 国家查询
      listCountry().then(res => {
        this.countryNameData = res.rows
      })

      // 地点查询
      // listAddress().then(res => {
      //   this.addressData = res.rows
      // })
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
        code: undefined,
        name: undefined,
        nameEn: undefined,
        countryId: undefined,
        countryName: undefined,
        orderNo: undefined,
        hot: undefined,
        imgurl: undefined,
        status: undefined,
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
      this.ids = selection.map(item => item.name)
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加城市管理'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getCity(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改城市管理'
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateCity(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addCity(this.form).then(response => {
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
      const ids = row.name || this.ids
      this.$confirm('是否确认删除城市名称为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delCity(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(function() {})
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有城市管理数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportCity(queryParams)
      }).then(response => {
        this.download(response.msg)
      }).catch(function() {})
    },
    selectCountry(item) {
      console.log(item)
      this.form.countryId = item
    }
  }
}
</script>
<style>
  .addressContainer .el-drawer__body{
    overflow: auto;
    padding: 0 12px 48px;
  }
</style>
