<template>
    <section class="addRommWrap">
      <el-row :gutter="10" class="mb8" style="margin: 20px 0 0 20px">
        <el-col :span="1.5">
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddRoom('add')">新增租期</el-button>
        </el-col>

<!--        @selection-change="handleSelectionChange"-->
<!--        @row-click="clickRoomRow"-->
<!--        @cell-dblclick="dblHandleCell"-->
      </el-row>
        <div class="content">
          <el-table
            v-loading="roomLoading"
            :data="roomList"

            border
            highlight-current-row

          >

            <el-table-column label="开始起租时间" align="center" prop="name" :show-overflow-tooltip="true">
              <template slot-scope="scope"> <span>{{scope.row.minStartDate}}</span> </template>
            </el-table-column>
            <el-table-column label="结束起租时间" align="center" prop="name" :show-overflow-tooltip="true">
              <template slot-scope="scope"> <span>{{scope.row.maxStartDate}}</span> </template>
            </el-table-column>
            <el-table-column label="租期区间类型" align="center" prop="name" :show-overflow-tooltip="true">
              <template slot-scope="scope"> <span>{{scope.row.leaseType | filterLeaseType}}</span> </template>
            </el-table-column>
            <el-table-column label="期数" align="center" prop="name" :show-overflow-tooltip="true">
              <template slot-scope="scope"> <span>{{scope.row.periods}}</span> </template>
            </el-table-column>
            <el-table-column label="价格" align="center" prop="name" :show-overflow-tooltip="true">
              <template slot-scope="scope"> <span>{{scope.row.rent}}</span> </template>
            </el-table-column>


            <el-table-column
              label="操作"
              width="280"
              align="center"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button size="mini" type="text" icon="el-icon-view" @click="handleAddRoom('view',scope.row)">查看</el-button>
                <el-button size="mini" type="text" icon="el-icon-edit" @click.stop="handleAddRoom('edit', scope.row)">编辑</el-button>
                <el-button size="mini" type="text" icon="el-icon-edit" @click.stop="deleted(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>


      <!-- 格式化租期 -->
      <el-drawer
        title="格式化租期"
        size="580px"
        custom-class="addEditRoom"
        :visible.sync="leaseperiodStatus"
        :append-to-body="true"
        :before-close="DrawerClose">
        <div v-if="leaseperiodStatus">
          <Add-leaseperiod
            :current-type="addOrEdit"
            :current-houseid="currentHouseid"
            :current-id="currentId"
            :current-roomid="currentRoomid"
            @on-result-change="onResultChange"
          />
        </div>
      </el-drawer>
    </section>

</template>
<script>
import { addLeaseperiod, getLeaseperiod, delLeaseperiod, editLeaseperiod, getListLeaseperiod } from '@/api/rent/room'
import { getToken } from '@/utils/auth'
import AddLeaseperiod from "@/components/AddLeaseperiod";
export default {
    components:{
      AddLeaseperiod
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
    filters: {
      filterLeaseType: (val) => {
        let type = '';
        switch (val) {
          case '0': type = '天'; break
          case '1': type = '周'; break
          case '2': type = '月'; break
        }
        return type
      }
    },
  data() {
        return {
          roomLoading: true,
          roomList: [],
          leaseperiodStatus: false,
          addOrEdit: '',
          currentId: ''
        }
    },
    created() {
        this.getListLeaseperiod()
    },
    watch: {

    },
    methods:{

      getListLeaseperiod(){
        this.roomLoading = true
        getListLeaseperiod({roomId: this.currentRoomid}).then(res=>{
          this.roomLoading = false
          if(res.code==200){
            this.roomList = res.rows
          }else{
            this.msgError(res.msg)
          }
        })
      },

      handleAddRoom(type,data){
        this.addOrEdit = type;
        this.leaseperiodStatus = true
        this.currentId = data.id
      },

      deleted(data){
        delLeaseperiod(data.id).then(res=>{
          if(res.code==200){
            this.msgSuccess('删除成功');
            this.getListLeaseperiod();
          }else{
            this.msgError(res.msg)
          }
        })
      },

      onResultChange(val) {
        this.leaseperiodStatus = val;
        this.getListLeaseperiod();
      },
      DrawerClose(done) {
        this.$confirm("确认关闭当前浮层？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            done();
          })
          .catch(() => {});
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
