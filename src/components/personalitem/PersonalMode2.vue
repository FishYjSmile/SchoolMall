<template>
  <div id="personal-mode2">
    <div class="personal-mode-left2">
      <div class="left-one2">
        <slot name="left-one2"></slot>
      </div>
      <div class="left-two2">
        <div style="width:300px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
        <slot name="left-two2"></slot>
        </div>
      </div>
      <div class="left-three2">
        <slot name="left-three2"></slot>
      </div>
    </div>
    <div class="personal-mode-center2">
      <div class="center-one2">
        <slot name="center-one2"></slot>
      </div>
      <div class="center-two2">
        <slot name="center-two2"></slot>
      </div>
      <div class="center-three2">
        <slot name="center-three2"></slot>
      </div>
    </div>
    <div class="personal-mode-right2">
       <div class="right-one2">
        <slot name="right-one2"></slot>
      </div>
      <div class="right-two2">
        <slot name="right-two2"></slot>
      </div>
      <div class="right-three2">
        <slot name="right-three2"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  #personal-mode2 {
    display: flex;
    width: 100%;
    height: 100px;
    background-color: #fff;
    line-height: 100px;
  }
  .personal-mode-left2 {
    display: flex;
    margin-left: 20px;
    flex: 2;
    
  }
  .personal-mode-center2 ,.personal-mode-right2 {
    display: flex;
    margin-left: 20px;
    flex: 1;
  }
  .left-one2 ,.left-two2 ,.left-three2 ,.center-one2 ,.center-two2 ,.center-three2 ,.right-one2 ,.right-two2 ,.right-three2{
    text-align: center;
    flex: 1;
  }
  
</style>