<template>
  <!-- 房源新增组件-->
  <section class="addHouseW">
    <!-- <h1>fangyuan</h1> -->
    <div style="padding:16px 24px;margin-bottom:16px;background-color:#fff;border-radius: 4px;display:flex;justify-content: space-between;">
      <h1 style="margin:0;font-size: 18px;color: rgba(0,0,0,0.85);font-family: PingFangSC-Medium;">{{titleName}}</h1>
      <!-- <el-button v-hasPermi="['home:house:add']" type="danger" icon="el-icon-circle-close" size="mini" @click="handleHouseClose"
    >关闭新增</el-button> -->
      <el-button style="width:60px;height:32px;" size="mini" @click="handleHouseClose(1)">关闭</el-button>
    </div>

    <div style="background-color:#fff;padding-top:32px;border-radius: 4px;">
      <el-steps :active="stepActive"  align-center>
        <el-step title="基础信息" @click.native="on_step(1)" />

        <el-step v-if="$route.query.supplierId" title="联系人信息" @click.native="on_step(2)" />
        <el-step v-if="$route.query.supplierId" title="其他信息" @click.native="on_step(3)" />

        <el-step v-if="!$route.query.supplierId" title="标签信息" @click.native="on_step(2)" />
        <el-step v-if="!$route.query.supplierId" title="视频/照片" @click.native="on_step(3)" />

        <el-step title="添加单间" @click.native="on_step(4)" />
      </el-steps>
      <div class="step-container">
        <el-form ref="addHouseForm" :model="addHouseForm" :rules="addHouseRules" label-width="150px" class="addHouseForm">
          <div v-show="stepActive==1" style="max-width: 800px;margin-top:30px;">

            <el-form-item style="display: none;">
              <el-input v-model="addHouseForm.id" />
            </el-form-item>

            <el-form-item label="房源名称(中文):" prop="name">
              <el-input ref="customerInput" v-model="addHouseForm.name" clearable placeholder="请输入房源中文名称"/>
            </el-form-item>
            <el-form-item label="房源名称(英文):" prop="nameEn" >
              <el-input v-model="addHouseForm.nameEn" clearable placeholder="请输入房源英文名称"/>
            </el-form-item>
            <el-form-item label="所属国家:" prop="countryId">
              <el-select v-model="addHouseForm.countryId" placeholder="请选择国家" style="width: 100%;" @change="selectCountryChange" clearable>
                <el-option
                  v-for="item in countryArry"
                  :key="item.id"
                  :label="item.nameZh"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item ref="cityValue" label="所属城市:" prop="cityId" class="cityLabel">
              <el-select v-model="addHouseForm.cityId" placeholder="请选择城市" style="width: 100%;" @change="selectCityChange" clearable>
                <el-option
                  v-for="item in cityArry"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="房源类型：" prop="type"> <!-- 1 公寓  2 民宿 -->
              <el-select v-model="addHouseForm.type" placeholder="请选择房源类型" style="width: 100%;" clearable>
                <el-option label="公寓" value="1" />
                <el-option label="民宿" value="2" />
              </el-select>
            </el-form-item>

            <el-form-item v-if="addHouseForm.type==2" label="几室几卫几浴">
              <el-col :span="8">
                <el-form-item label="" prop="bedCount">
                  <el-input v-model="addHouseForm.bedCount" placeholder="请输入房间数量" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="" prop="washCount">
                  <el-input v-model="addHouseForm.washCount" placeholder="请输入卫浴数量" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="" prop="stoolCount">
                  <el-input v-model="addHouseForm.stoolCount" placeholder="请输入浴室数量" clearable/>
                </el-form-item>
              </el-col>
            </el-form-item>

            <el-form-item label="供应商：" prop="providerId">
              <el-select v-model="addHouseForm.providerId" filterable placeholder="请选择或搜索供应商" style="width: 100%;" clearable>
                <el-option
                  v-for="item in supplierDataList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <!-- <el-input v-model="addHouseForm.providerUrl" /> -->
            </el-form-item>

            <el-form-item label="地址：" prop="address">
              <el-input v-model="addHouseForm.address" clearable placeholder="请输入房源地址"/>
            </el-form-item>

            <el-form-item label="经度：" prop="longitude">
              <el-input v-model="addHouseForm.longitude" clearable placeholder="请输入房源地址经度"/>
            </el-form-item>

            <el-form-item label="纬度：" prop="latitude">
              <el-input v-model="addHouseForm.latitude" clearable placeholder="请输入房源地址纬度"/>
            </el-form-item>

            <!-- 新增 -->
            <el-form-item label="beds数量：" prop="beds">
              <el-input v-model="addHouseForm.beds" clearable placeholder="请输入房源beds数量"/>
            </el-form-item>
            <!-- <el-form-item label="总床位数：" prop="address">
              <el-input v-model="addHouseForm.address" />
            </el-form-item>
            <el-form-item label="可预订人群：" prop="address">
              <el-input v-model="addHouseForm.address" />
            </el-form-item>
            <el-form-item label="需缴纳的款项金额/合同及截止时间：" prop="address">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="addHouseForm.startDate" clearable style="width: 100%;"></el-date-picker>
            </el-form-item>

            <el-form-item label="付款方式：" prop="type">
              <el-select v-model="addHouseForm.type" placeholder="请选择房源类型" style="width: 100%;">
                <el-option label="公寓" value="1" />
                <el-option label="民宿" value="2" />
              </el-select>
            </el-form-item>

            <el-form-item label="可否选择楼层：" prop="type">
              <el-select v-model="addHouseForm.type" placeholder="请选择房源类型" style="width: 100%;">
                <el-option label="可以" value="1" />
                <el-option label="不可以" value="2" />
              </el-select>
            </el-form-item>

            <el-form-item label="是否可以知道室友的性别：" prop="type">
              <el-select v-model="addHouseForm.type" placeholder="请选择房源类型" style="width: 100%;">
                <el-option label="可以" value="1" />
                <el-option label="不可以" value="2" />
              </el-select>
            </el-form-item>

            <el-form-item label="团队订房是否可安排住同一个flat：" prop="type">
              <el-select v-model="addHouseForm.type" placeholder="请选择房源类型" style="width: 100%;">
                <el-option label="可以" value="1" />
                <el-option label="不可以" value="2" />
              </el-select>
            </el-form-item>

            <el-form-item label="是否接受紧急入住：" prop="type">
              <el-select v-model="addHouseForm.type" placeholder="请选择房源类型" style="width: 100%;">
                <el-option label="可以" value="1" />
                <el-option label="不可以" value="2" />
              </el-select>
            </el-form-item>

            <el-form-item label="付款计划：" prop="address">
              <Editor v-model="addHouseForm.description" />
            </el-form-item>
            <el-form-item label="转租政策：" prop="address">
              <Editor v-model="addHouseForm.description" />
            </el-form-item>
            <el-form-item label="预定取消政策：" prop="address">
              <Editor v-model="addHouseForm.description" />
            </el-form-item>
            <el-form-item label="疫情退改政策：" prop="address">
              <Editor v-model="addHouseForm.description" />
            </el-form-item> -->
            <!-- 新增结束 -->

            <el-form-item label="房源概括(中文)：" prop="description">
              <!-- <Editor v-model="addHouseForm.description" /> -->
              <vue-ueditor-wrap v-model="addHouseForm.description" :config="myConfig" :key="1"></vue-ueditor-wrap>
            </el-form-item>
            <el-form-item label="房源概括(英文)：" prop="descriptionEn">
              <vue-ueditor-wrap v-model="addHouseForm.descriptionEn" :config="myConfig" :key="2"></vue-ueditor-wrap>
              <!-- <Editor v-model="addHouseForm.descriptionEn" /> -->
            </el-form-item>

            <el-form-item label="住房租房须知(中文)：" prop="notice">
              <vue-ueditor-wrap v-model="addHouseForm.notice" :config="myConfig" :key="3"></vue-ueditor-wrap>
              <!-- <Editor v-model="addHouseForm.notice" /> -->
            </el-form-item>

            <el-form-item label="住房租房须知(英文)：" prop="noticeEn">
              <vue-ueditor-wrap v-model="addHouseForm.noticeEn" :config="myConfig" :key="4"></vue-ueditor-wrap>
              <!-- <Editor v-model="addHouseForm.noticeEn" /> -->
            </el-form-item>

            <el-form-item label="其他：" prop="remark">
              <vue-ueditor-wrap v-model="addHouseForm.remark" :config="myConfig" :key="5"></vue-ueditor-wrap>
              <!-- <Editor v-model="addHouseForm.remark" /> -->
            </el-form-item>

          </div>
          <!-- 标签信息 -->
          <div v-show="stepActive==2&&!$route.query.supplierId" >
            <ul class="addlabelWrapper">
              <!-- 标签组合 -->
              <li v-for="(item,$index) in labelData" :key="$index">
                <span>{{ item.labelName }}：</span>
                <el-checkbox-group v-model="selectLabel">
                  <!-- :data-type="list.houseId?'1':'2'"  如果houseId存在 私有的label（1）  如果不存在公有的label（2）  -->
                  <el-checkbox-button
                    v-for="(list,$$index) in item.labelDetails"
                    :key="$$index"
                    :label="list.name+','+list.id+','+list.labelId"
                    :data-type="list.houseId?'1':'2'"
                    @change="checkinlist(item,$index,$$index)"
                  >
                    <template>{{ list.name }}</template>
                    <b v-if="list.houseId" class="removeCheckBox" @click.prevent="removeChoice(list)">×</b>
                  </el-checkbox-button>
                  <el-button type="primary" icon="el-icon-plus" size="mini" style="height: 36px;position: relative;top: 5px;" @click="addCurrentHouseLabel($index,item)">新增</el-button>
                </el-checkbox-group>

              </li>

              <!--附近学校 -->
              <li>
                <span>附近学校：</span>
                <el-checkbox-group v-model="selectSchool">
                  <el-checkbox-button
                    v-for="(item,$index) in schoolData"
                    :key="$index"
                    :label="item.name+','+item.id"
                    :data-type="item.houseId?'1':'2'"
                    @change="checkinSchool(item,$index)"
                  >
                    <template>{{ item.name }}</template>
                    <b v-if="item.houseId" class="removeCheckBox" @click.prevent="removeChoiceSchool(item)">×</b>
                  </el-checkbox-button>
                  <el-button type="primary" icon="el-icon-plus" size="mini" style="height: 36px;position: relative;top: 5px;" @click="addCurrentHouseSchool()">新增</el-button>
                </el-checkbox-group>

              </li>
              <!-- 附近目的地-->
              <li>
                <span>附近地点：</span>
                <el-checkbox-group v-model="selectAddress">
                  <el-checkbox-button
                    v-for="(item,$index) in addressData"
                    :key="$index"
                    :label="item.name+','+item.id"
                    :data-type="item.houseId?'1':'2'"
                    @change="checkinAddress(item,$index)"
                  >
                    <template>{{ item.name }}</template>
                    <b v-if="item.houseId" class="removeCheckBox" @click.prevent="removeChoiceAddress(item)">×</b>
                  </el-checkbox-button>
                  <el-button type="primary" icon="el-icon-plus" size="mini" style="height: 36px;position: relative;top: 5px;" @click="addCurrentHouseAddress()">新增</el-button>
                </el-checkbox-group>
              </li>
            </ul>
          </div>

          <div v-show="stepActive==2&&$route.query.supplierId" style="max-width: 700px;text-align:center;margin:auto;margin-top:32px;">
              <el-form label-width="130px">
                <div v-for="(item,$index) in contactList" :key="$index">
                    <el-form-item label="负责人姓名:">
                        <el-input v-model="item.name" disabled clearable></el-input>
                        <el-button style="position:absolute;margin-left:10px;margin-top:3px;" size="mini" type="text" icon="el-icon-edit" @click="editContact(item.id,$index)">编辑</el-button>
                        <el-button style="position:absolute;margin-left:70px;margin-top:3px;" size="mini" type="text" icon="el-icon-delete" @click="delContact(item.id)">删除</el-button>
                    </el-form-item>
                    <el-form-item label="邮件:">
                        <el-input v-model="item.email" disabled clearable></el-input>
                    </el-form-item>
                    <el-form-item label="电话:">
                        <el-input v-model="item.phone" disabled clearable></el-input>
                    </el-form-item>
                    <el-form-item label="WeChat/Whatsapp:" style="">
                        <el-input v-model="item.chat" disabled clearable></el-input>
                    </el-form-item>
                    <el-form-item >
                        <div style="border-bottom:1px solid #ccc;"></div>
                    </el-form-item>
                </div>
                <el-form-item label="" class="lastItem">
                    <!-- <el-button @click="addContact" style="width:100%;" icon="el-icon-plus">新增</el-button> -->
                    <el-button @click="addContact" style="width:100%;" type="primary" icon="el-icon-plus">新增</el-button>
                </el-form-item>
            </el-form>
          </div>


          <div v-show="stepActive==3&&!$route.query.supplierId">
            <div class="step-uploadWrapper" style="margin-bottom: 32px;margin-top: 32px;">
              <span style="min-width: 80px;">房源图片：</span>
              <div>
                <el-upload
                  :action="uploadImgUrl"
                  :headers="headers"
                  list-type="picture-card"
                  :data="dataparams"
                  multiple
                  :file-list="fileList"
                  :on-preview="handlePictureCardPreview"
                  :on-success="pictureSuccess"
                  :before-remove="pictureBeforeRemove"
                  :before-upload="pictureUpload"
                >
                  <i class="el-icon-plus" />
                </el-upload>
                <el-dialog :visible.sync="uploadPicListStatus">
                  <img width="100%" :src="uploadPicListUrl" alt="">
                </el-dialog>
              </div>
            </div>

            <div class="step-uploadWrapper">
              <span style="min-width: 80px;">房源视频：</span>
              <div>
                <el-upload
                  :action="uploadImgUrl"
                  :headers="headers"
                  list-type="picture-card"
                  :data="dataparams"
                  multiple
                  :file-list="fileList2"
                  :on-preview="handlePictureCardPreview2"
                  :on-success="pictureSuccess2"
                  :before-remove="pictureBeforeRemove2"
                  :before-upload="pictureUpload2"
                >
                  <i class="el-icon-plus" />
                </el-upload>
                <el-dialog :visible.sync="uploadPicListStatus2">
                  <video width="100%" controls v-if="uploadPicListStatus2">
                    <source :src="uploadPicListUrl2" type="video/mp4">
                    <source :src="uploadPicListUrl2" type="video/ogg">
                  </video>
                </el-dialog>
              </div>
            </div>
          </div>


          <div v-show="stepActive==3&&$route.query.supplierId" style="max-width: 900px;text-align:center;margin:auto;margin-top:32px;">
            <el-form :model="processForm"  ref="processForm" label-width="215px">

                    <el-form-item label="可否选房" prop="isSelectd">
                        <el-select v-model="processForm.isSelectd" placeholder="请选择" style="width:100%;">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="2"></el-option>
                        </el-select>
                    </el-form-item>

                    <!-- <el-form-item label="是否选择楼层" prop="floorSelect">
                        <el-select v-model="processForm.floorSelect" placeholder="请选择" style="width:100%;">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="2"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <!-- <el-form-item label="是否可以知道室友性别" prop="chumSexSelect">
                        <el-select v-model="processForm.chumSexSelect" placeholder="请选择" style="width:100%;">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="2"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <!-- <el-form-item label="团队订房是否可安排团队订房是否可安排住同一个flat" prop="flatSelect">
                        <el-select v-model="processForm.flatSelect" placeholder="请选择" style="width:100%;">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="2"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="是否接受紧急入住" prop="urgencySelect">
                        <el-select v-model="processForm.urgencySelect" placeholder="请选择" style="width:100%;">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="合作合同生效日期" prop="contractStartDate">
                        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="processForm.contractStartDate" clearable style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="合作合同失效日期" prop="contractEndDate">
                        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="processForm.contractEndDate" clearable style="width: 100%;"></el-date-picker>
                    </el-form-item>

                    <el-form-item label="合同签订日期" prop="contractDate">
                        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="processForm.contractDate" clearable style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="付款方式" prop="paymentType">
                        <el-select v-model="processForm.paymentType" multiple placeholder="请选择付款方式" style="width:100%;">
                            <el-option
                                v-for="item in supplierType"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="佣金方案" prop="commission">
                        <!-- <Editor v-model="processForm.commission" /> -->
                        <vue-ueditor-wrap v-model="processForm.commission" :config="myConfig" :key="6"></vue-ueditor-wrap>
                    </el-form-item>

                    <el-form-item label="佣金支付周期" prop="paymentCycle">
                        <!-- <Editor v-model="processForm.paymentCycle" /> -->
                        <vue-ueditor-wrap v-model="processForm.paymentCycle" :config="myConfig" :key="7"></vue-ueditor-wrap>
                    </el-form-item>

                    <el-form-item label="订房流程"  prop="reservationProcess">
                        <!-- <Editor v-model="processForm.reservationProcess" /> -->
                        <vue-ueditor-wrap v-model="processForm.reservationProcess" :config="myConfig" :key="8"></vue-ueditor-wrap>
                    </el-form-item>
                    <el-form-item label="预约看房流程" prop="lookProcess">
                        <!-- <Editor v-model="processForm.lookProcess" /> -->
                        <vue-ueditor-wrap v-model="processForm.lookProcess" :config="myConfig" :key="9"></vue-ueditor-wrap>
                    </el-form-item>
                    <el-form-item label="可预订人群" prop="reservationPeople">
                        <!-- <Editor v-model="processForm.reservationPeople" /> -->
                        <vue-ueditor-wrap v-model="processForm.reservationPeople" :config="myConfig" :key="10"></vue-ueditor-wrap>
                    </el-form-item>
                    <el-form-item label="可需缴纳的款项金额" prop="paymentAmount">
                        <!-- <Editor v-model="processForm.paymentAmount" /> -->
                        <vue-ueditor-wrap v-model="processForm.paymentAmount" :config="myConfig" :key="11"></vue-ueditor-wrap>
                    </el-form-item>

                    <el-form-item label="付款计划" prop="paymentPlan">
                        <!-- <Editor v-model="processForm.paymentPlan" /> -->
                        <vue-ueditor-wrap v-model="processForm.paymentPlan" :config="myConfig" :key="12"></vue-ueditor-wrap>
                    </el-form-item>
                    <el-form-item label="预定取消政策" prop="cancel">
                        <!-- <Editor v-model="processForm.cancel" /> -->
                        <vue-ueditor-wrap v-model="processForm.cancel" :config="myConfig" :key="13"></vue-ueditor-wrap>
                    </el-form-item>
                    <el-form-item label="转租政策" prop="sublet">
                        <!-- <Editor v-model="processForm.sublet" /> -->
                        <vue-ueditor-wrap v-model="processForm.sublet" :config="myConfig" :key="14"></vue-ueditor-wrap>
                    </el-form-item>
                    <el-form-item label="疫情退改政策" prop="specialPolicy">
                        <!-- <Editor v-model="processForm.specialPolicy" /> -->
                        <vue-ueditor-wrap v-model="processForm.specialPolicy" :config="myConfig" :key="15"></vue-ueditor-wrap>
                    </el-form-item>

                    <el-form-item label="备注" prop="remark">
                       <!-- <Editor v-model="processForm.remark" /> -->
                       <vue-ueditor-wrap v-model="processForm.remark" :config="myConfig" :key="7"></vue-ueditor-wrap>
                    </el-form-item>

                </el-form>



            <!-- <el-form label-width="130px">
                <div v-for="(item,$index) in commissionList" :key="$index">
                    <el-form-item label="佣金:">

                        <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 5}"
                disabled
                v-model="commissionForm.commission">
              </el-input>
                        <el-button style="position:absolute;margin-left:10px;margin-top:3px;" size="mini" type="text" icon="el-icon-edit" @click="editCommission(item.id,$index)">编辑</el-button>

                    </el-form-item>
                    <el-form-item label="佣金支付周期:">

                        <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 5}"
                disabled
                v-model="commissionForm.paymentCycle">
              </el-input>
                    </el-form-item>
                    <el-form-item label="预计最低合同租金:">

                        <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 5}"
                disabled
                v-model="commissionForm.commissionMin">
              </el-input>
                    </el-form-item>
                    <el-form-item label="服务费（人民币）:" style="">

                        <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 5}"
                disabled
                v-model="commissionForm.serviceFee">
              </el-input>
                    </el-form-item>
                    <el-form-item >
                        <div style="border-bottom:1px solid #ccc;"></div>
                    </el-form-item>
                </div>
                <el-form-item label="" class="lastItem">

                    <el-button @click="addCcommission" style="width:100%;" type="primary" v-show="commissionList.length==0" icon="el-icon-plus">新增</el-button>
                </el-form-item>
            </el-form> -->
          </div>



          <div v-show="stepActive==4">
            <div class="lastStepWrapper">
              <i class="el-icon-success" style="font-size: 74px;color: #52C41A;" />
              <h1 class="title">填写完成</h1>
              <!-- <p class="info">房源信息上传完成，可点击预览进行效果查看</p> -->
              <el-button type="primary" size="small" @click="addCurrentHouseRoom">添加单间</el-button>
              <!-- <el-button size="small">预览房源</el-button> -->
              <el-button size="small" @click="prev()">上一步</el-button>
              <el-button size="small" @click="handleHouseClose">关闭</el-button>
            </div>
          </div>
        </el-form>

      </div>

      <div v-show="stepActive!=4" class="buttonWrapper">
        <el-button type="primary" size="small" :disabled="stepActive==4" @click="next()">下一步</el-button>
        <el-button size="small" :disabled="stepActive==1" @click="prev()">上一步</el-button>
      </div>

    </div>
    <!-- label新增-->
    <el-dialog width="500px" title="新增标签" :visible.sync="labelDialogFormVisible" :close-on-press-escape="false" :close-on-click-modal="false">
      <el-form ref="addLabelForm" :model="addLabelForm" :rules="addLabelFormRules" label-width="110px">
        <el-form-item label="标签中文名称" prop="name">
          <el-input v-model="addLabelForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="标签英文名称" prop="nameEn">
          <el-input v-model="addLabelForm.nameEn" autocomplete="off" />
        </el-form-item>
        <el-form-item v-if="currentLabelType==1" :key="1" label="标签图片:" prop="iconUrl">
          <el-upload
            class="avatar-uploader"
            :action="uploadImgUrl"
            :headers="headers"
            :show-file-list="false"
            :on-error="uploadError"
            accept=".jpg,.jpeg,.png,.gif"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="addLabelForm.iconUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item v-if="currentLabelType==3" :key="2" label="标签颜色:" prop="color">
          <el-color-picker v-model="addLabelForm.color" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="labelDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subLabelForm">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog width="500px" title="新增学校" :visible.sync="schoolDialogFormVisible" :close-on-press-escape="false" :close-on-click-modal="false">
      <el-form ref="addSchoolForm" :model="addSchoolForm" :rules="addSchoolFormRules" label-width="110px">
        <el-form-item label="学校名称" prop="name">
          <el-input v-model="addSchoolForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="学校英文名称" prop="nameEn">
          <el-input v-model="addSchoolForm.nameEn" autocomplete="off" />
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="addSchoolForm.address" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="schoolDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subSchoolForm">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog width="500px" title="新增附近地点" :visible.sync="addressDialogFormVisible" :close-on-press-escape="false" :close-on-click-modal="false">
      <el-form ref="addAddressForm" :model="addAddressForm" :rules="addAddressFormRules" label-width="110px">
        <el-form-item label="中文地址" prop="name">
          <el-input v-model="addAddressForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="英文地址" prop="nameEn">
          <el-input v-model="addAddressForm.nameEn" autocomplete="off" />
        </el-form-item>
        <el-form-item label="详细地址" prop="detail">
          <el-input v-model="addAddressForm.detail" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addressDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subAddressForm">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="负责人信息" :visible.sync="addContactStatus" width="600px">
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
            <el-button @click="addContactStatus = false">取 消</el-button>
            <el-button type="primary" @click="submitFormData('contactForm')">确 定</el-button>
        </div>
    </el-dialog>

    <el-dialog title="佣金信息" :visible.sync="commissionStatus" width="600px" append-to-body>
      <el-form :model="commissionForm" label-width="149px" :rules="commissionRules" ref="commissionForm">
          <el-form-item label="佣金："  prop="commission">
              <!-- <el-input v-model="commissionForm.commission" clearable></el-input> -->
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 5}"
                v-model="commissionForm.commission">
              </el-input>
          </el-form-item>
          <el-form-item label="佣金支付周期："  prop="paymentCycle">
              <!-- <el-input v-model="commissionForm.paymentCycle" clearable></el-input> -->
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 5}"
                v-model="commissionForm.paymentCycle">
              </el-input>
          </el-form-item>
          <el-form-item label="预计最低合同租金："  prop="commissionMin">
              <!-- <el-input v-model="commissionForm.commissionMin" clearable></el-input> -->
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 5}"
                v-model="commissionForm.commissionMin">
              </el-input>
          </el-form-item>
          <el-form-item label="服务费（人民币）："  prop="serviceFee">
              <!-- <el-input v-model="commissionForm.serviceFee" clearable></el-input> -->
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 5}"
                v-model="commissionForm.serviceFee">
              </el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="commissionStatus = false">取 消</el-button>
          <el-button type="primary" @click="CommissionSubmitFormData('commissionForm')">确 定</el-button>
      </div>
  </el-dialog>


  </section>
