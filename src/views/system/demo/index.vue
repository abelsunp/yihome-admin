<template>
  <section class="app-container">
    <el-table
      :data="tableData"
      @expand-change="expandChange"
      empty-text="暂无数据"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table :data="scope.row.children" empty-text="暂无城市数据">

            <el-table-column type="expand">
              <template slot-scope="scope2">
                <el-table :data="scope2.row.children" empty-text="暂无学校数据">
                  <el-table-column prop="name" label="学校名称" />
                  <el-table-column prop="nameEn" label="学校英文名称" />
                  <el-table-column prop="address" label="详细地址" />
                  <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                     {{scope.row.status==1?'上架':'下架'}}
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                      <el-button
                        v-hasPermi="['home:school:edit']"
                        size="mini"
                        type="text"
                        icon="el-icon-edit"
                        @click="handleUpdate(scope.row)"
                      >修改</el-button>
                      <el-button
                        v-hasPermi="['system:dept:add']"
                        size="mini"
                        type="text"
                        icon="el-icon-plus"
                        @click="handleAdd(scope.row)"
                      >新增</el-button>
                      <el-button
                        v-hasPermi="['home:school:remove']"
                        size="mini"
                        type="text"
                        icon="el-icon-delete"
                        @click="handleDelete(scope.row)"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>

            <el-table-column prop="name" label="城市名称" />
            <el-table-column prop="nameEn" label="城市英文名称" />
            <el-table-column prop="countryName" label="所属国家名称" />
            <el-table-column prop="orderNo" label="展示排序" />
            <el-table-column prop="hot" label="热门排序" />
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
               {{scope.row.status==1?'上架':'下架'}}
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button
                  v-hasPermi="['home:school:edit']"
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                  @click="handleUpdate(scope.row)"
                >修改</el-button>
                <el-button
                  v-hasPermi="['system:dept:add']"
                  size="mini"
                  type="text"
                  icon="el-icon-plus"
                  @click="handleAdd(scope.row)"
                >新增</el-button>
                <el-button
                  v-hasPermi="['home:school:remove']"
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>

          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        prop="shortName"
        label="英文简称"
      />
      <el-table-column
        prop="nameZh"
        label="中文名称"
      />
      <el-table-column
        prop="nameEn"
        label="英文名称"
      />
      <el-table-column
        prop="currencyType"
        label="货币简称"
      />
      <el-table-column
        prop="currencySymbol"
        label="货币符号"
      />
      <el-table-column
        prop="exchange"
        label="汇率"
      />
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
         {{scope.row.status==1?'上架':'下架'}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['home:school:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-hasPermi="['system:dept:add']"
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
          >新增</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import { listCountry } from '@/api/home/country'
import { listCity } from '@/api/home/city'
import { listSchool } from '@/api/home/school'
export default {
  name: 'Demo',
  data() {
    return {
      tableData: [],

      countryData: [],
      cityData: [],
      schoolData: []
    }
  },
  created() {
    listCountry().then(countryRes => {
      this.countryData = countryRes.rows
      listCity().then(cityRes => {
        this.cityData = cityRes.rows
        listSchool().then(schoolRes => {
          this.schoolData = schoolRes.rows
          this.handleData(this.countryData, this.cityData, 'id', 'countryId')
          this.handleData(this.cityData, this.schoolData, 'id', 'cityId')
          this.tableData = this.countryData
        })
      })
    })
  },
  methods: {
    expandChange() {

    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleData(arr1, arr2, typy1, type2) {
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
    }

  }
}
</script>

<style>
</style>
