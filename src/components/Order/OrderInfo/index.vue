<template>
    <div>
        <el-form :model="ruleForm" label-position="left" :rules="rules" ref="ruleForm" label-width="110px" style="padding:16px 24px;">
            <!-- <div style="display:none;">{{sum}}</div> -->
            <!-- <el-form-item label="付款类型：" prop="payType">
                <el-select v-model="ruleForm.payType" placeholder="请选择付款类型" clearable @change="payTypeChange" style="width: 100%;"> -->
                    <!-- <el-option
                        v-for="item in PAYTYPE"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option> -->
                    <!-- <el-option label="天" value="3"></el-option>
                    <el-option label="周" value="1"></el-option>
                    <el-option label="月" value="2"></el-option>
                    <el-option label="季" value="4"></el-option>
                    <el-option label="年" value="5"></el-option>
                </el-select>
            </el-form-item> -->

            <el-form-item label="货币类型：" prop="symbol">
                <el-select v-model="ruleForm.symbol" placeholder="请选择货币类型" clearable style="width: 100%;">
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

            <el-form-item label="开始时间：" prop="startDate">
                <el-date-picker 
                    type="date" 
                    value-format="yyyy-MM-dd" 
                    placeholder="选择日期" 
                    v-model="ruleForm.startDate" 
                    clearable style="width: 100%;"
                    :picker-options="pickerOptions"
                    @change="startTimeChange"
                ></el-date-picker>
                
            </el-form-item>
            <el-form-item label="结束时间：" prop="endDate">
                <el-date-picker 
                    type="date" 
                    value-format="yyyy-MM-dd" 
                    placeholder="选择日期" 
                    v-model="ruleForm.endDate" 
                    clearable 
                    style="width: 100%;"
                    :picker-options="pickerOptions2"
                    @change="endTimeChange"
                    
                ></el-date-picker>
            </el-form-item>
            
            

            <!-- <el-form-item label="期数：" prop="periods">
                <el-input
                v-model.trim="ruleForm.periods"
                placeholder="请输入期数"
                @change="periodsAmountChange"
                clearable />
            </el-form-item>
            <el-form-item label="每期金额：" prop="periodsAmount">
                <el-input
                v-model.trim="ruleForm.periodsAmount"
                placeholder="请输入每期金额"
                @change="periodsAmountChange"
                clearable/>
            </el-form-item> -->
            <el-form-item label="订单金额：" prop="amount">
                <el-input
                v-model.trim="ruleForm.amount"
                placeholder="请输入订单金额"
                clearable />
            </el-form-item>


            <el-form-item label="定金：" prop="depositAmount">
                <el-input
                v-model.trim="ruleForm.depositAmount"
                placeholder="请输入定金"
                clearable />
            </el-form-item>
            
            <!-- <el-form-item label="付款周期：" prop="payWay">
                <el-select v-model="ruleForm.payWay" placeholder="请选择付款周期" clearable style="width: 100%;">
                    <el-option
                        v-for="item in PAYWAY"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select> 
            </el-form-item> -->
            <!-- v-if="moneyStatus" -->
            <el-alert  title="提示" type="warning" description="在填写完成所有的订单信息后点击获取预付服务费" show-icon></el-alert>
            <el-form-item label="预付服务费：" prop="predictServiceAmount">
                <!-- <el-input v-model="ruleForm.predictServiceAmount" placeholder="请输入预付服务费" disabled clearable/> -->
                <el-input v-model="ruleForm.predictServiceAmount" placeholder="请获取预付服务费" disabled clearable style="width:53%;"/>
                <el-button type="primary" @click="getMoney">获取预付服务费</el-button>
                <!-- v-if="moneyStatus" -->
            </el-form-item>
            
            <!-- <el-form-item label="预付服务费：" prop="predictServiceAmount">
                <el-input
                v-model="ruleForm.predictServiceAmount"
                placeholder="请输入预付服务费"
                clearable/>
            </el-form-item> -->
            <el-form-item label="实付服务费：" prop="serviceAmount">
                <el-input
                v-model.trim="ruleForm.serviceAmount"
                placeholder="请输入实付服务费"
                clearable/>
            </el-form-item>

            <el-form-item label="供应商预估佣金：" prop="roomMoney">
                <el-input
                v-model.trim="ruleForm.roomMoney"
                placeholder="供应商预估佣金"
                disabled
                clearable/>
            </el-form-item>
            

            <!-- <el-form-item label="定金：" prop="depositAmount">
                <el-input
                v-model="ruleForm.depositAmount"
                placeholder="请输入定金"
                clearable/>
            </el-form-item>
            <el-form-item label="押金：" prop="mortgageAmount">
                <el-input
                v-model="ruleForm.mortgageAmount"
                placeholder="请输入押金"
                clearable/>
            </el-form-item> -->
            <!-- <el-form-item label="学生返现：" prop="studentAmount">
                <el-input
                v-model="ruleForm.studentAmount"
                placeholder="请输入学生返现"
                clearable/>
            </el-form-item> -->
            <!-- <el-form-item label="活动优惠：" prop="activityAmount">
                <el-input
                v-model="ruleForm.activityAmount"
                placeholder="请输入活动优惠"
                clearable/>
            </el-form-item> -->
            <!-- <el-form-item label="有无推荐返现：" prop="isRecommended">
                <el-select v-model="ruleForm.isRecommended" placeholder="请选择有无推荐返现" clearable style="width: 100%;" @change="isRecommendedChange">
                    <el-option label="有" value="1" />
                    <el-option label="没有" value="2" />
                </el-select>
            </el-form-item>
            <el-form-item label="推荐返现金额：" prop="recommendedAmount" v-if="ruleForm.isRecommended==1">
                <el-input
                v-model="ruleForm.recommendedAmount"
                placeholder="请输入推荐返现金额"
                clearable/>
            </el-form-item> -->

            <el-form-item label="订单状态：" prop="isDeleted">
               <el-select v-model="ruleForm.isDeleted" placeholder="请选择订单状态" clearable style="width: 100%;">
                    <el-option label="有效" value="1" />
                    <el-option label="无效" value="0" />
                </el-select>
            </el-form-item>

            


            <el-form-item label="备注：" prop="remark">
                <!-- <el-input type="textarea" v-model="ruleForm.remark"></el-input> -->
                <vue-ueditor-wrap v-model="ruleForm.remark" :config="myConfig" :key="2"></vue-ueditor-wrap>
            </el-form-item>

            
        </el-form>
    </div>
