<template>
    <div class="basicWrapper">
        <div class="basicTitle">
            <div class="line"></div>
            <div class="content">订单信息</div>
        </div>
        <ul>
            <li>
                <el-row>
                    <el-col :span="12">
                        <div class="title">开始时间：</div>
                        <div class="value">{{myparseTime(currentData.order.startDate)}}</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="title">结束时间:</div>
                        <div class="value">{{myparseTime(currentData.order.endDate)}}</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="title">货币类型：</div>
                        <div class="value">
                            <span v-for="item in currencyTypeData" :key="item.id">
                                {{ currentData.order.symbol==item.id?item.currencyType+'（'+item.currencySymbol+'）':'' }}
                            </span>
                        </div>
                    </el-col>

                    
                    <!-- <el-col :span="12">
                        <div class="title">付款类型：</div>
                        <div class="value"> -->
                            <!-- <span v-for="item in PAYTYPE" :key="item.id">
                                {{ currentData.order.payType==item.id?item.name:'' }}
                            </span> -->
                            <!-- <span v-if="currentData.order.payType==3">天</span>
                            <span v-if="currentData.order.payType==1">周</span>
                            <span v-if="currentData.order.payType==2">月</span>
                            <span v-if="currentData.order.payType==4">季</span>
                            <span v-if="currentData.order.payType==5">年</span>
                        </div>
                    </el-col> -->

                    <!-- <el-col :span="12">
                        <div class="title">期数：</div>
                        <div class="value">{{currentData.order.periods}}</div>
                    </el-col>
                     <el-col :span="12">
                        <div class="title">每期金额：</div>
                        <div class="value" v-if="currentData.order.periodsAmount">
                            {{currentData.order.periodsAmount}}
                            <span v-for="item in currencyTypeData" :key="item.id">
                                {{ currentData.order.symbol==item.id?item.currencySymbol:'' }}
                            </span>
                        </div>
                        <div class="value" v-else>---</div>
                    </el-col> -->


                    <el-col :span="12">
                        <div class="title">订单金额：</div>
                        <div class="value" v-if="currentData.order.amount">
                            {{currentData.order.amount}}
                            <span v-for="item in currencyTypeData" :key="item.id">
                                {{ currentData.order.symbol==item.id?item.currencySymbol:'' }}
                            </span>
                        </div>

                        <div class="value" v-else>---</div>

                        
                    </el-col>

                    <el-col :span="12">
                        <div class="title">定金：</div>
                        <div class="value" v-if="currentData.order.depositAmount||currentData.order.depositAmount=='0'">
                            {{currentData.order.depositAmount}}
                           
                        </div>

                        <div class="value" v-else>---</div>

                        
                    </el-col>

                    <el-col :span="12" v-if="currentData.order.status==6||currentData.order.status==7">
                        <div class="title">{{currentData.order.status==6?'优惠金额':'返还金额'}}</div>
                        <div class="value" v-if="currentData.order.preferentialAmount||currentData.order.preferentialAmount=='0'">
                            {{currentData.order.preferentialAmount}}
                        </div>
                        <div class="value" v-else>---</div>
                    </el-col>



                    <!-- <el-col :span="12">
                        <div class="title">总天数：</div>
                        <div class="value">{{currentData.order.days}}</div>
                    </el-col> -->
                    
                    <!-- <el-col :span="12">
                        <div class="title">付款周期：</div>
                        <div class="value">
                            <span v-for="item in PAYWAY" :key="item.id">
                                {{ currentData.order.payWay==item.id?item.name:'' }}
                            </span>
                        </div>
                    </el-col> -->
                    <el-col :span="12">
                        <div class="title">预付服务费：</div>
                        <div class="value">
                            <span v-if="currentData.order.predictServiceAmount==0">{{currentData.order.predictServiceAmount}}</span>
                            <span v-else>{{ currentData.order.predictServiceAmount?currentData.order.predictServiceAmount+'人民币':'---'}}</span>
                                
                            
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="title">实付服务费：</div>
                        <div class="value">
                            <span v-if="currentData.order.serviceAmount==0">{{currentData.order.serviceAmount}}</span>
                            <span v-else>{{ currentData.order.serviceAmount?currentData.order.serviceAmount+'人民币':'---'}}</span>
                                
                            
                        </div>
                    </el-col>

                    <el-col :span="12">
                        <div class="title">佣金服务费：</div>
                        <div class="value">
                            <span v-if="currentData.order.commissionAmount==0">{{currentData.order.commissionAmount}}</span>
                            <span v-else>
                                {{ currentData.order.commissionAmount?currentData.order.commissionAmount:'---'}}
                                <span v-for="item in currencyTypeData" :key="item.id">
                                    {{ currentData.order.symbol==item.id?item.currencySymbol:'' }}
                                </span>
                            </span>
                                
                            
                        </div>
                    </el-col>

                    <!-- <el-col :span="12">
                        <div class="title">定金：</div>
                        <div class="value">
                            
                                {{ currentData.order.depositAmount}}
                            
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="title">押金：</div>
                        <div class="value">{{currentData.order.mortgageAmount}}</div>
                    </el-col>

                    <el-col :span="12">
                        <div class="title">学生返现：</div>
                        <div class="value">{{currentData.order.studentAmount}}</div>
                    </el-col>

                    <el-col :span="12">
                        <div class="title">活动优惠：</div>
                        <div class="value">{{currentData.order.activityAmount}}</div>
                    </el-col> -->

                    <!-- <el-col :span="12">
                        <div class="title">有无推荐返现：</div>
                        <div class="value">{{currentData.order.isRecommended==1?'有':currentData.order.isRecommended==2?'没有':'---'}}</div>
                    </el-col>
                    <el-col :span="12" v-if="currentData.order.isRecommended==1">
                        <div class="title">推荐返现金额：</div>
                        <div class="value">{{currentData.order.recommendedAmount?currentData.order.recommendedAmount:'---'}}</div>
                    </el-col> -->
                    <el-col :span="24">
                        <div class="title">备注：</div>
                        <div class="value" v-html="currentData.order.remark?currentData.order.remark:'---'"></div>
                    </el-col>
                </el-row>
            </li>
        </ul>
        <div class="basicTitle">
            <div class="line"></div>
             <div class="content">用户信息</div> <!--（{{currentData.users.length}}） -->
        </div>

        <ul>
            <li>
                <el-row>
                    <el-col :span="20" v-for="(item,$index) in currentData.users" :key="$index">
                        <div class="title">用户名称：</div>
                        <div class="value">{{item.userName}}</div>
                        <div><el-button
                              size="mini"
                              type="text"
                              icon="el-icon-view"
                              @click="gouserPage(item)"
                          >查看用户</el-button></div>
                    </el-col>
                </el-row>
            </li>
        </ul>
        <div class="basicTitle">
            <div class="line"></div>
            <div class="content">房源信息</div>  <!-- （{{currentData.rooms.length}}） -->
        </div>
        <ul>
            <li>
                <el-row> 
                    <el-col :span="20" v-for="(item,$index) in currentData.rooms" :key="$index">
                        <div class="title">房源名称：</div>
                        <div class="value">{{item.houseName+' / '+item.roomName}}</div>
                        <div><el-button
                              size="mini"
                              type="text"
                              icon="el-icon-view"
                              @click="gohousePage(item)"
                          >查看房源</el-button></div>
                    </el-col>
                    
                </el-row>
            </li>
        </ul>


       

    </div>
