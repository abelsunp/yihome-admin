<template>
    <div class="basicWrapper">
        <div class="basicTitle">
            <div class="line"></div>
            <div class="content">订单信息</div>
        </div>
        <ul>
            <li>
                <el-row>
                    <el-col :span="24">
                        <div class="title">供应商：</div>
                        <div class="value">
                            <span v-for="(item,$index) in suppliderDataList" :key="$index">
                                {{currentData.supplierId==item.id?item.name:''}}
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="24">
                        <div class="title">公司名称:</div>
                        <div class="value">{{currentData.companyName}}</div>
                    </el-col>
                    <el-col :span="24">
                        <div class="title">公司地址：</div>
                        <div class="value">
                            {{currentData.companyAddress}}
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="title">公司电话：</div>
                        <div class="value">{{currentData.tel}}</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="title">公司邮箱：</div>
                        <div class="value">
                            {{currentData.emial}}
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="title">订单发起日期：</div>
                        <div class="value">
                            {{myparseTime(currentData.issueDate)}}
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="title">截止付款日期：</div>
                        <div class="value">
                            {{myparseTime(currentData.paymentDue)}}
                        </div>
                    </el-col>
                    
                    <el-col :span="24">
                        <div class="title">收款银行名称：</div>
                        <div class="value">{{currentData.bankName}}</div>
                    </el-col>
                    <el-col :span="24">
                        <div class="title">账号名称：</div>
                        <div class="value">{{currentData.accountName}}</div>
                    </el-col>
                    

                    <el-col :span="24" >
                        <div class="title">银行地址：</div>
                        <div class="value">{{currentData.bankAddress}}</div>
                    </el-col>
                    <el-col :span="24">
                        <div class="title">账号：</div>
                        <div class="value">{{currentData.accountNumber}}</div>
                    </el-col>

                    <el-col :span="24">
                        <div class="title">银行代码：</div>
                        <div class="value">{{currentData.swiftCode}}</div>
                    </el-col>
                    <el-col :span="24">
                        <div class="title">受益人银行代码：</div>
                        <div class="value">{{currentData.beneficiaryBankCode}}</div>
                    </el-col>
                </el-row>
            </li>
        </ul>
        
    </div>
</template>
<script>
import { listSupplier } from "@/api/supplier";
export default {
    props:{
        viewData:{
            type:Object
        }
    },
    data(){
        return {
            currentData:this.viewData,
            suppliderDataList:[],
        }
    },
    created(){
        
        listSupplier().then(res=>{
            if(res.code===200){
                this.suppliderDataList = res.rows;
                
            }else{
                this.msgError('供应商获取失败请重新添加或修改')
            }
        }).catch(e=>{
           
        })
    },
    watch:{
        viewData(newValue, oldValue){
            this.currentData = newValue;
        }
    },
    methods:{
        
    }
}
</script>
<style scoped>
    .basicWrapper{
        padding: 16px;
    }
    .basicWrapper .basicTitle{
        margin-bottom: 16px;
        margin-top: 6px;
        position: relative;
        width: 100%;
        height: 38px;
        line-height: 38px;
        border-bottom: 1px solid #e9e9e9;
    }
    .basicWrapper .basicTitle .line{
        position: absolute;
        display: inline-block;
        background-color: #0083ff;
        width: 2px;
        top: 0;
        border: 20px;
        bottom: 0;
        height: 16px;
        left: 0;
        margin: auto;
    }
    .basicWrapper .basicTitle .content{
        margin-left: 11px;
        font-size: 14px;
        font-weight: 400;
        color: #333;
    }
    .basicWrapper ul{
        padding: 0;
    }
    .basicWrapper ul li{
        list-style: none;
    }
    .basicWrapper ul li .el-col{
        display: flex;
        padding: 10px;
        font-size: 13px;
        color: #000;
    }
    .basicWrapper ul li .el-col .title{
        width: 120px;
        padding-right: 10px;
        color: #999;
        margin-bottom: 10px !important;
    }
    .basicWrapper ul li .el-col .value{
        word-break: break-all;
        flex: 1;
    }
</style>