<template>
  <div class="app-container" :style= "{backgroundColor:supplierStatus?'#EFF2F5':'#fff'}" v-loading.lock="fullscreenLoading">
    <!-- 新增修改供应商 -->
    <div v-show="supplierStatus" class="addWrapper">
        <div class="top">
            <h1>新增供应商</h1>
            <el-button style="width:60px;height:32px;" size="mini" @click="closeAdd">关闭</el-button>
        </div>
        <div class="content" v-if="supplierStatus">
            <add-supplier :supplier-data="supplierData"></add-supplier>
            <!-- <flow-chart></flow-chart> -->
        </div>
    </div>
    <div v-show="!supplierStatus">
        <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="82px">
          <el-form-item label="供应商名称" prop="name">
            <el-input
            v-model="queryParams.name"
            placeholder="请输入供应商名称"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
            />
        </el-form-item>
        <el-form-item label="国家" prop="countryId">
            <el-select v-model="queryParams.countryId" placeholder="请选择国家" clearable size="small">
                <el-option
                    v-for="item in countryList"
                    :key="item.id"
                    :label="item.nameZh"
                    :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        
        <!-- <el-form-item label="可否选房" prop="isSelectd">
            <el-select v-model="queryParams.isSelectd" placeholder="请选择可否选房" clearable size="small">
            <el-option label="可以" value="1" />
            <el-option label="不可以" value="2" />
            </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="如何判定由YIHOME推荐" prop="recommended">
            <el-input
            v-model="queryParams.recommended"
            placeholder="请输入如何判定由YIHOME推荐"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
            />
        </el-form-item>
        <el-form-item label="预定取消政策" prop="cancel">
            <el-input
            v-model="queryParams.cancel"
            placeholder="请输入预定取消政策"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
            />
        </el-form-item>
        <el-form-item label="转租政策" prop="sublet">
            <el-input
            v-model="queryParams.sublet"
            placeholder="请输入转租政策"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
            />
        </el-form-item>
        <el-form-item label="可预定人群" prop="reservationPeople">
            <el-input
            v-model="queryParams.reservationPeople"
            placeholder="请输入可预定人群"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
            />
        </el-form-item>
        <el-form-item label="预约看房流程" prop="lookProcess">
            <el-input
            v-model="queryParams.lookProcess"
            placeholder="请输入预约看房流程"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
            />
        </el-form-item>
        <el-form-item label="订房流程" prop="reservationProcess">
            <el-input
            v-model="queryParams.reservationProcess"
            placeholder="请输入订房流程"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
            />
        </el-form-item> 
        <el-form-item label="付款计划" prop="paymentPlan">
            <el-input
            v-model="queryParams.paymentPlan"
            placeholder="请输入付款计划"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
            />
        </el-form-item> -->
        <!-- <el-form-item label="付款方式" prop="paymentType">
            <el-select v-model="queryParams.paymentType" placeholder="请选择付款方式" clearable size="small">
            <el-option
                    v-for="item in supplierType"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
        </el-form-item> -->
        <el-form-item label="状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="small">
            <el-option label="有效" value="1" />
            <el-option label="无效" value="0" />
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
            v-hasPermi="['home:supplier:add']"
            >新增</el-button>
        </el-col>
        <el-col :span="1.5">
            <el-button
            type="success"
            icon="el-icon-edit"
            size="mini"
            :disabled="single"
            @click="handleUpdate"
            v-hasPermi="['home:supplier:edit']"
            >修改</el-button>
        </el-col>
        <!-- <el-col :span="1.5">
            <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            :disabled="multiple"
            @click="handleDelete"
            v-hasPermi="['home:supplier:remove']"
            >删除</el-button>
        </el-col>
        <el-col :span="1.5">
            <el-button
            type="warning"
            icon="el-icon-download"
            size="mini"
            @click="handleExport"
            v-hasPermi="['home:supplier:export']"
            >导出</el-button>
        </el-col> -->
        </el-row>

        <el-table v-loading="loading" :data="supplierList" @selection-change="handleSelectionChange" @row-click="clickSupplierRow">
        <el-table-column type="selection" width="55" align="center" />
        <!-- <el-table-column label="id" align="center" prop="id" /> -->
        <el-table-column label="供应商名称" align="center" prop="name" :show-overflow-tooltip="true"/>
        <el-table-column label="国家" align="center" prop="countryId" >
            <template slot-scope="scope">
                <span v-for="(item,$index) in countryList" :key="$index">
                    {{scope.row.countryId==item.id?item.nameZh:''}}
                </span>
            </template>
        </el-table-column>
        

        <el-table-column label="总床数" align="center" prop="beds" :show-overflow-tooltip="true"/>

        <!-- <el-table-column label="可否选房" align="center" prop="isSelectd" >
            <template slot-scope="scope">
                {{scope.row.isSelectd==1?'可以':scope.row.isSelectd==2?'不可以':''}}
            </template>
        </el-table-column> -->
        <!-- <el-table-column label="如何判定由YIHOME推荐" align="center" prop="recommended" />
        <el-table-column label="预定取消政策" align="center" prop="cancel" />
        <el-table-column label="转租政策" align="center" prop="sublet" />
        <el-table-column label="可预定人群" align="center" prop="reservationPeople" />
        <el-table-column label="预约看房流程" align="center" prop="lookProcess" />
        <el-table-column label="订房流程" align="center" prop="reservationProcess" /> -->
        <!-- <el-table-column label="付款方式" align="center" prop="paymentType" >
                <template slot-scope="scope">
                    <span v-for="(item,$index) in supplierType" :key="$index">
                        {{scope.row.paymentType==item.id?item.name:''}}
                    </span>
                </template>
        </el-table-column> -->
        <!-- <el-table-column label="付款计划" align="center" prop="paymentPlan" />-->
        <!-- <el-table-column label="如何判定由YIHOME推荐" align="center" prop="recommended" :show-overflow-tooltip="true"> 
          <template slot-scope="scope">
            <span v-html="scope.row.recommended?scope.row.recommended:'---'"></span>
          </template>
        </el-table-column> -->
        <el-table-column label="状态" align="center" prop="status" >
                <template slot-scope="scope">
                    <span v-if="scope.row.status==1"><b style="width:10px;height:10px;display:inline-block;background-color:green;border-radius:10px;margin-right:4px;"></b>有效</span> 
                    <span v-if="scope.row.status==2"><b style="width:10px;height:10px;display:inline-block;background-color:red;border-radius:10px;margin-right:4px;"></b>无效</span> 
                </template>
        </el-table-column>
        <!-- <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true"> 
          <template slot-scope="scope">
            <span v-html="scope.row.remark?scope.row.remark:'---'"></span>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="250px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-view"
                @click="viewCell(scope.row)"
                v-hasPermi="['home:supplier:edit']"
            >查看</el-button>
            <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
                v-hasPermi="['home:supplier:edit']"
            >编辑</el-button>
            <el-button
                size="mini"
                type="text"
                icon="el-icon-plus"
                @click="handleAddHouse(scope.row)"
                v-hasPermi="['home:supplier:houseAdd']"
            >添加房源</el-button>
            <el-button
                size="mini"
                type="text"
                icon="el-icon-thumb"
                @click="handleDistribution(scope.row)"
                v-hasPermi="['home:supplier:distribution']"
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

    </div>
    

    <!-- 添加或修改供应商基础信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="国家" prop="countryId">
          <el-input v-model="form.countryId" placeholder="请输入国家" />
        </el-form-item>
        <el-form-item label="供应商名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入供应商名称" />
        </el-form-item>
        <el-form-item label="可否选房 1可以 2不可以">
          <el-select v-model="form.isSelectd" placeholder="请选择可否选房 1可以 2不可以">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="如何判定由YIHOME推荐" prop="recommended">
          <el-input v-model="form.recommended" placeholder="请输入如何判定由YIHOME推荐" />
        </el-form-item>
        <el-form-item label="预定取消政策" prop="cancel">
          <el-input v-model="form.cancel" placeholder="请输入预定取消政策" />
        </el-form-item>
        <el-form-item label="转租政策" prop="sublet">
          <el-input v-model="form.sublet" placeholder="请输入转租政策" />
        </el-form-item>
        <el-form-item label="可预定人群" prop="reservationPeople">
          <el-input v-model="form.reservationPeople" placeholder="请输入可预定人群" />
        </el-form-item>
        <el-form-item label="预约看房流程" prop="lookProcess">
          <el-input v-model="form.lookProcess" placeholder="请输入预约看房流程" />
        </el-form-item>
        <el-form-item label="订房流程" prop="reservationProcess">
          <el-input v-model="form.reservationProcess" placeholder="请输入订房流程" />
        </el-form-item>
        <el-form-item label="付款方式">
          <el-select v-model="form.paymentType" placeholder="请选择付款方式">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="付款计划" prop="paymentPlan">
          <el-input v-model="form.paymentPlan" placeholder="请输入付款计划" />
        </el-form-item>
        <el-form-item label=" 0 失效 1有效">
          <el-select v-model="form.status" placeholder="请选择 0 失效 1有效">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>


    <el-drawer
      :title="supplierDetailTitle"
      :visible.sync="viewSupplierStatus"
      custom-class="demo-drawer"
      size="880px">
      <div class="viewWrapper" v-if="viewSupplierStatus">
        <el-tabs v-model="supplierActiveName" @tab-click="handleClick">
            <el-tab-pane label="供应商信息" name="first">
              <div class="basicWrapper" >
                <div class="basicTitle">
                    <div class="line"></div>
                    <div class="content" style="display:flex;justify-content:space-between">
                      <div>基础信息</div>
                      <div>
                        <!-- <el-button
                          size="mini"
                          type="text"
                          icon="el-icon-edit"
                        >编辑</el-button> -->
                      </div>
                    </div>
                </div>
                <ul>
                    <li>
                        <el-row>
                            <el-col :span="12">
                                <div class="title">国家：</div>
                                <div class="value">
                                  <span v-for="(item,$index) in countryList" :key="$index">
                                      {{supplierData.countryId==item.id?item.nameZh:''}}
                                  </span>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="title">房东/中介/公寓商名称：</div>
                                <div class="value">{{supplierData.name}}</div>
                            </el-col>
                            <el-col :span="12">
                                <div class="title">状态：</div>
                                <div class="value">{{supplierData.status==1?'有效':'无效'}}</div>
                            </el-col>
                            <el-col :span="12">
                                <div class="title">总床数：</div>
                                <div class="value">{{supplierData.beds}}</div>
                            </el-col>
                            
                            <el-col :span="24">
                                <div class="title">如何判定由YIHOME推荐：</div>
                                <div class="value" v-html="supplierData.recommended?supplierData.recommended:'---'"></div>
                            </el-col>

                            <el-col :span="24">
                                <div class="title">备注：</div>
                                <div class="value" v-html="supplierData.remark?supplierData.remark:'---'"></div>
                            </el-col>
                            <!-- <el-col :span="24">
                                <div class="title">预定取消政策：</div>
                                <div class="value" v-html="supplierData.cancel?supplierData.cancel:'---'"></div>
                            </el-col>

                            <el-col :span="24">
                                <div class="title">转租政策：</div>
                                <div class="value" v-html="supplierData.sublet?supplierData.sublet:'---'"></div>
                            </el-col>

                            
                            <el-col :span="24">
                                <div class="title">付款计划：</div>
                                <div class="value" v-html="supplierData.paymentPlan?supplierData.paymentPlan:'---'"></div>
                            </el-col> -->
                            
                        </el-row>
                    </li>
                </ul>
                <div class="basicTitle">
                    <div class="line"></div>
                    <div class="content" style="display:flex;justify-content:space-between">
                      <div>合同信息</div>
                      <div>
                        <!-- <el-button
                          size="mini"
                          type="text"
                          icon="el-icon-edit"
                        >编辑</el-button> -->
                      </div>
                    </div>
                </div>
                <ul>
                  <li>
                    <el-row v-if="contractData">
                    <el-col :span="12">
                        <div class="title">确定合同开始日期：</div>
                        <div class="value">{{contractData.contractStartDate?myparseTime(contractData.contractStartDate):'---'}}</div>
                    </el-col>

                    <el-col :span="12">
                        <div class="title">确定合同结束日期：</div>
                        <div class="value">{{contractData.contractEndDate?myparseTime(contractData.contractEndDate):'---'}}</div>
                    </el-col>

                    <el-col :span="12">
                        <div class="title">合同签订日期：</div>
                        <div class="value">{{contractData.contractDate?myparseTime(contractData.contractDate):'---'}}</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="title">合同有效期（天）：</div>
                        <div class="value">{{contractData.contractValid?contractData.contractValid:'---'}}</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="title">付款方式：</div>
                        <div class="value">
                          <span v-for="(item,$index) in supplierType" :key="$index">
                              <span v-for="(item2,$index2) in contractData.paymentType.split(',')" :key="$index2">
                                {{item2==item.id?item.name+' / ':''}}
                              </span>
                          </span>
                           <!-- {{contractData.paymentType?contractData.paymentType:'---'}} -->
                           <!-- {{scope.row.paymentType==item.id?item.name:''}} -->
                        </div>
                    </el-col>
                    <el-col :span="24">
                        <div class="title">付款计划：</div>
                        <div class="value" v-html="contractData.paymentPlan?contractData.paymentPlan:'---'"></div>
                    </el-col>
                    <el-col :span="24">
                        <div class="title">佣金方案：</div>
                        <div class="value" v-html="contractData.commission?contractData.commission:'---'"></div>
                    </el-col>
                    <el-col :span="24">
                        <div class="title">佣金支付周期：</div>
                        <div class="value" v-html="contractData.paymentCycle?contractData.paymentCycle:'---'"></div>
                    </el-col>
                    <el-col :span="24">
                        <div class="title">需缴纳的款项金额：</div>
                        <div class="value" v-html="contractData.paymentAmount?contractData.paymentAmount:'---'"></div>
                    </el-col>
                    </el-row>
                  </li>
                </ul>


                <div class="basicTitle">
                    <div class="line"></div>
                    <div class="content" style="display:flex;justify-content:space-between">
                      <div>其他信息</div>
                      <div>
                        
                      </div>
                    </div>
                </div>
                <ul>
                  <li>
                    <el-row  v-if="otherData">
                      <el-col :span="12">
                          <div class="title">可否选房：</div>
                          <div class="value">{{otherData.isSelectd==1?'可以':otherData.isSelectd==2?'不可以':'---'}}</div>
                      </el-col>

                      <el-col :span="24" v-if="otherData.isSelectd==1">
                        <div class="title">备注：</div>
                        <div class="value" v-html="otherData.selectHouseRemark?otherData.selectHouseRemark:'---'"></div>
                      </el-col>

                      <el-col :span="12">
                          <div class="title">可否选择楼层：</div>
                          <div class="value">{{otherData.floorSelect==1?'可以':otherData.floorSelect==2?'不可以':'---'}}</div>
                      </el-col>

                      <el-col :span="12">
                          <div class="title">是否可以知道室友性别：</div>
                          <div class="value">{{otherData.chumSexSelect==1?'可以':otherData.chumSexSelect==2?'不可以':'---'}}</div>
                      </el-col>

                      <el-col :span="12">
                          <div class="title">团队订房是否可安排住同一个flat：</div>
                          <div class="value">{{otherData.flatSelect==1?'可以':otherData.flatSelect==2?'不可以':'---'}}</div>
                      </el-col>
                      <el-col :span="12">
                          <div class="title">是否接受紧急入住：</div>
                          <div class="value">{{otherData.urgencySelect==1?'可以':otherData.urgencySelect==2?'不可以':'---'}}</div>
                      </el-col>
                      <el-col :span="24">
                        <div class="title">订房流程：</div>
                        <div class="value" v-html="otherData.reservationProcess?otherData.reservationProcess:'---'"></div>
                    </el-col>
                    <el-col :span="24">
                        <div class="title">预约看房流程：</div>
                        <div class="value" v-html="otherData.lookProcess?otherData.lookProcess:'---'"></div>
                    </el-col>
                    <el-col :span="24">
                        <div class="title">可预订人群：</div>
                        <div class="value" v-html="otherData.reservationPeople?otherData.reservationPeople:'---'"></div>
                    </el-col>
                    <el-col :span="24">
                        <div class="title">预定取消政策：</div>
                        <div class="value" v-html="otherData.cancel?otherData.cancel:'---'"></div>
                    </el-col>
                    <el-col :span="24">
                        <div class="title">转租政策：</div>
                        <div class="value" v-html="otherData.sublet?otherData.sublet:'---'"></div>
                    </el-col>
                    <el-col :span="24">
                        <div class="title">疫情退改政策：</div>
                        <div class="value" v-html="otherData.specialPolicy?otherData.specialPolicy:'---'"></div>
                    </el-col>
                    </el-row>
                  </li> 
                </ul>

                <div class="basicTitle">
                    <div class="line"></div>
                    <div class="content" style="display:flex;justify-content:space-between">
                      <div>附件信息</div>
                      <div>
                        
                      </div>
                    </div>
                </div>
                <ul>
                  <li>
                    <el-row>
                      <el-col :span="6" v-for="(itemList,$index) in fileList" :key="$index">  
                          <div class="value" style="text-align: center;">
                            <img style="width:100px;cursor: pointer;" :src="itemList.url" alt="" @click="viewImgUrl(itemList)">
                            
                            <p>{{itemList.fileName?itemList.fileName:'---'}}</p>
                          </div>
                      </el-col>
                    </el-row>
                  </li>
                </ul>

              </div>
            </el-tab-pane>
            <el-tab-pane label="供应商联系人信息" name="second">
              <div class="contactWrapper" v-loading="contactLoading">
                <div v-if="contactList.length==0" style="padding:32px 0;text-align:center;">暂无联系人</div>
                <div class="basicWrapper" v-else v-for="(item,$index) in contactList" :key="$index">
                  <div class="basicTitle">
                      <div class="line"></div>
                      <div class="content" style="display:flex;justify-content:space-between">
                        <div>负责人（{{$index+1}}）</div>
                        <div>
                          <el-button
                            size="mini"
                            type="text"
                            icon="el-icon-edit"
                            v-hasPermi="['home:supplier:contactedit']"
                            @click="editContact(item.id,$index)"
                          >编辑</el-button>
                          <el-button
                            size="mini"
                            type="text"
                            icon="el-icon-delete"
                            v-hasPermi="['home:supplier:contactremove']"
                            @click="delContact(item.id)"
                          >删除</el-button>
                        </div>
                      </div>
                  </div>
                  <ul>
                      <li>
                          <el-row>
                              <el-col :span="12">
                                  <div class="title">负责人姓名：</div>
                                  <div class="value">{{item.name}}</div>
                              </el-col>
                              <el-col :span="12">
                                  <div class="title">邮件：</div>
                                  <div class="value">{{item.email}}</div>
                              </el-col>
                              <el-col :span="12">
                                  <div class="title">电话：</div>
                                  <div class="value">{{item.phone}}</div>
                              </el-col>
                              <el-col :span="12">
                                  <div class="title">WeChat/Whatsapp：</div>
                                  <div class="value">{{item.chat}}</div>
                              </el-col>
                          </el-row>
                      </li>
                  </ul>
                </div>

                <el-button type="primary" size="mini" v-hasPermi="['home:supplier:contactadd']" icon="el-icon-plus" @click="addContact">添加</el-button>

              </div>
            </el-tab-pane>
            <el-tab-pane label="房源信息" name="third">
              <el-table :data="houseData" stripe style="width: 100%" v-loading="houseLoading">
                <el-table-column label="房源编号" align="center" prop="no" />
                <el-table-column label="房源名称" align="center" prop="name">
                  <template slot-scope="scope">
                    <div style="cursor:pointer;">{{scope.row.name}}</div>
                  </template>
                </el-table-column>
                <el-table-column label="房源类型" align="center" prop="type" width="100">
                  <template slot-scope="scope">
                    {{ scope.row.type==1?'公寓':'民宿' }}
                  </template>
                </el-table-column>
                <el-table-column label="状态" align="center" prop="status" width="100">
                  <template slot-scope="scope">
                    <span v-if="scope.row.status==1"><b style="color:#c33;">●</b>未上架</span>
                    <span v-if="scope.row.status==2"><b style="color:green;">●</b>上架中</span>
                    <span v-if="scope.row.status==3"><b style="color:#c33;">●</b>已下架</span>
                    <span v-if="scope.row.status==4"><b style="color:#c33;">●</b>已售完</span>
                    <span v-if="scope.row.status==5"><b style="color:#c33;">●</b>废弃</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center" class-name="small-padding fixed-width" >
                  <template slot-scope="scope">
                    <el-button
                      v-hasPermi="['home:supplier:houseedit']"
                      size="mini"
                      type="text"
                      icon="el-icon-view"
                      @click.stop="viewHouse(scope.row)"
                    >查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="佣金信息" name="fourth">
              <commission-component ref="commissionComponent" current-type="1" :current-id="commissionId"  />
            </el-tab-pane>
        </el-tabs>
      </div>
    </el-drawer>

    <el-dialog title="负责人信息" :visible.sync="dialogFormVisible" width="600px">
      <el-form :model="contactForm" label-width="149px" :rules="contactRules" ref="contactForm">
          <el-form-item label="负责人姓名："  prop="name">
              <el-input v-model="contactForm.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="邮件："  prop="email">
              <el-input v-model="contactForm.email" clearable></el-input>
          </el-form-item>
          <el-form-item label="电话："  prop="phone">
              <el-input v-model="contactForm.phone" clearable></el-input>
          </el-form-item>
          <el-form-item label="WeChat/Whatsapp："  prop="chat">
              <el-input v-model="contactForm.chat" clearable></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitFormData('contactForm')">确 定</el-button>
      </div>
  </el-dialog>


  <el-dialog
      title="分配用户"
      :visible.sync="distributionStatus"
      width="420px">
      <div>
        <el-select v-model="owner" @change="selectOwnerChange" placeholder="请选择负责人" style="width:100%;" clearable>
            <el-option
                v-for="item in ownerList"
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
import {SuppliersTest, listSupplier, getSupplier, delSupplier, addSupplier, updateSupplier, exportSupplier } from "@/api/supplier";
import { listCountry } from '@/api/home/country'
import { listDictionaries } from "@/api/user/dictionaries";
import AddSupplier from "@/components/AddSupplier"
import FlowChart from "@/components/FlowChart"
import { addSupplierContact,updateSupplierContact,getSupplierContact,delSupplierContact,getContactDetails,getSupplierSyncList,getContract,getSupplierAccessoryList  } from "@/api/supplier";
import { useListGetHouse } from '@/api/rent/house'
import { getUserByRole } from "@/api/user/users";

