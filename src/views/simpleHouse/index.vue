<template>
  <div class="app-container myhouseCon" :style= "{backgroundColor:isAddHouse?'#EFF2F5':'#fff'}">
    
    <transition >
      <div v-show="!isAddHouse">
        <div>
          <!-- 房源搜索 -->
          <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="98px">
            
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

            
            
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
            
            
          </el-form>
        </div>
        
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleHouseAddTwo"
            >新增</el-button>
          </el-col>
        </el-row>
        <el-table v-loading="houseLoading" highlight-current-row 
          :data="houseList" class="simpleHouseTable"> 
          <el-table-column type="selection" width="55" align="center" fixed class-name="same-color"/>
          
          <el-table-column label="房源名称" align="center" prop="name" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div v-if="!scope.row.isNewEdit">
                {{scope.row.name}}
              </div>
              <div v-else>
                <el-input v-model.trim="scope.row.name" placeholder="请输入房源名称" style="width:100%;hight:100%"></el-input>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="所属国家" align="center" prop="countryId">
            <template slot-scope="scope">

              <div v-if="!scope.row.isNewEdit">
                <span v-for="item in country" :key="item.id">
                  {{ scope.row.countryId==item.id?item.nameZh:'' }}
                </span>
              </div>
              
              <div v-else>
                <el-select v-model="scope.row.countryId" placeholder="请选择国家" @change="selectCountryTwo(scope.row,$event)">
                  <el-option
                    v-for="item in countryTwo"
                    :key="item.id"
                    :label="item.nameZh"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
              


              
            </template>
          </el-table-column>
          <el-table-column label="所属城市" align="center" prop="cityId">
            <template slot-scope="scope">
              

              <div v-show="!scope.row.isNewEdit">
                <span v-for="item in cityData" :key="item.id">
                  {{ scope.row.cityId==item.id?item.name:'' }}
                </span>
              </div>
              
              <div v-show="scope.row.isNewEdit">
                
                <el-select v-model="scope.row.cityId" placeholder="请选择城市" @change="selectCityTwo(scope.row,$event)">
                  <el-option
                    v-for="item in cityTwo"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>



            </template>
          </el-table-column>

          

          <el-table-column label="地址" align="center" prop="address" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div v-if="!scope.row.isNewEdit">
                {{scope.row.address}}
              </div>
              <div v-else>
                <el-input v-model.trim="scope.row.address" placeholder="请输入房源地址" style="width:100%;hight:100%"></el-input>
              </div>
            </template>
          </el-table-column>


          <el-table-column label="公寓介绍" align="center" prop="description" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div v-if="!scope.row.isNewEdit">
                {{scope.row.description}}
              </div>
              <div v-else>
                <el-input v-model.trim="scope.row.description" placeholder="请输入公寓介绍" style="width:100%;hight:100%"></el-input>
              </div>
            </template>
          </el-table-column>


          <el-table-column label="公寓退订政策" align="center" prop="specialPolicy" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div v-if="!scope.row.isNewEdit">
                {{scope.row.specialPolicy}}
              </div>
              <div v-else>
                <el-input v-model.trim="scope.row.specialPolicy" placeholder="请输入公寓退订政策" style="width:100%;hight:100%"></el-input>
              </div>
            </template>
          </el-table-column>
          
          
          <el-table-column label="操作" align="center"  style="background-color:#c33;" class-name="small-padding fixed-width">
            <template slot-scope="scope">

              
              <!-- <el-popover
                placement="top"
                width="160"
                
                >
                <p>这是一段内容这是一段内容确定删除吗？</p>
                <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="scope.row.handelStatus = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="scope.row.handelStatus = false">确定</el-button>
                </div>
                <el-button slot="reference" type="text" >编辑</el-button>
              </el-popover> -->

              <span v-if="scope.row.isNewEdit">
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-folder-add"
                  @click.stop="saveData(scope.row)"
                >保存</el-button>


                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-folder-delete"
                  @click.stop="cancelData(scope.row)"
                >取消</el-button>

              </span>
              
              <span v-else>
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                  @click.stop="handleUpdate(scope.row)"
                >编辑</el-button>

                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-view"
                  @click.stop="gohouse(scope.row)"
                >去完善</el-button>


              </span>
              

              

              
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

    


  </div>
</template>

<script>
import { listHouse,insertSimpleHouse } from '@/api/rent/house'
import { listCity } from '@/api/home/city'
import { listDetail } from '@/api/home/detail'

