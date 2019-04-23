<template>
    <div class="col-6 mx-auto text-center">
        <div class="card" style="width: 100%;">
            <div class="card-header">
                <slot name="header"></slot>
            </div>
                <div class="card-body mx-auto">
                    <!-- {{ htmlQuestion }}
                    <span v-html="htmlQuestionString"></span> -->
                    <div class='row'> 
                        <div class='col-xs-12 col-md-6 text-center'> 
                            <button class='btn btn-primary' 
                                    style='margin: 10px' 
                                    @click='onAnswer(results[0])'>
                                {{ results[0]}}
                            </button> 
                        </div>
                        <div class='col-xs-12 col-md-6 text-center'> 
                            <button class='btn btn-primary' 
                                    style='margin: 10px' 
                                    @click='onAnswer(results[1])'>
                                {{ results[1]}}
                            </button> 
                        </div>
                    </div>
                    <div class='row'> 
                        <div class='col-xs-12 col-md-6 text-center'> 
                            <button class='btn btn-primary' 
                                    style='margin: 10px' 
                                    @click='onAnswer(results[2])'>
                                {{ results[2]}}
                            </button> 
                        </div>
                        <div class='col-xs-12 col-md-6 text-center'> 
                            <button class='btn btn-primary' 
                                    style='margin: 10px' 
                                    @click='onAnswer(results[3])'>
                                {{ results[3]}}
                            </button> 
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            htmlQuestionString: "",
        }
    },
    props: ["results", "correctResult"],
    methods: {
        onAnswer(result) {
            if (result == this.correctResult) {
                alert("correct");
                this.$emit("answered", true);
            } else {
                alert("Incorrect answer. Try again!");
            }
        }
    },
    computed: {
        htmlQuestion() {
            for (let i=0; i<this.results.length; i++) {
                if (i % 2 === 0) {
                    let endRowDiv = "";
                    if (i != 0) {
                        endRowDiv = "</div>";
                    };
                    this.htmlQuestionString += endRowDiv + " <div class='row'> <div class='col-xs-12 col-md-6 text-center'> <button class='btn btn-primary' style='margin: 10px' @click='onAnswer(results[" + [i] + "])'> " +  this.results[i] + " </button> </div> ";
                } else {
                    this.htmlQuestionString += "<div class='col-xs-12 col-md-6 text-center'> <button class='btn btn-primary' style='margin: 10px' @click='onAnswer(results[" + [i] + "])'> " + this.results[i] + " </button> </div> ";
                };
            };
                        console.log(this.htmlQuestionString);

        }
    },
}
</script>

<style scoped>
.card-header {
    font-weight: bold;
}
</style>
