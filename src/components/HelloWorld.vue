<template>
  <div class="main">
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
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.square-box{
  width: 40%;
  height: auto;
  border: 2px solid  #0845af;
  border-radius: 20px;
  background-color: rgba($color: #353535, $alpha: .5)
}
#titleNav{
  width: 40%;
}
</style>
