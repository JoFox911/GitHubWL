<template>
  <q-page class="flex flex-center">

    <div class="game-container justify-between">
      <color-list 
        :colorsData="eggsData" 
        @onClick="index => clickOnLabelFT(index)"
      />

      <div class="eggs-container">
        <div class="eggs-container-inner justify-evenly items-center">
          <egg-label :colorUrl="eggsData[firstTeamEggIndex].color" class="right-animation" :isWinner="result && (result === gameResults.FIRST_TEAM || result === gameResults.BOTH_WINNERS)"/>
          <egg-label :colorUrl="eggsData[secondTeamEggIndex].color" class="left-animation" :isWinner="result && (result === gameResults.SECOND_TEAM || result === gameResults.BOTH_WINNERS)"/>
        </div>          

        <div class="eggs-container-buttons justify-evenly items-center">
          <q-btn 
            class="start-btn"
            rounded
            color="warning"
            :label="$t('start')"
            text-color="primary"
            size="xl"
            @click="startGame"
          />

        </div>
      </div>

      <color-list
        :colorsData="eggsData" 
        @onClick="index => clickOnLabelST(index)"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { GAME_RESULTS } from '@/config/gameResults.enum.js'


import ColorList from '@components/ColorList.vue'
import EggLabel from '@components/EggLabel.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    ColorList,
    EggLabel
  },
  data: function() {
    return {
      result: null,
      timerId: null,
      firstTeamEggIndex: 0,
      secondTeamEggIndex: 0,
      eggsData: [
        {
          key: 'Ukrainian',
          color: 'images/ukr.png',
          straight: 1,
        },
        {
          key: 'Russian',
          color: 'images/rus.png',
          straight: 0,
        },
        {
          key: 'Red',
          color: 'images/red.png',
          straight: 0.5,
        },
        {
          key: 'Green',
          color: 'images/green.png',
          straight: 0.5,
        }
      ]
    };
  },
  computed: {
    gameResults: () => GAME_RESULTS
  },
  created () {
    this.firstTeamEggIndex = this.generateEggKey()
    this.secondTeamEggIndex = this.generateEggKey()
  },
  methods: {
    generateEggKey () {
      return Math.floor(Math.random() * this.eggsData.length);
    },

    clickOnLabelFT (index) {
      this.reset()
      this.firstTeamEggIndex = index
    },

    clickOnLabelST (index) {
      this.reset()
      this.secondTeamEggIndex = index
    },

    reset() {
      this.result = null
    },

    startGame () {
      this.reset()
      clearTimeout(this.timerId)
      this.timerId = setTimeout(() => {
        this.result = this.selectWinner()
      }, 1500)
    },

    selectWinner () {
      if (this.eggsData[this.firstTeamEggIndex].straight === 0 || this.eggsData[this.secondTeamEggIndex].straight === 0) {
        if (this.eggsData[this.firstTeamEggIndex].straight === this.eggsData[this.secondTeamEggIndex].straight) {
          return GAME_RESULTS.BOTH_LOSERS
        } else if (this.eggsData[this.firstTeamEggIndex].straight === 0) {
          return GAME_RESULTS.SECOND_TEAM
        } else {
          return GAME_RESULTS.FIRST_TEAM
        }
      }

      if (this.eggsData[this.firstTeamEggIndex].straight === 1 || this.eggsData[this.secondTeamEggIndex].straight === 1) {
        if (this.eggsData[this.firstTeamEggIndex].straight === this.eggsData[this.secondTeamEggIndex].straight) {
          return GAME_RESULTS.BOTH_WINNERS
        } else if (this.eggsData[this.firstTeamEggIndex].straight === 1) {
          return GAME_RESULTS.FIRST_TEAM
        } else {
          return GAME_RESULTS.SECOND_TEAM
        }
      }

      const sum = this.eggsData[this.firstTeamEggIndex].straight + this.eggsData[this.secondTeamEggIndex].straight
      const firstTeamWinLimit = this.eggsData[this.firstTeamEggIndex].straight / sum
      const randValue = Math.random() / 100

      if (firstTeamWinLimit <= randValue) {
        return GAME_RESULTS.FIRST_TEAM
      }
      return GAME_RESULTS.SECOND_TEAM
    }
  }
})
</script>
