<template>
  <div class="app-container houseRoomLabel">
    

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['home:label:add']"
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      
    </el-row>

    <el-collapse v-model="activeNames">
      <el-collapse-item title="房源标签管理" name="1">
        <el-table ref="houseTable" v-loading="houseLabelLoding" highlight-current-row :data="houseLabelList" @selection-change="handleSelectionChange" @row-click="clickHouseRow">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="标签名称" align="center" prop="name" />
          <el-table-column label="标签名称英文" align="center" prop="nameEn" />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                v-hasPermi="['home:label:edit']"
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click.stop="handleUpdate(scope.row)"
              >修改</el-button>
              <!-- <el-button
                v-hasPermi="['home:label:remove']"
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click.stop="handleDelete(scope.row)"
              >删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item title="单间标签管理" name="2">
        <el-table v-loading="roomLabelLoding" :data="roomLabelList" highlight-current-row @selection-change="handleSelectionChange" @row-click="clickHouseRow">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="标签名称" align="center" prop="name" />
          <el-table-column label="标签名称英文" align="center" prop="nameEn" />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                v-hasPermi="['home:label:edit']"
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click.stop="handleUpdate(scope.row)"
              >修改</el-button>
              <!-- <el-button
                v-hasPermi="['home:label:remove']"
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click.stop="handleDelete(scope.row)"
              >删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>

    <el-drawer
      :title="drawerTitle"
      size="650px"
      :visible.sync="drawerStatus"
    >
      <div style="border-top: 1px solid #ccc;">
        <ul class="labelWrapper" style="padding-left: 0;">
          <div v-if="drawerStatus">
            <el-table v-loading="tableLoading" :data="labelDetails">
              <el-table-column prop="name" align="center" label="中文名称" />
              <el-table-column prop="nameEn" align="center" label="英文名称" />
              <el-table-column v-if="viewLabelDetails.type==1" :key="1" prop="iconUrl" align="center" label="标签图片">
                <template slot-scope="scope">
                  <img style="width: 48px;height: 48px;" v-if="scope.row.iconUrl.includes('http://47.100.186.108')" :src="scope.row.iconUrl" alt="">
                  <img v-else style="width: 48px;height: 48px;" :src="serverImgUrl+scope.row.iconUrl" alt="">
                </template>
              </el-table-column>
              <el-table-column v-if="viewLabelDetails.type==2" :key="2" prop="remark" align="center" label="备注中文">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" :content="scope.row.remark" placement="top">
                    <span>{{scope.row.remark}}</span>
                  </el-tooltip>
                </template>

              </el-table-column>
              <el-table-column v-if="viewLabelDetails.type==2" :key="3" prop="remarkEn" align="center" label="备注英文" />
              <el-table-column v-if="viewLabelDetails.type==3" :key="4" prop="color" align="center" label="标签颜色">
                <template slot-scope="scope">
                  <span :style="{background:scope.row.color,width:'24px',height:'24px',display:'block',margin:'0 auto'}" />
                  <span>{{ scope.row.color }}</span>
                </template>
              </el-table-column>

              <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                  <el-button
                    v-hasPermi="['home:label:edit']"
                    size="mini"
                    type="text"
                    icon="el-icon-edit"
                    @click="handleLabelUpdate(scope.row)"
                  >编辑</el-button>
                  <el-button
                    v-hasPermi="['home:label:remove']"
                    size="mini"
                    type="text"
                    icon="el-icon-delete"
                    @click="handleLabelDelete(scope.row)"
                  >删除</el-button>


                </template>
              </el-table-column>
            </el-table>
            <div style="text-align: center;">
              <el-button v-hasPermi="['home:label:add']" style="margin-top: 32px;" type="primary" icon="el-icon-plus" @click="handleLabelAdd">新增</el-button>
            </div>

          </div>

        </ul>
      </div>
    </el-drawer>

    <!-- 新增标签 -->
    <el-dialog width="500px" :title="titleLabel" :before-close="addHandleClose" :visible.sync="addLabelFormStatus" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form ref="addLabelForm" :model="addLabelForm" :rules="addLabelRules" label-position="right" label-width="120px">
        <!-- <el-form-item label="ID:" prop="id">
          <el-input v-model="addLabelForm.id" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="标签名称中文:" prop="name">
          <el-input v-model="addLabelForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="标签名称英文:" prop="nameEn">
          <el-input v-model="addLabelForm.nameEn" autocomplete="off" />
        </el-form-item>
        <el-form-item v-if="viewLabelDetails.type==1" :key="1" label="标签图片:" prop="iconUrl">
          <el-upload
            class="avatar-uploader"
            :action="uploadImgUrl"
            :headers="headers"
            :show-file-list="false"
            :on-error="uploadError"
            accept=".jpg,.jpeg,.png,.gif"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="addLabelForm.iconUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item v-if="viewLabelDetails.type==3" :key="2" label="标签颜色:" prop="color">
          <el-color-picker v-model="addLabelForm.color" />
        </el-form-item>
        <el-form-item v-if="viewLabelDetails.type==2" :key="3" label="备注中文:" prop="remark">
          <el-input v-model="addLabelForm.remark" type="textarea" autosize placeholder="请输入内容" />
        </el-form-item>
        <el-form-item v-if="viewLabelDetails.type==2" :key="4" label="备注英文:" prop="remarkEn">
          <el-input v-model="addLabelForm.remarkEn" type="textarea" autosize placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addLabelReset">取 消</el-button>
        <el-button type="primary" @click="addLabelFormSubmit">保 存</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改标签类型对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">

        <el-form-item label="标签类型" prop="source" >
          <el-select v-model="form.source" placeholder="请选择类型" style="width:100%;">
            <el-option label="房源标签管理" value="1" />
            <el-option label="单间标签管理" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="标签属性" prop="type"><!-- 1有图片 2无图片 3有颜色 -->
          <el-select v-model="form.type" placeholder="请选择类型" style="width:100%;">
            <el-option label="有图片的标签" value="1" />
            <el-option label="无图片的标签" value="2" />
            <el-option label="带颜色的标签" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="类型名称中文" prop="name">
          <el-input v-model="form.name" placeholder="请输入类型名称" />
        </el-form-item>
        <el-form-item label="类型名称英文" prop="nameEn">
          <el-input v-model="form.nameEn" placeholder="请输入类型名称英文" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择" clearable  style="width:100%;">
            <el-option label="有效" value="1" />
            <el-option label="失效" value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { listLabel, getLabel, delLabel, addLabel, updateLabel, exportLabel } from '@/api/home/label'
