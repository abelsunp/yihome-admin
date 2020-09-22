<template>
    <section v-loading="getDataLoading">
        <div class="roomLeaseperiodWrapper" v-for="(item,$index) in roomLeaseperiodData" :key="$index">
            <div class="wrapperHeader">
                <div><span>类型{{$index+1}}</span></div>
                <!-- <i class="el-icon-delete" style="color:#c33;" @click="delect(item)"></i> -->
                <div>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-edit"
                        @click="editLeaseperiod($index)"
                    >编辑</el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-delete"
                        @click="delect(item)"
                        :disabled="item.status==5?true:false"
                    >废弃</el-button>
                </div>
            </div>
            <div class="content" style="border-bottom:1px solid #ddd;padding-bottom:24px;margin-bottom:24px">
                <div class="start">
                    <!-- <h4>开始日期</h4> -->
                    <el-row>
                        <el-col :span="item.isStartFixation==1?12:24">
                            <div class="key">是否固定开始日期：</div>
                            <div class="value">{{item.isStartFixation==1?'固定':item.isStartFixation==2?'不固定':'---'}}</div>
                        </el-col>

                        <el-col :span="12">
                            <div class="key">最早开始日期：</div>
                            <div class="value">{{ item.minStartDate?myparseTime(item.minStartDate):'---'}}</div>
                        </el-col>
                        <el-col :span="12" v-if="item.isStartFixation==2||!item.isStartFixation">
                            <div class="key">最晚开始日期：</div>
                            <div class="value">{{ item.maxStartDate?myparseTime(item.maxStartDate):'---'}}</div>
                        </el-col>

                    </el-row>
                </div>
                <div class="end">
                    <!-- <h4>结束日期：</h4> -->
                    <el-row>
                        <el-col :span="item.isEndFixation==1?12:24">
                            <div class="key">结束日期是否固定：</div>
                            <div class="value">{{item.isEndFixation==1?'固定':item.isEndFixation==2?'不固定':'---'}}</div>
                        </el-col>
                        <el-col :span="12">
                            <div class="key">最早结束日期：</div>
                            <div class="value">{{ item.minEndDate?myparseTime(item.minEndDate):'---'}}</div>
                        </el-col>
                        <el-col :span="12" v-if="item.isEndFixation==2||!item.isEndFixation">
                            <div class="value">{{ item.maxEndDate?myparseTime(item.maxEndDate):'---'}}</div>
                        </el-col>
                    </el-row>
                </div>


                <div class="leaseper">
                    <!-- <h4>租期区间：</h4> -->
                    <el-row>
                        <el-col :span="12">
                            <div class="key">是否固定租期：</div>
                            <div class="value">{{item.isTermFixation==1?'固定':item.isTermFixation==2?'不固定':'---'}}</div>
                        </el-col>
                        <!-- 固定 -->
                        <el-col :span="12" v-if="item.isTermFixation==1">
                            <div class="key">租期：</div>
                            <div class="value">{{item.minDate}}{{item.leaseType==0?'天':item.leaseType==1?'周':item.leaseType==2?'月':''}}</div>
                        </el-col>
                        <!-- 不固定 -->
                        <el-col :span="12"  v-if="item.isTermFixation==2">
                            <div class="key">租期范围：</div>
                            <div class="value">{{item.minDate}}-{{item.maxDate}}{{item.leaseType==0?'天':item.leaseType==1?'周':item.leaseType==2?'月':''}}</div>
                        </el-col>
                    </el-row>
                </div>

                <div class="price">
                    <!-- <p>价格：</p> -->
                    <el-row>
                        <el-col :span="item.saleRent?24:12">
                            <div class="key">是否优惠：</div>
                            <div class="value">{{item.saleRent?'优惠':'不优惠'}}</div>
                        </el-col>
                        <el-col :span="12">
                            <div class="key">价格：</div>
                            <div class="value">{{item.rent}} {{item.daw==0?'天':item.daw==1?'周':item.daw==2?'月':''}}</div>
                        </el-col>
                        <el-col :span="12">
                            <div class="key">优惠价格：</div>
                            <div class="value">{{item.saleRent}} {{item.daw==0?'天':item.daw==1?'周':item.daw==2?'月':''}}</div>
                        </el-col>
                    </el-row>
                </div>
                <div class="status">
                    <el-row>
                        <el-col :span="24">
                            <div class="key">租期状态：</div>
                            <div class="value">
                                {{item.status==1?'未上架':item.status==2?'上架中':item.status==3?'已下架':item.status==4?'已售完':item.status==5?'废弃':''}}
                            </div>
                        </el-col>
                    </el-row>
                </div>


            </div>
        </div>
        <el-button type="primary" size="mini" @click="addLeaseperiod()">新增租期</el-button>

        <el-dialog title="添加租期" :visible.sync="dialogFormVisible" append-to-body width="680px">
            <el-form :model="addForm" :rules="addFormRules" ref="addForm" label-width="150px">
                <!-- 开始日期 -->
                <div>
                <el-form-item label="是否固定开始日期：" prop="isStartFixation">
                    <el-select v-model="addForm.isStartFixation" placeholder="请选择是否固定开始日期" style="width:220px;" clearable>
                        <el-option label="固定" value="1"></el-option>
                        <el-option label="不固定" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="最早开始日期：" prop="minStartDate">
                   <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择最早开始日期" v-model="addForm.minStartDate" clearable></el-date-picker>
                </el-form-item>
                <el-form-item label="最晚开始日期：" prop="maxStartDate" v-if="addForm.isStartFixation==2||!addForm.isStartFixation">
                   <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择最早开始日期" v-model="addForm.maxStartDate" clearable></el-date-picker>
                </el-form-item>
                </div>
                <!-- 结束日期 -->
                <el-form-item label="结束日期是否固定：" prop="isEndFixation">
                    <el-select v-model="addForm.isEndFixation" placeholder="结束日期是否固定" style="width:220px;" clearable>
                        <el-option label="固定" value="1"></el-option>
                        <el-option label="不固定" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="最早结束日期：" prop="minEndDate">
                   <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择最早结束日期" v-model="addForm.minEndDate" clearable></el-date-picker>
                </el-form-item>
                <el-form-item label="最晚结束日期：" prop="maxEndDate" v-if="addForm.isEndFixation==2||!addForm.isEndFixation">
                   <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择最晚结束日期" v-model="addForm.maxEndDate" clearable></el-date-picker>
                </el-form-item>

                <!-- 租期区间 -->

                <el-form-item label="是否固定租期：" prop="isTermFixation">
                    <el-select v-model="addForm.isTermFixation" placeholder="是否固定租期" style="width:220px;" clearable>
                        <el-option label="固定" value="1"></el-option>
                        <el-option label="不固定" value="2"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="租期类型：" prop="leaseType" required>
                    <el-select v-model="addForm.leaseType" placeholder="租期类型" style="width:220px;" clearable>
                        <el-option label="天" value="0"></el-option>
                        <el-option label="周" value="1"></el-option>
                        <el-option label="月" value="2"></el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="租期范围" >
                    <el-col :span="11">
                    <el-form-item prop="minDate">
                        <el-input v-model="addForm.minDate" style="width:220px;" clearable></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">~</el-col>
                    <el-col :span="11">
                    <el-form-item prop="maxDate">
                        <el-input v-model="addForm.maxDate" style="width:220px;" clearable></el-input>
                    </el-form-item>
                    </el-col>
                </el-form-item>

                <!-- 价格 -->
                <el-form-item label="价格类型：" prop="daw" required>
                    <el-select v-model="addForm.daw" placeholder="请选择价格类型" style="width:220px;" clearable>
                        <el-option label="天" value="0"></el-option>
                        <el-option label="周" value="1"></el-option>
                        <el-option label="月" value="2"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="价格：" prop="rent">
                    <el-input v-model.trim="addForm.rent" style="width:220px;" clearable></el-input>
                </el-form-item>

                <el-form-item label="是否优惠：" prop="delivery">
                    <el-switch v-model="addForm.delivery"></el-switch>
                </el-form-item>

                <el-form-item label="优惠价格：" prop="saleRent" v-if="addForm.delivery" required>
                    <el-input v-model.trim="addForm.saleRent" style="width:220px;" clearable></el-input >
                </el-form-item>

                <el-form-item label="当前租期状态" prop="status" required>
                    <el-select v-model="addForm.status" placeholder="当前租期状态" style="width:220px;" clearable>
                        <el-option label="未上架" value="1"></el-option>
                        <el-option label="上架中" value="2"></el-option>
                        <el-option label="已下架" value="3"></el-option>
                        <el-option label="已售完" value="4"></el-option>
                        <el-option label="废弃" value="5"></el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitData">确 定</el-button>
            </div>
        </el-dialog>


    </section>
