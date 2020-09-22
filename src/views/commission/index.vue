<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">

      <el-form-item label="币种" prop="symbol">
          <el-select v-model="queryParams.symbol" placeholder="请选择" clearable size="small">
              <el-option
                  v-for="item in currencyTypeData"
                  :key="item.id"
                  :label="item.currencyType+'('+item.currencySymbol+')'"
                  :value="item.id">
                  <span style="float: left">{{ item.currencyType }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.currencySymbol }}</span>
              </el-option>
          </el-select>
      </el-form-item>




      <!-- <el-form-item label="币种 " prop="symbol">

          <el-select v-model="queryParams.symbol" placeholder="请选择" clearable size="small">
            <el-option label="澳元" value="1" />
            <el-option label="英镑" value="2" />
            <el-option label="美元" value="3" /> 
          </el-select>
        
      </el-form-item> -->
      <el-form-item label="有无佣金" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择" clearable size="small">
          <el-option label="有佣金" value="2" />
          <el-option label="无佣金" value="1" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="间隔时间 长短租  默认 182 " prop="days">
        <el-input
          v-model="queryParams.days"
          placeholder="请输入间隔时间 长短租  默认 182 "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="最小租期" prop="minTerm">
        <el-input
          v-model="queryParams.minTerm"
          placeholder="请输入最小租期"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="最大租期" prop="maxTerm">
        <el-input
          v-model="queryParams.maxTerm"
          placeholder="请输入最大租期"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收到的佣金" prop="commissionAmount">
        <el-input
          v-model="queryParams.commissionAmount"
          placeholder="请输入收到的佣金"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="服务费" prop="serviceAmount">
        <el-input
          v-model="queryParams.serviceAmount"
          placeholder="请输入服务费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="small">
          <el-option label="有效" value="1" />
          <el-option label="无效" value="0" />
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
          v-hasPermi="['ydb:charge:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['ydb:charge:edit']"
        >修改</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['ydb:charge:remove']"
        >删除</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['ydb:charge:export']"
        >导出</el-button>
      </el-col> -->
    </el-row>

    <el-table v-loading="loading" :data="chargeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="编号" align="center" prop="id" /> -->
      <el-table-column label="币种" align="center" prop="symbol">
          <template slot-scope="scope">
            <span v-for="(item,$index) in currencyTypeData" :key="$index">
              {{scope.row.symbol==item.id?item.currencyType:''}}
            </span>
              <!-- {{scope.row.symbol==1?'澳元':scope.row.symbol==2?'英镑':scope.row.symbol==3?'美元':''}} -->
          </template>
      </el-table-column>
      <el-table-column label="有无佣金" align="center" prop="type">
            <template slot-scope="scope">
              {{scope.row.type==1?'无佣金':scope.row.type==2?'有佣金':'---'}}
            </template>
      </el-table-column>
      <!-- <el-table-column label="间隔时间 长短租  默认 182 " align="center" prop="days" /> -->
      
        <el-table-column label="最小租期" align="center" prop="minTerm" >
            <template slot-scope="scope">
                {{scope.row.minTerm?scope.row.minTerm+' 天':'---'}}
            </template>
        </el-table-column>

        <el-table-column label="最大租期" align="center" prop="maxTerm" >
            <template slot-scope="scope">
                {{scope.row.maxTerm?scope.row.maxTerm+' 天':'---'}}
            </template>
        </el-table-column>

        <el-table-column label="佣金" align="center" prop="commissionAmount">
            <template slot-scope="scope">
                {{scope.row.commissionAmount?scope.row.commissionAmount:0}}
                {{scope.row.symbol==1?'澳元':scope.row.symbol==2?'英镑':scope.row.symbol==3?'美元':''}}
            </template>
        </el-table-column>

        <el-table-column label="服务费" align="center" prop="serviceAmount" >
            <template slot-scope="scope">
                {{scope.row.serviceAmount+'人民币'}}
            </template>
        </el-table-column>
      <!-- <el-table-column label="备注" align="center" prop="remark" /> -->
      <el-table-column label="状态" align="center" prop="status">
            <template slot-scope="scope">
              {{scope.row.status==0?'无效':scope.row.status==1?'有效':'---'}}
            </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['ydb:charge:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['ydb:charge:remove']"
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

    <!-- 添加或修改供应商服务费佣金条件对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <!-- <el-form-item label="币种" prop="symbol">
         
          <el-select v-model="form.symbol" placeholder="请选择" clearable size="small" style="width:100%;">
            <el-option label="澳元" value="1" />
            <el-option label="英镑" value="2" />
            <el-option label="美元" value="3" />
          </el-select>
        </el-form-item> -->


        <el-form-item label="币种" prop="symbol">
          <el-select v-model="form.symbol" placeholder="请选择" clearable  style="width:100%;">
              <el-option
                  v-for="item in currencyTypeData"
                  :key="item.id"
                  :label="item.currencyType+'('+item.currencySymbol+')'"
                  :value="item.id">
                  <span style="float: left">{{ item.currencyType }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.currencySymbol }}</span>
              </el-option>
          </el-select>
      </el-form-item>



        <el-form-item label="有无佣金" prop="type">
          <el-select v-model="form.type" placeholder="请选择" clearable style="width:100%;" @change="typeChange">
            <el-option label="有佣金" value="2" />
            <el-option label="无佣金" value="1" />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="间隔时间 长短租  默认 182 " prop="days">
          <el-input v-model="form.days" placeholder="请输入间隔时间 长短租  默认 182 " />
        </el-form-item> -->

        <el-form-item label="最小租期/天" prop="minTerm" v-if="form.type==2">
          <el-input v-model="form.minTerm" clearable placeholder="请输入最小租期" type="number" />
        </el-form-item>
        <el-form-item label="最大租期/天" prop="maxTerm" v-if="form.type==2">
          <el-input v-model="form.maxTerm" clearable placeholder="请输入最大租期"  type="number"/>
        </el-form-item>
        <el-form-item label="佣金" prop="commissionAmount" v-if="form.type==2">
          <el-input v-model="form.commissionAmount" clearable placeholder="请输入收到的佣金" type="number"/>
        </el-form-item>


        <el-form-item label="服务费" prop="serviceAmount">
          <el-input v-model="form.serviceAmount" clearable placeholder="请输入服务费" type="number" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态" clearable style="width:100%;">
            <el-option label="有效" value="1" />
            <el-option label="无效" value="0" />
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
import { listCharge, getCharge, delCharge, addCharge, updateCharge, exportCharge } from "@/api/commissionTerms/commissionTerms";
import { listCountry } from '@/api/home/country'
export default {
  name: "Charge",
  data() {
    return {
      currencyTypeData:[],
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
      // 供应商服务费佣金条件表格数据
      chargeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        symbol: undefined,
        type: undefined,
        days: undefined,
        minTerm: undefined,
        maxTerm: undefined,
        commissionAmount: undefined,
        serviceAmount: undefined,
        status: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "修改时间不能为空", trigger: "blur" }
        ],
        symbol: [
          { required: true, message: "请选择币种", trigger: "change" }
        ],
        type: [
          { required: true, message: "请选择佣金状态", trigger: "change" }
        ],
        minTerm:[
            {required: true, message: "请输入最小租期", trigger: "blur" }
        ],
        maxTerm:[
            {required: true, message: "请输入最大租期", trigger: "blur" }
        ],
        commissionAmount:[
            {required: true, message: "请输入佣金", trigger: "blur" }
        ],
        serviceAmount: [
            { required: true, message: '请输入服务费', trigger: 'blur' },
        ],
        status: [
          { required: true, message: "请选择状态", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.getList();
    //获取货币类型
    listCountry().then(res=>{
        this.currencyTypeData = res.rows;
    })
  },
  methods: {
      typeChange(val){
          if(val==1){
              this.form.minTerm = undefined;
              this.form.maxTerm = undefined;
              this.form.commissionAmount = undefined;
          }
      },
    /** 查询供应商服务费佣金条件列表 */
    getList() {
      this.loading = true;
      listCharge(this.queryParams).then(response => {
        this.chargeList = response.rows;
        this.total = response.total;
        this.loading = false;
      }).catch(e=>{
          this.loading = false;
      })
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
        symbol: undefined,
        type: undefined,
        days: undefined,
        minTerm: undefined,
        maxTerm: undefined,
        commissionAmount: undefined,
        serviceAmount: undefined,
        remark: undefined,
        status: "1",
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined
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
      this.reset();
      this.open = true;
      this.title = "添加供应商服务费佣金条件";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      this.loading = true;
      getCharge(id).then(response => {
        this.loading = false;
        this.form = response.data;
        this.open = true;
        this.title = "修改供应商服务费佣金条件";
      }).catch(e=>{
        this.loading = false;
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateCharge(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addCharge(this.form).then(response => {
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
      this.$confirm('是否确认删除当前供应商服务费佣金条件?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delCharge(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有供应商服务费佣金条件数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportCharge(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
<style>
input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type="number"]{
        -moz-appearance: textfield;
    }
</style>