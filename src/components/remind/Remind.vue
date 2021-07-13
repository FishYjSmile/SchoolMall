<template>
  <div id="remind">
    <div class="remind-logo">
      <font-awesome-icon :icon="['fas', 'exclamation']"></font-awesome-icon>
    </div>
    <div class="remind-message">
      <p>
        {{displayMessage}}
      </p>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'Remind',
  props: {
    displayMessage: {
      type:String,
      default:null
    }
  }
}
</script>

<style>
  #remind {
    position: absolute;
    right: 20px;
    width: 300px;
    height: 100px;
    border-radius: 10px;
    background: linear-gradient(to right, #ff9569 0%, #e92758 100%);
    box-shadow: 1px 2px 2px #666;
  }
  .remind-logo {
    position: absolute;
    color: red;
    font-size: 50px;
    top: 20px;
    left: 20px;
  }
  .remind-message {
    position: absolute;
    width: 250px;
    height: 100px;
    /* background-color: bisque; */
    left: 60px;
    font-size: 20px;
  }
  .remind-message p{
    position: absolute;
    width: 200px;
    top: 35px;
    color: #fff;
    text-align: center;
  }
</style>