</template>
<script>
import { listCountry } from '@/api/home/country'
import VueUeditorWrap from '@/components/UE';
import { orderFreeMoney,addOrder,updateOrder } from "@/api/order/order";
export default {
    components: {
    VueUeditorWrap
  },
    props:{
        orderInfo:{
            type:Object
        },
        infoStatus:{
            type:Boolean
        }
    },
    data(){
        var checkAge = (rule, value, callback) => {
            if (!value) {
            return callback(new Error('年龄不能为空'));
            }
            setTimeout(() => {
            if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
            } else {
                if (value < 18) {
                callback(new Error('必须年满18岁'));
                } else {
                callback();
                }
            }
            }, 1000);
        };
        return{
            pickerOptions:{
                
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的 
                }
            },
            pickerOptions2:{
                // disabledDate(time) {
                //     let curDate = (new Date()).getTime();
                //     let three = 7 * 24 * 3600 * 1000;
                //     let threeMonths = curDate + three  ;
                //     return time.getTime() < Date.now() || time.getTime() > threeMonths;
                // },
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的 
                }
            },
            myConfig:{
                autoHeightEnabled: false,
                initialFrameHeight: 200,
                initialFrameWidth: '100%',
            },
            currencyTypeData:[],
            ruleForm: {
                predictServiceAmount:'',
                startDate: '',
                endDate: '',
                symbol:'',
                amount:'',
                // days:'',
                payWay:'',
                payType:'',
                serviceAmount:'',
                isDeleted:'1',
                roomMoney:'',
                periods:undefined,
                depositAmount:'',mortgageAmount:'',studentAmount:'',activityAmount:'',isRecommended:'',recommendedAmount:'',remark:''
            },
            rules:{
                startDate: [
                    { type: 'string', required: true, message: '请选择开始时间', trigger: 'change' }
                ],
                endDate: [
                    { type: 'string', required: true, message: '请选择结束时间', trigger: 'change' }
                ],
                symbol: [
                    { required: true, message: '请选择货币类型', trigger: 'change' }
                ],
                amount:[
                    { required: true, message: '请输入订单金额', trigger: 'blur' },
                    // { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                ],
                // periods:[
                //     { required: true, message: '请输入期数', trigger: 'blur' },
                //     // { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                // ],
                // periodsAmount:[
                //     { required: true, message: '请输入每期金额', trigger: 'blur' },
                //     // { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                // ],
                // serviceAmount:[
                //     { required: true, message: '请输入实付服务费', trigger: 'blur' },
                //     // { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                // ],
                // days:[
                //     { required: true, message: '请输入总天数', trigger: 'blur' },
                //     { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                // ],
                // payWay: [
                //     { required: true, message: '请选择付款周期', trigger: 'change' }
                // ],
                // payType: [
                //     { required: true, message: '请选择付款类型', trigger: 'change' }
                // ],
                isDeleted: [
                    { required: true, message: '请选择订单状态', trigger: 'change' }
                ],
                // predictServiceAmount:[
                //     { required: true, message: '请获取预付服务费', trigger: 'blur' }
                // ]
            }, 
            PAYWAY:[],
            PAYTYPE:[],
            currentData:this.orderInfo,
            daysNum:'',
            moneyStatus:true,//是否显示预付服务费   目前在编辑状态下不显示
        }
    },
    watch:{
        orderInfo(newValue, oldValue){
            this.currentData = newValue;
        }
    },
    computed:{
        // sum:function(){
        //     if(Math.ceil(this.datedifference(this.ruleForm.startDate,this.ruleForm.endDate) / parseInt(this.daysNum) )){
        //         console.log(this.datedifference(this.ruleForm.startDate,this.ruleForm.endDate))
                
        //         return this.ruleForm.periods = Math.ceil(this.datedifference(this.ruleForm.startDate,this.ruleForm.endDate) / parseInt(this.daysNum))
        //     }
        // },
        
    },
    created(){
        //获取货币类型
        listCountry().then(res=>{
            this.currencyTypeData = res.rows;
        })

        var payData = JSON.parse(localStorage.getItem("YIHOME_user_type"));
        payData.forEach(element => {
            if(element.parentId==24){
                this.PAYWAY.push(element)
            }
            if(element.parentId==18){
                this.PAYTYPE.push(element)
            }
        });
        
        if(JSON.stringify(this.currentData)!='{}'){
            console.log('当前为编辑')

            this.moneyStatus = false;
            this.currentData.amount = String(this.currentData.amount)
            // this.currentData.days = String(this.currentData.days)
            this.currentData.payType = String(this.currentData.payType) 
              
            this.ruleForm = this.currentData
            

            // switch (this.ruleForm.payType) {
            //     case '2':
            //         return this.daysNum = 7
            //         break;
            //     case '3':
            //         return this.daysNum = 30
            //         break;
            //     case '1':
            //         return this.daysNum = 1
            //         break;
            //     case '4':
            //         return this.daysNum = 90
            //         break;
            //     case '5':
            //         return this.daysNum = 365
            //         break;
            //     default:
            //         this.ruleForm.periods = undefined;
            //         break;
            // }
        }
    },
    methods:{
        periodsAmountChange(val){
            console.log(val)
            if(val){
                this.ruleForm.amount = (parseInt(this.ruleForm.periods)*parseInt(this.ruleForm.periodsAmount))
            }
        },
        getMoney(){
            console.log(this.$route.path)
            //获取预付服务费分 三种状态  
            //1.在订单中创建的订单    /Order/order
            //2.在用户中创建的订单 （不需判断用户是否选择）/users
            //3.在房源中创建的订单 （不需判断房源是否选择）/rent/house

            var orderStatus = this.submitForm()
            if(!orderStatus){
                this.$message({
                    message: '请填写订单信息',
                    type: 'warning'
                });
                return;
            }
            
            console.log(this.$parent.$children[1].userList)
            
            
            if(this.$route.path=="/Order/order"||this.$route.path=="/rent/house"){
                if(this.$parent.$children[1].userList.length==0){
                    this.$message({
                        message: '请选择关联用户',
                        type: 'warning'
                    });
                    return; 
                }
            }

            if(this.$route.path=="/Order/order"||this.$route.path=="/users"){
                if(this.$parent.$children[2].userList.length==0){
                    this.$message({
                        message: '请选择关联房源',
                        type: 'warning'
                    });
                    return;
                }
            }


            let obj ={
                order:this.ruleForm,
                orderRooms:this.$parent.$children[2].userList,
                orderUsers:this.$parent.$children[1].userList
            } 


            const loading = this.$loading({
                lock: true,
                text: '加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            }); 
            if(obj.order.id){
                loading.close();
                updateOrder(obj.order).then(response => {
                    if(response.code==200){
                        orderFreeMoney({orderId:obj.order.id}).then(res2=>{
                            if(res2.code===200){

                                if(res2.data.roomMoney.type=="Artificial"){
                                    this.$confirm('无法计算佣金，请人工核对后填写实付服务费', '提示', {
                                        confirmButtonText: '确定',
                                        type: 'warning'
                                    }).then(() => {
                                        
                                    }).catch(() => {
                                              
                                    });

                                    this.ruleForm.predictServiceAmount=res2.data.freeMoney
                                    this.ruleForm.serviceAmount=res2.data.freeMoney
                                    this.ruleForm.roomMoney=res2.data.roomMoney.amount

                                }else{
                                    this.ruleForm.predictServiceAmount=res2.data.freeMoney
                                    this.ruleForm.serviceAmount=res2.data.freeMoney
                                    this.ruleForm.roomMoney=res2.data.roomMoney.amount
                                }
                            }else{
                                this.msgError(res2.msg)
                            }
                        }).catch(e=>{
                            loading.close();
                        })
                    }else{
                     
                    }
                }).catch(e=>{
                    loading.close();
                })


                        
            }else{

            
                addOrder(obj).then(res=>{
                    if(res.code==200){
                        this.ruleForm = res.data.order;
                        orderFreeMoney({orderId:res.data.order.id}).then(res2=>{
                            loading.close();
                            if(res2.code===200){

                                if(res2.data.roomMoney.type=="Artificial"){
                                    this.$confirm('无法计算佣金，请人工核对后填写实付服务费', '提示', {
                                        confirmButtonText: '确定',
                                        type: 'warning'
                                    }).then(() => {
                                        
                                    }).catch(() => {
                                              
                                    });

                                    this.ruleForm.predictServiceAmount=res2.data.freeMoney
                                    this.ruleForm.serviceAmount=res2.data.freeMoney
                                    this.ruleForm.roomMoney=res2.data.roomMoney.amount

                                }else{
                                    this.ruleForm.predictServiceAmount=res2.data.freeMoney
                                    this.ruleForm.serviceAmount=res2.data.freeMoney
                                    this.ruleForm.roomMoney=res2.data.roomMoney.amount
                                }


                                // this.ruleForm.predictServiceAmount=res2.data.freeMoney
                                // this.ruleForm.serviceAmount=res2.data.freeMoney


                                // this.ruleForm.roomMoney=res2.data.roomMoney.amount
                            }else{
                                this.msgError(res2.msg)
                            }
                        }).catch(e=>{
                            loading.close();
                        })
                    }else{
                        loading.close();
                        this.msgError(res.msg);
                    }
                }).catch(e=>{
                    loading.close();
                })
            }

            
 

            

        },
        payTypeChange(val){

            this.ruleForm.amount = (parseInt(this.ruleForm.periods)*parseInt(this.ruleForm.periodsAmount))

           
            switch (val) {
                case '1':
                    return this.daysNum = 7
                    break;
                case '2':
                    return this.daysNum = 30
                    break;
                case '3':
                    return this.daysNum = 1
                    break;
                case '4':
                    return this.daysNum = 90
                    break;
                case '5':
                    return this.daysNum = 365
                    break;
                default:
                    this.ruleForm.periods = undefined;
                    break;
            }
        },
        startTimeChange(val){
            // if(!val){
            //    this.ruleForm.periods = undefined;
            // }
            // this.ruleForm.amount = (parseInt(this.ruleForm.periods)*parseInt(this.ruleForm.periodsAmount))
        },
        endTimeChange(val){
            // if(!val){
            //     this.ruleForm.periods = undefined;
            // }
            // this.ruleForm.amount = (parseInt(this.ruleForm.periods)*parseInt(this.ruleForm.periodsAmount))
        },
        datedifference(sDate1, sDate2){//sDate1和sDate2是2006-12-18格式
            var dateSpan,tempDate,iDays;
            sDate1 = Date.parse(sDate1);
            sDate2 = Date.parse(sDate2);
            dateSpan = sDate2 - sDate1;
            dateSpan = Math.abs(dateSpan);
            iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
            return iDays;
        },
        submitForm() {
            var returnData;
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    
                    return returnData = true;
                } else {
                    console.log('error submit!!');
                    return returnData = false;
                }
            });
            return returnData
        },
        isRecommendedChange(val){
            if(val==2){
                this.ruleForm.recommendedAmount = undefined
            }
        }
    }
    
}
</script>