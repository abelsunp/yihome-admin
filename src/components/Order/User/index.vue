<template>
    <div style="padding-top:16px;" v-loading.fullscreen.lock="fullscreenLoading">
        <div class="userList">
            <div class="left"><span style="color:#FF4E4E;">* </span>关联对象：</div>
            <div class="right">
                <ul>
                    <!-- {{userObj}} -->
                    <li v-for="(item,$index) in userList" :key="$index" >
                        <div v-if="item.userId!=userObj.userId"><p>{{item.userName}}</p></div>
                        <div v-if="item.userId!=userObj.userId"> 
                            <template v-if="userStatus">
                                <el-button
                                    size="mini"
                                    type="text"
                                    icon="el-icon-edit"
                                    @click="handleUpdate($index)"
                                    v-hasPermi="['order:order:edit']"
                                >编辑</el-button>
                                <span style="color:#1890ff;">|</span>
                            </template>
                            <el-button
                                size="mini"
                                type="text"
                                icon="el-icon-delete"
                                @click="handleDelete(item,$index)"
                                v-hasPermi="['order:order:remove']"
                            >删除</el-button>
                        </div>
                    </li>
                    <li>
                        <el-button
                        v-show="userList.length<1"
                        type="primary"
                        icon="el-icon-plus"
                        size="mini"
                        @click="handleAdd"
                        v-hasPermi="['order:order:add']"
                        >新增</el-button>
                    </li>
                </ul>
            </div>
        </div>

        <import-table ref="import" @ok="handleQuery" />
    </div>
</template>
<script>
import { addOrderUser,delOrderUsers } from "@/api/order/order";
import importTable from "./importTable";
export default {
    props:{
        orderUser:{
            //type:Array
        },
        userStatus:{ 
            type:Boolean
        },

        //用户中添加用户 把当前的用户隐藏
        userUsers:{
            type:Object
        }
    },
    components: { importTable },
    data(){
        return {
            fullscreenLoading:false,
            open:false,
            userList:[],
            currentData:this.orderUser,
            currentEdit:this.userStatus,//true 表示当前为编辑  用于是否显示 编辑按钮


            currentOrderId:'',

            judgeAddOrEdit:false,//false 代表点击的是新增  true代表编辑

            indexNumber:'',


            userObj:this.userUsers
        }
    },
    created() {
        if(JSON.stringify(this.currentData)!='{}'){
            this.userList = this.currentData
        }
        if(this.currentEdit){
            this.currentOrderId = JSON.parse(localStorage.getItem('currentClickOrderId'))
        }
        if(!this.userObj){
            this.userObj = {}
        }

    },
    watch:{
        orderUser(newValue, oldValue){
            this.currentData = newValue;
        },
        userStatus(newValue, oldValue){
            this.currentEdit = newValue;
        },
        userUsers(newValue, oldValue){
            this.userObj = newValue;
        },
    },
    methods:{
        //新增用户
        handleAdd(){
            this.$refs.import.hasSelectArray = this.userList;
            
            this.$refs.import.show();
            this.judgeAddOrEdit = false;
        },
        //编辑用户
        handleUpdate(index){
            console.log(this.userList)
            this.indexNumber = index
            this.$refs.import.hasSelectArray = this.userList;
            this.$refs.import.show();
            this.judgeAddOrEdit = true;
        },
        //删除用户
        handleDelete(item,$index){
            this.$confirm('是否删除当前用户？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //判断当前是新增订单还是编辑订单  编辑模式下 需要调用接口 （接口是独立的）
                if(this.currentEdit){
                    if(this.userList.length==1){
                        this.$message({
                            message: '至少存在一个关联对象',
                            type: 'warning'
                        });
                        return;
                    }
                    this.fullscreenLoading = true;
                    delOrderUsers({id:item.id}).then(res=>{
                        this.fullscreenLoading = false;
                        if(res.code===200){
                            this.userList.splice($index,1);
                            this.$message({ type: 'success', message: '删除成功!' });
                        }else{
                            this.$message.error(res.msg);
                        }
                    })
                }else{
                    //新增订单模式 直接删除数组里面的数据  无需判断是否存在
                    this.userList.splice($index,1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }
            }).catch(() => {
                        
            });
        },
        handleQuery(val){
            //判断当前点击的是新增还是编辑  编辑改变数组  新增push数组
            if(this.judgeAddOrEdit){//当前页面点击的是编辑
                //调用订单用户编辑接口
                this.fullscreenLoading = true;
                addOrderUser({
                    orderId:this.currentOrderId,
                    userId:val.userId,
                    userName:val.userName,
                    id:this.userList[this.indexNumber].id
                }).then(res=>{
                    this.fullscreenLoading = false;
                    if(res.code===200){
                        this.userList = res.data;
                    }else{
                        this.$message.error(res.msg);
                    }
                })
            }else{
                //如果是新增 还需判断当前的订单状态是 新增的订单 还是 编辑的订单
                if(this.currentEdit){
                    //调用接口的新增用户
                    this.fullscreenLoading = true;
                    addOrderUser({
                        orderId:this.currentOrderId,
                        userId:val.userId,
                        userName:val.userName
                    }).then(res=>{
                        this.fullscreenLoading = false;
                        if(res.code===200){
                            this.userList = res.data;
                        }else{
                            this.$message.error(res.msg);
                        }
                    })
                }else{
                    //普通的新增用户
                    this.userList.push(val)
                }

            }
        },
        
    }
}
</script>
<style scoped>
    .userList{
        display: flex;
    }
    .left{
        color: rgba(0, 0, 0, 0.847058823529412);
        font-family: 'PingFangSC-Regular', 'PingFang SC';
        font-weight: 400;
        font-style: normal;
        font-size: 14px;
        line-height: 22px;
    }
    .right ul{
        margin:0;
        padding:0;
    }
    .right ul li{
        list-style: none;
        display: flex;
        margin-bottom: 16px;
        margin-top: -5px;
    }
    .right ul li p{
        margin: 0;
        width: 368px;
        height: 32px;
        padding: 3px 10px 3px 10px;
        font-family: 'PingFangSC-Regular', 'PingFang SC';
        font-weight: 400;
        font-style: normal;
        font-size: 14px;
        letter-spacing: normal;
        color: rgba(0, 0, 0, 0.647058823529412);
        vertical-align: none;
        text-align: left;
        text-transform: none;
        background-color: transparent;
        border-color: transparent;
        line-height: 24px;
        border-width: 1px;
        border-style: solid;
        border-color: rgba(220, 223, 230, 1);
        border-radius: 4px;
        margin-right: 16px;
    }
</style>