<template>
<div class="container">
      <div id="quizzEl" class="col-xs-12 col-sm-8 ml-5">
        <app-header></app-header>
        <!-- Flip animation on Question/Answer components -->
        <div>
          <transition v-if="animate"
                      mode="out-in"
                      @enter= "enter"
                      @leave= "leave">
            <router-view  :users="users"
                          :signedInUser="signedInUser"
                          :answer="answer"
                          :tries="tries"
                          @userCreated="addUser($event)"
                          @loggedIn="loggedIn($event)"
                          @answered="(answer, tries) => {checkAnswer(answer, tries)}">
            </router-view>
          </transition>
          <!-- No flip animation on all other components -->
          <router-view v-else 
                          :users="users"
                          :signedInUser="signedInUser"
                          :answer="answer"
                          :tries="tries"
                          @userCreated="addUser($event)"
                          @loggedIn="loggedIn($event)"
                          @answered="(answer, tries) => {checkAnswer(answer, tries)}">
          </router-view>
        </div>
      </div>
</div>
</template>
    <!-- <transition enter-active-class="animated flipInY"
                leave-active-class="animated flipOutY" mode="out-in">
    </transition> -->
<script>
import Header from "./components/Header";
import Velocity from 'velocity-animate';

export default {
  data() {
    return {
      animate: false,
      users: [],
      signedInUser: {
        name: "",
        email: "",
      },
      answer: "",
      tries: "",
    }
  },
  watch: {
    $route(to, from) {
        if (to.name == 'question' || to.name == 'answer') {
          if (!this.animate) {
            this.animate = true;
          }
        } else {
          if (this.animate) {
              this.animate = false;
          }
        }
    },
  },
  methods: {
    enter: (el, done) => {
      console.log("enter transition");
      Velocity(el, "slideDown", { duration: 1500 }, {continue: done});
      done();
    },
    leave: (el, done) => {
      console.log("leave transition");
      Velocity(el, "slideUp", {  duration: 1500 }, {continue: done});
      done();
    },


    addUser(user) {
      this.users.push(user);
      this.signedInUser.email = user.email;
      this.signedInUser.name = user.name;
      this.$router.push("/question");
    },
    loggedIn(user) {
      this.signedInUser.email = user.email;
      this.signedInUser.name = user.name;
      this.$router.push("/question");
    },
    checkAnswer(answer, tries) {
        if (tries == 1) {
          this.tries = tries + " try!";
        } else {
          this.tries = tries + " tries!";
        };
        this.answer = answer;
        this.$router.push("/answer");
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
       })
  },
  components: {
    "appHeader": Header,
  },
}
</script>

<style>
  html,body {
    height:100%;
  }

  div .container{
    min-height: 100%;
    position: relative;
  }
  #quizzEl {
    background-image: url("./assets/background_jumbotron.jpg");
    position:absolute; 
    height:100%;
  }
</style>


<style scoped>
/* .flip-enter {
  transform: rotateY(90deg);
}
.flip-leave {
  transform: rotateY(0deg);
}  */
.flip-enter-active {
    animation: flip-in .5s ease-out forwards;
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
