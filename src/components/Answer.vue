<template>
    <div class="col-md-6 mx-auto text-center">
        <div class="card" style="width: 100%;">
            <div class="card-header">
                <slot name="header"></slot>
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
    background-color: lightgreen;
}
p {
    font-weight: bold;
}
</style>

