<template>
    <div class="col-xs-12 col-sm-8 col-md-6 mx-auto">
        <h5>Please login</h5>
        <small id="loginHelp" class="form-text text-muted">Don't have an account? 
            <span style="color: blue; cursor: pointer" @click="switchMode">Register</span> here
        </small>
        <div class="form-group">
            <label for="email">Email address</label>
            <input v-model="user.email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input v-model="user.password" type="password" class="form-control" id="password" placeholder="Password">
        </div>
        <button @click.prevent="login" type="submit" class="btn btn-primary">login</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                name: "",
                email: "",
                password: "",
            },
        };
    },
    props: {
        "users": Array,
    },
    methods: {
        switchMode() {
            this.$emit("switchMode", "app-register");
        },
        
        login() {
            // Check if user valid
            let isEmailValid = false;
            let isPasswordValid = false;
            for (let i=0; i<this.users.length; i++) {
                if (this.users[i].email == this.user.email) {
                    isEmailValid = true;
                    this.user.name = this.users[i].name;
                    if (this.users[i].password == this.user.password) {
                        isPasswordValid = true;
                        break;
                    } else {
                        isPasswordValid = false;
                        break;
                    }
                }
            }
            if (!isEmailValid) {
                alert("Invalid email address! Try again or Register");
            } else if (!isPasswordValid) {
                alert("Invalid password! Try again");
            } else {
                this.$emit("loggedIn", this.user);
            }
        },
    },
};

</script>

<style>
label {
    font-weight: bold;
}
</style>
