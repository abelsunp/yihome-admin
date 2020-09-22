<template>
  <div class="app-container">
    <el-upload
      class="upload-demo"
      action="http://192.168.1.55:8080/admin/system/user/profile/avatartest"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :headers="headers"
      multiple
      list-type="picture"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
import { uploadTest } from '@/api/house/houseList'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      headers: {
        Authorization: 'Bearer ' + getToken() // 从cookie里获取token，并赋值  Authorization ，而不是token
      },
      uploadUrl: process.env.VUE_APP_BASE_API
    }
  },
  created() {
    setTimeout(()=>{
      console.log(this.uploadUrl)
    },1000)

  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    }
  }
}
</script>

<style>
</style>
