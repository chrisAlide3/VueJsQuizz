<template>
<div class="container">
  <div class="row">
    <div class="col-sm text-center mx-auto mt-5"> 
  <!-- Game started -->

      <h1>The Super Quizz</h1>
      <hr>
    </div>
  </div>

  <div class="row">
    <!-- Display Answer -->
    <transition enter-active-class="animated flipInY"
                leave-active-class="animated flipOutY" mode="out-in">
      <component :is="mode"
                @switchMode="switchMode($event)"
                :users="users"
                @userCreated="addUser($event)"
                @loggedIn="loggedIn($event)"
                :signedInUser="signedInUser"
                @answered="(mode, answer, tries) => checkAnswer(mode, answer, tries)"
                :answer = "this.answer"
                :nbrOfTries = "this.tries"
                @continue="switchMode($event)">
      </component>
    </transition>
  </div>
</div>
</template>

<script>
import Login from "./components/Login";
import Register from "./components/Register";
import Question from "./components/Question";
import Answer from "./components/Answer";

export default {
  data() {
    return {
      mode: "app-login",
      users: [],
      signedInUser: {
        name: "",
        email: "",
      },
      answer: "",
      tries: "",
    }
  },  
  methods: {
    switchMode(mode) {
      this.mode = mode;
    },
    addUser(user) {
      this.users.push(user);
      this.signedInUser.email = user.email;
      this.signedInUser.name = user.name;
      this.mode = "app-question";
    },
    loggedIn(user) {
      this.signedInUser.email = user.email;
      this.signedInUser.name = user.name;
      this.mode = "app-question";
    },
    checkAnswer(mode, answer, tries) {
      if (mode == "app-answer") {
        this.mode = 'app-answer';
        this.answer = answer;
        if (tries == 1) {
          this.tries = tries + " try!";
        } else {
          this.tries = tries + " tries!";
        }
      } else {
        alert("wrong answer");
        this.mode = 'app-question'
      }
    }
  },
  created() {
    // Feching usern database
    this.$http.get("")
        .then(response => {
            return response.json();
        })
        .then(data => {
            const dataArray = [];
            for (let key in data) {
                dataArray.push(data[key]);
            };
            this.users = dataArray;
            console.log(this.users[0]);
       })
  },
  components: {
    "appLogin": Login,
    "appRegister": Register,
    "appQuestion": Question,
    "appAnswer": Answer,
  },
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
