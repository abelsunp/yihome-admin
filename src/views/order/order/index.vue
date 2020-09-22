<template>
  <div class="app-container" v-loading.lock="fullscreenLoading" :style= "{backgroundColor:addOrderDrawer?'#EFF2F5':'#fff'}">
    <!-- 新增修改 -->
    <div v-show="addOrderDrawer" class="addWrapper">
        <div class="top">
            <h1 style="line-height:32px;">{{drawerTitle}}</h1>
            <el-button style="width:60px;height:32px;" size="mini" @click="addOrderDrawer=false">关闭</el-button>
        </div>
        <div class="content" v-if="addOrderDrawer">
          <add-order :edit-status="editStatus" :order-alldata="currentOrderData" :show-this-dom="true" ref="orderInformation" style="position:relative;height:74vh;min-height:518px;"></add-order>
        </div>
        <div style="text-align:right;">
          <el-button @click="addOrderDrawer = false">取 消</el-button>
          <el-button type="primary" @click="submitOrder" :loading="buttonLoading">{{ buttonLoading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
    </div>

    <div v-show="!addOrderDrawer">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px" class="my-ruleForm">
      <el-form-item label="订单编号" prop="number">
        <el-input v-model="queryParams.number" placeholder="请输入订单标号" clearable size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> 
      <el-form-item label="开始时间" prop="startDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.startDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="endDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.endDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择结束时间">
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="总天数" prop="days">
        <el-input
          v-model="queryParams.days"
          placeholder="请输入总天数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="付款周期" prop="payWay">
        <el-select v-model="queryParams.payWay" placeholder="请选择付款周期" clearable size="small">
          <el-option
            v-for="item in PAYWAY"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="付款方式" prop="payType">
        <el-select v-model="queryParams.payType" placeholder="请选择付款方式" clearable size="small">
          <!-- <el-option
            v-for="item in PAYTYPE"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option> -->
          <el-option label="天" value="3"></el-option>
          <el-option label="周" value="1"></el-option>
          <el-option label="月" value="2"></el-option>
          <el-option label="季" value="4"></el-option>
          <el-option label="年" value="5"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="租金" prop="rent">
        <el-input
          v-model="queryParams.rent"
          placeholder="请输入租金"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="货币类型" prop="symbol">
        <el-select v-model="queryParams.symbol" placeholder="请选择货币类型"  clearable size="small">
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
      
      <!-- <el-form-item label="推荐返现" prop="isRecommended">
        <el-select v-model="queryParams.isRecommended" placeholder="请选择有无推荐返现" clearable size="small">
          <el-option label="有" value="1" />
          <el-option label="没有" value="2" />
        </el-select>
      </el-form-item> -->
      
      <!-- <el-form-item label="订单状态" prop="isDeleted">
        <el-select v-model="queryParams.isDeleted" placeholder="请选择状态" clearable size="small">
          <el-option label="有效" value="1" />
          <el-option label="无效" value="0" />
        </el-select>
      </el-form-item> -->

      <el-form-item label="用户名称" prop="userName">
        <el-input v-model="queryParams.userName" placeholder="请输入用户名称" clearable size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="房源名称" prop="houseName">
        <el-input v-model="queryParams.houseName" placeholder="请输入房源名称" clearable size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单间名称" prop="roomName">
        <el-input v-model="queryParams.roomName" placeholder="请输入单间名称" clearable size="small"
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['order:order:add']"
        >新增</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['order:order:edit']"
        >编辑</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['order:order:remove']"
        >删除</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['order:order:export']"
        >导出</el-button>
      </el-col> -->
    </el-row>
    

    <el-table @cell-click="cellClick" v-loading="loading" :data="orderList" @selection-change="handleSelectionChange" highlight-current-row >
      <el-table-column type="selection" width="55" align="center" fixed class-name="same-color"/>
      <el-table-column label="订单编号" align="center" prop="number" class-name="same-color" width="130" :show-overflow-tooltip="true" fixed/>
      <el-table-column label="开始时间" align="center" prop="startDate" width="130" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ myparseTime(scope.row.startDate) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center" prop="endDate" width="130" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ myparseTime(scope.row.endDate) }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="总天数" align="center" prop="days" /> -->
      <!-- <el-table-column label="付款周期" align="center" prop="payWay">
        <template slot-scope="scope">
          <span v-for="item in PAYWAY" :key="item.id">{{scope.row.payWay==item.id?item.name:''}}</span>
        </template> 
      </el-table-column> -->


      <!-- <el-table-column label="付款方式" align="center" prop="payType" >
        <template slot-scope="scope"> -->
          <!-- <span v-for="item in PAYTYPE" :key="item.id">{{scope.row.payType==item.id?item.name:''}}</span> -->

          <!-- <span v-if="scope.row.payType==3">天</span>
          <span v-if="scope.row.payType==1">周</span>
          <span v-if="scope.row.payType==2">月</span>
          <span v-if="scope.row.payType==4">季</span>
          <span v-if="scope.row.payType==5">年</span>
          



        </template>
      </el-table-column> -->
      <!-- <el-table-column label="租金" align="center" prop="rent" /> -->
      <!-- <el-table-column label="货币类型" align="center" prop="symbol" /> -->



      <el-table-column label="货币类型" align="center" prop="symbol"  width="190" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span v-for="item in currencyTypeData" :key="item.id">
            {{ scope.row.symbol==item.id?item.currencyType+"（"+item.currencySymbol+"）":'' }}
          </span>
        </template>
      </el-table-column>


      <!-- <el-table-column label="订单金额" align="center" prop="amount" />
      <el-table-column label="服务费" align="center" prop="serviceAmount" />
      <el-table-column label="优惠总金额" align="center" prop="preferentialAmount" />
      <el-table-column label="定金" align="center" prop="depositAmount" />
      <el-table-column label="押金" align="center" prop="mortgageAmount" />
      <el-table-column label="学生返现" align="center" prop="studentAmount" />
      <el-table-column label="活动优惠" align="center" prop="activityAmount" /> -->
      <!-- <el-table-column label="有无推荐返现" align="center" prop="isRecommended" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.isRecommended=='1'?'有':'没有'}}</span>
        </template>
      </el-table-column> -->

      <!-- <el-table-column label="推荐返现金额" align="center" prop="recommendedAmount" />
      <el-table-column label="动态状态 审核流" align="center" prop="status" />
      <el-table-column label="备注" align="center" prop="remark" /> -->
      
      <!-- <el-table-column label="订单状态" align="center" prop="isDeleted" >
        <template slot-scope="scope">
          <span>{{scope.row.isDeleted=='1'?'有效':'无效'}}</span>
        </template>
      </el-table-column> -->

      <el-table-column label="订单状态" align="center" prop="status" >
        <template slot-scope="scope">
          <span>{{scope.row.status=='0'?'订单办理中':scope.row.status=='1'?'订单完成':scope.row.status=='2'?'供应商佣金结算中':scope.row.status=='3'?'供应商佣金结算完成':scope.row.status=='4'?'内部佣金结算中':scope.row.status=='6'?'已入住':scope.row.status=='7'?'未入住':''}}</span>
        </template>
      </el-table-column>
      <el-table-column label="佣金方式" align="center" prop="commissionType" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>
            {{scope.row.commissionType=='1'?'无佣金':scope.row.commissionType=='2'?'固定佣金':scope.row.commissionType=='3'?'固定周租金':scope.row.commissionType=='4'?'固定利率':scope.row.commissionType=='5'?'动态租金':scope.row.commissionType=='6'?'手动计算佣金':''}}</span>
        </template>
      </el-table-column>


      <el-table-column label="流程状态" align="center" prop="taskName" width="200" fixed="right" class-name="small-padding fixed-width same-color" >
        <template slot-scope="scope">
          <span style="background-color: #1ab394;border-radius: 10px;padding:4px 6px;color:#fff;">{{ scope.row.taskName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width same-color" width="460px" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="handleView(scope.row)"
            v-hasPermi="['order:order:edit']"
          >查看</el-button>

          <span>
            <span v-if="scope.row.taskName=='发起人调整'">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
                v-hasPermi="['order:order:edit']"
              >编辑</el-button>
            </span>
            <span v-else>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                :disabled="scope.row.instanceId?true:false"
                :class="{examineClassStatus:scope.row.instanceId}"
                @click="handleUpdate(scope.row)"
                v-hasPermi="['order:order:edit']"
              >编辑</el-button>
            </span>
          </span>
          
          

      
          <el-button
            size="mini"
            type="text"
            :disabled="scope.row.instanceId?true:false"
            icon="el-icon-thumb"
            @click="handleExamine(scope.row)"
            :class="{examineClassStatus:scope.row.instanceId}"
            v-hasPermi="['order:order:edit']"
          >申请</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-data-analysis"
            @click="viewHistory(scope.row)"
            :class="{examineClassStatus:!scope.row.instanceId}"
            :disabled="scope.row.instanceId?false:true"
            v-hasPermi="['order:order:edit']"
          >审批历史</el-button> <!--  -->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-s-data"
            @click="approvalProcess(scope.row)"
            :class="{examineClassStatus:!scope.row.instanceId}"
            :disabled="scope.row.instanceId?false:true"
            v-hasPermi="['order:order:edit']"
          >审批流程</el-button> <!--   -->

          

          <!-- <span v-if="scope.row.status==3">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-data-analysis"
              @click="viewcommission(scope.row)"
              :class="scope.row.status==2||scope.row.status==0?'examineClassStatus':''"
              :disabled="scope.row.status==2||scope.row.status==0?true:false"
              v-hasPermi="['order:order:edit']"
            >佣金历史</el-button> 
          </span>
          <span v-if="scope.row.status==1&&scope.row.commissionType==1">
            
          </span> -->


          <span v-if="scope.row.status==3">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-data-analysis"
              @click="viewcommission(scope.row)"
              
              v-hasPermi="['order:order:edit']"
            >佣金历史</el-button> 
          </span>
          <span v-else-if="scope.row.status==6&&scope.row.commissionType==1">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-data-analysis"
              @click="viewcommission(scope.row)"
              v-hasPermi="['order:order:edit']"
            >佣金历史</el-button> 
          </span>


          <span v-else>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-data-analysis"
              @click="viewcommission(scope.row)"
              class="examineClassStatus"
              disabled
              v-hasPermi="['order:order:edit']"
            >佣金历史</el-button> 
          </span>

          <!--status=6并且commissionType=1时可计算佣金        或者 status=3时 可直接计算佣金     佣金历史-->

          <!-- <span v-if="scope.row.status!=3&&scope.row.commissionType!=1">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-data-analysis"
              @click="viewcommission(scope.row)"
              :class="scope.row.status==2||scope.row.status==0?'examineClassStatus':''"
              :disabled="scope.row.status==2||scope.row.status==0?true:false"
              v-hasPermi="['order:order:edit']"
            >佣金历史</el-button> 
          </span> -->

          <el-button
            size="mini"
            type="text"
            icon="el-icon-s-check"
            @click="houseCheckIn(scope.row)"
            :class="scope.row.status!=1?'examineClassStatus':''"
            :disabled="scope.row.status!=1?true:false"
            v-hasPermi="['order:order:edit']"
          >确认入住</el-button> 

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

    <!-- 新增或修改订单 -->
    <!-- <el-drawer
      :title="drawerTitle"
      :visible.sync="addOrderDrawer"
      custom-class="addOrderWrapper"
      direction="ttb">
      <div class="user-wrapper" v-if="addOrderDrawer">
        <add-order :edit-status="editStatus" :order-alldata="currentOrderData" :show-this-dom="true" ref="orderInformation" style="position:relative;height:88vh;min-height:88vh;"></add-order>
        <div class="demo-drawer__footer" style="text-align:right;padding-right:16px;padding-bottom:32px;">
            <el-button @click="addOrderDrawer = false">取 消</el-button>
            <el-button type="primary" @click="submitOrder" :loading="buttonLoading">{{ buttonLoading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
      
    </el-drawer> -->


    <!-- 查看当前订单 -->
    <el-drawer
      :title="viewOrderTitle"
      size="800px"
      :visible.sync="viewOrderStatus"
      custom-class="viewOrder">
      <div>
        <view-order :view-data="viewOrderData"></view-order>
      </div>
    </el-drawer>


    <el-dialog :title="historyTitle" :visible.sync="historyStatus">
      <el-table :data="gridData">
        <el-table-column prop="activityName" label="当前任务名称" ></el-table-column>
        <el-table-column label="审核人" prop="assigneeName" >
          <template slot-scope="scope">
            <span v-for="item in systemUser" :key="item.userId">
              {{scope.row.assigneeName==item.userName?item.nickName:''}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="comment" label="审核意见" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="endTime" label="审核时间">
          <template slot-scope="scope">
            {{parseTime(scope.row.endTime)}}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog :title="processTitle" :visible.sync="processStatus">
      <div>
        <img style="width:100%;" :src="myStr" />
      </div>
    </el-dialog>


    <el-dialog title="佣金" :visible.sync="viewcommissionStatus">
      <span slot="title" class="dialog-footer">
        <span>佣金</span>
        <el-button type="primary" v-if="gridData2.length>0" @click="getInner">获取佣金</el-button>
      </span>
      <el-table :data="gridData2" v-loading="gridData2Loading">
        <el-table-column prop="userId" label="用户ID" ></el-table-column>
        <!-- <el-table-column prop="userName" label="办理人" >
          <template slot-scope="scope">
            <span v-for="(item,$index) in systemUser" :key="$index">
              
              {{scope.row.userName==item.userName?item.nickName:''}}
            </span>
          </template>
        </el-table-column> -->

        <el-table-column prop="userName" label="办理人" ></el-table-column>

        <el-table-column prop="role" label="角色" ></el-table-column>
        <el-table-column prop="deptName" label="所属部门" ></el-table-column>
        <el-table-column prop="remark" label="订单状态" ></el-table-column>
        <el-table-column prop="updateTime" label="时间" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="status" label="佣金状态" >
         <template slot-scope="scope">
          <span>{{scope.row.status=='1'?'未结算':'已结算'}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="amount" label="金额(人民币)" >
          <template slot-scope="scope">
            <span v-if="scope.row.amount">{{scope.row.amount}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="是否入住" :visible.sync="checkInStatus" width="450px">
      <el-form :model="checkInForm" label-position="left" label-width="83px">
        
        <el-form-item label="入住状态：" prop="type">
          <el-select v-model="checkInForm.type" placeholder="请选择">
            <el-option label="已入住" value="1"></el-option>
            <el-option label="未入住" value="2"></el-option>
          </el-select>
        </el-form-item>

        <div v-if="checkInForm.type">
          <el-form-item :label="checkInForm.type==1?'优惠金额：':'返还金额：'" prop="amount">
            <el-input v-model.trim="checkInForm.amount" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        
      </el-form>
      <div>
        
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="checkInStatus = false">取 消</el-button>
        <el-button type="primary" @click="submitCheckIn">确 定</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
import { listOrder, getOrder, delOrder, addOrder, updateOrder, exportOrder,orderSubApply,orderHistory,orderReadResource,orderRoleList,orderInnerMoney,comfirmCheckIn } from "@/api/order/order";

import { listCountry } from '@/api/home/country'

import { listUser } from "@/api/system/user"





import AddOrder from "@/components/Order"
import ViewOrder from "@/components/Order/view"
export default {
  name: "order",
  components:{
    AddOrder,
    ViewOrder
  },
  data() {
    return {
      myStr:'',
      historyStatus:false,
      gridData:[],
      viewcommissionStatus:false,
      gridData2:[],
      gridData2Loading:false,
      historyTitle:'',
      processTitle:'',
      processStatus:false,


      fullscreenLoading:false,
      viewOrderTitle:'',
      viewOrderStatus:false,
      viewOrderData:{},
      editStatus:false,
      buttonLoading:false,
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
      // 订单表格数据
      orderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        number:undefined,
        startDate: undefined,
        endDate: undefined,
        days: undefined,
        payWay: undefined,
        payType: undefined,
        rent: undefined,
        symbol: undefined,
        amount: undefined,
        serviceAmount: undefined,
        preferentialAmount: undefined,
        depositAmount: undefined,
        mortgageAmount: undefined,
        studentAmount: undefined,
        activityAmount: undefined,
        isRecommended: undefined,
        recommendedAmount: undefined,
        status: undefined,
        isDeleted: undefined,
        roomName: undefined,
        houseName: undefined,
        userName: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        status: [
          { required: true, message: "动态状态 审核流不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "修改时间不能为空", trigger: "blur" }
        ]
      },

      currencyTypeData:[],//货币类型
      drawerTitle:'',
      addOrderDrawer:false,

      PAYTYPE:[],//付款方式
      PAYWAY:[],//付款周期

      currentOrderData:{},//当前订单信息
      systemUser:[],

      checkInStatus:false,

      checkInForm:{
        type:undefined,
        amount:undefined
      }
    };
  },
  created() {
    this.getList();
    // localStorage.setItem("YIHOME_user_type",JSON.stringify(response.data))
    var payData = JSON.parse(localStorage.getItem("YIHOME_user_type"));
    payData.forEach(element => {
      if(element.parentId==24){
        this.PAYWAY.push(element)
      }
      if(element.parentId==18){
        this.PAYTYPE.push(element)
      }
    });

    if(this.$route.query.number){
      this.queryParams.number = this.$route.query.number
    }
    if(this.$route.query.id){
      this.queryParams.id = this.$route.query.id
    }
    listUser().then(res=>{
      this.systemUser = res.rows;
    })

  },
  methods: {
    // 确认入住
    houseCheckIn(row){
      console.log(row)
      this.checkInForm = {
        type:undefined,
        amount:undefined,
        orderId:row.id
      }
      
      this.checkInStatus = true;


      
    },
    submitCheckIn(){
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      if(!this.checkInForm.amount){
        this.checkInForm.amount="0";
      }
      comfirmCheckIn(this.checkInForm).then(res=>{
        loading.close();
        if(res.code===200){
          this.checkInStatus = false;
          this.msgSuccess('状态修改成功');
          this.getList();
        }else{
          this.msgError(res.msg)
        }
      }).catch(e=>{
        loading.close();
      })
    },
    getInner(){
      const loading = this.$loading({
          lock: true,
          text: '加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      let orderId = this.gridData2[0].orderId;
      orderInnerMoney({'orderId':orderId}).then(res=>{
        loading.close();
        if(res.code===200){

          this.gridData2Loading = true;
          orderRoleList({'orderId':orderId}).then(res=>{
            this.gridData2Loading = false;
            if(res.code===200){
              this.gridData2 = res.rows;
            }else{
              this.msgError(res.msg)
            }
          }).catch(e=>{
            this.gridData2Loading = false;
          })
          
        }else{
          this.msgError(res.msg)
        }
      }).catch(e=>{
        loading.close();
      })
    },
    viewcommission(row){
      
      this.loading = true;
      orderRoleList({orderId:row.id}).then(res=>{
        this.loading = false;
        if(res.code===200){
          this.viewcommissionStatus = true;
          this.gridData2 = res.rows;
        }else{
          this.msgError(res.msg)
        }
      }).catch(e=>{
        this.loading = false;
      })


    },


    //订单审核
    handleExamine(row){

      this.$confirm('是否确认申请当前订单编号为<strong>'+row.number +'</strong>的订单', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        this.fullscreenLoading = true;
        // type   2销售订单
        orderSubApply({id:row.id,type:2}).then(res=>{
          this.fullscreenLoading = false;
          if(res.code===200){
            this.$message({ message: '申请成功', type: 'success' });
            this.getList();
          }else{
            this.$message.error('申请失败');
          }
        }).catch(error=>{
           this.fullscreenLoading = false;
          this.$message.error('申请失败');
        })
      }).catch(() => {
               
      });

      
    },
    //点击表格
    cellClick(row, column, cell, event){
      if(column.label=='操作'){
        return;
      }

      const loading = this.$loading({
        lock: true,
        text: '订单信息加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      getOrder(row.id).then(res=>{
        loading.close();
        if(res.code===200){
          this.viewOrderData = res.data;
          this.viewOrderTitle = '当前订单编号/'+res.data.order.number
          this.viewOrderStatus = true;
        }else{
          this.$message.error(res.msg);
        }
      })
    },
    handleView(row){
      const loading = this.$loading({
        lock: true,
        text: '订单信息加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      getOrder(row.id).then(res=>{
        loading.close();
        if(res.code===200){
          this.viewOrderData = res.data;
          this.viewOrderTitle = '当前订单编号/'+res.data.order.number
          this.viewOrderStatus = true;
        }else{
          this.$message.error(res.msg);
        }
      })
    },
    submitOrder(){
        
        var orderStatus = this.$refs.orderInformation.$refs.orderInfo.submitForm()
        if(!orderStatus){
            this.$message({
                message: '请填写订单信息',
                type: 'warning'
            });
            return;
        }

        if(this.$refs.orderInformation.$refs.orderUser.userList.length==0){
            this.$message({
                message: '请选择关联用户',
                type: 'warning'
            });
            return;
        }

        if(this.$refs.orderInformation.$refs.orderHouse.userList.length==0){
            this.$message({
                message: '请选择关联房源',
                type: 'warning'
            });
            return;
        }
        if(!this.editStatus){//新增
          if(this.$refs.orderInformation.$refs.orderInfo.ruleForm.predictServiceAmount=="0"){

          }else{
            if(!this.$refs.orderInformation.$refs.orderInfo.ruleForm.predictServiceAmount){
            this.$message({
                message: '请选择点击获取预付服务费',
                type: 'warning'
            });
            return;
          }
          }
          
        }
        

        let obj ={
          order:this.$refs.orderInformation.$refs.orderInfo.ruleForm,
          orderRooms:this.$refs.orderInformation.$refs.orderHouse.userList,
          orderUsers:this.$refs.orderInformation.$refs.orderUser.userList
        } 

        this.buttonLoading = true;
        //判断当前为新增提交还是订单修改
        if(this.editStatus){//修改
          updateOrder(obj.order).then(response => {
            this.buttonLoading = false;
            if(response.code==200){
              this.addOrderDrawer = false;
              this.getList();
            }else{
              this.msgError(response.msg);
            }
          }).catch(e=>{
            this.buttonLoading = false;
          })
        }else{

          updateOrder(obj.order).then(response => {
            this.buttonLoading = false;
            if(response.code==200){
              this.addOrderDrawer = false;
              this.getList();
            }else{
              this.msgError(response.msg);
            }
          }).catch(e=>{
            this.buttonLoading = false;
          })



          // addOrder(obj).then(res=>{
          //   this.buttonLoading = false;
          //   if(res.code==200){
          //     this.addOrderDrawer = false;
          //     this.getList();
          //   }else{
          //     this.msgError(res.msg);
          //   }
          // }).catch(e=>{
          //   this.buttonLoading = false;
          // })
        }
    },
    /** 查询订单列表 */
    getList() {
      this.loading = true;
      listOrder(this.queryParams).then(response => {
        this.orderList = response.data.list;
        this.total = response.data.total;
        this.loading = false;
      }).catch(e=>{
        this.loading = false;
      })

      //获取货币类型
      listCountry().then(res=>{
        this.currencyTypeData = res.rows;
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
        startDate: undefined,
        endDate: undefined,
        days: undefined,
        payWay: undefined,
        payType: undefined,
        rent: undefined,
        symbol: undefined,
        amount: undefined,
        serviceAmount: undefined,
        preferentialAmount: undefined,
        depositAmount: undefined,
        mortgageAmount: undefined,
        studentAmount: undefined,
        activityAmount: undefined,
        isRecommended: undefined,
        recommendedAmount: undefined,
        status: undefined,
        remark: undefined,
        isDeleted: undefined,
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
      //this.queryParams.number = undefined
      this.resetForm("queryForm");
      
      this.$router.push({path:'/Order/order'})
      this.queryParams.number = undefined
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
        //   this.title = "添加订单";
        this.addOrderDrawer = true;
        this.drawerTitle = "新增订单"
        this.currentOrderData = undefined;

        this.editStatus = false;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      // this.reset();
      const id = row.id || this.ids
      // getOrder(id).then(response => {
      //   this.form = response.data;
      //   this.open = true;
      //   this.title = "修改订单";
      // });
      const loading = this.$loading({
        lock: true,
        text: '订单信息加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      getOrder(id).then(res=>{
        loading.close();
        if(res.code===200){
          this.addOrderDrawer = true;
          this.drawerTitle = "订单修改";
          res.data.order.payType = parseInt(res.data.order.payType)
          
          this.currentOrderData = res.data;

          this.editStatus = true;
          //保存当前点击的订单ID
          localStorage.setItem('currentClickOrderId',JSON.stringify(id))
        }else{
          this.$message.error(res.msg);
        }
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateOrder(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addOrder(this.form).then(response => {
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
      this.$confirm('是否确认删除订单编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delOrder(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有订单数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportOrder(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    },
    //审批历史
    viewHistory(row){
      this.loading = true;
      orderHistory({instanceId:row.instanceId}).then(res=>{
        this.loading = false;
        if(res.code===200){
          this.historyTitle = '订单编号：'+row.number+' 审批历史';
          this.gridData = res.rows.reverse();
          this.historyStatus = true;
        }else{
          this.msgError(res.msg)
        }
      }).catch(e=>{
        this.loading = false;
      })
    },
    //审批流程
    approvalProcess(row){
      this.loading = true;
      orderReadResource({pProcessInstanceId:row.instanceId}).then(res=>{
        this.loading = false;
        const src = window.URL.createObjectURL(res)//这里也是关键,调用window的这个方法URL方法  并且在api中添加 responseType:'blob'
        this.myStr = src;
        console.log(src)
        this.processTitle = '订单编号：'+row.number+' 审批流程';
       this.processStatus = true;
      }).catch(e=>{
        console.log(e)
        this.loading = false;
      })
    }
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
.el-table--medium th, .el-table--medium td{
  padding: 4px 0;
}
  .addOrderWrapper{
     height: 100vh !important;
  }
  .addOrderWrapper .el-drawer__body{
   overflow: auto;
   background: #eff3f5;
  }
  .recordWrapper .el-drawer__body{
    overflow: auto;
  }
  .addOrderWrapper .el-drawer__body .user-wrapper{
    /* margin: 16px; */
    min-height: 95%;
    /* background-color: #fff;
    border-radius: 4px; */
    position: relative;
  }
  
  .addOrderWrapper .el-drawer__header,.recordWrapper .el-drawer__header{
    margin-bottom: 20px;
  }
  .viewOrder .el-drawer__body{
    overflow: auto;
  }
  .examineClassStatus{
    color: #ddd !important;
  }
  .my-ruleForm .el-form-item{
    margin-bottom: 6px;
  }
</style>