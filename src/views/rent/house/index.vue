<template>
  <div class="app-container myhouseCon" :style= "{backgroundColor:isAddHouse?'#EFF2F5':'#fff'}">
    <!-- 房源新增container -->

    <transition >
      <div v-if="isAddHouse&&!this.$route.query.supplierId" class="addContainer">
        <Add-house :transmit-id="modifyId" @on-result-change="onResultChange"  @on-result-change2="onResultChange2"/>
      </div>
    </transition>

    <transition >
      <div v-if="isAddHouse&&this.$route.query.supplierId" class="addContainer">
        <Add-house2 :transmit-id="modifyId" @on-result-change="onResultChange"  @on-result-change2="onResultChange2"/>
      </div>
    </transition>

    <transition >
      <div v-show="!isAddHouse">
        <div>
          <!-- 房源搜索 -->
          <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="98px">
            <el-form-item label="房源编号：" prop="no">

              <el-input
                v-model="queryParams.no"
                placeholder="请输入房源编号"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>

            <el-form-item label="房源名称：" prop="houseName">
              <el-input
                v-model="queryParams.houseName"
                placeholder="请输入房源名称"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>

            <el-form-item label="所属国家：" prop="countryId">
              <el-select v-model="queryParams.countryId" size="small" placeholder="请选择国家" clearable @change="selectCountry">
                <el-option
                  v-for="item in country"
                  :key="item.id"
                  :label="item.nameZh"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属城市：" prop="cityId">
              <el-select v-model="queryParams.cityId" size="small" placeholder="请选择城市" clearable>
                <el-option
                  v-for="item in city"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

            <!-- <el-form-item label="房源类型：" prop="houseType">
              <el-select v-model="queryParams.houseType" placeholder="请选择房源类型" clearable>
                <el-option label="不限" value=""></el-option>
                <el-option label="民宿" value="2"></el-option>
                <el-option label="公寓" value="1"></el-option>
              </el-select>
            </el-form-item> -->






            <el-form-item label="房源状态：" prop="houseStatus">
              <el-select v-model="queryParams.houseStatus" placeholder="请选择房源状态" size="small" clearable>
                <el-option label="未上架" value="1"></el-option>
                <el-option label="上架中" value="2"></el-option>
                <el-option label="已下架" value="3"></el-option>
                <el-option label="已售完" value="4"></el-option>
                <el-option label="废弃" value="5"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="单间户型：">
              <el-select v-model="apartment" placeholder="请选择卫浴类型" multiple size="small" clearable>
                <el-option
                  v-for="item in type"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="卫浴类型：" >
              <el-select v-model="batroomType" placeholder="请选择卫浴类型"  size="small" clearable>
                <el-option
                  v-for="item in type2"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="时间范围：" prop="time">
              <el-date-picker
                size="small"
                value-format="yyyy-MM-dd"
                v-model="time"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
            <div>
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
              </el-form-item>
            </div>

          </el-form>
        </div>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              v-hasPermi="['rent:house:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleHouseAdd"
            >新增房源</el-button>
          </el-col>
        </el-row>
        <el-table v-loading="houseLoading" highlight-current-row
          :data="houseList"
          @row-click="clickHouseRow"
          @cell-click="handleCell"
          @cell-dblclick="dblHandleCell"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" fixed class-name="same-color"/>
          <el-table-column label="房源编号" align="center" prop="no" width="110" class-name="same-color" fixed :show-overflow-tooltip="true"/>
          <!-- <el-table-column label="城市" align="center" prop="cityId" /> -->

          <el-table-column label="负责人" align="center" prop="owner">
            <template slot-scope="scope">
              <span v-for="item in distributionData" :key="item.id">
                {{ scope.row.owner?(scope.row.owner==item.userId?item.nickName:''):'' }}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="所属国家" align="center" prop="countryId" width="100">
            <template slot-scope="scope">
              <span v-for="item in country" :key="item.id">
                {{ scope.row.countryId==item.id?item.nameZh:'' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="所属城市" align="center" prop="cityId" width="100">
            <template slot-scope="scope">
              <span v-for="item in cityData" :key="item.id">
                {{ scope.row.cityId==item.id?item.name:'' }}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="房源名称" align="center" prop="name" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div style="cursor:pointer;">{{scope.row.name}}</div>
            </template>
          </el-table-column>
          <el-table-column label="房源类型" align="center" prop="type" width="100">
            <template slot-scope="scope">
              {{ scope.row.type==1?'公寓':scope.row.type==2?'民宿':'--' }}
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" prop="status" width="100">
            <template slot-scope="scope">
              <!-- 1 未上架 2 上架中 3已下架 4已售完 5废弃 -->
              <!-- {{ scope.row.status==1?'未上架':scope.row.status==2?'上架中':scope.row.status==3?'已下架':scope.row.status==4?'已售完':'废弃' }} -->
              <span v-if="scope.row.status==1"><b style="color:#c33;">●</b>未上架</span>
              <span v-if="scope.row.status==2"><b style="color:green;">●</b>上架中</span>
              <span v-if="scope.row.status==3"><b style="color:#c33;">●</b>已下架</span>
              <span v-if="scope.row.status==4"><b style="color:#c33;">●</b>已售完</span>
              <span v-if="scope.row.status==5"><b style="color:#c33;">●</b>废弃</span>


            </template>
          </el-table-column>

          <el-table-column label="特惠" width="70" align="center" prop="orderNo">
            <template slot-scope="scope">
              <div style="width:100%;height:100%">
                <el-input v-if="scope.row.isCheckCell" v-model="scope.row.orderNo" @blur="inputBlur(scope.row)"  style="width:100%;hight:100%"></el-input>
                <span v-else>{{scope.row.orderNo}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="热门" width="70" align="center" prop="hot">
            <template slot-scope="scope">
              <div style="width:100%;height:100%">
                <el-input v-if="scope.row.isCheckCell2" v-model="scope.row.hot" @blur="inputBlur2(scope.row)"  style="width:100%;hight:100%"></el-input>
                <span v-else>{{scope.row.hot}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right" class-name="small-padding fixed-width same-color" width="300px" >
            <template slot-scope="scope">
              <el-button
                v-hasPermi="['rent:house:edit']"
                size="mini"
                type="text"
                icon="el-icon-view"
                @click.stop="viewMore(scope.row)"
              >查看</el-button>
              <el-button
                v-hasPermi="['rent:house:edit']"
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click.stop="handleUpdate(scope.row)"
              >编辑</el-button>
              <el-button
                v-hasPermi="['rent:house:edit']"
                size="mini"
                type="text"
                icon="el-icon-document-copy"
                @click.stop="houseCopy(scope.row)"
              >复制</el-button>

              <el-button
                size="mini"
                type="text"
                icon="el-icon-thumb"
                @click="handleDistribution(scope.row)"
                v-hasPermi="['rent:house:distribution']"
              >分配</el-button>


              <el-dropdown :hide-on-click="true">
                <el-button
                v-hasPermi="['rent:house:edit']"
                size="mini"
                type="text"
                icon="el-icon-s-operation">
                  状态<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="1">
                    <p @click.stop="updateHouse(scope.row,1)" style="margin:0;">上架</p>
                  </el-dropdown-item>
                  <el-dropdown-item command="2">
                    <p  @click.stop="updateHouse(scope.row,2)" style="margin:0;">下架</p>
                  </el-dropdown-item>
                  <el-dropdown-item command="3">
                    <p  @click.stop="updateHouse(scope.row,3)" style="margin:0;">废弃</p>
                  </el-dropdown-item>
                  <el-dropdown-item command="3">
                    <p  @click.stop="updateHouse(scope.row,4)" style="margin:0;">售罄</p>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>



            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="houseTotal>0"
          :total="houseTotal"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getHouse"
        />
      </div>
    </transition>

    <!-- 单间信息显示 -->
    <el-drawer
      :title="drawerTitle"
      size="960px"
      :visible.sync="roomStatus"
      :before-close="roomDrawerClose">
      <div style="padding:0 20px 20px" v-if="roomStatus">
        <Room ref="myRoom" :current-house-name="currentHouseName" :house-id="currentHouseId" :search-time="time" :apartment-type="apartment" :batroom-type-parent="batroomType" />
      </div>
    </el-drawer>

    <!-- 房源分配 -->
    <el-dialog
      title="房源分配"
      :visible.sync="distributionStatus"
      width="420px"
      >
      <div>
        <el-select v-model="distributionVlaue" placeholder="请选择" @change="selectSaleChange">
          <el-option
            v-for="item in distributionData"
            :key="item.userId"
            :label="item.nickName"
            :value="item.userId+','+item.userName">
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="distributionStatus = false">取 消</el-button>
        <el-button type="primary" @click="handleDistributionConfrim">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
import { listHouse,houseCopyMethod,houseGiveUp,housePutaway,houseSoldOut,houseSellOut,editHouseAPI,getHouseDetail } from '@/api/rent/house'
import { listCity } from '@/api/home/city'
import { listDetail } from '@/api/home/detail'
import { getUserByRole } from "@/api/user/users";
import Room from '@/components/Room'
import AddHouse from '@/components/AddHouse'
import AddHouse2 from '@/components/AddHouseSupplier'

export default {
  components: {
    Room, AddHouse, AddHouse2
  },
  data() {
    return {
      distributionStatus:false,
      distributionData:[],
      distributionVlaue:'',
      handleDistributionId:'',

      modifyId: undefined,
      isAddHouse: false, // 是否新增房源

      houseLoading: false,
      houseList: [], // 所有房源信息
      // 设置查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        cityId:undefined,

      },
      // 房源数据 总条数
      houseTotal: 0,
      // 单间
      currentHouseId: undefined,
      currentHouseName:'',
      drawerTitle: '',
      roomStatus: false,
      cityData: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
      type:[],type2:[],
      apartment:[],
      batroomType:'',
      time:'',
      country:[],city:[],
    }
  },
  created() {
    if(this.$route.query.no){
      this.queryParams.no = this.$route.query.no
    }


    this.getHouse()
    this.getCanUsers();//获取分配房源的用户
    const cityRes = JSON.parse(localStorage.getItem('YIHOME_city'))
    this.cityData = cityRes



    const countryRes = JSON.parse(localStorage.getItem('YIHOME_country'))

    this.handleDataCountry(countryRes, cityRes, 'id', 'countryId')
    this.country = countryRes




    if(!cityRes){
      listCity().then(Res => {
        this.cityData = Res.rows
      })
    }


    listDetail({ labelId: 17 }).then(response => {

      this.type = response.rows;
    })
    listDetail({ labelId: 16 }).then(response => {

      this.type2 = response.rows;
    })

    if(this.$route.query.supplierId){
      this.modifyId = undefined
      this.isAddHouse = true
    }

    if(this.$route.query.houseName){
      this.queryParams.houseName = this.$route.query.houseName
    }


  },
  methods: {
    selectCountry(value) {
      for (let i = 0; i < this.country.length; i++) {
        if (value === this.country[i].id) {
          this.city = this.country[i].children
          this.$refs['queryForm'].fields[3].resetField()
        }
      }
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
    handleQuery() {
      this.$router.push({ path: "/rent/house"});
      this.queryParams.pageNum = 1
      //
      let labelDto=[];
      /*let a = {
        "labels":this.apartment,
        //"lableId": 17
      }
      //卫浴类型
      let b ={
        "labels":[this.batroomType],//目前是单选
        //"lableId": 16
      }

      if(this.apartment.length!=0){
        labelDto.push(a)
      }

      if(this.batroomType){
        labelDto.push(b)
      }**/

      //前端不区分 单间户型和卫浴类型

      // let objType = {
      //   "labels":
      // }

      let pushData = [];
      if(this.batroomType){
        pushData.push(this.batroomType)
      }
      if(this.apartment.length!=0){
        pushData = pushData.concat(this.apartment)
      }
      if(pushData.length!=0){
        labelDto.push({"labels":pushData})
      }


      console.log(this.time)

      let roomDto;

      if(this.time){
        roomDto = {
          "roomOnhireEnd": this.time[1]?this.time[1]:undefined,
          "roomOnhireStart": this.time[0]?this.time[0]:undefined,
        }
      }else{
        roomDto={}
      }


      if(labelDto.length!=0){
        roomDto.labelDto = labelDto
      }
      if(JSON.stringify(roomDto) == "{}"){
        this.queryParams.roomDto = roomDto;
      }else{
        this.queryParams.roomDto = roomDto;
      }


      console.log(this.queryParams)
      this.getHouse()

    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.time = []
      this.apartment = []
      this.batroomType = undefined
      this.queryParams={}
      this.handleQuery()
      this.$router.push({ path: "/rent/house"});
    },

    // 获取房源信息
    getHouse() {
      this.houseLoading = true
      listHouse(this.queryParams).then(response => {
        this.houseLoading = false
        if(response.code===200){
          if(response.data.list){
            response.data.list.forEach((item)=>{
              item.isCheckCell = false;
              item.isCheckCell2 = false;
            })
            this.houseList = response.data.list
            this.houseTotal = response.data.total
            // this.houseLoading = false
          }else{
            this.houseList = response.data
            //this.houseTotal = response.data.total
          }
        }
      }).catch(e=>{
        this.houseLoading = false
      })
    },
    handleSelectionChange() {

    },
    /* 新增房源 */
    handleHouseAdd() {
      this.$router.push({path:'/rent/house'})
      this.modifyId = undefined
      this.isAddHouse = true
    },
    // 获取子组件响应信息
    onResultChange(val) {
      this.isAddHouse = val
      if(!this.isAddHouse){
        this.getHouse();
      }
    },
    onResultChange2(val) {
      console.log(val)
      this.isAddHouse = val.status
      if(!this.isAddHouse){
        this.getHouse();

        this.roomStatus = true
        this.drawerTitle = '房源详情/ '+val.data.name
        this.currentHouseId = val.data.id

      }
    },
    // 点击当前房源
    clickHouseRow(row, column, event) {

    },
    roomDrawerClose(done) {
      this.$refs.myRoom.time = []
      this.$refs.myRoom.apartment = []
      this.$refs.myRoom.batroomType = undefined
      this.$refs.myRoom.queryParams={}
      done()
      // this.$confirm('确认关闭当前浮层？', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   console.log(this.$refs.myRoom)
      //   this.$refs.myRoom.time = []
      //   this.$refs.myRoom.apartment = []
      //   this.$refs.myRoom.batroomType = undefined
      //   this.$refs.myRoom.queryParams={}

      //   done()
      // }).catch(() => {

      // });
    },
    // 修改房源
    handleUpdate(row) {
      // window.scrollTo(0, 0)
      // console.log(row)
      // this.isAddHouse = true
      // this.modifyId = row.id
      this.houseLoading = true;
      getHouseDetail(row.id).then(res =>{
        this.houseLoading = false;
        if(res.code===200){
          this.isAddHouse = true
          this.modifyId = row.id
        }else{
          this.msgError(res.msg)
        }
      }).catch(e=>{
        this.houseLoading = false;
        this.msgError('网络错误')
      })
    },
    houseCopy(row){
      console.log(row)
      this.$confirm('是否复制当前房源名称为<strong>'+row.name +'</strong>的房源?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }).then(() => {
        houseCopyMethod(row.id).then(res=>{
          if(res.code===200){
            this.$message({
              type: 'success',
              message: '复制成功'
            });
            this.getHouse()
          }else{
            this.$message({
              type: 'error',
              message: '复制失败！'
            });
          }
        })

      }).catch(() => {

      });
    },
    updateHouse(row,data){
      if(data==1){
        housePutaway({id:row.id}).then(res=>{
          if(res.code===200){
            this.$message({
              type: 'success',
              message: '修改成功'
            });
            this.getHouse()
          }
        })
      }else if(data==2){
        houseSoldOut({id:row.id}).then(res=>{
          if(res.code===200){
            this.$message({
              type: 'success',
              message: '修改成功'
            });
            this.getHouse()
          }
        })
      }else if(data==3){
        houseGiveUp({id:row.id}).then(res=>{
          if(res.code===200){
            this.$message({
              type: 'success',
              message: '修改成功'
            });
            this.getHouse()
          }
        })
      }else{
        houseSellOut({id:row.id}).then(res=>{
          if(res.code===200){
            this.$message({
              type: 'success',
              message: '修改成功'
            });
            this.getHouse()
          }
        })
      }
    },
    handleCell(row,column,event,cell){
      console.log(row,111111)
      if(column.label=="操作"||column.label=="热门"||column.label=="特惠"){
        return;
      }
      this.roomStatus = true
      this.drawerTitle = '当前房源 / ' + row.name
      this.currentHouseId = row.id;
      this.currentHouseName = row.name;
    },
    viewMore(row){
      this.roomStatus = true
      this.drawerTitle = '当前房源 / ' + row.name
      this.currentHouseId = row.id;
      this.currentHouseName = row.name;
    },
    dblHandleCell(row, column, cell, event){
      if(column.label=="热门"){
        row.isCheckCell2 =!row.isCheckCell2
      }
      if(column.label=="特惠"){
        row.isCheckCell =!row.isCheckCell
      }
    },
    inputBlur(row){
      row.isCheckCell =!row.isCheckCell;
      editHouseAPI(row).then(res => {
        console.log(res,9090908)
        if(res.code===200){
          this.getHouse()
          this.$message({
            message: '操作成功！',
            type: 'success'
          });
        }
      })
    },
    inputBlur2(row){
      row.isCheckCell2 =!row.isCheckCell2;
      editHouseAPI(row).then(res => {
        console.log(res,9090908)
        if(res.code===200){
          this.getHouse()
          this.$message({
            message: '操作成功！',
            type: 'success'
          });
        }
      })
    },
    //获取可分配的人员数据
    getCanUsers(){
      getUserByRole('110,111').then(res=>{
        if(res.code===200){
          this.distributionData = res.data;
        }else{
          this.msgError(res.msg);
          this.msgError('获取数据失败，暂不可分配房源');
        }
      }).catch(e=>{
        this.msgError('获取数据失败，暂不可分配房源');
      })
    },
    handleDistribution(row){
      this.distributionVlaue = ''
      this.handleDistributionId = row.id;
      this.distributionStatus = true;
    },
    handleDistributionConfrim(){
      editHouseAPI({
        id:this.handleDistributionId,
        owner:parseInt(this.distributionVlaue.split(',')[0]),
        // ownerName:this.distributionVlaue.split(',')[1]
      }).then(res=>{
        if(res.code===200){
          this.distributionStatus = false;
          this.getHouse()
          this.$message({
            message: '分配成功',
            type: 'success'
          });
        }else{
          this.msgError('分配失败');
        }
      }).catch(e=>{
        this.msgError('分配失败');
      })
    },
    selectSaleChange(val){
      console.log(this.distributionVlaue.split(',')[0],this.distributionVlaue.split(',')[1])
    }
  }
}
</script>

<style scoped="scoped">
  .addContainer{
    /* padding: 24px;
    background-color: #fff; */
  }
</style>
<style>
.myhouseCon .el-table td{

}
</style>
