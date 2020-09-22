<template>
    <div>
        <vue-ueditor-wrap v-model="msg2"  :key="2"></vue-ueditor-wrap>
    </div>
</template>
<script>
import VueUeditorWrap from '@/components/UE';
export default {
    props:{
        myKey:{
            type:String
        }
    },
    components: {
        VueUeditorWrap
    },
    data(){
        currentKey:this.myKey
    },
    watch:{
        myKey(newValue,oldValue){
            this.currentKey = newValue;
        }
    }
}
</script>