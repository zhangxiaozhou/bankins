<template>
  <el-container>
    <el-header height="100"
               class="my-header">
      <div>
        <el-form label-width="120px"
                 :inline="true"
                 :model="form">
          <el-form-item label="统计对象">
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
            <el-select v-model="form.bankCode"
                       placeholder="请选择总行">
              <el-option v-for="bank in banks"
                         :key="bank.bankCode"
                         :label="bank.bankName"
                         :value="bank.bankCode"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="投保日期">
            <el-date-picker type="date"
                            placeholder="开始日期"
                            v-model="form.startTime"
                            v-elDateFormat
							:picker-options="pickerOptions0"></el-date-picker>

            <el-date-picker type="date"
                            placeholder="截止日期"
                            v-model="form.endTime"
                            v-elDateFormat
							:picker-options="pickerOptions1"></el-date-picker>
          </el-form-item>
        </el-form>

        <el-form label-width="120px"
                 :inline="true"
                 :model="form">
          <el-form-item label="投保单号">

            <el-input v-model="form.sendCode"></el-input>
          </el-form-item>

          <el-form-item label="保单号">
            <el-input v-model="form.policyCode"></el-input>
          </el-form-item>
        <el-form-item label="销售渠道">
          <el-select v-model="form.sellPlatform"
                     :disabled="disabled"
                     clearable
                     placeholder="请选择销售渠道">
            <el-option label="全部"
                       value="">
			</el-option>
			<el-option label="柜面"
                       value="1">
			</el-option>
			<el-option label="网上银行"
                       value="3">
			</el-option>
			<el-option label="自助终端"
                       value="5">
			</el-option>
			<el-option label="手机"
                       value="7">
			</el-option>
			<el-option label="移动营销"
                       value="8">
			</el-option>
          </el-select>
		</el-form-item>
		<el-form-item label="承保与否">
          <el-select v-model="form.isAccept"
                      :disabled="disabled"
                      clearable
                      placeholder="请选择销售渠道">
             <el-option label="全部"
                        value="">
                      </el-option>
             <el-option label="未承保"
                        value="0">
                      </el-option>
             <el-option label="已承保"
                        value="1">
                      </el-option>
           </el-select>
		</el-form-item>
        </el-form>
          <span class="space"></span>
        <el-row>
          <el-button type="primary"
                     @click="search"
                     style="margin: 0px 0px 20px 420px;">查询</el-button>
		</el-row>
      </div>
    </el-header>

    <el-main>
      <div>
        <el-table :data="tableData"
                  style="width: 100%">
          <el-table-column prop="applyCode"
                           label="投保单号"> </el-table-column>
          <el-table-column prop="policyCode"
                           label="保单号"> </el-table-column>
          <el-table-column prop="appName"
                           label="投保人"> </el-table-column>
          <el-table-column prop="appTime"
                           label="投保日期"> </el-table-column>
          <el-table-column prop="acceptTime"
                           label="承保日期"> </el-table-column>
          <el-table-column prop="policyStatus"
                           label="保单状态"> </el-table-column>
          <el-table-column prop="productAbbr"
                           label="险种名称"> </el-table-column>
          <el-table-column prop="periodPrem"
                           label="险种保费"> </el-table-column>
          <el-table-column prop="periodPrem"
                           label="保费"> </el-table-column>
          <el-table-column prop="bankCode"
                           label="网点代码"> </el-table-column>
          <el-table-column prop="bankName"
                           label="网点名称"> </el-table-column>
        </el-table>
        <div class="block"
             style="margin-left:30%">
          <el-pagination @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         background
                         :current-page="form.page"
                         :page-sizes="[10]"
                         :page-size="form.size"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="total"
                         v-if="total>0">
          </el-pagination>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<style scoped>
.space {
  margin-right: 300px;
}

.my-header {
  border-bottom: 1px solid #d7dae0;
}
</style>

<script>
import { Message } from 'element-ui';
export default {
  name: "Buss",
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
      tableData: [],
      banks: [],
      companys: [],
      childCompanys: [],
      pickerOptions0: {
        disabledDate: (time) => {
          if (this.form.endTime) {
            return time.getTime() > Date.now() || time.getTime() > this.form.endTime;
           } else {
            return time.getTime() > Date.now();
           }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
             return time.getTime() < this.form.startTime || time.getTime() > Date.now();
        }
      },
    };
  },
  methods: {
    search(){
        this.form.page=1;
        this.onSubmit();
    },
    onSubmit () {
       if(this.form.sendCode=='' && this.form.policyCode==''){
           if (this.form.startTime == ''|| this.form.endTime == ''|| this.form.company == '') {
             Message.error("分公司，开始日期，结束日期为必选项");
             return;
           }
        if(this.dateDiffer(this.form.startTime,this.form.endTime)>7){
			Message.error("开始日期，截止日期范围不能超过一周");
			return;
			}
		}
      this.tableData=[];
      this.$http({
        method: "post",
        url: "/buss-process/api/buss/v1/query",
        data: this.form
      }).then((res) => {
		if(res.data==''){
			Message.info("查无数据");
			return;
		}
        this.tableData = res.data.content;
        this.total = res.data.totalElements;
      }).catch(err => {
        Message.error('查询失败' + err);
      });
    },
    handleSizeChange (val) {
      this.form.size = val;
      this.onSubmit();
    },
    handleCurrentChange (val) {
      this.form.page = val;
      this.onSubmit();
    },
    showProductInfos (index, row) {
      this.dialogTableVisible = true;
      this.productInfos = row.productInfos;
    },
    dateDiffer (d_begin, d_end) {
      //date1结束时间
      let date1 = new Date(d_begin);
      //date2当前时间
      let date2 = new Date(d_end);
      date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
      date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
      const diff = date2.getTime() - date1.getTime(); //目标时间减去当前时间
      const diffDate = diff / (24 * 60 * 60 * 1000);// eslint-disable-line no-unused-vars	
      return diffDate;
    },
    getFirstLevelBank () {
      this.$http({
        method: "post",
        url: "/buss-process/api/bank/v1/find",
        data: {
          bankClass: "1",
        },
      }).then((res) => {
        this.banks = res.data;
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
    }
  },
  mounted () {
    this.getFirstLevelBank();
    this.findCompanyOrgan();
  },
};
</script>
