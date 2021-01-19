<template>
<<<<<<< HEAD
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
                       clearable
                       placeholder="请选择机构">
              <el-option v-for="com in childCompanys"
                         :key="com.organId"
                         :label="com.abbrName"
                         :value="com.organId"></el-option>
            </el-select>
            <el-select v-model="form.bankCode"
                       @change="getChildBank"
                       placeholder="请选择总行">
              <el-option v-for="bank in banks"
                         :key="bank.bankCode"
                         :label="bank.bankName"
                         :value="bank.bankCode"></el-option>
            </el-select>
          </el-form-item>
=======
	<el-container>
		<el-header height="100" class="my-header">
			<div>
				<el-form label-width="120px" :inline="true" :model="form">
					<el-form-item label="统计对象">
						<el-select v-model="form.bankCode" @change="getChildBank" placeholder="请选择总行">
							<el-option v-for="bank in banks" :key="bank.bankCode" :label="bank.bankName" :value="bank.bankCode"></el-option>
						</el-select>
						<el-select v-model="form.company" @change="getChildCompanys" :disabled="disabled" clearable placeholder="请选择分公司">
							<el-option v-for="com in companys" :key="com.organId" :label="com.abbrName" :value="com.organId"></el-option>
						</el-select>
						<el-select v-model="form.childCompany" :disabled="childDisabled" v-if="display" clearable placeholder="请选择机构">
							<el-option v-for="com in childCompanys" :key="com.organId" :label="com.abbrName" :value="com.organId"></el-option>
						</el-select>
					</el-form-item>
