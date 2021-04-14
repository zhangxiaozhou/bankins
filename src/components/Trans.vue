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
                            v-model="form.startDate"></el-date-picker>

            <el-date-picker type="date"
                            placeholder="截止日期"
                            v-model="form.endDate"></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-form label-width="120px">
          <el-form-item label="交易处理状态">
            <el-select v-model="form.applyStatus"
                       placeholder="请选择状态">
              <el-option label="全部"
                         value=""></el-option>
              <el-option label="已取消"
                         value="-1"></el-option>
              <el-option label="待处理"
                         value="1"></el-option>
              <el-option label="已处理"
                         value="2"></el-option>
              <el-option label="已回馈"
                         value="3"></el-option>
              <el-option label="已打印待签收"
                         value="4"></el-option>
              <el-option label="已打印已签收"
                         value="5"></el-option>
              <el-option label="已缴费待打印"
                         value="6"></el-option>
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
          <el-table-column prop="bank"
                           label="银行代码"> </el-table-column>
          <el-table-column prop="zone"
                           label="地区代码"> </el-table-column>
          <el-table-column prop="dept"
                           label="网点代码"> </el-table-column>
          <el-table-column prop="transDate"
                           label="交易日期"> </el-table-column>
          <el-table-column prop="transCate"
                           label="交易分类"> </el-table-column>
          <el-table-column prop="sendCode"
                           label="投保单号">
            <template slot-scope="scope">
              <el-button @click="showDetails(scope.row)"
                         type="text"
                         size="medium">{{scope.row.sendCode}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="policyCode"
                           label="保单号"> </el-table-column>
          <el-table-column prop="acceptDate"
                           label="承保日期"> </el-table-column>
          <el-table-column prop="applyStatus"
                           label="受理状态"> </el-table-column>
          <el-table-column prop="policyStatus"
                           label="投保单状态"> </el-table-column>
        </el-table>
        <div class="block"
             style="margin-left:30%">
          <el-pagination @current-change="handleCurrentChange"
                         @size-change="handleSizeChange"
                         background
                         :current-page="form.page"
                         :page-sizes="[10,20,50,100]"
                         :page-size="form.size"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="total"
                         v-if="total>0">
          </el-pagination>
        </div>
        <el-dialog title="交易详情"
                   :visible.sync="dialogVisible"
                   width="80%">

          <el-collapse v-model="activeNames">
            <el-collapse-item title="投保单"
                              name="1">
              <div>
                <el-table :data="policyDetail">
                  <el-table-column prop="sendCode"
                                   label="投保单号"> </el-table-column>
                  <el-table-column prop="policyCode"
                                   label="保单号"> </el-table-column>
                  <el-table-column prop="holdDate"
                                   label="投保日期"> </el-table-column>
                  <el-table-column prop="validateDate"
                                   label="保单生效日期"> </el-table-column>
                </el-table>
              </div>
            </el-collapse-item>
            <el-collapse-item title="投保人"
                              name="2">
              <div>
                <el-table :data="policyDetail.holderDetail">
                  <el-table-column prop="realName"
                                   label="投保人姓名"> </el-table-column>
                  <el-table-column prop="gender"
                                   :formatter="formatGender"
                                   label="性别"> </el-table-column>
                  <el-table-column prop="birthday"
                                   label="出生日期"
                                   width="100px"> </el-table-column>
                  <el-table-column prop="certiType"
                                   label="证件类型"
                                   align="center"> </el-table-column>
                  <el-table-column prop="certiCode"
                                   label="证件号码"
                                   width="160px"
                                   header-align="center"> </el-table-column>
                  <el-table-column prop="address1"
                                   label="地址"
                                   width="250px"
                                   header-align="center"> </el-table-column>
                  <el-table-column prop="zip1"
                                   label="邮编"> </el-table-column>
                  <el-table-column prop="tell"
                                   label="电话"
                                   width="110px"> </el-table-column>
                  <el-table-column prop="celler"
                                   label="手机"
                                   width="110px"> </el-table-column>
                  <el-table-column prop="income"
                                   label="年收入"> </el-table-column>
                  <el-table-column prop="nationality"
                                   label="国籍"> </el-table-column>
                  <el-table-column prop="jobCom"
                                   label="单位名称"> </el-table-column>
                  <el-table-column prop="jobCode"
                                   label="职业类别"> </el-table-column>
                  <el-table-column prop="relationId"
                                   label="与被保人关系"> </el-table-column>
                </el-table>
              </div>
            </el-collapse-item>
            <el-collapse-item title="被保人"
                              name="3">
              <div>
                <el-table :data="policyDetail.insurantDetail">
                  <el-table-column prop="realName"
                                   label="被保人姓名"> </el-table-column>
                  <el-table-column prop="gender"
                                   :formatter="formatGender"
                                   label="性别"> </el-table-column>
                  <el-table-column prop="birthday"
                                   label="出生日期"
                                   width="100px"> </el-table-column>
                  <el-table-column prop="certiType"
                                   label="证件类型"> </el-table-column>
                  <el-table-column prop="certiCode"
                                   label="证件号码"
                                   width="160px"
                                   header-align="center"> </el-table-column>
                  <el-table-column prop="relaAddress"
                                   label="地址"
                                   width="250px"
                                   header-align="center"> </el-table-column>
                  <el-table-column prop="zip1"
                                   label="邮编"> </el-table-column>
                  <el-table-column prop="tell"
                                   label="电话"
                                   width="110px"> </el-table-column>
                  <el-table-column prop="celler"
                                   label="手机"
                                   width="110px"> </el-table-column>
                  <el-table-column prop="jobCode"
                                   label="职业类别"> </el-table-column>
                  <el-table-column prop="income"
                                   label="年收入"> </el-table-column>
                  <el-table-column prop="nationality"
                                   label="国籍"> </el-table-column>
                  <el-table-column prop="jobCom"
                                   label="单位名称"> </el-table-column>
                </el-table>
              </div>
            </el-collapse-item>
            <el-collapse-item title="险种信息"
                              name="4">
              <div>
                <el-table :data="policyDetail.productDetail">
                  <el-table-column prop="internalId"
                                   label="险种代码"> </el-table-column>
                  <el-table-column prop="unit"
                                   label="投保份数"> </el-table-column>
                  <el-table-column prop="chargePeriod"
                                   label="缴费年期类型"> </el-table-column>
                  <el-table-column prop="chargeYear"
                                   label="缴费年期"> </el-table-column>
                  <el-table-column prop="coveragePeriod"
                                   label="保障年期类型"> </el-table-column>
                  <el-table-column prop="coverageYear"
                                   label="保障年期"> </el-table-column>
                  <el-table-column prop="chargePeriod"
                                   label="领取起始年期类型"> </el-table-column>
                  <el-table-column prop="chargeYear"
                                   label="领取起始年期"> </el-table-column>
                  <el-table-column prop="endPeriod"
                                   label="领取终止年期类型"> </el-table-column>
                  <el-table-column prop="endYear"
                                   label="领取终止年期"> </el-table-column>
                  <el-table-column prop="prem"
                                   label="期交保费"> </el-table-column>
                </el-table>
              </div>
            </el-collapse-item>
            <el-collapse-item title="错误信息"
                              name="5">
              <div>
                <el-table :data="policyDetail.manualPolicyDetail">
                  <el-table-column prop="checkStatus"
                                   label="错误代码"> </el-table-column>
                  <el-table-column prop="errMsg"
                                   label="错误原因"> </el-table-column>
                </el-table>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-dialog>
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
        applyStatus: "",
        startDate: "",
        endDate: "",
        size: 10,
        page: 1
      },
      banks: [{ bankCode: '0008', bankName: '中信银行' },
      { bankCode: '0010', bankName: '福建兴业银行' },
      { bankCode: '0013', bankName: '浦东发展银行' },
      { bankCode: '0005', bankName: '交通银行' }],
      tableData: [],
      policyDetail: [{
        holderDetail: [],
        insurantDetail: [],
        productDetail: [],
        manualPolicyDetail: [],
      }],
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
      if (this.form.sendCode == '') {
        if (this.form.startDate == '' || this.form.endDate == '' || this.form.company == '' ||
          this.form.startDate == null || this.form.endDate == null || this.form.company == null) {
          Message.error("分公司，开始日期，结束日期为必选项");
          return;
        }
        if (this.dateDiffer(this.form.startDate, this.form.endDate) > 7) {
          Message.error("开始日期，截止日期范围不能超过一周");
          return;
        }
      }
      this.loading = true;
      this.$http({
        method: "get",
        url: "/buss-process/api/manualPolicy/v1/getList",
        data: this.form,
      }).then((res) => {
        console.log(res.data);
        this.tableData = res.data.content;
        this.total = res.data.totalElements;
        this.loading = false;
      });
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
    },
    handleCurrentChange (val) {
      this.form.page = val;
      this.onSubmit();
    },
    handleSizeChange (val) {
      this.form.size = val;
      this.form.page = 1;
      this.onSubmit();
    },
    showDetails (row) {
      this.policyDetail = [];
      this.requestMsg = '';
      this.responseMsg = '';
      this.dialogVisible = true;
      this.errMsg = row.errMsg;
      this.$http({
        method: "get",
        url: "/buss-process/api/admin/v1/realTrans/showDetail/",
        params: {
          sendCode: row.sendCode
        }
      }).then((res) => {
        this.policyDetail = [res.data];
        this.policyDetail.holderDetail = [res.data.holder];
        this.policyDetail.insurantDetail = res.data.insurants;
        this.policyDetail.productDetail = res.data.policyProducts;
        this.policyDetail.manualPolicyDetail = res.data.manualPolicyDTO;
      });
    },
  },
  mounted () {
    // this.getFirstLevelBank();
    this.findCompanyOrgan();
  }
};
</script>