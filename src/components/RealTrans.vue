<template>
  <el-container>
    <el-header height="100" class="my-header">
      <div>
        <el-form label-width="120px" :inline="true" :model="form">
          <el-form-item label="统计对象">
            <el-select
              v-model="form.bankCode"
              @change="getChildBank"
              placeholder="请选择总行"
            >
              <el-option
                v-for="bank in banks"
                :key="bank.bankCode"
                :label="bank.bankName"
                :value="bank.bankCode"
              ></el-option>
            </el-select>
            <span class="space"></span>

            <el-select
              v-model="form.company"
              @change="getChildCompanys"
              placeholder="请选择分公司"
            >
              <el-option
                v-for="com in companys"
                :key="com.organId"
                :label="com.abbrName"
                :value="com.organId"
              ></el-option>
            </el-select>
            <span class="space"></span>
            <el-select v-model="form.childCompany" placeholder="请选择机构">
              <el-option
                v-for="com in childCompanys"
                :key="com.organId"
                :label="com.abbrName"
                :value="com.organId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <el-form label-width="120px" :inline="true" :model="form">
          <el-form-item label="交易科目">
            <el-select v-model="form.transCode" placeholder="请选择科目">
              <el-option label="新契约投保" value="apply"></el-option>
              <el-option label="缴费确认" value="payment"></el-option>
              <el-option label="试算" value="proposal"></el-option>
              <el-option label="非实时投保" value="manualApply"></el-option>
              <el-option label="反交易" value="cancel"></el-option>
              <el-option label="保单查询" value="polQuery"></el-option>
              <el-option label="退保申请" value="cancellation"></el-option>
              <el-option label="退保查询" value="cancellationQuery"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="交易状态">
            <el-select v-model="form.transState" placeholder="请选择状态">
              <el-option label="成功" value="success"></el-option>
              <el-option label="失败" value="fail"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="单号">
            <el-input v-model="form.sendCode"></el-input>
          </el-form-item>
        </el-form>

        <el-form label-width="120px" :inline="true" :model="form">
          <el-form-item label="交易日期">
            <el-date-picker
              type="date"
              placeholder="开始日期"
              v-model="form.begenTransDate"
            ></el-date-picker>
            <span class="space"></span>
            <el-date-picker
              type="date"
              placeholder="截止日期"
              v-model="form.endTransDate"
            ></el-date-picker>

            <span class="space"></span>
            <span class="space"></span>
            <span class="space"></span>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-header>

    <el-main>
      <div>
        <el-table :data="tableData" style="width: 100%" max-height="500">
          <el-table-column prop="transNo" label="流水号"> </el-table-column>
          <el-table-column prop="bankCode" label="银行"> </el-table-column>
          <el-table-column prop="childCompany" label="地区"> </el-table-column>
          <el-table-column prop="sendCode" label="投保单号"> </el-table-column>
          <el-table-column prop="transDate" label="交易日期"> </el-table-column>
          <el-table-column prop="transCode" label="交易类别"> </el-table-column>
          <el-table-column prop="transState" label="状态"> </el-table-column>
          <el-table-column prop="errMsg" label="错误原因"> </el-table-column>
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>

<style scoped>
.space {
  margin-right: 50px;
}
.my-header {
  border-bottom: 1px solid #d7dae0;
}
</style>

<script>
export default {
  name: "RealTrans",
  data() {
    return {
      labelPosition: "right",
      form: {
        bankCode: "",
        company: "",
        childCompany: "",
        transCode: "",
        transState: "",
        sendCode: "",
        beginTransDate: "",
        endTransDate: "",
      },
      banks: [],
      childBanks: [],
      companys: [],
      childCompanys: [],
      tableData: [],
    };
  },
  methods: {
    getFirstLevelBank() {
      this.$http({
        method: "post",
        url: "/buss-process/api/bank/v1/find",
        data: {
          bankClass: "1",
        },
      }).then((res) => {
        console.log(res.data);
        this.banks = res.data;
      });
    },
    getChildBank() {
      this.$http({
        method: "post",
        url: "/buss-process/api/bank/v1/find",
        data: {
          branchBank: this.form.bankCode,
          bankClass: "2",
        },
      }).then((res) => {
        console.log(res.data);
        this.childBanks = res.data;
      });
    },
    getCompanys() {
      this.$http({
        method: "post",
        url: "/buss-process/api/companyOrgan/v1/find",
        data: {
          classId: "2",
        },
      }).then((res) => {
        console.log(res.data);
        this.companys = res.data;
      });
    },
    getChildCompanys() {
      this.$http({
        method: "post",
        url: "/buss-process/api/companyOrgan/v1/find",
        data: {
          parentId: this.form.company,
        },
      }).then((res) => {
        console.log(res.data);
        this.childCompanys = res.data;
      });
    },
    onSubmit() {
      this.$http({
        method: "post",
        url: "/buss-process/api/realTrans/v1/query",
        data: this.form,
      }).then((res) => {
        console.log(res.data);
        this.tableData = res.data;
      });
    },
  },
  mounted() {
    console.log("mounted");
    this.getFirstLevelBank();
    this.getCompanys();
  },
};
</script>