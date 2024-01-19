<!--Hauptersteller: Tom Bernauer-->

<template>
  <div>
    <div class="dropdown" v-for="(options, selectedIndex) in dropdownOptions" :key="selectedIndex">
      <div class="select" @click="toggleDropdown(selectedIndex)">
        
        <span class="selected">{{ selectedIndex === 0 ? 'Messwerte' : options[selectedDropdownIndex[selectedIndex]] }}</span>
        <div class="caret" :class="{ 'caret-rotate': isDropdownOpen[selectedIndex] }"></div>
      </div>
      <ul class="menu" :class="{ 'menu-open': isDropdownOpen[selectedIndex] }">
        <li v-for="(option, index) in options" :key="index" @click="selectOption(selectedIndex, index)"
          :class="{ 'active': index === selectedDropdownIndex[selectedIndex] }">
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropdownOptions: [
        ['Drehzahl', 'Gang', 'Öl/Wassertemperaturen', 'Bremstemperaturen', 'Trips']
       
      ],
      selectedDropdownIndex: [0], 
      isDropdownOpen: [false] 
    };
  },
  methods: {
    toggleDropdown(index) {
      this.isDropdownOpen[index] = !this.isDropdownOpen[index];
    },
    selectOption(dropdownIndex, optionIndex) {
     
      const selectedOption = this.dropdownOptions[dropdownIndex][optionIndex];
      if (selectedOption === 'Drehzahl') {
        this.$router.push({ name: 'Drehzahl' });
      } else if (selectedOption === 'Gang') {
        this.$router.push({ name: 'Gang' });
      }

     
      this.selectedDropdownIndex[dropdownIndex] = optionIndex;
      this.isDropdownOpen[dropdownIndex] = false;
    }
  }
};
</script>

<style scoped>

body {
    font-family: Helvetica, sans-serif;
    background: #23242a;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.dropdown {
    min-width: 15em;
    position: relative;
    margin: 2em;
}

.dropdown * {
    box-sizing: border-box;
}

.select {
    background: #2a2f3b;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 2px #2a2f3b solid;
    border-radius: 0.3em; 
    padding: 0.5em;
    cursor: pointer;
    transition: background 0.3s;
    width: 8em;
}




.select:hover {
    background: #323741;
}

.caret {
    width: 0;
    height: 0;
    border-left: 4px solid transparent; 
    border-right: 4px solid transparent;
    border-top: 4px solid #fff; 
    transition: 0.3s;
}

.caret-rotate {
    transform: rotate(180deg);
}

.menu {
    list-style: none;
    padding: 0.2em 0.5em;
    background: #323741;
    border: 1px n#363a43 solid;
    box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.2);
    border-radius: 0.5em;
    color: #9fa5b5;
    position: absolute;
    top: 3em;
    left: 50%;
    width: 100%;
    transform: translateX(-50%);
    opacity: 0;
    display: none;
    transition: 0.2s;
    z-index: 1;
}

.menu li {
    padding: 0.5em 0.3em;
    margin: 0.2em 0;
    border-radius: 0.3em;
    cursor: pointer;
}


.menu li:hover {
    background: #2a2d35;

}


.active {
    background: #23242a;
}



.menu-open {
    display: block;
    opacity: 1;
}
</style>
