<template>
    <div v-loading="loading">

        <div class="contactWrapper" v-if="!addOrEditStatus">
            <div v-if="contactList.length==0" style="padding:32px 0;text-align:center;">暂无佣金信息</div>
            <div class="basicWrapper"  v-for="(item,$index) in contactList" :key="$index">
                <div class="basicTitle">
                    <div class="line"></div>
                    <div class="content" style="display:flex;justify-content:space-between">
                        <div>佣金基本信息</div>
                        <div>
                            <el-button size="mini" type="text" icon="el-icon-edit" @click="editContact(item.id,$index)">编辑</el-button>
                            <el-button size="mini" type="text" icon="el-icon-delete" @click="delContact(item.id)">删除</el-button>
                        </div>
                    </div>
                </div>
                <ul>
                    <li>
                        <el-row>
                            <el-col :span="12">
                                <div class="title">佣金方式：</div>
                                <div class="value">
                                    {{item.commissionType==1?'无佣金':item.commissionType==2?'固定佣金':item.commissionType==3?'固定周租金':item.commissionType==4?'固定利率':item.commissionType==5?'动态租金':'手动计算佣金'}}
                                </div>
                            </el-col>
                            <el-col :span="12" v-if="item.commissionType==2||item.commissionType==3||item.commissionType==4||item.commissionType==6">
                                <div class="title">{{item.commissionType==2?'固定金额':item.commissionType==3?'固定周租金×周':item.commissionType==4?'固定利率%':'佣金金额'}}：</div>
                                <div class="value">{{item.amount}}</div>
                            </el-col>
                            <!-- <el-col :span="12">
                                <div class="title">状态：</div>
                                <div class="value">{{item.status}}</div>
                            </el-col> -->
                            <!-- <el-col :span="12">
                                <div class="title">备注：</div>
                                <div class="value">{{item.remark}}</div>
                            </el-col> -->
                        </el-row>
                    </li>
                </ul>
                <!-- 佣金规则列表 -->
                <div v-if="item.commissionType==5">
                    <div class="basicWrapper">


                        <div class="basicTitle">
                            <div class="line"></div>
                            <div class="content" style="display:flex;justify-content:space-between">
                                <div>佣金规则</div>
                                <!-- <div>
                                    <el-button size="mini" type="text" icon="el-icon-edit" @click="editContact(item.id,$index)">编辑</el-button>
                                    <el-button size="mini" type="text" icon="el-icon-delete" @click="delContact(item.id)">删除</el-button>
                                </div> -->
                            </div>
                        </div>
                        <el-table :data="commissionRulesList">
                            <div v-if="childType==3">
                            
                                <el-table-column label="供应商佣金结算方式" align="center" prop="innerType">
                                    <template slot-scope="scope">
                                        {{scope.row.innerType==1?'利率':scope.row.type==2?'固定':''}}
                                    </template>
                                </el-table-column>
                            </div>
                            
                            <el-table-column label="最小订单数" align="center" prop="minBooking" />
                            <el-table-column label="最大订单数" align="center" prop="maxBooking" />
                            
                            <el-table-column label="租期单位" align="center" prop="termUnit">
                                <template>
                                    <!-- {{scope.row.termUnit==1?'周':scope.row.termUnit==2?'月':scope.row.termUnit==3?'天':scope.row.termUnit==4?'季':'年'}} -->
                                    天
                                </template>
                            </el-table-column>
                            
                            <el-table-column label="最小租期" align="center" prop="minTerm" />
                            <el-table-column label="最大租期" align="center" prop="maxTerm" />

                            <el-table-column label="类型" align="center" prop="type">
                                <template slot-scope="scope">
                                    {{scope.row.type==1?'固定利率':scope.row.type==2?'固定金额':'租期倍数'}}
                                </template>
                            </el-table-column>

                            
                            

                            <el-table-column label="类型值" align="center" prop="value" />

                            <el-table-column label="操作" align="center" width="160px">
                                <template slot-scope="scope">
                                    
                                    <el-button
                                        size="mini"
                                        type="text"
                                        icon="el-icon-edit"
                                        @click="rulesEdit(scope.row)"
                                    >编辑</el-button>

                                    <el-button
                                        size="mini"
                                        type="text"
                                        icon="el-icon-delect"
                                        @click="rulesDel(scope.row)"
                                    >删除</el-button>
                                </template>
                            </el-table-column>

                        </el-table>

                        <!-- <ul>
                            <li>
                                <el-row>
                                    <el-col :span="12">
                                        <div class="title">最小订单数：</div>
                                        <div class="value">{{item.minBooking}}</div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="title">最大订单数：</div>
                                        <div class="value">{{item.maxBooking}}</div>
                                    </el-col>
                                    <el-col :span="24">
                                        <div class="title">租期单位：</div>
                                        <div class="value"></div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="title">最小租期：</div>
                                        <div class="value">{{item.minTerm}}</div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="title">最大租期：</div>
                                        <div class="value">{{item.maxTerm}}</div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="title">类型：</div>
                                        <div class="value"></div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="title">{{item.type==1?'利率':item.type==2?'金额':'倍数'}}：</div>
                                        <div class="value">{{item.value}}</div>
                                    </el-col>
                                </el-row>
                            </li>
                        </ul> -->
                    </div>
                </div>
                    



            </div>
            <el-button type="primary" size="mini" icon="el-icon-plus" v-if="contactList.length==0" @click="add">新增佣金</el-button>
        </div>
        <div v-if="addOrEditStatus">
            <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="115px">


                <span v-if="childType==3">
                    <el-form-item label="佣金方式" prop="commissionType">
                        <el-select v-model="ruleForm.commissionType" placeholder="请选择佣金方式" clearable @change="commissionTypeChange">
                        
                            <el-option label="固定佣金" value="2"></el-option>
                            
                            <el-option label="固定利率" value="4"></el-option>
                            <el-option label="动态租金" value="5"></el-option>
                            
                        </el-select>
                    </el-form-item>

                </span>
                <span v-else>
                    <el-form-item label="佣金方式" prop="commissionType">
                        <el-select v-model="ruleForm.commissionType" placeholder="请选择佣金方式" clearable @change="commissionTypeChange">
                            <el-option label="无佣金" value="1"></el-option>
                            <el-option label="固定佣金" value="2"></el-option>
                            <!-- <el-option label="固定周租金" value="3"></el-option> -->
                            <el-option label="固定利率" value="4"></el-option>
                            <el-option label="动态租金" value="5"></el-option>
                            <el-option label="手动计算佣金" value="6"></el-option>
                        </el-select>
                    </el-form-item>
                </span>
                

                



                <el-form-item :label="lableName" prop="amount" v-if="ruleForm.commissionType==2||ruleForm.commissionType==3||ruleForm.commissionType==4||ruleForm.commissionType==6">
                    <el-input v-model.trim="ruleForm.amount" :placeholder="placeholderName" clearable></el-input>
                </el-form-item>


                <div v-if="ruleForm.commissionType==5">
                    <div class="basicWrapper" v-for="(item,$index) in addCommissionRules" :key="$index">
                        <div class="basicTitle">
                            <div class="line"></div>
                            <div class="content" style="display:flex;justify-content:space-between">
                                <div>佣金规则{{$index+1}}</div>
                                <div>
                                    <el-button size="mini" type="text" icon="el-icon-edit" @click="editRules($index)">编辑</el-button>
                                    <el-button size="mini" type="text" icon="el-icon-delete" @click="delRules($index)">删除</el-button>
                                </div>
                            </div>
                        </div>
                        <ul>
                            <li>
                                <el-row>
                                    <el-col :span="12">
                                        <div class="title">最小订单数：</div>
                                        <div class="value">{{item.minBooking}}</div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="title">最大订单数：</div>
                                        <div class="value">{{item.maxBooking}}</div>
                                    </el-col>
                                    <el-col :span="24">
                                        <div class="title">租期单位：</div>
                                        <div class="value">
                                            天
                                            <!-- {{item.termUnit==1?'周':item.termUnit==2?'月':item.termUnit==3?'天':item.termUnit==4?'季':'年'}} -->
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="title">最小租期：</div>
                                        <div class="value">{{item.minTerm}}</div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="title">最大租期：</div>
                                        <div class="value">{{item.maxTerm}}</div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="title">类型：</div>
                                        <div class="value">{{item.type==1?'固定利率':item.type==2?'固定金额':'租期倍数'}}</div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="title">{{item.type==1?'利率':item.type==2?'金额':'倍数'}}：</div>
                                        <div class="value">{{item.value}}</div>
                                    </el-col>
                                </el-row>
                            </li>
                        </ul>
                    </div>
                </div>



                <div style="text-align:center;">
                    <el-form-item  v-if="ruleForm.commissionType==5">
                        <el-button size="mini" type="text" icon="el-icon-plus" @click="addRules">{{addCommissionRules.length==0?'添加佣金规则':'继续添加佣金规则'}}</el-button>
                    </el-form-item>
                </div>
                
                
                <!-- <el-form-item label="状态" prop="status">
                    <el-select v-model="ruleForm.status" placeholder="请选择状态" clearable>
                        <el-option label="有效" value="1"></el-option>
                        <el-option label="无效" value="2"></el-option>
                    </el-select>
                </el-form-item> -->

                <div style="text-align:right;">
                    <el-form-item>
                        <el-button size="small" @click="addOrEditStatus = false">取消</el-button>
                        <el-button size="small" type="primary" @click="submitForm('ruleForm')">确定</el-button>
                        
                    </el-form-item>
                </div>
                
            </el-form>
        </div>


        <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
            <el-form ref="addform" :model="addform" :rules="addrules" :label-width="childType==3?'148px':'100px'">
                <div v-if="childType==3">
                    <el-form-item label="供应商佣金结算方式" prop="innerType">
                        <el-select v-model="addform.innerType" placeholder="请选择" clearable style="width:100%;">
                            <el-option label="利率" value="1" />
                            <el-option label="固定" value="2" />
                        </el-select>
                    </el-form-item>
                </div>
                



                <el-form-item label="最小订单数" prop="minBooking">
                    <el-input v-model="addform.minBooking" clearable placeholder="请输入最小订单数" type="number" />
                </el-form-item>
                <el-form-item label="最大订单数" prop="maxBooking">
                    <el-input v-model="addform.maxBooking" clearable placeholder="请输入最大订单数"  type="number"/>
                </el-form-item>
                <el-form-item label="租期单位" prop="termUnit">
                    <el-select v-model="addform.termUnit" placeholder="请选择" clearable style="width:100%;">
                        
                        <el-option label="天" value="3"></el-option>
                        <!-- <el-option label="周" value="1"></el-option>
                        <el-option label="月" value="2"></el-option>
                        <el-option label="季" value="4"></el-option>
                        <el-option label="年" value="5"></el-option> -->
                    </el-select>
                </el-form-item>
                <el-form-item label="最小租期" prop="minTerm">
                    <el-input v-model="addform.minTerm" clearable placeholder="请输入最小租期" type="number" />
                </el-form-item>
                <el-form-item label="最大租期" prop="maxTerm">
                    <el-input v-model="addform.maxTerm" clearable placeholder="请输入最大租期"  type="number"/>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select v-model="addform.type" placeholder="请选择" clearable style="width:100%;" @change="typeChange">
                        <el-option label="固定利率" value="1" />
                        <el-option label="固定金额" value="2" />
                        <!-- <el-option label="租期倍数" value="3" /> -->
                    </el-select>
                </el-form-item>



                <el-form-item :label="label" prop="value" v-if="addform.type">
                    <el-input v-model="addform.value" clearable :placeholder="placeholder"  type="number"/>
                </el-form-item>


                

                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitFormRule">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>




    </div>
