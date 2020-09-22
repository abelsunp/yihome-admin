<template>
    <div  class="app-container">
    <el-table v-loading="loading" :data="dataList">
        <!-- <el-table-column type="selection" width="55" align="center" fixed class-name="same-color"/> -->
      
        <!-- <el-table-column label="姓名" align="center" prop="studentName" fixed class-name="same-color" :show-overflow-tooltip="true"/>
      
        <el-table-column label="手机号" align="center" prop="studentPhone" :show-overflow-tooltip="true"/>
      
        <el-table-column label="在读院校" align="center" prop="onlineSchool" :show-overflow-tooltip="true"/>
        <el-table-column label="在读年级" align="center" prop="onlineGrade" :show-overflow-tooltip="true"/>
        <el-table-column label="申请国家" align="center" prop="country" :show-overflow-tooltip="true"/>
        <el-table-column label="语言成绩" align="center" prop="score" :show-overflow-tooltip="true"/>
        <el-table-column label="申请专业" align="center" prop="major" :show-overflow-tooltip="true"/>
        <el-table-column label="其他需求" align="center" prop="remark" :show-overflow-tooltip="true"/> -->
        <el-table-column type="expand">
            <template slot-scope="scope">
                <el-table :data="scope.row.children">
                    <el-table-column label="学生姓名" align="center" prop="studentName" :show-overflow-tooltip="true"/>
                    <el-table-column label="学生手机号" align="center" prop="studentPhone" :show-overflow-tooltip="true"/>
                    <el-table-column label="在读院校" align="center" prop="onlineSchool" :show-overflow-tooltip="true"/>
                    <el-table-column label="在读年级" align="center" prop="onlineGrade" :show-overflow-tooltip="true"/>
                    <el-table-column label="申请国家" align="center" prop="country" :show-overflow-tooltip="true"/>
                    <el-table-column label="语言成绩" align="center" prop="score" :show-overflow-tooltip="true"/>
                    <el-table-column label="申请专业" align="center" prop="major" :show-overflow-tooltip="true"/>
                    <el-table-column label="其他需求" align="center" prop="remark" :show-overflow-tooltip="true"/>
                </el-table>
            </template>
        </el-table-column>



        <el-table-column label="姓名" align="center" prop="nickname"  class-name="same-color" :show-overflow-tooltip="true"/>
        <el-table-column label="头像" align="center" prop="avatarurl" :show-overflow-tooltip="true">
            <template slot-scope="scope">
                <img style="width:23px;height:23px;" :src="scope.row.avatarurl" alt="">
            </template>
        </el-table-column>
        <el-table-column label="手机号" align="center" prop="phonenumber" :show-overflow-tooltip="true"/>
        <el-table-column label="国家" align="center" prop="country" :show-overflow-tooltip="true"/>

        <el-table-column label="省份" align="center" prop="province" :show-overflow-tooltip="true"/>
        <el-table-column label="城市" align="center" prop="city" :show-overflow-tooltip="true"/>

        <el-table-column label="申请时间" align="center" prop="createTime" :show-overflow-tooltip="true">
            <template slot-scope="scope">
                {{parseTime(scope.row.createTime)}}
            </template>
        </el-table-column>

        <el-table-column label="状态" align="center" prop="status" :show-overflow-tooltip="true" width="150px">
            <template slot-scope="scope">
                <!-- {{scope.row.status}} -->
                <el-switch
                style="display: block"
                v-model="scope.row.statusActive"
                @change="swithChange($event,scope.row)"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="开启"
                inactive-text="关闭">
                </el-switch>
            </template>
        </el-table-column>

        <!-- <el-table-column label="在读院校" align="center" prop="onlineSchool" :show-overflow-tooltip="true"/>
        <el-table-column label="在读年级" align="center" prop="onlineGrade" :show-overflow-tooltip="true"/>
        <el-table-column label="申请国家" align="center" prop="country" :show-overflow-tooltip="true"/>
        <el-table-column label="语言成绩" align="center" prop="score" :show-overflow-tooltip="true"/>
        <el-table-column label="申请专业" align="center" prop="major" :show-overflow-tooltip="true"/>
        <el-table-column label="其他需求" align="center" prop="remark" :show-overflow-tooltip="true"/> -->
      
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width same-color" fixed="right" >
        <template slot-scope="scope">
            <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="handleExamine(scope.row)"
          >查看</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >编辑</el-button> -->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
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
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return {
            loading:false,
            total: 0,
            dataList:[],
            queryParams:{
                pageNum: 1,
                pageSize: 10,
            },
            studentList:[],
        }
    },
    created(){
        this.getStudent();
        setTimeout(()=>{
            this.getList()
        },100)
        
        
    },
    methods:{
        getStudent(){
            axios.get('https://inyihome.com/yihome-api/ydb/apply/list?pageSize=99999').then(res=>{
                if(res.data.status==0){
                    this.studentList = res.data.data.list;
                }else{
                    this.msgError(res.data.msg)
                }
            }).catch(e=>{
                
                this.msgError('数据获取失败')
            })
        },
        getList(){
            axios.get('https://inyihome.com/yihome-api/ydb/login/list'+`?pageNum=${this.queryParams.pageNum}`+`&pageSize=${this.queryParams.pageSize}`).then(res=>{
                this.loading = false;
                if(res.data.status==0){
                    
                    this.total = res.data.data.total;
                    res.data.data.list.forEach(el=>{
                        el['children']=[];
                        if(el.status==1){
                            el['statusActive'] = false
                        }else{
                            el['statusActive'] = true
                        }
                        this.studentList.forEach(item=>{
                            if(item.salesId==el.id){
                                el['children'].push(item)
                            }
                        })
                    })

                    this.dataList = res.data.data.list
                }else{
                    
                }
            }).catch(e=>{
                this.loading = false;
                this.msgError('数据获取失败')
                console.log(e)
            })
        },
        handleDelete(row){
            this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.loading = true;
                axios.delete('https://inyihome.com/yihome-api/ydb/login/'+row.id).then(res=>{
                    this.loading = false;
                    if(res.data.status==0){
                        this.$message({type: 'success', message: '删除成功!' });
                        this.getList()
                    }else{
                        this.$message.error('删除失败');
                    }
                }).catch(e=>{
                    this.loading = false;
                })
            }).catch(() => {
                       
            });
        },
        swithChange(val,row){
            let currentValue = val?'0':'1';
            axios.post('https://inyihome.com/yihome-api/ydb/login/edit',{id:row.id,status:currentValue}).then(res=>{
                console.log(res);
                if(res.data.status==0){
                    this.$message({ message: '操作成功',type: 'success'});
                    this.getList();
                }else{
                    this.$message.error('操作失败');
                    this.getList();
                }
            }).catch(e=>{
                this.$message.error('系统错误');
            })
        }
    }
    
}
</script>
<style scoped>

</style>