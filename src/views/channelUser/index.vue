<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="姓名" prop="nameCh">
        <el-input
          v-model="queryParams.nameCh"
          placeholder="姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="英文名称 护照" prop="nameEn">
        <el-input
          v-model="queryParams.nameEn"
          placeholder="请输入英文名称 护照"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="客户来源" prop="channelId">
        <el-select v-model="queryParams.channelId" placeholder="请选择客户来源" clearable size="small">
          <el-option
            v-for="item in channelData"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户级别" prop="level">
        <el-select v-model="queryParams.level" placeholder="请选择客户级别" clearable size="small">
          <el-option
            v-for="item in userStatusDataChilderLevel"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="微信" prop="weChat">
        <el-input
          v-model="queryParams.weChat"
          placeholder="请输入微信"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="意向国家" prop="intentionCountry">
        <el-select v-model="queryParams.intentionCountry" placeholder="请选择意向国家" clearable size="small" @change="selectCountry">
          <el-option
            v-for="item in countryData"
            :key="item.id"
            :label="item.nameZh"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="意向城市" prop="intentionCity">

        <el-select v-model="queryParams.intentionCity" placeholder="请选择意向城市" clearable size="small">
          <el-option
            v-for="item in cityData"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        
      </el-form-item>
      <!-- <el-form-item label="意向学校" prop="intentionSchool">
        <el-input
          v-model="queryParams.intentionSchool"
          placeholder="请输入意向学校"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="国内联系电话" prop="personphone">
        <el-input
          v-model="queryParams.personphone"
          placeholder="请输入国内联系电话"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入手机号码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="queryParams.sex" placeholder="请选择性别" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="生日" prop="birthday">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.birthday"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择生日">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="国籍" prop="nationality">
        <el-input
          v-model="queryParams.nationality"
          placeholder="请输入国籍"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="护照" prop="passport">
        <el-input
          v-model="queryParams.passport"
          placeholder="请输入护照"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="学号" prop="studentNo">
        <el-input
          v-model="queryParams.studentNo"
          placeholder="请输入学号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="就读年级" prop="grade">
        <el-select v-model="queryParams.grade" placeholder="请选择就读年级" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="学年制" prop="gradeyear">
        <el-input
          v-model="queryParams.gradeyear"
          placeholder="请输入学年制"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="常用邮箱" prop="uemail">
        <el-input
          v-model="queryParams.uemail"
          placeholder="请输入常用邮箱"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="就读专业 中文" prop="disciplinech">
        <el-input
          v-model="queryParams.disciplinech"
          placeholder="请输入就读专业 中文"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="就读专业 英文" prop="disciplineen">
        <el-input
          v-model="queryParams.disciplineen"
          placeholder="请输入就读专业 英文"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否全日制" prop="allday">
        <el-select v-model="queryParams.allday" placeholder="请选择是否全日制" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="校区英文" prop="campus">
        <el-input
          v-model="queryParams.campus"
          placeholder="请输入校区英文"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="留学城市现居地邮编" prop="zipcode">
        <el-input
          v-model="queryParams.zipcode"
          placeholder="请输入留学城市现居地邮编"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="就读课程" prop="course">
        <el-input
          v-model="queryParams.course"
          placeholder="请输入就读课程"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="留学城市现居地" prop="address">
        <el-input
          v-model="queryParams.address"
          placeholder="请输入留学城市现居地"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="留学学校 英文" prop="abroadschoolen">
        <el-input
          v-model="queryParams.abroadschoolen"
          placeholder="请输入留学学校 英文"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="留学学校 中文" prop="abroadschoolch">
        <el-input
          v-model="queryParams.abroadschoolch"
          placeholder="请输入留学学校 中文"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="国内城市现居地邮编" prop="izipcode">
        <el-input
          v-model="queryParams.izipcode"
          placeholder="请输入国内城市现居地邮编"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="国内固定地址中文" prop="addressich">
        <el-input
          v-model="queryParams.addressich"
          placeholder="请输入国内固定地址中文"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="国内固定地址英文" prop="addressien">
        <el-input
          v-model="queryParams.addressien"
          placeholder="请输入国内固定地址英文"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="销售id" prop="owner">
        <el-input
          v-model="queryParams.owner"
          placeholder="请输入销售id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="客户状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="small">
          <el-option
            v-for="item in userStatusDataChilder"
            :key="item.id"
            :label="item.name"
            :value="item.id">
            <span>{{item.name}}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['user:channeluser:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['user:channeluser:edit']"
        >修改</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['user:users:remove']"
        >删除</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['user:users:export']"
        >导出</el-button>
      </el-col> -->
    </el-row>

    <el-table v-loading="loading" :data="usersList" @selection-change="handleSelectionChange" @cell-click="cellClick">
      <el-table-column type="selection" width="55" align="center" class-name="same-color" fixed />
      <!-- <el-table-column label="id" align="center" prop="id" fixed /> -->
      <el-table-column label="姓名" align="center" prop="nameCh" class-name="same-color" fixed :show-overflow-tooltip="true"/>
      <!-- <el-table-column label="英文名称 护照" align="center" prop="nameEn" /> -->
      <!-- <el-table-column label="owner" align="center" prop="owner" fixed /> -->

      <el-table-column label="客户来源" align="center" prop="channelId" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span v-for="item in channelData" :key="item.id">
            {{ scope.row.channelId==item.id?item.name:'' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="客户级别" align="center" prop="level" >
         <template slot-scope="scope">
          <span v-for="item in userStatusDataChilderLevel" :key="item.id">
            {{item.id==scope.row.level?item.name:''}}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="客户状态" align="center" prop="status" >
        <template slot-scope="scope">
          <span v-for="item in userStatusDataChilder" :key="item.id">
            {{item.id==scope.row.status?item.name:''}}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" align="center" prop="phone" :show-overflow-tooltip="true"/>
      <el-table-column label="微信" align="center" prop="weChat" :show-overflow-tooltip="true"/>
      <el-table-column label="意向国家" align="center" prop="intentionCountry">
        <template slot-scope="scope">
          <span v-for="item in countryData" :key="item.id">
            {{ scope.row.intentionCountry==item.id?item.nameZh:'' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="意向城市" align="center" prop="intentionCity">
        <template slot-scope="scope">
          <span v-for="item in cityData" :key="item.id">
            {{ scope.row.intentionCity==item.id?item.name:'' }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="意向学校" align="center" prop="intentionSchool">
        <template slot-scope="scope">
          <span v-for="item in schoolData" :key="item.id">
            {{ scope.row.intentionSchool==item.id?item.name:'' }}
          </span>
        </template>
      </el-table-column>

      <!--  <el-table-column label="手机号码" align="center" prop="phone" />
      <el-table-column label="性别" align="center" prop="sex" />
      <el-table-column label="生日" align="center" prop="birthday" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.birthday) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="国籍" align="center" prop="nationality" />
      <el-table-column label="护照" align="center" prop="passport" />
      <el-table-column label="学号" align="center" prop="studentNo" />
      <el-table-column label="就读年级" align="center" prop="grade" />
      <el-table-column label="学年制" align="center" prop="gradeyear" />
      <el-table-column label="常用邮箱" align="center" prop="uemail" />
      <el-table-column label="就读专业 中文" align="center" prop="disciplinech" />
      <el-table-column label="就读专业 英文" align="center" prop="disciplineen" />
      <el-table-column label="是否全日制" align="center" prop="allday" />
      <el-table-column label="校区英文" align="center" prop="campus" />
      <el-table-column label="留学城市现居地邮编" align="center" prop="zipcode" />
      <el-table-column label="就读课程" align="center" prop="course" />
      <el-table-column label="留学城市现居地" align="center" prop="address" />
      <el-table-column label="留学学校 英文" align="center" prop="abroadschoolen" />
      <el-table-column label="留学学校 中文" align="center" prop="abroadschoolch" />
      <el-table-column label="国内城市现居地邮编" align="center" prop="izipcode" />
      <el-table-column label="国内固定地址中文" align="center" prop="addressich" />
      <el-table-column label="国内固定地址英文" align="center" prop="addressien" />
      <el-table-column label="销售id" align="center" prop="owner" /> -->
      <!-- <el-table-column label="备注" align="center" prop="remark" width="150px">
        <template slot-scope="scope">
          <div class="remarkWrapper">
            <el-tooltip popper-class="userRemarkWrapper" effect="dark" :content="scope.row.remark" placement="top">
              <span>{{scope.row.remark}}</span>
            </el-tooltip>
          </div>
        </template>
      </el-table-column> -->
      
      <el-table-column label="最后更新时间" align="center" prop="updateTime" :show-overflow-tooltip="true"/>
      <el-table-column label="操作" align="center"  class-name="small-padding fixed-width same-color" fixed="right" width="110">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
             v-hasPermi="['user:channeluser:edit']"
          >修改</el-button>
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['user:users:remove']"
          >删除</el-button> -->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-thumb"
            @click="handleDistribution(scope.row)"
            v-hasPermi="['user:channeluser:distribution']"
          >分配</el-button>
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

    <!-- 添加或修改用户对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="中文名称" prop="nameCh">
          <el-input v-model="form.nameCh" placeholder="请输入中文名称" />
        </el-form-item>
        <el-form-item label="英文名称 护照" prop="nameEn">
          <el-input v-model="form.nameEn" placeholder="请输入英文名称 护照" />
        </el-form-item>
        <el-form-item label="渠道id">
          <el-select v-model="form.channelId" placeholder="请选择渠道id">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="客户级别">
          <el-select v-model="form.level" placeholder="请选择客户级别">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="微信" prop="weChat">
          <el-input v-model="form.weChat" placeholder="请输入微信" />
        </el-form-item>
        <el-form-item label="意向国家" prop="intentionCountry">
          <el-input v-model="form.intentionCountry" placeholder="请输入意向国家" />
        </el-form-item>
        <el-form-item label="意向城市" prop="intentionCity">
          <el-input v-model="form.intentionCity" placeholder="请输入意向城市" />
        </el-form-item>
        <el-form-item label="意向学校" prop="intentionSchool">
          <el-input v-model="form.intentionSchool" placeholder="请输入意向学校" />
        </el-form-item>
        <el-form-item label="国内联系电话" prop="personphone">
          <el-input v-model="form.personphone" placeholder="请输入国内联系电话" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.birthday"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择生日">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="国籍" prop="nationality">
          <el-input v-model="form.nationality" placeholder="请输入国籍" />
        </el-form-item>
        <el-form-item label="护照" prop="passport">
          <el-input v-model="form.passport" placeholder="请输入护照" />
        </el-form-item>
        <el-form-item label="学号" prop="studentNo">
          <el-input v-model="form.studentNo" placeholder="请输入学号" />
        </el-form-item>
        <el-form-item label="就读年级">
          <el-select v-model="form.grade" placeholder="请选择就读年级">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="学年制" prop="gradeyear">
          <el-input v-model="form.gradeyear" placeholder="请输入学年制" />
        </el-form-item>
        <el-form-item label="常用邮箱" prop="uemail">
          <el-input v-model="form.uemail" placeholder="请输入常用邮箱" />
        </el-form-item>
        <el-form-item label="就读专业 中文" prop="disciplinech">
          <el-input v-model="form.disciplinech" placeholder="请输入就读专业 中文" />
        </el-form-item>
        <el-form-item label="就读专业 英文" prop="disciplineen">
          <el-input v-model="form.disciplineen" placeholder="请输入就读专业 英文" />
        </el-form-item>
        <el-form-item label="是否全日制">
          <el-select v-model="form.allday" placeholder="请选择是否全日制">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="校区英文" prop="campus">
          <el-input v-model="form.campus" placeholder="请输入校区英文" />
        </el-form-item>
        <el-form-item label="留学城市现居地邮编" prop="zipcode">
          <el-input v-model="form.zipcode" placeholder="请输入留学城市现居地邮编" />
        </el-form-item>
        <el-form-item label="就读课程" prop="course">
          <el-input v-model="form.course" placeholder="请输入就读课程" />
        </el-form-item>
        <el-form-item label="留学城市现居地" prop="address">
          <el-input v-model="form.address" placeholder="请输入留学城市现居地" />
        </el-form-item>
        <el-form-item label="留学学校 英文" prop="abroadschoolen">
          <el-input v-model="form.abroadschoolen" placeholder="请输入留学学校 英文" />
        </el-form-item>
        <el-form-item label="留学学校 中文" prop="abroadschoolch">
          <el-input v-model="form.abroadschoolch" placeholder="请输入留学学校 中文" />
        </el-form-item>
        <el-form-item label="国内城市现居地邮编" prop="izipcode">
          <el-input v-model="form.izipcode" placeholder="请输入国内城市现居地邮编" />
        </el-form-item>
        <el-form-item label="国内固定地址中文" prop="addressich">
          <el-input v-model="form.addressich" placeholder="请输入国内固定地址中文" />
        </el-form-item>
        <el-form-item label="国内固定地址英文" prop="addressien">
          <el-input v-model="form.addressien" placeholder="请输入国内固定地址英文" />
        </el-form-item>
        <el-form-item label="销售id" prop="owner">
          <el-input v-model="form.owner" placeholder="请输入销售id" />
        </el-form-item>
        <el-form-item label="状态 1意向客户 2成交客户">
          <el-select v-model="form.status" placeholder="请选择状态 1意向客户 2成交客户">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 新增 修改用户信息 -->
    <el-drawer
      :title="drawerTitle"
      :visible.sync="addUserDrawer"
      custom-class="addUserWrapper"
      direction="ttb">
      <div class="user-wrapper" v-if="addUserDrawer">
        <div class="user-container">
          <Add-user @changeStatus="updata"  :user-data="currentData" user-owner="channel"/>
        </div>
      </div>
    </el-drawer>


    <!-- 用户跟进记录 -->
    <el-drawer
      :title="recordTitle"
      size="800px"
      :visible.sync="recordStatus"
      custom-class="recordWrapper">
      <div v-if="recordStatus">
        <follow-record :user-data="currentRowData" :channel-data="channelData" :level-data="userStatusDataChilderLevel"/>
      </div>
    </el-drawer>

    <!-- 用户分配 -->
    <el-dialog
      title="分配用户"
      :visible.sync="distributionStatus"
      width="420px"
      >
      <div>
        <el-select v-model="distributionVlaue" placeholder="请选择" @change="selectSaleChange">
          <el-option
            v-for="item in distributionData"
            :key="item.userId"
            :label="item.nickName"
            :value="item.userId">
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
import { listUsers, getUsers,userAllocation,getUserByRole,allChannelList } from "@/api/user/users";
import { listChannel } from "@/api/user/channel";
import { listSchool } from "@/api/home/school";
import AddUser from "@/components/AddUser"
import FollowRecord from "@/components/channelFollowRecord"

import { listUser } from "@/api/system/user";
export default {
  name: "Users",
  components:{
    AddUser,
    FollowRecord
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 用户表格数据
      usersList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        nameCh: undefined,
        nameEn: undefined,
        channelId: undefined,
        level: undefined,
        weChat: undefined,
        intentionCountry: undefined,
        intentionCity: undefined,
        intentionSchool: undefined,
        personphone: undefined,
        phone: undefined,
        sex: undefined,
        birthday: undefined,
        nationality: undefined,
        passport: undefined,
        studentNo: undefined,
        grade: undefined,
        gradeyear: undefined,
        uemail: undefined,
        disciplinech: undefined,
        disciplineen: undefined,
        allday: undefined,
        campus: undefined,
        zipcode: undefined,
        course: undefined,
        address: undefined,
        abroadschoolen: undefined,
        abroadschoolch: undefined,
        izipcode: undefined,
        addressich: undefined,
        addressien: undefined,
        owner: undefined,
        status: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "修改时间不能为空", trigger: "blur" }
        ]
      },
      countryData:[],
      cityData: [],
      schoolData:[],
      channelData:[],
      //添加用户 模态框
      addUserDrawer:false,
      drawerTitle:'',
      currentData:undefined,
      //跟进记录
      recordTitle:'',
      recordStatus:false,
      //打开跟进记录传递
      currentRowData:undefined,
      userStatusData:[],
      userStatusDataChilder:[],
      userStatusDataChilderLevel:[],
      distributionStatus:false,
      distributionData:[],
      distributionVlaue:'',

      
      //当前销售id 
      currentSaleId:'',
      currentSaleName:'',
      currentUserId:''


    };
  },
  watch:{
    'recordStatus': function(newValue, oldValue) {
      if(!newValue){
        this.getList();
      }
    }
  },
  created() {
    this.getList();
    this.getCountry();
    this.getChannel();

    this.getUserType()
  },
  methods: {
    getUserType(){
      const userType = JSON.parse(localStorage.getItem('YIHOME_user_type'))
      userType.forEach(el=>{
        if(el.parentId==6){
          this.userStatusDataChilder.push(el)
        }
        if(el.parentId==2){
          this.userStatusDataChilderLevel.push(el)
        }
      })
    },
    updata(){
      this.addUserDrawer = false;
      this.getList();
    },
    getChannel(){
      listChannel().then(res=>{
        this.channelData = res.rows
      })
    },
    getCountry(){
      const cityRes = JSON.parse(localStorage.getItem('YIHOME_city'));
      const countryRes = JSON.parse(localStorage.getItem('YIHOME_country'));
      this.handleDataCountry(countryRes, cityRes, 'id', 'countryId')
      this.countryData = countryRes;

      listSchool().then(res=>{
        this.schoolData = res.rows
      })
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
    selectCountry(value){
      for (let i = 0; i < this.countryData.length; i++) {
        if (value === this.countryData[i].id) {
          this.cityData = this.countryData[i].children;
          console.log(this.$refs['queryForm'])
          this.$refs['queryForm'].fields[4].resetField()
        }
      }
    },
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      allChannelList(this.queryParams).then(response => {
        this.usersList = response.data.list;
        this.total = response.data.total;
        this.loading = false;
        //获取系统中的用户信息
        listUser().then(res=>{
          this.usersList.forEach(el=>{
            res.rows.forEach(el2=>{
              if(el.owner==el2.userId){
                el.chargePerson = el2.userName
              }
            })
          })
        })
      }).catch(e=>{
        this.loading = false;
      })
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        nameCh: undefined,
        nameEn: undefined,
        channelId: undefined,
        level: undefined,
        weChat: undefined,
        intentionCountry: undefined,
        intentionCity: undefined,
        intentionSchool: undefined,
        personphone: undefined,
        phone: undefined,
        sex: undefined,
        birthday: undefined,
        nationality: undefined,
        passport: undefined,
        studentNo: undefined,
        grade: undefined,
        gradeyear: undefined,
        uemail: undefined,
        disciplinech: undefined,
        disciplineen: undefined,
        allday: undefined,
        campus: undefined,
        zipcode: undefined,
        course: undefined,
        address: undefined,
        abroadschoolen: undefined,
        abroadschoolch: undefined,
        izipcode: undefined,
        addressich: undefined,
        addressien: undefined,
        owner: undefined,
        remark: undefined,
        status: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined
      };
      this.resetForm("form");
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
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      /*this.reset();
      this.open = true;
      this.title = "添加用户";**/
      this.addUserDrawer = true;
      this.drawerTitle = "新增用户"
      this.currentData = undefined;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getUsers(id).then(response => {
        
        /**this.form = response.data;
        this.open = true;
        this.title = "修改用户";*/
        if(response.code===200){
          this.currentData = response.data;
          this.addUserDrawer = true;
          this.drawerTitle = "修改用户"
        }else{
          this.msgError(response.msg);
        }
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateUsers(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addUsers(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          }
        }
      });
    },
    //点击表格
    cellClick(row, column, cell, event){
      if(column.label=='操作'){
        return;
      }
      this.recordTitle = row.nameCh
      this.recordStatus = true;
      this.currentRowData = row;
    },
    handleDistribution(row){

      this.distributionVlaue = ''
      this.currentUserId = row.id;


      // 获取销售信息
      getUserByRole('2,100').then(res=>{
        if(res.code===200){
          this.distributionData = res.data;
          this.distributionStatus = true;
        }else{
          this.msgError(res.msg);
          this.msgError('获取数据失败，暂不可分配');
        }
      }).catch(e=>{
        this.msgError('获取数据失败，暂不可分配');
      })
    },
    handleDistributionConfrim(){
      // currentSaleId:'',
      // currentSaleName:'',
      // id当前客户的id   owner 分配的销售id   userId  ownerName   userName 销售的名称
      userAllocation({
        id:this.currentUserId,
        owner:this.distributionVlaue,
        ownerName:this.currentSaleName
      }).then(res=>{
        if(res.code===200){
          this.distributionStatus = false;
          this.$message({
            message: '分配成功',
            type: 'success'
          });
          this.getList();
        }else{
          this.msgError('分配失败');
        }
      }).catch(e=>{
        this.msgError('分配失败');
      })
    },
    selectSaleChange(val){
      console.log(val)
      this.distributionData.forEach(obj=>{
        if(val==obj.userId){
          this.currentSaleName = obj.userName;
          return;
        }
      })
    }
  }
};
</script>
<style scoped>
  .remarkWrapper{
    -webkit-line-clamp: 1;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }
</style>
<style>
 .userRemarkWrapper{
    max-width: 300px;
    padding: 12px 16px;
    color: rgba(0,0,0,.65) !important;
    background-color: #fff !important;
    background-clip: padding-box;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,.15)
 }
  .addUserWrapper{
     height: 100vh !important;
  }
  .addUserWrapper .el-drawer__body{
   overflow: auto;
   background: #eff3f5;
  }
  .recordWrapper .el-drawer__body{
    overflow: auto;
  }
  .addUserWrapper .el-drawer__body .user-wrapper{
    margin: 16px;
    min-height: 100%;
    background-color: #fff;
    border-radius: 4px;
  }
  .addUserWrapper .el-drawer__header,.recordWrapper .el-drawer__header{
    margin-bottom: 20px;
  }
</style>