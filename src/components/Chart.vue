<script>
import { Line } from "vue-chartjs";

export default {
  props:{
    toChartData: {
      type: Array,
      default: () => []
    }
  },
  extends: Line,
  data() {
    return {
      opts: { responsive: true, maintainAspectRatio: false },
      gradient: null,
      gradient2: null
    };
  },
  watch:{
    toChartData() {
     this.reRender()
    }
  },
  mounted() {
    this.initCanvas()
     this.reRender()
  },
  computed: {
    chartData () {
      const labels = this.toChartData.reduce((a,e)=>[...a,e.idx],[]).reverse()


      const getTimeFromStart = (arr,i) => {
        let a,b; 
        b = arr[i].time
        if(i === arr.length-1 ) a = b
        else   a = arr[i+1].time

        const dt = new Date(b-a)
        const min = dt.getMinutes()
        const s =   dt.getSeconds()
        const ms =  dt.getMilliseconds()
        const res = `${min}${s}${ms}`
        //debugger
        return +res 
      }
      const data = this.toChartData
      .reduce( (a, e, i)=>[...a, getTimeFromStart(this.toChartData,i)],[]).reverse()

      return {
        labels,
        datasets: [
          {
            label: "Fib(time)",
            borderColor: "#05CBE1",
            pointBackgroundColor: "white",
            pointBorderColor: "white",
            borderWidth: 1,
            backgroundColor: this.gradient2,
            //data: [60, 55, 32, 10, 2, 12, 53]
            data
          }
        ]
      }
    }
  },
  methods: {
    reRender() {
      this.renderChart(this.chartData, this.opts);
    },
    initCanvas() {

      this.gradient = this.$refs.canvas
        .getContext("2d")
        .createLinearGradient(0, 0, 0, 450);
      this.gradient2 = this.$refs.canvas
        .getContext("2d")
        .createLinearGradient(0, 0, 0, 450);

      this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
      this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
      this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

      this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
      this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
      this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");
    
    }
  }
};
</script>
