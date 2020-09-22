<template>
    <section class="addRommWrap">
        <div class="content">
            <!-- {{currentHouseId}}/{{currentRoomId}} -->
            <el-steps :active="stepActive" finish-status="success" >
                <el-step title="基础信息"></el-step>
                <el-step title="图片/视频"></el-step>
                <el-step title="租期信息"></el-step>
            </el-steps>
            <!-- 当前的状态：{{current}}  -->
            <div class="step-container">
                <el-form ref="addRoomForm" :model="addRoomForm" :rules="addRoomRules" label-width="150px" class="addRoomForm">
                    <div v-show="stepActive==1">
                        <el-form-item label="房间名称(中文)：" prop="name">
                            <el-input v-model="addRoomForm.name" clearable/>
                        </el-form-item>
                        <el-form-item label="房间名称(英文)：" prop="nameEn">
                            <el-input v-model="addRoomForm.nameEn" clearable/>
                        </el-form-item>
                        <el-form-item label="面积：">
                            <el-col :span="8">
                                <el-input v-model="addRoomForm.minArea" clearable/>
                            </el-col>
                            <el-col style="text-align:center;" class="line" :span="2">~</el-col>
                            <el-col :span="8">
                                <el-input v-model="addRoomForm.maxArea" clearable/>
                            </el-col>

                            <el-col :span="6">
                                {{addRoomForm.desc}}
                            </el-col>

                        </el-form-item>
                        <el-form-item label="价格单位：" prop="unit">
                            <el-select v-model="addRoomForm.unit" placeholder="请选择价格单位">
                                <el-option label="周" value="2"></el-option>
                                <el-option label="天" value="1"></el-option>
                                <el-option label="月" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="单间说明：" prop="remark">
                            <vue-ueditor-wrap v-model="addRoomForm.remark" :config="myConfig" :key="788"></vue-ueditor-wrap>
                        </el-form-item>
                        <el-form-item :label="RoomType+'：'" class="roomType">
                            <el-checkbox-group v-model="RoomTypeValue">
                                <el-checkbox-button v-for="(item,$index) in RoomTypeArray" :label="item.id+','+item.labelId" :key="$index">
                                    {{item.name}}
                                </el-checkbox-button>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item :label="Bathroom+'：'">
                            <el-radio-group v-model="BathroomValue">
                                <el-radio-button v-for="(item,$index) in BathroomArray" :label="item.id+','+item.labelId" :key="$index">
                                    {{item.name}}
                                </el-radio-button>

                            </el-radio-group>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div v-show="stepActive==2">
                <div class="step-uploadWrapper" style="margin-bottom: 32px;margin-top: 32px;display:flex;">
                    <span style="min-width: 80px;">单间图片：</span>
                    <div>
                        <el-upload
                        :action="uploadImgUrl"
                        :headers="headers"
                        list-type="picture-card"
                        :data="dataparams"
                        multiple
                        :file-list="fileList"
                        :on-preview="handlePictureCardPreview"
                        :on-success="pictureSuccess"
                        :before-remove="pictureBeforeRemove"
                        :before-upload="pictureUpload"
                        >
                        <i class="el-icon-plus" />
                        </el-upload>
                        <el-dialog :visible.sync="uploadPicListStatus" custom-class="viewRoomPic" append-to-body :modal-append-to-body="false" >
                            <img width="100%" :src="uploadPicListUrl" alt="">
                        </el-dialog>
                    </div>
                </div>

                <div class="step-uploadWrapper" style="margin-bottom: 32px;margin-top: 32px;display:flex;">
                    <span style="min-width: 80px;">单间视频：</span>
                    <div>
                        <el-upload
                        :action="uploadImgUrl"
                        :headers="headers"
                        list-type="picture-card"
                        :data="dataparams"
                        multiple
                        :file-list="fileList2"
                        :on-preview="handlePictureCardPreview2"
                        :on-success="pictureSuccess2"
                        :before-remove="pictureBeforeRemove2"
                        :before-upload="pictureUpload2"
                        >
                        <i class="el-icon-plus" />
                        </el-upload>
                        <el-dialog :visible.sync="uploadPicListStatus2">
                            <img width="100%" :src="uploadPicListUrl2" alt="">
                        </el-dialog>
                    </div>
                </div>

            </div>
            <div v-show="stepActive==3">
                <Leaseperiod :id="currentRoomId" :data-array="leaseperiods"/>
            </div>
        </div>
        <div class="buttonWrapper">
            <el-button size="mini" type="primary" @click="next()"  v-show="stepActive!=3">下一步</el-button>
            <el-button size="mini" type="primary" v-show="stepActive==3" @click="close">保存</el-button>
            <el-button size="mini" @click="prev()" v-show="stepActive!=1">上一步</el-button>
        </div>
    </section>
</template>
<script>
import { listLabel } from '@/api/home/label'
import { listDetail } from '@/api/home/detail'
import { addRoomAPI, editRoomAPI, getInfoById,insertRoomImage,delelteRoomImage } from '@/api/rent/room'
import Editor from '@/components/Editor'
import Leaseperiod from '@/components/Leaseperiod'
import { getToken } from '@/utils/auth'

