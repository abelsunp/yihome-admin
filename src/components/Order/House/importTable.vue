<template>
  <!-- 导入表 -->
  <el-dialog v-loading="tableLoading" title="选择房源（请选择房源然后选择单间）" :visible.sync="visible" width="800px" top="5vh"  append-to-body>
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="房源名称" prop="houseName">
        <el-input
          v-model="queryParams.houseName"
          placeholder="请输入房源名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
     
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
     <el-row>  <!--@select="handleSelect" -->
      <el-table  class="tablessp" @row-click="clickRow" ref="table" :data="dbTableList"
        height="260px"
       @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" :selectable='checkboxT'></el-table-column>
        <el-table-column prop="name" label="房源名称"></el-table-column>
        <el-table-column prop="phone" label="单间名称">
          <template slot-scope="scope">
             <el-select style="width:100%;" class="currentSelect" v-model="scope.row.room"  placeholder="请选择" @visible-change="visibleChange(scope.row)" @change="selectChange">
              <el-option
                v-for="item in scope.row.roomData"
                :key="item.id"
                :label="item.name"
                :value="item.id+',,'+item.name">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleImportTable">确 定</el-button>
      <el-button @click="visible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>

import { listHouseOnly,listRoom } from '@/api/rent/house'
import { addOrderUser } from "@/api/order/order";
export default {
  data() {
    return {
      tableLoading:false,
      // 遮罩层
      visible: false,
      // 选中数组值
      tables: [],
      // 总条数
      total: 0,
      // 表数据
      dbTableList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        houseName: undefined,
      },
      orderRooms:[],
      orderSelectRoom:'',


      hasSelectArray:[],//父组件新增或者编辑时 弹出此页面组件  代表已经存在的数据在table中不可以再选择
    };
  },
  methods: {
    checkboxT(row, rowIndex){
      if(row.checked){
        return false;//禁用
      }else{
        return true;
      }
    },
    // 显示弹框
    show() {
      this.getList();
      this.visible = true;
    },
    clickRow(row, column, event) {
      if(row.checked){

      }else{
        this.$refs.table.toggleRowSelection(row);
      }
    },

    handleSelectionChange(selection) {
      if (selection.length > 1) {
        this.$refs.table.clearSelection();
        let current = selection.pop()
        this.$refs.table.toggleRowSelection(current);
      }else{
        let selected = selection.length;
        if(selected==1){
          
          var $index;
          this.dbTableList.forEach((element,index)=>{
            if(selection[0]==element){
              $index = index;
            }else{
              $('.currentSelect input').val('')
            }
          });
          const loading = this.$loading({
            lock: true,
            text: '单间加载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          this.getRoomData(selection[0].id).then(text=>{
            loading.close();
            this.dbTableList.forEach((content)=>{
              content.roomData = {}
            });
            selection[0].roomData = text;

            this.$set(this.dbTableList,$index,selection[0])
          }).catch(e=>{
            loading.close();
            this.msgError(text.msg)
          })
          this.orderRooms = [];
          this.orderSelectRoom = '';
          this.orderRooms.push(selection[0]);

        }else{
          this.orderRooms = []
          this.orderSelectRoom = ''
        }
      }

    },
    // 多选框选中数据
    //handleSelectionChange(selection) {
        //console.log(selection)
        //this.tables = selection.map(item => item.nameCh);

        // const DataProps = []
        // selection.forEach(element => {
        //     DataProps.push({userId:element.id,userName:element.nameCh})
        // });
        // this.tables = DataProps
    //},
    handleSelect(val,row){
      if (val.length > 1) {
        this.$refs.table.clearSelection() // 清空所有选择
        val.shift()
        this.$refs.table.toggleRowSelection(row) //  选中当前选择
      }
      let selected = val.length && val.indexOf(row) !== -1;
      console.log(selected,row)  // true就是选中，0或者false是取消选中

      var $index;
      this.dbTableList.forEach((element,index)=>{
        if(row==element){
          $index = index;
        }else{
          
          $('.currentSelect input').val('')
        }
      })
      
      //如果选中当前的数据
      if(selected){
        //console.log(this.getRoomData(row.id))

          const loading = this.$loading({
            lock: true,
            text: '单间加载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          this.getRoomData(row.id).then(text=>{
            loading.close();
            row.roomData = text;
            this.$set(this.dbTableList,$index,row)
          })
        
        

        // //console.log(s)
        this.orderRooms = [];
        this.orderSelectRoom = '';
        this.orderRooms.push(row);
      }else{
        //row.room = null
        this.orderRooms = []
        this.orderSelectRoom = ''
      }
    },
    //查询单间的信息
    getRoomData(id){
      return new Promise((resolve)=>{
        listRoom({houseId:id}).then(res=>{
          resolve(res.data)
        })
      })
    },
    // 查询表数据
    getList() {

      console.log(this.hasSelectArray)

      this.tableLoading = true;
      listHouseOnly(this.queryParams).then(res => {
        this.tableLoading = false;
        if (res.code === 200) {
          this.dbTableList = res.data.list;
          this.total = res.data.total;

          this.dbTableList.forEach(el=>{
            this.hasSelectArray.forEach(el2=>{
              if(el.id==el2.houseId){
                el.checked = true;
                console.log(el.checked,el)
              }else{
                
              }
            })
          })
        }
      }).catch(e=>{
        this.tableLoading = false;
      })
    },
    visibleChange(row,data){
      // console.log(row,data)
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 导入按钮操作 */
    handleImportTable() {
        var obj ={
          "houseId": 0,
          "houseName": "string",
          "roomId": 0,
          "roomName": "string",
        }

        
        if(this.orderRooms.length==0){
          this.$message({ type: 'warning', message: '请选择房源'});
          return;
        }
        if(this.orderSelectRoom==''){
          this.$message({ type: 'warning', message: '请选择单间'});
          return;
        }

        this.orderSelectRoom = this.orderSelectRoom.split(",,")
        //console.log(this.orderRooms,this.orderSelectRoom)

        obj.houseId = this.orderRooms[0].id;
        obj.houseName = this.orderRooms[0].name;
        obj.roomId = this.orderSelectRoom[0];
        obj.roomName = this.orderSelectRoom[1];

        console.log(obj)
        this.visible = false;
        //选择的用户
        this.$emit("ok",obj);
    },
    selectChange(val){
      this.orderSelectRoom = val;
      console.log(val)
    }
  }
};
</script>
<style >
  .tablessp thead tr .el-checkbox__input{
      display: none;
  }
</style>
