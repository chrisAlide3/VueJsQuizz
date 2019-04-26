<template>
    <div class="col-md-6 mx-auto text-center">
        <div class="card" style="width: 100%;">
            <div class="card-header">
                <h3>Correct Answer!</h3>
                <slot name="headerA"></slot>
            </div>
                <div class="card-body mx-auto">
                    <button 
                            class="btn btn-primary"
                            @click="startGame">
                        Next Question
                    </button>
                </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        "startGame": Function,
    },
}
</script>

<style scoped>
.card {
    background-color: rgb(184, 246, 201);

}
p {
    font-weight: bold;
}
</style>

