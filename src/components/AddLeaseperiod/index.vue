<template>
    <section class="addRommWrap">
        <div class="content">
            <div class="step-container">
                <el-form ref="addRoomForm" :model="addRoomForm" :rules="addRoomRules" label-width="150px" class="addRoomForm">
                    <div>
                      <el-form-item label="开始起租时间" prop="minStartDate">
                        <el-date-picker v-model="addRoomForm.minStartDate" type="date" :disabled="currentType == 'view'" :editable="false" placeholder="请选择开始起租时间" value-format="yyyy-MM-dd"
                                        clearable style="width: 100%;"></el-date-picker>
                      </el-form-item>
                      <el-form-item label="结束起租时间" prop="maxStartDate">
                        <el-date-picker v-model="addRoomForm.maxStartDate" type="date" :disabled="currentType == 'view'" :editable="false" placeholder="请选择结束起租时间" value-format="yyyy-MM-dd"
                                        clearable style="width: 100%;"></el-date-picker>
                      </el-form-item>
                      <el-form-item label="价格单位：" prop="leaseType">
                        <el-select v-model="addRoomForm.leaseType" placeholder="请选择价格单位" :disabled="currentType == 'view'" clearable style="width: 100%;">
                          <el-option label="天" value="0"></el-option>
                          <el-option label="周" value="1"></el-option>
                          <el-option label="月" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                        <el-form-item label="期数" prop="periods">
                            <el-input v-model="addRoomForm.periods" placeholder="请输入期数" :disabled="currentType == 'view'" clearable/>
                        </el-form-item>
                        <el-form-item label="价格" prop="rent">
                            <el-input v-model="addRoomForm.rent" placeholder="请输价格" :disabled="currentType == 'view'" clearable/>
                        </el-form-item>
                    </div>
                </el-form>
            </div>

        </div>
        <div class="buttonWrapper">
          <el-button v-if="currentType == 'view'" size="mini" type="primary" @click="close()">关闭</el-button>
          <el-button v-else size="mini" type="primary" @click="submit()">保存</el-button>
        </div>
    </section>
</template>
<script>
import { addLeaseperiod, getLeaseperiod, delLeaseperiod, editLeaseperiod, getListLeaseperiod } from '@/api/rent/room'
import { getToken } from '@/utils/auth'
export default {
    components:{
    },
    props: {
        currentType: {
            type: String
        },
        currentHouseid:{
            type: Number
        },
        currentId:{
            type: Number
        },
      currentRoomid:{
        type: Number
      },
    },
    data() {
        return {

            addRoomForm:{
              minStartDate: '',
              maxStartDate: '',
              leaseType: '',
              periods: '',
              rent: '',
            },
            addRoomRules:{
              minStartDate:[
                { required: true, message: '请选择开始起租时间', trigger: 'blur' }
              ],
              maxStartDate:[
                { required: true, message: '请选择结束起租时间', trigger: 'blur' }
              ],
              leaseType:[
                { required: true, message: '请选择价格单位', trigger: 'blur' }
              ],
              periods:[
                { required: true, message: '请输入期数', trigger: 'blur' }
              ],
              rent:[
                { required: true, message: '请输价格', trigger: 'blur' }
              ],
            },
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
        currentId(newV,oldV){
            this.currentRoomId = newV;
            this.addRoomForm.roomId = newV;
        }
    },
  mounted() {
    if(this.currentType == 'edit' || this.currentType == 'view' ) this.getLeaseperiod()
  },
    methods:{

      submit(){
        this.$refs['addRoomForm'].validate((valid) => {
          if (valid) {
            this.addLeaseperiod()
          }
        })
      },
      addLeaseperiod(){
        const { addRoomForm, } = this;
        const params = {
            ...addRoomForm,
          id: this.currentId,
          roomId: this.currentRoomid,
        };
        const success = res => {
          if(res.code==200){
            if(this.currentType === 'add') this.msgSuccess('添加成功')
            else this.msgSuccess('修改成功')
            this.$emit("on-result-change",false);
          }else{
            this.msgError(res.msg)
          }
        }
        if(this.currentType === 'add') addLeaseperiod(params).then(res=>{ success(res) });
        if(this.currentType === 'edit') editLeaseperiod(params).then(res=>{ success(res) })
      },
      getLeaseperiod(){
        getLeaseperiod(this.currentId).then(res=>{
          if(res.code==200){
            this.addRoomForm = {
              minStartDate: res.data.minStartDate,
              maxStartDate: res.data.maxStartDate,
              leaseType: res.data.leaseType,
              periods: res.data.periods,
              rent: res.data.rent
            }
          }else{
            this.msgError(res.msg)
          }
        })
      },
      close(){
          //this.$emit("statusChange",false)
          this.$emit("on-result-change",false);
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