import commissionComponent from "@/components/commission";

export default {
  name: "Supplier",
  components:{
    AddSupplier,FlowChart,commissionComponent
  },
  data() {
    return {
      commissionId:null,
      viewSupplierStatus:false,//查看供应商的状态
      supplierDetailTitle:'',
      supplierActiveName:'first',
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
      // 供应商基础信息表格数据
      supplierList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        countryId: undefined,
        name: undefined,
        isSelectd: undefined,
        recommended: undefined,
        cancel: undefined,
        sublet: undefined,
        reservationPeople: undefined,
        lookProcess: undefined,
        reservationProcess: undefined,
        paymentType: undefined,
        paymentPlan: undefined,
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
      supplierStatus:false,
      countryList:[],
      supplierType:[],//供应商的付款方式

      supplierData:{},//修改  获取到的供应商数据

      fullscreenLoading:false,

      contactLoading:false,
      contactList:[],
      currentSupplierId:'',
      dialogFormVisible:false,
      contactForm:{
          name:'',
          email:'',
          phone:'',
          chat:'',
          type:'1',
      },
      contactRules:{
          name: [
              { required: true, message: '请输入负责人姓名', trigger: 'blur' },
          ],
          email: [
              { required: true, message: '请输入负责人邮箱', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
      },
      houseLoading:false,
      houseData:[],
      distributionStatus:false,
      owner:'',
      ownerList:[],
      currentid:'',
      otherData:[],
      contractData:[],
      fileList:[]
    };
  },
  created() {
    this.getList();
    this.getYihomeCountry();
    this.getSupplierType();


    // SuppliersTest().then(res=>{
      
    //   console.log(res)
    // })


    getUserByRole('110,111').then(res=>{
      this.ownerList = res.data;
    }).catch(e=>{
    })
  },
  methods: {
    viewImgUrl(file){
      window.open(this.serverImgUrl+file.weburl)
    },
    getSystemUser(){
        
    },
    handleDistribution(row){
      this.currentid = row.id;
      getSupplier(row.id).then(res=>{
        this.owner = res.data.owner;
        this.distributionStatus = true;
      })
    },
    selectOwnerChange(val){
      this.owner = val;
    },
    handleDistributionConfrim(){
      if(!this.owner){
        this.msgInfo('请选择负责人')
        return;
      }
      updateSupplier({id:this.currentid,owner:this.owner}).then(res=>{
        if(res.code===200){
          this.msgSuccess('分配成功')
          this.distributionStatus = false;
          this.getList()
        }else{
          this.msgError('分配失败')
        }
      }).catch(e=>{

      })
    },
    addContact(){
        this.reset();
        this.dialogFormVisible = true;
    },
    editContact(id,index){
        getContactDetails(id).then(res=>{
            if(res.code===200){
                this.reset();
                this.dialogFormVisible = true;
                this.contactForm = res.data;
            }else{
                this.msgError(res.msg)
            }
        })
        
    },
    delContact(id){//删除联系人

            this.$confirm('是否删除当前联系人?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delSupplierContact(id).then(res=>{
                    if(res.code===200){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getContactList();
                    }
                })
            }).catch(() => {
                        
            });

            
        },
    submitFormData(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.contactForm.id){
                        updateSupplierContact(this.contactForm).then(res=>{
                            this.dialogFormVisible = false;
                            if(res.code===200){
                                this.getContactList();
                            }else{
                                this.msgError(res.msg)
                            }
                        })
                    }else{
                        addSupplierContact(this.contactForm).then(res=>{
                            this.dialogFormVisible = false;
                            if(res.code===200){
                                this.getContactList();
                            }else{
                                this.msgError(res.msg)
                            }
                        })
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },


    getContactList(){
      this.contactLoading = true;
        getSupplierContact({masterId:this.currentSupplierId,type:1}).then(res=>{
          this.contactLoading = false;
          this.contactList = res.rows;
        })
    },
    viewCell(row){
      this.currentSupplierId = row.id;
      this.fullscreenLoading = true;
      const id = row.id;
      // 基本信息
      getSupplier(id).then(response => {
        this.fullscreenLoading = false;
        if(response.code===200){
          this.viewSupplierStatus = true;
          this.supplierDetailTitle = '供应商 / '+row.name
          this.supplierActiveName = 'first';
          this.supplierData = response.data;
        }else{
          this.msgError(response.msg);
        }
      });
      //其他信息
      getSupplierSyncList({supplierId:id}).then(res=>{
        
        if(res.code===200){
            this.otherData = res.rows[0]
        }else{
          this.msgError(res.msg)
        }
      })
      //合同信息
      getContract({supplierId:id}).then(res=>{
        if(res.code===200){
            this.contractData = res.rows[0]
        }else{
          this.msgError(res.msg)
        }
      })
      //附件信息 
      getSupplierAccessoryList({supplierId:id}).then(res=>{
          this.fileList = res.rows;
          this.fileList.forEach(el=>{
             el.weburl = el.url;
              var str = el.url.substring(el.url.lastIndexOf("\.") + 1, el.url.length);
              if(str=='jpg'||str=='png'||str=='jpeg'){
                el.url =this.serverImgUrl+el.url
              }else{
                //el.url = el.url.substring(el.url.lastIndexOf("\.") + 1, el.url.length);
              }
              
              if(str=="xlsx"){
                  el.url  = "https://www.inyihome.com/upload/excel.png"
              }
              if(str=="docx"){
                  el.url  = "https://www.inyihome.com/upload/word.png"
              }
              if(str=="pdf"){
                  el.url  = "https://www.inyihome.com/upload/PDF.png"
              }
          })
      })
    },
    clickSupplierRow(row, column){
      console.log(row, column.label)
      if(column.label=="操作"){
        return;
      }
      this.currentSupplierId = row.id;
      this.fullscreenLoading = true;
      const id = row.id;
      // 基本信息
      getSupplier(id).then(response => {
        this.fullscreenLoading = false;
        if(response.code===200){
          this.viewSupplierStatus = true;
          this.supplierDetailTitle = '供应商 / '+row.name
          this.supplierActiveName = 'first';
          this.supplierData = response.data;
        }else{
          this.msgError(response.msg);
        }
      });
      //其他信息
      getSupplierSyncList({supplierId:id}).then(res=>{
        
        if(res.code===200){
            this.otherData = res.rows[0]
        }else{
          this.msgError(res.msg)
        }
      })
      //合同信息
      getContract({supplierId:id}).then(res=>{
        if(res.code===200){
            this.contractData = res.rows[0]
        }else{
          this.msgError(res.msg)
        }
      })
      //附件信息
      getSupplierAccessoryList({supplierId:id}).then(res=>{
          this.fileList = res.rows;
          this.fileList.forEach(el=>{
              el.weburl = el.url;
              var str = el.url.substring(el.url.lastIndexOf("\.") + 1, el.url.length);
              if(str=='jpg'||str=='png'||str=='jpeg'){
                el.url =this.serverImgUrl+el.url
              }else{
                //el.url = el.url.substring(el.url.lastIndexOf("\.") + 1, el.url.length);
              }
              
              if(str=="xlsx"){
                  el.url  = "https://www.inyihome.com/upload/excel.png"
              }
              if(str=="docx"){
                  el.url  = "https://www.inyihome.com/upload/word.png"
              }
              if(str=="pdf"){
                  el.url  = "https://www.inyihome.com/upload/PDF.png"
              }

            


          })
      })
      
    },
    handleClick(tab, event){
      if(tab.name=="second"){
       this.getContactList();
      }
      if(tab.name=="third"){
        this.getSupplierHouse()
      }
      if(tab.name=="fourth"){
        this.commissionId = this.currentSupplierId;
        setTimeout(()=>{
          this.$refs.commissionComponent.getList();
        },10)
        
      }
      
    },
    getSupplierHouse(){
      this.houseLoading = true;


      useListGetHouse({providerId:this.currentSupplierId}).then(response => {
        this.houseLoading = false;
        this.houseData = response.rows;
      })
    },
    viewHouse(row){
      this.viewSupplierStatus = false;
      this.$router.push({ path: "/rent/house", query: { no: row.no } }); 
    },
    getYihomeCountry(){
        var list = JSON.parse(localStorage.getItem('YIHOME_country'))
        if(list){
            this.countryList = list;
        }else{
            listCountry().then(response => {
                this.countryList = response.rows
            })
        }
    },
    getSupplierType(){
        var list = JSON.parse(localStorage.getItem('YIHOME_user_type'))
        if(list){
            list.forEach(element => {
                if(element.parentId==31){
                    this.supplierType.push(element)
                }
            });
        }else{
            listDictionaries().then(response => {
                response.data.forEach(element => {
                    if(element.parentId==31){
                        this.supplierType.push(element)
                    }
                });
            });
        }
    },
    /** 查询供应商基础信息列表 */
    getList() {
      this.loading = true;
      listSupplier(this.queryParams).then(response => {
        this.supplierList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.contactForm = {
          masterId:this.currentSupplierId,
          name: undefined,
          email: undefined,
          phone: undefined,
          chat: undefined,
          type:'1',
      }
      this.resetForm('contactForm')
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
    //   this.reset();
    //   this.open = true;
    //   this.title = "添加供应商基础信息";
    this.supplierStatus = true;
    this.supplierData = {};
    },

    /** 添加房源 */
    handleAddHouse(row){
      this.$router.push({ path: "/rent/house", query: { supplierId: row.id } });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.fullscreenLoading = true;
      this.reset();
      const id = row.id || this.ids
      getSupplier(id).then(response => {
        this.fullscreenLoading = false;
        // this.form = response.data;
        // this.open = true;
        // this.title = "修改供应商基础信息";
        if(response.code===200){
          this.supplierStatus = true;
          this.supplierData = response.data;
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
            updateSupplier(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addSupplier(this.form).then(response => {
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
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除供应商基础信息编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delSupplier(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有供应商基础信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportSupplier(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    },
    //关闭新增或编辑供应商
    closeAdd(){
        this.supplierStatus = false;
        this.getList()
    }
  }
};
</script>
<style scoped>
    .addWrapper .top{
        padding: 16px 24px;
        margin-bottom: 16px;
        background-color: rgb(255, 255, 255);
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
    }
    .addWrapper .top h1{
        margin: 0px;
        font-size: 18px;
        color: rgba(0, 0, 0, 0.85);
        font-family: PingFangSC-Medium;
    }
    .addWrapper .top button{
        width: 60px;
        height: 32px;   
    }
    .addWrapper .content{
        -background-color: rgb(255, 255, 255);
        -padding : 32px 24px;
        -padding-top: 32px;
        border-radius: 4px;
    }
    .viewWrapper{
      padding: 0 16px;
    }
    .basicWrapper .basicTitle{
        margin-bottom: 16px;
        margin-top: 6px;
        position: relative;
        width: 100%;
        height: 38px;
        line-height: 38px;
        border-bottom: 1px solid #e9e9e9;
    }
    .basicWrapper .basicTitle .line{
        position: absolute;
        display: inline-block;
        background-color: #0083ff;
        width: 2px;
        top: 0;
        border: 20px;
        bottom: 0;
        height: 16px;
        left: 0;
        margin: auto;
    }
    .basicWrapper .basicTitle .content{
        margin-left: 11px;
        font-size: 14px;
        font-weight: 400;
        color: #333;
    }
    .basicWrapper ul{
        padding: 0;
    }
    .basicWrapper ul li{
        list-style: none;
    }
    .basicWrapper ul li .el-col{
        display: flex;
        padding: 10px;
        font-size: 13px;
        color: #000;
    }
    .basicWrapper ul li .el-col .title{
        width: 170px;
        padding-right: 10px;
        color: #999;
    }
    .basicWrapper ul li .el-col .value{
        word-break: break-all;
        flex: 1;
    }
</style>
<style>
.demo-drawer .el-drawer__body{
  overflow: auto;
}
</style>