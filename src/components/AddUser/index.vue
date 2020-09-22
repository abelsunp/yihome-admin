<template>
    <section class="content">
        <div class="step-wrapper">
            <el-steps :active="stepActive" finish-status="success">
                <el-step title="用户信息"></el-step>
                <el-step title="联系人信息"></el-step>
                <el-step title="证件信息"></el-step>
            </el-steps>
        </div>
        <div class="content-wrapper">
            <div v-show="stepActive==1">
                <el-form :model="adduserForm" :rules="adduserFormRules" ref="adduserForm" label-width="180px">
                    <p>重要信息</p>
                    <el-row>
                    <el-col :span="12">
                        <el-form-item label="客户来源：" prop="channelId">
                            <el-select v-model="adduserForm.channelId" placeholder="请选择客户来源" clearable >
                                <el-option
                                    v-for="item in channelData"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="客户状态：" prop="status">
                            <el-select v-model="adduserForm.status" placeholder="请选择客户状态" clearable>
                                <el-option
                                    v-for="item in userStatusDataChilder"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="客户级别：" prop="level">
                            <el-select v-model="adduserForm.level" placeholder="请选择客户级别" clearable>
                                <el-option
                                    v-for="item in userStatusDataChilderLevel"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="姓名（中文）：" prop="nameCh">
                            <el-input v-model="adduserForm.nameCh" placeholder="请输入姓名" clearable></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="姓名（拼音:以护照为准）:" prop="nameEn">
                            <el-input v-model="adduserForm.nameEn" placeholder="请输入护照姓名" clearable></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="手机号：" prop="phone">
                            <el-input v-model="adduserForm.phone" placeholder="请输入手机号" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="国外联系电话：" prop="personphone">
                            <el-input v-model="adduserForm.personphone" placeholder="请输入国外联系电话" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="微信：" prop="weChat">
                            <el-input v-model="adduserForm.weChat" placeholder="请输入微信" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="邮箱：" prop="uemail">
                            <el-input v-model="adduserForm.uemail" placeholder="请输入邮箱" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="意向国家：" prop="intentionCountry">
                            <el-select v-model="adduserForm.intentionCountry" placeholder="请选择意向国家" clearable @change="selectCountry">
                                <el-option
                                    v-for="item in countryData"
                                    :key="item.id"
                                    :label="item.nameZh"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="意向城市：" prop="intentionCity">
                            <el-select v-model="adduserForm.intentionCity" placeholder="请选择意向城市" clearable>
                               <el-option
                                    v-for="item in cityData"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="意向大学：" prop="intentionSchool">
                            <el-input v-model="adduserForm.intentionSchool" placeholder="请输入意向大学" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    </el-row>
                    <p>基础信息</p>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="生日：" prop="birthday">
                                <el-date-picker type="date" placeholder="请选择日期" v-model="adduserForm.birthday" style="width: 90%;"></el-date-picker>
                            </el-form-item>
                        </el-col> 
                        <el-col :span="12">
                            <el-form-item label="性别：" prop="sex">
                                <el-select v-model="adduserForm.sex" placeholder="请选择性别"  clearable>
                                    <el-option label="男" value="男"></el-option>
                                    <el-option label="女" value="女"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="护照号：" prop="passport" >
                                <el-input v-model="adduserForm.passport" clearable placeholder="请输入护照号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="国籍（英文）：" prop="nationality" >
                                <el-input v-model="adduserForm.nationality" clearable placeholder="请输入国籍"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <p>入学信息</p>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="学号：" prop="studentNo">
                                <el-input v-model="adduserForm.studentNo" clearable placeholder="请输入学号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="目前就读年级：" prop="grade">
                                <el-select v-model="adduserForm.grade" clearable placeholder="请选择目前就读年级">
                                    <el-option label="1" value="1"></el-option>
                                    <el-option label="2" value="2"></el-option>
                                    <el-option label="3" value="3"></el-option>
                                    <el-option label="4" value="4"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="学年制：" prop="gradeyear" >
                                <el-select v-model="adduserForm.gradeyear" clearable placeholder="请选择学年制">
                                    <el-option label="1" value="1"></el-option>
                                    <el-option label="2" value="2"></el-option>
                                    <el-option label="3" value="3"></el-option>
                                    <el-option label="4" value="4"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="就读的专业（中文）：" prop="disciplinech">
                                <el-input v-model="adduserForm.disciplinech" clearable  placeholder="请输入就读的专业（中文）"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="就读的专业（英文）：" prop="disciplineen">
                                <el-input v-model="adduserForm.disciplineen" clearable placeholder="请输入就读的专业（英文）"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="是否全日制：" prop="allday">
                                <el-select v-model="adduserForm.allday" clearable placeholder="请选择是否全日制">
                                    <el-option label="是" value="是"></el-option>
                                    <el-option label="否" value="否"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="就读课程：" prop="course">
                                <el-select v-model="adduserForm.course" clearable placeholder="请选择就读课程">
                                    <el-option label="语言班" value="语言班"></el-option>
                                    <el-option label="预科" value="预科"></el-option>
                                    <el-option label="本科" value="本科"></el-option>
                                    <el-option label="研究生" value="研究生"></el-option>
                                    <el-option label="硕士" value="硕士"></el-option>
                                    <el-option label="博士" value="博士"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="留学城市现居地邮编：" prop="zipcode">
                                <el-input v-model="adduserForm.zipcode" clearable placeholder="请输入留学城市现居地邮编"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="留学学校（中文）：" prop="abroadschoolch">
                                <el-input v-model="adduserForm.abroadschoolch" clearable placeholder="请输入留学学校（中文）"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="留学学校（英文）：" prop="abroadschoolen">
                                <el-input v-model="adduserForm.abroadschoolen" clearable placeholder="请输入留学学校（英文）"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="校区（英文）：" prop="campus">
                                <el-input v-model="adduserForm.campus" clearable placeholder="请输入校区（英文）"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="留学城市现居地：" prop="address">
                                <el-input v-model="adduserForm.address" clearable placeholder="请输入留学城市现居地"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <p>国内信息</p>

                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="国内城市现居地邮编：" prop="izipcode">
                                <el-input v-model="adduserForm.izipcode" clearable placeholder="请输入国内城市现居地邮编"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="国内固定地址（中文）：" prop="addressich">
                                <el-input v-model="adduserForm.addressich" clearable placeholder="请输入国内固定地址（中文）"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="国内固定地址（英文）：" prop="addressien">
                                <el-input v-model="adduserForm.addressien" clearable placeholder="请输入国内固定地址（英文）"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="国内所在城市：" prop="city">
                                <el-input v-model="adduserForm.city" clearable placeholder="请输入国内所在城市"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>


                    <p>申请公寓信息</p>

                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="付款周期：" prop="payPeriod">
                               <el-select v-model="adduserForm.payPeriod" placeholder="请选择付款周期" clearable style="width: 100%;">
							      <el-option label="分期付" value="1"></el-option>
							      <el-option label="全额付" value="2"></el-option>
							    </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="付款方式：" prop="payType">
                                <el-select v-model="adduserForm.payType" placeholder="请选择付款方式" clearable style="width: 100%;">
                                    <el-option label="银行转帐" value="1"></el-option>
                                    <el-option label="信用卡" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="其他需求：" prop="remark">
                                <el-input
									  type="textarea"
									  :autosize="{ minRows: 4, maxRows: 6}"
									  placeholder="请输入您的要求"
									  v-model="adduserForm.remark">
									</el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div v-show="stepActive==2" style="padding-top:32px;">
                <el-form :model="guaranteeForm" :rules="guaranteeFormRules" ref="guaranteeForm" label-width="180px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="担保人姓名：" prop="name">
                                <el-input v-model="guaranteeForm.name" clearable placeholder="请输入担保人姓名"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="与担保人关系：" prop="relation">
                                <el-select v-model="guaranteeForm.relation" clearable placeholder="请选择与担保人关系">
                                    <el-option label="父亲" value="父亲"></el-option>
                                    <el-option label="母亲" value="母亲"></el-option>
                                    <el-option label="其他" value="其他"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        
                        <el-col :span="12">
                            <el-form-item label="联系电话：" prop="phone">
                                <el-input v-model="guaranteeForm.phone" clearable placeholder="请输入担保人联系电话"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="担保人生日：" prop="birthday">
                                <el-date-picker type="date" placeholder="请选择日期" clearable v-model="guaranteeForm.birthday" style="width: 90%;"></el-date-picker>
                            </el-form-item>
                        </el-col>

                         <el-col :span="12">
                            <el-form-item label="担保人性别：" prop="sex">
                                <el-select v-model="guaranteeForm.sex" placeholder="请选择性别"  clearable>
                                    <el-option label="男" value="男"></el-option>
                                    <el-option label="女" value="女"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="邮箱：" prop="email">
                                <el-input v-model="guaranteeForm.email" clearable placeholder="请输入担保人邮箱"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="城市：" prop="city">
                                <el-input v-model="guaranteeForm.city" clearable placeholder="请输入担保人所在城市"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="联系地址（中文）：" prop="addressCh">
                                <el-input v-model="guaranteeForm.addressCh" clearable placeholder="请输入担保人联系地址（中文）"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="联系地址（英文）：" prop="addressEn">
                                <el-input v-model="guaranteeForm.addressEn" clearable placeholder="请输入担保人联系地址（英文）"></el-input>
                            </el-form-item>
                        </el-col>
                       
                        <el-col :span="12">
                            <el-form-item label="邮编：" prop="zipcode">
                                <el-input v-model="guaranteeForm.zipcode" clearable placeholder="请输入担保人所在地邮编"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="职业（中文）" prop="jobCh">
                                <el-input v-model="guaranteeForm.jobCh" clearable placeholder="请输入担保人职业（中文）"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="职业（英文）" prop="jobEn">
                                <el-input v-model="guaranteeForm.jobEn" clearable placeholder="请输入担保人职业（英文）"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div v-show="stepActive==3">
                <!--  1护照类型正面  2护照反面 3学生签证pdf 4offer/coe/cas/学生卡照片 -->
                <el-form :model="imgForm" ref="imgForm" label-width="180px" class="up">
                    <el-form-item label="护照信息：" >
                        <el-col :span="12" >
                            
                            <el-form-item>
								<el-upload
                                    class="avatar-uploader"
                                    :action="uploadImgUrl"
                                    :headers="headers"
                                    :show-file-list="false"
                                    :data="dataparams"
                                    :on-success="uploadSuccess"
                                    :on-error="uploadError"
                                    :before-upload="beforeUpload">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
							</el-form-item>
                            <el-input style="display:none;" v-model="imgForm.a" disabled></el-input>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item>
								<el-upload
                                    class="avatar-uploader"
                                    :action="uploadImgUrl"
                                    :headers="headers"
                                    :show-file-list="false"
                                    :data="dataparams"
                                    :on-success="uploadSuccess2"
                                    :on-error="uploadError2"
                                    :before-upload="beforeUpload">
                                    <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
							</el-form-item>
                            <el-input style="display:none;" v-model="imgForm.b" disabled></el-input>
                        </el-col>
                        <div class="el-upload__tip">请上传png、jpg、bmp及jpeg格式图片或者PDF格式文件</div>
                    </el-form-item>
                    <el-form-item label="学生签证：" prop="visa">
                        
                        <el-upload
                            class="avatar-uploader"
                            :action="uploadImgUrl"
                            :headers="headers"
                            :show-file-list="false"
                            :data="dataparams"
                            :on-success="uploadSuccess3"
                            :on-error="uploadError3"
                            :before-upload="beforeUpload">
                            <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <el-input style="display:none;" v-model="imgForm.c" disabled></el-input>
                        <div class="el-upload__tip">请上传png、jpg、bmp及jpeg格式图片或者PDF格式文件</div>
                    </el-form-item>
                    <el-form-item label="录取证明：" prop="offer">
                        <el-upload
                            class="avatar-uploader"
                            :action="uploadImgUrl"
                            :headers="headers"
                            :show-file-list="false"
                            :data="dataparams"
                            :on-success="uploadSuccess4"
                            :on-error="uploadError4"
                            :before-upload="beforeUpload">
                            <img v-if="imageUrl4" :src="imageUrl4" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <el-input style="display:none;" v-model="imgForm.d" disabled></el-input>
                        <div class="el-upload__tip">请上传png、jpg、bmp及jpeg格式图片或者PDF格式文件</div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="button-wrapper">
            <el-button type="primary" size="small" v-if="stepActive!=3" @click="next()">下一步</el-button>
            <el-button type="primary" size="small" v-if="stepActive==1" @click="saveUser()">保存</el-button>
            <el-button type="primary" size="small" v-if="stepActive==3" @click="complete">完成</el-button>
            <el-button size="small" :disabled="stepActive==1" @click="prev()">上一步</el-button>
        </div>
    </section>
