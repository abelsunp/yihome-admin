<template>
    <div v-loading="loading">
        
        <el-steps :active="stepActive" finish-status="success" align-center>
            <el-step title="佣金信息"></el-step>
            <el-step title="订单选择"></el-step>
            <el-step title="预览"></el-step>
        </el-steps>
        <div class="step-container">
            <!-- <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update($event)"/>
            <el-upload
                class="upload-demo"
                ref="signatureUpload"
                :action="uploadImgUrl"
                :before-upload="beforeUpload"
                :headers="headers"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            
            </el-upload> -->
            <!-- <canvas style="z-index:9999" width="800" height="600"></canvas>
            <p @click="clear" >重画</p>
            <p @click="toImg">转化</p> -->
            <div v-show="stepActive==1" style="max-width:800px;margin:0 auto;">
                <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                    
                    <el-form-item label="供应商" prop="supplierId">
                        <el-select v-model="form.supplierId" :disabled="!this.editStatus" placeholder="请选择或搜索供应商" filterable clearable style="width:100%;" @change="supplierChange">
                            <el-option
                                v-for="item in suppliderDataList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id+','+item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <!-- <el-form-item label="订单编号" prop="invoiceNo">
                        <el-select v-model="form.invoiceNo" placeholder="请选择供应商后选择订单" multiple  clearable style="width:100%;">
                            <el-option
                                v-for="item in OrderDataList"
                                :key="item.id"
                                :label="item.number"
                                :value="item.id">
                                <span style="float: left">订单编号：{{ item.number }}</span>
                                <span style="float: left;">用户名称：{{ item.userName }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item> -->

                    <el-form-item label="公司名称" prop="companyName">
                        <el-input v-model.trim="form.companyName" placeholder="请输入公司名称" clearable/>
                    </el-form-item>
                    <el-form-item label="公司地址" prop="companyAddress">
                        <el-input v-model.trim="form.companyAddress" placeholder="请输入公司地址" clearable/>
                    </el-form-item>
                    <el-form-item label="公司电话" prop="tel">
                        <el-input v-model.trim="form.tel" placeholder="请输入公司电话" clearable/>
                    </el-form-item>
                    <el-form-item label="email" prop="emial">
                        <el-input v-model.trim="form.emial" placeholder="请输入email" clearable/>
                    </el-form-item>
                    <!-- <el-form-item label="供应商名称" prop="billTo">
                    <el-input v-model="form.billTo" placeholder="请输入供应商名称" />
                    </el-form-item> -->
                    <el-form-item label="订单发起日期" prop="issueDate">
                        <el-date-picker clearable  style="width: 100%"
                            v-model="form.issueDate"
                            type="date"
                            :picker-options="pickerOptions"
                            value-format="yyyy-MM-dd"
                            @change="issueDateTimeChange"
                            placeholder="选择订单发起日期">
                        </el-date-picker>
                    </el-form-item>
                    
                    <el-form-item label="截止付款日期" prop="paymentDue">
                        <el-date-picker clearable style="width: 100%"
                            v-model="form.paymentDue"
                            type="date"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerOptions2"
                            placeholder="选择截止付款日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="收款银行名称" prop="bankName">
                        <el-input v-model.trim="form.bankName" placeholder="请输入收款银行名称" clearable/>
                    </el-form-item>
                    <el-form-item label="账号名称" prop="accountName">
                        <el-input v-model.trim="form.accountName" placeholder="请输入账号名称" clearable/>
                    </el-form-item>
                    <el-form-item label="银行地址" prop="bankAddress">
                        <el-input v-model.trim="form.bankAddress" placeholder="请输入银行地址" clearable/>
                    </el-form-item>
                    <el-form-item label="账号" prop="accountNumber">
                        <el-input v-model.trim="form.accountNumber" placeholder="请输入账号" clearable/>
                    </el-form-item>
                    <el-form-item label="银行代码" prop="swiftCode">
                        <el-input v-model.trim="form.swiftCode" placeholder="请输入银行代码" clearable/>
                    </el-form-item>
                    <!-- <el-form-item label="付款参考" prop="paymentReference">
                        <el-input v-model="form.paymentReference" placeholder="请输入付款参考" />
                    </el-form-item> -->
                    <el-form-item label="受益人银行代码" prop="beneficiaryBankCode">
                        <el-input v-model.trim="form.beneficiaryBankCode" placeholder="请输入受益人银行代码" clearable/>
                    </el-form-item>





                    <el-form-item label="签名" prop="signature" class="signatureName">
                        <div class="boardBox" ref="boardBox">
                            <canvas width="680" height="300" ref="board" @mousedown="pcStart" @mousemove="pcMove" @mouseup="pcEnd"> </canvas>
                        </div>
                        <el-button v-if="editStatus" size="mini" type="primary" @click="clear">重新签名</el-button>


                        <!-- <el-alert
    title="测试环境不需要签名"
    type="info">
  </el-alert> -->
                        <!-- <el-button size="mini" type="primary" @click="toImg">生成图片</el-button>

                        <el-button size="mini" type="primary" @click="test">赋值图片</el-button> 

                        <el-button size="mini" type="primary" @click="imageUrlToBase64('https://inyihome.com/img/test.png')">网络图片转base64</el-button> -->



                        <!-- <div>
                            <el-button size="mini" type="primary" @click="judge">判断canvas是否存在数据</el-button>

                            <el-button  type="primary" size="mini"  @click="submitUpload">上传到服务器</el-button>  
                        </div> -->

                    </el-form-item>

                    <!-- <el-form-item label="注解" prop="note">
                    <el-input v-model="form.note" placeholder="请输入注解" />
                    </el-form-item>
                    <el-form-item label="签名图片" prop="signature">
                    <el-input v-model="form.signature" placeholder="请输入签名图片" />
                    </el-form-item> -->
                    <!-- <el-form-item label="实际总金额" prop="totalAmount">
                    <el-input v-model="form.totalAmount" placeholder="请输入实际总金额" />
                    </el-form-item>
                    <el-form-item label="预估计算总金额" prop="predictAmount">
                    <el-input v-model="form.predictAmount" placeholder="请输入预估计算总金额" />
                    </el-form-item>
                    <el-form-item label="状态 1有效 2无效">
                    <el-radio-group v-model="form.status">
                        <el-radio label="1">请选择字典生成</el-radio>
                    </el-radio-group>
                    </el-form-item> -->
                    <!-- <el-form-item label="申请人" prop="applyUser">
                    <el-input v-model="form.applyUser" placeholder="请输入申请人" />
                    </el-form-item> -->
                    <!-- <el-form-item label="申请时间" prop="applyTime">
                        <el-date-picker clearable size="small" style="width: 200px"
                            v-model="form.applyTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择申请时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="实际开始时间" prop="realityStartTime">
                        <el-date-picker clearable size="small" style="width: 200px"
                            v-model="form.realityStartTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择实际开始时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="实际结束时间" prop="realityEndTime">
                        <el-date-picker clearable size="small" style="width: 200px"
                            v-model="form.realityEndTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择实际结束时间">
                        </el-date-picker>
                    </el-form-item> -->
                </el-form>
            </div>
            <div v-show="stepActive==2">
                <p>请选择结算的订单</p>

                <el-alert
                    v-if="!this.editStatus"
                    title="提示！如何是点击编辑 现目前只可以编辑第一步的基本信息  因为之前新增的时候已经把完成的订单绑定给当前佣金订单 不可以更改  可直接点击下一步"
                    type="warning">
                </el-alert>


                <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
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
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                    </el-form-item>
                </el-form>
                <el-table empty-text="暂无可选择的数据" ref="multipleTable" :data="OrderDataList" @selection-change="handleSelectionChange" style="margin-bottom:24px;">
                    <el-table-column type="selection" width="55" align="center" />
                    <el-table-column label="订单编号" align="center" prop="number" />

                    <el-table-column label="货币类型" align="center" prop="symbol">
                        <template slot-scope="scope">
                            <span v-for="item in currencyTypeData" :key="item.id">
                                {{item.id==scope.row.symbol?item.currencyType+'('+ item.currencySymbol +')':''}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="房源名称" align="center" prop="houseName" :show-overflow-tooltip="true"/>
                   
                    <el-table-column label="单间名称" align="center" prop="roomName" :show-overflow-tooltip="true"/>
                    
                    <el-table-column label="用户名称" align="center" prop="userName" :show-overflow-tooltip="true"/>
                    
                    <el-table-column label="佣金方式" align="center" prop="commissionType" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                        <span>
                            {{scope.row.commissionType=='1'?'无佣金':scope.row.commissionType=='2'?'固定佣金':scope.row.commissionType=='3'?'固定周租金':scope.row.commissionType=='4'?'固定利率':scope.row.commissionType=='5'?'动态租金':scope.row.commissionType=='6'?'手动计算佣金':''}}</span>
                        </template>
                    </el-table-column>
                
                </el-table>
                <!-- <pagination
                    v-show="total>0"
                    :total="total"
                    :page.sync="queryParams.pageNum"
                    :limit.sync="queryParams.pageSize"
                    @pagination="getList"
                /> -->
            </div>

            <div v-show="stepActive==3">
                <div class="table_container">
                    <div class="header">
                        <div class="header_top">
                            <div class="left">
                                <h3 style="font-size:16px;">From:{{this.form.accountName}}</h3>
                                <h3 style="font-size:14px;">Company Address:{{this.form.companyAddress}}</h3>
                                <h3 style="font-size:14px;">TEL:{{this.form.tel}}</h3>
                                <h3 style="font-size:14px;">Email:{{this.form.emial}}</h3>
                            </div>
                            <div class="right">
                                <h3 style="font-size:14px;">Issue Date:{{this.form.issueDate}}</h3>
                                <h3 style="font-size:14px;">Invoice No:{{this.form.companyAddress}}</h3>
                                <h3 style="font-size:14px;">Payment Due:{{this.form.paymentDue}}</h3>
                            </div>
                        </div>
                        <div class="header_title"><h1>Commission</h1><h1>Invoice</h1></div>
                    </div>
                    
                    <div class="main">
                        <div class="title">
                            <h3>Bill To: UniLodge City Gardens</h3>
                        </div>
                        <div class="table">
                            <el-table v-loading="tableLoading" :span-method="arraySpanMethod" sum-text="Total Commission Payable" :data="tableData" border show-summary :summary-method="getSummaries"  style="width: 100%"> <!-- :summary-method="getSummaries" -->
                                <el-table-column prop="supplierName" align="center" label="Property/公寓商"> </el-table-column>
                                <el-table-column prop="studentName" align="center" label="Student Name/学生姓名"> </el-table-column>
                                <el-table-column prop="roomType" align="center" label="Room Type/房型"> </el-table-column>
                                <el-table-column prop="contractStart" align="center" label="Contract Start/开始日期"> 
                                    <template slot-scope="scope">
                                        {{myparseTime2(scope.row.contractStart)}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="contractEnd" align="center" label="Contract End/结束日期">
                                    <template slot-scope="scope">
                                        {{myparseTime2(scope.row.contractEnd)}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="weeklyRate" align="center" label="Weekly Rate/周租金"> </el-table-column>

                                <el-table-column prop="totalNights" align="center" label="Total Nights/总天数"> </el-table-column>
                                <el-table-column prop="totalContractValue" align="center" label="Total Contract Value/总合同金额"> </el-table-column>

                                <el-table-column prop="commissionPercentage" align="center" label="Commission Percentage/佣金比例"> 
                                    <template slot-scope="scope">
                                        <!-- 手动计算佣金   -->
                                        <span v-if="!scope.row.commissionPercentage">
                                            <!-- <span style="color:#c33;">Fixed</span> -->

                                            <el-tooltip class="item" effect="dark" content="此订单为手动计算佣金，请输入正确的佣金" placement="top-start">
                                                <span style="color:#c33;">Fixed</span>
                                            </el-tooltip>
                                            <!-- <el-input v-model="myValue" placeholder="请输入内容"></el-input> -->
                                            
                                        </span>
                                        <span v-else>{{scope.row.commissionPercentage}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="arriveTotalCommission" align="center" label="Total Commission/总佣金"> </el-table-column>
                                <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                                    <template slot-scope="scope">
                                        <el-button
                                            size="mini"
                                            type="text"
                                            icon="el-icon-edit"
                                            @click="handleUpdate(scope.row)"
                                        >编辑</el-button>
                                        <el-button
                                            size="mini"
                                            type="text"
                                            icon="el-icon-delete"
                                            @click="handleDelete(scope.row)"
                                        >废弃</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>

                    <div class="footer">
                        <h3>Account Details:</h3> 
                        <h3>Bank Name：{{this.form.bankName}}</h3>
                        <h3>Account Name：{{this.form.accountName}}</h3>
                        <h3>Bank Address：{{this.form.bankAddress}}</h3>
                        <h3>Account Number：{{this.form.accountNumber}}</h3>
                        <h3>SWIFT Code：{{this.form.swiftCode}}</h3>
                        <h3>Payment reference:{{this.form.issueDate}}</h3>
                        <h3>Beneficiary Bank Code：{{this.form.beneficiaryBankCode}}</h3>
                        <h3 class="note">Note: Please send remittance advice to: {{this.form.email}}</h3>
                        <div style="border-top:1px solid #000;padding:20px 0px;display:flex;">
                            <span style="display:flex;align-items: center;">Signature：</span>
                            <span>
                                <img style="width:223px;" :src="this.form.signature" alt="">
                            </span>  
                        </div>
                    </div>
                </div>
            </div>

            <div class="buttonWrapper">
                <el-button type="primary" size="small"  v-show="stepActive==1" @click="next()">下一步</el-button>
                <!-- <el-button type="primary" size="small"  v-show="stepActive==2" @click="next()">第二个下一步</el-button> -->


                <el-button type="primary" size="small" v-show="stepActive==2&&tableData.length==0" @click="orderSubmit">提交</el-button>

                <el-button type="primary" size="small" v-show="stepActive==2&&tableData.length!=0" @click="skip()">下一步</el-button>
                
                <el-button size="small" :disabled="stepActive==1" v-show="stepActive==1||stepActive==2" @click="prev()">上一步</el-button>
                

                <el-button type="primary" size="small" v-show="stepActive==3" @click="finishSubmit">确定</el-button>
                <el-button size="small" v-show="stepActive==3" @click="prev2()">上一步</el-button>
            </div>
        </div>

        <el-dialog title="修改佣金" :visible.sync="dialogFormVisible" width="500px">
            <el-form :model="editForm" ref="editForm">
                <el-form-item label="Property/公寓商" prop="supplierName">
                    <el-input v-model="editForm.supplierName" autocomplete="off" disabled></el-input>
                </el-form-item>

                <el-form-item label="Student Name/学生姓名" prop="studentName">
                    <el-input v-model="editForm.studentName" autocomplete="off" disabled></el-input>
                </el-form-item>

                <el-form-item label="Room Type/房型" prop="roomType">
                    <el-input v-model="editForm.roomType" autocomplete="off" disabled></el-input>
                </el-form-item>

                <el-form-item label="Contract Start/开始日期" prop="contractStart">
                    <el-date-picker clearable  style="width: 100%"
                        v-model="editForm.contractStart"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择Contract Start/开始日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="Contract End/结束日期" prop="contractEnd">
                    <el-date-picker clearable  style="width: 100%"
                        v-model="editForm.contractEnd"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择Contract End/结束日期">
                    </el-date-picker>
                </el-form-item>



                <el-form-item label="Total Contract Value/总合同金额" prop="totalContractValue">
                    <el-input v-model="editForm.totalContractValue" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="Commission Percentage/佣金比例" prop="commissionPercentage">
                    <el-input v-model="editForm.commissionPercentage" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="Total Commission/总佣金" prop="arriveTotalCommission">
                    <el-input v-model="editForm.arriveTotalCommission" autocomplete="off"></el-input>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormSubmit">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
import {  
    getCommission,addCommission,orderCompanyInfo,updateCommission,
    addCommissionSuccesd,listSuccess,listSuccessDetails,updateSuccessDetails,loseSuccessOrder,
    getcommissionList
} from "@/api/commissionOrder/commissionOrder";
import { listSupplier } from "@/api/supplier";


 

import { listCountry } from '@/api/home/country'
import { scrollTo } from '@/utils/scroll-to'

import { getToken } from '@/utils/auth'
import Axios from 'axios';
export default {
    props:{
        currentStatus:{
            type:Boolean
        },
        currentData:{
            type:Object
        }
    },
    data(){
        return {
            
            fileList: undefined,
            uploadImgUrl: process.env.VUE_APP_UPLOAD_URL,
            headers: {
                Authorization: 'Bearer ' + getToken(),
                'Content-Type':'multipart/form-data',
            },
            dataparams: { 'supplierId': '999999999' },


            ctx: null,
            point: {
                x: 0,
                y: 0
            },
            moving: false,   // 是否正在绘制中且移动
            canvas:{},
            editStatus:this.currentStatus,
            editData:this.currentData,
            loading:false,
            stepActive:1,
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的 
                }
            },
            pickerOptions2: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的 
                }
            },
            // 表单参数
            form: {
                signature:'',
                accountName:'',
                accountNumber:'',
                bankAddress:'',
                bankName:'',
                beneficiaryBankCode:'',
                companyAddress:'',
                companyName:'',
                swiftCode:'',
                tel:'',
                billTo:'',
                supplierId:'',
                // issueDate:new Date(),
                // paymentDue:''
                issueDate:new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate()),
                paymentDue: new Date().getFullYear() + "-" + (new Date().getMonth() + 2) + "-" + (new Date().getDate()),
            },
            // 表单校验
            rules: {
                supplierId: [
                    { required: true, message: "请选择供应商", trigger: "change" }
                ],
                // invoiceNo: [
                //     { required: true, message: "请选择订单", trigger: "change" }
                // ],
                companyName: [
                    { required: true, message: "请输入公司名称", trigger: "blur" }
                ],
                companyAddress: [
                    { required: true, message: "请输入公司地址", trigger: "blur" }
                ],
                tel: [
                    { required: true, message: "请输入公司电话", trigger: "blur" }
                ],
                emial: [
                    { required: true, message: "请输入公司邮箱", trigger: "blur" },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                issueDate: [
                    { required: true, message: "请选择订单发起时间", trigger: "change" }
                ],
                paymentDue: [
                    { required: true, message: "请选择截止付款日期", trigger: "change" }
                ],
                bankName: [
                    { required: true, message: "请输入收款银行名称", trigger: "blur" }
                ],
                accountName: [
                    { required: true, message: "请输入账号名称", trigger: "blur" }
                ],
                bankAddress: [
                    { required: true, message: "请输入银行地址", trigger: "blur" }
                ],
                accountNumber: [
                    { required: true, message: "请输入账号", trigger: "blur" }
                ],
                swiftCode: [
                    { required: true, message: "请输入银行代码", trigger: "blur" }
                ],
                beneficiaryBankCode: [
                    { required: true, message: "请输入受益人银行代码", trigger: "blur" }
                ],
                // signature: [
                //     { required: true, message: "请签名", trigger: "blur" }
                // ],
            },
            suppliderDataList:[],//供应商数据
            OrderDataList:[],//订单数据
            currencyTypeData:[],
            ids:[],
            queryParams: {
                symbol: undefined,
                status:'6',
                supplierId:undefined,
                commissionType:'1'
            },
            total:0,
            tableData: [],
            tableLoading:false,
            dialogFormVisible:false,
            editForm:{},
            myImage:''
        }
    },
    computed: {
        timeDefault() {
            var date = new Date();
            var s1 = date.getFullYear() + "-" + (date.getMonth() + 2) + "-" + (date.getDate());
            return s1;
        }
    },
    
    watch:{
        currentStatus(newValue, oldValue){
            this.editStatus = newValue;
        },
        currentData(newValue, oldValue){
            this.editData = newValue;
        },

    },
    created(){

        this.tableData = []
        this.loading = true;
        listSupplier().then(res=>{
            this.loading = false;
            if(res.code===200){
                this.suppliderDataList = res.rows;
                //判断当前为新增还是修改
                if(this.editStatus){//新增
                    this.getCompanyInfo();
                }else{
                    this.editData.supplierId = this.editData.supplierId+','+this.editData.billTo;
                    this.form = this.editData;
                    this.imageUrlToBase64(this.editData.signature)
                }
            }else{
                this.msgError('供应商获取失败请重新添加或修改')
            }
        }).catch(e=>{
            this.loading = false;
        })
        listCountry().then(res=>{
            this.currencyTypeData = res.rows;
        })

        
    },
    mounted(){
        //this.form.paymentDue = this.timeDefault;
        setTimeout(()=>{
           
            $(".table_container .el-table__footer-wrapper tr td").each(function(index,item){
                if(index==0||index==8||index==9){
                    if(index==0){
                        $(item).attr("colspan","8");
                    }
                }else{
                    $(item).css("display","none")
                }
            });
            
        },100)
        this.start();
        // if(this.editStatus){//新增
        //     this.start();
        // }
        

    },
    methods:{
        update(file){
            
            // let file = e.target.files[0];       
            // console.log(file)    
            let param = new FormData(); //创建form对象
            param.append('file',file,file.name);//通过append向form对象添加数据     
            //param.append('chunk','0');//添加form表单中其他数据
            //console.log(param.get('tweetPic')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
            
            Axios.post(this.uploadImgUrl,param,{headers:this.headers}).then(response=>{
                
                if(response.data.code===200){
                    this.form.signature = this.serverImgUrl+response.data.fileName; 
                }else{

                }
            }).catch(e=>{
                this.msgError('签名照生成失败')
            })  
        },  
        isCanvasBlank(canvas) {
            var blank = document.createElement('canvas');
            blank.width = canvas.width;
            blank.height = canvas.height;
            return canvas.toDataURL() == blank.toDataURL();
        },
        judge(){
            
            if(this.isCanvasBlank(this.$refs.board)){
                console.log('没有内容')
            }else{
                console.log('有内容')
            }
        },
        start(){
            let board = this.$refs.board;   // 获取DOM
            board.width = this.$refs.boardBox.offsetWidth;  // 设置画布宽
            board.height = this.$refs.boardBox.offsetHeight;    // 设置画布高
            this.ctx = board.getContext('2d');   // 二维绘图
            this.ctx.strokeStyle = '#000';   // 颜色
            this.ctx.lineWidth = 2;  // 线条宽度
        },
        // 鼠标按下(开始)
        pcStart (e) {
            let x = e.offsetX, y = e.offsetY;   // 获取鼠标在画板（canvas）的坐标
            this.point.x = x;
            this.point.y = y;
            this.ctx.beginPath();
            this.moving = true;
        },
        // 鼠标移动（移动中...）
        pcMove (e) {
            if(this.moving) {
                let x = e.offsetX, y = e.offsetY;   // 获取鼠标在画板（canvas）的坐标
                this.ctx.moveTo(this.point.x, this.point.y);    // 把路径移动到画布中的指定点，不创建线条(起始点)
                this.ctx.lineTo(x, y);  // 添加一个新点，然后创建从该点到画布中最后指定点的线条，不创建线条
                this.ctx.stroke();  // 绘制
                this.point.x = x, this.point.y = y;   // 重置点坐标为上一个坐标
            }
        },
        // 鼠标松开（结束）
        pcEnd () {
            if(this.moving) {
                this.ctx.closePath();   // 停止绘制
                this.moving = false;    // 关闭绘制开关
            }
        },
        clear(){
            this.$refs.board.getContext("2d").clearRect(0,0,800,600)
        },
        toImg(){
            var image = new Image();
            this.myImage = this.$refs.board.toDataURL("image/png")
            image.src = this.$refs.board.toDataURL("image/png");

            this.dataURLtoFile( this.myImage,'signature.png')

            
            return image;
        },
        test(){
            var img = new Image();
            img.src=this.myImage;
            let myCanvas = this.$refs.board;
            myCanvas.getContext('2d').drawImage(img,0,0);

            
        },
        dataURLtoFile(dataurl, filename) {//将base64转换为文件，dataurl为base64字符串，filename为文件名（必须带后缀名，如.jpg,.png）
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
           
            this.fileList = new File([u8arr], filename, {type:mime});

            this.update(this.fileList)
            return new File([u8arr], filename, {type:mime});
        },
        // submitUpload(){
        //     this.update(this.fileList)
        // },
        imageUrlToBase64(httpUrl) {
			//一定要设置为let，不然图片不显示
			let image = new Image();
			//解决跨域问题
			image.setAttribute('crossOrigin', 'anonymous');
			let imageUrl = httpUrl;
			image.src = imageUrl
			let that = this;
			//image.onload为异步加载
			image.onload = () => {
				var canvas = this.$refs.board;
                canvas.width = image.width;
				canvas.height = image.height;
				canvas.getContext('2d').drawImage(image, 0, 0);
				
				//var quality = 0.8;
				//这里的dataurl就是base64类型
				var dataURL = canvas.toDataURL("image/png");//使用toDataUrl将图片转换成jpeg的格式,不要把图片压缩成png，因为压缩成png后base64的字符串可能比不转换前的长！
                
                this.myImage = dataURL;
			}
		},
        dialogFormSubmit(){
            console.log(this.editForm);
            updateSuccessDetails(this.editForm).then(res=>{
                if(res.code===200){
                    this.getTableData()
                    this.dialogFormVisible = false;
                }else{
                    this.msgError(res.msg)
                }
            })
        },
        resetEditForm() {
            this.editForm = {
                totalContractValue : undefined,
                totalCommission : undefined,
                contractEnd:undefined,
                contractStart:undefined
            };
            this.resetForm("editForm");
        },
        handleUpdate(row){
            this.resetEditForm()
            this.loading = true;
            listSuccessDetails(row.id).then(res=>{
                this.loading = false;
                if(res.code===200){
                    this.dialogFormVisible = true;
                    this.editForm = res.data;
                }else{
                    this.msgError(res.msg)
                }
            }).catch(e=>{
                this.loading = false;
            })
        },
        getSummaries(param){
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = 'Total Commission Payable';
                    return;
                }
                if (index === 8) {
                    sums[index] = 'Total';
                    return;
                }
                if (index === 9) {
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        sums[index] += ' ';
                    } else {
                        sums[index] = '';
                    }
                    return;
                }
            });

            return sums;
        },
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {

        },
        /** 搜索按钮操作 */
        handleQuery() {
            
            this.getList()
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.queryParams.symbol = undefined;
            this.getList()
           
        },
        issueDateTimeChange(val){
            console.log(val)
            
        },
        getTableData(id){
            this.tableLoading = true;
            listSuccess({orderCommissionId:id,status:1}).then(responend=>{
                this.tableLoading = false;
                this.tableData = responend.rows;
            }).catch(e=>{
                this.tableLoading = false;
            })
        },
        addSuccess(val){//新增编辑  
            let list = [];
            this.ids.forEach((item,index)=>{
               list.push({commissionId:val,orderId:item});
            })
            console.log(list)
            this.loading = true;
            addCommissionSuccesd(list).then(res=>{
                this.loading = false;
                if(res.code===200){
                    //进入最后一步
                    this.stepActive = 3;
                    this.getTableData(this.form.id)
                }else{
                    this.msgError(res.msg)
                    
                }
            }).catch(e=>{
                this.loading = false;
            })
        },
        orderSubmit(){
            if(this.ids.length==0){
                this.$message({  message: '请选择想要结算的订单',  type: 'warning' });
                return;
            };
            this.addSuccess(this.form.id);
        },
        handleSelectionChange(selection){
            this.ids = selection.map(item => item.id)
            console.log(this.ids)
        },
        reset(){
            this.form ={
                invoiceNo: undefined
            }
            this.resetForm("form");
        },
        supplierChange(val){
            
            this.form.invoiceNo = undefined;
            this.getOrderList(val)
        },
        getOrderList(val){

            
            
        },
        getCompanyInfo(){
            this.loading = true;
            orderCompanyInfo().then(res=>{
                this.loading = false;
                if(res.code===200){
                    this.form.accountName = res.data.account_name;
                    this.form.accountNumber = res.data.account_number;
                    this.form.bankAddress = res.data.bank_address;
                    this.form.bankName = res.data.bank_name;
                    this.form.beneficiaryBankCode = res.data.beneficiary_bank_code;
                    this.form.companyAddress = res.data.company_address;
                    this.form.companyName = res.data.company_name;
                    this.form.swiftCode = res.data.swift_code;
                    this.form.tel = res.data.tel;
                }else{
                    this.msgError(res.msg)
                }
            }).catch(e=>{
                this.loading = false;
            })
        },
        getList(){
            this.loading = true;
            getcommissionList(this.queryParams).then(res=>{
                this.loading = false;
                if(res.code===200){
                    this.OrderDataList = res.data;
                    //this.total = res.data.total;
                    this.stepActive=2;
                    scrollTo(0, 800);
                    //进入第二步如果是点击编辑按钮进来的 需要显示已经选择的订单
                    if(!this.editStatus){
                        listSuccess({orderCommissionId:this.form.id,status:1}).then(responend=>{
                            responend.rows.forEach(row=> {
                                this.OrderDataList.forEach(row2=>{
                                    if(row.id==row2.id){
                                        this.$refs.multipleTable.toggleRowSelection(row2,true)
                                    }
                                })
                            });
                        })
                    }
                }else{
                    this.msgError(res.msg)
                }
            }).catch(e=>{
                this.loading = false;
            })
        },
        next(){
            this.$refs['form'].validate((valid) => {
                if (valid) {

                    if(this.isCanvasBlank(this.$refs.board)){
                        this.msgError('请输入您的签名')
                        return;
                    }

                    //如果输入签名后 
                    /** 
                     * 1、生成图片
                     * 2、图片上传到服务器返回图片路径 赋值到this.form.signature
                     */

                    //判断新增还是编辑
                    if(this.editStatus){//新增

                        this.toImg();

                        this.loading = true;
                        this.form.billTo = this.form.supplierId.split(',')[1];
                        this.form.supplierId = this.form.supplierId.split(',')[0]
                        console.log(this.form);
                        // this.form.issueDate = this.myparseTime(this.form.issueDate)
                        addCommission(this.form).then(res=>{
                            this.loading = false;
                            if(res.code===200){
                                
                                this.queryParams.supplierId = this.form.supplierId.split(',')[0];
                                this.getList()//获取订单数据
                                this.form.id = res.data;
                                this.getTableData(res.data)
                            }else{
                                this.msgError(res.msg)
                            }
                        }).catch(e=>{
                            this.loading = false;
                        })
                    }else{
                        this.loading = true;
                        this.form.supplierId = this.form.supplierId.split(',')[0]
                        updateCommission(this.form).then(res=>{
                            this.loading = false;
                            if(res.code===200){

                                this.queryParams.supplierId = this.form.supplierId.split(',')[0];
                                this.getList()//获取订单数据
                                this.getTableData(this.form.id)

                            }else{
                                this.msgError(res.msg)
                            }
                        }).catch(e=>{
                            this.loading = false;
                        })
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
            
        },
        prev(){
            this.stepActive=1;
        },
        prev2(){

            this.stepActive=2;
        },
        finishSubmit(){
            this.$parent.addOrderDrawer=false;
            this.$parent.getList();
        },
        handleDelete(row){
            
            this.$confirm('是否取消当前订单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.loading = true;
                loseSuccessOrder({orderSuccessId:row.id}).then(res=>{
                    this.loading = false;
                    if(res.code===200){
                        this.getTableData(this.form.id)
                    }else{
                        this.msgError(res.msg)
                    }
                }).catch(e=>{
                    this.loading = false;
                })
            }).catch(() => {
                          
            });
        },
        skip(){

            this.getTableData(this.form.id)
            this.stepActive = 3;

        }
    }
}
</script>
<style scoped lang="scss">
    .boardBox{
        width: 100%;
        height: 300px;
        background: #eee;
        margin-bottom: 20px;
        canvas{
            border: 1px solid #298cff;
        }
    }
    .buttonWrapper{
        text-align: center;
    }
    .table_container{
        border: 2px solid #000;
        padding: 5px 0px;
        margin-bottom: 20px;
        margin-top: 20px;
        .header {
            .header_top{
                display: flex;
                justify-content: space-between;
                padding-bottom: 20px;
                h3{
                    margin: 0;
                }
            }
            .header_title{
                text-align: center;

                border-top: 1px solid #000;
                border-bottom: 1px solid #000;
                h1{
                    margin: 0;
                }
            }
        }
        .footer{
            padding: 20px 0px;
            h3{
                font-size: 14px;
                margin: 0;
            }
            .note{
                margin-top: 20px;
            }
        }
    }
</style>
<style>
    .signatureName label:before{
        content: '*';
        color: #ff4949;
        margin-right: 4px;
    }
</style>