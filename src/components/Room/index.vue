<template>
  <!-- 单间显示组件-->
  <section>
    <el-tabs v-model="activeName"  @tab-click="handleTabsClick">
      <el-tab-pane label="单间信息" name="first">
        <el-form
          ref="queryForm"
          :model="queryParams"
          :inline="true"
          label-width="88px"
        >
          <el-form-item label="单间名称" prop="roomName">
            <el-input
              v-model="queryParams.roomName"
              placeholder="请输入单间名称"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="时间范围：">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="time"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              size="small"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="户型选择">
            <el-select
              v-model="apartment"
              placeholder="请选择户型"
              clearable
              size="small"
              multiple
            >
              <el-option
                v-for="item in type"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="卫浴类型">
            <el-select
              v-model="batroomType"
              placeholder="请选择卫浴类型"
              clearable
              size="small"
            >
              <el-option
                v-for="item in type2"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="租赁状态" prop="roomStatus">
            <el-select
              v-model="queryParams.roomStatus"
              placeholder="请选择租赁状态"
              clearable
              size="small"
            >
              <el-option label="未上架" value="1"></el-option>
              <el-option label="上架中" value="2"></el-option>
              <el-option label="已下架" value="3"></el-option>
              <el-option label="已售完" value="4"></el-option>
              <el-option label="已废弃" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="handleQuery"
              >搜索</el-button
            >
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
              >重置</el-button
            >
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              v-hasPermi="['rent:house:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAddRoom('add')"
              >新增单间</el-button
            >
          </el-col>
        </el-row>
        <el-table
          v-loading="roomLoading"
          :data="roomList"
          @selection-change="handleSelectionChange"
          border
          highlight-current-row
          @row-click="clickRoomRow"
          @cell-dblclick="dblHandleCell"
        >
          <el-table-column type="selection" width="55" align="center" />

          <el-table-column label="房间名称" align="center" prop="name" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span v-if="scope.row.checkType == '1'" style="color:#c33">{{
                scope.row.name
              }}</span>
              <span v-else>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="房间状态"
            width="90"
            align="center"
            prop="status"
          >
            <template slot-scope="scope">

              <!-- {{ scope.row.status==1?'未上架':scope.row.status==2?'上架中':scope.row.status==3?'已下架':scope.row.status==4?'已售完':'废弃' }} -->
              <span v-if="!scope.row.status"
                ><b style="color:#c33;">●</b>未上架</span
              >
              <span v-if="scope.row.status == 2"
                ><b style="color:green;">●</b>上架中</span
              >
              <span v-if="scope.row.status == 3"
                ><b style="color:#c33;">●</b>已下架</span
              >
              <span v-if="scope.row.status == 4"
                ><b style="color:#c33;">●</b>已售完</span
              >
              <span v-if="scope.row.status == 5"
                ><b style="color:#c33;">●</b>废弃</span
              >
            </template>
          </el-table-column>

          <el-table-column
            label="排序"
            width="90"
            align="center"
            prop="orderNo"
          >
            <template slot-scope="scope">
              <div style="width:100%;height:100%">
                <el-input
                  v-if="scope.row.isCheckCell"
                  v-model="scope.row.orderNo"
                  @blur="inputBlur(scope.row)"
                  style="width:100%;hight:100%"
                ></el-input>
                <span v-else>{{ scope.row.orderNo }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            width="280"
            align="center"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <!-- <el-button
            v-hasPermi="['home:room:edit']"
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="handleAddRoom('view',scope.row)"
          >查看</el-button> -->
              <el-button
                v-hasPermi="['rent:house:edit']"
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click.stop="handleAddRoom('edit', scope.row)"
                >编辑</el-button
              >
              <el-button
                v-hasPermi="['rent:house:edit']"
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click.stop="leaseperiodPro('edit', scope.row)"
              >格式化租期</el-button
              >
              <!-- <el-button
            v-hasPermi="['home:room:edit']"
            size="mini"
            type="text"
            icon="el-icon-copy-document"
            @click.stop="handleCopyRoom(scope.row)"
          >复制</el-button> -->
              <!-- <el-button
            v-hasPermi="['home:room:edit']"
            size="mini"
            type="text"
            icon="el-icon-mouse"
            @click.stop="handleStatusRoom('edit',scope.row)"
          >状态</el-button> -->

              <el-dropdown :hide-on-click="true">

<!--                v-hasPermi="['home:house:edit']"-->
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-s-operation"
                >
                  状态<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="1">
                    <p @click.stop="updateRoom(scope.row, 1)" style="margin:0;">上架</p>
                  </el-dropdown-item>
                  <el-dropdown-item command="2">
                    <p @click.stop="updateRoom(scope.row, 2)" style="margin:0;">下架</p>
                  </el-dropdown-item>
                  <el-dropdown-item command="3">
                    <p @click.stop="updateRoom(scope.row, 3)" style="margin:0;">废弃</p>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="联系人信息" v-hasPermi="['houseConcat:concat:view']" name="second">
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
                      v-hasPermi="['houseConcat:concat:edit']"
                      @click="editContact(item.id,$index)"
                    >编辑</el-button>
                    <el-button
                      size="mini"
                      type="text"
                      icon="el-icon-delete"
                      @click="delContact(item.id)"
                      v-hasPermi="['houseConcat:concat:remove']"
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

          <el-button type="primary" v-hasPermi="['houseConcat:concat:add']" icon="el-icon-plus" size="mini" @click="addContact">添加</el-button>

        </div>
      </el-tab-pane>
      <el-tab-pane label="公寓楼合同其他信息" name="third" v-hasPermi="['houseSupplier:supplier:view']">
        <div v-loading="commissionLoading">


        <!-- <div v-if="commissionList.length==0" style="padding:32px 0;text-align:center;">暂无信息</div> -->
          <div class="basicWrapper">
            <div class="basicTitle">
                <div class="line"></div>
                <div class="content" style="display:flex;justify-content:space-between">
                  <div>其他信息</div>

                  <div  v-if="commissionList.length==0">
                    <el-button
                      size="mini"
                      type="text"
                      icon="el-icon-plus"
                      v-hasPermi="['houseSupplier:supplier:edit']"
                      @click="addOther()"
                    >新增</el-button>
                  </div>

                  <div v-else>
                    <el-button
                      size="mini"
                      type="text"
                      icon="el-icon-edit"
                      v-hasPermi="['houseSupplier:supplier:edit']"
                      @click="editOther(commissionList.id)"
                    >修改</el-button>
                  </div>
                </div>
            </div>
            <ul>
                <li v-if="commissionList.length==0">
                  <div style="padding: 30px 0px; display: flex; flex-direction: column; align-items: center;">
                    <img src="data:image/png;base64,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" alt="" style="width: 150px; margin-bottom: 0px;"> <div data-v-481a2f95="" style="text-align: center; height: 20px; line-height: 20px;">暂无数据</div></div>
                </li>
                <li v-else>
                    <el-row>
                        <el-col :span="12">
                          <div class="title">可否选房：</div>
                          <div class="value" v-if="commissionList.isSelectd">{{commissionList.isSelectd==1?'可以':commissionList.isSelectd==2?'不可以':'---'}}</div>
                      </el-col>

                      <el-col :span="24" v-if="commissionList.isSelectd==1">
                        <div class="title">备注：</div>
                        <div class="value" v-html="commissionList.selectHouseRemark?commissionList.selectHouseRemark:'---'"></div>
                      </el-col>

                      <el-col :span="12">
                          <div class="title">可否选择楼层：</div>
                          <div class="value"  v-if="commissionList.floorSelect">{{commissionList.floorSelect==1?'可以':commissionList.floorSelect==2?'不可以':'---'}}</div>
                      </el-col>

                      <el-col :span="12">
                          <div class="title">是否可以知道室友性别：</div>
                          <div class="value" v-if="commissionList.chumSexSelect" >{{commissionList.chumSexSelect==1?'可以':commissionList.chumSexSelect==2?'不可以':'---'}}</div>
                      </el-col>

                      <el-col :span="12">
                          <div class="title">团队订房是否可安排住同一个flat：</div>
                          <div class="value" v-if="commissionList.flatSelect">{{commissionList.flatSelect==1?'可以':commissionList.flatSelect==2?'不可以':'---'}}</div>
                      </el-col>
                      <el-col :span="12">
                          <div class="title">是否接受紧急入住：</div>
                          <div class="value" v-if="commissionList.urgencySelect">{{commissionList.urgencySelect==1?'可以':commissionList.urgencySelect==2?'不可以':'---'}}</div>
                      </el-col>
                      <el-col :span="24">
                        <div class="title">订房流程：</div>
                        <div class="value" v-html="commissionList.reservationProcess?commissionList.reservationProcess:'---'"></div>
                    </el-col>
                    <el-col :span="24">
                        <div class="title">预约看房流程：</div>
                        <div class="value" v-html="commissionList.lookProcess?commissionList.lookProcess:'---'"></div>
                    </el-col>
                    <el-col :span="24">
                        <div class="title">可预订人群：</div>
                        <div class="value" v-html="commissionList.reservationPeople?commissionList.reservationPeople:'---'"></div>
                    </el-col>
                    <el-col :span="24">
                        <div class="title">预定取消政策：</div>
                        <div class="value" v-html="commissionList.cancel?commissionList.cancel:'---'"></div>
                    </el-col>
                    <el-col :span="24">
                        <div class="title">转租政策：</div>
                        <div class="value" v-html="commissionList.sublet?commissionList.sublet:'---'"></div>
                    </el-col>
                    <el-col :span="24">
                        <div class="title">疫情退改政策：</div>
                        <div class="value" v-html="commissionList.specialPolicy?commissionList.specialPolicy:'---'"></div>
                    </el-col>
                    </el-row>
                </li>
            </ul>
            <div class="basicTitle">
                <div class="line"></div>
                <div class="content" style="display:flex;justify-content:space-between">
                  <div>合同信息</div>

                  <div  v-if="contractData.length==0">
                    <el-button
                      size="mini"
                      type="text"
                      icon="el-icon-plus"
                      v-hasPermi="['houseSupplier:supplier:edit']"
                      @click="addCommission()"
                    >新增</el-button>
                  </div>

                  <div v-else>
                    <el-button
                      size="mini"
                      type="text"
                      icon="el-icon-edit"
                      v-hasPermi="['houseSupplier:supplier:edit']"
                      @click="editCommission(contractData.id)"
                    >修改</el-button>
                  </div>
                </div>
            </div>
            <ul>
              <li v-if="contractData.length==0">
                  <div style="padding: 30px 0px; display: flex; flex-direction: column; align-items: center;">
                    <img src="data:image/png;base64,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" alt="" style="width: 150px; margin-bottom: 0px;"> <div data-v-481a2f95="" style="text-align: center; height: 20px; line-height: 20px;">暂无数据</div></div>
                </li>
              <li v-else>
                <el-row>
                  <el-col :span="12">
                        <div class="title">确定合同开始日期：</div>
                        <div class="value" v-if="contractData.contractStartDate">{{contractData.contractStartDate?myparseTime(contractData.contractStartDate):'---'}}</div>
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
                          <span v-if="contractData.paymentType">
                            <span v-for="(item,$index) in supplierType" :key="$index">
                                <span v-for="(item2,$index2) in contractData.paymentType.split(',')" :key="$index2">
                                  {{item2==item.id?item.name+' / ':''}}
                                </span>
                            </span>
                          </span>
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

          </div>
        <!-- <el-button type="primary" icon="el-icon-plus" v-hasPermi="['houseSupplier:supplier:add']"  v-show="commissionList.length==0" @click="addCommission">新增</el-button>  -->
        </div>
      </el-tab-pane>

      <el-tab-pane label="订单信息" name="fourth" v-hasPermi="['houseOrder:order:view']">
        <div class="basicWrapper" v-loading="getOrderListStatus">
            <div class="basicTitle">
                <div class="line"></div>
                <div class="content" style="display:flex;justify-content: space-between;margin-right:20px;">
                    订单信息
                    <!-- <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-circle-plus-outline"
                        @click="addOrderMethod"
                        v-hasPermi="['order:order:edit']"
                    >新增</el-button> -->
                </div>
            </div>
            <div class="order-table">
              <el-table :data="OrdertableData" style="width: 100%">
                  <el-table-column prop="number" label="订单编号" align="center"> </el-table-column>
                  <!-- <el-table-column  prop="currentHouse" label="房源名称" align="center" width="80px"> </el-table-column> -->
                  <!-- <el-table-column  prop="chargePerson" label="负责人" align="center" width="80px"> </el-table-column> -->
                  <el-table-column  label="订单金额" align="center">
                      <template slot-scope="scope">
                          <span v-for="item in currencyTypeData" :key="item.id">
                              <!-- {{ scope.row.symbol==item.id?item.currencyType+"（"+item.currencySymbol+"）":'' }} -->
                              {{ scope.row.symbol==item.id?item.currencySymbol:'' }}
                          </span>
                          <span>{{scope.row.amount}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column  prop="createTime" label="创建时间" align="center"> </el-table-column>
                  <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                      <template slot-scope="scope">
                          <el-button
                              size="mini"
                              type="text"
                              icon="el-icon-view"
                              @click="goOrderPage(scope.row)"
                              v-hasPermi="['houseOrder:order:view']"
                          >查看</el-button>
                      </template>
                  </el-table-column>
              </el-table>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="房源信息" name="fifth">
        <div v-loading="houseDetailsDataLoading">
          <div class="basicWrapper" >
            <div class="basicTitle">
              <div class="line"></div>
              <div class="content" style="display:flex;justify-content:space-between">
                <div>房源基本信息</div>
                <div>
                  <!-- <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-edit"
                    @click="editCommission(item.id,$index)"
                  >修改</el-button> -->
                </div>
              </div>
            </div>
            <ul>
                <li>
                    <el-row>
                        <el-col :span="12">
                            <div class="title">房源名称(中文)：</div>
                            <div class="value" >{{houseDetailsData.name}}</div>
                        </el-col>
                        <el-col :span="12">
                            <div class="title">房源名称(英文)：</div>
                            <div class="value">{{houseDetailsData.nameEn}}</div>
                        </el-col>
                        <el-col :span="12">
                            <div class="title">所属国家：</div>
                            <div class="value" >
                              <span v-for="item in countryRes" :key="item.id">
                                {{houseDetailsData.countryId==item.id?item.nameZh:''}}
                              </span>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="title">所属城市：</div>
                            <div class="value" >
                              <span v-for="item in cityRes" :key="item.id">
                                {{houseDetailsData.cityId==item.id?item.name:''}}
                              </span>
                            </div>
                        </el-col>

                        <el-col :span="12">
                            <div class="title">房源类型：</div>
                            <div class="value">{{houseDetailsData.type==1?'公寓':'民宿'}}</div>
                        </el-col>

                        <el-col :span="12">
                            <div class="title">beds数量：</div>
                            <div class="value">{{houseDetailsData.beds}}</div>
                        </el-col>
                        <el-col :span="24" v-if="houseDetailsData.type==2">
                          <el-col :span="8">
                              <div class="title">房间数量：</div>
                              <div class="value">{{houseDetailsData.bedCount}}</div>
                          </el-col>
                          <el-col :span="8">
                              <div class="title">卫浴数量：</div>
                              <div class="value">{{houseDetailsData.washCount}}</div>
                          </el-col>
                          <el-col :span="8">
                              <div class="title">浴室数量：</div>
                              <div class="value" >{{houseDetailsData.stoolCount}}</div>
                          </el-col>
                        </el-col>
                        <el-col :span="12">
                            <div class="title">供应商名称：</div>
                            <div class="value">
                              <span v-for="item in supplierDataList" :key="item.id">
                                {{houseDetailsData.providerId==item.id?item.name:''}}
                              </span>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="title">房源地址：</div>
                            <div class="value">{{houseDetailsData.address}}</div>
                        </el-col>

                        <el-col :span="24">
                            <div class="title">房源概括(中文)：</div>
                            <div class="value" v-html="houseDetailsData.description"></div>
                        </el-col>
                        <el-col :span="24">
                            <div class="title">房源概括(英文)：</div>
                            <div class="value" v-html="houseDetailsData.descriptionEn"></div>
                        </el-col>
                        <el-col :span="24">
                            <div class="title">住房租房须知(中文)：</div>
                            <div class="value" v-html="houseDetailsData.notice"></div>
                        </el-col>
                        <el-col :span="24">
                            <div class="title">住房租房须知(英文)：</div>
                            <div class="value" v-html="houseDetailsData.noticeEn"></div>
                        </el-col>
                        <el-col :span="24">
                            <div class="title">其他：</div>
                            <div class="value" v-html="houseDetailsData.remark"></div>
                        </el-col>
                    </el-row>
                </li>
            </ul>

            <div class="basicTitle">
              <div class="line"></div>
              <div class="content" style="display:flex;justify-content:space-between">
                <div>标签信息</div>
                <div>
                  <!-- <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-edit"
                    @click="editCommission(item.id,$index)"
                  >修改</el-button> -->
                </div>
              </div>
            </div>
            <ul>
              <li>
                <!-- 获取所选中的标签    分类  （配套设施、安全保障、房源标签、附近学校、附近地点） -->
                <div class="viewLabelWrap">
                  <p>配套设置：</p>
                  <div class="itemContent" v-for="checkLabel in userCheckLabel1" :key="checkLabel.id">
                    <span>{{checkLabel.labelDetalName}}</span>
                  </div>
                  <p>安全保障：</p>
                  <div class="itemContent" v-for="checkLabel in userCheckLabel2" :key="checkLabel.id">
                    <span>{{checkLabel.labelDetalName}}</span>
                  </div>
                  <p>房源标签：</p>
                  <div class="itemContent" v-for="checkLabel in userCheckLabel3" :key="checkLabel.id">
                    <span>{{checkLabel.labelDetalName}}</span>
                  </div>
                  <p>附近学校：</p>
                  <div class="itemContent" v-for="checkLabel in schoolCheckLabel" :key="checkLabel.id">
                    <span>{{checkLabel.labelDetalName}}</span>
                  </div>
                  <p>附近地点：</p>
                  <div class="itemContent" v-for="checkLabel in addressCheckLabel" :key="checkLabel.id">
                    <span>{{checkLabel.labelDetalName}}</span>
                  </div>
                </div>

              </li>
            </ul>
            <div class="basicTitle">
              <div class="line"></div>
              <div class="content" style="display:flex;justify-content:space-between">
                <div>房源视频/照片</div>
                <div>
                  <!-- <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-edit"
                    @click="editCommission(item.id,$index)"
                  >修改</el-button> -->
                </div>
              </div>
            </div>
            <ul>
              <li>
                <div class="viewUrlWrap">
                  <div v-if="userCheckUrl.length!=0">
                    <p style="text-align:left;">房源图片：</p>
                    <div class="itemContent" v-for="checkUrl in userCheckUrl" :key="checkUrl.id">
                      <img :src="serverImgUrl+checkUrl.imgurl" alt="">
                    </div>
                  </div>

                  <div v-if="userCheckUrl2.length!=0">
                    <p style="text-align:left;">房源视频：</p>
                    <div class="itemContent" v-for="checkUrl in userCheckUrl2" :key="checkUrl.id">
                      <img style="cursor: pointer;" src="https://www.inyihome.com/videofile.png" alt="" @click="viewVideo(checkUrl)">
                    </div>
                  </div>

                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="佣金信息" name="sixth">
        <commission-component ref="commissionComponent" current-type="2" :current-id="commissionId" />
      </el-tab-pane>


    </el-tabs>


    <el-dialog title="负责人信息" :visible.sync="dialogFormVisible" width="600px" append-to-body>
      <el-form :model="form" label-width="149px" :rules="contactRules" ref="form">
          <el-form-item label="负责人姓名："  prop="name">
              <el-input v-model="form.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="邮件："  prop="email">
              <el-input v-model="form.email" clearable></el-input>
          </el-form-item>
          <el-form-item label="电话："  prop="phone">
              <el-input v-model="form.phone" clearable></el-input>
          </el-form-item>
          <el-form-item label="WeChat/Whatsapp："  prop="chat">
              <el-input v-model="form.chat" clearable></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitFormData('form')">确 定</el-button>
      </div>
  </el-dialog>

  <el-dialog title="修改其他信息" :visible.sync="otherStatus" width="800px" append-to-body>
    <el-form :model="otherForm" label-width="158px" :rules="otherFormRules" ref="otherForm">
      <el-form-item label="可否选房" prop="isSelectd">
                        <el-select v-model="otherForm.isSelectd" placeholder="请选择" style="width:100%;">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="2"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="备注" prop="selectHouseRemark" v-if="otherForm.isSelectd==1">
                        <vue-ueditor-wrap v-model="otherForm.selectHouseRemark" :key="79"></vue-ueditor-wrap>
                    </el-form-item>

                    <el-form-item label="是否选择楼层" prop="floorSelect">
                        <el-select v-model="otherForm.floorSelect" placeholder="请选择" style="width:100%;">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否可以知道室友性别" prop="chumSexSelect">
                        <el-select v-model="otherForm.chumSexSelect" placeholder="请选择" style="width:100%;">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="团队订房是否可安排住同一个flat" prop="flatSelect">
                        <el-select v-model="otherForm.flatSelect" placeholder="请选择" style="width:100%;">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否接受紧急入住" prop="urgencySelect">
                        <el-select v-model="otherForm.urgencySelect" placeholder="请选择" style="width:100%;">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="订房流程"  prop="reservationProcess">
                        <!-- <Editor v-model="processForm.reservationProcess" /> -->
                        <vue-ueditor-wrap v-model="otherForm.reservationProcess" :config="myConfig" :key="6"></vue-ueditor-wrap>
                    </el-form-item>
                    <el-form-item label="预约看房流程" prop="lookProcess">
                        <!-- <Editor v-model="processForm.lookProcess" /> -->
                        <vue-ueditor-wrap v-model="otherForm.lookProcess" :config="myConfig" :key="7"></vue-ueditor-wrap>
                    </el-form-item>
                    <el-form-item label="可预订人群" prop="reservationPeople">
                        <!-- <Editor v-model="processForm.reservationPeople" /> -->
                        <vue-ueditor-wrap v-model="otherForm.reservationPeople" :config="myConfig" :key="8"></vue-ueditor-wrap>
                    </el-form-item>
                    <el-form-item label="预定取消政策" prop="cancel">
                        <!-- <Editor v-model="processForm.cancel" /> -->
                        <vue-ueditor-wrap v-model="otherForm.cancel" :key="10" :config="myConfig"></vue-ueditor-wrap>
                    </el-form-item>
                    <el-form-item label="转租政策" prop="sublet">
                        <!-- <Editor v-model="processForm.sublet" /> -->
                        <vue-ueditor-wrap v-model="otherForm.sublet" :key="11" :config="myConfig"></vue-ueditor-wrap>
                    </el-form-item>
                    <el-form-item label="疫情退改政策" prop="specialPolicy">
                        <!-- <Editor v-model="processForm.specialPolicy" /> -->
                        <vue-ueditor-wrap v-model="otherForm.specialPolicy" :key="12" :config="myConfig"></vue-ueditor-wrap>
                    </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="otherStatus = false">取 消</el-button>
        <el-button type="primary" @click="OtherSubmitFormData('otherForm')">确 定</el-button>
    </div>
  </el-dialog>

  <el-dialog title="合同修改" :visible.sync="commissionStatus" width="800px" append-to-body>
      <el-form :model="commissionForm" label-width="158px" :rules="commissionRules" ref="commissionForm">


          <el-form-item label="确定合同开始日期" prop="contractStartDate">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="commissionForm.contractStartDate" clearable style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="确定合同结束日期" prop="contractEndDate">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="commissionForm.contractEndDate" clearable style="width: 100%;"></el-date-picker>
          </el-form-item>

          <el-form-item label="合同签订日期" prop="contractDate">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="commissionForm.contractDate" clearable style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="合同有效期（天）" prop="contractValid">
              <el-input type="number" v-model="commissionForm.contractValid" placeholder="请输入合同有效期（天）" clearable></el-input>
          </el-form-item>
          <el-form-item label="付款方式" prop="paymentType">
              <el-select v-model="commissionForm.paymentType" multiple placeholder="请选择付款方式" style="width:100%;" >
                  <el-option
                      v-for="item in supplierType"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="付款计划" prop="paymentPlan">
              <vue-ueditor-wrap v-model="commissionForm.paymentPlan" :config="myConfig" :key="91"></vue-ueditor-wrap>
          </el-form-item>
          <el-form-item label="佣金方案" prop="commission">
              <vue-ueditor-wrap v-model="commissionForm.commission" :config="myConfig" :key="41"></vue-ueditor-wrap>
          </el-form-item>

          <el-form-item label="佣金支付周期" prop="paymentCycle">
              <vue-ueditor-wrap v-model="commissionForm.paymentCycle" :config="myConfig" :key="51"></vue-ueditor-wrap>
          </el-form-item>


          <el-form-item label="需缴纳的款项金额" prop="paymentAmount">
              <vue-ueditor-wrap v-model="commissionForm.paymentAmount" :config="myConfig" :key="61"></vue-ueditor-wrap>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="commissionStatus = false">取 消</el-button>
          <el-button type="primary" @click="CommissionSubmitFormData('commissionForm')">确 定</el-button>
      </div>
  </el-dialog>



    <!-- 新增或编辑单间 -->
    <el-drawer
      title="新增或编辑单间"
      size="880px"
      custom-class="addEditRoom"
      :visible.sync="addEditRommStatus"
      :append-to-body="true"
      :before-close="DrawerClose">
      <div v-if="addEditRommStatus">
        <Add-room
          :current-type="addOrEdit"
          :current-houseid="currntHouseId"
          :current-roomid="currentRoomID"
          @on-result-change="onResultChange"
        />
      </div>
    </el-drawer>

    <!-- 格式化租期 -->
    <el-drawer
      title="格式化租期"
      size="880px"
      custom-class="addEditRoom"
      :visible.sync="leaseperiodStatus"
      :append-to-body="true"
      :before-close="DrawerClose">
      <div v-if="leaseperiodStatus">
        <leaseperiod-list
          :current-type="addOrEdit"
          :current-houseid="currntHouseId"
          :current-roomid="currentRoomID"
          @on-result-change="onResultChange"
        />
      </div>
    </el-drawer>

    <!-- 订单新增 -->

    <el-drawer
        :title="titleName"
        :visible.sync="addOrderStatus"
        custom-class="userOrderWrapper"
        :append-to-body="true"
        direction="ttb">
        <div class="user-wrapper" v-if="addOrderStatus" style="display:flex;">
            <div style="flex:1;background-color:#fff;margin:16px;margin-bottom:0;">
                <add-orderc v-if="addOrderStatus" ref="infoS" :order-info="orderInfo" :info-status="false"></add-orderc>
            </div>
            <div style="flex:1;background-color:#fff;margin:16px;margin-bottom:0;margin-left:0;padding-left:16px;">
              <user-list  v-if="addOrderStatus" ref="userS" :order-user="currentOrderUser" :user-status="userStatus"></user-list>
            </div>
        </div>
        <div class="demo-drawer__footer" style="text-align:center;padding:16px 0;">
            <el-button @click="addOrderStatus = false">取 消</el-button>
            <el-button type="primary" @click="createdHouseOrder" :loading="buttonLoading">{{ buttonLoading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
    </el-drawer>


    <!-- 显示订单 -->
    <el-dialog title="选择单间" :visible.sync="showRoomStatus" :append-to-body="true" width="500px">
      <el-form :model="chooseRoomForm" ref="chooseRoomForm">
        <el-form-item label="当前房源单间" prop="roomData"
          :rules="[
            { required: true, message: '请选择单间', trigger: 'change' }
          ]"
        >
          <el-select v-model="chooseRoomForm.roomData" placeholder="请选择单间" clearable style="width:100%;">
            <el-option
              v-for="item in Roomoptions"
              :key="item.id"
              :label="item.name"
              :value="item.name+','+item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showRoomStatus = false">取 消</el-button>
        <el-button type="primary" @click="chooseRoomMethod('chooseRoomForm')">确 定</el-button>
      </div>
    </el-dialog>




  </section>
</template>

<script>
import { listRoom ,getHouseDetail } from "@/api/rent/house";
import {
  roomPutaway,
  roomSoldOut,
  roomGiveUp,
  editRoomAPI
} from "@/api/rent/room";
import AddRoom from "@/components/AddRoom";
import leaseperiodList from "@/components/leaseperiodList";
import { listDetail } from "@/api/home/detail";
import {listSupplier,addSupplierContact,updateSupplierContact,getSupplierContact,delSupplierContact,getContactDetails } from "@/api/supplier";
import { listCommission,addCommissionMethods,getCommissionMethods,updateCommission,listHouseSync,updateHouseSync,getHouseSync,addHouseSync } from "@/api/commission/commission";

import { listOrder, addOrder, updateOrder,getOrder } from "@/api/order/order";
import { listCountry } from '@/api/home/country';

import Editor from '@/components/Editor'
import VueUeditorWrap from '@/components/UE';

import addOrderc from "@/components/Order/OrderInfo";

import userList from "@/components/Order/User";

import commissionComponent from "@/components/commission";

export default {
  props: {
    houseId: {
      type: Number
    },

    searchTime: {
      type: ""
    },
    apartmentType: {
      type: Array
    },
    batroomTypeParent: {
      //type: Number
    },
    currentHouseName: {
      type:String
    }
  },
  components: {
    AddRoom,Editor,VueUeditorWrap,addOrderc,userList,commissionComponent,leaseperiodList
  },
  data() {
    return {
      commissionId:null,
      titleName:'',
      addOrderStatus:false,
      buttonLoading:false,
      orderInfo:{},
      currentOrderUser:{},
      userStatus:false,

      Roomoptions:[],
      showRoomStatus:false,
      chooseRoomForm:{},
      getOrderListStatus:false,



      myConfig:{
          autoHeightEnabled: false,
          initialFrameHeight: 200,
          initialFrameWidth: '100%',
      },
      houseName:this.currentHouseName,
      activeName: "first",
      currntHouseId: this.houseId,
      roomLoading: true,
      roomList: [], // 所有房源信息
      // 设置查询参数
      queryParams: {
        houseId: this.houseId
      },
      addEditRommStatus: false,
      leaseperiodStatus: false,
      //当前点击的是新增还是编辑
      addOrEdit: "",
      currentRoomID: undefined,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      type: [],
      type2: [],
      apartment: this.apartmentType ? this.apartmentType : [],
      batroomType: this.batroomTypeParent ? this.batroomTypeParent : "",
      time: this.searchTime ? this.searchTime : "",

      //联系人列表
      contactLoading:true,
      isAdd:true,
      contactList:[],
      dialogFormVisible:false,
      form:{
          name:'',
          email:'',
          phone:'',
          chat:'',
          type:'2',
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

      //佣金
      commissionLoading:true,
      isAddCommission:true,
      commissionList:[],
      commissionStatus:false,
      commissionForm:{
          commission:'',
          paymentCycle:'',
          commissionMin:'',
          serviceFee:'',
      },
      commissionRules:{
          // commission: [
          //     { required: true, message: '请输入佣金', trigger: 'blur' },
          // ],
          // paymentCycle: [
          //     { required: true, message: '请输入佣金支付周期', trigger: 'blur' },
          // ],
          // commissionMin: [
          //     { required: true, message: '请输入预计最低合同租金', trigger: 'blur' },
          // ],
          // serviceFee: [
          //     { required: true, message: '请输入服务费（人民币）', trigger: 'blur' },
          // ],
      },
      OrdertableData:[],
      currencyTypeData:[],
      supplierType:[],//付款方式
      houseDetailsDataLoading:false,
      houseDetailsData:{},//房源的详情信息
      userCheckLabel:[],//房源中的label信息
      userCheckLabel1:[],
      userCheckLabel2:[],
      userCheckLabel3:[],
      addressCheckLabel:[],
      schoolCheckLabel:[],
      countryRes:[],
      cityRes:[],
      supplierDataList:[],

      userCheckUrl:[],
      userCheckUrl2:[],

      contractData:[],//合同信息


       otherStatus:false,
       otherForm:{},
       otherFormRules:{}

    };
  },
  watch: {
    houseId(newV, oldV) {
      this.currntHouseId = newV;
      this.queryParams.houseId = newV;
      console.log("新:" + newV, "旧：" + oldV);
      if (newV != oldV) {
        this.getRoom();
      }
    },
    currentHouseName(newV, oldV){
      this.houseName = newV
    },
    searchTime(newV, oldV) {
      if (newV) {
        this.time = newV;
      }
    },

    apartmentType(newV, oldV) {
      if (newV) {
        this.apartment = newV;
      }
    },
    batroomTypeParent(newV, oldV) {
      if (newV) {
        this.batroomType = newV;
      }
    }
  },
  created() {

    this.countryRes = JSON.parse(localStorage.getItem('YIHOME_country'));
    this.cityRes = JSON.parse(localStorage.getItem('YIHOME_city'));

    //this.getRoom()
    listDetail({ labelId: 17 }).then(response => {
      console.log(response);
      this.type = response.rows;
    });
    listDetail({ labelId: 16 }).then(response => {
      console.log(response);
      this.type2 = response.rows;
    });
    //如果首次进来有参数
    this.handleQuery();

    console.log(this.batroomTypeParent);

    this.getSupplierType()




  },
  methods: {
    goOrderPage(row){
      console.log(row)
      this.$router.push({path:'/Order/order',query: { number: row.number }})
    },
    getSupplierType(){
        var list = JSON.parse(localStorage.getItem('YIHOME_user_type'))

            list.forEach(element => {
                if(element.parentId==31){
                    this.supplierType.push(element)
                }
            });

    },
    getOrderList(){
        //获取当前用户的订单
        listOrder({houseId:this.queryParams.houseId}).then(response => {
          this.OrdertableData = response.data.list;


          this.OrdertableData.forEach(el=>{
            this.$set(el, 'currentHouse', this.houseName)
            // if(!el.currentHouse){
            //   el[currentHouse] = this.userData.nameCh;
            // }
          })
        });
        //获取货币类型
        listCountry().then(res=>{
            this.currencyTypeData = res.rows;
        })
    },
    addCommission(){
      this.isAddCommission = true;
      this.commissionReset();
      this.commissionStatus = true;
    },
    //获取合同
    getcommissionList(){
      this.commissionLoading = true,
      listCommission({houseId:this.queryParams.houseId}).then(res=>{
        this.commissionLoading = false;
        if(res.rows.length>0){
          this.contractData = res.rows[0]
        }

      }).catch(e=>{
        this.commissionLoading = false;
        alert(e)
      })


      //在合同里面获取佣金
      listHouseSync({houseId:this.queryParams.houseId}).then(res=>{
        this.commissionLoading = false;
        if(res.rows.length>0){
          this.commissionList = res.rows[0];
        }
      }).catch(e=>{
        this.commissionLoading = false;
        alert(e)
      })
    },



    commissionReset(){
      this.commissionForm = {
          commission:undefined,
          paymentCycle:undefined,
          commissionMin:undefined,
          serviceFee:undefined,
          houseId:this.queryParams.houseId,
      }
      this.resetForm('commissionForm')
    },

    reset() {
        this.form = {
            name: undefined,
            email: undefined,
            phone: undefined,
            chat: undefined,
            type:'2',
            masterId:this.queryParams.houseId,
        }
        this.resetForm('form')
    },
    addContact(){
      this.isAdd = true;
        this.reset();
        this.dialogFormVisible = true;
    },
    //编辑当前联系人
    editContact(id,index){
      this.isAdd = false;
        getContactDetails(id).then(res=>{
            if(res.code===200){
                this.reset();
                this.dialogFormVisible = true;
                this.form = res.data;
            }else{
                this.msgError(res.msg)
            }
        })

    },
    // 编辑其他信息
    editOther(id){
      //updateHouseSync()
      getHouseSync(id).then(res=>{
        if(res.code===200){
          this.resetForm('otherForm')
          this.otherStatus = true;
          this.otherForm = res.data;
        }
      })
    },
    addOther(){
      this.resetForm('otherForm')
      this.otherStatus = true;
    },
    //编辑 佣金
    editCommission(id){
      this.isAddCommission = false;
      getCommissionMethods(id).then(res=>{
        if(res.code===200){
            this.commissionReset();
            this.commissionStatus = true;
            this.commissionForm = res.data;
            if(this.commissionForm.paymentType){
              this.commissionForm.paymentType.split(',').forEach(el=>{
                el = parseInt(el)
              })

            }

        }else{
            this.msgError(res.msg)
        }
      })
    },
    CommissionSubmitFormData(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          if(this.isAddCommission){
            addCommissionMethods(this.commissionForm).then(res=>{
              this.commissionStatus = false;
              if(res.code===200){
                this.getcommissionList();
              }else{
                  this.msgError(res.msg)
              }
            })
          }else{
            this.commissionForm.paymentType = this.commissionForm.paymentType.join(',')
            updateCommission(this.commissionForm).then(res=>{
              this.commissionStatus = false;
              if(res.code===200){
                this.getcommissionList();
              }else{
                  this.msgError(res.msg)
              }
            })
          }
        }
      })
    },
    OtherSubmitFormData(formName){
      if(this.otherForm.id){
        updateHouseSync(this.otherForm).then(res=>{
          this.otherStatus = false;
          if(res.code===200){
            this.getcommissionList();
          }else{
              this.msgError(res.msg)
          }
        })
      }else{
        this.otherForm.houseId = this.currntHouseId;
        addHouseSync(this.otherForm).then(res=>{
          this.otherStatus = false;
          if(res.code===200){
            this.getcommissionList();
          }else{
              this.msgError(res.msg)
          }
        })
      }

    },
    submitFormData(formName){
        this.$refs[formName].validate((valid) => {
            if (valid) {
              if(this.isAdd){
                addSupplierContact(this.form).then(res=>{
                    this.dialogFormVisible = false;
                    if(res.code===200){
                      this.getContact();
                    }else{
                        this.msgError(res.msg)
                    }
                })
              }else{
                updateSupplierContact(this.form).then(res=>{
                    this.dialogFormVisible = false;
                    if(res.code===200){
                        this.getContact();
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
                      this.getContact();
                  }
              })
          }).catch(() => {

          });


      },
    handleTabsClick(tab,event){
      if(tab.paneName=="second"){
        //获取联系人
        this.getContact()
      }else if(tab.paneName=="third"){
        this.getcommissionList()
      }else if(tab.paneName=="fourth"){
        this.getOrderList()
      }else if(tab.paneName=="fifth"){
        this.houseDetails()
      }else if(tab.paneName=="sixth"){
        this.commissionId = this.currntHouseId;
        setTimeout(()=>{
          this.$refs.commissionComponent.getList();
        },10)
      }
    },
    //获取房源详情信息
    houseDetails(){
      this.houseDetailsDataLoading = true;
      getHouseDetail(this.currntHouseId).then(res => {
        this.houseDetailsDataLoading = false;
        this.houseDetailsData= res.data.house;


        //获取选中的label  分类  1.标签  2.学校 3.学校

        const checkAll = res.data.lables;
        checkAll.forEach(el=>{
          if(el.type==1){
            this.userCheckLabel.push(el)
          }
          if(el.type==2){
            this.schoolCheckLabel.push(el)
          }
          if(el.type==3){
            this.addressCheckLabel.push(el)
          }
        });

        //再次循环this.userCheckLabel
        this.userCheckLabel.forEach(el=>{
          if(el.labelTypeId==2){//配套设施
            this.userCheckLabel1.push(el)
          }
          if(el.labelTypeId==3){//安全保障
            this.userCheckLabel2.push(el)
          }
          if(el.labelTypeId==15){//房源标签
            this.userCheckLabel3.push(el)
          }
        });


        res.data.urls.forEach(el=>{
          if(el.type==1){
            this.userCheckUrl.push(el)
          }
          if(el.type==2){
            this.userCheckUrl2.push(el)
          }
        });



      }).catch(e=>{
        this.houseDetailsDataLoading = false;
      })

      listSupplier().then(response => {
        this.supplierDataList = response.rows;
      });
    },





    getContact(){
      this.contactLoading = true,
      getSupplierContact({masterId:this.queryParams.houseId,type:2}).then(res=>{
        this.contactLoading = false,
        console.log(res)
        if(res.code===200){
          this.contactList = res.rows
        }else{
          this.msgError(res.msg);
        }
      })
    },
    handleQuery() {
      console.log(this.queryParams);

      if (this.time) {
        this.queryParams.roomOnhireStart = this.time[0];
        this.queryParams.roomOnhireEnd = this.time[1];
      } else {
        this.queryParams.roomOnhireStart = undefined;
        this.queryParams.roomOnhireEnd = undefined;
      }
      let labelDto = [];
      // 户型选择
      // let a = {
      //   "labels":this.apartment,
      //   "lableId": 17
      // }
      // //卫浴类型
      // let b ={
      //   "labels":this.batroomType,
      //   "lableId": 16
      // }

      // if(this.apartment.length!=0){
      //   labelDto.push(a)
      // }
      // if(this.batroomType.length!=0){
      //   labelDto.push(b)
      // }

      let pushData = [];
      if (this.batroomType) {
        pushData.push(this.batroomType);
      }
      if (this.apartment.length != 0) {
        pushData = pushData.concat(this.apartment);
      }
      if (pushData.length != 0) {
        labelDto.push({ labels: pushData });
      }

      if (labelDto.length != 0) {
        this.queryParams.labelDto = labelDto;
      } else {
        this.queryParams.labelDto = undefined;
      }
      this.getRoom();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.time = [];
      this.apartment = [];
      this.batroomType = undefined;
      this.queryParams = {
        houseId: this.houseId
      };
      this.handleQuery();
    },
    onResultChange(val) {
      console.log(val);
      this.addEditRommStatus = val;
      if (!this.addEditRommStatus) {
        this.getRoom();
      }
    },
    // 获取单间信息
    getRoom() {
      this.roomLoading = true;
      listRoom(this.queryParams).then(response => {
        console.log(response);
        response.data.forEach(item => {
          item.isCheckCell = false;
        });
        this.roomList = response.data;
        this.roomLoading = false;
      });
    },
    handleSelectionChange() {},
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
    handleAddRoom(paramsType, data) {
      this.addEditRommStatus = true;
      this.addOrEdit = paramsType;
      if (data) {
        this.currentRoomID = data.id;
      } else {
        this.currentRoomID = undefined;
      }
    },
    leaseperiodPro(paramsType, data) {

      console.log("leaseperiodPro", data)
      this.leaseperiodStatus = true;
      if (data) {
        this.currentRoomID = data.id;
      } else {
        this.currentRoomID = undefined;
      }
    },
    //点击row查看单间详情
    clickRoomRow(row) {},
    //单间状态
    updateRoom(row, data) {
      console.log(row, data);
      if (data == 1) {
        roomPutaway({ id: row.id }).then(res => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "修改成功"
            });
            this.getRoom();
          }
        });
      } else if (data == 2) {
        roomSoldOut({ id: row.id }).then(res => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "修改成功"
            });
            this.getRoom();
          }
        });
      } else {
        roomGiveUp({ id: row.id }).then(res => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "修改成功"
            });
            this.getRoom();
          }
        });
      }
    },
    dblHandleCell(row, column, cell, event) {
      console.log(column.label);
      if (column.label == "排序") {
        row.isCheckCell = !row.isCheckCell;
      }
    },
    inputBlur(row) {
      row.isCheckCell = !row.isCheckCell;
      editRoomAPI(row).then(res => {
        if (res.code === 200) {
          this.getRoom();
          this.$message({
            message: "操作成功！",
            type: "success"
          });
        }
      });
    },
    //新增订单
    addOrderMethod(){

      this.$confirm('为当前房源创建订单，需要选择当前房源中的单间', '提示', {
        confirmButtonText: '我知道',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.showRoomStatus = true;
        this.resetForm('chooseRoomForm')
        listRoom({houseId: this.houseId}).then(response => {
          console.log(response);
          this.Roomoptions = response.data
        });

      }).catch(() => {

      });

    },
    chooseRoomMethod(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.showRoomStatus = false;
            this.titleName = "新增订单"
            this.addOrderStatus = true;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    createdHouseOrder(){//订单提交
      var orderStatus = this.$refs.infoS.submitForm()
      if(!orderStatus){
          this.$message({
              message: '请填写订单信息',
              type: 'warning'
          });
          return;
      }

      if(this.$refs.userS.userList.length==0){
          this.$message({
              message: '请选择关联用户',
              type: 'warning'
          });
          return;
      }

      console.log(this.chooseRoomForm.roomData)//房源名称  房源id

      let obj ={
          order:this.$refs.infoS.ruleForm,
          orderRooms:[
            {
              "houseId": this.houseId,
              "houseName": this.houseName,
              'roomId':this.chooseRoomForm.roomData.split(',')[1],
              'roomName':this.chooseRoomForm.roomData.split(',')[0],
            }
          ],
          orderUsers:this.$refs.userS.userList,
      }
      this.getOrderListStatus = true;
      addOrder(obj).then(res=>{
        this.getOrderListStatus = false;
          if(res.code==200){
            this.addOrderStatus = false;
             this.getOrderList()
          }else{
            this.msgError(res.msg);
          }
      }).catch(e=>{
        this.getOrderListStatus = false;
      })

    },
    viewVideo(item){
      console.log(item)
      window.open(this.serverImgUrl+item.imgurl)
    }
  }
};
</script>
<style scoped>
.basicWrapper{
        padding: 16px;
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
        width: 154px;
        padding-right: 10px;
        color: #999;
        text-align: left !important;
    }
    .basicWrapper ul li .el-col .value{
        word-break: break-all;
        flex: 1;
    }
    /* .viewLabelWrap {
      display: flex;
    } */
    .viewLabelWrap .itemContent{
      display: inline-block;
      box-shadow: 0px 0 0 0 #74bcff;
      border: 1px solid #DCDFE6;
      outline: none;
      border-radius: 4px;
      color: #fff;
      background-color: #1890ff;
      margin-right: 8px;
      margin-bottom: 8px;
      padding: 10px 20px;
    }
    .viewUrlWrap{
      text-align: center;
    }
    .viewUrlWrap .itemContent{
      display: inline-block;
    }
    .viewUrlWrap img{
      width: 134px;
      height: 134px;
      margin-right: 8px;
      margin-bottom: 8px;
    }
</style>
<style>
.el-drawer__body {
  overflow: auto;
}
.addEditRoom .el-drawer__header {
  padding-bottom: 20px;
  margin-bottom: 0;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(233, 233, 233, 1);
}
.userOrderWrapper{
     height: 100vh !important;
  }
  .userOrderWrapper .el-drawer__body{
   overflow: auto;
   background: #eff3f5;
  }
  .recordWrapper .el-drawer__body{
    overflow: auto;
  }
  .userOrderWrapper .el-drawer__body .user-wrapper{
    /* margin: 16px; */
    min-height: 95%;
    /* background-color: #fff;
    border-radius: 4px; */
    position: relative;
  }

  .userOrderWrapper .el-drawer__header,.recordWrapper .el-drawer__header{
    margin-bottom: 20px;
  }
</style>
