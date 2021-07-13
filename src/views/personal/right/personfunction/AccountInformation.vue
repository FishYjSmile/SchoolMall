<template>
  <div id="account-information">
    <div class="account-name">
      <el-upload
        class="avatar-uploader"
        action="#"
        :show-file-list="false"
        :on-success="handleAvatarSuccess" 
        :http-request="uploadFile"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-calendar v-model="value">
      </el-calendar>
      <!-- {{this.$store.state.cartmsg}} -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import PersonalMode from '../../../../components/personalitem/PersonalMode'
export default {
  components: {
    PersonalMode
  },
  data() {
      return {
        imageUrl: '',
        value: new Date()
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      uploadFile(param) {
        let formDatas = new FormData();
        formDatas.append('usersFile', param.file);
        formDatas.append('username',this.$store.state.username);
        
        axios.post('/api/FileImg',formDatas).then( res => {
          if(res.code == 0){
          this.$message({
            message: res.msg,
            type: 'success'
          });
        }else{
          this.$message({
            message: res.msg?res.msg:'操作失败',
            type: 'error'
          });
          }
          })
        console.log(formDatas);
      }
    }
}
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>