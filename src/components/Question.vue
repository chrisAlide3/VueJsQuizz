<template>

    <div class="col-6 mx-auto text-center">
        <div class="card" style="width: 100%;">
            <div class="card-header">
                <p>Hello {{signedInUser.name}}! Whats {{ question }}</p>
            </div>
            <div>test</div>
                <div class="card-body mx-auto">
                    <!-- {{ htmlQuestion }}
                    <span v-html="htmlQuestionString"></span> -->
                    <div class='row'> 
                        <div class='col-xs-12 col-md-6 text-center'> 
                            <button class='btn btn-primary' 
                                    style='margin: 10px' 
                                    @click='onAnswer(possibleResults[0])'>
                                {{ possibleResults[0]}}
                            </button> 
                        </div>
                        <div class='col-xs-12 col-md-6 text-center'> 
                            <button class='btn btn-primary' 
                                    style='margin: 10px' 
                                    @click='onAnswer(possibleResults[1])'>
                                {{ possibleResults[1]}}
                            </button> 
                        </div>
                    </div>
                    <div class='row'> 
                        <div class='col-xs-12 col-md-6 text-center'> 
                            <button class='btn btn-primary' 
                                    style='margin: 10px' 
                                    @click='onAnswer(possibleResults[2])'>
                                {{ possibleResults[2]}}
                            </button> 
                        </div>
                        <div class='col-xs-12 col-md-6 text-center'> 
                            <button class='btn btn-primary' 
                                    style='margin: 10px' 
                                    @click='onAnswer(possibleResults[3]); nbrOfTries++'>
                                {{ possibleResults[3]}}
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
            nbr1: 0,
            nbr2: 0,
            operator: "",
            possibleOperators: ["+", "-"],
            question: "",
            answer: "",
            correctResult: 0,
            possibleResults: [],
            nbrOfTries: 0,
            nbrOfQuestions: 0,
        }
    },
    props: {
        "signedInUser": Object,
    },
    // Vue component hooks
    created() {
        this.generateQuestion();
    },
    methods: {
        onAnswer(result) {
            this.nbrOfTries++;
            if (result == this.correctResult) {
                this.$emit("answered", "app-answer", this.answer, this.nbrOfTries);
            } else {
                alert("Incorrect answer. Try again!");
            }
        },
        generateQuestion() {
        this.nbrOfQuestions++;
        this.nbr1 = this.generateRandomNumber(-100, 100);
        this.nbr2 = this.generateRandomNumber(-100, 100);
        this.operator = this.possibleOperators[this.generateRandomNumber(0, this.possibleOperators.length - 1)];
        this.question = "'" + this.nbr1 + "'  " + this.operator + "  '" + this.nbr2 + "'";
        this.correctResult = this.getCorrectResult(this.nbr1, this.nbr2, this.operator);
        this.answer = "'" + this.nbr1 + "'  " + this.operator + "  '" + this.nbr2 + "' = '" + this.correctResult + "'";
        this.generatePossibleResults();

        },

        generatePossibleResults() {
        // Generate 3 random results
        for (let i=0; i<3; i++) {
            this.possibleResults.push(this.generateRandomNumber(this.correctResult -10 , this.correctResult + 10, this.correctResult))
        };
        // Add correct result at random position
        const pos = Math.floor(Math.random() * this.possibleResults.length);
        this.possibleResults.splice(pos, 0, this.correctResult);
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

        generateRandomNumber(min, max, except) {
            // Regenerate number if the number equals the except parameter. Here the correct number
            let nbr = (Math.floor(Math.random() * (max - min + 1)) + min);
            if (nbr == except) {
                return this.generateRandomNumber(min, max, except);
            };
            return nbr;
        },
    },
}
</script>

<style scoped>
.card-header {
    font-weight: bold;
}
</style>
