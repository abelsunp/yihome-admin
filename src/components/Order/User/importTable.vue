<template>
  <!-- 导入表 -->
  <el-dialog v-loading="tableLoading" title="选择用户" :visible.sync="visible" width="800px" top="5vh"  append-to-body>
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="姓名" prop="nameCh">
        <el-input
          v-model="queryParams.nameCh"
          placeholder="请输入姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入手机号"
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
    <el-row> <!-- @select="handleSelect" @selection-change="handleSelectionChange"  -->
      <el-table class="tablessp" @row-click="clickRow" ref="table" :data="dbTableList" 
        @selection-change="handleSelectionChange"
        height="260px">
        <el-table-column type="selection" width="55" :selectable='checkboxT'></el-table-column>
        <el-table-column prop="nameCh" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="weChat" label="微信"></el-table-column>
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
import { allSalesList } from "@/api/user/users";
import { addOrderUser } from "@/api/order/order";
export default {
  data() {
    return {
      tableLoading:false,
      // 遮罩层
      visible: false,
      // 选中数组值
      tables: {},
      // 总条数
      total: 0,
      // 表数据
      dbTableList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        nameCh: undefined,
        phone: undefined
      },

      hasSelectArray:[],//父组件新增或者编辑时 弹出此页面组件  代表已经存在的数据在table中不可以再选择

      
    };
  },
  created() {
   
    
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
      this.tables={}
      this.getList();

      this.visible = true;
    },
    clickRow(row) {
      //this.$refs.table.toggleRowSelection(row);
      if(row.checked){

      }else{
        this.$refs.table.toggleRowSelection(row);
      }
      
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      if (selection.length > 1) {
        this.$refs.table.clearSelection();
        let current = selection.pop();
        this.$refs.table.toggleRowSelection(current);
      }else{
        let selected = selection.length;
        if(selected==1){
          console.log(selection)
          this.tables.userId = selection[0].id;
          this.tables.userName = selection[0].nameCh
        }else{
          this.tables={}
        }
      }
    },
    handleSelect(val,row){
      if (val.length > 1) {
        this.$refs.table.clearSelection() // 清空所有选择
        val.shift()
        this.$refs.table.toggleRowSelection(row) //  选中当前选择
      }
      let selected = val.length && val.indexOf(row) !== -1;
      console.log(selected,row)  // true就是选中，0或者false是取消选中

      if(selected){
        this.tables.userId = row.id;
        this.tables.userName = row.nameCh
      }else{
        this.tables={}
      }


    },
    // 查询表数据
    getList() {
      this.tableLoading = true;
      allSalesList(this.queryParams).then(res => {
        this.tableLoading = false;
        if (res.code === 200) {
          this.dbTableList = res.data.list;
          this.total = res.data.total;

          this.dbTableList.forEach(el=>{
            this.hasSelectArray.forEach(el2=>{
              if(el.id==el2.userId){
                el.checked = true;
                console.log(el.checked,el)
              }else{
                
              }
            })
          })

        }
      });
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
      if(JSON.stringify(this.tables)=='{}'){
        this.$message({
          message: '请选择用户',
          type: 'warning'
        });
        return;
      }else{
        this.visible = false;
        //选择的用户
        this.$emit("ok",this.tables);
      }
    }
  }
};
</script>
<style >
  .tablessp thead tr .el-checkbox__input{
      display: none;
  }
</style>