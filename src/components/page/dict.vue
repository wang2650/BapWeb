<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item>
          <el-input v-model="filters.GroupName" placeholder="组名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDicts">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="dicts" highlight-current-row v-loading="listLoading" style="width: 100%;">
      <el-table-column type="index" width="80" fixed></el-table-column>
      <el-table-column prop="Id" width="80" label="字典Id"></el-table-column>
      <el-table-column prop="DictKey" label="键" width="150"></el-table-column>
      <el-table-column prop="DictValue" label="值" width="150"></el-table-column>
      <el-table-column prop="GroupName" label="组名" width="150"></el-table-column>
      <el-table-column prop="DictType" label="类型" width="150"></el-table-column>
      <el-table-column prop="OrderBy" label="排序" width="50"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="10"
        :total="total"
        style="float:right;"
      ></el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog
      title="编辑"
      :visible.sync="editFormVisible"
      v-model="editFormVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="键" prop="DictKey">
          <el-input v-model="editForm.DictKey" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="值" prop="DictValue">
          <el-input v-model="editForm.DictValue" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="DictType">
          <el-input v-model="editForm.DictType" auto-complete="on"></el-input>
        </el-form-item>

        <el-form-item label="排序" prop="OrderBy">
          <el-input v-model="editForm.OrderBy" auto-complete="off" class="width200"></el-input>
        </el-form-item>
        <el-form-item label="组名" prop="GroupName">
          <el-input v-model="editForm.GroupName" auto-complete="off" class="width200"></el-input>
        </el-form-item>

        <el-form-item label="描述">
          <el-input type="textarea" v-model="editForm.Description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog
      title="新增"
      :visible.sync="addFormVisible"
      v-model="addFormVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm" size="mini">
        <el-form-item label="键" prop="DictKey">
          <el-input v-model="addForm.DictKey" auto-complete="off" class="width200"></el-input>
        </el-form-item>
        <el-form-item label="值" prop="DictValue">
          <el-input v-model="addForm.DictValue" auto-complete="off" class="width200"></el-input>
        </el-form-item>

        <el-form-item label="类型" prop="DictType">
          <el-input v-model="addForm.DictType" auto-complete="off" class="width200"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="OrderBy">
          <el-input v-model="addForm.OrderBy" auto-complete="off" class="width200"></el-input>
        </el-form-item>

        <el-form-item label="组名" prop="GroupName">
          <el-input v-model="addForm.GroupName" auto-complete="off" class="width200"></el-input>
        </el-form-item>

        <el-form-item label="描述">
          <el-input type="textarea" v-model="addForm.Description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native.prevent="addSubmit">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import utils from "@/api/utils";
import {
  InsertDict,
  UpdateDict,
  DeleteDictByDictId,
  DeleteDictByGroupName,
  GetDictList,
  GetGroupList
} from "@/api/dict";
export default {
  data() {
    return {
      filters: {
        GroupName: ""
      },
      dicts: [],
      total: 0,
      page: 1,
      pagesize: 10,
      listLoading: false,
      sels: [], //列表选中列

      addDialogFormVisible: false,
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        DictKey: [
          { required: true, message: "请输入字典的key", trigger: "blur" }
        ],
        GroupName: [{ required: true, message: "请输入组名", trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {
        Id: 0,
        DictKey: "",
        DictValue: "",
        DictType: "",
        OrderBy: 0,
        Description: "",
        GroupName: ""
      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        DictKey: [
          { required: true, message: "请输入字典的key", trigger: "blur" }
        ],
        GroupName: [{ required: true, message: "请输入组名", trigger: "blur" }]
      },
      //新增界面数据
      addForm: {
        DictKey: "",
        DictValue: "",
        DictType: "",
        OrderBy: 0,
        Description: "",
        GroupName: ""
      }
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getDicts();
    },
    //获取字典列表
    getDicts() {
      let para = {
        Page: { PageIndex: this.page, PageSize: this.pagesize },
        GroupName: this.filters.GroupName
      };
      this.listLoading = true;
      GetDictList(para).then(res => {
        this.listLoading = false;
        if (res.Code === 0) {
          this.total = res.Data.Total;
          this.dicts = res.Data.Result;
        } else {
          message({
            message: "获取列表失败",
            type: "warning"
          });
        }
      });
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { Id: row.ID };
          DeleteDictByDictId(para).then(res => {
            this.listLoading = false;
            //NProgress.done();
            if (res.Code === 0) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
            } else {
              this.$message({
                message: res.Errors.join("  "),
                type: "error"
              });
            }

            this.getDicts();
          });
        })
        .catch(() => {});
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    //显示新增界面
    handleAdd() {
      this.addFormVisible = true;
      this.addForm = {
        DictKey: "",
        DictValue: "",
        DictType: "",
        OrderBy: 0,
        Description: "",
        GroupName: ""
      };
    },
    //编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.editForm);

            UpdateDict(para).then(res => {
              this.editLoading = false;
              if (res.Code === 0) {
                //NProgress.done();
                this.$message({
                  message: "操作成功",
                  type: "success"
                });
                this.$refs["editForm"].resetFields();
                this.editFormVisible = false;
                this.getDicts();
              } else {
                this.editLoading = false;
                this.$message({
                  message: res.Errors.join("  "),
                  type: "error"
                });
              }
            });
          });
        }
      });
    },
    //新增
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.addForm);
            InsertDict(para)
              .then(res => {
                this.addLoading = false;
                if (res.Code === 0) {
                  this.$message({
                    message: "操作成功",
                    type: "success"
                  });
                  this.$refs["addForm"].resetFields();
                  this.addFormVisible = false;
                  this.getDicts();
                } else {
                  this.$message({
                    message: res.Errors.join("  "),
                    type: "error"
                  });
                }
              })
              .catch(error => {
                this.addLoading = false;
                console.log(error);
              });
          });
        } else {
          return false;
        }
      });
    },
    selsChange: function(sels) {
      this.sels = sels;
    }
  },
  mounted() {
    this.getDicts();
  }
};
</script>
<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>