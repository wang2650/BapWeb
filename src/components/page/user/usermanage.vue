<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item>
          <el-input v-model="filters.name" placeholder="用户名或昵称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUsers">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="users"
      highlight-current-row
      v-loading="listLoading"
      @selection-change="selsChange"
      style="width: 100%;"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="性别">
              <span>{{ sexText(props.row.Sex) }}</span>
            </el-form-item>
            <el-form-item label="可用U盾">
              <span>{{yesornoText(props.row.UserKey) }}</span>
            </el-form-item>
            <el-form-item label="必用U盾">
              <span>{{ yesornoText(props.row.IsMustUseKey) }}</span>
            </el-form-item>
            <el-form-item label="介绍">
              <span>{{ props.row.Introduction }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column type="index" width="80" fixed></el-table-column>
      <el-table-column prop="ID" width="80" label="用户ID"></el-table-column>
      <el-table-column prop="NickName" label="昵称" width="150"></el-table-column>
      <el-table-column prop="UserName" label="登录名" width="150"></el-table-column>
      <el-table-column prop="TelePhone" label="电话" width="150"></el-table-column>
      <el-table-column prop="RelationPerson" label="联系人" width="150"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button size="small" @click="resetpassword(scope.$index, scope.row)">重置密码</el-button>

          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
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
        <el-form-item label="昵称" prop="NickName">
          <el-input v-model="editForm.NickName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="登录名" prop="UserName">
          <el-input v-model="editForm.UserName" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="PassWord">
          <el-input v-model="editForm.PassWord" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="Sex">
          <el-radio v-model="editForm.Sex" label="1">男</el-radio>
          <el-radio v-model="editForm.Sex" label="2">女</el-radio>
          <el-radio v-model="editForm.Sex" label="3">未知</el-radio>
        </el-form-item>

        <el-form-item label="电话" prop="TelePhone">
          <el-input v-model="editForm.TelePhone" auto-complete="off" class="width200"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="RelationPerson">
          <el-input v-model="editForm.RelationPerson" auto-complete="off" class="width200"></el-input>
        </el-form-item>
        <el-form-item label="可用U盾" prop="UserKey">
          <el-radio v-model="editForm.UserKey" label="1">是</el-radio>
          <el-radio v-model="editForm.UserKey" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="必用U盾" prop="IsMustUseKey">
          <el-radio v-model="editForm.IsMustUseKey" label="1">是</el-radio>
          <el-radio v-model="editForm.IsMustUseKey" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="介绍">
          <el-input type="textarea" v-model="editForm.Introduction"></el-input>
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
        <el-form-item label="昵称" prop="NickName">
          <el-input v-model="addForm.NickName" auto-complete="off" class="width200"></el-input>
        </el-form-item>
        <el-form-item label="登录名" prop="UserName">
          <el-input v-model="addForm.UserName" auto-complete="off" class="width200"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="PassWord">
          <el-input
            v-model="addForm.PassWord"
            auto-complete="off"
            placeholder="不填则用默认密码"
            class="width200"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="Sex">
          <el-radio v-model="addForm.Sex" label="1">男</el-radio>
          <el-radio v-model="addForm.Sex" label="2">女</el-radio>
          <el-radio v-model="addForm.Sex" label="3">未知</el-radio>
        </el-form-item>

        <el-form-item label="电话" prop="TelePhone">
          <el-input v-model="addForm.TelePhone" auto-complete="off" class="width200"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="RelationPerson">
          <el-input v-model="addForm.RelationPerson" auto-complete="off" class="width200"></el-input>
        </el-form-item>
        <el-form-item label="可用U盾" prop="UserKey">
          <el-radio v-model="addForm.UserKey" label="1">是</el-radio>
          <el-radio v-model="addForm.UserKey" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="必用U盾" prop="IsMustUseKey">
          <el-radio v-model="addForm.IsMustUseKey" label="1">是</el-radio>
          <el-radio v-model="addForm.IsMustUseKey" label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="介绍">
          <el-input type="textarea" v-model="addForm.Introduction"></el-input>
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
  GetUserList,
  InsertUser,
  DeleteUser,
  BatchRemoveUser,
  UpdateUsers,
  ResetPassord
} from "@/api/user";
export default {
  data() {
    return {
      filters: {
        name: ""
      },
      users: [],
      total: 0,
      page: 1,
      pagesize: 10,
      listLoading: false,
      sels: [], //列表选中列

      addDialogFormVisible: false,
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        UserName: [
          { required: true, message: "请输入登录名", trigger: "blur" }
        ],
        NickName: [{ required: true, message: "请输入昵称", trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {
        id: 0,
        UserName: "",
        NickName: "",
        PassWord: "",
        Introduction: "",
        TelePhone: "",
        RelationPerson: "",
        Url: "",
        UserKey: 2,
        Sex: 1,
        Sequence: 0,
        IsMustUseKey: 2
      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        UserName: [
          { required: true, message: "请输入登录名", trigger: "blur" }
        ],
        NickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        PassWord: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      //新增界面数据
      addForm: {
        UserName: "",
        NickName: "",
        PassWord: "",
        Introduction: "",
        TelePhone: "",
        RelationPerson: "",
        Url: "",
        UserKey: 2,
        Sex: 1,
        Sequence: 0,
        IsMustUseKey: 2
      }
    };
  },
  methods: {
    sexText(val) {
      return utils.sexText(val);
    },
    yesornoText(val) {
      return utils.yesornoText(val);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },
    //获取用户列表
    getUsers() {
      let para = {
        Page: { PageIndex: this.page, PageSize: this.pagesize },
        UserName: this.filters.name
      };
      this.listLoading = true;
      GetUserList(para).then(res => {
        this.listLoading = false;
        if (res.Code === 0) {
          this.total = res.Data.Total;
          this.users = res.Data.Result;
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
          let para = { userId: row.ID };
          DeleteUser(para).then(res => {
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

            this.getUsers();
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
        UserName: "",
        NickName: "",
        PassWord: "",
        Introduction: ""
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

            UpdateUsers(para).then(res => {
              this.editLoading = false;
              if (res.Code === 0) {
                //NProgress.done();
                this.$message({
                  message: "操作成功",
                  type: "success"
                });
                this.$refs["editForm"].resetFields();
                this.editFormVisible = false;
                this.getUsers();
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
            InsertUser(para)
              .then(res => {
                this.addLoading = false;
                if (res.Code === 0) {
                  this.$message({
                    message: "操作成功",
                    type: "success"
                  });
                  this.$refs["addForm"].resetFields();
                  this.addFormVisible = false;
                  this.getUsers();
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
    },
    //批量删除
    batchRemove: function() {
      var ids = this.sels.map(item => item.ID).toString();
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { ids: ids };
          BatchRemoveUser(para).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getUsers();
          });
        })
        .catch(() => {});
    },
    //重置密码
    resetpassword: function(index, row) {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            let para = { UserId: row.ID };
            ResetPassord(para).then(res => {
              if (res.Code === 0) {
                //NProgress.done();
                this.$message({
                  message: "操作成功",
                  type: "success"
                });
              } else {
                this.$message({
                  message: res.Errors.join("  "),
                  type: "error"
                });
              }
            });
          });
        }
      });
    }
  },
  mounted() {
    this.getUsers();
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