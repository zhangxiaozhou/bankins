<template>
	<el-container>
		<el-header height="100" class="my-header">
			<div>
				<el-form label-width="120px" :inline="true" :model="form">
					<el-form-item label="统计对象">
						<el-select v-model="form.bankCode" @change="getChildBank" placeholder="请选择总行">
							<el-option v-for="bank in banks" :key="bank.bankCode" :label="bank.bankName" :value="bank.bankCode"></el-option>
						</el-select>
						<el-select v-model="form.company" @change="getChildCompanys" placeholder="请选择分公司">
							<el-option v-for="com in companys" :key="com.organId" :label="com.abbrName" :value="com.organId"></el-option>
						</el-select>
						<el-select v-model="form.childCompany" placeholder="请选择机构">
							<el-option v-for="com in childCompanys" :key="com.organId" :label="com.abbrName" :value="com.organId"></el-option>
						</el-select>
					</el-form-item>

          <el-form-item label="单号">
            <el-input v-model="form.sendCode"></el-input>
          </el-form-item>

          <el-button type="primary" @click="onSubmit">查询</el-button>
				</el-form>

				<el-form label-width="100px" :inline="true" :model="form">
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
				</el-form>

				<!--<el-form label-width="120px" :inline="true" :model="form">

				</el-form>-->
			</div>
		</el-header>

		<el-main>
			<div>
				<el-table :data="tableData" style="width: 100%" max-height="600"  :row-style="{height: '35px'}" :cell-style="{padding: '7px'}" row-key="transNo">
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
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="currentPage"
                         :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</div>
			</div>

      <el-dialog
          title="交易详情"
          :visible.sync="dialogVisible"
          width="80%" >

        <el-collapse>
          <el-collapse-item title="投保单" name="1">
            <div>投保单详情</div>
          </el-collapse-item>
          <el-collapse-item title="投保人" name="2">
            <div>投保人详情；</div>
          </el-collapse-item>
          <el-collapse-item title="被保人" name="3">
            <div>被保人详情1；</div>
          </el-collapse-item>
          <el-collapse-item title="受益人" name="4">
            <div>受益人详情；</div>
          </el-collapse-item>
          <el-collapse-item title="险种" name="5">
            <div>险种信息；</div>
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
	export default {
		name: "RealTrans",
		data() {
			return {
        // eslint-disable-next-line no-mixed-spaces-and-tabs
			  pageSize: 10,
        dialogVisible: false,
        total: 0,
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
				tableData: [
        ],
			};
		},

		methods: {
      // eslint-disable-next-line no-unused-vars
      formatTransCode (row){
        let transCode = row.transCode
        if(transCode == 'apply'){
          return '投保';
        }else if(transCode == 'payment'){
          return '缴费'
        }
      },
      showDetails(row){
        this.dialogVisible = true;
        console.log(row)
      },
      formatTransState(row){
        let transState = row.transState;
        if(transState === true){
          return '成功';
        }else {
          return '失败'
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
					this.childCompanys = res.data;
				});
			},
			onSubmit() {
				this.$http({
					method: "post",
					url: "/buss-process/api/admin/v1/realTrans",
					data: this.form,
				}).then((res) => {
					console.log(res.data);
					this.tableData = res.data.content;
					this.total = res.data.totalElements
				});
			},
			handleSizeChange(val) {
				this.size = val
			},
			handleCurrentChange(val) {
				this.currentPage = val
			}
		},
		mounted() {
			console.log("mounted");
			this.getFirstLevelBank();
			this.getCompanys();
		},
	};
</script>
