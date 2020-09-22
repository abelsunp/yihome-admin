<template>
    <div>
        <h1>流程图</h1>
        <div id="topology-canvas" class="full"></div>
    </div>
</template>
<script>
import { Topology } from 'topology-core';
import { register as registerFlow } from 'topology-flow-diagram';
export default {
    data() {
        return {
            // 左侧工具栏
            //tools: Tools,
            // 图形库
            canvas: {},
            // 图形库选项：https://www.yuque.com/alsmile/topology/canvas#hOupV
            canvasOptions: {
                rotateCursor: '/img/rotate.cur'
            },
            // 右侧属性栏数据
            props: {
                node: null,
                line: null,
                multi: false
            }
        }
    },

    mounted(){
        
        var canvas = new Topology('topo-canvas', {});
    }
}
</script>
<style scoped>
    .full{
        height: 500px;
    }
</style>