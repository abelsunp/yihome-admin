<template>
    <section class="up">
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
    </section>
</template>
<script>
import { getToken } from '@/utils/auth'
export default {
    props:{
        userId:{
            type:Number
        }
    },
    data(){
        return {
            imageUrl: '',
            uploadImgUrl: process.env.VUE_APP_BASE_API + '/common/upload', // 上传的图片服务器地址
            uploadImgUrl: 'http://47.100.186.108:8080/admin/common/upload',
            headers: {
                Authorization: 'Bearer ' + getToken()
            },
            dataparams: { 'userId': this.userId },
        }
    },
    watch:{
        userId: function(newValue, oldValue) {
            this.dataparams.userId = newValue;
        }
    },
    methods:{
        uploadSuccess(res, file) {
            if(file.raw.type.toLowerCase() == 'application/pdf'){
                this.imageUrl ='https://www.inyihome.com/img/pdf.svg'
            }else{
                this.imageUrl = URL.createObjectURL(file.raw);
            }
            // this.$refs.uploadOfferimg.clearValidate();
            // this.ruleForm.offerimg = res.data[0];
        },
        beforeUpload(file) {
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
        },
        uploadError(){
            this.imageUrl = 'https://www.inyihome.com/newStatic/icon_uploadError.png';
            this.$message.error('文件上传失败');
        }
    }
}
</script>
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