<template>
  <el-container>
    <el-header height="100"
               class="my-header">
      <div>
        <el-form label-width="120px"
                 :inline="true"
                 :model="form">
          <el-form-item label="统计对象">
            <el-select v-model="form.region"
                       placeholder="请选择银行">
              <el-option label="区域一"
                         value="shanghai"></el-option>
              <el-option label="区域二"
                         value="beijing"></el-option>
            </el-select>

            <el-select v-model="form.region"
                       placeholder="请选择机构">
              <el-option label="区域一"
                         value="shanghai"></el-option>
              <el-option label="区域二"
                         value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-form label-width="120px"
                 :inline="true"
                 :model="form">
          <el-form-item label="交易日期">
            <el-date-picker type="date"
                            placeholder="开始日期"
                            v-model="form.date1"></el-date-picker>

            <el-date-picker type="date"
                            placeholder="截止日期"
                            v-model="form.date1"></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div>  
        <el-form label-width="120px">
          <el-form-item label="交易处理状态">
            <el-select v-model="form.region"
                       placeholder="请选择状态">
              <el-option label="区域一"
                         value="shanghai"></el-option>
              <el-option label="区域二"
                         value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-form label-width="120px" :inline="true" :model="form">
            <el-form-item label="单号">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
        </el-form>
      </div>
      <div>
        <el-form>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
      </div>      
    </el-header>
    <el-main>
      <div>
        <el-table :data="tableData"
                  style="width: 100%">
          <el-table-column prop="bankCode"
                           label="银行代码"> </el-table-column>
          <el-table-column prop="zone"
                           label="地区代码"> </el-table-column>
          <el-table-column prop="dept"
                           label="网点代码"> </el-table-column>
          <el-table-column prop="transDate"
                           label="交易日期"> </el-table-column>
          <el-table-column prop="transCode"
                           label="交易分类"> </el-table-column>
          <el-table-column prop="sendCode"
                           label="投保单号"> </el-table-column>
          <el-table-column prop="policyCode"
                           label="保单号"> </el-table-column>
          <el-table-column prop="accpeterDate"
                           label="承保日期"> </el-table-column>
          <el-table-column prop="state"
                           label="受理状态"> </el-table-column>
          <el-table-column prop="sendCodeState"
                           label="投保单状态"> </el-table-column>
          <el-table-column prop="transCate"
                           label="交易分类"> </el-table-column>                                                                             
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
  name: "Trans",
  data () {
    return {
      labelPosition: "right",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      tableData: []
    };
  },
  methods: {
    onSubmit () {
      console.log("submit!");
    },
  },
};
</script>