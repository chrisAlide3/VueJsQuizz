<template>
    <div class="jumbotron text-center">
        <h1 class="display-4">Super Quizz</h1>
        <p class="lead">Test your math skills!</p>
        <hr class="my-4">
        <p class="mb-4 mt-4" style="font-weight: bold">Befor you can play you need to register or login!</p>
        <router-link to="/login" tag="button" class="btn btn-primary btn-lg mr-3">Login</router-link>
        <router-link to="/register" tag="button" class="btn btn-primary btn-lg ml-3">Register</router-link>

    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .jumbotron {
        background-color: transparent;
    }
</style>
