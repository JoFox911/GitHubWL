<template>
  <q-page class="flex flex-center">

    <div class="game-container justify-between non-selectable">
      <color-list 
        :colorsData="eggsData" 
        class="first-side-bar"
        @onClick="colorIndex => clickOnLabelFT(colorIndex)"
      />

      <div class="eggs-container">
        <div class="eggs-container-inner justify-evenly items-center">
          <egg-label 
            :colorUrl="eggsData[firstTeamEggIndex].color"
            :class="{ 'right-animation': result === null }"
            :isWinner="result && (result === gameResults.FIRST_TEAM || result === gameResults.BOTH_WINNERS)"
            :isLoser="result && (result === gameResults.SECOND_TEAM || result === gameResults.BOTH_LOSERS)"
            />

          <egg-label 
            :colorUrl="eggsData[secondTeamEggIndex].color"
            :class="{ 'left-animation': result === null }"
            :isWinner="result && (result === gameResults.SECOND_TEAM || result === gameResults.BOTH_WINNERS)"
            :isLoser="result && (result === gameResults.FIRST_TEAM || result === gameResults.BOTH_LOSERS)"/>
        </div>
      </div>

      <color-list
        :colorsData="eggsData"
        class="second-side-bar"
        @onClick="colorIndex => clickOnLabelST(colorIndex)"
      />

      <div v-if="isDelayBeforeResults" class="boom items-center animated fadeOut">
        <img src="images/boom.png"/>
      </div>
    </div>

    <q-footer reveal elevated>
      <div class="page-footer justify-evenly items-center">
        <q-btn 
          class="start-btn"
          rounded
          color="warning"
          :label="isSomeOneSelectRusianEgg ? $t('beatMuscovite') : $t('start')"
          text-color="primary"
          size="xl"
          @click="startGame"
        />
      </div>
    </q-footer>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { GAME_RESULTS } from '@/config/gameResults.enum.js'

import SoundsService from '@services/sounds.service'

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
      timerBeforeId: null,
      timerDisplayId: null,
      isDelayBeforeResults: false,
      firstTeamEggIndex: 0,
      secondTeamEggIndex: 0,
      eggsData: [
        {
          key: 'Ukrainian',
          color: 'images/ukr.png',
          straight: 1,
        },
        {
          key: 'Red',
          color: 'images/purple.png',
          straight: 0.5,
        },
        {
          key: 'Green',
          color: 'images/yellow-red.png',
          straight: 0.5,
        },
        {
          key: 'Russian',
          color: 'images/rus.png',
          straight: 0,
        }
      ]
    };
  },
  computed: {
    gameResults: () => GAME_RESULTS,
    isSomeOneSelectRusianEgg () {
      return [this.eggsData[this.firstTeamEggIndex].key, this.eggsData[this.secondTeamEggIndex].key].includes('Russian')
    }
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
      clearTimeout(this.timerBeforeId)
      clearTimeout(this.timerDisplayId)

      this.timerBeforeId = setTimeout(() => {
        this.isDelayBeforeResults = true
        SoundsService.playEggCrackingSound()

        this.timerDisplayId = setTimeout(() => {
          this.result = this.selectWinner()
          this.isDelayBeforeResults = false
        }, 1200)
      }, 500)
      
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
      const randValue = Math.random()

      if (firstTeamWinLimit <= randValue) {
        return GAME_RESULTS.FIRST_TEAM
      }
      return GAME_RESULTS.SECOND_TEAM
    }
  },
  beforeUnmount () {
      clearTimeout(this.timerBeforeId)
      clearTimeout(this.timerDisplayId)
  }
})
</script>
