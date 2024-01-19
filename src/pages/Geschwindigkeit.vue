<!--Hauptersteller: Tom Bernauer
//Alle Segmente, die mit dem GlobalFetcher und dem Store zusammenarbeiten: Ilhan Bahadir-->

<template>
 <Navigation/>
 <div class="pagetitel">Geschwindigkeit</div>

 <button @click="toggleLiveMode" class="toggle-button" v-show="show">
      {{ liveMode ? 'Live Modus' : 'Zeitraum' }}
    </button>
    
  <container v-if="liveMode" class = "chart-geschwindigkeit"><ChartGeschwindigkeit/></container>
  <container v-else class="timeframe-geschwindigkeit"><TimeframeGeschwindigkeit/></container>
  <div  @click="goBack">
  <div class="arrow"><i class='bx bx-left-arrow-alt'></i></div>
  </div>

  <img
    class="png-auto"
    :src="getLatestCarPath"
    alt=""
    />
 
  
  
  <div class="kmh">KM/H</div>
  <div class="geschwindigkeit-value">{{ Math.round(this.carData.airflowspeed || 0 ) }}</div>
  <div class="auto-titel"></div>


</template>
<script>
import { defineComponent } from "vue";
import Navigation from '../components/Navigation.vue';
import { fetchCarData } from '../globals/GlobalFetcher.js';
import ChartGeschwindigkeit from "../components/ChartGeschwindigkeit.vue";
import store from '../store/store';
import TimeframeGeschwindigkeit from "../components/TimeframeGeschwindigkeit.vue";


export default defineComponent({
  name: "Geschwindigkeit",
  data() {
      return {
        carData: {},
        show: true,
      liveMode: true,
      };
  },
  async mounted() {
   
    await this.fetchAndProcessData();


    setInterval(this.fetchAndProcessData, 4000);
  },
  
  components: {  ChartGeschwindigkeit, Navigation, TimeframeGeschwindigkeit },
  
  computed: {
    getLatestCarPath() {
      const carDataArray = store.getters.getCarInformation; 

      if (carDataArray.length > 0) {
        const latestPath = carDataArray[carDataArray.length - 1].path;
        return latestPath;
      } else {
        return null;
      }
    },
  },
  
  methods: {

    async fetchAndProcessData() {
      try {
        const newData = await fetchCarData();
        this.carData = newData;
       
      } catch (error) {
        console.error('Fehler beim Laden der Fahrzeugdaten:', error);
      }
    },

    goBack() {
   
    this.$router.go(-1);
 
  },
  toggleLiveMode() {
      console.log("Toggling live mode");
      this.liveMode = !this.liveMode;
    },
  },
});
</script>

<style scoped>
.pagetitel {
  position: fixed;
  top: 12%;
  left: 46%;
  font-size: 18px;
  color: #fff;
}

.toggle-button {
  position: absolute;
  top: 250px;
  left: 1080px;
  cursor: pointer;
  z-index: 1000;
  padding: 10px;
  background-color: rgba(75, 192, 192, 1);
  color: var(--text-color); 
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.toggle-button:hover {
  background-color: rgba(75, 192, 192, 0.7);
}

.png-auto {
  position: absolute;
  top: 28%;
  left: 50%;
  width: 70%;
  height: 70%;
  transform: translate(-50%, -50%);
  height: auto;
  object-fit: contain;
  opacity: 0.7;
}

.kmh {
  position: absolute;
  top: 25%;
  left: 25%;
  font-weight: 100;
  color: var(--text-color); 
}
.geschwindigkeit-value {
  position: absolute;
  top: 22%;
  left: 13%;
  font-size: 100px;
  color:var(--text-color); 
  font-family: 'Manrope';
}
.auto-titel {
  position: absolute;
  top: 15%; 
  left: 50%; 
  transform: translate(-50%, -50%);
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  color: var(--text-color); 
  white-space: nowrap; 
}
.timeframe-geschwindigkeit {
  position: absolute;
  top: 40vh;
  left: 30vw;
  max-width: 28vw; 
  max-height: 18vh;
}


.chart-geschwindigkeit {
  position: absolute;
  top: 42vh;
  left: 30vw;
}

.arrow {
    position: absolute;
    top: 14%;
    left: 10%;
    font-size: 30px;
    font-weight: 600;
    font-family: 'Poppins';
    color:var(--text-color); 
    cursor: pointer;
  }
  .arrow:hover{ 
  color:#426b1f;
  }
</style>