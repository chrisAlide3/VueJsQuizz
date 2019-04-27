<template>
    <div class="col-xs-12 col-sm-8 col-md-6 mx-auto">
        <h5>Please register</h5>
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

        <button @click="register" class="btn btn-primary mt-3">Register</button>

                <small id="signupHelp" class="form-text">Already have an account?
                    <router-link to="/login">Login</router-link>
        </small>

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
                    this.$router.push('/login');
                    break;
                }; 
            };
            // Add user
            if (!alreadyRegistered) {
                this.$http.post("", this.user)
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
