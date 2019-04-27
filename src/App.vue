<template>
<div class="container">
      <div id="quizzEl" class="col-xs-12 col-sm-8 ml-5">
        <app-header></app-header>
        <router-view  :users="users" 
                      :signedInUser="signedInUser"
                      :answer="answer"
                      :tries="tries"
                      @userCreated="addUser($event)"
                      @loggedIn="loggedIn($event)"
                      @answered="(answer, tries) => {checkAnswer(answer, tries)}">
        </router-view>
      </div>
</div>
</template>
    <!-- <transition enter-active-class="animated flipInY"
                leave-active-class="animated flipOutY" mode="out-in">
    </transition> -->

<script>
import Header from "./components/Header";

export default {
  data() {
    return {
      isSignedIn: false,
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
    addUser(user) {
      this.users.push(user);
      this.signedInUser.email = user.email;
      this.signedInUser.name = user.name;
      this.$router.push("/question")
    },
    loggedIn(user) {
      this.signedInUser.email = user.email;
      this.signedInUser.name = user.name;
      this.$router.push("/question");
      // this.mode = "app-question";
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
    /* top:0; 
    left: inherit; */
    /* margin-left: auto; 
    margin-right: auto;  */
    height:100%;
  }
</style>


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
