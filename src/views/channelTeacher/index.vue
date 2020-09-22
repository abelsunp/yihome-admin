<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="100px">
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="重要程度" prop="significance">
        <el-select v-model="queryParams.significance" placeholder="请选择重要程度" clearable size="small">
            <el-option
                v-for="item in significanceData"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="渠道老师来源" prop="source">
        <el-select v-model="queryParams.source" placeholder="请选择渠道老师来源" clearable size="small">
          <el-option
            v-for="item in sourceData"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="省份" prop="province">
        <el-select v-model="queryParams.province" placeholder="请选择省份" clearable size="small" @change="provinceChange2">
          <el-option
            v-for="item in listProvince"
            :key="item.id"
            :label="item.districtName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="省份" prop="city">
        <el-select v-model="queryParams.city" placeholder="请选择城市" clearable size="small" >
          <el-option
            v-for="item in listCityData2"
            :key="item.id"
            :label="item.districtName"
            :value="item.id">
          </el-option>
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
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['user:teacher:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['user:teacher:edit']"
        >编辑</el-button>
      </el-col>
      
    </el-row>

    <el-table v-loading="loading" :data="usersList" @selection-change="handleSelectionChange" @cell-click="cellClick">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="姓名" align="center" prop="name" :show-overflow-tooltip="true"/>

      <el-table-column label="管理者" align="center" prop="owner">
        <template slot-scope="scope">
          <span v-for="item in distributionDataTable" :key="item.id">
            {{ scope.row.owner==item.userId?item.nickName:'' }}
          </span>
        </template>
      </el-table-column>



      <el-table-column label="重要程度" align="center" prop="significance" >
         <template slot-scope="scope">
          <span v-for="item in significanceData" :key="item.id">
            {{item.id==scope.row.significance?item.name:''}}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="渠道老师来源" align="center" prop="source" >
         <template slot-scope="scope">
          <span v-for="item in sourceData" :key="item.id">
            {{item.id==scope.row.source?item.name:''}}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="省份" align="center" prop="province" >
         <template slot-scope="scope">
          <span v-for="item in listProvince" :key="item.id">
            {{item.id==scope.row.province?item.districtName:''}}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="城市" align="center" prop="city" >
         <template slot-scope="scope">
          <span v-for="item in listCityData" :key="item.id">
            {{item.id==scope.row.city?item.districtName:''}}
          </span>
        </template>
      </el-table-column>
      
      
      <el-table-column label="手机号码" align="center" prop="phone" :show-overflow-tooltip="true"/>
      <el-table-column label="公司名" align="center" prop="company" :show-overflow-tooltip="true"/>
      




      <!-- <el-table-column label="最后更新时间" align="center" prop="updateTime" :show-overflow-tooltip="true"/> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width same-color" width="270" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="handleView(scope.row)"
            v-hasPermi="['user:teacher:edit']"
          >查看</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['user:teacher:edit']"
          >编辑</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-thumb"
            @click="handleDistribution(scope.row)"
            v-hasPermi="['user:teacher:distribution']"
          >分配</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handledelete(scope.row)"
            v-hasPermi="['user:teacher:delete']"
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
    
    <el-dialog
      :title="title"
      :visible.sync="open"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="31%">
      <el-form :model="form" :rules="rules" ref="form" label-width="120px" >
        <el-form-item label="姓名：" prop="name">
          <el-input v-model.trim="form.name" placeholder="请输入姓名" clearable/>
        </el-form-item>
        <el-form-item label="重要程度：" prop="significance">
          <el-select v-model="form.significance" placeholder="请选择重要程度" style="width:100%;">
              <el-option
                  v-for="item in significanceData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="渠道老师来源：" prop="source">
          <el-select v-model="form.source" placeholder="请选择渠道老师来源" clearable style="width:100%;">
            <el-option
              v-for="item in sourceData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码：" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号码" clearable/>
        </el-form-item>
        <el-form-item label="公司名：" prop="company">
          <el-input v-model="form.company" placeholder="请输入公司名称" clearable/>
        </el-form-item>
        <el-form-item label="省份：" prop="province">
          <el-select v-model="form.province" filterable placeholder="请选择" clearable style="width:100%;" @change="provinceChange">
            <el-option
              v-for="item in listProvince"
              :key="item.id"
              :label="item.districtName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市：" prop="city">
          <el-select v-model="form.city" filterable placeholder="请选择" clearable style="width:100%;">
            <el-option
              v-for="item in listCity"
              :key="item.id"
              :label="item.districtName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址：" prop="address">
          <el-input v-model="form.address" placeholder="请输入地址" clearable/>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            clearable
            v-model="form.remark">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button  size="mini" @click="open = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="submitData('form')">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 用户分配 -->
    <el-dialog
      title="分配用户"
      :visible.sync="distributionStatus"
      width="420px"
      >
      <div>
        <el-select v-model="distributionVlaue" placeholder="请选择" >
          <el-option
            v-for="item in distributionData"
            :key="item.userId"
            :label="item.nickName"
            :value="item.userId+','+item.userName">
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="distributionStatus = false">取 消</el-button>
        <el-button type="primary" @click="handleDistributionConfrim">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 用户跟进记录 -->
    <el-drawer
      :title="'当前用户 / '+recordTitle"
      size="800px"
      :visible.sync="recordStatus"
      :append-to-body="true"
      custom-class="recordWrapper">
      <div v-if="recordStatus">
        <teacher-follow :user-data="currentRowData" />
      </div>
    </el-drawer>

    
  </div>
</template>

<script>
import { listTeacher, getTeacher, addTeacher,updateTeacher,allocationTeacher,listChinaCity,deleteTeacher } from "@/api/user/teacher";
import { getUserByRole } from "@/api/user/users";

import TeacherFollow from "@/components/TeacherFollow"

export default {
  name: "Teacher",
  components:{
    TeacherFollow
  },
  data() {
    return {
      recordTitle:'',
      recordStatus:false,
      currentRowData:{},


      distributionStatus:false,
      distributionVlaue:'',
      currentUserId:'',

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
      // 用户表格数据
      usersList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 2, max: 100, message: '不少于两个字符', trigger: 'blur' }
        ],
        updateTime: [
          { required: true, message: "修改时间不能为空", trigger: "blur" }
        ],
        significance: [
          { required: true, message: '请选择渠道老师重要程度', trigger: 'change' }
        ],
        source: [
          { required: true, message: '请选择渠道老师来源', trigger: 'change' }
        ],
      },
      significanceData:[],//重要程度
      sourceData:[],//渠道老师来源
      distributionDataTable:[],
      distributionData:[],
      listProvince:[],
      listCity:[],
      listCityData:[],
      listCityData2:[],
    };
  },
  
  created() {
    this.getList();
    this.getUserType();

    
    this.getCity();


    getUserByRole('101,102').then(res=>{
      this.distributionDataTable = res.data;
    });
    setTimeout(()=>{
      console.log(this.listProvince,111)
      // this.handleDataCountry(this.listProvince, this.listCity, 'id', 'pid');
      // console.log(this.listProvince,222)
    },0)
    
  },
  methods: {
    provinceChange(val){
      if(val){
        this.form.city = ''
        this.listCity=[];
        this.listCityData.forEach(res=>{
          if(val==res.pid){
            this.listCity.push(res)
          }
        })
      }else{
        this.listCity=[];
        this.form.city = ''
      }
      
    },
    provinceChange2(val){
      console.log(111)
      if(val){
        //this.queryParams.city = undefined
        this.listCityData2=[];
        this.listCityData.forEach(res=>{
          if(val==res.pid){
            this.listCityData2.push(res)
          }
        })
      }else{
        this.listCityData2=[];
        this.queryParams.city = ''
      }
      
    },
    getCity(){
      //省份
      listChinaCity({type:1}).then(res=>{
        this.listProvince = res.data
        listChinaCity({type:2}).then(res2=>{
          this.listCityData = res2.data
        }).catch(e=>{
          console.log(e)
        })
      }).catch(e=>{
        console.log(e)
      })
    },
    handleDataCountry(arr1, arr2, typy1, type2) {
      arr1.forEach(obj1 => {
        arr2.forEach(obj2 => {
          if (obj1[typy1] === obj2[type2]) {
            if (!obj1.children) {
              obj1.children = [obj2]
            } else {
              obj1.children.push(obj2)
            }
          }
        })
      })
    },
    getUserType(){
      const userType = JSON.parse(localStorage.getItem('YIHOME_user_type'))
      userType.forEach(el=>{
        if(el.parentId==36){
          this.sourceData.push(el)
        }
        if(el.parentId==40){
          this.significanceData.push(el)
        }
      })
    },
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      listTeacher(this.queryParams).then(response => {
        this.usersList = response.data.list;
        this.total = response.data.total;
        this.loading = false;
      }).catch(e=>{
        this.loading = false;
      })
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
      this.open = true;
      this.title="新增渠道老师";
      this.reset();
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      this.loading = true;
      getTeacher(id).then(response => {
        this.loading = false;
        if(response.code===200){
          this.open = true;
          this.title="修改渠道老师";
          this.form = response.data
        }
      }).catch(e=>{
        this.loading = false;
      })
    },
    reset(){
      this.form ={
        id:undefined,
        name:undefined,
        significance:undefined,
        source:undefined,
        phone:undefined,
        company:undefined,
        address:undefined,
        province:undefined,
        city:undefined
      };
      this.resetForm("form");
    },
    //点击表格
    cellClick(row, column, cell, event){
      if(column.label=='操作'){
        return;
      }
      
    },
    submitData(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //判断是修改还是新增
          if( this.form.id){
            updateTeacher(this.form).then(res=>{
              if(res.code===200){
                this.msgSuccess('修改成功')
                this.open = false;
                this.getList();
              }else{
                this.msgError(res.msg)
              }
            }).catch(e=>{

            })
          }else{
            addTeacher(this.form).then(res=>{
              if(res.code===200){
                this.msgSuccess('新增成功');
                this.open = false;
                this.getList();
              }else{
                this.msgError(res.msg)
              }
            }).catch(e=>{
              
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleDistribution(row){
      this.currentUserId = row.id;
      this.loading = true;
      getUserByRole('101,102').then(res=>{
        this.loading = false;
        if(res.code===200){
          this.distributionStatus = true;
          this.distributionVlaue = undefined;
          this.distributionData = res.data;
        }else{
          this.msgError('用户获取失败暂不可分配')
        }
        
      }).catch(e=>{
        this.loading = false;
      })
    },
    handleDistributionConfrim(){
      console.log(this.distributionVlaue,this.currentUserId)
      allocationTeacher({
        id:this.currentUserId,
        owner:this.distributionVlaue.split(',')[0],
        ownerName:this.distributionVlaue.split(',')[1]
      }).then(res=>{
        if(res.code===200){
          this.distributionStatus = false;
          this.msgSuccess('分配成功')
          this.getList();
        }else{
          this.msgError(res.msg)
        }
      })
    },
    handledelete(row){
      this.$confirm('是否删除当前用户？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTeacher(row.id).then(res=>{
          if(res.code===200){
            this.$message({ type: 'success', message: '删除成功!' });
            this.getList();
          }else{
            this.msgError(res.msg)
          }
        })
        
      }).catch(() => {
                 
      });
    },
    handleView(row){
      this.loading = true;
      getTeacher(row.id).then(response => {
        this.loading = false;
        if(response.code===200){
          this.currentRowData = response.data;
          this.recordTitle = row.name;
          this.recordStatus = true;
        }
      }).catch(e=>{
        this.loading = false;
      })
    }
  }
};
</script>
<style scoped>
  .remarkWrapper{
    -webkit-line-clamp: 1;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }
</style>
<style>
 .userRemarkWrapper{
    max-width: 300px;
    padding: 12px 16px;
    color: rgba(0,0,0,.65) !important;
    background-color: #fff !important;
    background-clip: padding-box;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,.15)
 }
  .addUserWrapper{
     height: 100vh !important;
  }
  .addUserWrapper .el-drawer__body{
   overflow: auto;
   background: #eff3f5;
  }
  .recordWrapper .el-drawer__body{
    overflow: auto;
  }
  .addUserWrapper .el-drawer__body .user-wrapper{
    margin: 16px;
    min-height: 100%;
    background-color: #fff;
    border-radius: 4px;
  }
  .addUserWrapper .el-drawer__header,.recordWrapper .el-drawer__header{
    margin-bottom: 20px;
  }
</style>