<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title" @contextmenu.prevent="test('1')">后台管理系统</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item prop="UserName">
          <el-input v-model="ruleForm.UserName" placeholder="UserName">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="ruleForm.PassWord"
            @keyup.enter.native="submitForm('ruleForm')"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <slide-verify
          :l="42"
          :r="10"
          :w="310"
          :h="155"
          slider-text="向右滑动"
          @success="onSuccess"
          @fail="onFail"
          @refresh="onRefresh"
        ></slide-verify>
        <div>{{msg}}</div>
        <p class="login-tips">Tips : 用户名和密码随便填。</p>
      </el-form>
    </div>
    <!-- <form-create v-model="fApi" :rule="rule" :option="option"></form-create> -->
  </div>
</template>

<script>
import Vue from "vue";
import Vuex from "vuex";
import storage from "@/api/storage";
import { login } from "@/api/user";
import routes from "@/router/index";
import { GetMenuTreeForCurrentUser } from "@/api/menu";
import formCreate, { maker } from "@form-create/element-ui";
import SlideVerify from "vue-monoplasty-slide-verify";
Vue.use(SlideVerify);
export default {
  components: {
  
    formCreate: formCreate.$form()
  },
  data: function() {
    return {
      msg:"拖动",
      model: {},
      fApi: {},
      option: {
        onSubmit: function(formData, fApi) {
          // alert(JSON.stringify(formData));

          console.info(fApi);
          //this.fApi.btn.loading();
        },
        mounted: function() {}
      },
      //表单生成规则
      rule: [
        {
          type: "input",
          field: "goods_name",
          title: "商品名称"
        },
        {
          type: "datePicker",
          field: "created_at",
          title: "创建时间"
        }
      ],
      ruleForm: {
        UserName: "administrator",
        PassWord: "12345678"
      },
      rules: {
        UserName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        PassWord: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      storage.set("username", this.ruleForm.UserName);
      this.$refs[formName].validate(valid => {
        if (valid) {
          login(this.ruleForm)
            .then(function(response) {
              if (response.Code === 0) {
                storage.set("token", response.Data);

                let result = GetMenuTreeForCurrentUser()
                  .then(function(response) {
                    storage.set(
                      "sidebarMenu",
                      JSON.stringify(response.Data.Result)
                    );
                    routes.push("/");
                  })
                  .catch(function(error) {});
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onSuccess() {
      this.msg = "login success";
    },
    onFail() {
      this.msg = "";
    },
    onRefresh() {
      this.msg = "";
    }
  },
  mounted: function() {}
};
$(function() {
  storage.clear();
  // alert('引入成功')
});
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: rgb(179, 19, 19);
}
</style>