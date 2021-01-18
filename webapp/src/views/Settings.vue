<template>
    <v-container>
        <v-btn v-if="server && server.token" color="accent" class="mb-4" @click="logoutClicked">Logout</v-btn>
        <v-form ref="form" v-model="valid" lazy-validation>
            <h3 class="my-4">Server</h3>

            <v-text-field v-model="app" :rules="appRules" label="App-Name" autocomplete="on" required v-if="showAppName"></v-text-field>

            <v-text-field
                v-model="token"
                type="password"
                :rules="checkbox ? tokenRules : undefined"
                label="Passwort"
                required
            ></v-text-field>

            <p class="mb-4" v-if="showAppName">App-Name und Passwort bitte mit dem rematic Web-App-Node in NodeRED abgleichen.</p>
            <p class="mb-4" v-else>Passwort bitte mit dem rematic Web-App-Node in NodeRED abgleichen.</p>

            <v-btn :disabled="!valid" color="accent" class="mr-4 mt-4" @click="validate">
                Speichern
            </v-btn>
        </v-form>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'Settings',

    data: () => ({
        valid: true,
        app: undefined,
        appRules: [v => !!v || 'App-Name muss angegeben werden.'],
        token: undefined,
        tokenRules: [v => !!v || 'Token muss angegeben werden.'],
        checkbox: true,
        showAppName: true
    }),
    computed: {
        ...mapGetters(['server'])
    },
    created() {
        if (this.server && this.server.token) this.token = this.server.token;
        if (this.server && this.server.app) this.app = this.server.app;
        if (location.search.length > 1) this.showAppName = false;
        this.setLoading(false);
    },
    methods: {
        ...mapActions(['login', 'logout', 'setLoading']),
        validate() {
            var valid = this.$refs.form.validate();
            if (valid) {
                this.login({ token: this.token, app: this.app });
            }
        },
        reset() {
            //this.$refs.form.reset();
        },
        logoutClicked() {
            this.logout();
            this.reset();
        }
    }
};
</script>
