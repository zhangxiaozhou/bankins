<template>
  <el-container>
    <el-header height="100"
               class="my-header">
      <div>
        <el-form label-width="120px"
                 :inline="true"
                 :model="form"
                 @submit.native.prevent>
          <el-form-item label="银行代码">
            <el-select v-model="form.bank"
                       clearable
                       placeholder="请选择银行">
              <el-option v-for="bank in banks"
                         :key="bank.bankCode"
                         :label="bank.bankName"
                         :value="bank.bankCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类别">
            <el-select v-model="form.type"
                       placeholder="请选择类别"
                       clearable>
              <el-option label="全部"
                         value=""></el-option>
              <el-option v-for="type in types"
                         :key="type.code"
                         :label="type.name"
                         :value="type.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内部险种代码">
            <el-input v-model.trim="form.innerCode"></el-input>
          </el-form-item>
          <el-form-item label="外部险种代码">
            <el-input v-model.trim="form.outerCode"></el-input>
          </el-form-item>
        </el-form>
        <el-form label-width="120px"
                 :inline="true"
                 :model="form"
                 @submit.native.prevent>
          <el-form-item label="名称">
            <el-input v-model.trim="form.name"></el-input>
          </el-form-item>
        </el-form>
        <el-form label-width="120px"
                 :inline="true"
                 style="margin-left: 40%;"
                 @submit.native.prevent>
          <el-form-item>
            <el-button type="primary"
                       @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="insert('ruleForm')">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-header>

    <el-main>
      <div>
        <el-table :data="tableData"
                  style="width:100%">
          <el-table-column prop="bank"
                           label="银行代码"> </el-table-column>
          <el-table-column prop="type"
                           label="类别"
                           :formatter="getTypeName"></el-table-column>
          <el-table-column prop="innerCode"
                           label="内部险种代码"> </el-table-column>
          <el-table-column prop="outerCode"
                           label="外部险种代码"> </el-table-column>
          <el-table-column prop="name"
                           label="名称"> </el-table-column>
          <el-table-column label="操作"
                           fixed="right"
                           width="100">
            <template slot-scope="scope">
              <el-button @click="updateProdConvert(scope.row)"
                         type="text"
                         size="small">修改</el-button>
              <el-button @click="deleteProdConvert(scope.row)"
                         type="text"
                         size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background
                       layout="prev, pager, next"
                       @current-change="handleCurrentChange"
                       :current-page="form.page"
                       :page-size="form.size"
                       :total="total"
                       v-if="total>0">
        </el-pagination>
      </div>
    </el-main>

    <!-- 新增和修改的dialog -->
    <el-dialog title="产品代码转换"
               :visible.sync="dialogForm"
               :closeOnClickModal="false"
               @close="closeDialog">
      <el-form label-width="120px"
               :inline="true"
               :model="ruleForm"
               ref="ruleForm"
               :rules="rule"
               @submit.native.prevent>
        <el-form-item label="银行代码"
                      prop="bank">
          <el-select v-model="ruleForm.bank"
                     clearable
                     placeholder="请选择银行">
            <el-option v-for="bank in banks"
                       :key="bank.bankCode"
                       :label="bank.bankName"
                       :value="bank.bankCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类别"
                      prop="type">
          <el-select v-model="ruleForm.type"
                     placeholder="请选择类别"
                     clearable>
            <el-option v-for="type in types"
                       :key="type.code"
                       :label="type.name"
                       :value="type.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内部险种代码"
                      prop="innerCode">
          <el-input style="width: 218px;"
                    v-model.trim="ruleForm.innerCode"
                    @blur="codeBlur()"></el-input>
        </el-form-item>
        <el-form-item label="外部险种代码"
                      prop="outerCode">
          <el-input style="width: 218px;"
                    v-model.trim="ruleForm.outerCode"></el-input>
        </el-form-item>
        <el-form-item label="名称"
                      prop="name">
          <el-input style="width: 218px;"
                    v-model.trim="ruleForm.name"></el-input>
        </el-form-item>
        <el-input v-model="ruleForm.id"
                  class="pid"></el-input>
      </el-form>
      <el-form label-width="120px"
               @submit.native.prevent>
        <el-form-item style="margin-top: 20px;">
          <el-button type="primary"
                     @click="saveProdConvert('ruleForm')"
                     style="margin 20px 50% 10px 0px">确定</el-button>
          <el-button type="primary"
                     @click="cancheProdConvert()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<style scoped>
