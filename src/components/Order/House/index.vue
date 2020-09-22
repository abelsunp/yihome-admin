<template>
    <div style="padding-top:16px;" v-loading.fullscreen.lock="fullscreenLoading">
        <div class="userList">
            <div class="left"><span style="color:#FF4E4E;"></span>关联房源：</div>
            <div class="right">
                <ul>
                    <li v-for="(item,$index) in userList" :key="$index">
                        <div><p>{{item.houseName}}</p></div>
                        <div><p>{{item.roomName}}</p></div>
                        <div> 
                            <template v-if="houseStatus">
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
                    <li v-show="userList.length>=1">
                        <el-button
                            type="text"
                            icon="el-icon-view"
                            size="mini"
                            @click="viewCommission(userList)"
                        >房源佣金</el-button>
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

        <!-- <el-dialog
            title="选择用户"
            :visible.sync="open"
             append-to-body
            width="600px">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="open = false">取 消</el-button>
                <el-button type="primary" @click="open = false">确 定</el-button>
            </span>
        </el-dialog> -->

        <el-drawer
            title="佣金配置"
            :visible.sync="viewCommissionStatus"
            custom-class="demo-drawer"
            size="880px">
            <div style="padding:0 16px;">
                <commission-component v-if="viewCommissionStatus" ref="commissionComponent" current-type="2" :current-id="commissionId"  />
            </div>
        </el-drawer>


        <import-table ref="import" @ok="handleQuery" />
    </div>
</template>
<script>
import { addOrderHouse,delOrderHouse } from "@/api/order/order";
import importTable from "./importTable";
import commissionComponent from "@/components/commission";
export default {
    props:{
        orderHouse:{
            //type:Array
        },
        houseStatus:{
            type:Boolean
        }
    },
    components: { importTable,commissionComponent },
    data(){
        return {
            
            commissionId:undefined,
            viewCommissionStatus:false,

            fullscreenLoading:false,
            open:false,
            userList:[],
            currentData:this.orderHouse,
            currentEdit:this.houseStatus,//true 表示当前为编辑  用于是否显示 编辑按钮
            currentOrderId:'',

            judgeAddOrEdit:false,//false 代表点击的是新增  true代表编辑

            indexNumber:'',
        }
    },
    created() {
        if(JSON.stringify(this.currentData)!='{}'){
            console.log(22222222222222)
            this.userList = this.currentData
        }

        if(this.currentEdit){
            this.currentOrderId = JSON.parse(localStorage.getItem('currentClickOrderId'))
        }
    },
    watch:{
        orderHouse(newValue, oldValue){
            this.currentData = newValue;
        },
        houseStatus(newValue, oldValue){
            this.currentEdit = newValue;
        }
    },
    methods:{
        viewCommission(row){
            this.viewCommissionStatus = true;
            this.commissionId = row[0].houseId;
            setTimeout(()=>{
                this.$refs.commissionComponent.getList();
            },10)
            console.log(row)
        },
        //新增房源
        handleAdd(){
            this.$refs.import.hasSelectArray = this.userList;
            this.$refs.import.show();
            this.judgeAddOrEdit = false;
        },
        //编辑房源
        handleUpdate(index){
            console.log(this.userList)
            this.indexNumber = index
            this.$refs.import.hasSelectArray = this.userList;
            this.$refs.import.show();
            this.judgeAddOrEdit = true;
        },
        handleDelete(item,$index){
            this.$confirm('是否删除当前房源？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //判断当前是新增订单还是编辑订单  编辑模式下 需要调用接口 （接口是独立的）
                if(this.currentEdit){
                    if(this.userList.length==1){
                        this.$message({
                            message: '至少存在一个关联房源',
                            type: 'warning'
                        });
                        return;
                    }
                    this.fullscreenLoading = true;
                    delOrderHouse({id:item.id}).then(res=>{
                        this.fullscreenLoading = false;
                        if(res.code===200){
                            this.userList.splice($index,1);
                            this.$message({ type: 'success', message: '删除成功!' });
                        }else{
                            this.$message.error(res.msg);
                        }
                    }).catch(e=>{
                        this.fullscreenLoading = false;
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
                //调用订单房源编辑接口
                this.fullscreenLoading = true;
                console.log(this.userList)
                addOrderHouse({
                    orderId:this.currentOrderId,
                    id:this.userList[this.indexNumber].id,
                    "houseId": val.houseId,
                    "houseName": val.houseName,
                    "roomId": val.roomId,
                    "roomName": val.roomName,
                }).then(res=>{
                    this.fullscreenLoading = false;
                    if(res.code===200){
                        this.userList = res.data;
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch(e=>{
                    this.fullscreenLoading = false;
                })
            }else{
                //如果是新增 还需判断当前的订单状态是 新增的订单 还是 编辑的订单
                if(this.currentEdit){
                    //调用接口的新增房源
                    this.fullscreenLoading = true;
                    addOrderHouse({
                        orderId:this.currentOrderId,
                        "houseId": val.houseId,
                        "houseName": val.houseName,
                        "roomId": val.roomId,
                        "roomName": val.roomName,
                    }).then(res=>{
                        this.fullscreenLoading = false;
                        if(res.code===200){
                            this.userList = res.data;
                        }else{
                            this.$message.error(res.msg);
                        }
                    }).catch(e=>{
                        this.fullscreenLoading = false;
                    })
                }else{
                    //普通的新增房源
                    this.userList.push(val)
                }

            }
            
        },
        deteleObject(obj){
            var uniques = [];
            var stringify = {};
            for (var i = 0; i < obj.length; i++) {
                var keys = Object.keys(obj[i]);
                keys.sort(function(a, b) {
                    return (Number(a) - Number(b));
                });
                var str = '';
                for (var j = 0; j < keys.length; j++) {
                    str += JSON.stringify(keys[j]);
                    str += JSON.stringify(obj[i][keys[j]]);
                }
                if (!stringify.hasOwnProperty(str)) {
                    uniques.push(obj[i]);
                    stringify[str] = true;
                }
            }
            uniques = uniques;
            return uniques;
        }
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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0;
        width: 200px;
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