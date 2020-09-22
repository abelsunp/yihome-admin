<template>
  <div id="app">
    <router-view />
    <!-- <el-upload
        class="avatar-uploader my-custom-img"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false">
        </el-upload> -->

        <el-upload
          class="avatar-uploader my-custom-img"
          :action="myUploadImgUrl"
          name="file"
          :headers="myHeaders"
          :show-file-list="false"
          :on-success="quillImgSuccess"
          
          accept=".jpg,.jpeg,.png,.gif"
        />

  </div>
</template>

<script>
import { getToken,localStoreGetToken } from '@/utils/auth'
export default  {
  name:  'App',
  data(){
    return{
      //myUploadImgUrl:'http://47.100.186.108:8080/admin/common/upload',
      myUploadImgUrl: process.env.VUE_APP_UPLOAD_URL, 
      myHeaders: {
        Authorization: 'Bearer ' + localStoreGetToken()
      }
    }
  },
  created(){
    console.log(localStoreGetToken())
    this.myHeaders.Authorization = 'Bearer ' + localStoreGetToken();
  },
  methods:{
    quillImgSuccess(res, file){
      if (res.code == 200) {
        localStorage.setItem('ueditorImgUrl',res.fileName)
        console.log(window.UE)
      }else {
        this.$message.error(res.msg)
      }
    }
  }
}
</script>
<style scoped>
.my-custom-img{
  display: none;
}
</style>
<style>
  .edui-default .edui-editor-toolbarboxinner{
    text-align: left;
  }
  .edui-default .edui-editor-toolbarbox{
    position: none !important;
  }
  .edui-default .edui-editor-breadcrumb{
    text-align: left;
    display: none;
  }
  .edui-default .edui-toolbar .edui-combox .edui-combox-body{
    height: 20px;
  }
  .el-notification__content{
    word-break: break-all;
  }
  .el-table thead .same-color {
    background-color: rgb(248,248,249);
    color: #515a6e;
    
  }
  .el-table__fixed-header-wrapper th{
    border: 0 !important;
  }
</style>
