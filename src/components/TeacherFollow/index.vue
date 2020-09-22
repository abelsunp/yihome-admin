<template>
    <section  v-loading.fullscreen.lock="fullscreenLoading">
        
        <el-tabs v-model="activeName" @tab-click="handleClick" class="mytab" v-loading="recordDataLoading">
            <el-tab-pane label="跟进记录" name="first" >
                <!-- 新建跟进记录 -->
                <div class="createRecord">
                    <div class="content" v-if="createdStatus" @click="createdClick"  v-hasPermi="['user:users:createdFollow']">
                        <i class="el-icon-folder-add"></i>
                        <span>新建一条跟进记录</span>
                    </div>
                    <div class="newCreated" v-else>
                        <el-form :model="recordForm" :rules="recordRules" ref="recordForm" label-width="80px">
                            <el-form-item prop="remark" class="enterInput">
                                <el-input type="textarea" v-model="recordForm.remark" placeholder="请输入跟进记录..."></el-input>
                            </el-form-item>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="跟进类型" prop="type" >
                                        <el-select v-model="recordForm.type" placeholder="请选择跟进类型" clearable>
                                            <el-option
                                                v-for="item in statusType"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                                <span>{{item.name}}</span>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="跟进状态" prop="status">
                                        <el-select v-model="recordForm.status" placeholder="请选择跟进状态" clearable>
                                            <el-option
                                                v-for="item in statusData"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                                <span>{{item.name}}</span>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="跟进时间" prop="followTime">
                                        <el-date-picker
                                            v-model="recordForm.followTime"
                                            type="datetime"
                                            :picker-options="pickerOptions"
                                            format="yyyy-MM-dd HH:mm:ss"
                                            value-format="yyyy-MM-dd HH:mm:ss"
                                            placeholder="选择日期时间" clearable>
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item style="text-align:right;">
                                        <el-button size="small" @click="createdStatus = true">取消</el-button>
                                        <el-button type="primary" size="small" @click="recordRelease('recordForm')">发布</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </div>

                <div style="padding-left:16px;">
                    <div class="WithPrefixRow-wrap ">
                        <span class="preLine "></span>
                        <div class="content"><div>记录内容</div></div>
                    </div>
                </div>
                <div class="recordWrapper" v-if="recordData.length!=0">
                    <ul class="record">
                        <li v-for="(item,$index) in recordData" :key="$index">
                            <div class="left"><div class="img"></div><div class="line"></div></div>
                            <div class="right">
                                <div class="item-date-show">
                                    {{item.followTime}}
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAACiBJREFUeAHtnU9oHUUcx3/7Ev/VS3qxF73oSQULpgdFwdrUqCfrQS+mN8WDInpQFGz6mupBFBVBqFAQsaVYKdRehJpUBQUPVlDQetGLHlov8aC0WpPxN2k22b63L2933+yf2fk8Evbt7MxvZj+/+TLfN/vSivCCAAQgAAEIQAACEIAABCAAAQhAAAIQgAAEIAABCEAAAhCAAAQgAAEIQAACEIAABCAAAQhAAAIQgAAEIAABCEAAAhCAAAQgAAEIQAACEIAABCAAAQhAAAIQgAAEIAABCEAAAhCAAAQgAAEIQAACEIAABCAAAQhAAAIQKERgsms2FWrY4EadBo+NoXlEYGrOzExE8qZHQ8401PFMtagEgQEEpl831y6dlwORyIwR+WBANW+LEYi3qat/4FNdc4uK44SK46b6R1POCLBY5XBtfdQdc+Zx6ci3bRaHTSIrSOunstsbXLVUh1QYu9xGbmY0BNLMvDRyVCFYql7wWKxeIpynEgjFUvXePCtILxHOLyMQmqW67Ob1BIH0EuF8jcCOrrldd6mOtv2D+NoNp7zBYqVAoUhk55x5NurINyGLw84DVhDUcBmB2FJp4S4VR/AvBBL8FFgHgKVaZxG/w2LFJAI/YqnSJwArSDqXYEq3d83EWEfe1xvGUqVkHYGkQAmlyFqqTkeO6/3eEMo9571PLFZeYi2pH1sqvR3EsUFOWUE2gNPGS1iqfFlFIPl4eV0bS5U/fVis/Mz8a2FMhKUqljZWkGLcvGllLdX4fvlIBzzNg7/8aUMg+Zl50wJLNXqqsFijM2xeBCyVs5ywgjhD2YxAWCq3eUAgbnnWGu3eOXPXmMgRHQTPNhxlAovlCGStYS5ZqpdVHF8iDreZYAVxy7PyaElLVXnnAXSIQDxOMpaq/ORhscpn7L4HLJV7pgMisoIMANPU4umuuW55v3yo45tu6hjbNC4E4lE2raVaEjmmT8S3eDRsr4eKxfIhfQlLhTiqTRgrSLW8c/eGpcqNzGkDBOIUp9tgWCq3PItEQyBFqJXc5pGjZmzxZ3lJu+nqrz7/41UXAQRSF/kB/VpLtXhGjkkkdw+oQnGFBBBIhbCHdYWlGkao+usIpHrmfT1iqfqQNKYAgdScCixVzQkY0j3PQYYAKvPy1D5z31JHfuDzRpmUR4vNCjIav0KtVyzVGXnVRPKCPvjTH15NJYBAKs5M0lKhjIrhF+gOi1UAWtEmWKqi5OprxwpSAXssVQWQS+oCgZQENg6rf/F3vT74O2I/iGOpYir+HBFIibmyliqKVv7Rts0ldkPoEgkgkBLgJi2VhmfhKIFxVSERiGPSWCrHQGsOh0AcJgBL5RBmQ0IhEAeJmHzPXLH5rOy3D/40HJbKAdOmhEAgI2bCWqrxc/rfmEUyiTJGhNnA5jwoHCEp1lKN2+9SiUyOEIamDSbAClIgOViqAtA8bYJAciYOS5UTmOfVsVg5Erhzn3kIS5UDWAuqsoJkSKK1VBNn5S39IP5UhupUaREBBDIkmUlLNaQql1tIAIu1QVKxVBvACeQSK0hKorFUKVACLUIgPYnf2TU3yjk5ah/89VziNEACWKxE0q2l0q+LfK9FiCPBJeS3rCBWDYldKr4uErIc+u89eIFgqfonBSXrBIK2WFiq9YnAu3QCQa4g+mzj6rFI3rAP/rBU6ROD0ksEghOItVSmIydUGLcyCSAwjEBQFiu2VIhj2LTgekwgiBUESxWnm2NeAq0XCJYq75SgfpJAqy2W/sXfY/bBH5YqmXLe5yHQyhXkwXfMVf/+KQdVGDN5YFAXAr0EWicQa6lUHOxS9Waa80IEWm2xChGhEQQSBFonkPlu9OuVEzJpRA4l7pO3EChEoHUCsRQ+fSb6Z2E22m2MzOjvX4XI0AgCSqCVAokzu7A3OhwZ2aqryY9xGUcI5CHQaoFYENZyLS3LNl1J3s0DhroQsARaLxB7k190owu6mjwtRnZhuSwRXlkJBCGQGMb83ugTLFdMg2MWAkEJxALBcmWZFtSJCQQnEHvjWK44/RyHEQhSIDGU2HLp+em4jCMEkgSCFogFYS3X4ha5k12u5LTgfUwgeIFYEKefjC6yyxVPCY5JAggkQQPLlYDB2xUCCKRnImC5eoAEfopAUiZA0nLp5cWUKhQFQgCBbJBoa7n+W5bbtAq7XBtwavMlBDIku/rM5Hd2uYZAavFlBJIhuViuDJBaWgWB5EgslisHrJZURSA5ExlbLv1m8Gv6dyb6w6vNBBBIgexay6WryYsqj/u1ObtcBRj60gSBjJApffr+GbtcIwD0oCkCGTFJWK4RATa8OQJxkCAslwOIDQ2BQBwmZs1yGfnKYVhC1UgAgTiGby3X5ptlO7tcjsHWFA6BlAD+40ejpXiXS/eBz5XQBSErIoBASgRtLdeY/S4XlqtEyuWGRiDl8pWT3egPLFfJkEsMj0BKhBuHxnLFJPw7IpAKc4blqhC2o64QiCOQWcOsWS6RPdpmKWs76tVDAIHUwH3Fcs1Gr6g67mGXq4YE5OgSgeSA5brq57PR1+xyuabqNh4CccszdzQsV25klTZAIJXiTu8My5XOpQmlCKQJWVgdw5rlEjnZoGEFPRQE0rD0W8s1v0ce0GGxy9WA3CCQBiShbwhRZObZ5erDUkcBAqmDesY+sVwZQZVYDYGUCNdFaCyXC4rFYyCQ4uyqa5mwXNrpb9V1TE8IxKM5YC3X6j8SwS5XRXlDIBWBdtWN/sXin+xyuaI5PA4CGc6oeTWwXJXlBIFUhtp9R1gu90x7IyKQXiKenScs13P6zeCLng2/8cNFII1PUYYBXrJcb5tluUNrs8uVAVnWKggkKykP6p3qRt+xy+U2UQjELc/ao2G53KYAgbjl2YxoWC5neUAgzlA2L1BsufTD+/Hmjc6PESEQP/JUeJTWci3MRg9rAHa5ClBEIAWg+dhEvz7PLleBxCGQAtB8bYLlyp85BJKfmdctsFz50odA8vFqTe3YcukH+F9ac1Ml3AgCKQGqLyGt5Rq7RrayyzU4YwhkMJsgrpx8PvqbXa7BqUYgg9kEdQXLlZ5uBJLOJchSLFd/2hFIP5OgS2LLtSzyhH42OR80DL15BBL6DBhw/6dmo4OyLNtC3+VCIAMmCMUiC93op9B3uRAIStiQQOiWC4FsOD24GBMI1XIhkHgGcBxKIGG5Dg2t3JIKCKQliazqNlYt125jZEZ/L1TVb139IJC6yHver/6PvYfFyGTbd7kQiOcTtc7hh2i56uRN3x4TmJozM1P7zAGPb4GhQ6BcApNds6ncHogOAQhAAAIQgAAEIAABCEAAAhCAAAQgAAEIQAACEIAABCAAAQhAAAIQgAAEIAABCEAAAhCAAAQgAAEIQAACEIAABCAAAQhAAAIQgAAEIAABCEAAAhCAAAQgAAEIQAACEIAABCAAAQhAAAIQgAAEIAABCEAAAhCAQNkE/gf6XqrZo1YPrQAAAABJRU5ErkJggg==" alt="">
                                </div>
                                <div class="keep-record-item">
                                    <div class="keep-scroll-title">
                                        <div class="t-avatar">
                                            <div class="name">{{item.createName}}</div>
                                        </div>
                                        <div class="keep-main-info">
                                            <div class="user-name">{{item.createName}}</div>
                                            <div class="keep-type-time">
                                                <span>
                                                    <b v-for="list in statusData" :key="list.id" style="font-weight:normal;">{{list.id==item.status?list.name:''}}</b>
                                                </span>|<span>{{item.followTime}}</span>
                                            </div>
                                        </div>
                                        <div class="keep-index">
                                            # {{item.myindex}} 条
                                        </div>
                                        <el-dropdown class="keep-right">
                                            <span class="el-dropdown-link">
                                                <i class="el-icon-arrow-down el-icon--right"></i>
                                            </span>
                                            <el-dropdown-menu slot="dropdown">
                                                <el-dropdown-item v-hasPermi="['user:users:editFollow']">
                                                    <span @click="editFollow(item.id)">编辑</span>
                                                </el-dropdown-item>
                                                <el-dropdown-item disabled>删除</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                    </div>
                                    <!-- 内容 -->
                                    <div class="keep-scroll-content">
                                        <p>{{item.remark}}</p>
                                    </div>

                                    <!-- 跟进信息 -->
                                    <div class="fields-detail">
                                        <el-row>
                                            <el-col :span="12">
                                                <div class="title">关联对象：</div>
                                                <div class="value">{{item.userId}}</div>
                                            </el-col>
                                            <el-col :span="12">
                                                <div class="title">跟进类型：</div>
                                                <div class="value">
                                                    <span v-for="list in statusType" :key="list.id" >
                                                        {{list.id==item.type?list.name:''}}
                                                    </span>
                                                </div>
                                            </el-col>
                                            <el-col :span="12">
                                                <div class="title">跟进状态：</div>
                                                <div class="value">
                                                    <span v-for="list in statusData" :key="list.id" >
                                                        {{list.id==item.status?list.name:''}}
                                                    </span>
                                                </div>
                                            </el-col>
                                            <el-col :span="12">
                                                <div class="title">跟进地址：</div>
                                                <div class="value">{{item.address}}</div>
                                            </el-col>
                                            <el-col :span="12">
                                                <div class="title">负责人：</div>
                                                <div class="value">{{item.createName}}</div>
                                            </el-col>
                                            <el-col :span="12">
                                                <div class="title">创建时间：</div>
                                                <div class="value">{{item.createTime}}</div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div v-else style="padding:30px 0px;display:flex;flex-direction:column;align-items:center;">
                    <img src="data:image/png;base64,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" alt="" style="width: 150px; margin-bottom: 0px;">
                    <div style="text-align: center; height: 20px; line-height: 20px;">暂无数据</div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="基本信息" name="second">
                <div class="basicWrapper">
                    <div class="basicTitle">
                        <div class="line"></div>
                        <div class="content">重要信息</div>
                    </div>
                    <ul>
                        <li>
                            <el-row>
                                <el-col :span="12">
                                    <div class="title">姓名：</div>
                                    <div class="value">{{currentUser.name}}</div>
                                </el-col>
                                

                                <el-col :span="12">
                                    <div class="title">管理者：</div>
                                    <div class="value">
                                        <span v-for="item in distributionDataTable" :key="item.id">
                                            {{ currentUser.owner==item.userId?item.nickName:'' }}
                                        </span>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="title">重要程度：</div>
                                    <div class="value">
                                        <span v-for="item in significanceData" :key="item.id">
                                            {{item.id==currentUser.significance?item.name:''}}
                                        </span>
                                    </div>
                                </el-col>

                                <el-col :span="12">
                                    <div class="title">来源：</div>
                                    <div class="value">
                                        <span v-for="item in sourceData" :key="item.id">
                                            {{item.id==currentUser.source?item.name:''}}
                                        </span>
                                    </div>
                                </el-col>

                                <el-col :span="12">
                                    <div class="title">省份：</div>
                                    <div class="value">
                                        <span v-for="item in listProvince" :key="item.id">
                                            {{item.id==currentUser.province?item.districtName:''}}
                                        </span>
                                    </div>
                                </el-col>

                                <el-col :span="12">
                                    <div class="title">城市：</div>
                                    <div class="value">
                                        <span v-for="item in listCityData" :key="item.id">
                                            {{item.id==currentUser.city?item.districtName:''}}
                                        </span>
                                    </div>
                                </el-col>

                                <el-col :span="12">
                                    <div class="title">手机号：</div>
                                    <div class="value">{{currentUser.phone}}</div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="title">公司名：</div>
                                    <div class="value">{{currentUser.company}}</div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="title">备注：</div>
                                    <div class="value">{{currentUser.remark}}</div>
                                </el-col>
                            </el-row>
                        </li>
                    </ul>
                </div>
            </el-tab-pane>
        </el-tabs>



        <el-dialog title="编辑" 
            :visible.sync="open" width="500px" 
            append-to-body 
            :close-on-press-escape="false"
            :show-close="false"
            :close-on-click-modal="false">
            <el-form ref="editForm" :model="editForm" :rules="editFormRules" label-width="82px">
                <el-form-item label="跟进记录" prop="remark">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入跟进记录"
                        clearable
                        v-model="editForm.remark">
                    </el-input>
                </el-form-item>
                <el-form-item label="跟进类型" prop="type">
                    <el-select v-model="editForm.type" placeholder="请选择跟进类型" clearable disabled>
                        <el-option
                            v-for="item in statusType"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            <span>{{item.name}}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="跟进状态" prop="status">
                    <el-select v-model="editForm.status" placeholder="请选择跟进状态" clearable disabled>
                        <el-option
                            v-for="item in statusData"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            <span>{{item.name}}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="跟进时间" prop="followTime">
                    <el-date-picker
                        v-model="editForm.followTime"
                        type="datetime"
                        :picker-options="pickerOptions"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间" clearable disabled>
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                
                <el-button size="mini" @click="resetForm('editForm')">取消</el-button>
                <el-button type="primary" size="mini" @click="confrimEdit('editForm')">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
