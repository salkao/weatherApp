<template>
  <div class="component">
      <titleNav id="titleNav"/>
    <div class='square-box'>
        <div class='square-content'>

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
  @media only screen and (max-width: 600px) {
    .square-box {
      min-width: 300px !important;
    }
  }
.square-box{
    position: relative;
    width: 56%;
    overflow: hidden;
    margin: auto;
    min-width: 250px;
    background-color: rgba(50, 50, 50, .8);
    border-radius: 20px;
    height: auto;
    min-height: 950px;
    border: 2px solid  #0845af;
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
