<template>
  <div id="personal-item">
    <div class="personal-item-left">
      <div class="left-one">
        <slot name="left-one"></slot>
      </div>
      <div class="left-two">
        <div style="width:500px;position: absolute;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
        <slot name="left-two"></slot>
        </div>
      </div>
      <div class="left-three">
        <slot name="left-three"></slot>
      </div>
    </div>
    <div class="personal-item-center">
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
    <div class="personal-item-right">
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
</template>

<script>
export default {

}
</script>

<style>
  #personal-item {
    display: flex;
    width: 100%;
    height: 100px;
    background-color: #fff;
    line-height: 100px;
  }
  .personal-item-frame {
    height: 100px;
    background-color: aquamarine;
    
  }.personal-item-left {
    display: flex;
    margin-left: 20px;
    flex: 2;
  }
  .personal-item-center ,.personal-item-right {
    display: flex;
    margin-left: 20px;
    flex: 1;
  }
  .left-one ,.left-two ,.left-three {
    flex: 1;
    
  }
  .center-one ,.center-two ,.center-three ,.right-one ,.right-two ,.right-three{
    flex: 1;
    text-align: center;
  }
  
</style>