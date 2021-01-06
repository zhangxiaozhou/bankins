<template>
  <el-container>
     <el-header height="100" class="my-header">
       <div>
         <el-form label-width="120px" :inline="true" :model="form">
            <el-form-item label="银行代码">
                <el-select v-model="form.bankCode" placeholder="请选择银行">
                    <el-option v-for="bank in banks" :key="bank.bankCode" :label="bank.bankName" :value="bank.bankCode"></el-option>
                </el-select>
            </el-form-item>
           <el-form-item label="类别">
                <el-select v-model="form.type" placeholder="请选择类别">
                    <el-option label="全部" value="all"></el-option>
                    <el-option label="PRODUCT" value="product"></el-option>
                    <el-option label="PTPACK" value="ptpack"></el-option>
                </el-select>
            </el-form-item>
         </el-form>
         <el-form label-width="120px" :inline="true" :model="form">
            <el-form-item label="内部险种代码">
                  <el-input v-model="form.innerCode"></el-input>
            </el-form-item>
            <el-form-item label="外部险种代码">
                  <el-input v-model="form.outerCode"></el-input>
            </el-form-item>
         </el-form>
         <el-form label-width="120px" :inline="true" :model="form">
            <el-form-item label="名称">
                  <el-input v-model="form.name"></el-input>
            </el-form-item>
         </el-form>
       </div>
     </el-header>

     <el-main>
         <div>
            <el-table :data="tableData" style="width:100%" max-height="500">
                <el-table-column prop="bankCode" label="银行代码"> </el-table-column>
                <el-table-column prop="type" label="类别"> </el-table-column>
                <el-table-column prop="innerCode" label="内部险种代码"> </el-table-column>
                <el-table-column prop="outerCode" label="外部险种代码"> </el-table-column>
                <el-table-column prop="name" label="名称"> </el-table-column>
                <el-table-column label="操作" fixed="right" width="100">
                  <template slot-scope="scope">
                     <el-button @click="update(scope.row)" type="text" size="small">查看</el-button>
                     <el-button type="text" size="small"></el-button>
                  </template>
                </el-table-column>
            </el-table>
         </div>
     </el-main>
  </el-container>
</template>

<style scoped>
   .my-header {
     border-bottom: 1px solid #d7dae0;
   }
</style>

<script>
export default {
  name: 'ProductCodeMapping',
  data(){
    return {
      form:{
        bankCode :"",
        type:"",
        innerCode:"",
        outerCode:"",
        name:""
      },
      tableData:[],
      banks:[]
    }
  },
  methods:{
     findAllBank(){
       this.$http({
         method:"post",
         url:"/buss-process/api/bank/v1/find",
         data:{
           bankClass:"1"
         }
       }).then((res) =>{
         console.log(res.data);
         this.banks=res.data;
       });
     }
  }
}
</script>
