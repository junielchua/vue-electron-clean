<template>
    <div class="sub_body text-center">
        <main class="form-signin">
            <form>
                <img class="mb-4" src="../assets/logo.png" alt="">
                <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="floatingInput" v-model="input.txtEmail" placeholder="Email address">
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="floatingPassword" v-model="input.txtPassword" placeholder="Password">
                </div>

                <button class="w-100 btn btn-lg btn-primary" type="button" @click="onSubmitlogin">Sign in</button>
                <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
            </form>
        </main>
    </div>
</template>

<script>
    import Swal from "sweetalert2";

    export default {
        name: 'sync-signin',
        components: {},
        data() {
            return {
                input: {
                    txtEmail: "",
                    txtPassword: ""
                }
            }
        },
        methods: {
            async onSubmitlogin() {
                if(this.input.txtEmail != "" && this.input.txtPassword != "") {
                    const response = await window.api.authLogin({ username: this.input.txtEmail, password: this.input.txtPassword });

                    if(response.error == false){
                        await Swal.fire({
                            text: "You have successfully logged in!",
                            icon: "success",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            heightAuto: false,
                            customClass: {
                                confirmButton: "btn fw-semobold btn-light-primary",
                            },
                        });
                        this.$router.push({ name: "Dashboard"});
                    } else {
                        await Swal.fire({
                            text: response.message,
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            heightAuto: false,
                            customClass: {
                                confirmButton: "btn fw-semobold btn-light-primary",
                            },
                        });
                    }
                } else {
                    await Swal.fire({
                        text: "A username and password must be present!",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        heightAuto: false,
                        customClass: {
                            confirmButton: "btn fw-semobold btn-light-primary",
                        },
                    });
                    // console.log("A username and password must be present");
                }
            }
        }
    };
</script>

<style>
    .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    }

    @media (min-width: 768px) {
    .bd-placeholder-img-lg {
        font-size: 3.5rem;
    }
    }

    html,
        body {
            height: 100%;
        }

        .sub_body {
            display: flex;
            align-items: center;
            padding-top: 40px;
            padding-bottom: 40px;
        }

        .form-signin {
            width: 100%;
            max-width: 330px;
            padding: 15px;
            margin: auto;
        }

        .form-signin .checkbox {
            font-weight: 400;
        }

        .form-signin .form-floating:focus-within {
            z-index: 2;
        }

        .form-signin input[type="email"] {
            margin-bottom: -1px;
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 0;
        }

        .form-signin input[type="password"] {
            margin-bottom: 10px;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }
</style>