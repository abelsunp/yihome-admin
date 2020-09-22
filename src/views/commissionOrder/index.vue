<template>
  <div class="app-container" :style= "{backgroundColor:addOrderDrawer?'#EFF2F5':'#fff'}">

      <!-- 新增修改 -->
    <div v-show="addOrderDrawer" class="addWrapper">
        <div class="top">
            <h1 style="line-height:32px;">{{drawerTitle}}</h1>
            <el-button style="width:60px;height:32px;" size="mini" @click="addOrderDrawer=false">关闭</el-button>
        </div>
        <div style="background-color:#fff;border-radius: 4px;padding: 16px 24px;">
            <div style="margin:0 auto;">
                <Add-order v-if="addOrderDrawer"  :current-status="currentStatus"  :current-data="currentData"  />
            </div>
            
        </div>
        
    </div>
    
    <div v-show="!addOrderDrawer">

    

    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="90px">
      <!-- <el-form-item label="流程实例ID" prop="instanceId">
        <el-input
          v-model="queryParams.instanceId"
          placeholder="请输入流程实例ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="供应商id" prop="supplierId">
        <el-input
          v-model="queryParams.supplierId"
          placeholder="请输入供应商id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="公司名称" prop="companyName">
        <el-input
          v-model="queryParams.companyName"
          placeholder="请输入公司名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="公司地址" prop="companyAddress">
        <el-input
          v-model="queryParams.companyAddress"
          placeholder="请输入公司地址"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公司电话" prop="tel">
        <el-input
          v-model="queryParams.tel"
          placeholder="请输入公司电话"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="email" prop="emial">
        <el-input
          v-model="queryParams.emial"
          placeholder="请输入email"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="供应商名称" prop="billTo">
        <el-input
          v-model="queryParams.billTo"
          placeholder="请输入供应商名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="订单发起日期" prop="issueDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.issueDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择订单发起日期">
        </el-date-picker>
      </el-form-item> -->
      <el-form-item label="订单编号" prop="invoiceNo">
        <el-input
          v-model="queryParams.invoiceNo"
          placeholder="请输入订单编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="截止付款日期" prop="paymentDue">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.paymentDue"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择截止付款日期">
        </el-date-picker>
      </el-form-item> -->
      <!-- <el-form-item label="收款银行名称" prop="bankName">
        <el-input
          v-model="queryParams.bankName"
          placeholder="请输入收款银行名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="账号名称" prop="accountName">
        <el-input
          v-model="queryParams.accountName"
          placeholder="请输入账号名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="银行地址" prop="bankAddress">
        <el-input
          v-model="queryParams.bankAddress"
          placeholder="请输入银行地址"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="账号" prop="accountNumber">
        <el-input
          v-model="queryParams.accountNumber"
          placeholder="请输入账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="银行代码" prop="swiftCode">
        <el-input
          v-model="queryParams.swiftCode"
          placeholder="请输入银行代码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="付款参考" prop="paymentReference">
        <el-input
          v-model="queryParams.paymentReference"
          placeholder="请输入付款参考"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="受益人银行代码" prop="beneficiaryBankCode">
        <el-input
          v-model="queryParams.beneficiaryBankCode"
          placeholder="请输入受益人银行代码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="注解" prop="note">
        <el-input
          v-model="queryParams.note"
          placeholder="请输入注解"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="签名图片" prop="signature">
        <el-input
          v-model="queryParams.signature"
          placeholder="请输入签名图片"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="实际总金额" prop="totalAmount">
        <el-input
          v-model="queryParams.totalAmount"
          placeholder="请输入实际总金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="预估计算总金额" prop="predictAmount">
        <el-input
          v-model="queryParams.predictAmount"
          placeholder="请输入预估计算总金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> 
      <el-form-item label="状态 1有效 2无效" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态 1有效 2无效" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>-->
      <!-- <el-form-item label="申请人" prop="applyUser">
        <el-input
          v-model="queryParams.applyUser"
          placeholder="请输入申请人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申请时间" prop="applyTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.applyTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择申请时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="实际开始时间" prop="realityStartTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.realityStartTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择实际开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="实际结束时间" prop="realityEndTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.realityEndTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择实际结束时间">
        </el-date-picker>
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
        >新增</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['ydb:commission:edit']"
        >修改</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['ydb:commission:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['ydb:commission:export']"
        >导出</el-button>
      </el-col> -->
    </el-row>

    <el-table v-loading="loading" :data="commissionList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="流程实例ID" align="center" prop="instanceId" /> -->
      <!-- <el-table-column label="供应商id" align="center" prop="supplierId" /> -->
      <el-table-column label="公司名称" align="center" prop="companyName" :show-overflow-tooltip="true" />
      <!-- <el-table-column label="公司地址" align="center" prop="companyAddress" />
      <el-table-column label="公司电话" align="center" prop="tel" />
      <el-table-column label="email" align="center" prop="emial" /> -->
      <el-table-column label="供应商名称" align="center" prop="billTo" />
      <!-- <el-table-column label="订单发起日期" align="center" prop="issueDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.issueDate) }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="订单编号" align="center" prop="invoiceNo" />
      <!-- <el-table-column label="截止付款日期" align="center" prop="paymentDue" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.paymentDue) }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="收款银行名称" align="center" prop="bankName" />
      <el-table-column label="账号名称" align="center" prop="accountName" />
      <el-table-column label="银行地址" align="center" prop="bankAddress" />
      <el-table-column label="账号" align="center" prop="accountNumber" />
      <el-table-column label="银行代码" align="center" prop="swiftCode" />
      <el-table-column label="付款参考" align="center" prop="paymentReference" />
      <el-table-column label="受益人银行代码" align="center" prop="beneficiaryBankCode" />
      <el-table-column label="注解" align="center" prop="note" />
      <el-table-column label="签名图片" align="center" prop="signature" />
      <el-table-column label="实际总金额" align="center" prop="totalAmount" />
      <el-table-column label="预估计算总金额" align="center" prop="predictAmount" />
      <el-table-column label="备注" align="center" prop="remark" /> 
      <el-table-column label="状态 1有效 2无效" align="center" prop="status" />
      <el-table-column label="申请人" align="center" prop="applyUser" />
      <el-table-column label="申请时间" align="center" prop="applyTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.applyTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实际开始时间" align="center" prop="realityStartTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.realityStartTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实际结束时间" align="center" prop="realityEndTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.realityEndTime) }}</span>
        </template>
      </el-table-column>-->
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <span>{{ scope.row.status==0?'废弃':scope.row.status==2?'供应商佣金结算中':scope.row.status==3?'佣金结算完成':'' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="流程状态" align="center" prop="taskName" width="200" fixed="right" class-name="small-padding fixed-width same-color" >
        <template slot-scope="scope">
          <span style="background-color: #1ab394;border-radius: 10px;padding:4px 6px;color:#fff;">{{ scope.row.taskName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" class-name="small-padding fixed-width same-color">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            :disabled="scope.row.status!=1?true:false"
            icon="el-icon-thumb"
            @click="handleExamine(scope.row)"
            :class="{examineClassStatus:scope.row.status!=1}"
          >申请</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            :disabled="scope.row.status!=1?true:false"
            @click="handleUpdate(scope.row)"
            :class="{examineClassStatus:scope.row.status!=1}"
            
          >编辑</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            :disabled="scope.row.status!=1?true:false"
            :class="{examineClassStatus:scope.row.status!=1}"
          >废弃</el-button>
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
    
  </div>
</template>

<script>
import { listCommission, getCommission, delCommission, addCommission, updateCommission,submitApply } from "@/api/commissionOrder/commissionOrder";

import AddOrder from "@/components/AddCommissionOrder"


export default {
  name: "Commission",
  components:{
    AddOrder
  },
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
      // 供应商佣金订单表格数据
      commissionList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        instanceId: undefined,
        supplierId: undefined,
        companyName: undefined,
        companyAddress: undefined,
        tel: undefined,
        emial: undefined,
        billTo: undefined,
        issueDate: undefined,
        invoiceNo: undefined,
        paymentDue: undefined,
        bankName: undefined,
        accountName: undefined,
        bankAddress: undefined,
        accountNumber: undefined,
        swiftCode: undefined,
        paymentReference: undefined,
        beneficiaryBankCode: undefined,
        note: undefined,
        signature: undefined,
        totalAmount: undefined,
        predictAmount: undefined,
        status: undefined,
        applyUser: undefined,
        applyTime: undefined,
        realityStartTime: undefined,
        realityEndTime: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        supplierId: [
          { required: true, message: "供应商id不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "修改时间不能为空", trigger: "blur" }
        ],
      },
      //添加修改佣金订单
      addOrderDrawer:false,
      drawerTitle:'',
      currentStatus:true,
      currentData:{},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleDelete(row){
      console.log(row)
      this.loading = true;
      delCommission({id:row.id}).then(res=>{
        this.loading = false;
        if(res.code===200){
          this.getList();
        }else{
          this.msgError(res.msg)
        }
      }).catch(e=>{
        this.loading = false;
      })
    },
    handleExamine(row){
      this.loading = true;
      submitApply({id:row.id}).then(res=>{
        this.loading = false;
        if(res.code===200){
          this.msgSuccess('申请成功')
          this.getList();
        }else{
          this.msgError(res.msg);
        }
      }).catch(e=>{
        this.loading = false;
      })
    },
    /** 查询供应商佣金订单列表 */
    getList() {
      this.loading = true;
      listCommission(this.queryParams).then(response => {
        this.commissionList = response.rows;
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
        instanceId: undefined,
        supplierId: undefined,
        companyName: undefined,
        companyAddress: undefined,
        tel: undefined,
        emial: undefined,
        billTo: undefined,
        issueDate: undefined,
        invoiceNo: undefined,
        paymentDue: undefined,
        bankName: undefined,
        accountName: undefined,
        bankAddress: undefined,
        accountNumber: undefined,
        swiftCode: undefined,
        paymentReference: undefined,
        beneficiaryBankCode: undefined,
        note: undefined,
        signature: undefined,
        totalAmount: undefined,
        predictAmount: undefined,
        remark: undefined,
        status: "0",
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
        applyUser: undefined,
        applyTime: undefined,
        realityStartTime: undefined,
        realityEndTime: undefined
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
    //   this.reset();
    //   this.open = true;
    //   this.title = "添加供应商佣金订单";
        this.currentStatus = true;
        this.currentData = {};
      this.addOrderDrawer = true;
      this.drawerTitle = "添加供应商佣金订单"
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
        this.currentStatus = false;
        const id = row.id || this.ids
        this.loading = true;
        getCommission(id).then(response => {
            this.loading = false;
            if(response.code===200){
                this.addOrderDrawer = true;
                this.drawerTitle = "修改供应商佣金订单";
                this.currentData = response.data;
            }else{
                this.msgError(response.msg);
            }
        }).catch(e=>{
            this.loading = false;
        })

    //   this.reset();
    //   
    //   getCommission(id).then(response => {
    //     this.form = response.data;
    //     this.open = true;
    //     this.title = "修改供应商佣金订单";
    //   });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateCommission(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addCommission(this.form).then(response => {
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
    
  }
};
</script>
<style scoped>
  .addWrapper .top{
    padding: 16px 24px;
    margin-bottom: 16px;
    background-color: rgb(255, 255, 255);
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
  }
  .addWrapper .top h1{
    margin: 0px;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.85);
    font-family: PingFangSC-Medium;
  }
</style>
<style>
.examineClassStatus{
    color: #ddd !important;
  }
</style>