import VueUeditorWrap from '@/components/UE';
export default {
    components:{
        Editor,
        Leaseperiod,
        VueUeditorWrap
    },
    props: {
        currentType: {
            type: String
        },
        currentHouseid:{
            type: Number
        },
        currentRoomid:{
            type: Number
        },
    },
    data() {
        return {
            myConfig:{
                autoHeightEnabled: false,
                initialFrameHeight: 200,
                initialFrameWidth: '100%',
            },
            current: this.currentType,//add 新增单间   edit 编辑单间
            currentHouseId:this.currentHouseid,
            currentRoomId:this.currentRoomid,//当前单间的id
            stepActive:1,
            addRoomForm:{
                houseId:this.currentHouseid,
                roomId:this.currentRoomid,
                RoomType:[]
            },
            addRoomRules:{
                name:[
                    { required: true, message: '请输入房间中文名称', trigger: 'blur' },
                    { min: 3, max: 200, message: '长度在 3 到 200 个字符', trigger: 'blur' }
                ],
                nameEn:[
                    { required: true, message: '请输入房间英文名称', trigger: 'blur' },
                    { min: 3, max: 200, message: '长度在 3 到 200 个字符', trigger: 'blur' }
                ],
            },
            Bathroom:'',
            RoomType:'',
            RoomTypeArray:[],
            BathroomArray:[],
            RoomTypeValue:[],
            BathroomValue:'',
            // uploadImgUrl: 'http://47.100.186.108:8080/admin/common/upload',
            uploadImgUrl: process.env.VUE_APP_UPLOAD_URL,
            headers: {
                Authorization: 'Bearer ' + getToken()
            },
            dataparams: { 'roomId': '' },
            fileList:[],fileList2:[],
            uploadPicListStatus: false,uploadPicListStatus2: false,
            uploadPicListUrl: '',uploadPicListUrl2: '',

            leaseperiods:[],
        }
    },
    created() {
        console.log(this.current)
         console.log(this.serverImgUrl,11)
        this.getRoomLabel();

        if(this.currentRoomId){//如果currentRoomId 存在 获取单间信息
            getInfoById(this.currentRoomId).then(res=>{
                console.log(res)
                this.addRoomForm = res.data.room;
                //labels 固定判断 labelTypeId 16表示卫浴设施   17表示房间类型
                res.data.lables.forEach(obj=>{
                    if(obj.labelTypeId==16){
                        this.BathroomValue = obj.labelDetalId+','+obj.labelTypeId;
                    }
                    if(obj.labelTypeId==17){
                        let str = obj.labelDetalId+','+obj.labelTypeId;
                        this.RoomTypeValue.push(str)
                    }
                })

                res.data.urls.forEach(content => {
                    if (content.type == 1) {
                        this.fileList.push({ name: content.id, url: this.serverImgUrl + content.imgurl, id: content.id })
                    }
                    if (content.type == 2) {
                        this.fileList2.push({ name: content.id, url: this.serverImgUrl + content.imgurl, id: content.id })
                    }
                })
                this.leaseperiods = res.data.leaseperiods;

            })
        }


    },
    watch: {
        currentHouseid(newV,oldV) {
            this.currentHouseId = newV;
            this.addRoomForm.houseId = newV;
        },
        currentType: function() {
            this.current = this.currentType
        },
        currentRoomid(newV,oldV){
            this.currentRoomId = newV;
            this.addRoomForm.roomId = newV;
        }
    },
    methods:{
        close(){
            //this.$emit("statusChange",false)
            this.$emit("on-result-change",false);
        },
        next(){
            if(this.stepActive==1){
                this.$refs['addRoomForm'].validate((valid) => {
                    if(valid){
                        const labels = [];
                        if(this.RoomTypeValue.length!=0){
                            this.RoomTypeArray.forEach(item=>{//id  labelId
                                this.RoomTypeValue.forEach(obj=>{
                                    if(obj==item.id+','+item.labelId){
                                        labels.push({
                                            labelDetalId:item.id,
                                            labelDetalName:item.name,
                                            labelTypeId:item.labelId
                                        })
                                    }
                                })
                            })
                        }

                        console.log(this.BathroomValue)

                        if(this.BathroomValue){
                            let contentx = this.BathroomValue.split(',')
                            labels.push({
                                labelDetalId:contentx[0],
                                labelTypeId:contentx[1]
                                //labelDetalName:contentx[1],
                                //labelTypeId:contentx[2]
                            })
                        }

                        this.addRoomForm.labels = labels;

                        if(this.currentRoomId){//如果存在roomId
                            editRoomAPI(this.addRoomForm).then(res=>{
                                if(res.code==200){
                                    this.stepStatus()
                                }else{
                                    this.msgError(res.msg)
                                }
                            })
                        }else{
                            addRoomAPI(this.addRoomForm).then(res=>{
                                if(res.code==200){
                                    this.currentRoomId = res.data;
                                    this.stepStatus()
                                }else{
                                    this.msgError(res.msg)
                                }
                            })
                        }
                    } else {
                        this.msgError('请输入以上必填信息')
                        return false
                    }
                })
            }else if (this.stepActive == 2) {

                this.stepStatus()
            } else if (this.stepActive == 3){

                this.stepStatus()
            }


        },
        stepStatus() {
            if (this.stepActive++ > 2) {
                this.stepActive = 1
            }
        },
        prev(){
            --this.stepActive
            if (this.stepActive < 1) this.stepActive = 1
        },
        getRoomLabel() {
            listLabel({ source: 2 }).then(response => {
                response.rows.forEach(obj => {
                    if(obj.name=='卫浴设施'){
                        this.Bathroom = obj.name;
                        listDetail({ labelId: obj.id }).then(res => {
                           this.BathroomArray = res.rows
                        })

                    }
                    if(obj.name=='房间类型'){
                        this.RoomType = obj.name;
                        listDetail({ labelId: obj.id }).then(res => {
                           this.RoomTypeArray = res.rows
                        })
                    }
                });
            })
        },
        pictureSuccess(response, file, fileList) {
            if (response.code == 200) {
                // 图片上传成功后
                const obj = {
                    type: 1,
                    'cover': undefined,
                    imgurl: response.fileName,
                    roomId: this.currentRoomId
                }

                if (fileList.length == 1) {
                    obj.cover = '1'
                }

                // 保存图片
                insertRoomImage(obj).then(res => {
                if (res.code == 200) {
                    response.id = res.data
                    file.id = res.data
                    console.log(fileList)
                }
                })
            } else {
                this.msgError(response.msg)
            }
        },


        pictureSuccess2(response, file, fileList) {
            if (response.code == 200) {
                // 图片上传成功后
                const obj = {
                    type: 2,
                    'cover': undefined,
                    imgurl: response.fileName,
                    roomId: this.currentRoomId
                }

                if (fileList.length == 1) {
                    obj.cover = '1'
                }

                // 保存图片
                insertRoomImage(obj).then(res => {
                    if (res.code == 200) {
                        response.id = res.data

                        file.url = 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                        file.id = res.data
                    }
                })
            } else {
                this.msgError(response.msg)
            }
        },

        handlePictureCardPreview(file) {
            this.uploadPicListStatus = true
            this.uploadPicListUrl = file.url
        },
        handlePictureCardPreview2(file) {
            this.uploadPicListStatus2 = true
            this.uploadPicListUrl2 = file.url
        },
        pictureUpload(file) {
            const isJPG = file.type.toLowerCase() === 'image/jpeg'
            const isPNG = file.type.toLowerCase() === 'image/png'
            const isBMP = file.type.toLowerCase() === 'image/bmp'
            const isLt2M = file.size / 1024 / 1024 < 5
            if (isJPG || isPNG || isBMP) {
            } else {
                this.$message.error('上传图片格式不正确!支持JPG、JPEG、PNG、BMP格式')
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 5MB!')
            }
            return isJPG || isPNG || isBMP && isLt2M
        },

        pictureUpload2(file) {
            console.log(file)
            const isJPG = file.type.toLowerCase() === 'video/mp4'
            const isPNG = file.type.toLowerCase() === 'video/ogg'
            const isLt2M = file.size / 1024 / 1024 < 20
            if (isJPG || isPNG) {
            } else {
                this.$message.error('上传视频格式不正确!支持MP4、ogg格式')
            }
            if (!isLt2M) {
                this.$message.error('上传视频大小不能超过 20MB!')
            }
            return isJPG || isPNG && isLt2M
        },

        pictureBeforeRemove(file, fileList) {
            console.log(file, fileList)
            if (file.status == 'success') {
                delelteRoomImage(file.id).then(res => {
                    console.log(res)
                })
            }
        },
        pictureBeforeRemove2(file, fileList) {
            console.log(file, fileList)
            if (file.status == 'success') {
                delelteRoomImage(file.id).then(res => {
                    console.log(res)
                })
            }
        },
    }
}
</script>
<style scoped>
    section{
        position: relative;
        height: 100%;
    }
    section .content{
        padding:20px;
    }
    section .buttonWrapper{
        width: 100%;
        padding: 20px 0 0;
        /* position: absolute;
        bottom: 0;
        right: 0; */
        border-top: 1px solid rgba(233, 233, 233, 1);
        margin-bottom: 20px;
        text-align: right;
        padding-right: 20px;
    }
    .step-container{
        margin-top: 24px;
    }
</style>
<style>
.addRommWrap .roomType .el-checkbox-group label{
    margin-right: 10px;
    margin-bottom:10px;
}
.addRommWrap .el-radio-group label{
    margin-right: 10px;
    margin-bottom:10px;
}
.addRommWrap .el-checkbox-button__inner,.addRommWrap .el-radio-button__inner{
    border-left: 1px solid #DCDFE6;

}
.addRommWrap .checkbox-group span,.addRommWrap .el-radio-group span{
    border-radius: 4px;
}
.viewRoomPic{

}
</style>
