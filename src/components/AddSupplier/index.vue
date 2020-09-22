<template>
    <div class="wrapper" v-loading="currentAllStatus">
        <el-steps :active="stepActive" finish-status="success" align-center>
            <el-step title="基础信息" @click.native="on_step(1)"></el-step>
            <el-step title="联系人信息" @click.native="on_step(2)"></el-step>
            <el-step title="其他信息" @click.native="on_step(3)"></el-step>
            <el-step title="合同信息" @click.native="on_step(4)"></el-step>
            <el-step title="附件信息" @click.native="on_step(5)"></el-step>
        </el-steps>

        <div>
            <!-- <vfd></vfd> -->
            <!-- <flow-chart></flow-chart>      -->
        </div>
        <div class="content" style="margin-top:24px;">
            <div v-show="stepActive==1" style="max-width: 900px;text-align:center;margin:auto;">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px">
                    <el-form-item label="国家" prop="countryId" >
                        <el-select v-model="ruleForm.countryId" placeholder="请选择国家" style="width:100%;" clearable>
                            <el-option
                                v-for="item in countryList"
                                :key="item.id"
                                :label="item.nameZh"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="房东/中介/公寓商名称" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入房东/中介/公寓商名称" clearable></el-input>
                    </el-form-item>

                    <!-- <el-form-item label="YIHOME负责人" prop="owner">
                        <el-select v-model="ruleForm.owner" @change="selectOwnerChange" placeholder="请选择负责人" style="width:100%;" clearable>
                            <el-option
                                v-for="item in ownerList"
                                :key="item.userId"
                                :label="item.nickName"
                                :value="item.userId">
                            </el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="YIHOME负责人" prop="ownerName" style="display:none;">
                        <el-input v-model="ruleForm.ownerName" clearable></el-input>
                    </el-form-item>
                    
                    <el-form-item label="总床数(正整数)" prop="beds">
                        <el-input class="inputIsNumber" type="number" v-model="ruleForm.beds" placeholder="请输入供应商总床数" clearable></el-input>
                    </el-form-item>

                    <el-form-item label="状态" prop="status">
                        <el-select v-model="ruleForm.status" placeholder="请选择" style="width:100%;">
                        <el-option label="有效" value="1"></el-option>
                        <el-option label="无效" value="0"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="如何判定由YIHOME推荐" prop="recommended">
                        <!-- <Editor v-model="ruleForm.recommended" />  -->
                        <vue-ueditor-wrap v-model="ruleForm.recommended" :config="myConfig" :key="1"  @ready="uready_f"></vue-ueditor-wrap>
                    </el-form-item>
                    
                    <el-form-item label="备注" prop="remark">
                        <vue-ueditor-wrap v-model="ruleForm.remark" :config="myConfig" :key="2"></vue-ueditor-wrap>
                    </el-form-item>

                    <!-- <el-form-item label="备注" prop="remark2">
                        <vue-ueditor-wrap v-model="ruleForm.remark2" :key="3"></vue-ueditor-wrap>
                    </el-form-item> -->
                </el-form>
            </div>
            <div v-show="stepActive==2" style="max-width: 700px;text-align:center;margin:auto;">
                <el-form label-width="130px">
                    <div v-for="(item,$index) in contactList" :key="$index"> 
                        <el-form-item label="负责人姓名:">
                            <el-input v-model="item.name" disabled clearable></el-input>
                            <el-button style="position:absolute;margin-left:10px;margin-top:3px;" size="mini" type="text" icon="el-icon-edit" @click="editContact(item.id,$index)">编辑</el-button>
                            <el-button style="position:absolute;margin-left:70px;margin-top:3px;" size="mini" type="text" icon="el-icon-delete" @click="delContact(item.id)">删除</el-button>
                        </el-form-item>
                        <el-form-item label="邮件:">
                            <el-input v-model="item.email" disabled clearable></el-input>
                        </el-form-item>
                        <el-form-item label="电话:">
                            <el-input v-model="item.phone" disabled clearable></el-input>
                        </el-form-item>
                        <el-form-item label="WeChat/Whatsapp:" style="">
                            <el-input v-model="item.chat" disabled clearable></el-input>
                        </el-form-item>
                        <el-form-item >
                            <div style="border-bottom:1px solid #ccc;"></div>
                        </el-form-item>
                    </div>
                    <el-form-item label="" class="lastItem">
                        
                        <el-button @click="addContact" style="width:100%;" type="primary" icon="el-icon-plus">新增</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div v-show="stepActive==3" style="max-width: 900px;text-align:center;margin:auto;">
                <el-form :model="processForm" :rules="processRules" ref="processForm" label-width="215px">
                    
                    <el-form-item label="可否选房" prop="isSelectd">
                        <el-select v-model="processForm.isSelectd" placeholder="请选择" style="width:100%;">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item label="备注" prop="selectHouseRemark" v-if="processForm.isSelectd==1">
                        <vue-ueditor-wrap v-model="processForm.selectHouseRemark" :key="79"></vue-ueditor-wrap>
                    </el-form-item>

                    <el-form-item label="是否选择楼层" prop="floorSelect">
                        <el-select v-model="processForm.floorSelect" placeholder="请选择" style="width:100%;">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否可以知道室友性别" prop="chumSexSelect">
                        <el-select v-model="processForm.chumSexSelect" placeholder="请选择" style="width:100%;">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="团队订房是否可安排住同一个flat" prop="flatSelect">
                        <el-select v-model="processForm.flatSelect" placeholder="请选择" style="width:100%;">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否接受紧急入住" prop="urgencySelect">
                        <el-select v-model="processForm.urgencySelect" placeholder="请选择" style="width:100%;">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="订房流程"  prop="reservationProcess">
                        <!-- <Editor v-model="processForm.reservationProcess" /> -->
                        <vue-ueditor-wrap v-model="processForm.reservationProcess" :config="myConfig" :key="6"></vue-ueditor-wrap>
                    </el-form-item>
                    <el-form-item label="预约看房流程" prop="lookProcess">
                        <!-- <Editor v-model="processForm.lookProcess" /> -->
                        <vue-ueditor-wrap v-model="processForm.lookProcess" :config="myConfig" :key="7"></vue-ueditor-wrap>
                    </el-form-item>
                    <el-form-item label="可预订人群" prop="reservationPeople">
                        <!-- <Editor v-model="processForm.reservationPeople" /> -->
                        <vue-ueditor-wrap v-model="processForm.reservationPeople" :config="myConfig" :key="8"></vue-ueditor-wrap>
                    </el-form-item>
                    <el-form-item label="预定取消政策" prop="cancel">
                        <!-- <Editor v-model="processForm.cancel" /> -->
                        <vue-ueditor-wrap v-model="processForm.cancel" :key="10" :config="myConfig"></vue-ueditor-wrap>
                    </el-form-item>
                    <el-form-item label="转租政策" prop="sublet">
                        <!-- <Editor v-model="processForm.sublet" /> -->
                        <vue-ueditor-wrap v-model="processForm.sublet" :key="11" :config="myConfig"></vue-ueditor-wrap>
                    </el-form-item>
                    <el-form-item label="疫情退改政策" prop="specialPolicy">
                        <!-- <Editor v-model="processForm.specialPolicy" /> -->
                        <vue-ueditor-wrap v-model="processForm.specialPolicy" :key="12" :config="myConfig"></vue-ueditor-wrap>
                    </el-form-item>
                    
                    <!-- <el-form-item label="备注" prop="remark">
                       <Editor v-model="processForm.remark" />
                    </el-form-item> -->
                         
                </el-form>
            </div>

            <div v-show="stepActive==4" style="max-width: 900px;text-align:center;margin:auto;">
                <el-form :model="contractForm" ref="contractForm" label-width="180px">
                    <el-form-item label="确定合同开始日期" prop="contractStartDate">
                        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="contractForm.contractStartDate" clearable style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="确定合同结束日期" prop="contractEndDate">
                        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="contractForm.contractEndDate" clearable style="width: 100%;"></el-date-picker>
                    </el-form-item>

                    <el-form-item label="合同签订日期" prop="contractDate">
                        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="contractForm.contractDate" clearable style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="合同有效期（天）" prop="contractValid">
                        <el-input type="number" v-model="contractForm.contractValid" placeholder="请输入合同有效期（天）" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="付款方式" prop="paymentType">
                        <el-select v-model="contractForm.paymentType" multiple placeholder="请选择付款方式" style="width:100%;">
                            <el-option
                                v-for="item in supplierType"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="付款计划" prop="paymentPlan">
                        <vue-ueditor-wrap v-model="contractForm.paymentPlan" :config="myConfig" :key="9"></vue-ueditor-wrap>
                        
                    </el-form-item>
                    <el-form-item label="佣金方案" prop="commission">
                        <vue-ueditor-wrap v-model="contractForm.commission" :config="myConfig" :key="4"></vue-ueditor-wrap>
                    </el-form-item>

                    <el-form-item label="佣金支付周期" prop="paymentCycle">
                        <vue-ueditor-wrap v-model="contractForm.paymentCycle" :config="myConfig" :key="5"></vue-ueditor-wrap>
                    </el-form-item>

                    
                    <el-form-item label="需缴纳的款项金额" prop="paymentAmount">
                        <vue-ueditor-wrap v-model="contractForm.paymentAmount" :config="myConfig" :key="6"></vue-ueditor-wrap>
                    </el-form-item>
                    
                    
                </el-form>
            </div>

            <div v-show="stepActive==5" style="max-width: 900px;text-align:center;margin:auto;">
                <el-upload
                    class="supplier-uploader"
                    :action="uploadImgUrl"
                    :headers="headers"
                    list-type="picture-card"
                    :data="dataparams"
                    multiple
                    :file-list="fileList"
                    :on-success="handleAvatarSuccess"
                    :before-remove="pictureBeforeRemove"
                    :on-preview="handlePictureCardPreview"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="supplier-img">
                    <i  class="el-icon-plus supplier-uploader-icon"></i>
                </el-upload>
            </div>
        </div>
        <div class="buttonWrapper">
            <el-button type="primary" size="small" v-show="stepActive!=5" :disabled="stepActive==5" @click="next()">下一步</el-button>
            
            <el-button type="primary" size="small" v-show="stepActive==5" @click="complete()">完成</el-button>

            <el-button size="small" :disabled="stepActive==1" @click="prev()">上一步</el-button>
        </div>


        <el-dialog title="负责人信息" :visible.sync="dialogFormVisible" width="600px">
            <el-form :model="form" label-width="149px" :rules="contactRules" ref="form">
                <el-form-item label="负责人姓名："  prop="name">
                    <el-input v-model="form.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="邮件："  prop="email">
                    <el-input v-model="form.email" clearable></el-input>
                </el-form-item>
                <el-form-item label="电话："  prop="phone">
                    <el-input v-model="form.phone" clearable></el-input>
                </el-form-item>
                <el-form-item label="WeChat/Whatsapp："  prop="chat">
                    <el-input v-model="form.chat" clearable></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitFormData('form')">确 定</el-button>
            </div>
        </el-dialog>



    </div>
