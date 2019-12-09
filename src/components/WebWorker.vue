<template>
  <div class="worker">
    
    <h1>Web Worker</h1>
    
     <button class="btn" :class=" started ? 'btn__start' : 'btn__stop' " @click="startJob">{{ btnLabel }}</button>
    
    <div class="timmer">

      <div class="timmer-head">
        <div class="timmer-head-item">#</div>
        <div class="timmer-head-item">Текущее время</div>
        <div class="timmer-head-item">Затрачено</div>
        <div class="timmer-head-item">Fib(n)</div>
        <div class="timmer-head-item">Результат</div>
      </div>

      <div class="timmer-body" v-for="(el, i) in arr" :key="el.idx">
        <div class="timmer-body-item">{{ i }}</div>
        <div class="timmer-body-item">{{ getCurrentTime(el.time) }}</div>
        <div class="timmer-body-item">{{ getTimeFromStart( i ) }}</div>
        <div class="timmer-body-item">{{el.idx}}</div>
        <div class="timmer-body-item">{{el.fib}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorkWorker', 
  data() {
    return {
      started: false,
      arr: [],
      startedAt: null,
      worker : null,
    }
  }, 
  computed: {
    btnLabel() {
      return this.started ? 'Stop' : 'Start'
    }
  },
  methods: {
    startJob () {
      this.started = !this.started;
      this.started && this.startWorker()
      !this.started && this.stopWorker()
    },
    startWorker() {
      this.arr = [];
      this.worker = new Worker('/vue-web-worker-fibonacci/dist/worker.js')
      this.worker.addEventListener('message', this.onMessage)
      this.startedAt = +new Date();
      this.worker.postMessage( { start: true } )
    },
    stopWorker () {
      this.worker.terminate()
    },
    onMessage(e) {
      const idx = e.data.idx
      const fib = e.data.fib
      const arr = this.arr
     // console.log(idx, fib)
      arr.unshift({idx, fib, time: new Date()})
      this.$emit('updata', arr)
      this.worker.postMessage('Письмо из компонента в Веб-Воркер!')
    },
    getCurrentTime(d) {
      return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${(d.getMilliseconds()/10).toFixed(0)}`
    },
    getTimeFromStart(i) {
      let a,b;
      const arr = this.arr
      b = arr[i].time
      if(i === arr.length-1 ) a = b
      else   a = arr[i+1].time

      const dt = new Date(b-a)
      const min = dt.getMinutes()
      const s =   dt.getSeconds()
      const ms =  dt.getMilliseconds()
      const res = `${min}:${s}:${ms}`
      return res 
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  //list-style-type: none;
  padding: 0;
}
li {
  //display: inline-block;
  margin: 0 10px;
}

.btn {
  font-size: 2em;
  padding: 10px;
  border-radius: 10px; 
  cursor: pointer; 
  transition: .3s;
  &:hover {
    transform: scale(1.2);
  }
  &:active {
    transform: scale(.9);
  }
  &__start {
    color: #42b983;
  }
  &__stop {
    color: red;
  }
}


.timmer {
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.timmer-head, 
.timmer-body {
    display: flex;
    justify-content: space-evenly;
}

.timmer-head {
  font-weight: bold;
  padding: 10px 0;
  font-size: 1.1em;
}

.timmer-head-item, 
.timmer-body-item {
    flex: 11;
    text-align: left;
}
</style>
