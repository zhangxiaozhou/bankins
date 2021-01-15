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

          <el-form-item label="交易科目">
            <el-select v-model="form.region"
                       placeholder="请选择科目">
              <el-option label="区域一"
                         value="shanghai"></el-option>
              <el-option label="区域二"
                         value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="交易状态">
            <el-select v-model="form.region"
                       placeholder="请选择状态">
              <el-option label="区域一"
                         value="shanghai"></el-option>
              <el-option label="区域二"
                         value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

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

            <el-form-item label="单号">
              <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-button @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-header>

    <el-main>
      <div>
        <el-table :data="tableData"
                  style="width: 100%">
          <el-table-column prop="trans"
                           label="流水号"> </el-table-column>
          <el-table-column prop="bankCode"
                           label="银行"> </el-table-column>
          <el-table-column prop="zone"
                           label="网点"> </el-table-column>
          <el-table-column prop="zone"
                           label="地区"> </el-table-column>
          <el-table-column prop="polNo"
                           label="投保单号"> </el-table-column>
          <el-table-column prop="contNo"
                           label="保单号"> </el-table-column>
          <el-table-column prop="transDate"
                           label="交易日期"> </el-table-column>
          <el-table-column prop="transCode"
                           label="交易类别"> </el-table-column>
          <el-table-column prop="state"
                           label="状态"> </el-table-column>
          <el-table-column prop="errMsg"
                           label="错误原因"> </el-table-column>
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
      tableData: [
        {
          trans: "1001",
          bank: "中信银行",
          zone: "  ",
          polNo: "1000000311",
          transDate: "2020-01-01",
          transCode: "投保",
          state: "成功",
          errMsg: "",
        }
      ]
    };
  },
  methods: {
    onSubmit () {
      console.log("submit!");
    },
  },
};
</script>
