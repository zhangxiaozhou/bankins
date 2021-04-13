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

            <el-select v-model="form.company"
                       @change="getChildCompanys"
                       :disabled="disabled"
                       clearable
                       placeholder="请选择分公司">
              <el-option v-for="com in companys"
                         :key="com.organId"
                         :label="com.abbrName"
                         :value="com.organId"></el-option>
            </el-select>
            <el-select v-model="form.childCompany"
                       :disabled="childDisabled"
                       v-if="show"
                       clearable
                       placeholder="请选择机构">
              <el-option v-for="com in childCompanys"
                         :key="com.organId"
                         :label="com.abbrName"
                         :value="com.organId"></el-option>
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
        <el-form label-width="120px">
          <el-form-item label="交易处理状态">
            <el-select v-model="form.region"
                       placeholder="请选择状态">
              <el-option label="全部"
                         value="shanghai"></el-option>
              <el-option label="已取消"
                         value="beijing"></el-option>
              <el-option label="待处理"
                         value="shanghai"></el-option>
              <el-option label="已回馈"
                         value="beijing"></el-option>
              <el-option label="已打印待签收"
                         value="shanghai"></el-option>
              <el-option label="已打印已签收"
                         value="beijing"></el-option>
              <el-option label="已缴费待打印"
                         value="beijing"></el-option>
            </el-select>
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
        <el-form>
          <el-form-item>
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
    getCompanys () {
      this.$http({
        method: "post",
        url: "/buss-process/api/companyOrgan/v1/find",
        data: {
          classId: "2",
        },
      }).then((res) => {
        this.companys = res.data;
      });
    },
    getChildCompanys () {
      this.$http({
        method: "post",
        url: "/buss-process/api/companyOrgan/v1/find",
        data: {
          parentId: this.form.company,
        },
      }).then((res) => {
        this.form.childCompany = "";
        this.childCompanys = res.data;
        this.show = true
      });
    },
    findCompanyOrgan () {
      this.$http({
        method: "post",
        url: "/buss-process/api/companyOrgan/v1/findByOrganId"
      }).then((res) => {
        console.log(res.data);
        if (res.data.classId === 1) {
          this.getCompanys();
        } else if (res.data.classId === 2) {
          this.companys = [res.data];
          this.form.company = res.data.organId;
          this.findAllCompanyOrgan(this.form.company);
          this.disabled = true;
          this.show = true;
        } else {
          this.form.childCompany = res.data.organId;
          this.childCompanys = [res.data];
          this.findByParentId(res.data.parentId);
          this.disabled = true;
          this.childDisabled = true;
          this.show = true;
        }
      })
    },
    findByParentId (parentId) {
      this.$http({
        method: "post",
        url: "/buss-process/api/companyOrgan/v1/findByParentId",
        params: {
          parentId: parentId
        }
      }).then((res) => {
        this.form.company = res.data.organId;
        this.companys = [res.data];
      })
    },
    findAllCompanyOrgan (organId) {
      this.$http({
        method: "post",
        url: "/buss-process/api/companyOrgan/v1/find",
        data: {
          parentId: organId
        }
      }).then((res) => {
        this.childCompanys = res.data;
      })
    }
  },
};
</script>