</template>

<script>
import { addHouseAPI, editHouseAPI, labelHouseAPI, checkLabelHouseAPI, insertHouseLabel, insertHouseImage, delelteHouseImage, getHouseDetail } from '@/api/rent/house'
// 标签详情
import { delDetail, addDetail } from '@/api/home/detail'
// 附近学校
import { delSchool, addSchool } from '@/api/home/school'
// 附近地点
import { delAddress, addAddress } from '@/api/home/address'

import {listSupplier, addSupplierContact,updateSupplierContact,getSupplierContact,delSupplierContact,getContactDetails,getSupplierSyncList  } from "@/api/supplier";

import { listCommission,addCommissionMethods,getCommissionMethods,updateCommission } from "@/api/commission/commission";

import Editor from '@/components/Editor'
import { getToken } from '@/utils/auth'




import VueUeditorWrap from '@/components/UE';

import { scrollTo } from '@/utils/scroll-to'

export default {
  components: {
    Editor,VueUeditorWrap
  },
  props: {
    transmitId: {
      type: Number
    }
  },
  data() {
    return {
      myConfig:{
          autoHeightEnabled: false,
          initialFrameHeight: 200,
          initialFrameWidth: '100%',
      },
      msg2:'',
      processForm:{

      },
      supplierType:[],//付款方式
      titleName:'新建房源',
      stepActive: 1,
      addHouseForm: {
        id: this.transmitId,
        countryId: undefined,
        cityId: undefined,
        description: '',
        descriptionEn: '',
        notice: '',
        noticeEn: ''
      },
      addHouseRules: {
        name: [
          { required: true, message: '请输入房源中文名称', trigger: 'blur' },
          { min: 1, max: 60, message: '长度最大60个字符', trigger: 'blur' }
        ],
        nameEn: [
          { required: true, message: '请输入房源英文名称', trigger: 'blur' },
          { min: 1, max: 120, message: '长度最大120个字符', trigger: 'blur' }
        ],
        countryId: [
          { required: true, message: '请选择国家', trigger: 'change' }
        ],
        cityId: [
          { required: true, message: '请选择城市', trigger: 'change' }
        ],
        providerId: [
          { required: true, message: '请选择供应商', trigger: 'change' }
        ]
      },
      countryArry: [],
      cityArry: [],
      // 第二部 标签
      labelData: [],
      selectLabel: [],

      // 第二部 学校
      schoolData: [],
      selectSchool: [],

      // 第二步 地点
      addressData: [],
      selectAddress: [],

      addSchoolForm: {
        name: undefined,
        nameEn: undefined,
        address: undefined,
        cityId: undefined// 当进行到第二步时cityId已经存在
      },

      addSchoolFormRules: {
        name: [
          { required: true, message: '请输入学校名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度最大50个字符', trigger: 'blur' }
        ],
        nameEn: [
          { required: true, message: '请输入学校英文名称', trigger: 'blur' },
          { min: 1, max: 100, message: '长度最大50个字符', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
          { min: 1, max: 200, message: '长度最大200个字符', trigger: 'blur' }
        ]
      },

      addAddressForm: {
        name: undefined,
        nameEn: undefined,
        detail: undefined,
        cityId: undefined// 当进行到第二步时cityId已经存在
      },

      addAddressFormRules: {
        name: [
          { required: true, message: '请输入学校名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度最大50个字符', trigger: 'blur' }
        ],
        nameEn: [
          { required: true, message: '请输入学校英文名称', trigger: 'blur' },
          { min: 1, max: 100, message: '长度最大50个字符', trigger: 'blur' }
        ],
        detail: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
          { min: 1, max: 200, message: '长度最大200个字符', trigger: 'blur' }
        ]
      },

      addLabelForm: {
        name: undefined,
        nameEn: undefined,
        iconUrl: undefined,
        color: undefined
      },
      addLabelFormRules: {
        name: [
          { required: true, message: '请输入标签中文名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度最大10个字符', trigger: 'blur' }
        ],
        nameEn: [
          { required: true, message: '请输入标签英文名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度最大50个字符', trigger: 'blur' }
        ],
        iconUrl: [
          { required: true, message: '请上传标签图片', trigger: 'change' }
        ],
        color: [
          { required: true, message: '请选择标签颜色', trigger: 'change' }
        ]
      },
      //uploadImgUrl:  'http://47.100.186.108:8080/admin/common/upload',
      uploadImgUrl: process.env.VUE_APP_UPLOAD_URL,
      //uploadImgUrl: process.env.VUE_APP_BASE_API + '/common/upload',
      imageUrl: '',
      headers: {
        Authorization: 'Bearer ' + getToken()
      },

      labelDialogFormVisible: false, schoolDialogFormVisible: false, addressDialogFormVisible: false,
      currentLabelType: '', // 点击新增标签时判断当前的label类型   1 有图片 3 有颜色

      currentLabelId: '', // 点击新增 获取当前的labelId
      currentNum: '',

      uploadPicListStatus: false,
      uploadPicListUrl: '',

      uploadPicListStatus2: false,
      uploadPicListUrl2: '',

      dataparams: { 'houseId': '' },
      fileList: [],

      fileList2: [],

      supplierDataList:[],//供应商数据

      contactList:[],//联系人信息

      contactForm:{
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
      addContactStatus:false,
      contactFormEdit:false,


      commissionList:[],
      commissionStatus:false,
      commissionForm:{
          commission:'',
          paymentCycle:'',
          commissionMin:'',
          serviceFee:'',
      },
      commissionRules:{
          commission: [
              { required: true, message: '请输入佣金', trigger: 'blur' },
          ],
          paymentCycle: [
              { required: true, message: '请输入佣金支付周期', trigger: 'blur' },
          ],
          commissionMin: [
              { required: true, message: '请输入预计最低合同租金', trigger: 'blur' },
          ],
          serviceFee: [
              { required: true, message: '请输入服务费（人民币）', trigger: 'blur' },
          ],
      },
    }
  },
  watch: {
    transmitId: function() {
      this.addHouseForm.id = this.transmitId
    }
  },
  mounted(){
    // setTimeout(()=>{
    //   this.$refs.customerInput.$el.querySelector('input').focus();
    // },900)
    if(this.$route.query.supplierId){
      this.addHouseForm.providerId = this.$route.query.supplierId
    }

  },
  created() {
    scrollTo(0, 800)
    const countryRes = JSON.parse(localStorage.getItem('YIHOME_country'))
    const cityRes = JSON.parse(localStorage.getItem('YIHOME_city'))
    this.handleDataCountry(countryRes, cityRes, 'id', 'countryId')
    this.countryArry = countryRes
    // 赋值选中
    // this.selectLabel = ['洗衣机11']

    /* // 获取国家
      listCountry().then(countryRes => {
        // 获取城市
        listCity().then(cityRes => {
          this.handleDataCountry(countryRes.rows, cityRes.rows, 'id', 'countryId')
          this.countryArry = countryRes.rows
        })
      })
    */
    this.getsuupplier();
    this.getSupplierType();




    if (this.addHouseForm.id) {
      this.titleName = '编辑房源'
      // const loading = this.$loading({
      //   lock: true,
      //   text: '加载中',
      //   spinner: 'el-icon-loading',
      // });

      getHouseDetail(this.addHouseForm.id).then(res => {
        if (res.code === 200) {
          if(res.data.house.type){
            res.data.house.type = res.data.house.type.toString()
          }

          this.addHouseForm = res.data.house

          this.countryArry.forEach(obj => {
            if (res.data.house.countryId == obj.id) {
              this.cityArry = obj.children
            }
          })

          res.data.infos.forEach(content => {
            if (content.type == 1) {
              this.addHouseForm.description = content.info
            }
            if (content.type == 2) {
              this.addHouseForm.descriptionEn = content.info
            }
            if (content.type == 3) {
              this.addHouseForm.notice = content.info
            }
            if (content.type == 4) {
              this.addHouseForm.noticeEn = content.info
            }
          })

          res.data.urls.forEach(content => {
            if (content.type == 1) {
              this.fileList.push({ name: content.id, url: this.serverImgUrl + content.imgurl, id: content.id })
            }
            if (content.type == 2) {
              this.fileList2.push({ name: content.id, videoUrl:this.serverImgUrl + content.imgurl, url: 'https://www.inyihome.com/videofile.png', id: content.id })
            }
          })
          // setTimeout(()=>{
          //   loading.close();
          // },500)

        } else {
          this.msgError(res.msg)
          this.addHouseForm.id = undefined
          this.$emit('on-result-change', false)
          // loading.close();
        }
      })
    }

    // 开发  默认房源为10
    //
  },
  methods: {
    getSupplierType(){
        var list = JSON.parse(localStorage.getItem('YIHOME_user_type'))

            list.forEach(element => {
                if(element.parentId==31){
                    this.supplierType.push(element)
                }
            });

    },
    getsuupplier(){
      listSupplier().then(response => {
        this.supplierDataList = response.rows;
      });
    },
    on_step(val) {
      if (this.addHouseForm.id) {
        if(val==2){
          this.dataparams.houseId = this.addHouseForm.id
          this.getTwoTypeLabel(this.addHouseForm.id)
        }
        this.stepActive = val;
      }
    },
    // 选择国家
    selectCountryChange(value) {
      for (let i = 0; i < this.countryArry.length; i++) {
        if (value === this.countryArry[i].id) {
          this.cityArry = this.countryArry[i].children
          this.$refs['addHouseForm'].fields[3].resetField()
        }
      }
    },
    selectCityChange(item) {
      this.addHouseForm.cityId = item
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
    handleHouseClose(val) {

        if(this.$route.query.supplierId){
          this.$store.dispatch("tagsView/delView", this.$route);
          this.$router.push({ path: "/supplier/supplier", query: { t: Date.now()}})
          return;
        }


      this.addHouseForm.id = undefined
      this.$emit('on-result-change', false)


    },
    prev() {
      --this.stepActive
      if (this.stepActive < 1) this.stepActive = 1
      scrollTo(0, 800)
    },
    next() {
      if (this.stepActive == 1) {
        // 当前属于第一步时候提交数据
        this.$refs['addHouseForm'].validate((valid) => {
          console.log(this.addHouseForm)
          if (valid) {
            // 提交添加数据
            // 如果存在houseId 调用编辑接口

            if (!this.addHouseForm.cityId) {
              this.msgError('请选择所属城市')
              return
            }
            if (this.addHouseForm.id) {
              // 编辑接口
              editHouseAPI(this.addHouseForm).then(res => {
                console.log(res)
                if (res.code === 200) {
                  this.stepStatus()
                  this.dataparams.houseId = this.addHouseForm.id
                  this.getTwoTypeLabel(this.addHouseForm.id)
                } else {
                  this.msgError(res.msg)
                }
              })
            } else {
              // 新增接口
              addHouseAPI(this.addHouseForm).then(res => {
                if (res.code === 200) {
                  // 保存当前新增的houseId 赋值给this.addHouseForm.id
                  this.addHouseForm.id = res.data

                  this.dataparams.houseId = res.data

                  this.stepStatus()



                  //是否存在供应商ID
                  if(this.$route.query.supplierId){
                    this.getContactList();
                  }else{
                    this.getTwoTypeLabel(this.addHouseForm.id)
                  }
                } else {
                  this.msgError(res.msg)
                }
              })
            }
          } else {
            this.msgError('请输入以上必填信息')
            return false
          }
        })
      } else if (this.stepActive == 2) {

        if(this.$route.query.supplierId){
          //this.stepStatus()
          //获取同步信息
          this.getAnycData()
        }else{


        // 第二步获取选中的所有数据
        console.log(this.selectLabel)
        console.log(this.selectSchool)
        console.log(this.selectAddress)
        // type=1 标签   type=2 学校   type=3 地点
        var obj = {
          houseId: this.addHouseForm.id,
          lables: []
        }
        /* ["吹风机,10,7", "安全警报,14,8", "零押金,15,9"]  name id labelId
           ["2,5"]  name id
           ["宿州2,5", "小仙,11"] name id
         */
        var submitLabel = []
        this.selectLabel.forEach(item => {
          const itemObj = {}
          const current = item.split(',')
          itemObj.labelDetalName = current[0]
          itemObj.labelDetalId = current[1]
          itemObj.labelTypeId = current[2]
          itemObj.type = '1'
          itemObj.houseId = this.addHouseForm.id
          submitLabel.push(itemObj)
        })

        var submitSchool = []
        this.selectSchool.forEach(item => {
          const itemObj = {}
          const current = item.split(',')
          itemObj.labelDetalName = current[0]
          itemObj.labelDetalId = current[1]
          itemObj.type = '2'
          itemObj.houseId = this.addHouseForm.id
          submitSchool.push(itemObj)
        })

        var submitAddress = []
        this.selectAddress.forEach(item => {
          const itemObj = {}
          const current = item.split(',')
          itemObj.labelDetalName = current[0]
          itemObj.labelDetalId = current[1]
          itemObj.type = '3'
          itemObj.houseId = this.addHouseForm.id
          submitAddress.push(itemObj)
        })

        var lastData = submitLabel.concat(submitSchool).concat(submitAddress)

        obj.lables = lastData;
        if(lastData.length==0){
          obj.lables = undefined;
        }
        insertHouseLabel(obj).then(res => {
          console.log(res)
          this.stepStatus()
        })


        }




      } else if (this.stepActive == 3) {

        // alert('提交图片')

        if(this.$route.query.supplierId){
          this.processForm.houseId = this.dataparams.houseId;
          this.processForm.id = undefined;
            addCommissionMethods(this.processForm).then(res=>{
              this.commissionStatus = false;
              if(res.code===200){
                this.stepStatus()
              }else{
                  this.msgError(res.msg)
              }
            })
        }else{
          this.stepStatus()
        }

        console.log(this.fileList)
      } else {
        this.stepStatus()
      }
    },
    stepStatus() {
      if (this.stepActive++ > 3) {
        this.stepActive = 1
      }
      scrollTo(0, 800)
    },

    getTwoTypeLabel(houseId) {
      this.getLabel(houseId)
      this.getCheckLabel(houseId)
    },

    // 获取label信息
    getLabel(houseId) {
      // source:1 房源   2单间
      labelHouseAPI({ houseId: houseId, source: 1 }).then(res => {
        console.log(res, 1111)
        this.labelData = res.data.labelVos

        this.schoolData = res.data.schools
        this.addressData = res.data.addresses

        /* res.data.lableDetailVos.forEach(obj=>{

        }) */
      })
    },
    // 获取选中的label
    getCheckLabel(houseId) {
      checkLabelHouseAPI(houseId).then(res => {
        /* 所选中的label标签 赋值*/
        /* ["吹风机,10,7", "安全警报,14,8", "零押金,15,9"]  name id labelId this.selectLabel
           ["2,5"]  name id   this.selectSchool
           ["宿州2,5", "小仙,11"] name id this.selectAddress
         */
        res.data.forEach(content => {
          if (content.type == 1) {
            var str = content.labelDetalName + ',' + content.labelDetalId + ',' + content.labelTypeId
            this.selectLabel.push(str)
          }
          if (content.type == 2) {
            var str2 = content.labelDetalName + ',' + content.labelDetalId
            this.selectSchool.push(str2)
          }
          if (content.type == 3) {
            var str3 = content.labelDetalName + ',' + content.labelDetalId
            this.selectAddress.push(str3)
          }
        })

        console.log()
      })
    },
    getAnycData(){
      getSupplierSyncList({supplierId:this.$route.query.supplierId}).then(res=>{
          if(res.code===200){
              if(res.rows.length!=0){
                this.processForm = res.rows[0];
              }
              this.stepStatus();
          }else{
              this.msgError(res.msg)
          }
      })
    },
    /* // 获取学校信息
    getSchool(cityId) {
      listSchool({ cityId: cityId }).then(res => {
        console.log(res, '根据城市id获取学校')
        if (res.code == 200) {
          this.schoolData = res.rows
        }
      })
    },

    // 获取地址信息
    getAddress(cityId) {
      listAddress({ cityId: 3 }).then(res => {
        console.log(res, '根据城市id获取附近地点')
        if (res.code == 200) {
          this.addressData = res.rows
        }
      })
    }, */

    // 点击新增标签
    addCurrentHouseLabel(num, item) {
      console.log(num, item, this.selectLabel)
      // num 点击新增的下表  item 当前的对象
      // 当前新增的类型  1 有图片   3 有颜色
      this.currentLabelType = item.labelType

      // 点击新增时 定义当前点击的labelId

      this.currentLabelId = item.labelId
      this.currentNum = num

      /**
       * 点击新增的时候会得到当前 属于的labelId  新增成功后会得到 id
       *  传递的数据必须包含 labelId 和 name
       *
       *
       *
       */

      //  alert(num)
      // let obj = {name:'自定义的',houseId:8}
      // this.labelData[num].labelDetails.push(obj)

      this.labelDialogFormVisible = true

      this.resetForm('addLabelForm')
      // 重置表单并且重置img显示
      this.imageUrl = ''
    },
    // 提交新增label
    subLabelForm() {
      // this.addHouseForm.id//前面获取的houseId
      this.addLabelForm.houseId = this.addHouseForm.id

      this.$refs['addLabelForm'].validate((valid) => {
        if (valid) {

          const obj2 = {
            type: '1',
            name: this.addLabelForm.name,
            nameEn: this.addLabelForm.nameEn,
            labelId: this.currentLabelId,
            houseId: this.addLabelForm.houseId,
            iconUrl: this.addLabelForm.iconUrl,
            color: this.addLabelForm.color
          }

          addDetail(obj2).then(response => {
            if (response.code === 200) {
              // 返回的data为当前新增的房源私有标签

              const obj = {
                type: '1',
                id: response.data,
                name: this.addLabelForm.name,
                nameEn: this.addLabelForm.nameEn,
                labelId: this.currentLabelId,
                houseId: this.addLabelForm.houseId,
                iconUrl: this.addLabelForm.iconUrl,
                color: this.addLabelForm.color
              }
              this.labelData[this.currentNum].labelDetails.push(obj)
              // 新增的时候默认要选中添加的
              const str = this.addLabelForm.name + ',' + response.data + ',' + this.currentLabelId
              this.selectLabel.push(str)
              this.labelDialogFormVisible = false
            } else {
              this.msgError(response.msg)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 移除新增的标签
    removeChoice(currentItem) {
      this.$confirm('是否删除当前标签?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delDetail(currentItem.id)
      }).then(() => {
        // 删除数组里面的对象
        for (var i = 0; i < this.labelData.length; i++) {
          for (var k = 0; k < this.labelData[i].labelDetails.length; k++) {
            if (
              currentItem.name == this.labelData[i].labelDetails[k].name &&
              currentItem.id == this.labelData[i].labelDetails[k].id &&
              currentItem.labelId == this.labelData[i].labelDetails[k].labelId
            ) {
              console.log(this.labelData[i].labelDetails)
              console.log(this.labelData[i].labelDetails[k])
              this.labelData[i].labelDetails.splice(k, 1)
            }
          }
        }
        // 并且需要删除this.selectLabel数组中选中的数据
        for (var i = 0; i < this.selectLabel.length; i++) {
          var str = currentItem.name + ',' + currentItem.id + ',' + currentItem.labelId
          if (str == this.selectLabel[i]) {
            this.selectLabel.splice(i, 1)
          }
        }
      }).catch(() => {

      })
    },

    // 点击新增附近学校
    addCurrentHouseSchool() {
      this.schoolDialogFormVisible = true
      this.resetForm('addSchoolForm')
    },
    // 提交新增学校
    subSchoolForm() {
      this.addSchoolForm.houseId = this.addHouseForm.id// 房源id
      // this.addSchoolForm.cityId = this.addHouseForm.cityId;
      this.$refs['addSchoolForm'].validate((valid) => {
        if (valid) {
          console.log(this.addSchoolForm)
          addSchool(this.addSchoolForm).then(response => {
            if (response.code === 200) {
              console.log(response)
              const obj = {
                type: '2',
                id: response.data,
                name: this.addSchoolForm.name,
                houseId: this.addSchoolForm.houseId
              }
              this.schoolData.push(obj)

              const str = this.addSchoolForm.name + ',' + response.data
              this.selectSchool.push(str)

              this.msgSuccess('新增成功')
              this.schoolDialogFormVisible = false
            } else {
              this.msgError(response.msg)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 删除新增学校
    removeChoiceSchool(currentItem) {
      this.$confirm('是否删除当前标签?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delSchool(currentItem.id)
      }).then(() => {
        // 删除数组里面的对象
        for (var i = 0; i < this.schoolData.length; i++) {
          if (currentItem.name == this.schoolData[i].name &&
            currentItem.id == this.schoolData[i].id
          ) {
            this.schoolData.splice(i, 1)
          }
        }
        // 并且需要删除this.selectSchool数组中选中的数据
        for (var i = 0; i < this.selectSchool.length; i++) {
          var str = currentItem.name + ',' + currentItem.id
          if (str == this.selectSchool[i]) {
            this.selectSchool.splice(i, 1)
          }
        }
      }).catch(() => {

      })
    },
    // 点击新增附近地点
    addCurrentHouseAddress() {
      this.addressDialogFormVisible = true
      this.resetForm('addAddressForm')
    },
    // 提交新增地点
    subAddressForm() {
      this.addAddressForm.houseId = this.addHouseForm.id// 房源id
      // this.addAddressForm.cityId = this.addHouseForm.cityId;
      this.$refs['addAddressForm'].validate((valid) => {
        if (valid) {
          console.log(this.addAddressForm)
          addAddress(this.addAddressForm).then(response => {
            if (response.code === 200) {
              console.log(response)
              const obj = {
                type: '3',
                id: response.data,
                name: this.addAddressForm.name,
                houseId: this.addAddressForm.houseId
              }
              this.addressData.push(obj)

              const str = this.addAddressForm.name + ',' + response.data
              this.selectAddress.push(str)

              this.msgSuccess('新增成功')
              this.addressDialogFormVisible = false
            } else {
              this.msgError(response.msg)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 删除新增地点
    removeChoiceAddress(currentItem) {
      this.$confirm('是否删除当前标签?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delAddress(currentItem.id)
      }).then(() => {
        // 删除数组里面的对象
        for (var i = 0; i < this.addressData.length; i++) {
          if (currentItem.name == this.addressData[i].name &&
            currentItem.id == this.addressData[i].id
          ) {
            this.addressData.splice(i, 1)
          }
        }
        // 并且需要删除this.selectAddress数组中选中的数据
        for (var i = 0; i < this.selectAddress.length; i++) {
          var str = currentItem.name + ',' + currentItem.id
          if (str == this.selectAddress[i]) {
            this.selectAddress.splice(i, 1)
          }
        }
      }).catch(() => {

      })
    },

    // label选中的当前数据
    checkinlist(item, Pindex, Cindex) {
      console.log(item)
      console.log(this.selectLabel)
      // console.log(item)
      console.log('当前对象→' + [item], '父级下表' + Pindex, '子级下表' + Cindex)
    },
    // school选中的当前数据
    checkinSchool(item, index) {
      console.log(this.selectSchool)
      console.log(item)
    },
    // address选中的数据
    checkinAddress(item, index) {
      console.log(this.selectSchool)
      console.log(item)
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      // this.$refs.uploadImg.clearValidate()

      this.addLabelForm.iconUrl = res.fileName
    },
    beforeAvatarUpload(file) {
      /* const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M */
    },
    uploadError() {
      this.$message.error('标题图片上传失败！')
    },

    /* 第三步图片视频上传 */

    /* 删除之前*/
    pictureBeforeRemove(file, fileList) {
      console.log(file, fileList)
      if (file.status == 'success') {
        delelteHouseImage(file.id).then(res => {
          console.log(res)
        })
      }
    },

    pictureBeforeRemove2(file, fileList) {
      console.log(file, 1, this.fileList2)
      if (file.status == 'success') {
        delelteHouseImage(file.id).then(res => {
          console.log(res)
        })
      }
    },

    /* 上传成功*/
    pictureSuccess(response, file, fileList) {
      if (response.code == 200) {
        // 图片上传成功后
        const obj = {
          type: 1,
          'cover': undefined,
          imgurl: response.fileName,
          houseId: this.addHouseForm.id
        }

        if (fileList.length == 1) {
          obj.cover = '1'
        }

        // 保存图片
        insertHouseImage(obj).then(res => {
          if (res.code == 200) {
            response.id = res.data
            file.id = res.data
            console.log(fileList)
          }
        })
      } else {
        this.msgError(response.msg)
      }
    },

    pictureSuccess2(response, file, fileList) {
      // if (response.code == 200) {
      // 图片上传成功后
      const obj = {
        type: 2,
        'cover': undefined,
        imgurl: response.fileName,
        houseId: this.addHouseForm.id
      }

      if (fileList.length == 1) {
        obj.cover = '1'
      }

      // 保存图片
      insertHouseImage(obj).then(res => {
        if (res.code == 200) {
          response.id = res.data
          file.url = 'https://www.inyihome.com/videofile.png';
          file.videoUrl =  response.fileName
          file.id = res.data
        }
      })
      // } else {
      // this.msgError(response.msg)
      // }
    },

    handlePictureCardPreview(file) {
      this.uploadPicListStatus = true
      this.uploadPicListUrl = file.url
    },
    handlePictureCardPreview2(file) {
      this.uploadPicListStatus2 = true;
      if(file.videoUrl.includes('47.100.186.108')){
        this.uploadPicListUrl2 = file.videoUrl
      }else{
        this.uploadPicListUrl2 = this.serverImgUrl+file.videoUrl
      }


      console.log(file)
    },

    pictureUpload(file) {
      const isJPG = file.type.toLowerCase() === 'image/jpeg'
      const isPNG = file.type.toLowerCase() === 'image/png'
      const isBMP = file.type.toLowerCase() === 'image/bmp'
      const isLt2M = file.size / 1024 / 1024 < 5
      if (isJPG || isPNG || isBMP) {
      } else {
        this.$message.error('上传图片格式不正确!支持JPG、JPEG、PNG、BMP格式')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 5MB!')
      }
      return isJPG || isPNG || isBMP && isLt2M
    },

    pictureUpload2(file) {
      console.log(file)
      const isJPG = file.type.toLowerCase() === 'video/mp4'
      const isPNG = file.type.toLowerCase() === 'video/ogg'
      const isLt2M = file.size / 1024 / 1024 < 20
      if (isJPG || isPNG) {
      } else {
        this.$message.error('上传视频格式不正确!支持MP4、ogg格式')
      }
      if (!isLt2M) {
        this.$message.error('上传视频大小不能超过 20MB!')
      }
      return isJPG || isPNG && isLt2M
    },
    addCurrentHouseRoom(){
      //debugger
      // this.$parent.queryParams.houseName = this.addHouseForm.name;
      // this.$parent.queryParams.no = this.addHouseForm.no;
      this.$router.push({path:'/rent/house'});
      this.$parent.queryParams = this.addHouseForm;
      this.$parent.queryParams.pageNum = undefined;
      this.$parent.queryParams.pageSize = undefined;
      this.$emit('on-result-change2', {status:false,data:this.addHouseForm})


    },
    resetContact(){
      this.contactForm = {
          name: undefined,
          email: undefined,
          phone: undefined,
          chat: undefined,
          type:'2',
      }
      this.resetForm('contactForm')
    },
    getContactList(){
      getSupplierContact({masterId:this.dataparams.houseId}).then(res=>{
          this.contactList = res.rows;
      })
    },
    //新增联系人
    addContact(){
      this.resetContact();
      this.addContactStatus = true;
      this.contactFormEdit = true;
    },
    editContact(id,index){
        getContactDetails(id).then(res=>{
            if(res.code===200){
                this.resetContact();
                this.contactFormEdit = false;
                this.addContactStatus = true;
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
                if(!this.contactFormEdit){

                    updateSupplierContact(this.contactForm).then(res=>{
                        this.addContactStatus = false;
                        if(res.code===200){
                            this.getContactList();
                        }else{
                            this.msgError(res.msg)
                        }
                    })
                }else{
                  this.contactForm.masterId = this.dataparams.houseId;
                    addSupplierContact(this.contactForm).then(res=>{
                        this.addContactStatus = false;
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

    resetCommission(){
      this.commissionForm = {
          commission: undefined,
          paymentCycle: undefined,
          commissionMin: undefined,
          serviceFee: undefined
      }
      this.resetForm('commissionForm')
    },
    //编辑 佣金
    editCommission(id,index){
      this.isAddCommission = false;
      getCommissionMethods(id).then(res=>{
        if(res.code===200){
            this.resetCommission();
            this.commissionStatus = true;
            this.commissionForm = res.data;
        }else{
            this.msgError(res.msg)
        }
      })
    },
    //添加佣金
    addCcommission(){
      this.commissionStatus = true;
      this.resetCommission();
      this.isAddCommission = true;
    },

    //获取佣金
    getcommissionList(){
      this.commissionLoading = true,
      listCommission({houseId:this.dataparams.houseId}).then(res=>{
        this.commissionList = res.rows;
      })
    },
    CommissionSubmitFormData(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          if(this.isAddCommission){
            this.commissionForm.houseId = this.dataparams.houseId
            addCommissionMethods(this.commissionForm).then(res=>{
              this.commissionStatus = false;
              if(res.code===200){
                this.getcommissionList();
              }else{
                  this.msgError(res.msg)
              }
            })
          }else{
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
  }
}
</script>

<style scoped="scoped">
  .buttonWrapper{
    padding: 24px;
    text-align: center;
  }
  .addHouseForm{
    width: 1000px;
    margin: 0 auto;
    /* max-width: 600px;
    margin-top: 32px; */
  }
  .addlabelWrapper{
    padding-left: 0;
    max-width: 1060px;
    margin: 0 auto;
    margin-top: 32px;
  }
  .addlabelWrapper li{
    list-style: none;
    margin-bottom: 24px;
    display: flex;
  }
  .addlabelWrapper li span{
    font-size: 16px;
    font-family: PingFang SC;
    margin-right: 12px;
    position: relative;
    top: 6px;
    width: 80px;
    display: flex;
    flex-shrink: 0;
    margin-top: 7px;
  }
  .addlabelWrapper .el-checkbox-group{

  }
  .addlabelWrapper .el-checkbox-group .el-checkbox-button{
    margin-right: 8px;
    margin-bottom: 8px;
  }
  .step-uploadWrapper{
    display: flex;
  }
  .step-uploadWrapper span.title{
    width: 80px;
    display: flex;
    flex-shrink: 0;
  }
  .lastStepWrapper{
    text-align: center;
    margin-top: 32px;
    padding-bottom: 32px;
  }
  .lastStepWrapper .title{
    font-family: PingFang SC;
    font-size: 24px;
    margin: 24px 0 32px;
    color: rgba(0,0,0,0.85);
    font-weight: 400;
  }
  .lastStepWrapper .info{
    font-family: PingFang SC;
    font-size: 16px;
    color: rgba(0,0,0,0.65);
    margin-bottom: 43px;
  }
</style>
<style>
  .cityLabel label:before{
    content: '*';
    color: #ff4949;
    margin-right: 4px;
  }
  .addlabelWrapper .el-checkbox-group .el-checkbox-button span{
    border: 1px solid #DCDFE6;
    outline: none;
    border-radius: 4px;
  }
  .addlabelWrapper .el-checkbox-button.is-checked .el-checkbox-button__inner{
    box-shadow: 0px 0 0 0 #74bcff;
  }

  .addHouseW .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      width: 48px;
      height: 48px;
    }
    .addHouseW .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .addHouseW .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 48px;
      height: 48px;
      line-height: 48px;
      text-align: center;
    }
    .addHouseW .avatar {
      width: 48px;
      height: 48px;
      display: block;
    }
    .removeCheckBox{
      margin-left: 12px;
      font-size: 20px;
      display: inline;
      font-weight: lighter;
      line-height: 0;
      position: relative;
      top: 2px;
    }
    .addHouseW .el-step__icon{
      width: 32px;
      height: 32px;
    }
    .addHouseW .el-step.is-horizontal .el-step__line{
      top: 15px;
    }
</style>
