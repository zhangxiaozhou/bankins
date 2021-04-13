<template>
  <el-container>
    <el-header height="100"
               class="my-header">
      <div>
        <el-form label-width="120px"
                 :inline="true"
                 :model="form">
          <el-form-item label="统计对象">
            <el-select v-model="form.bankCode"
                       clearable
                       placeholder="请选择总行">
              <el-option v-for="bank in banks"
                         :key="bank.bankCode"
                         :label="bank.bankName"
                         :value="bank.bankCode"></el-option>
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
                            v-model="form.startTime"></el-date-picker>

            <el-date-picker type="date"
                            placeholder="截止日期"
                            v-model="form.endTime"></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-form label-width="120px"
                 :inline="true"
                 :model="form">
          <el-form-item label="投保单号">
            <el-input v-model="form.sendCode"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-form label-width="120px"
                 :inline="true"
                 :model="form">
          <el-form-item label="保单号">
            <el-input v-model="form.policyCode"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-form label-width="120px"
                 :inline="true"
                 :model="form">
          <el-form-item label="对账结果">
            <el-select v-model="form.region"
                       placeholder="请选择结果">
              <el-option label="正确"
                         value="shanghai"></el-option>
              <el-option label="错误"
                         value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-form label-width="120px"
                 :inline="true"
                 :model="form">
          <el-form-item label="按钮">
            <el-button type="primary"
                       @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-header>
    <el-main>
      <div>
        <el-table :data="tableData"
                  style="width: 100%">
          <el-table-column prop="bussType"
                           label="业务类型"> </el-table-column>
          <el-table-column prop="bankCode"
                           label="银行"> </el-table-column>
          <el-table-column prop="transDate"
                           label="交易日期"> </el-table-column>
          <el-table-column prop="sendCode"
                           label="投保单号"> </el-table-column>
          <el-table-column prop="policyCode"
                           label="保单号"> </el-table-column>
          <el-table-column prop="ask"
                           label="渠道"> </el-table-column>
          <el-table-column prop="policyState"
                           label="保单状态"> </el-table-column>
          <el-table-column prop="accpeterFail"
                           label="承保失败原因"> </el-table-column>
          <el-table-column prop="fail"
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
import { Message } from 'element-ui';
export default {
  name: "Trans",
  data () {
    return {
      labelPosition: "right",
      dialogTableVisible: false,
      disabled: false,
      childDisabled: false,
      show: false,
      total: 0,
      loading: false,
      form: {
        bankCode: "",
        company: "",
        childCompany: "",
        sendCode: "",
        policyCode: "",
        sellPlatform: "",
        isAccept: "",
        startTime: "",
        endTime: "",
        size: 10,
        page: 1
      },
      banks: [{ bankCode: '0008', bankName: '中信银行' },
      { bankCode: '0010', bankName: '福建兴业银行' },
      { bankCode: '0013', bankName: '浦东发展银行' },
      { bankCode: '0005', bankName: '交通银行' }],
      tableData: [],
      companys: [],
      childCompanys: []
    };
  },
  methods: {
    search () {
      this.form.page = 1;
      this.onSubmit();
    },
    onSubmit () {
      if (this.form.sendCode == '' && this.form.policyCode == '') {
        if (this.form.startTime == '' || this.form.endTime == '' || this.form.company == '' ||
          this.form.startTime == null || this.form.endTime == null || this.form.company == null) {
          Message.error("分公司，开始日期，结束日期为必选项");
          return;
        }
        if (this.dateDiffer(this.form.startTime, this.form.endTime) > 7) {
          Message.error("开始日期，截止日期范围不能超过一周");
          return;
        }
      }
    },
  },
};
</script>