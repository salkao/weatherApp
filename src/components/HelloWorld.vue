<template>
  <div class="component">
      <titleNav id="titleNav"/>
    <div class='square-box'>
        <div class='square-content'>
          <div class="navBar">

          </div>
            <weatherInfo/>
        </div>
    </div>
  </div>
</template>

<script>
import titleNav from './titleNav.vue';
import weatherInfo from './weatherInfo.vue';

export default {
  name: 'HelloWorld',
  components: {
    titleNav,
    weatherInfo,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.square-box{
    position: relative;
    width: 56%;
    overflow: hidden;
    margin: auto;
    min-width: 250px;
    background-color: #323232;
    border-radius: 20px;
    min-height: 500px;
}
.square-box:before{
    content: "";
    display: block;
    padding-top: 100%;
}
.square-content{
    position:  absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    color: white;
    text-align: center;
}
#titleNav{
  width: 55%;
  margin: auto;
}
.navBar{
  position: absolute;
  width: 100%;
  height: 50px;
  background: linear-gradient(to bottom,#3aa7fc, #0845af);
  top: 0;
}
</style>
