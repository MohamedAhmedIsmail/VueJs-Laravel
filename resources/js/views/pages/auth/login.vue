<script>
    import { mapActions } from 'vuex';
    import {  required, email } from "vuelidate/lib/validators";
    import axios from 'axios';

    export default {
        name:"login",
        data() {
            return {
                auth:{
                    email: "SuperAdmin@gmail.com",
                    password: "123456"
                },
                processing:false,
                submitted: false,
                pending: false,
                error:'',
            };
        },
        computed: {
            notification() {
                return this.$store ? this.$store.state.notification : null;
            },
            logo_url(){
                return window.location.origin + '/storage/tenants/login-logo.png';
            }
        },
        created() {
            document.body.classList.add("auth-body-bg");
        },
        validations: {
            email: {required, email},
            password: {required}
        },
        methods: {
            ...mapActions({
                signIn:'auth/login'
            }),
            async login(){
                this.processing = true;
                this.submitted = true;

                await axios.get('/sanctum/csrf-cookie')
                await axios.post('/login',this.auth).then(({data})=>{
                    this.submitted = false;
                    this.signIn(data.data)
                }).catch(({response:{data}})=>{
                    this.processing = false;
                    this.submitted = false;
                    this.error = data.message;
                }).finally(()=>{
                    this.processing = true;
                    this.submitted = true;
                })
            },

        }
    };

</script>


<template>
    <div>
        <div class="container-fluid p-0">
            <div class="row no-gutters">
                <div class="col-lg-4">
                    <div class="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                        <div class="w-100">
                            <div class="row justify-content-center">
                                <div class="col-lg-9">
                                    <div>
                                        <div class="text-center">
                                            <div  class="logo">
                                            </div>

                                            <h4 class="font-size-18 mt-4">{{$t('message.welcomeBack')}}</h4>
                                            <p class="text-muted">{{$t('message.loginToContinue')}}</p>
                                        </div>

                                        <b-alert  variant="danger" class="mt-3"  v-if="error" show dismissible >{{ error }}</b-alert>
                                        <div class="p-2 mt-5">
                                            <form action="javascript:void(0)" method="post" class="form-horizontal" >
                                                <div class="form-group auth-form-group-custom mb-4">
                                                    <i class="ri-mail-line auti-custom-input-icon"></i>
                                                    <label for="email">{{$t('message.email')}}</label>
                                                    <input type="email" v-model="auth.email" class="form-control" id="email"
                                                        placeholder="ادخل البريد الالكتروني"
                                                         />
                                                </div>


                                                <div class="form-group auth-form-group-custom mb-4">
                                                    <i class="ri-lock-2-line auti-custom-input-icon"></i>
                                                    <label for="userpassword">{{$t('message.password')}}</label>
                                                    <input v-model="auth.password" type="password" class="form-control"
                                                        id="userpassword" placeholder="ادخل كلمة المرور"  />
                                                </div>
                                                <div class="mt-4 text-center">
                                                    <button class="btn btn-primary w-md waves-effect waves-light"
                                                        type="submit" :disabled="processing" @click="login">
                                                        <span v-show="submitted || pending" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        <span v-show="!submitted && !pending">{{$t('message.login')}}</span>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>

                                        <div class="mt-5 text-center">

                                            <p dir="rtl">
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="authentication-bg">
                        <div class="bg-overlay"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