import { listDictionaries } from "@/api/user/dictionaries";
import { editUser,getUsers,getFollowUp,addFollowup,getFollowUpDetails,editFollowup } from "@/api/user/users";
import { listCountry } from '@/api/home/country'
import { addTeacherFollowUp,getTeacherFollowUpList,getTeacherFollowUp,editTeacherFollowUp,deleteTeacherFollowUp,listChinaCity } from "@/api/user/teacher";
import { getUserByRole } from "@/api/user/users";
export default {
    props:{
        userData: {
            type: Object
        },
    },
    components: { },
    data(){
        return {
            buttonLoading:false,

            activeName: 'first',

            statusData:[],

            currentUser:this.userData,

            recordData:[],

            recordDataLoading:true,

            statusType:[],
            

            createdStatus:true,
            recordForm:{},
            recordRules:{
                remark:[
                    { required: true, message: '请输入跟进内容', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择跟进类型', trigger: 'change' }
                ],
                status: [
                    { required: true, message: '请选择跟进状态', trigger: 'change' }
                ],
                followTime: [
                    { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
                ],
            },
            pickerOptions: { 
                disabledDate(time) {
                    return time.getTime() > Date.now();//如果没有后面的-8.64e7就是可以选择今天的 
                }
            },
            open:false,
            editForm:{},
            editFormRules:{
                remark:[
                    { required: true, message: '请输入跟进内容', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择跟进类型', trigger: 'change' }
                ],
                status: [
                    { required: true, message: '请选择跟进状态', trigger: 'change' }
                ],
                followTime: [
                    { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
                ],
            },
            fullscreenLoading:false,
            significanceData:[],
            sourceData:[],
            listCityData:[],
            listProvince:[],
            distributionDataTable:[]
        }
    },
    created(){
        this.getUserType();
        this.getfollow()
        
        getUserByRole('101,102').then(res=>{
            this.distributionDataTable = res.data;
        });

        this.getCity()
    },
    watch:{
        'userData': function(newValue, oldValue) {
            this.currentUser = newValue
        },
    },
    methods:{
        getCity(){
            //省份
            listChinaCity({type:1}).then(res=>{
                    this.listProvince = res.data
                listChinaCity({type:2}).then(res2=>{
                    this.listCityData = res2.data
                }).catch(e=>{
                    console.log(e)
                })
            }).catch(e=>{
                console.log(e)
            })
        },
        createdClick(){
            this.createdStatus = false;
            this.recordForm={
                remark:undefined,
                type:undefined,
                status:undefined,
                followTime:undefined
            }
        },
        getUserType(){
            const userType = JSON.parse(localStorage.getItem('YIHOME_user_type'))
            userType.forEach(el=>{
                if(el.parentId==6){
                    this.statusData.push(el)
                }
                if(el.parentId==4){
                    this.statusType.push(el)
                }
                if(el.parentId==36){
                    this.sourceData.push(el)
                }
                if(el.parentId==40){
                    this.significanceData.push(el)
                }
            })
            userType.forEach(el=>{
                
            })
        },
        
        handleClick(tab, event) {
            console.log(tab, event);
        },
        getfollow(){
            this.recordDataLoading = true;
            getTeacherFollowUpList({id:this.currentUser.id}).then(res=>{
                this.recordDataLoading = false;
                res.rows.forEach((item,index)=>{
                    item.myindex = index+1
                })
            }).catch(e=>{
                this.recordDataLoading = false;
            })


            // getFollowUp(this.currentUserId).then(res=>{
            //     this.recordDataLoading = false
                
            //     res.rows.forEach((item,index)=>{
            //         console.log(index)
            //         item.myindex = index+1
            //     })
            //     this.recordData = res.rows.reverse()
            // }).catch(e=>{
            //     this.recordDataLoading = false
            // })
        },
        ///发布记录
        recordRelease(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.recordForm.teacherId = this.currentUser.id;
                    this.recordForm.followTime = undefined;
                    addTeacherFollowUp(this.recordForm).then(res=>{
                        if(res.code===200){
                            this.createdStatus = true;
                            this.getfollow()
                        }else{
                            this.msgError(res.msg)
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //编辑记录
        editFollow(id){
            //获取当前记录详情
            
            this.fullscreenLoading = true;
            getTeacherFollowUp(id).then(res=>{
                this.fullscreenLoading = false;
                if(res.code===200){
                    this.open = true;
                    res.data.status = parseInt(res.data.status)
                    this.editForm = res.data
                }else{
                    this.msgError("获取记录详情失败")
                }
            }).catch(e=>{
                this.fullscreenLoading = false;
            })
        },
        confrimEdit(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.fullscreenLoading = true;
                    
                    console.log(this.editForm)
                    editTeacherFollowUp(this.editForm).then(res=>{
                        this.fullscreenLoading = false;
                        if(res.code===200){
                            this.msgSuccess("修改成功")
                            this.open = false;
                            this.getfollow()
                        }else{
                            this.msgError("修改失败")
                        }
                    }).catch(e=>{
                         this.fullscreenLoading = false;
                    })

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName){
            this.open = false;
            this.$refs[formName].resetFields();
        },
    }
}
</script>
<style scoped>
    .recordWrapper{
        padding: 16px;
        background-color: rgba(240, 242, 245, 1);
        margin: 16px;
    }
    .WithPrefixRow-wrap {
        border-bottom: none;
        margin-bottom: 16px;
        position: relative;
        width: 100%;
        height: 38px;
        line-height: 38px;
    }
    .WithPrefixRow-wrap .preLine{
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
    .WithPrefixRow-wrap .content{
        margin-left: 11px;
        font-size: 14px;
        font-weight: 400;
        color: #333;
    }
    .recordWrapper .record{
        padding: 0;
    }
    .recordWrapper .record li{
        list-style: none;
        display: flex;
    }
    .recordWrapper .record li .left{
        margin-right: 10px;
        width: 16px;
        margin-left: -8px;
    }
    .recordWrapper .record li .left .img{
        width: 16px;
        height: 17px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABEUlEQVQ4T6WTvUoDURCFv7N3iYrELlZqZ5PKzlJRDPgWPoC1VSARooW1D+BzBBQtfQEbO7VKOoOoYe+OXM0myxJBubebO2fOnPkTlbfbtcVaSsMl1DOjFtypGPuc0ThjeNvVRzlEM8PU6rGmjIYllP5nCOWYpQz7bV5AFjwToGm/w6Zz1KuK5tneM7o+5TGQfBO0erZOzupfgqeYhEG/rWeFmhegWZZtxgbi2GB7IvMe41LiqSAI5XzCg6rZQ7CJK2ClouhVxlGZhISBDs+t6TOWCrDBhcHevHIEN4KTwudS3nVwZlvyuOIzhztg+Zd+vCWwM03m8PEE0SVENzF6jNGL9NPRyFUuSCKOaTb1/57zF7sAn003ro3GAAAAAElFTkSuQmCC) 50% no-repeat;
        margin-left: 0;
        border-radius: 50%;
        margin-top: 3px;
    }
    .recordWrapper .record li .left .line{
        height: 100%;
        width: 1px;
        background-color: #dcdde3;
        margin: 0 auto;
        flex: 1;
    }
    .recordWrapper .record li .right{
        flex: 1;
    }
    .recordWrapper .record li .right .item-date-show{
        width: 120px;
        background-color: #0083ff;
        color: #fff;
        text-align: center;
        position: relative;
        border-radius: 2px;
        font-size: 12px;
        height: 24px;
        line-height: 24px;
    }
    .recordWrapper .record li .right .item-date-show img{
        position: absolute;
        width: 10px;
        height: 10px;
        left: -7px;
        bottom: 7px;
        border-style: none;
        max-width: 100%;
    }
    .recordWrapper .record li .right .keep-record-item{
        margin-top: 16px;
        background-color: #fff;
        padding: 16px;
        margin-bottom: 16px;
    }
    .recordWrapper .record li .right .keep-record-item .keep-scroll-title{
        display: flex;
    }
    .keep-record-item .keep-scroll-title .t-avatar{
        height: 40px;
        width: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 50%;
        overflow: hidden;
        display: block;
        font-size: 16px;
    }
    .keep-record-item .keep-scroll-title .t-avatar .name{
        background-color: rgb(121, 204, 112);
        color: rgb(255, 255, 255);
        border-radius: 50%;
        font-size: 14px;
    }
    .keep-main-info{
        flex: 1;
        margin-left: 8px;
    }
    .keep-main-info .user-name{
        color: #1890ff;
        margin-bottom: 5px;
    }
    .keep-main-info .keep-type-time{
        color: #959ea6;
        font-size: 12px;
    }
    .keep-main-info .keep-type-time span{
        margin-right: 5px;
    }
    .keep-scroll-content{
        font-size: 13px;
        color: #292e33;
        margin-top: 16px;
        word-wrap: break-word;
    }
    .keep-scroll-content p{
        margin: 0;
    }
    .fields-detail{
        height: auto;
        overflow: hidden;
        transition: height .3s;
        margin-top: 16px;
    }
    .fields-detail .el-row .el-col{
        padding: 10px;
        font-size: 13px;
        color: #000;
        display: flex;
    }
    .fields-detail .el-row .el-col .title{
        width: 110px;
        padding-right: 10px;
        color: #999;
    }
    .fields-detail .el-row .el-col .value{
        word-break: break-all;
        flex: 1;
    }
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
    }
    .basicWrapper ul li .el-col .value{
        word-break: break-all;
        flex: 1;
    }
    .createRecord{
        padding: 16px;
    }
    .createRecord .content{
        display: inline-block;
        width: 100%;
        height: 32px;
        padding: 0 12px;
        color: rgba(0,0,0,.65);
        font-size: 12px;
        line-height: 32px;
        background-color: #fff;
        background-image: none;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        transition: all .3s;
        cursor: pointer;
    }
    .createRecord .content:hover{
        border-color: #1890ff;
    }
    .createRecord .content i{
        color: #1890ff;
        font-size: 15px;
    }
    .createRecord .content span{
        margin-left: 10px;
        color: rgb(230, 230, 230);
    }
    .keep-index{
        color: #575f66;
        font-size: 12px;
        line-height: 40px;
        margin-right: 12px;
    }
    .keep-right{
        line-height: 40px;
        cursor: pointer;
    }
</style>
<style>
    .mytab .el-tabs__nav-scroll{
        padding-left: 16px !important;
    }
    .enterInput .el-form-item__content{
        margin-left: 0 !important;
    }
    
    .userOrderWrapper{
     height: 100vh !important;
  }
  .userOrderWrapper .el-drawer__body{
   overflow: auto;
   background: #eff3f5;
  }
  .recordWrapper .el-drawer__body{
    overflow: auto;
  }
  .userOrderWrapper .el-drawer__body .user-wrapper{
    /* margin: 16px; */
    min-height: 95%;
    /* background-color: #fff;
    border-radius: 4px; */
    position: relative;
  }
  
  .userOrderWrapper .el-drawer__header,.recordWrapper .el-drawer__header{
    margin-bottom: 20px;
  }
</style>