</template>
<script>
import { listDictionaries } from "@/api/user/dictionaries";
import { 
    getSupplier, delSupplier, addSupplier, updateSupplier,
    addSupplierContact,updateSupplierContact,getSupplierContact,delSupplierContact,getContactDetails,
    getSupplierSyncList,addSupplierSync,updateSupplierSync,getSyncDetails,
    getSupplierAccessoryList,addSupplierAccessory,updateSupplierAccessory,delAccessory,
    getContract,addContract,editContract
} from "@/api/supplier";
import { getUserByRole } from "@/api/user/users";
import flowChart from "@/components/FlowChart";
import Editor from '@/components/Editor'
import { getToken } from '@/utils/auth'

import VueUeditorWrap from '@/components/UE';

import { scrollTo } from '@/utils/scroll-to'
export default {
    components: {
           // vfd
           flowChart,
           Editor,
           VueUeditorWrap
        },
    props:{
        supplierData:{
            type:Object
        }
    },
    data(){
        return {
            myConfig:{
                autoHeightEnabled: false,
                initialFrameHeight: 200,
                initialFrameWidth: '100%',
            },
            fileList: [],
            uploadImgUrl: process.env.VUE_APP_UPLOAD_URL, 
            // uploadImgUrl:'http://47.100.186.108:8080/admin/common/upload',
            imageUrl: '',
            headers: {
                Authorization: 'Bearer ' + getToken()
            },
            dataparams: { 'supplierId': '' },
            currentAllStatus:false,
            stepActive:1,
            countryList:[],
            supplierType:[],//付款方式
            currentData:this.supplierData,
            ruleForm:{
                countryId: undefined,
                name: undefined,
                isSelectd: undefined,
                recommended: undefined,
                cancel: undefined,
                sublet: undefined,
                paymentType: undefined,
                paymentPlan: undefined,
                status:'1',
                owner:undefined,
                ownerName:undefined,
                beds:undefined,
                remark:''
            },
            rules:{
                countryId: [
                    { required: true, message: '请选择国家', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入房东/中介/公寓商名称', trigger: 'change' }
                ],
                // owner:[
                //     { required: true, message: '请选择YIHOME负责人', trigger: 'change' }
                // ],
                
                status:[
                    { required: true, message: '请选择状态', trigger: 'change' }
                ]
            },
            contactList:[
                //{name:'小王',email:'123@qq.com',phone:'13262586115',chat:'lala123'},
            ],
            currentSupplierId:'',//当前的ID
            dialogFormVisible:false,
            form:{
                name:'',
                email:'',
                phone:'',
                chat:'',
                type:'1',
            },
            contactRules:{
                name: [
                    { required: true, message: '请输入负责人姓名', trigger: 'blur' },
                ],
                email: [
                    { required: true, message: '请输入负责人邮箱', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
            },
            processForm:{
                reservationProcess:'',
                lookProcess:'',
                remark:'',
            },
            processRules:{

            },
            ownerList:[],

            isSyncStatus:false,
            isContract:false,

            contractForm:{
                paymentAmount:'<ol style="list-style-type: decimal;" class=" list-paddingleft-2"><li><p>定金:</p></li><li><p>押金:</p></li><li><p>房租:</p></li><li><p>其它(如清洁费，服务费等)<br/></p></li></ol><p><br/></p><p><br/></p>'
            },
        }
    },
    watch:{
        supplierData(newValue,oldValue){
            this.currentData = newValue
        }
    },
    created(){
        this.getYihomeCountry();
        this.getSupplierType();
        this.getSystemUser();
        if(JSON.stringify(this.currentData) != "{}"){
            if(this.currentData.paymentType){
                this.currentData.paymentType = parseInt(this.currentData.paymentType)
            }
            
            this.ruleForm = this.currentData;
            this.currentSupplierId = this.currentData.id

            this.processForm = this.currentData;

            this.isSyncStatus = true;
            this.isContract = true;

            this.dataparams.supplierId = this.currentData.id
        }
        console.log(this.serverImgUrl,11)
    },
    methods: {
        on_step(val){
            //如果当前是编辑状态
            if(JSON.stringify(this.currentData) != "{}"){
                this.stepActive = val;
                console.log(val)
                if(val==2){//获取联系人信息
                    this.getContactList();
                }else if(val==3){
                    this.getSyncData()
                }else if(val==4){
                    this.getContractMethods()
                }else if(val==5){
                    this.getAccessory();
                }
            }
        },
        uready_f(editor){
            //console.log(1111111111111111111)
        },
        getSystemUser(){
            getUserByRole('110,111').then(res=>{
                if(res.code===200){
                    this.ownerList = res.data;
                }else{
                    this.msgError(res.msg);
                }
            }).catch(e=>{
                
            })
        },
        selectOwnerChange(val){
            if(val){
                this.ownerList.forEach(el=>{
                    if(val==el.userId){
                        this.ruleForm.ownerName = el.userName;
                        return;
                    }
                })
            }else{
                this.ruleForm.ownerName = undefined;
            }
        },
        getYihomeCountry(){
            this.countryList = JSON.parse(localStorage.getItem('YIHOME_country'))
        },
        getSupplierType(){
            var list = JSON.parse(localStorage.getItem('YIHOME_user_type'))
            if(list){
                list.forEach(element => {
                    if(element.parentId==31){
                        this.supplierType.push(element)
                    }
                });
            }else{
                listDictionaries().then(response => {
                    response.data.forEach(element => {
                        if(element.parentId==31){
                            this.supplierType.push(element)
                        }
                    });
                });
            }
        },
        
        checkRate(nubmer) {
            //判断正整数/[1−9]+[0−9]∗]∗/
            var re = /^[0-9]+.?[0-9]*/;//
            if (!re.test(nubmer)) {
                return false;
            }
            return true;
        },
        next(){
            if (this.stepActive == 1) {
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        //判断新增还是修改
                        if(this.currentData.id){
                            if(this.ruleForm.beds){
                                if(!this.checkRate(parseInt(this.ruleForm.beds))){
                                    this.msgError('请输入正确的总床位数');
                                    return;
                                }
                            }

                            this.currentAllStatus = true;
                            updateSupplier(this.ruleForm).then(res=>{
                                this.currentAllStatus = false;
                                if(res.code===200){
                                    this.stepStatus()
                                    this.getContactList();
                                }
                            }).catch(e=>{
                                this.currentAllStatus = false;
                            })
                        }else{

                            if(this.ruleForm.beds){
                                if(!this.checkRate(parseInt(this.ruleForm.beds))){
                                    this.msgError('请输入正确的总床位数');
                                    return;
                                }
                            }
                            this.currentAllStatus = true;
                            addSupplier(this.ruleForm).then(res=>{
                                this.currentAllStatus = false;
                                if(res.code===200){
                                    this.currentSupplierId = res.data;
                                    this.dataparams.supplierId = res.data
                                    this.stepStatus()
                                    this.getContactList();


                                    //赋值给currentData
                                    getSupplier(res.data).then(response => {
                                        if(response.code===200){
                                            this.currentData = response.data;
                                            this.ruleForm = this.currentData;
                                        }else{
                                            this.msgError(response.msg);
                                        }
                                    });
                                }
                            }).catch(e=>{
                                this.currentAllStatus = false;
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }else if(this.stepActive == 2){
                this.getSyncData()
                this.stepStatus();
            }else if(this.stepActive == 3){
                //this.stepStatus();
                //判断修改还是新增其他信息
                if(this.isSyncStatus){//修改
                    this.currentAllStatus = true;
                    this.processForm.supplierId = this.currentData.id
                    updateSupplierSync(this.processForm).then(res=>{
                        this.currentAllStatus = false;
                        this.stepStatus();
                        this.getContractMethods()
                    }).catch(e=>{
                        this.currentAllStatus = false;
                    })
                }else{//新增
                    this.currentAllStatus = true;
                    this.processForm.supplierId = this.currentData.id
                    addSupplierSync(this.processForm).then(res=>{
                        this.currentAllStatus = false;
                        if(res.code===200){
                            this.isSyncStatus = true;
                            this.stepStatus();

                            this.getContractMethods()
                        }else{
                            this.msgError(res.msg)
                        }
                    }).catch(e=>{
                        this.currentAllStatus = false;
                    })
                }
            }else if(this.stepActive == 4){
                //判断修改还是新增合同信息
                if(this.isContract){//修改
                    
                    if(this.contractForm.paymentType){
                        this.contractForm.paymentType = this.contractForm.paymentType.join()
                    }
                    this.contractForm.supplierId = this.currentData.id;
                    if(this.contractForm.contractValid){
                        if(!this.checkRate(parseInt(this.contractForm.contractValid))){
                            
                            this.msgError('请输入正确的合同有效期');
                            return;
                        }
                    }
                    this.currentAllStatus = true;
                    editContract(this.contractForm).then(res=>{
                        this.currentAllStatus = false;
                        //获取附件
                        this.getAccessory();
                        this.stepStatus();
                    }).catch(e=>{
                        this.currentAllStatus = false;
                    })
                }else{//新增
                    this.currentAllStatus = true;
                    this.contractForm.supplierId = this.currentData.id;
                    this.contractForm.paymentType = this.contractForm.paymentType.join(',')
                    if(this.contractForm.contractValid){
                        if(!this.checkRate(parseInt(this.contractForm.contractValid))){
                            this.msgError('请输入正确的合同有效期');
                            return;
                        }
                    }
                    addContract(this.contractForm).then(res=>{
                        this.currentAllStatus = false;
                        if(res.code===200){
                            this.isContract = true;
                            //获取附件
                            this.getAccessory();
                            this.stepStatus();
                        }else{
                            this.msgError(res.msg)
                        }
                    }).catch(e=>{
                        this.currentAllStatus = false;
                    })
                }
            }
            
        },
        getSyncData(){
            this.currentAllStatus = true;
            getSupplierSyncList({supplierId:this.currentData.id}).then(res=>{
                this.currentAllStatus = false;
                if(res.code===200){
                    this.isSyncStatus = false;
                    if(res.rows.length!=0){
                        this.processForm = res.rows[0];
                        this.isSyncStatus = true
                    }
                    
                }else{
                    this.msgError(res.msg)
                }
            })
        },
        getAccessory(){
            getSupplierAccessoryList({supplierId:this.currentData.id}).then(res=>{
                this.fileList = res.rows;
                this.fileList.forEach(el=>{
                    el.weburl = el.url; 
                    var str = el.url.substring(el.url.lastIndexOf("\.") + 1, el.url.length);
                    if(str=='jpg'||str=='png'||str=='jpeg'){
                        el.url =this.serverImgUrl+el.url
                    }else{
                        //el.url = el.url.substring(el.url.lastIndexOf("\.") + 1, el.url.length);
                    }
                    
                    if(str=="xlsx"){
                        el.url  = "https://www.inyihome.com/upload/excel.png"
                    }
                    if(str=="docx"){
                        el.url  = "https://www.inyihome.com/upload/word.png"
                    }
                    if(str=="pdf"){
                        el.url  = "https://www.inyihome.com/upload/PDF.png"
                    }




                    // el.weburl = el.url; 
                    // el.url = el.url.substring(el.url.lastIndexOf("\.") + 1, el.url.length);
                    // if(el.url=="xlsx"){
                    //     el.url  = "https://www.inyihome.com/upload/excel.png"
                    // }
                    // if(el.url=="docx"){
                    //     el.url  = "https://www.inyihome.com/upload/word.png"
                    // }
                    // if(el.url=="pdf"){
                    //     el.url  = "https://www.inyihome.com/upload/PDF.png"
                    // }
                })
            })
        },
        prev(){
            --this.stepActive
            if (this.stepActive < 1) this.stepActive = 1
            scrollTo(0, 800)
        },
        stepStatus() {
            if (this.stepActive++ > 5) {
                this.stepActive = 1
            }
            scrollTo(0, 800)
        },
        //获取合同信息
        getContractMethods(){
            this.currentAllStatus = true;
            getContract({supplierId:this.currentSupplierId}).then(res=>{
                this.currentAllStatus = false;
                if(res.rows.length>0){
                    
                    const sss = []
                    res.rows[0].paymentAmount = '<ol style="list-style-type: decimal;" class=" list-paddingleft-2"><li><p>定金:</p></li><li><p>押金:</p></li><li><p>房租:</p></li><li><p>其它(如清洁费，服务费等)<br/></p></li></ol><p><br/></p><p><br/></p>'
                    if(res.rows[0].paymentType){
                        res.rows[0].paymentType =res.rows[0].paymentType.split(',');
                        
                        res.rows[0].paymentType.forEach(el=>{
                            sss.push(parseInt(el));
                        })
                    }
                    console.log(sss)

                    this.contractForm = res.rows[0];
                    this.contractForm.paymentType = sss
                }
            })
        },
        getContactList(){
            this.currentAllStatus = true;
            getSupplierContact({masterId:this.currentSupplierId,type:1}).then(res=>{
                this.currentAllStatus = false;
                this.contactList = res.rows;
            })
        },
        addContact(){
            this.reset();
            this.dialogFormVisible = true;
        },
        reset() {
            this.form = {
                name: undefined,
                email: undefined,
                phone: undefined,
                chat: undefined,
                type:'1',
            }
            this.resetForm('form')
        },
        submitFormData(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.form.masterId){
                        updateSupplierContact(this.form).then(res=>{
                            this.dialogFormVisible = false;
                            if(res.code===200){
                                this.getContactList();
                            }else{
                                this.msgError(res.msg)
                            }
                        })
                    }else{
                        this.form.masterId = this.currentSupplierId;
                        addSupplierContact(this.form).then(res=>{
                            this.dialogFormVisible = false;
                            if(res.code===200){
                                this.getContactList();
                            }else{
                                this.msgError(res.msg)
                            }
                        })
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        delContact(id){//删除联系人

            this.$confirm('是否删除当前联系人?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delSupplierContact(id).then(res=>{
                    if(res.code===200){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getContactList();
                    }
                })
            }).catch(() => {
                        
            });

            
        },
        //编辑当前联系人
        editContact(id,index){
            getContactDetails(id).then(res=>{
                if(res.code===200){
                    this.reset();
                    this.dialogFormVisible = true;
                    this.form = res.data;
                }else{
                    this.msgError(res.msg)
                }
            })
            
        },
        complete(){
            this.$parent.closeAdd();
            this.$parent.getList();
            // this.ruleForm.reservationProcess = this.processForm.reservationProcess;
            // this.ruleForm.lookProcess = this.processForm.lookProcess;
            // this.ruleForm.remark = this.processForm.remark;
            // updateSupplier(this.ruleForm).then(res=>{
            //     if(res.code===200){
            //         this.$parent.closeAdd()
            //         this.$parent.getList();
            //     }else{
            //         this.msgError(res.msg)
            //     }
            // })
        },
        handleAvatarSuccess(response, file, fileList) {
            var fileType = file.raw.type;
            if(response.code===200){
                
                //$('.supplier-uploader ul li .el-upload-list__item-actions .el-icon-zoom-in').attr('el-icon-zoom-in','el-icon-view')
                
                const obj = {
                    url: response.fileName,
                    supplierId: this.currentData.id,
                    fileName:response.oldFileName
                }
                addSupplierAccessory(obj).then(res=>{
                    if (res.code == 200) {
                        response.id = res.data
                        file.id = res.data
                        console.log(fileList);
                        if(fileType=="application/pdf"){
                            file.url  = "https://www.inyihome.com/upload/PDF.png"
                        }
                        if(fileType=="application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
                            file.url  = "https://www.inyihome.com/upload/word.png"
                        }
                        if(fileType=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
                            file.url  = "https://www.inyihome.com/upload/excel.png"
                        }
                    }
                })
            }
            
        },
        beforeAvatarUpload(file) {
            console.log(file)
            const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            const isWord = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            const isPdf = file.type === 'application/pdf';
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';

            if (!isExcel&&!isWord &&!isPdf&&!isJPG&&!isPNG) {
                this.$message.error('上传的附件信息只能是Excel、Pdf或Word文件或者JPEG、png图片');
                return false;
            }
            return isExcel||isWord||isPdf||isJPG||isPNG;
            
        },
        pictureBeforeRemove(file, fileList) {
            console.log(file, fileList)
            if (file.status == 'success') {
                delAccessory(file.id).then(res => {
                    console.log(res)
                })
            }
        },
        handlePictureCardPreview(file){
            console.log(file)
            if(file.response){//用户上传显示
                window.open(this.serverImgUrl+file.response.fileName)
            }else{
                window.open(this.serverImgUrl+file.weburl)
            }
        }
    },
}
</script>
<style scoped>
    .wrapper{
        background-color:#fff;
        padding-top: 32px;
    }
    .buttonWrapper{
        padding: 32px;
        text-align: center;
    }
    
</style>
<style>
    .lastItem .el-form-item__content{
        /* margin-left: 0 !important; */
    }
  .supplier-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .supplier-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .supplier-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 146px;
    height: 146px;
    line-height: 146px;
    text-align: center;
  }
  .supplier-img {
    width: 146px;
    height: 146px;
    display: block;
  }
  .inputIsNumber input::-webkit-outer-spin-button,.inputIsNumber input::-webkit-inner-spin-button{
        -webkit-appearance: none;
  }
  input[type="number"]{
        -moz-appearance: textfield;
    }
</style>