<template>
  <div class="app-container">
    <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="文章标题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入文章标题"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input
          v-model="queryParams.author"
          placeholder="请输入作者"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="标题图片" prop="imgUrl">
        <el-input
          v-model="queryParams.imgUrl"
          placeholder="请输入标题图片"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="信息" prop="info">
        <el-input
          v-model="queryParams.info"
          placeholder="请输入信息"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="信息英文" prop="infoEn">
        <el-input
          v-model="queryParams.infoEn"
          placeholder="请输入信息英文"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="文章类型" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择" clearable size="small">
          <el-option label="精彩故事" value="1" />
          <el-option label="留学动态" value="2" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="排序" prop="orderNo">
        <el-input
          v-model="queryParams.orderNo"
          placeholder="请输入排序"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="浏览量" prop="count">
        <el-input
          v-model="queryParams.count"
          placeholder="请输入浏览量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="文章状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择文章状态" clearable size="small">
          <el-option label="下架中" value="0" />
          <el-option label="上架中" value="1" />
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
          v-hasPermi="['home:news:add']"
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['home:news:edit']"
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['home:news:remove']"
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          v-hasPermi="['home:news:export']"
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col> -->
    </el-row>

    <el-table ref="table" v-loading="loading" :data="newsList" @selection-change="handleSelectionChange" @row-click="clickRow">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="编号" align="center" prop="id" /> -->
      <el-table-column label="标题" align="center" prop="title" />
      <el-table-column label="作者" align="center" prop="author" />
      <!-- <el-table-column label="标题图片" align="center" prop="imgUrl" /> -->
      <!-- <el-table-column label="信息" align="center" prop="info" /> -->
      <!-- <el-table-column label="信息英文" align="center" prop="infoEn" /> -->
      <el-table-column label="文章类型" align="center" prop="type">
        <template slot-scope="scope">
          <p v-if="scope.row.type==1">精彩故事</p>
          <p v-else>留学动态</p>
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center" prop="orderNo" />
      <el-table-column label="浏览量" align="center" prop="count" />
      <!-- <el-table-column label="备注" align="center" prop="remark" /> -->
      <el-table-column label="文章状态" align="center" prop="status">
        <template slot-scope="scope">
          <p v-if="scope.row.status==1" style="color: #13ce66;">上架中</p>
          <p v-else style="color: #ff4949;">下架中</p>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="viewData(scope.row)"
          >查看</el-button>
          <el-button
            v-hasPermi="['home:news:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-hasPermi="['home:news:remove']"
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

    <!-- 修改 查看 新增-->
    <el-drawer
      :title="title"
      size="850px"
      :visible.sync="open"
      :before-close="handleClose"
      center
    >
      <div v-if="open" style="padding: 0 16px 32px;">
        <el-form ref="form" :model="form" :rules="rules" label-width="83px">
          <el-form-item label="标题:" prop="title">
            <el-input v-model="form.title" placeholder="请输入标题" :disabled="enterStatus" />
          </el-form-item>
          <el-form-item label="作者:" prop="author">
            <el-input v-model="form.author" placeholder="请输入作者" :disabled="enterStatus" />
          </el-form-item>
          <el-form-item label="文章类型:" prop="type">
            <el-select v-model="form.type" placeholder="请选择" clearable size="small" :disabled="enterStatus">
              <el-option label="精彩故事" value="1" />
              <el-option label="留学动态" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="文章状态:" prop="status">
            <el-select v-model="form.status" placeholder="请选择" clearable size="small" :disabled="enterStatus">
              <el-option label="下架" value="0" />
              <el-option label="上架" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item ref="uploadImg" label="标题图片:" prop="imgUrl">
            <el-upload
              :disabled="enterStatus"
              class="avatar-uploader"
              :action="uploadImgUrl"
              :headers="headers"
              :show-file-list="false"
              :on-error="uploadError"
              accept=".jpg,.jpeg,.png,.gif"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form.imgUrl" :src="filterImgUrl(form.imgUrl)" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>

          </el-form-item>
          <el-form-item label="信息:" prop="info">
            <!-- <Editor v-model="form.info" :disabled="enterStatus" /> -->
            <vue-ueditor-wrap v-model="form.info" :config="myConfig" :key="1"></vue-ueditor-wrap>
          </el-form-item>
          <el-form-item label="信息英文:" prop="infoEn">
            <!-- <Editor v-model="form.infoEn" :disabled="enterStatus" /> -->
            <vue-ueditor-wrap v-model="form.infoEn" :config="myConfig" :key="2"></vue-ueditor-wrap>
          </el-form-item>

          <el-form-item label="文章排序:" prop="orderNo">
            <el-input v-model="form.orderNo" placeholder="请输入序号" :disabled="enterStatus" />
          </el-form-item>
          <!-- <el-form-item label="浏览量" prop="count">
            <el-input v-model="form.count" placeholder="请输入浏览量" />
          </el-form-item> -->

        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center;">
          <div v-if="buttonStatus">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
          <div v-else>
            <el-button type="primary" @click="closeDrawer">关 闭</el-button>
          </div>
        </div>
      </div>
    </el-drawer>

    <!-- 添加或修改新闻对话框 -->
    <!-- <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" placeholder="请输入作者" />
        </el-form-item>
        <el-form-item label="标题图片" prop="imgUrl">
          <el-input v-model="form.imgUrl" placeholder="请输入标题图片" />
        </el-form-item>
        <el-form-item label="信息" prop="info">
          <el-input v-model="form.info" placeholder="请输入信息" />
        </el-form-item>
        <el-form-item label="信息英文" prop="infoEn">
          <el-input v-model="form.infoEn" placeholder="请输入信息英文" />
        </el-form-item>
        <el-form-item label="1 精彩故事 2留学动态">
          <el-select v-model="form.type" placeholder="请选择1 精彩故事 2留学动态">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="orderNo">
          <el-input v-model="form.orderNo" placeholder="请输入排序" />
        </el-form-item>
        <el-form-item label="浏览量" prop="count">
          <el-input v-model="form.count" placeholder="请输入浏览量" />
        </el-form-item>
        <el-form-item label="状态 0 失效 1有效">
          <el-radio-group v-model="form.status">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import { listNews, getNews, delNews, addNews, updateNews, exportNews } from '@/api/home/news'
