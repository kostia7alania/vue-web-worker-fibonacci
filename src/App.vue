<template>
  <div id="app">
    <transition name="fade">
      <chart v-if="showChart" :toChartData="toChartData" />
      <img v-else alt="Vue logo" src="./assets/logo.png">
    </transition>
    <WebWorker @updata="updataHandler"/>
  </div>
</template>

<script> 

export default {
  name: 'app',
  data() {
    return {
      toChartData: [],
    }
  },
  components: {
    WebWorker: () => import('./components/WebWorker'),
    chart: () => import('./components/Chart'),
  },
  methods: {
    updataHandler(toChartData) {
      this.toChartData = toChartData
    }
  },
  computed: {
    showChart() {
      return this.toChartData.length
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

</style>