</template>
<script>
import { listChannel } from "@/api/user/channel";
import { addUser,editUser,selectGuaranteeByUserid,addGuarantee,editGuarantee,selectImageByUserid,addUserimage,deleteUserimage } from "@/api/user/users";
import UploadFile from "@/components/UploadFile"
import { getToken } from '@/utils/auth'
import { scrollTo } from '@/utils/scroll-to'
export default {
    props: {
        userData: {
            type: Object
        },
        userOwner:{
            type:String
        }
    },
    components:{
        UploadFile
    },
    data(){
        return{
            stepActive:1,
            channelData:[],
            countryData:[],
            cityData: [],

            adduserForm:{
                owner:this.userOwner,
                channelId:undefined,
                level:undefined,
                nameCh:undefined,
                nameEn:undefined,
                phone:undefined,
                personphone:undefined,
                weChat:undefined,
                uemail:undefined,
                intentionCountry:undefined,
                intentionCity:undefined,
                intentionSchool:undefined,
                birthday:undefined,
                sex:undefined,
                passport:undefined,
                nationality:undefined,
                studentNo:undefined,
                grade:undefined,
                gradeyear:undefined,
                disciplinech:undefined,
                disciplineen:undefined,
                allday:undefined,
                course:undefined,
                zipcode:undefined,
                abroadschoolch:undefined,
                campus:undefined,
                address:undefined,
                izipcode:undefined,
                addressich:undefined,
                addressien:undefined
            },
            adduserFormRules:{
                channelId:[
                    { required: true, message: '请选择客户来源', trigger: 'change' }
                ],
                level:[
                    { required: true, message: '请选择客户级别', trigger: 'change' }
                ],
                status:[
                    { required: true, message: '请选择客户状态', trigger: 'change' }
                ],
                nameCh:[
                    { required: true, message: '请输入客户中文姓名', trigger: 'blur' },
                    { min: 2, max: 100, message: '长度不少于2个字符', trigger: 'blur' }
                ]
            },
            hasGuarantee:false,
            guaranteeForm:{
                userId:undefined,
                name:undefined,
                relation:undefined,
                phone:undefined,
                email:undefined,
                city:undefined,
                addressCh:undefined,
                addressEn:undefined,
                zipcode:undefined,
                jobCh:undefined,
                jobEn:undefined
            },
            guaranteeFormRules:{},
            imgForm:{
                a:'',
                b:'',
                c:'',
                d:''
            },
            uploaduserid:'',
            // uploadImgUrl: process.env.VUE_APP_BASE_API + '/common/upload', // 上传的图片服务器地址
            // uploadImgUrl: 'http://47.100.186.108:8080/admin/common/upload',
            uploadImgUrl: process.env.VUE_APP_UPLOAD_URL, 
            headers: {
                Authorization: 'Bearer ' + getToken()
            },
            dataparams: { 'userId': '' },
            imageUrl:'',
            imageUrl2:'',
            imageUrl3:'',
            imageUrl4:'',
            userStatusDataChilder:[],
            userStatusDataChilderLevel:[]
        }
    },
    created(){
        this.getChannel();
        this.getCountry();
        
        if(this.userData){
            this.userData.status = parseInt(this.userData.status)
            this.userData.level = parseInt(this.userData.level)
            this.adduserForm = this.userData;
        }

        this.getUserType();
        console.log(this.adduserForm.owner,88888)
        if(this.adduserForm.owner=='channel'){
            this.adduserForm.owner = undefined
        }else{
            this.adduserForm.owner = JSON.parse(localStorage.getItem('currentUser')).userId
        }
    },
    watch:{
        'adduserForm.intentionCountry': function (newValue, oldValue) {
            if(newValue!=oldValue){
                this.adduserForm.intentionCity = null
            }
        },
        'userData': function(newValue, oldValue) {
            this.adduserForm = this.userData
            if(newValue!=oldValue){
                this.adduserForm = this.userData
            }
        },
        userOwner(newValue, oldValue){
            console.log(newValue,88888)
            this.adduserForm.owner = newValue
        }
    },
    methods:{
        selectCountry(value){
            for (let i = 0; i < this.countryData.length; i++) {
                if (value === this.countryData[i].id) {
                    this.cityData = this.countryData[i].children;
                }
            }
        },
        getCountry(){
            const cityRes = JSON.parse(localStorage.getItem('YIHOME_city'));
            const countryRes = JSON.parse(localStorage.getItem('YIHOME_country'));
            this.handleDataCountry(countryRes, cityRes, 'id', 'countryId')
            this.countryData = countryRes;
        },
        handleDataCountry(arr1, arr2, typy1, type2) {
            arr1.forEach(obj1 => {
                arr2.forEach(obj2 => {
                if (obj1[typy1] === obj2[type2]) {
                    if (!obj1.children) {
                    obj1.children = [obj2]
                    } else {
                    obj1.children.push(obj2)
                    }
                }
                })
            })
        },
        getChannel(){
            listChannel().then(res=>{
                this.channelData = res.rows
            });
            
        },
        getUserType(){
            const userType = JSON.parse(localStorage.getItem('YIHOME_user_type'))
            userType.forEach(el=>{
                if(el.parentId==6){
                this.userStatusDataChilder.push(el)
                }
                if(el.parentId==2){
                this.userStatusDataChilderLevel.push(el)
                }
            })
        },
        //查询担保人信息
        queryGuarantee(id){
            selectGuaranteeByUserid(id).then(data=>{
                console.log(data)
                if(data.data.length!=0){
                    this.hasGuarantee = true;
                    var currentLength = data.data.length-1;
                    this.guaranteeForm = data.data[currentLength]
                    // this.guaranteeForm = data.data[0];
                }
            })
        },
        //查询图片信息
        queryImages(id){
            selectImageByUserid(id).then(res=>{
                if(res.data.length!=0){
                    res.data.forEach(item=>{
                        if(item.type==1){
                            this.imgForm.a = item.id;
                            this.imageUrl = this.serverImgUrl+item.imgurl
                        }
                        if(item.type==2){
                            this.imgForm.b = item.id;
                            this.imageUrl2 = this.serverImgUrl+item.imgurl
                        }
                        if(item.type==3){
                            this.imgForm.c = item.id;
                            this.imageUrl3 = this.serverImgUrl+item.imgurl
                        }
                        if(item.type==4){
                            this.imgForm.d = item.id;
                            this.imageUrl4 = this.serverImgUrl+item.imgurl
                        }
                    })
                }
            })
        },
        next(){
            if (this.stepActive == 1) {
                this.$refs['adduserForm'].validate((valid) => {
                    if (valid) {
                        console.log(this.adduserForm)
                        if(this.adduserForm.id){
                            //编辑接口
                            editUser(this.adduserForm).then(res=>{
                                if(res.code===200){
                                    this.stepStatus();
                                    this.queryGuarantee(this.adduserForm.id);
                                    this.guaranteeForm.userId = this.adduserForm.id;
                                    //废弃
                                    this.uploaduserid = this.adduserForm.id;

                                    this.dataparams.userId = this.adduserForm.id
                                }else{
                                    this.msgError(res.msg)
                                }
                            })
                        }else{
                            //新增接口
                            addUser(this.adduserForm).then(res=>{
                                console.log(res)
                                if(res.code===200){
                                    this.adduserForm.id = res.data;
                                    this.stepStatus();
                                    this.queryGuarantee(this.adduserForm.id);
                                    this.guaranteeForm.userId = this.adduserForm.id;
                                    //废弃
                                    this.uploaduserid = this.adduserForm.id;
                                    this.dataparams.userId = this.adduserForm.id
                                }else{
                                    this.msgError(res.msg)
                                }
                            }).catch(e=>{
                                this.msgError('网络错误')
                            })
                        }
                    } else {
                        this.msgError('请输入以上必填信息')
                        return false
                    }
                })
            }else if(this.stepActive == 2){
                if(this.hasGuarantee){
                    //存在  编辑
                    editGuarantee(this.guaranteeForm).then(res=>{
                        if(res.code===200){
                            this.stepStatus();
                        }else{
                            this.msgError(res.msg)
                        }
                    })
                    this.queryImages(this.adduserForm.id)
                    
                }else{
                    addGuarantee(this.guaranteeForm).then(res=>{
                        if(res.code===200){
                            this.stepStatus();
                        }else{
                            this.msgError(res.msg)
                        }
                    })
                    this.queryImages(this.adduserForm.id)
                }
                
            }else if(this.stepActive == 3){
                
            }
        },
        prev(){
            --this.stepActive
            if (this.stepActive < 1) this.stepActive = 1
            scrollTo(0, 800)
        },
        stepStatus() {
            if (this.stepActive++ > 2) {
                this.stepActive = 1
            }
            scrollTo(0, 800)
        },
        complete(){
            //this.$parent.custom
            this.$emit('changeStatus');
        },
        saveUser(){
            

            this.$refs['adduserForm'].validate((valid) => {
                if (valid) {
                    console.log(this.adduserForm)
                    if(this.adduserForm.id){
                        //编辑接口
                        editUser(this.adduserForm).then(res=>{
                            if(res.code===200){
                                this.$emit('changeStatus');
                                this.queryGuarantee(this.adduserForm.id);
                                //this.guaranteeForm.userId = this.adduserForm.id;
                                //废弃
                                this.uploaduserid = this.adduserForm.id;

                                this.dataparams.userId = this.adduserForm.id
                            }else{
                                this.msgError(res.msg)
                            }
                        })
                    }else{
                        //新增接口
                        addUser(this.adduserForm).then(res=>{
                            console.log(res)
                            if(res.code===200){
                                this.adduserForm.id = res.data;
                                this.$emit('changeStatus');
                                //this.queryGuarantee(this.adduserForm.id);
                                this.guaranteeForm.userId = this.adduserForm.id;
                                //废弃
                                this.uploaduserid = this.adduserForm.id;
                                this.dataparams.userId = this.adduserForm.id
                            }else{
                                this.msgError(res.msg)
                            }
                        }).catch(e=>{
                            this.msgError('网络错误')
                        })
                    }
                } else {
                    this.msgError('请输入以上必填信息')
                    return false
                }
            })





        },

        uploadSuccess(res, file){
            if(file.raw.type.toLowerCase() == 'application/pdf'){
                this.imageUrl ='https://www.inyihome.com/img/pdf.svg'
            }else{
                this.imageUrl = URL.createObjectURL(file.raw);
            }
            addUserimage({
                userId:this.adduserForm.id,
                type:1,
                imgurl:res.fileName,
                id:this.imgForm.a?this.imgForm.a:undefined
            }).then(res2=>{
                if(res2.code===200){
                    this.imgForm.a = res2.data
                }else{
                    this.imageUrl = 'https://www.inyihome.com/newStatic/icon_uploadError.png';
                    this.$message.error('文件上传失败');
                }
            })
            
        },
        uploadSuccess2(res, file){
            if(file.raw.type.toLowerCase() == 'application/pdf'){
                this.imageUrl2 ='https://www.inyihome.com/img/pdf.svg'
            }else{
                this.imageUrl2 = URL.createObjectURL(file.raw);
            }

            addUserimage({
                userId:this.adduserForm.id,
                type:2,
                imgurl:res.fileName,
                id:this.imgForm.b?this.imgForm.b:undefined
            }).then(res2=>{
                if(res2.code===200){
                    this.imgForm.b = res2.data
                }else{
                    this.imageUrl2 = 'https://www.inyihome.com/newStatic/icon_uploadError.png';
                    this.$message.error('文件上传失败');
                // this.imgForm.passportimg = '';
                }
            })
            



            
        },
        uploadSuccess3(res, file){
            if(file.raw.type.toLowerCase() == 'application/pdf'){
                this.imageUrl3 ='https://www.inyihome.com/img/pdf.svg'
            }else{
                this.imageUrl3 = URL.createObjectURL(file.raw);
            }
            addUserimage({
                userId:this.adduserForm.id,
                type:3,
                imgurl:res.fileName,
                id:this.imgForm.c?this.imgForm.c:undefined
            }).then(res2=>{
                if(res2.code===200){
                    this.imgForm.c = res2.data
                }else{
                    this.imageUrl3 = 'https://www.inyihome.com/newStatic/icon_uploadError.png';
                    this.$message.error('文件上传失败');
                // this.imgForm.passportimg = '';
                }
            })
            
        },
        uploadSuccess4(res, file){
            if(file.raw.type.toLowerCase() == 'application/pdf'){
                this.imageUrl4 ='https://www.inyihome.com/img/pdf.svg'
            }else{
                this.imageUrl4 = URL.createObjectURL(file.raw);
            }
            addUserimage({
                userId:this.adduserForm.id,
                type:4,
                imgurl:res.fileName,
                id:this.imgForm.d?this.imgForm.d:undefined
            }).then(res2=>{
                if(res2.code===200){
                    this.imgForm.d = res2.data
                }else{
                    this.imageUrl4 = 'https://www.inyihome.com/newStatic/icon_uploadError.png';
                    this.$message.error('文件上传失败');
                // this.imgForm.passportimg = '';
                }
            })
        },
        uploadError(){
            this.imageUrl = 'https://www.inyihome.com/newStatic/icon_uploadError.png';
            this.$message.error('文件上传失败');
            //this.imgForm.passportimg = '';
        },

        uploadError2(){
            this.imageUrl2 = 'https://www.inyihome.com/newStatic/icon_uploadError.png';
            this.$message.error('文件上传失败');
            //this.imgForm.passportimg = '';
        },
        uploadError3(){
            this.imageUrl3 = 'https://www.inyihome.com/newStatic/icon_uploadError.png';
            this.$message.error('文件上传失败');
            //this.imgForm.passportimg = '';
        },
        uploadError4(){
            this.imageUrl4 = 'https://www.inyihome.com/newStatic/icon_uploadError.png';
            this.$message.error('文件上传失败');
            //this.imgForm.passportimg = '';
        },






















        beforeUpload(file){
            const isaccept 	= file.type.toLowerCase() === 'image/jpeg';
            const isaccept2 = file.type.toLowerCase() === 'image/jpg';
            const isaccept3 = file.type.toLowerCase() === 'image/png';
            const isaccept4 = file.type.toLowerCase() === 'image/bmp';
            const isaccept5 = file.type.toLowerCase() === 'application/pdf';
            const isLt2M 	= file.size / 1024 / 1024 < 20;
            
            if (!isaccept && !isaccept2 && !isaccept3 && !isaccept4 && !isaccept5) {
                this.$message.error('请上传png、jpg、bmp、jpeg格式图片或者PDF格式文件');
                return false;
            }
            if (!isLt2M) {
                this.$message.error('上传的文件最大不能超过20M！');
                return false;
            }
            var backP = isaccept||isaccept2||isaccept3||isaccept4||isaccept5 && isLt2M;
            this.fullscreenLoading = true;
            return backP;
        }
    }
}
</script>
<style scoped>
    .content{
        padding-top: 40px;
        max-width: 1000px;
        margin: 0 auto;
    }
    .content .el-input, .content .el-select{
        width: 90%;
    }
    .button-wrapper{
        text-align: center;
        padding-bottom:32px;
        margin-top:12px;
    }
</style>
<style>
    .up .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .up .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .up .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .up .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>