>>>>>>> 28737c243a146a5bb31a446882bbdbc69702e7eb

					<el-form-item label="单号">
						<el-input v-model="form.sendCode"></el-input>
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
							<el-option label="成功" value=true></el-option>
							<el-option label="失败" value=false></el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="交易日期">
						<el-date-picker type="date" placeholder="开始日期" v-model="form.beginTransDate"></el-date-picker>
						<el-date-picker type="date" placeholder="截止日期" v-model="form.endTransDate"></el-date-picker>
						
					</el-form-item>
					
					<el-button type="primary" @click="onSubmit">查询</el-button>
				</el-form>


			</div>
		</el-header>

		<el-main>
			<div>
				<el-table :data="tableData" v-loading="loading" style="width: 100%" max-height="600" :row-style="{height: '35px'}"
				:cell-style="{padding: '7px'}" row-key="transNo">
					<el-table-column label="流水号">
						<template slot-scope="scope">
							<el-button @click="showDetails(scope.row)" type="text" size="mini">{{scope.row.transNo}}</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="bankCode" label="银行"> </el-table-column>
					<el-table-column prop="childCompany" label="地区"> </el-table-column>
					<el-table-column prop="sendCode" label="投保单号"> </el-table-column>
					<el-table-column prop="transDate" label="交易日期"> </el-table-column>
					<el-table-column prop="transCode" label="交易类别" :formatter="formatTransCode"> </el-table-column>
					<el-table-column prop="transState" label="状态" :formatter="formatTransState"> </el-table-column>
					<el-table-column prop="errMsg" label="错误原因"> </el-table-column>
				</el-table>
				<div class="block" style="margin-left:30%">
					<el-pagination @current-change="handleCurrentChange" background :current-page="form.currentPage" :page-sizes="[10]"
					:page-size="form.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" v-if="total>0">
					</el-pagination>
				</div>
			</div>

			<el-dialog title="交易详情" :visible.sync="dialogVisible" width="80%">

				<el-collapse>
					<el-collapse-item title="投保单" name="1">
						<div>
							<el-table :data="policyDetail">
								<el-table-column prop="sendCode" label="投保单号"> </el-table-column>
								<el-table-column prop="holdDate" label="投保日期"> </el-table-column>
								<el-table-column prop="bankAccount" label="银行账户"> </el-table-column>
								<el-table-column prop="payMode" label="缴费方式"> </el-table-column>
								<el-table-column prop="deliverType" label="保单领取方式"> </el-table-column>
							</el-table>
						</div>
					</el-collapse-item>
					<el-collapse-item title="投保人" name="2">
						<div>
							<el-table :data="policyDetail.holderDetail">
								<el-table-column prop="realName" label="姓名"> </el-table-column>
								<el-table-column prop="gender" :formatter="formatGender" label="性别"> </el-table-column>
								<el-table-column prop="birthday" label="出生日期"> </el-table-column>
								<el-table-column prop="certiType" label="证件类型"> </el-table-column>
								<el-table-column prop="certiCode" label="证件号码"> </el-table-column>
								<el-table-column prop="certiValidate" label="证件有效期"> </el-table-column>
								<el-table-column prop="height" label="身高(cm)"> </el-table-column>
								<el-table-column prop="weight" label="体重(kg)"> </el-table-column>
								<el-table-column prop="income" label="年收入(万)" :formatter="convertIncome"> </el-table-column>
								<el-table-column prop="nationality" label="国籍"> </el-table-column>
								<el-table-column prop="address1" label="地址"> </el-table-column>
								<el-table-column prop="zip1" label="邮编"> </el-table-column>
								<el-table-column prop="tell" label="电话"> </el-table-column>
								<el-table-column prop="celler" label="手机"> </el-table-column>
								<el-table-column prop="jobCode" label="职业类别"> </el-table-column>
								<el-table-column prop="jobCom" label="单位名称"> </el-table-column>
								<el-table-column prop="relationId" label="与被保人关系"> </el-table-column>
							</el-table>
						</div>
					</el-collapse-item>
					<el-collapse-item title="被保人" name="3">
						<div>
							<el-table :data="policyDetail.insurantDetail">
								<el-table-column prop="realName" label="姓名"> </el-table-column>
								<el-table-column prop="gender" :formatter="formatGender" label="性别"> </el-table-column>
								<el-table-column prop="birthday" label="出生日期"> </el-table-column>
								<el-table-column prop="certiType" label="证件类型"> </el-table-column>
								<el-table-column prop="certiCode" label="证件号码"> </el-table-column>
								<el-table-column prop="certiValidate" label="证件有效期"> </el-table-column>
								<el-table-column prop="height" label="身高(cm)"> </el-table-column>
								<el-table-column prop="weight" label="体重(kg)"> </el-table-column>
								<el-table-column prop="income" label="年收入(万元)" :formatter="convertIncome"> </el-table-column>
								<el-table-column prop="nationality" label="国籍"> </el-table-column>
								<el-table-column prop="relaAddress" label="地址"> </el-table-column>
								<el-table-column prop="zip1" label="邮编"> </el-table-column>
								<el-table-column prop="tell" label="电话"> </el-table-column>
								<el-table-column prop="celler" label="手机"> </el-table-column>
								<el-table-column prop="jobCode" label="职业类别"> </el-table-column>
							</el-table>
						</div>
					</el-collapse-item>
					<el-collapse-item title="身故受益人" name="4">
						<div>
							<el-table :data="policyDetail.beneDetail">
								<el-table-column prop="realName" label="姓名"> </el-table-column>
								<el-table-column prop="gender" :formatter="formatGender" label="性别"> </el-table-column>
								<el-table-column prop="birthday" label="出生日期"> </el-table-column>
								<el-table-column prop="certiType" label="证件类型"> </el-table-column>
								<el-table-column prop="certiCode" label="证件号码"> </el-table-column>
								<el-table-column prop="certiValidate" label="证件有效期"> </el-table-column>
								<el-table-column prop="beneOrder" label="受益顺序" > </el-table-column>
								<el-table-column prop="beneRate" label="受益比例" :formatter="convertRate"> </el-table-column>
								<el-table-column prop="relationId" label="与被保人关系"> </el-table-column>
							</el-table>
						</div>
					</el-collapse-item>
					<el-collapse-item title="险种" name="5">
						<div>
							<el-table :data="policyDetail.productDetail">
								<el-table-column prop="internalId" label="险种代码"> </el-table-column>
								<el-table-column prop="unit" label="投保份数"> </el-table-column>
								<el-table-column prop="chargePeriod" label="缴费年期类型"> </el-table-column>
								<el-table-column prop="chargeYear" label="缴费年期"> </el-table-column>
								<el-table-column prop="coveragePeriod" label="保障年期类型"> </el-table-column>
								<el-table-column prop="coverageYear" label="保险年期"> </el-table-column>
								<el-table-column prop="chargeType" label="领取年期类型"> </el-table-column>
								<el-table-column prop="payYear" label="起领年龄"> </el-table-column>
								<el-table-column prop="endYear" label="终领年龄"> </el-table-column>
								<el-table-column prop="prem" label="期交保费"> </el-table-column>
							</el-table>
						</div>
					</el-collapse-item>
					<el-collapse-item title="银行报文" name="6" >
						请求报文<el-input :value="this.requestMsg"  type="textarea" :rows="10"></el-input>
						返回报文<el-input :value="this.responseMsg"  type="textarea" :rows="5"></el-input>
					</el-collapse-item>
					<el-collapse-item title="错误描述" name="7" >
						{{this.errMsg}}
					</el-collapse-item>
				</el-collapse>
			</el-dialog>
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
	import {
		Message
	} from 'element-ui';
	export default {
		name: "RealTrans",
		data() {
			return {
				// eslint-disable-next-line no-mixed-spaces-and-tabs
				dialogVisible: false,
				total: 0,
				loading: false,
				disabled: false,
				childDisabled: false,
				labelPosition: "right",
				display:false,
				form: {
					bankCode: "",
					company: "",
					childCompany: "",
					transCode: "",
					transState: "",
					sendCode: "",
					beginTransDate: "",
					endTransDate: "",
					currentPage: 1,
					pageSize: 10,
				},
				banks: [],
				childBanks: [],
				companys: [],
				childCompanys: [],
				tableData: [],
				policyDetail: [{
					holderDetail: [],
					insurantDetail: [],
					beneDetail: [],
					productDetail: [],
				}],
				requestMsg: "",
				responseMsg: "",
				errMsg:""
			};
		},

		methods: {
			// eslint-disable-next-line no-unused-vars
			formatTransCode(row) {
				let transCode = row.transCode
				if (transCode == 'apply') {
					return '投保';
				} else if (transCode == 'payment') {
					return '缴费'
				}
			},
			showDetails(row) {
				this.policyDetail=[];
				this.requestMsg='';
				this.responseMsg='';
				this.dialogVisible = true;
				this.errMsg=row.errMsg;
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
					this.policyDetail.beneDetail = res.data.insurants[0].policyBenes;
					this.policyDetail.productDetail = res.data.policyProducts;
				}).catch(err=>{
					Message.info('查询不到该投保单详情'+err);
				});
				
				this.$http({
					method: "get",
					url: "/buss-process/api/admin/v1/realTrans/findMsg/",
					params: {
						transNo: row.transNo,
						bank: row.bankCode
					}
				}).then((res) => {
					this.responseMsg=res.data.responseMsg;
					this.requestMsg=res.data.requestMsg;
				}).catch(err=>{
					Message.error('查询不到银行报文'+err);
				});
			},
			formatTransState(row) {
				let transState = row.transState;
				if (transState) {
					return '成功';
				} else {
					return '失败';
				}
			},
			formatGender(row) {
				let gender = row.gender;
				if (gender == 'M') {
					return '男';
				} else {
					return '女';
				}
			},
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
					this.form.childCompany='';
					this.childCompanys = res.data;
					this.display=true;
				});
			},
			onSubmit() {
				this.tableData=[];
				if (this.form.sendCode == null || this.form.sendCode == '') {
					if (this.form.beginTransDate == null || this.form.beginTransDate == '') {
						Message.error('请选择投保日期开始时间');
						return;
					}
					if (this.form.endTransDate == null || this.form.endTransDate == '') {
						Message.error('请选择投保日期截止时间');
						return;
					}
					if (this.dateDiffer(this.form.beginTransDate, this.form.endTransDate) > 7) {
						Message.error('交易日期范围不能超过一周');
						return;
					}
				}
				this.loading = true;
				this.$http({
					method: "post",
					url: "/buss-process/api/admin/v1/realTrans",
					data: this.form,
				}).then((res) => {
					console.log(res.data);
					this.tableData = res.data.content;
					this.total = res.data.totalElements;
					this.loading = false;
				});
			},
			handleCurrentChange(val) {
				this.form.currentPage = val;
				this.onSubmit();
			},
			dateDiffer(d_begin, d_end) {
				//date1结束时间
				let date1 = new Date(d_begin);
				//date2当前时间
				let date2 = new Date(d_end);
				date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
				date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
				const diff = date2.getTime() - date1.getTime(); //目标时间减去当前时间
				const diffDate = diff / (24 * 60 * 60 * 1000); // eslint-disable-line no-unused-vars	
				return diffDate;
			},
			findCompanyOrgan(){
			this.$http({
				method:"post",
				url:"/buss-process/api/companyOrgan/v1/findByOrganId"
			}).then((res) =>{
				console.log(res.data);
				if(res.data.classId===1){
					this.getCompanys();
				}else if(res.data.classId===2){
					this.companys=[res.data];
					this.form.company=res.data.organId;
					this.findAllCompanyOrgan(this.form.company);
					this.disabled=true;
					this.display=true;
				}else{
					this.form.childCompany=res.data.organId;
					this.childCompanys=[res.data];
					this.findByParentId(res.data.parentId);
					this.disabled=true;
					this.childDisabled=true;
					this.display=true;
				}
		
			})
		},
			findByParentId(parentId) {
				this.$http({
					method: "post",
					url: "/buss-process/api/companyOrgan/v1/findByParentId",
					params: {
						parentId: parentId
					}
				}).then((res) => {
					console.log(res.data);
					this.form.company=res.data.organId;
					this.companys = [res.data];
				})
			},
			findAllCompanyOrgan(organId) {
				this.$http({
					method: "post",
					url: "/buss-process/api/companyOrgan/v1/find",
					data: {
						parentId: organId
					}
				}).then((res) => {
					console.log(res.data);
					this.childCompanys = res.data;
					this.display=true;
				})
			},
			convertIncome(row){
				return row.income/10000;
			},
			convertRate(row){
				return row.beneRate*100 +'%';
			}
		},
		mounted() {
			this.getFirstLevelBank();
			//this.getCompanys();
			this.findCompanyOrgan();
		},
	};
</script>
