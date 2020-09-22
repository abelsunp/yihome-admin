<template>
  <div class="dashboard-editor-container">


    

    <div>
      <p v-html="msg2"></p>
    </div>
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    
    <!-- <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row> -->

    <!-- <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row> -->

    <!-- <UE :defaultMsg=defaultMsg :config=config :id=ue1  ref="ue"></UE> -->
    <!-- <vue-ueditor-wrap v-model="msg"></vue-ueditor-wrap> -->

    <!-- <vue-ueditor-wrap v-model="msg" :config="myConfig" @beforeInit="addCustomButtom" :key="1"></vue-ueditor-wrap>
     <vue-ueditor-wrap v-model="msg2"  :key="2"></vue-ueditor-wrap> -->
    
     <!-- <ant-g6 :action-list="[]" :func-list="[]" :account-list="[]" :workflow-list="[]"></ant-g6> -->
  </div>
</template>

<script>
import PanelGroup from './dashboard/PanelGroup'
import LineChart from './dashboard/LineChart'
import RaddarChart from './dashboard/RaddarChart'
import PieChart from './dashboard/PieChart'
import BarChart from './dashboard/BarChart'

// import VueUeditorWrap from 'vue-ueditor-wrap'
import VueUeditorWrap from '@/components/UE';
//const VueUeditorWrap = window.VueUeditorWrap; // 全局变量，通过 script 标签引入

import AntG6 from '@/components/AntG6';

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'Index',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    VueUeditorWrap,
    AntG6
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      msg: '',
      msg2:'',
      myConfig: {
        autoHeightEnabled: false,
        initialFrameHeight: 200,
        initialFrameWidth: '100%',
        UEDITOR_HOME_URL: '/UEditor/',
        serverUrl: 'http://35.201.165.105:8000/controller.php',
        //serverUrl:'http://192.168.1.55:8080/admin/common/upload'
      }
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    addCustomButtom (editorId) {
      //alert(1111)
      window.UE.registerUI('test-button', function (editor, uiName) {
        // 注册按钮执行时的 command 命令，使用命令默认就会带有回退操作
        editor.registerCommand(uiName, {
          execCommand: function () {
            editor.execCommand('inserthtml', `<span>这是一段由自定义按钮添加的文字</span>`);
          }
        });

        // 创建一个 button
        var btn = new window.UE.ui.Button({
          // 按钮的名字
          name: uiName,
          // 提示
          title: '鼠标悬停时的提示文字',
          // 需要添加的额外样式，可指定 icon 图标，图标路径参考常见问题 2
          cssRules: "background-image: url('/test-button.png') !important;background-size: cover;",
          // 点击时执行的命令
          onclick: function () {
            // 这里可以不用执行命令，做你自己的操作也可
            editor.execCommand(uiName);
          }
        });

        // 当点到编辑内容上时，按钮要做的状态反射
        editor.addListener('selectionchange', function () {
          var state = editor.queryCommandState(uiName);
          if (state === -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
          } else {
            btn.setDisabled(false);
            btn.setChecked(state);
          }
        });

        // 因为你是添加 button，所以需要返回这个 button
        return btn;
      }, 0 /* 指定添加到工具栏上的哪个位置，默认时追加到最后 */, editorId /* 指定这个 UI 是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */);
    },
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>

