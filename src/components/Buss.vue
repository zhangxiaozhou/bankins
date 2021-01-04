<template>
  <el-container>
    <el-header height="100" class="my-header">
      <div>
        <el-form label-width="120px" :inline="true" :model="form">
          <el-form-item label="统计对象">
            <el-select v-model="form.region" placeholder="请选择银行">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>

            <el-select v-model="form.region" placeholder="请选择机构">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="交易日期">
            <el-date-picker
              type="date"
              placeholder="开始日期"
              v-model="form.date1"
            ></el-date-picker>

            <el-date-picker
              type="date"
              placeholder="截止日期"
              v-model="form.date1"
            ></el-date-picker>
          </el-form-item>
        </el-form>

        <el-form label-width="120px" :inline="true" :model="form">
          <el-form-item label="投保单号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="保单号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="销售渠道">
            <el-radio v-model="form.sellChannel" label="1">全部</el-radio>
            <el-radio v-model="form.sellChannel" label="2">柜面</el-radio>
            <el-radio v-model="form.sellChannel" label="3">网上银行</el-radio>
            <el-radio v-model="form.sellChannel" label="4"
              >银行呼叫中心</el-radio
            >
            <el-radio v-model="form.sellChannel" label="5">自助终端</el-radio>
            <el-radio v-model="form.sellChannel" label="6">手机</el-radio>
            <el-radio v-model="form.sellChannel" label="7">移动营销</el-radio>
          </el-form-item>
        </el-form>

        <el-form label-width="120px" :inline="true" :model="form">
          <el-form-item label="承保与否">
            <el-radio v-model="form.contState" label="1">全部</el-radio>
            <el-radio v-model="form.contState" label="2">未承保件</el-radio>
            <el-radio v-model="form.contState" label="3">承保件</el-radio>
            <el-radio v-model="form.contState" label="4">未决件</el-radio>
          </el-form-item>
          <span class="space"></span>
          <el-button @click="onSubmit">查询</el-button>
        </el-form>
      </div>
    </el-header>

    <el-main>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="trans" label="流水号"> </el-table-column>
          <el-table-column prop="bankCode" label="银行"> </el-table-column>
          <el-table-column prop="zone" label="网点"> </el-table-column>
          <el-table-column prop="zone" label="地区"> </el-table-column>
          <el-table-column prop="polNo" label="投保单号"> </el-table-column>
          <el-table-column prop="contNo" label="保单号"> </el-table-column>
          <el-table-column prop="transDate" label="交易日期"> </el-table-column>
          <el-table-column prop="transCode" label="交易类别"> </el-table-column>
          <el-table-column prop="state" label="状态"> </el-table-column>
          <el-table-column prop="errMsg" label="错误原因"> </el-table-column>
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>

<style scoped>
.space{
  margin-right: 300px;
}
.my-header {
  border-bottom: 1px solid #d7dae0;
}
</style>

<script>
export default {
  name: "Buss",
  data() {
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
        sellChannel: "",
        contState: "",
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
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>