</template>
<script>
import {insertRoomLeaseperiod,deleteRoomLeaseperiod,getInfoById,editRoomLeaseperiod } from '@/api/rent/room'
export default {
    props:{
        id:{
            type:Number
        },
        dataArray:{
            type:Array
        }
    },
    data() {
        return {
            currentId:this.id,
            roomLeaseperiodData:this.dataArray,
            addForm:{
                isStartFixation:undefined,
                minStartDate:undefined,
                maxStartDate:undefined,
                isEndFixation:undefined,
                minEndDate:undefined,
                maxEndDate:undefined,
                isTermFixation:undefined,
                leaseType:undefined,
                minDate:undefined,
                maxDate:undefined,
                daw:undefined,
                rent:undefined,
                delivery:undefined,
                saleRent:undefined,
                status:undefined,
            },
            addFormRules:{},
            dialogFormVisible:false,
            handle:'',
            getDataLoading:false,
        }
    },
    created() {
        
    },
    watch:{
        id(newV,oldV) {
            this.currentId = newV;
        },
        dataArray(newV,oldV){
            this.roomLeaseperiodData = newV;
        }
    },
    methods:{
        // editOrAdd(data,data2){
        //     this.dialogFormVisible = true;
        //     this.resetForm('addForm')
        //     this.handle = data;
        //     if(data=='edit'){
        //         getInfoById(this.currentId).then(res=>{
        //             this.addForm = res.data.leaseperiods[data2];
        //             if(res.data.leaseperiods[data2].saleRent){
        //                 this.addForm.delivery = true;
        //             }
        //         })
        //     }
        // },
        reset(){
            this.addForm = {
                isStartFixation:undefined,
                minStartDate:undefined,
                maxStartDate:undefined,
                isEndFixation:undefined,
                minEndDate:undefined,
                maxEndDate:undefined,
                isTermFixation:undefined,
                leaseType:undefined,
                minDate:undefined,
                maxDate:undefined,
                daw:undefined,
                rent:undefined,
                delivery:undefined,
                saleRent:undefined,
                status:undefined,
            }
            this.resetForm('addForm')
        },
        editLeaseperiod(val){
            getInfoById(this.currentId).then(res=>{
                this.dialogFormVisible = true;
                this.reset()
                this.addForm = res.data.leaseperiods[val];
                if(res.data.leaseperiods[val].saleRent){
                    this.addForm.delivery = true;
                }
            })
        },
        addLeaseperiod(){
            this.dialogFormVisible = true;
            this.reset()
            
        },
        submitData(){
            this.addForm.roomId = this.currentId
            //新增租期
            if(!this.addForm.leaseType){
                this.msgError('请选择租期类型')
                return;
            }
            if(!this.addForm.daw){
                this.msgError('请选择价格类型')
                return;
            }
            // if(!this.addForm.rent){
            //     this.msgError('请输入价格')
            //     return;
            // }
            if(this.addForm.delivery){
                if(!this.addForm.saleRent){
                    this.msgError('请输入优惠价格')
                    return;
                }
            }
            if(!this.addForm.status){
                this.msgError('请选择当前租期状态')
                return;
            }
            const loading = this.$loading({
                lock: true,
                text: '提交中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            if(this.handle=="edit"){
                editRoomLeaseperiod(this.addForm).then(res=>{
                    loading.close();
                        this.dialogFormVisible = false;
                        this.getDataLoading = true;
                        getInfoById(this.currentId).then(Response=>{
                            this.getDataLoading = false;
                            this.roomLeaseperiodData = Response.data.leaseperiods;
                        }).catch(err=>{
                            this.getDataLoading = false;
                        })
                    
                }).catch(e=>{
                    loading.close();
                })
            }else{
                insertRoomLeaseperiod(this.addForm).then(res=>{
                    loading.close();
                    console.log(res)
                    if(res.code===200){
                        this.dialogFormVisible = false;
                        this.getDataLoading = true;
                        getInfoById(this.currentId).then(Response=>{
                            this.getDataLoading = false;
                            this.roomLeaseperiodData = Response.data.leaseperiods;
                        }).catch(err=>{
                            this.getDataLoading = false;
                        })
                    }else{
                        this.msgError(res.msg)
                    }
                }).catch(e=>{
                    loading.close();
                })
            }
            
        },
        delect(item){
            console.log(item)
            this.$confirm('是否废弃当前租期?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                
                deleteRoomLeaseperiod(item.id).then(res=>{
                    
                    if(res.code===200){
                        this.$message({
                            type: 'success',
                            message: '成功!'
                        });
                        this.getDataLoading = true;
                        getInfoById(this.currentId).then(Response=>{
                            this.roomLeaseperiodData = Response.data.leaseperiods;
                            this.getDataLoading = false;
                        }).catch(e=>{
                            this.getDataLoading = false;
                        })
                    }else{
                        this.msgError('失败')
                    }

                    
                    
                })
            }).catch(() => {
                   
            });
            
        }
    }
}
</script>

<style scoped>
    .roomLeaseperiodWrapper .wrapperHeader{
        display: flex;
        justify-content: space-between;
        height: 32px;
        line-height: 32px;
        border-bottom: 1px solid #ddd;
        padding: 0 16px;
        margin-bottom: 24px;
    }
    .roomLeaseperiodWrapper .wrapperHeader i{
        cursor: pointer;
    }
    .content .el-row .el-col{
        display: flex;
        margin-bottom: 8px;
    }
    .content .el-row .el-col .key{
        width: 127px;
        height: 32px;
        font-size: 14px;
        font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif, 'PingFangSC-Regular', 'PingFang SC', sans-serif-400;
        font-weight: 400;
        color: rgba(0,0,0,0.8470588235294118);
        line-height: 22px;
        margin-right: 16px;
    }
    .content .el-row .el-col .value{
        height: 32px;
        font-size: 14px;
        font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif, 'PingFangSC-Regular', 'PingFang SC', sans-serif-400;
        font-weight: 400;
        color: rgba(0,0,0,0.8470588235294118);
        line-height: 22px;
    }
</style>
