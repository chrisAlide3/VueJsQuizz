import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Question from "./components/Question.vue";
import Answer from "./components/Answer.vue";

export const routes = [
    { path: '/', component: Home, name: "home" },
    { path: '/login', component: Login, name: "login"},
    { path: '/register', component: Register, name: "register"},
    { path: '/question', component: Question, name: "question"},
    { path: '/answer', component: Answer, name: "answer"},
];