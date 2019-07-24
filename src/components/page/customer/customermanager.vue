<template>
  <section>
    <el-row :gutter="20">
      <el-col :span="2">
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </el-col>
      <el-col :span="2">
        <el-button plain round icon="el-icon-s-operation" @click="displaySearchTab">搜索框</el-button>
      </el-col>

      <el-col :span="20">
        <div v-if="this.searchCustomerVisible">
          <el-tabs>
            <el-tab-pane label="基本信息项" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="职务职级信息项" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="任职单位" name="third">角色管理</el-tab-pane>
        
          </el-tabs>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <!--列表-->
      <el-col :span="24">
        <el-table
          :data="customers"
          highlight-current-row
          v-loading="listLoading"
          @selection-change="selsChange"
          style="width: 100%;"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column type="index" width="80"></el-table-column>
          <el-table-column prop="Id" label="角色Id" width="80"></el-table-column>
          <el-table-column prop="RoleName" label="角色名" width="150"></el-table-column>
          <el-table-column prop="Description" label="说明" width="150"></el-table-column>
          <el-table-column
            prop="AddDateTime"
            label="创建时间"
            width="120"
            :formatter="formatCreateTime"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
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
    </el-row>

    <el-dialog
      title="客户信息"
      :visible="dialogCustomerVisible"
      width="1200px"
      center
      @close="dialogCustomerVisible=false"
    >
      <el-row :gutter="24">
        <el-col :span="4">

 <el-collapse>
<el-collapse-item title="常用信息" name="commoninfo">
          <el-menu @select="handleSelectMenu">
          <el-menu-item index="jbxx">
              <i class="el-icon-menu"></i>
              <span slot="title">基本信息</span>
            </el-menu-item>
            <el-menu-item index="xzzwxx">
              <i class="el-icon-menu"></i>
              <span slot="title">行政职务信息</span>
            </el-menu-item>
            <el-menu-item index="zjxx">
              <i class="el-icon-menu"></i>
              <span slot="title">职级信息</span>
            </el-menu-item>
            <el-menu-item index="xlxx">
              <i class="el-icon-menu"></i>
              <span slot="title">学历信息</span>
            </el-menu-item>
                  <el-menu-item index="xwxx">
              <i class="el-icon-menu"></i>
              <span slot="title">学位信息</span>
            </el-menu-item>


                  <el-menu-item index="llxx">
              <i class="el-icon-menu"></i>
              <span slot="title">履历信息</span>
            </el-menu-item>

      <el-menu-item index="jlzsxx">
              <i class="el-icon-menu"></i>
              <span slot="title">经历综述信息</span>
            </el-menu-item>

      <el-menu-item index="zyjszgxx">
              <i class="el-icon-menu"></i>
              <span slot="title">专业技术资格信息</span>
            </el-menu-item>

      <el-menu-item index="jtcyxx">
              <i class="el-icon-menu"></i>
              <span slot="title">家庭成员信息</span>
            </el-menu-item>

      <el-menu-item index="pxxx">
              <i class="el-icon-menu"></i>
              <span slot="title">培训信息</span>
            </el-menu-item>

      <el-menu-item index="cgxx">
              <i class="el-icon-menu"></i>
              <span slot="title">出国信息</span>
            </el-menu-item>
      <el-menu-item index="jcxx">
              <i class="el-icon-menu"></i>
              <span slot="title">奖惩信息</span>
            </el-menu-item>

      <el-menu-item index="bcxx">
              <i class="el-icon-menu"></i>
              <span slot="title">补充信息</span>
            </el-menu-item>

      <el-menu-item index="zzkhkcxx">
              <i class="el-icon-menu"></i>
              <span slot="title">组织考核考察信息</span>
            </el-menu-item>

      <el-menu-item index="dztxxx">
              <i class="el-icon-menu"></i>
              <span slot="title">地址通信信息</span>
            </el-menu-item>

      <el-menu-item index="zzkhxx">
              <i class="el-icon-menu"></i>
              <span slot="title">组织考核信息</span>
            </el-menu-item>
      <el-menu-item index="jlxx">
              <i class="el-icon-menu"></i>
              <span slot="title">交流信息</span>
            </el-menu-item>
      <el-menu-item index="xlxx">
              <i class="el-icon-menu"></i>
              <span slot="title">学历信息</span>
            </el-menu-item>

          </el-menu>


           </el-collapse-item>

<el-collapse-item title="其他信息" name="otherinfo">
          <el-menu @select="handleSelectMenu">
          <el-menu-item index="hbgbxx">
              <i class="el-icon-menu"></i>
              <span slot="title">后备干部信息</span>
            </el-menu-item>

           </el-menu>


           </el-collapse-item>


           </el-collapse>
        </el-col>
        <el-col :span="20">
           <div>

    <el-form  label-width="80px" >
        <el-form-item label="角色名" >
          <el-input  auto-complete="off"></el-input>
        </el-form-item>

     
      </el-form>
      <div slot="footer" class="dialog-footer">
<el-button type="primary" @click="handleAdd">新增</el-button>
      </div>


             </div>
        </el-col>
      </el-row>
    </el-dialog>
  </section>
</template>


<script>
export default {
  data() {
    return {
      listLoading: false, // 列表加载进度
      dialogCustomerVisible: true, // 对话框是否显示
      searchCustomerVisible: true, // 搜索框是否显示
      customers: [], // 客户数据
      sels: [], //列表选中列
      total: 0
    };
  },
  methods: {
    formatCreateTime(row, column) {
      let datetime = row.AddDateTime;
      if (datetime) {
        return moment(datetime).format("YYYY-MM-DD HH-mm");
      }
      return "";
    },
    displaySearchTab() {
      this.searchCustomerVisible = !this.searchCustomerVisible;
    },
    selsChange: function(sels) {
      this.sels = sels;
    },
    handleCurrentChange(val) {
      this.page = val;
      // this.getroles();
    },
     handleSelectMenu(key, keyPath) {
        console.log(key, keyPath);
      },
    handleAdd() {}
  }
};
</script>