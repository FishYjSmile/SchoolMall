<template>
<div>
  <div id="personal-mode">
    <div class="personal-mode-left">
      <div class="left-one">
        <slot name="left-one"></slot>
      </div>
      <div class="left-two">
        <slot name="left-two"></slot>
      </div>
      <div class="left-three">
        <slot name="left-three"></slot>
      </div>
    </div>
    <div class="personal-mode-center">
      <div class="center-one">
        <slot name="center-one"></slot>
      </div>
      <div class="center-two">
        <slot name="center-two"></slot>
      </div>
      <div class="center-three">
        <slot name="center-three"></slot>
      </div>
    </div>
    <div class="personal-mode-right">
       <div class="right-one">
        <slot name="right-one"></slot>
      </div>
      <div class="right-two">
        <slot name="right-two"></slot>
      </div>
      <div class="right-three">
        <slot name="right-three"></slot>
      </div>
    </div>
  </div>
  <slot name="Orders"></slot>
</div>
</template>

<script>
export default {

}
</script>

<style>
  #personal-mode {
    display: flex;
    width: 100%;
    height: 40px;
    background-color: rgb(243, 243, 243);
    line-height: 40px;
  }
  .personal-mode-left {
    display: flex;
    margin-left: 20px;
    flex: 2;
    
  }
  .personal-mode-center ,.personal-mode-right {
    display: flex;
    margin-left: 20px;
    flex: 1;
  }
  .left-one ,.left-two ,.left-three ,.center-one ,.center-two ,.center-three ,.right-one ,.right-two ,.right-three{
    text-align: center;
    flex: 1;
  }
  
</style>