.my-header {
  border-bottom: 1px solid #d7dae0;
}
.pid {
  display: none;
}
</style>

<script>
export default {
  name: 'ProductCodeMapping',
  data () {
    return {
      loading: false,
      form: {
        page: 1,
        size: 10,
        id: "",
        bank: "",
        type: "",
        innerCode: "",
        outerCode: "",
        name: ""
      },
      ruleForm: {
        id: "",
        bank: "",
        type: "",
        innerCode: "",
        outerCode: "",
        name: ""
      },
      types: [{
        code: 1, name: "PRODUCT"
      }, {
        code: 2, name: "PTPACK"
      }],
      rule: {
        bank: [
          { required: true, message: "请选择银行", trigger: 'change' }
        ],
        type: [
          { required: true, message: "请选择类别", trigger: "change" }
        ],
        innerCode: [
          { required: true, message: "请输入内部险种代码", trigger: "blur" }
        ],
        outerCode: [
          { required: true, message: "请输入外部险种代码", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入产品名称", trigger: "blur" }
        ]
      },
      total: 0,
      tableData: [],
      banks: [],
      dialogForm: false
    }
  },
  methods: {
    findAllBank () {
      this.$http({
        method: "post",
        url: "/buss-process/api/bank/v1/find",
        data: {
          bankClass: "1"
        }
      }).then((res) => {
        console.log(res.data);
        this.banks = res.data;
      });
    },
    closeDialog () {
      this.$refs.ruleForm.resetFields();
    },
    getList () {
      this.$http({
        method: "post",
        url: "/buss-process/api/productConvert/v1/findAll",
        data: this.form
      }).then((res) => {
        this.loading = true;
        console.log(res.data);
        this.tableData = res.data.content;
        this.total = res.data.totalElements
        console.log(this.total)
        this.loading = false;
      });
    },
    handleCurrentChange (val) {
      console.log(val);
      this.form.page = val;
      this.getList()
    },
    onSubmit () {
      this.form.page = 1;
      this.getList();
    },
    insert (form) {
      if (this.$refs[form] !== undefined) {
        this.ruleForm = Object.assign({}, '')
        this.$refs[form].resetFields();

      }
      this.dialogForm = true;
    },
    saveProdConvert (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            method: "post",
            url: "/buss-process/api/productConvert/v1/save",
            data: this.ruleForm
          }).then((res) => {
            console.log(res);
            if (res.data.code === "0") {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.getList();
              this.dialogForm = false
            } else if (res.data.code === "1") {
              this.$message.error(res.data.msg);
              this.clear();
            } else {
              this.$message.error("系统内部异常");
              this.clear();
            }
          })
        } else {
          return false;
        }
      })
    },
    cancheProdConvert () {
      this.getList();
      this.dialogForm = false;
    },
    updateProdConvert (val) {
      console.log(val)
      this.ruleForm = val
      this.dialogForm = true;
    },
    deleteProdConvert (val) {
      console.log(val)
      this.$confirm("此操作将永久删除该数据,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          method: "post",
          url: "/buss-process/api/productConvert/v1/delete",
          data: val
        }).then((res) => {
          if (res.status === 200) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getList();
          } else {
            this.$message.console.error("删除失败");
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      });
    },
    getTypeName (row) {
      for (const key in this.types) {
        if (this.types[key].code == row.type) {
          return this.types[key].name
        }
      }
      return ""
    },
    clear () {
      this.ruleForm.id = "";
      this.ruleForm.bank = "";
      this.ruleForm.type = "";
      this.ruleForm.innerCode = "";
      this.ruleForm.outerCode = "";
      this.ruleForm.name = "";
    },
    codeBlur () {
      console.log(this.ruleForm.innerCode);
      this.$http({
        method: "post",
        url: "/buss-process/api/productConvert/v1/getProd",
        params: {
          productId: this.ruleForm.innerCode
        }
      }).then((res) => {
        console.log(res.data)
        this.ruleForm.name = res.data
      }).catch((Response) => {
        console.log(Response)
        this.ruleForm.name = ""
        this.$message.console.error(Response.message);
      });
    }
  },
  mounted () {
    console.log("mounted");
    this.findAllBank();
  },
};
</script>
<style>
.el-form-item__error {
  line-height: 0px;
}
</style>