import Editor from '@/components/Editor'
import { getToken } from '@/utils/auth'
import VueUeditorWrap from '@/components/UE';
export default {
  name: 'News',
  components: {
    Editor,VueUeditorWrap
  },
  data() {
    return {
      myConfig:{
          autoHeightEnabled: false,
          initialFrameHeight: 200,
          initialFrameWidth: '100%',
      },
      enterStatus: false,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [], names: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 新闻表格数据
      newsList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: undefined,
        author: undefined,
        imgUrl: undefined,
        info: undefined,
        infoEn: undefined,
        type: undefined,
        orderNo: undefined,
        count: undefined,
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
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 1, max: 50, message: '长度最大50个字符', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请输入作者', trigger: 'blur' },
          { min: 1, max: 20, message: '长度最大20个字符', trigger: 'blur' }
        ],
        // imgUrl: [
        //   { required: true, message: '请上传标题图片', trigger: 'change' }
        // ],
        info: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        infoEn: [
          { required: true, message: '请输入文章英文内容', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择文章类型', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择文章状态', trigger: 'change' }
        ]
      },
      //uploadImgUrl: 'http://47.100.186.108:8080/admin/common/upload',
      uploadImgUrl: process.env.VUE_APP_UPLOAD_URL,
      imageUrl: '',
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      buttonStatus: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    filterImgUrl(path) {
      return path.replace('https://inyihome.com/admin', 'http://47.100.186.108:6989');
    },
    clickRow(row) {
      // this.$refs.table.toggleRowSelection(row);

      this.buttonStatus = false
      this.enterStatus = true
      this.reset()
      const id = row.id || this.ids
      getNews(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '查看'
      })
    },
    /** 查询新闻列表 */
    getList() {
      this.loading = true
      listNews(this.queryParams).then(response => {
        this.newsList = response.rows
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
        title: undefined,
        author: undefined,
        imgUrl: undefined,
        info: undefined,
        infoEn: undefined,
        type: undefined,
        orderNo: undefined,
        count: undefined,
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
      this.names = selection.map(item => item.title)
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.enterStatus = false
      this.buttonStatus = true
      this.reset()
      this.open = true
      this.title = '添加新闻'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {



      this.reset()
      const id = row.id || this.ids
      getNews(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改新闻'
        this.buttonStatus = true
        this.enterStatus = false
      })
    },
    // 查看
    viewData(row) {
      this.buttonStatus = false
      this.enterStatus = true
      this.reset()
      const id = row.id || this.ids
      getNews(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '查看'
      })
    },
    closeDrawer() {
      this.open = false
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateNews(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addNews(this.form).then(response => {
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
      const ids = row.title || this.names
      const id = row.id || this.ids
      this.$confirm('是否确认删除新闻标题为"<p style="color:#c33">' + ids + '</p>"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }).then(function() {
        return delNews(id)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(function() {})
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有新闻数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportNews(queryParams)
      }).then(response => {
        this.download(response.msg)
      }).catch(function() {})
    },
    handleClose(done) {
      done()
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done()
      //   })
      //   .catch(_ => {})
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.$refs.uploadImg.clearValidate()
      this.form.imgUrl = res.url
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    uploadError() {
      // loading动画消失
      this.$message.error('标题图片上传失败！')
    }
  }
}
</script>
<style>
  .el-drawer__body{
    overflow-y: auto;
  }
  .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
</style>