</template>
<script>
import { listCountry } from '@/api/home/country'
export default {
    props:{
        viewData:{
            type:Object
        }
    },
    data(){
        return {
            currencyTypeData:[],
            currentData:this.viewData,

            PAYWAY:[],
            PAYTYPE:[],
        }
    },
    created(){
        //获取货币类型
        listCountry().then(res=>{
            this.currencyTypeData = res.rows;
        })
        console.log(this.currentData)
        var payData = JSON.parse(localStorage.getItem("YIHOME_user_type"));
        payData.forEach(element => {
            if(element.parentId==24){
                this.PAYWAY.push(element)
            }
            if(element.parentId==18){
                this.PAYTYPE.push(element)
            }
        });
    },
    watch:{
        viewData(newValue, oldValue){
            this.currentData = newValue;
        }
    },
    methods:{
        gohousePage(item){
            console.log(item.houseName)
            this.$router.push({path:'/rent/house',query: { houseName: item.houseName }})
        },
        gouserPage(item){
            console.log(item.userName)
            this.$router.push({path:'/users',query: { nameCh: item.userName }})
        }
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
        width: 110px;
        padding-right: 10px;
        color: #999;
        margin-bottom: 10px !important;
    }
    .basicWrapper ul li .el-col .value{
        word-break: break-all;
        flex: 1;
    }
</style>