</template>
<script>
import { editCommissionRules,getCommissionRulesDetails,delCommissionRules,listCommissionRules,listCommission,addCommission,editCommission,getCommissionDetails,delCommission } from "@/api/houseCommission/supplierCommission";
export default {
    props:{
        currentType: {
            type: String
        },
        currentId:{
            // type: Number
        },
    },
    
    data(){
        return {
            loading:false,
            childType:this.currentType,
            childId:this.currentId,
            open:false,
            title:'',
            contactList:[],
            commissionRulesList:[],
            addOrEditStatus:false,//新增或编辑
            lableName:'',
            placeholderName:'',
            ruleForm: {
                commissionType:undefined,
                amount:undefined,
                status:'1',
            },
            rules: {
                commissionType:[
                    { required: true, message: '请选择佣金方式', trigger: 'change' }
                ],
                // amount:[
                //     { required: true, message: '此字段不能为空', trigger: 'blur' },
                // ],
                // status:[
                //     { required: true, message: '请选择状态', trigger: 'change' }
                // ]
            },
            addCommissionRules:[],
            addform:{
                termUnit:'3'
            },
            addrules:{
                innerType:[
                    { required: true, message: '请选择供应商佣金结算方式', trigger: 'change' }
                ],
                // minBooking:[
                //     { required: true, message: '请输入最小订单数', trigger: 'blur' },
                // ],
                // maxBooking:[
                //     { required: true, message: '请输入最大订单数', trigger: 'blur' },
                // ],
                // termUnit:[
                //     { required: true, message: '请选择租期单位', trigger: 'change' }
                // ],
                // minTerm:[
                //     { required: true, message: '请输入最小租期', trigger: 'blur' },
                // ],
                // maxTerm:[
                //     { required: true, message: '请输入最大租期', trigger: 'blur' },
                // ],
                // type:[
                //     { required: true, message: '请选择类型', trigger: 'change' }
                // ],
                // value:[
                //     { required: true, message: '此字段不能为空', trigger: 'blur' },
                // ],
            },
            label:'',
            placeholder:'',
            isEdit:false,
            currentIndex:'',

            isCommissionEdit:false,
            directEdit:false,
        }
    },
    created(){
        //this.getList()
    },
    watch: {
        currentType: function(newV,oldV) {
            this.childType = newV
        },
        currentId(newV,oldV){
            this.childId = newV;
        }
    },
    methods:{
        getList(){
            this.loading = true;
            listCommission({masterId:this.childId,type:this.childType}).then(res=>{
                if(res.code===200){
                    this.loading = false;
                    if(res.data){
                        this.contactList[0] = res.data;
                        this.loading = true;
                        listCommissionRules({commissionId:res.data.id}).then(res2=>{
                            this.loading = false;
                            this.commissionRulesList = res2.rows;
                        }).catch(e=>{
                            this.loading = false;
                        })
                    }else{
                        this.contactList = []
                    }
                }else{
                    this.loading = false;
                }
            }).catch(e=>{
                this.loading = false;
            })
        },
        // 新增佣金
        add(){
            this.directEdit = false;
            this.addCommissionRules = [];
            this.addOrEditStatus = true;
            this.ruleForm.commissionType =undefined;
            this.isCommissionEdit = false;
        },
        editContact(id,index){
            this.directEdit = false;
            this.isCommissionEdit = true;
            console.log(id)
            this.loading = true;
            getCommissionDetails(id).then(res=>{
                this.loading = false;
                if(res.code===200){
                    this.addCommissionRules = [];
                    this.addOrEditStatus = true;
                    if(res.data.commissionType==2){
                        this.lableName = '固定金额'
                        this.placeholderName = '请输入固定佣金金额'
                    }
                    if(res.data.commissionType==3){
                        this.lableName = '固定周租金×周'
                        this.placeholderName = '请输入固定周租金×周'
                    }
                    if(res.data.commissionType==4){
                        this.lableName = '固定利率%'
                        this.placeholderName = '请输入固定固定利率'
                    }
                    if(res.data.commissionType==6){
                        this.lableName = '佣金金额'
                        this.placeholderName = '请输入佣金金额'
                    }
                    this.ruleForm = res.data;

                    if(res.data.commissionType==5){//动态佣金
                        this.loading = true;
                        listCommissionRules({commissionId:res.data.id}).then(res2=>{
                            this.loading = false;
                            this.addCommissionRules = res2.rows;
                        }).catch(e=>{
                            this.loading = false;
                        })
                    }
                }else{
                    this.msgError(res.msg)
                }
            }).catch(e=>{
                this.loading = false;
            })
        },
        rulesEdit(row){
            this.directEdit = true;
            this.loading = true;
            getCommissionRulesDetails(row.id).then(res=>{
                this.loading = false;
                this.open = true;
                this.title = '编辑佣金规则'
                res.data.type = res.data.type.toString();
                if(res.data.type==1){
                    this.label="利率";
                    this.placeholder = "请输入利率"
                }else if(res.data.type==2){
                    this.label="金额";
                    this.placeholder = "请输入固定金额"
                }else {
                    this.label="倍数";
                    this.placeholder = "请输入租期倍数"
                }
                this.addform = res.data;
                
            }).catch(e=>{
                this.loading = false;
            })
        },
        rulesDel(row){ 

            this.$confirm('是否确认删除当前佣金规则?', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function() {
                return delCommissionRules(row.id);
            }).then(() => {
                this.getList();
                this.msgSuccess("删除成功");
            }).catch(function() {});

        },
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
            if (valid) {
                if(this.ruleForm.commissionType==5){
                    if(this.addCommissionRules.length==0){
                        this.$message({
                            message: '请添加佣金规则',
                            type: 'warning'
                        });
                        return;
                    }
                }
               
                if(this.isCommissionEdit){
                    this.loading = true;
                    if(this.ruleForm.commissionType==5){
                        this.ruleForm.list = this.addCommissionRules;
                    }else{
                        this.ruleForm.list = []
                    }
                    
                    addCommission(this.ruleForm).then(res=>{
                        this.loading = false;
                        if(res.code===200){
                            this.addOrEditStatus = false;
                            this.$message({message: '修改成功',type: 'success'});
                            this.getList();
                        }else{
                            this.$message.error('修改失败');
                        }
                    }).catch(e=>{
                        this.loading = false;
                        this.$message.error('网络错误');
                    })
                }else{

                    this.ruleForm.masterId = this.childId;
                    this.ruleForm.type = this.childType;
                    if(this.ruleForm.commissionType==5){
                        this.ruleForm.list = this.addCommissionRules;
                    }else{
                        this.ruleForm.list = []
                    }
                    
                    this.loading = true;

                    addCommission(this.ruleForm).then(res=>{
                        this.loading = false;
                        if(res.code===200){
                            this.addOrEditStatus = false;
                            this.$message({message: '添加成功',type: 'success'});
                            this.getList();
                        }else{
                            this.$message.error('添加失败');
                        }
                    }).catch(e=>{
                        this.loading = false;
                        this.$message.error('网络错误');
                    })
                }
                
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        commissionTypeChange(val){
            this.ruleForm.amount=undefined
            if(val==2){
                this.lableName = '固定金额'
                this.placeholderName = '请输入固定佣金金额'
            }
            if(val==3){
                this.lableName = '固定周租金×周'
                this.placeholderName = '请输入固定周租金×周'
            }
            if(val==4){
                this.lableName = '固定利率%'
                this.placeholderName = '请输入固定固定利率'
            }
            if(val==6){
                this.lableName = '佣金金额'
                this.placeholderName = '请输入佣金金额'
            }
        },
        // 表单重置
        reset() {
            this.addform = {
                status: "1",
                minBooking:undefined,
                maxBooking:undefined,
                termUnit:'3',
                minTerm:undefined,
                maxTerm:undefined,
                type:undefined,
                value:undefined,
            };
            this.resetForm("addform");
        },
        //添加佣金规则
        addRules(){
            
            this.reset();
            this.title = '添加佣金规则'
            this.open = true;
            console.log(this.addCommissionRules)
            this.isEdit = false;
        },

        editRules(index){
            this.reset();
            this.open = true;
            this.title = '编辑佣金规则'
            this.currentIndex = index;
            this.isEdit = true;
            let newData = JSON.parse(JSON.stringify(this.addCommissionRules[index]));
            this.addform = newData
        },
        delRules(index){
            this.$confirm('是否删除当前佣金规则?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.addCommissionRules.splice(index,1) 
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                  
            });
            
        },
        delContact(row){//删除佣金
            


            this.$confirm('是否确认删除当前佣金?', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function() {
                return delCommission(row);
            }).then(() => {
                this.getList();
                this.msgSuccess("删除成功");
            }).catch(function() {});

        },
        typeChange(val){
            this.addform.value = undefined;
            if(val==1){
                this.label="利率";
                this.placeholder = "请输入利率"
            }
            if(val==2){
                this.label="金额";
                this.placeholder = "请输入固定金额"
            }
            if(val==3){
                this.label="倍数";
                this.placeholder = "请输入租期倍数"
            }
        },
        submitFormRule(){
            
            this.$refs["addform"].validate(valid => {
                if (valid) {

                    //直接修改佣金规则
                    if(this.directEdit){
                        this.loading = true;
                        editCommissionRules(this.addform).then(res=>{
                            this.loading = false;
                            if(res.code===200){
                                this.open = false;
                                this.getList()
                            }else{
                                this.msgError(res.msg)
                            }
                        }).catch(e=>{
                            this.loading = false;
                        })
                        
                        return;
                    }





                    //判断是添加还是修改
                    let newData = JSON.parse(JSON.stringify(this.addform));
                    if(this.isEdit){
                        this.addCommissionRules[this.currentIndex] = newData
                    }else{
                        this.addCommissionRules.push(newData);
                    }
                    this.open = false;
                }
            })
        },
        cancel(){
            this.open = false;
            this.reset();
        }
    }
}
</script>
<style scoped>
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
        width: 170px;
        padding-right: 10px;
        color: #999;
        margin-bottom: 1px;
    }
    .basicWrapper ul li .el-col .value{
        word-break: break-all;
        flex: 1;
    }
</style>
<style>
input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type="number"]{
        -moz-appearance: textfield;
    }
</style>