export default {
  
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
      
      type:[],type2:[],
      apartment:[],
      batroomType:'',
      time:'',
      country:[],city:[],
      countryTwo:[],
      cityTwo:[],
    }
  },
  created() {
    // if(this.$route.query.no){
    //   this.queryParams.no = this.$route.query.no
    // }


    this.getHouse()
    // this.getCanUsers();//获取分配房源的用户
    const cityRes = JSON.parse(localStorage.getItem('YIHOME_city'))
    this.cityData = cityRes



    const countryRes = JSON.parse(localStorage.getItem('YIHOME_country'))
    
    this.handleDataCountry(countryRes, cityRes, 'id', 'countryId')
    this.country = countryRes;

    this.countryTwo = countryRes;






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

    // if(this.$route.query.supplierId){
    //   this.modifyId = undefined
    //   this.isAddHouse = true
    // }

    // if(this.$route.query.houseName){
    //   this.queryParams.houseName = this.$route.query.houseName
    // }


  },
  methods: {
    selectCountry(value) {
      for (let i = 0; i < this.country.length; i++) {
        if (value === this.country[i].id) {
          this.city = this.country[i].children
          this.$refs['queryForm'].fields[2].resetField()
          console.log(this.$refs['queryForm'])
        }
      }
    },
    selectCountryTwo(row,value2) {
      console.log(row,value2)
      for (let i = 0; i < this.countryTwo.length; i++) {
        if (value2 === this.countryTwo[i].id) {
          
          this.cityTwo = this.countryTwo[i].children;
          
          row.cityId = undefined;
          
        }
      }
    },
    selectCityTwo(row,val){
      //this.$set(row,'cityId',val)    
      
      console.log(row)
      
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
      
      this.queryParams.pageNum = 1
      
      this.getHouse()

    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.queryParams={}
      this.handleQuery()
    },

    // 获取房源信息
    getHouse() {
      this.houseLoading = true
      listHouse(this.queryParams).then(response => {
        this.houseLoading = false
        if(response.code===200){
          if(response.data.list){
            response.data.list.forEach((item)=>{
              item.handelStatus = false;
              item.isNewEdit = false;
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
    handleHouseAddTwo(){
      for(let i = 0;i<this.houseList.length; i++){
        if(this.houseList[i].isNewEdit){

          this.$message({message: '系统中存在未保存的数据，请保存后操作',type: 'warning'});

          return
        }
      }
        
        //this.houseList
        this.houseList.unshift({isNewEdit:true,cityId:undefined})
        // insertSimpleHouse().then(res=>{

        // }).catch(e=>{

        // })
    },
    cancelData(row){
      row.isNewEdit = false;
      this.getHouse()
    },
    handleUpdate(row){
      console.log(row)


      for(let i = 0;i<this.houseList.length; i++){
        if(this.houseList[i].isNewEdit){

          this.$message({message: '系统中存在未保存的数据，请保存后操作',type: 'warning'});

          return
        }
      }

      // this.houseList.forEach(res=>{
      //   //res.isNewEdit = false;
      //   if(res.isNewEdit){
      //     alert(111)
      //     return false;
      //   }
      // })

      row.isNewEdit = true;
      for (let i = 0; i < this.countryTwo.length; i++) {
        if (row.countryId === this.countryTwo[i].id) {
          this.cityTwo = this.countryTwo[i].children
        }
      }

    },
    saveData(row){
      console.log(row)
      if(!row.name){
        this.$message({
          message: '请输入房源名称',
          type: 'warning'
        });
        return;
      };
      if(!row.countryId){
        this.$message({
          message: '请选择所属国家',
          type: 'warning'
        });
        return;
      };
      if(!row.cityId){
        this.$message({
          message: '请选择所属城市',
          type: 'warning'
        });
        return;
      };

      if(!row.address){
        this.$message({
          message: '请输入房源地址',
          type: 'warning'
        });
        return;
      };
      


      const loading = this.$loading({
        lock: true,
        text: '拼命加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      insertSimpleHouse(row).then(res=>{
        loading.close();
        if(res.code===200){
          this.getHouse()
        }else{
          this.msgError('保存失败')
        }
      }).catch(e=>{
        loading.close();
      })
    },
    gohouse(row){
      console.log(row)
      this.$router.push({path:'/rent/house',query: { houseName: row.name }})
    }
    
  }
    
    
}
</script>
<style>
.simpleHouseTable td{
    padding: 5px 0;
}
</style>
