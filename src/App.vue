<template>
<div class="container">
  <div class="row">
    <div class="col-sm text-center mx-auto mt-5"> 

      <h1>The Super Quizz</h1>
      <hr>

      <!-- Game not started -->
      <div v-if="!isStarted">
        <p>Click start to start a game!</p>
        <button 
              class="btn btn-primary"
              @click="startGame">
            Start game
        </button>      
      </div>
    </div>
  </div>

  <!-- Game started -->
  <div v-if="isStarted" class="row">
    <!-- Display Answer -->
    <transition enter-active-class="animated flipInY"
                leave-active-class="animated flipOutY" mode="out-in">
      <component :is="selectedComponent" :results="possibleResults" :correctResult="correctResult"
                                          @answered="selectedComponent = $event" 
                                          :startGame="startGame">
        <p slot="headerQ">What's {{"'"+nbr1 + "'  " + operator + "  '" + nbr2 + "'"}}</p>>
        <p slot="headerA">{{"'"+nbr1 + "'  " + operator + "  '" + nbr2 + "' = " + correctResult}}</p>>

      </component>
    <!-- <app-answer v-if="isAnswer"
                :startGame="startGame">
                <h3 slot="header">Correct Answer!</h3>
                <p slot=header>'{{ nbr1 }}'  {{ operator}}  '{{nbr2}}' = '{{correctResult}}'</p>
    </app-answer>
    Display question
    <app-question v-else 
                    :results="possibleResults" 
                    :correctResult="correctResult"
                    @answered="selectedComponent = $event">
        <p slot="header">What's {{ "'"+nbr1 + "'  " + operator + "  '" + nbr2 + "'"}}?</p>
      </app-question> -->
    </transition>
  </div>
</div>
</template>

<script>
import Question from "./components/Question";
import Answer from "./components/Answer";

export default {
  data() {
    return {
      isStarted: false,
      selectedComponent: "",
      nbr1: 0,
      nbr2: 0,
      operator: "",
      possibleOperators: ["+", "-"],
      correctResult: 0,
      possibleResults: []
    }
  },  
  methods: {
    initialise() {
      this.nbr1 = 0;
      this.nbr2 = 0;
      this.operator = "",
      this.correctResult = 0,
      this.possibleResults = []
    },
    startGame() {
      this.initialise();
      this.isStarted = true;
      this.selectedComponent = "app-question";
      this.generateQuestion();
      this.correctResult = this.getCorrectResult(this.nbr1, this.nbr2, this.operator);
      this.generatePossibleResults();
      for (let i=0; i<this.possibleResults.length; i++) {
      }

    },
    generateQuestion() {
      this.nbr1 = this.generateRandomNumber(-100, 100);
      this.nbr2 = this.generateRandomNumber(-100, 100);
      this.operator = this.possibleOperators[this.generateRandomNumber(0, this.possibleOperators.length - 1)];
    },
    getCorrectResult(nbr1, nbr2, operator) {
      switch(operator) {
        case "+":
          return nbr1 + nbr2;
        case "-":
          return nbr1 - nbr2;
        case "*":
          return nbr1 * nbr2;
        case "/":
          return nbr1 / nbr2;
        default:
          return 0;
      };
    },
    generatePossibleResults() {
      // Generate 3 random results
      for (let i=0; i<3; i++) {
        this.possibleResults.push(this.generateRandomNumber(-200, +200))
      };
      // Add correct result at random position
      const pos = Math.floor(Math.random() * this.possibleResults.length);
      this.possibleResults.splice(pos, 0, this.correctResult);
    },
    
    generateRandomNumber(min, max) {
      return (Math.floor(Math.random() * (max - min + 1)) + min);
    },
  },
  components: {
    "appQuestion": Question,
    "appAnswer": Answer,
  }
  
}
</script>

<style scoped>
.flip-enter-active {
  animation: flip-in .5s ease-out forwards;
}
.flip-leave {
  transform: rotateY(90deg)
} 
.flip-leave-active {
  animation: flip-out .5s ease-out forwards;

}
@keyframes flip-in {
  from {
    transform: rotateY(0deg)
  }
  to {
    transform: rotateY(90deg)
  }
}
@keyframes flip-out {
  from {
    transform: rotateY(90deg)
  }
  to {
    transform: rotateY(0deg)
  }
}


</style>
