<template>
    <div class="col-md-6 mx-auto text-center">
        <div class="card">
            <div class="card-header">
                <h3>Correct Answer in {{ tries }}</h3>
                <p> {{ answer }}</p>
            </div>
                <div class="card-body mx-auto">
                    <button @click="nextQuestion" class="btn btn-primary">Next Question</button>
                </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        "signedInUser": Object,
        "answer": String,
        "tries": String,
    },
    methods: {
        nextQuestion() {
            this.$router.push({path: "/question", query: {signedIn: true} })
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (!vm.signedInUser.email) {
                next(from.path);
            }

            // if (!vm.$route.query.signedIn) {
            //     next(from.path);
            // }
        });
    },
}
</script>

<style scoped>
.card {
    width: 100%;
    background-color: transparent;
}
p {
    font-weight: bold;
}
</style>

