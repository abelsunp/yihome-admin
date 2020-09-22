<template>
    <section>
        <div class="wrapper-left">
            <div class="title">
                <span>订单信息：</span>
            </div>
            <div class="content" style="height: 97%;">
                <order-info ref="orderInfo" :order-info="currentOrderInfo" :info-status="infoStatus"></order-info>
            </div>
        </div>
        <div class="wrapper-right">
            <div class="userInfo" v-if="pageShowThisDom">
                <div class="title">
                    <span>用户信息：（目前只可以选择一个用户）</span>
                </div>
                <div class="content"  style="height: 90%;">
                    <order-user ref="orderUser" :order-user="currentOrderUser" :user-status="userStatus"></order-user>
                </div>
            </div>
            <div class="HouseInfo">
                <div class="title">
                    <span>房源信息：（目前只可以选择一个房源）</span>
                </div>
                <div class="content" style="height: 94%;">
                    <order-house ref="orderHouse" :order-house="currentOrderHouse" :house-status="houseStatus"></order-house>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import OrderInfo from "@/components/Order/OrderInfo"
import OrderUser from "@/components/Order/User"
import OrderHouse from "@/components/Order/House"
export default {
    props:{
        orderAlldata:{
            type:Object
        },
        editStatus:{
            type:Boolean
        },
        showThisDom:{
            type:Boolean
        }
    },
    data(){
        return {
            pageShowThisDom:this.showThisDom,
            currentOrder:this.orderAlldata,

            currentOrderInfo:{},
            currentOrderUser:{},
            currentOrderHouse:{},

            currentStatus:this.editStatus,

            infoStatus:false,
            userStatus:false,
            houseStatus:false,
        }
    },
    components:{
        OrderInfo,
        OrderUser,
        OrderHouse
    },
    methods:{
        
    },
    created(){
        console.log(this.currentOrder)
        if(this.currentOrder){
            this.currentOrderInfo = this.currentOrder.order;
            this.currentOrderUser = this.currentOrder.users;
            this.currentOrderHouse = this.currentOrder.rooms;
        }else{
            
        }

        if(this.currentStatus){//true 表示当前是编辑状态
            this.infoStatus = true;
            this.userStatus = true;
            this.houseStatus = true;
        }
    },
    watch:{
        orderAlldata(newValue, oldValue) {
            console.log(newValue,2222)
            this.currentOrder = newValue;
        },
        editStatus(newValue, oldValue) {
            this.currentStatus = newValue;
        },
        showThisDom(newValue, oldValue) {
            this.pageShowThisDom = newValue;
        },
    }
}
</script>
<style scoped>
    section{
        display: flex;
        height: 100%;
        position: absolute;
        width: 100%;
        padding-bottom: 20px;
    }
    section .wrapper-left,section .wrapper-right{
        flex: 1;
    }
    section .wrapper-left{
        margin-right: 16px;
        background-color: #fff;
        border-radius: 4px;
        padding: 16px;
        min-height: 516px;
    }
    section .wrapper-right{
        display: flex;
        flex-direction: column;
    }
    section .wrapper-right .userInfo{
        margin-bottom: 16px;
        
    }
    section .wrapper-right .userInfo,section .wrapper-right .HouseInfo{
        background-color: #fff;
        border-radius: 4px;
        height: 100%;
        padding: 16px;
        min-height: 250px;
    }
    .title{
        border-bottom: 1px solid #ccc;
        margin: 0 -16px;
        padding-left: 8px;
        padding-bottom: 16px;
        text-align: left;
    }
    .content{
        overflow: auto;
    }
</style>