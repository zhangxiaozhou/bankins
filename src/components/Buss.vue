<template>
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
						<el-select v-model="form.childCompany" :disabled="childDisabled" clearable placeholder="请选择机构">
							<el-option v-for="com in childCompanys" :key="com.organId" :label="com.abbrName" :value="com.organId"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="投保日期">
						<el-date-picker type="date" placeholder="开始日期" v-model="form.beginTransDate"></el-date-picker>

						<el-date-picker type="date" placeholder="截止日期" v-model="form.endTransDate"></el-date-picker>
					</el-form-item>
				</el-form>

				<el-form label-width="120px" :inline="true" :model="form">
					<el-form-item label="投保单号">

						<el-input v-model="form.sendCode"></el-input>
					</el-form-item>

					<el-form-item label="保单号">
						<el-input v-model="form.policyCode"></el-input>
					</el-form-item>

					<el-form-item label="销售渠道">
						<el-radio v-model="form.sellPlatform" label="0">全部</el-radio>
						<el-radio v-model="form.sellPlatform" label="1">柜面</el-radio>
						<el-radio v-model="form.sellPlatform" label="3">网上银行</el-radio>
						<el-radio v-model="form.sellPlatform" label="4">银行呼叫中心</el-radio>
						<el-radio v-model="form.sellPlatform" label="5">自助终端</el-radio>
						<el-radio v-model="form.sellPlatform" label="7">手机</el-radio>
						<el-radio v-model="form.sellPlatform" label="8">移动营销</el-radio>
					</el-form-item>
				</el-form>

				<el-form label-width="120px" :inline="true" :model="form">
					<el-form-item label="承保与否">
						<el-radio v-model="form.isAccept" label="0">全部</el-radio>
						<el-radio v-model="form.isAccept" label="2">未承保</el-radio>
						<el-radio v-model="form.isAccept" label="1">已承保</el-radio>
					</el-form-item>
					<span class="space"></span>
					<el-button @click="onSubmit">查询</el-button>
				</el-form>
			</div>
		</el-header>

		<el-main>
			<div>
				<el-table :data="tableData" style="width: 100%">
					<el-table-column prop="sendCode" label="投保单号"> </el-table-column>
					<el-table-column prop="policyCode" label="保单号"> </el-table-column>
					<el-table-column prop="realName" label="投保人"> </el-table-column>
					<el-table-column prop="applyTime" label="投保日期" > </el-table-column>
					<el-table-column prop="acceptTime" label="承保日期" > </el-table-column>
					<el-table-column label="险种信息" align="center" min-width="100">
						<!-- eslint-disable-next-line -->
						<template slot-scope="scope">
							<el-button type="text" @click="showProductInfos(scope.$index, scope.row)">详情</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="prem" label="保费"> </el-table-column>
					<el-table-column prop="zone" label="网点代码"> </el-table-column>
					<el-table-column prop="zoneName" label="网点名称"> </el-table-column>
				</el-table>
				<el-dialog title="险种详情" :visible.sync="dialogTableVisible">
					<el-table :data="productInfos">
						<el-table-column property="productName" label="险种名称" width="150"></el-table-column>
						<el-table-column property="productPrem" label="险种保费" width="200"></el-table-column>
					</el-table>
				</el-dialog>
				<div class="block" style="margin-left:30%">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="form.page"
					:page-sizes="[10]" :page-size="form.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
		data() {
			return {
				labelPosition: "right",
				dialogTableVisible: false,
				total: 0,
				form: {
					bankCode: "",
					company: "",
					sendCode: "",
					policyCode: "",
					sellPlatform: "",
					isAccept: "",
					beginTransDate: "",
					endTransDate: "",
					size: 10,
					page: 1
				},
				tableData: [],
				productInfos: [],
				banks: [],
				childBanks: [],
				companys: [],
				childCompanys: []
			};
		},
		methods: {
			onSubmit() {
				if(this.form.company==null ||this.form.company ==''){
					Message.error('请选择机构');
					return;
				}
				if(this.form.beginTransDate==null ||this.form.beginTransDate ==''){
					Message.error('请选择投保日期开始时间');
					return;
				}
				if(this.form.endTransDate==null ||this.form.endTransDate ==''){
					Message.error('请选择投保日期截止时间');
					return;
				}
				if(this.dateDiffer(this.form.beginTransDate,this.form.endTransDate)>7){
					Message.error('投保日期范围不能超过一周');
					return;
				}
				this.$http({
					method: "post",
					url: "/buss-process/api/buss/v1/query",
					data: this.form
				}).then((res) => {
					this.tableData = res.data.content;
					this.total=res.data.totalElements;
				}).catch(err =>{
					Message.error('查询失败'+err);
				});
			},
			handleSizeChange(val) {
				this.form.size = val;
				this.onSubmit();
			},
			handleCurrentChange(val) {
				this.form.page = val;
				this.onSubmit();
			},
			showProductInfos(index, row) {
				this.dialogTableVisible = true;
				this.productInfos = row.productInfos;
			},
			dateDiffer(d_begin,d_end){
				//date1结束时间
				let date1 = new Date(d_begin);
				//date2当前时间
				let date2 = new Date(d_end);
				date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
				date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
				const diff = date2.getTime() - date1.getTime(); //目标时间减去当前时间
				const diffDate = diff / (24 * 60 * 60 * 1000);// eslint-disable-line no-unused-vars	
				return	diffDate;
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
					this.childCompanys = res.data;
				});
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
					}else{
						this.form.childCompany=res.data.organId;
						this.childCompanys=[res.data];
						this.findByParentId(res.data.parentId);
						this.disabled=true;
						this.childDisabled=true;
					}
			
				})
			}
		},
		mounted() {
			this.getFirstLevelBank();
			//this.getCompanys();
			this.findCompanyOrgan();
		},
	};
</script>
