<template>
  <div id="personal-mode1">
    <div class="personal-mode1-left">
      <div class="left-one1">
        <div style="width:700px;position: absolute;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
        <slot name="left-one"></slot>
        </div>
      </div>
      <div class="left-two1">
        <slot name="left-two"></slot>
      </div>
      <div class="left-three1">
        <slot name="left-three"></slot>
      </div>
    </div>
    <div class="personal-mode1-center">
      <div class="center-one1">
        <slot name="center-one"></slot>
      </div>
      <div class="center-two1">
        <slot name="center-two"></slot>
      </div>
      <div class="center-three1">
        <slot name="center-three"></slot>
      </div>
    </div>
    <div class="personal-mode1-right">
       <div class="right-one1">
        <slot name="right-one"></slot>
      </div>
      <div class="right-two1">
        <slot name="right-two"></slot>
      </div>
      <div class="right-three1">
        <slot name="right-three"></slot>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {

}
</script>

<style>
  #personal-mode1 {
    display: flex;
    width: 100%;
    height: 80px;
    background-color: rgb(243, 243, 243);
    line-height: 40px;
  }
  .personal-mode1-left {
    display: flex;
    margin-left: 20px;
    flex: 2;
    
  }
  .personal-mode1-center ,.personal-mode1-right {
    display: flex;
    margin-left: 20px;
    flex: 1;
  }
  .left-one1 ,.left-two1 ,.left-three1  {
    flex: 1;
    line-height: 80px;
  }
  .center-one1 ,.center-two1 ,.center-three1 ,.right-one1 ,.right-two1 ,.right-three1 {
    flex: 1;
    line-height: 80px;
    text-align: center;
  }
  
</style>