<template>
  <div class="app-container" v-loading.lock="fullscreenLoading">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="84px">
      <el-form-item label="事项编号" prop="itemName">
        <el-input
          v-model="queryParams.itemName"
          placeholder="请输入事项编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="模块名称" prop="module">
        <el-input
          v-model="queryParams.module"
          placeholder="请输入模块名称 (必须以 uri 一致)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="任务 ID" prop="taskId">
        <el-input
          v-model="queryParams.taskId"
          placeholder="请输入任务 ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="任务名称" prop="taskName">
        <el-input
          v-model="queryParams.taskName"
          placeholder="请输入任务名称 (必须以表单页面名称一致)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="节点名称" prop="nodeName">
        <el-input
          v-model="queryParams.nodeName"
          placeholder="请输入节点名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> 
      <el-form-item label="是否查看 default 0 (0 否 1 是)" prop="isView">
        <el-input
          v-model="queryParams.isView"
          placeholder="请输入是否查看 default 0 (0 否 1 是)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否处理 default 0 (0 否 1 是)" prop="isHandle">
        <el-input
          v-model="queryParams.isHandle"
          placeholder="请输入是否处理 default 0 (0 否 1 是)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="待办人 ID" prop="todoUserId">
        <el-input
          v-model="queryParams.todoUserId"
          placeholder="请输入待办人 ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="待办人名称" prop="todoUserName">
        <el-input
          v-model="queryParams.todoUserName"
          placeholder="请输入待办人名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="处理人 ID" prop="handleUserId">
        <el-input
          v-model="queryParams.handleUserId"
          placeholder="请输入处理人 ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="处理人名称" prop="handleUserName">
        <el-input
          v-model="queryParams.handleUserName"
          placeholder="请输入处理人名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="通知时间" prop="todoTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.todoTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择通知时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="处理时间" prop="handleTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.handleTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择处理时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="itemList">
      <!-- <el-table-column type="selection" width="55" align="center" class-name="same-color"/> -->
      <!-- <el-table-column label="主键 ID" align="center" prop="id" /> -->
      <el-table-column label="事项内容" align="center" prop="itemName" class-name="same-color" fixed />
      <el-table-column label="事项编号" align="center" prop="businessId" />
      
      <el-table-column label="模块名称" align="center" prop="module" :show-overflow-tooltip="true" />
      <el-table-column label="任务 ID" align="center" prop="taskId" />
      <!-- <el-table-column label="任务名称" align="center" prop="taskName" :show-overflow-tooltip="true" /> -->
      
      <!-- <el-table-column label="是否查看" align="center" prop="isView">
        <template slot-scope="scope">
          <span v-if="scope.row.isView">否</span>
          <span v-else>是</span>
        </template>
      </el-table-column> -->
      <el-table-column label="是否处理" align="center" prop="isHandle" >
        <template slot-scope="scope">
          <span>{{ scope.row.isView==0?'否':scope.row.isView==1?'是':'--' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="待办人 ID" align="center" prop="todoUserId" :show-overflow-tooltip="true" />
      <el-table-column label="待办人名称" align="center" prop="todoUserName" :show-overflow-tooltip="true" >
        <template slot-scope="scope">
          <span v-for="item in systemUser" :key="item.userId">
            {{scope.row.todoUserName==item.userName?item.nickName:''}}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="处理人 ID" align="center" prop="handleUserId" :show-overflow-tooltip="true" />
      <el-table-column label="处理人名称" align="center" prop="handleUserName" :show-overflow-tooltip="true" >
        <template slot-scope="scope">
          <span v-for="item in systemUser" :key="item.userId">
            {{scope.row.handleUserName==item.userName?item.nickName:''}}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="通知时间" align="center" prop="todoTime" width="180" :show-overflow-tooltip="true" >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.todoTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理时间" align="center" prop="handleTime" width="180" :show-overflow-tooltip="true" >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.handleTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="代办任务名称" align="center" prop="nodeName" width="200">
        <template slot-scope="scope">
          <span style="background-color: #1ab394;border-radius: 10px;padding:4px 6px;color:#fff;">{{ scope.row.nodeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width same-color" fixed="right" width="200" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-thumb"
            @click="handleEvent(scope.row)"
          >审批</el-button>
          <span v-if="scope.row.nodeName=='发起人调整'">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="adjustment(scope.row)"
            >调整</el-button>
          </span>
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['home:item:remove']"
          >删除</el-button> -->
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


    <el-drawer
      :title="viewOrderTitle"
      size="800px"
      :visible.sync="orderStatus"
      custom-class="viewOrder">
      <div>
        <view-order :view-data="viewOrderData"></view-order>
      </div>
      <div class="demo-drawer__footer" style="padding-bottom:32px;text-align:center;">
        <div v-if="currentOrderProcess.nodeName=='发起人调整'">
          <!-- 发起人调整 三个状态 1、到销售审核 2、到BD可成交审核 3、直接结束流程-->
          <!-- <el-button size="mini" type="primary" @click="sponsorHandel('toSales',currentOrderProcess)">跳转到销售审核</el-button> -->
          <el-button size="mini" type="primary" @click="sponsorHandel('toBD',currentOrderProcess)">再次申请</el-button>   <!-- 跳转到BD审核 -->
          <el-button size="mini" type="primary" @click="sponsorHandel('toEnd',currentOrderProcess)">结束申请</el-button>
        </div>
        <div v-else>
          <el-button size="mini" type="primary" @click="orderSubmitCancel(currentOrderProcess)">驳 回</el-button>
          <el-button size="mini" type="primary" @click="orderSubmitComfirm(currentOrderProcess)" >通 过</el-button>
        </div>
      </div>
    </el-drawer>



    <el-drawer
      title="佣金详情"
      size="800px"
      :visible.sync="commissionStatus"
      custom-class="viewOrder">
      <div>
        <view-commission :view-data="viewCommissionData"></view-commission>
      </div>
      <div class="demo-drawer__footer" style="padding-bottom:32px;text-align:center;">
        <el-button size="mini" type="primary" @click="commissionSubmitCancel(commissionProcess)">驳 回</el-button>
        <el-button size="mini" type="primary" @click="commissionSubmitComfirm(commissionProcess)" >通 过</el-button>
      </div>
    </el-drawer>

    

  </div>
</template>

<script>
import { listItem, getItem, useItemNamegetOrder,orderAudit,commissionAudit } from "@/api/handle/matter";

import { listCountry } from '@/api/home/country';

import { getOrder } from "@/api/order/order";

import ViewOrder from "@/components/Order/view";
import ViewCommission from "@/components/ViewCommission";


import { listUser } from "@/api/system/user"


import { getCommission } from "@/api/commissionOrder/commissionOrder";


export default {
  name: "Item",
  components:{
    ViewOrder,ViewCommission
  },
  data() {
    return {
      commissionStatus:false,
      viewCommissionData:{},
        viewOrderTitle:'审批详情',
        fullscreenLoading:false,
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 待办事项表格数据
      itemList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        itemName: undefined,
        itemContent: undefined,
        module: undefined,
        taskId: undefined,
        taskName: undefined,
        nodeName: undefined,
        isView: undefined,
        isHandle: undefined,
        todoUserId: undefined,
        todoUserName: undefined,
        handleUserId: undefined,
        handleUserName: undefined,
        todoTime: undefined,
        handleTime: undefined
      },
      // 表单参数
      form: {},
      orderStatus:false,
      
      viewOrderData:{},
      currentOrderProcess:{},//审批的为订单时 点击的当前数据
      systemUser:[],


      commissionProcess:{},//审批的为佣金时 点击的当前数据
    };
  },
  created() {
    this.getList();

    // 订单流程的名称  
    /**
     * 1、销售审核    salesApproved
     * 2、BD可成交审核  dbHaveApproved
     * 3、总监可成交审核 bossApproved
     * 4、发起人或者销售确认付款 applyUserAmountApproved
     * 5、BD学生付款确认 bdMoneyApproved
     */

    listUser().then(res=>{
      this.systemUser = res.rows;
    })
    
  },
  methods: {
    adjustment(row){
      this.$router.push({path:'/Order/order',query: { id: row.businessId }})
    },
    /** 查询待办事项列表 */
    getList() {
      this.loading = true;
      listItem(this.queryParams).then(response => {
        this.itemList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    //事件处理
    handleEvent(row){
      console.log(row)//事件类型

      //判断当前的事件类型
      // let eventType = row.itemName.split('-')[0];
      if(row.type=="Order"){//订单
        this.currentOrderProcess = row;
        this.getOrderDetails(row.businessId)
      }

      if(row.type=="Commission"){//佣金
        this.commissionProcess = row;
        //获取佣金详情
        this.getCommissionDetails(row.businessId)
      }

    },
    stringTrim(s){
      return s.replace(/(^\s*)|(\s*$)/g, "");
    },
    //获取订单详情
    getOrderDetails(id){
        this.fullscreenLoading = true;
        getOrder(id).then(res=>{
            this.fullscreenLoading = false;
            if(res.code===200){
                this.viewOrderData = res.data;
                this.orderStatus = true;
            }else{
                this.$message.error(res.msg);
            }
        }).catch(e=>{
          this.fullscreenLoading = false;
        })
    },

    /**
     * 
     * 订单审核
     * loadingName ： 加载中显示的汉字
     * status   同意或不同意 true or false
     * taskName  当前节点的名称
     * content 审核或者驳回的意见
     * successMsg 成功后的描述
     * errorMsg 失败后的描述
     */
    orderAuditMethod(loadingName,status,taskName,content,successMsg,errorMsg){
      const loading = this.$loading({
        lock: true,
        text: loadingName,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      orderAudit({
        orderFlag: status,
        orderNo:this.currentOrderProcess.businessId,
        taskId: this.currentOrderProcess.taskId,
        taskName: taskName,
        comment: content,
      }).then(res=>{
        loading.close();
        if(res.code===200){
          this.$message({ type: 'success', message: successMsg });
          this.orderStatus = false;
          this.getList();
        }else{
          this.$message.error(errorMsg);
        }
      }).catch(e=>{
        loading.close()
      })

    },

    commissionAuditMethod(loadingName,status,taskName,content,successMsg,errorMsg){
      const loading = this.$loading({
        lock: true,
        text: loadingName,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      commissionAudit({
        orderFlag: status,
        orderNo:this.commissionProcess.businessId,
        taskId: this.commissionProcess.taskId,
        taskName: taskName,
        comment: content,
      }).then(res=>{
        loading.close();
        if(res.code===200){
          this.$message({ type: 'success', message: successMsg });
          this.commissionStatus = false;
          this.getList();
        }else{
          this.$message.error(errorMsg);
        }
      }).catch(e=>{
        loading.close()
      })

    },




    //订单通过
    orderSubmitComfirm(params){
      var taskName = this.OrderProcessNow(params.nodeName);
      this.$prompt('请输入审核意见', '提示', {
        confirmButtonText: '确认通过',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        if(!value){//如果没有输入任何信息 意见默认为同意
          value="同意"
        }
        this.orderAuditMethod('订单审核中',true,taskName,value,'审核成功','审核失败')
      }).catch(() => {
              
      });
    },
    //订单驳回
    orderSubmitCancel(params){
      var taskName = this.OrderProcessNow(params.nodeName);
      this.$prompt('请输入驳回意见', '提示', {
        confirmButtonText: '确认驳回',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        if(!value){//如果没有输入任何信息 意见默认为同意
          value="不同意"
        }
        this.orderAuditMethod('订单驳回中',false,taskName,value,'订单驳回成功','驳回失败')
      }).catch(() => {
              
      });
    },

    //订单发起人调整
    sponsorHandel(str,params){
      var taskName = this.OrderProcessNow(params.nodeName);
      if(str=="toSales"){
        this.orderAuditMethod('加载中',true,taskName,'','成功','失败')
      }else if(str=="toBD"){
        this.orderAuditMethod('加载中',false,taskName,'','成功','失败')
      }else{
        this.orderAuditMethod('加载中','','','','成功','失败')
      }
    },

    //获取佣金详情
    getCommissionDetails(id){
      this.fullscreenLoading = true;
        getCommission(id).then(res=>{
            this.fullscreenLoading = false;
            if(res.code===200){
                console.log(res)
                this.commissionStatus = true;
                this.viewCommissionData = res.data
            }else{
                this.$message.error(res.msg);
            }
        }).catch(e=>{
          this.fullscreenLoading = false;
        })
    },
    commissionSubmitComfirm(params){
      var taskName = this.CommissionProcessNow(params.nodeName);
      this.$prompt('请输入审核意见', '提示', {
        confirmButtonText: '确认通过',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        if(!value){//如果没有输入任何信息 意见默认为同意
          value="同意"
        }
        this.commissionAuditMethod('佣金审核中',true,taskName,value,'审核成功','审核失败')
      }).catch(() => {
              
      });
    },

    commissionSubmitCancel(params){
      var taskName = this.CommissionProcessNow(params.nodeName);
      this.$prompt('请输入驳回意见', '提示', {
        confirmButtonText: '确认驳回',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        if(!value){//如果没有输入任何信息 意见默认为同意
          value="不同意"
        }
        this.commissionAuditMethod('佣金驳回中',false,taskName,value,'驳回成功','驳回失败')
      }).catch(() => {
              
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
  }
};
</script>
<style>
.viewOrder .el-drawer__body{
    overflow: auto;
}
</style>