<template>
    <div class>
        <div class="container">
            <h1 style="font-family: 'Times New Roman'; font-size: 3vw; font-weight: bold">Gotodo</h1>
            <a-input style="margin-top: 1vh" placeholder="用户名" v-model="UserName">
                <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
            </a-input>
            <a-input style="margin-top: 4vh" placeholder="密码" v-model="UserPassword">
                <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
            </a-input>

            <a-button style="margin-top: 2vh;" @click="doLogin" type="primary"><b>登陆</b></a-button>
            <a-row style="margin-top: 2vh">
                <a-col :span="11">
                    <a-button style="width: 100%;" @click="SignUpBoxENA = true">
                        注册
                    </a-button>
                </a-col>
                <a-col :span="2"> </a-col>
                <a-col :span="11">
                    <a-button style="width: 100%" type="dashed" @click="ChangePasswordBoxENA = true">
                        修改密码
                    </a-button>
                </a-col>
            </a-row>
        </div>
        <a-modal title="错误提示" :visible="MessageBoxENA" @ok="MessageBoxENA = false" @cancel="MessageBoxENA = false">
            {{MessageBoxText}}
        </a-modal>

        <a-modal title="注册用户" class="box_container" :visible="SignUpBoxENA" @ok="doSignUp" @cancel="exitSignUpBox">
            <a-input style="margin-top: 1vh" placeholder="用户名" v-model="SignUpUserName">
                <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
            </a-input>
            <a-input style="margin-top: 4vh" placeholder="密码" v-model="SignUpUserPassword">
                <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
            </a-input>
        </a-modal>

        <a-modal title="修改密码" class="box_container" :visible="ChangePasswordBoxENA" @ok="doChangePassword" @cancel="exitChangePasswordBox">
            <a-input style="margin-top: 1vh" placeholder="用户名" v-model="ChangePasswordUserName">
                <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
            </a-input>
            <a-input style="margin-top: 4vh" placeholder="原始密码" v-model="ChangePasswordOldPassword">
                <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
            </a-input>
            <a-input style="margin-top: 4vh" placeholder="新密码" v-model="ChangePasswordNewPassword">
                <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
            </a-input>
        </a-modal>
    </div>
</template>

<script>


import Vue from "vue";

export default {
    name: 'Home',
    components: {
    },

    data () {
        return {
            UserName: "",
            UserPassword: "",

            MessageBoxENA: false,
            MessageBoxText: "",

            SignUpBoxENA: false,
            SignUpUserName: "",
            SignUpUserPassword: "",

            ChangePasswordBoxENA: false,
            ChangePasswordUserName: "",
            ChangePasswordOldPassword: "",
            ChangePasswordNewPassword: ""
        }
    },
    methods: {
        doLogin() {

            const _this = this
            this.$axios({
                method: "post",
                url: "http://127.0.0.1:8888/user/login",
                data: {
                    UserName: this.UserName,
                    UserPassword: this.UserPassword
                }
            }).then(function (res) {
                if (res.data.code === 0) { // 密码验证成功，保存用户信息，切换到
                    sessionStorage.setItem("UserName", res.data.data.UserName)
                    sessionStorage.setItem("UserId", res.data.data.UserId)
                    _this.$router.push({path: "/"})
                } else {
                    _this.MessageBoxENA = true
                    _this.MessageBoxText = res.data.message
                }
            })
        },
        exitSignUpBox() {
            this.SignUpUserName = ""
            this.SignUpUserPassword = ""
            this.SignUpBoxENA = false
        },
        doSignUp() {
            const _this = this
            this.$axios({
                method: "post",
                url: "http://127.0.0.1:8888/user/new",
                data: {
                    UserName: this.SignUpUserName,
                    UserPassword: this.SignUpUserPassword
                }
            }).then(function (res) {
                if (res.data.code === 0) { // 密码验证成功，保存用户信息，切换到
                    _this.MessageBoxENA = true
                    _this.MessageBoxText = "用户创建成功，请登陆！"
                    _this.exitSignUpBox()
                } else {
                    _this.MessageBoxENA = true
                    _this.MessageBoxText = res.data.message
                }
            })
        },
        exitChangePasswordBox() {
            this.ChangePasswordUserName = ""
            this.ChangePasswordOldPassword = ""
            this.ChangePasswordNewPassword = ""
            this.ChangePasswordBoxENA = false
        },
        doChangePassword() {
            const _this = this
            this.$axios({
                method: "post",
                url: "http://127.0.0.1:8888/user/change",
                data: {
                    UserName: this.ChangePasswordUserName,
                    OldPassword: this.ChangePasswordOldPassword,
                    NewPassword: this.ChangePasswordNewPassword
                }
            }).then(function (res) {
                if (res.data.code === 0) {
                    _this.MessageBoxENA = true
                    _this.MessageBoxText = "密码修改成功，请登陆！"
                    _this.exitChangePasswordBox()
                } else {
                    _this.MessageBoxENA = true
                    _this.MessageBoxText = res.data.message
                }
            })
        }
    }

}

</script>

<style>
.container{
    position: absolute;
    width: 24vw;
    left: 38vw;

    text-align: center;
    margin-top: 18vh;

    display: flex;
    flex-direction: column;
}

.box_container {
    display: flex;
    flex-direction: column;

    text-align: center;
    width: 15vw;
}
</style>
