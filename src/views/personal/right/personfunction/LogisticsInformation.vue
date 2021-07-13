<template>
  <div id="logistics-information">
    <PersonalMode>
      <template slot="left-one">姓名</template>
      <template slot="left-two">详细地址</template>
      <template slot="left-three">电话</template>
      <template slot="center-one">邮政编码</template>
      <template slot="right-one">操作</template>
      <template slot="right-two" v-if="$store.state.username"><div @click="$store.commit('Tooltip1',true)" class="logistics-Add">添加地址</div></template>
      <PersonalMode2 slot="Orders" v-for="(item,index) in $store.state.CartItemData[0]" :key="index">
        <template slot="left-one2">{{item.NAME}}</template>
        <template slot="left-two2">{{item.ADDRESS}}</template>
        <template slot="left-three2">{{item.PHONE}}</template>
        <template slot="center-one2">{{item.ZIP_CODE}}</template>
        <template slot="center-two2">{{item.ID}}</template>

        <template slot="right-one2">
          <span class="logistics-update" @click="LogisticsUpdate(index)">
            <font-awesome-icon :icon="['fas', 'edit']"></font-awesome-icon></span>
          <span class="logistics-delete" @click="LogosticsDelete(index)">
            <font-awesome-icon :icon="['fas', 'trash-alt']"></font-awesome-icon>
          </span>
        </template>
      </PersonalMode2>
    </PersonalMode>
  </div>
</template>

<script>
import PersonalMode from '../../../../components/personalitem/PersonalMode.vue'
import PersonalMode2 from '../../../../components/personalitem/PersonalMode2.vue'
export default {
  components: {
    PersonalMode,
    PersonalMode2,
  },
  data() {
    return {
      
    }
  },
  methods: {
    LogisticsUpdate(index) {
      if(this.$store.state.username) {
        this.$store.commit('Tooltip',true)
        this.$store.commit('LogisticsCurrent',index)
        setTimeout(() => {
          this.$store.commit('LogisticsCurrent',-1)
        }, 0);
      }
      
    },
    LogosticsDelete(index) {
      if(this.$store.state.username) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.$store.commit('LogisticsCurrent',index)
            this.$store.commit('LogisticsDelete',true)
            setTimeout(() => {
              this.$store.commit('LogisticsCurrent',-1)
            }, 0);
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
        }
      
    }
  }
}
</script>

<style>
.logistics-Add {
  position: absolute;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  top:-43px;height:35px;
  width:100px;
  border-radius:15px;
  
  line-height: 35px;
  cursor: pointer;
  transition: all .3s;
  border: 1px solid #576a6d;
  box-shadow: 1px 1px 5px gray;
}
.logistics-Add:hover {
  border: 1px solid #00bcd4;
  box-shadow: 1px 1px 5px #00bcd4;
}
.logistics-update ,.logistics-delete{
  width: 35px;
  height: 35px;
  cursor: pointer;
  display: inline-block;
  position: relative;
  line-height: 35px;
  text-align: center;
  
}
.logistics-update {
  left: -7px;
  background-color: #03a9f4;
  color: #fff;
}
.logistics-delete {
  color: #fff;
  right: -10px;
  background-color: red;
}
.logistics-update:hover,.logistics-delete:hover {
  color: rgb(211, 211, 211);
}
</style>