import { listDetail, getDetail, delDetail, addDetail, updateDetail, exportDetail } from '@/api/home/detail'
import { getToken } from '@/utils/auth'
export default {
  name: 'Label',
  data() {
    return {
      activeNames: ['1', '2'],
      houseLabelList: [],
      houseLabelLoding: true,

      roomLabelList: [],
      roomLabelLoding: true,
      drawerTitle: '',
      drawerStatus: false,
      labelDetails: [],

      viewLabelDetails: {},
      tableLoading: true,

      addLabelFormStatus: false, // 新增标签弹出层
      addLabelForm: {
        name:undefined,
        nameEn:undefined,
        iconUrl:undefined,
        color:undefined,
        remark:undefined,
        remarkEn:undefined
      },
      addLabelRules: {
        name: [
          { required: true, message: '请输入标签名称中文', trigger: 'blur' },
          { min: 1, max: 50, message: '长度最大50个字符', trigger: 'blur' }
        ],
        nameEn: [
          { required: true, message: '请输入标签名称英文', trigger: 'blur' },
          { min: 1, max: 50, message: '长度最大50个字符', trigger: 'blur' }
        ],
        iconUrl: [
          { required: true, message: '请上传标签图片', trigger: 'change' }
        ],
        color: [
          { required: true, message: '请选择标签颜色', trigger: 'change' }
        ],
        remark: [
          { required: true, message: '请输入备注中文', trigger: 'blur' },
          { min: 1, max: 100, message: '长度最大150个字符', trigger: 'blur' }
        ],
        remarkEn: [
          { required: true, message: '请输入备注英文', trigger: 'blur' },
          { min: 1, max: 120, message: '长度最大120个字符', trigger: 'blur' }
        ]
      },

      //uploadImgUrl: process.env.VUE_APP_BASE_API+'/common/upload',
      //uploadImgUrl:  'http://47.100.186.108:8080/admin/common/upload',
      uploadImgUrl: process.env.VUE_APP_UPLOAD_URL,
      imageUrl: '',
      headers: {
        Authorization: 'Bearer ' + getToken()
      },

      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      names: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 标签类型表格数据
      labelList: [],
      // 弹出层标题
      title: '',
      titleLabel:'',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        code: undefined,
        source: undefined,
        type: undefined,
        name: undefined,
        nameEn: undefined,
        status: undefined
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
        source: [
          { required: true, message: '请选择标签类型', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择标签属性', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入类型名称中文', trigger: 'blur' },
          { min: 1, max: 50, message: '长度最大50个字符', trigger: 'blur' }
        ],
        nameEn: [
          { required: true, message: '请输入类型名称英文', trigger: 'blur' },
          { min: 1, max: 50, message: '长度最大50个字符', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      },
      editStatus:false,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /* 标签删除 */
    handleLabelDelete(row) {
      const ids = row.id
      this.$confirm('是否确认删除标签名称为"' + row.name + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delDetail(ids)
      }).then(() => {
        this.load()
        this.msgSuccess('删除成功')
      }).catch(function() {})
    },
    /* 标签编辑 */
    handleLabelUpdate(row) {
      this.editStatus = true;
      this.imageUrl = ''
      this.titleLabel = '编辑标签'
      this.resetForm('addLabelForm');
      

      getDetail(row.id).then(res=>{
        if(res.code===200){
          this.addLabelFormStatus = true;
          this.addLabelForm = res.data;
          if(res.data.iconUrl){
            if(res.data.iconUrl.includes('http://47.100.186.108')){
              this.imageUrl = res.data.iconUrl
              this.addLabelForm.iconUrl = res.data.iconUrl
            }else{
              this.imageUrl = this.serverImgUrl+res.data.iconUrl
              this.addLabelForm.iconUrl = this.serverImgUrl+res.data.iconUrl
            }
          }
          
          
        }else{
          this.msgError('获取标签详情失败')
        }
      }).catch(e=>{
        this.msgError('获取标签详情失败')
      })
    },
    /* 标签新增*/
    handleLabelAdd() {
      this.titleLabel = '新增标签'
      this.resetForm('addLabelForm')
      /* 判断当前type  新增哪种label */
      // type ==1 新增带图片   type ==3 新增带颜色  type==2 新增带备注
      this.addLabelFormStatus = true

      this.editStatus = false;

      this.imageUrl = ''
      // this.addLabelForm.iconUrl = undefined;
    },
    /* 关闭新增弹出层 */
    addHandleClose() {
      this.resetForm('addLabelForm')
      this.addLabelFormStatus = false
    },
    addLabelFormSubmit() {
      this.$refs['addLabelForm'].validate(valid => {
        if (valid) {
          if(this.editStatus){
            updateDetail(this.addLabelForm).then(res=>{
              if (res.code === 200) {
                this.msgSuccess('编辑成功')
                this.addLabelFormStatus = false

                this.load()
              } else {
                this.msgError(res.msg)
              }
            })
          }else{
            addDetail(this.addLabelForm).then(response => {
              if (response.code === 200) {
                this.msgSuccess('新增成功')
                this.addLabelFormStatus = false

                this.load()
              } else {
                this.msgError(response.msg)
              }
            })
          } 
        } else {

        }
      })
    },
    addLabelReset() {
      this.resetForm('addLabelForm')
      this.addLabelFormStatus = false
    },

    load() {
      listDetail({ labelId: this.viewLabelDetails.id }).then(response2 => {
        this.tableLoading = true
        if (response2.code === 200) {
          this.labelDetails = response2.rows
          this.tableLoading = false
        } else {
          this.msgError(response.msg)
          this.tableLoading = false
        }
      })
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      // this.$refs.uploadImg.clearValidate()
      this.addLabelForm.iconUrl = this.serverImgUrl+res.fileName
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg'
      // const isLt2M = file.size / 1024 / 1024 < 2

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!')
      // }
      // return isJPG && isLt2M
    },
    uploadError() {
      this.$message.error('标题图片上传失败！')
    },

    clickHouseRow(row, column, event) {
      console.log(row, column, event)

      const loading = this.$loading({
        lock: true,
        text: '拼命加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      /* 查询当前label下的详细标签*/
      listDetail({ labelId: row.id }).then(response => {
        this.tableLoading = false
        if (row.source == 1) {
          this.drawerTitle = '房源标签管理/' + row.name + ''
        } else {
          this.drawerTitle = '单间标签管理/' + row.name + ''
        }
        loading.close()
        this.drawerStatus = true
        this.labelDetails = response.rows
        this.viewLabelDetails = row
        this.addLabelForm.labelId = row.id
      })
    },
    /* 查询房源 label */
    getHouseLabel() {
      this.houseLabelLoding = true
      listLabel({ source: 1 }).then(response => {
        this.houseLabelList = response.rows
        this.houseLabelLoding = false
      })
    },

    /* 查询单间 label */
    getRoomLabel() {
      this.roomLabelLoding = true
      listLabel({ source: 2 }).then(response => {
        this.roomLabelList = response.rows
        this.roomLabelLoding = false
      })
    },

    /** 查询标签类型列表 */
    getList() {
      this.getHouseLabel()
      this.getRoomLabel()
      // this.loading = true
      // listLabel(this.queryParams).then(response => {
      //   this.labelList = response.rows
      //   this.total = response.total
      //   this.loading = false
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
        source: undefined,
        type: undefined,
        name: undefined,
        nameEn: undefined,
        remark: undefined,
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
      this.ids = selection.map(item => item.id)
      this.names = selection.map(item => item.name)
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加标签类型'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getLabel(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改标签类型'
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateLabel(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addLabel(this.form).then(response => {
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
      const ids = row.id || this.ids
      const names = row.name || this.names
      this.$confirm('是否确认删除标签名称为"' + names + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delLabel(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(function() {})
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有标签类型数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportLabel(queryParams)
      }).then(response => {
        this.download(response.msg)
      }).catch(function() {})
    }
  }
}
</script>
<style>
  .el-drawer__body{
    overflow: auto;
  }
  .houseRoomLabel .el-table__row{
    cursor: pointer;
  }
  .houseRoomLabel .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      width: 48px;
      height: 48px;
    }
    .houseRoomLabel .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .houseRoomLabel .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 48px;
      height: 48px;
      line-height: 48px;
      text-align: center;
    }
    .houseRoomLabel .avatar {
      width: 48px;
      height: 48px;
      display: block;
    }
    /* .houseRoomLabel .el-upload{
      width: 48px;
      height: 48px;
      border: 1px solid #ddd;
      z-index: 99999;
    }
    .iconUrlImg{
      width: 48px;
      height: 48px;
    } */
</style>
