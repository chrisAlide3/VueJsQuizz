<template>
    <div class="col-xs-12 col-sm-8 col-md-6 mx-auto">
        <h5>Please signup</h5>
        <small id="signupHelp" class="form-text text-muted">Already have an account? 
            <span style="color: blue; cursor: pointer" @click="switchMode">Login</span> here
        </small>
        <div class="form-group">
            <label for="name">Name</label>
            <input v-model="user.name" type="text" class="form-control" id="name" placeholder="Name">
        </div>
        <div class="form-group">
            <label for="email">Email address</label>
            <input v-model="user.email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input v-model="user.password" type="password" class="form-control" id="password" placeholder="Password">
        </div>
        <button @click.prevent="register" type="submit" class="btn btn-primary">Register</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                userId: 0,
                name: "",
                email: "",
                password: "",
            },
        };
    },
    props: ["users"],
    methods: {
        switchMode() {
            this.$emit("switchMode", "app-login")
        },
        register() {
            // Check if can be added
            let alreadyRegistered = false;
            for (let i=0; i<this.users.length; i++) {
                if (this.users[i].email == this.user.email) {
                    alert("This email address is already registered. Please Login with it");
                    alreadyRegistered = true;
                    this.switchMode();
                    break;
                }; 
            };
            // Add user
            if (!alreadyRegistered) {
                let userId = 0;
                if (this.users.length == 0) {
                    userId = 1;
                } else {
                    userId = this.users[this.users.length-1].id + 1;
                }
                this.user.id = userId;
                this.$http.post("/"+userId, this.user)
                    .then(response => {
                        if (response.status < 400 ) {
                            alert("Your account has been succesfully created!");
                            this.userCreated();
                        }
                    }, error => { console.log(error) })          
            }
        },
        userCreated() {
            this.$emit("userCreated", this.user);
        }
    }
}
</script>


<style>
label {
    font-weight: bold;
}
</style>
