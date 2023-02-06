<template>
    <v-app>
        <v-app-bar app color="primary" :height="appBarHeight" dark flat fixed>
            <v-app-bar-nav-icon @click="drawer = true" color="white" class="ma-2">
                <v-img :src="publicPath + 'assets/MainMenu.png'" width="30" height="30" contain/>
            </v-app-bar-nav-icon>
            <router-link to="/" v-if="!isLandscapeSm || isPortraitXs" class="mx-auto"><v-img :src="publicPath + 'assets/Logo.png'" :width="logoHeight" :height="logoHeight" contain class="my-4"/></router-link>
            <v-tabs centered slider-color="accent" v-if="isLandscapeSm && !isPortraitXs">
                    <v-tab to="/">Dashboard</v-tab>
                    <v-tab to="/rooms">Räume</v-tab>
                    <v-tab to="/categories">Kategorien</v-tab>
                </v-tabs>
            <v-btn icon class="ma-2" to="/settings">
                <v-icon>fas fa-sliders-h</v-icon>
            </v-btn>

            <template v-slot:extension v-if="!isLandscapeSm && !isPortraitXs">
                <v-tabs centered slider-color="accent">
                    <v-tab to="/">Dashboard</v-tab>
                    <v-tab to="/rooms">Räume</v-tab>
                    <v-tab to="/categories">Kategorien</v-tab>
                </v-tabs>
            </template>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" color="primary" dark class="drawer" temporary app fixed>
            <v-img :src="publicPath + 'assets/Logo.png'" width="50" height="50" contain class="ma-4" />
            <v-list nav class="ma-2">
                <v-list-item-group>
                    <v-list-item to="/">
                        <v-list-item-title>Dashboard</v-list-item-title>
                    </v-list-item>
                    <v-list-item to="/rooms">
                        <v-list-item-title>Räume</v-list-item-title>
                    </v-list-item>
                    <v-list-item to="/categories">
                        <v-list-item-title>Kategorien</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <loading />
            <router-view />
        </v-main>

        <ErrorMessage />
    </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ErrorMessage from '@/components/ErrorMessage.vue';
import Loading from '@/components/Loading.vue';

export default {
    name: 'App',
    components: {
        Loading,
        ErrorMessage
    },
    data: () => ({
        drawer: false,
        publicPath: process.env.BASE_URL,
        lastInactiveTimestamp: new Date(),
        handledConnect: false
    }),
    computed: {
        ...mapGetters(['config']),
        isLandscapeSm() {
            return this.$vuetify.breakpoint.mdAndDown && this.$vuetify.breakpoint.width > this.$vuetify.breakpoint.height;
        },
        isPortraitXs() {
            console.log('xs', this.$vuetify.breakpoint.smAndDown && this.$vuetify.breakpoint.width < this.$vuetify.breakpoint.height && this.$vuetify.breakpoint.width < 400 && this.$vuetify.breakpoint.height < 600)
            return this.$vuetify.breakpoint.smAndDown && this.$vuetify.breakpoint.width < 420 && this.$vuetify.breakpoint.height < 600;
        },
        appBarHeight() {
            if (this.isPortraitXs) return 55;
            if (this.isLandscapeSm) return 65;
            return 80;
        },
        logoHeight() {
            if (this.isPortraitXs) return 40;
            return 50;
        }
    },
    sockets: {
        async connect() {
            if (this.handledConnect) return;
            if (!this.handledConnect) this.handledConnect = true;

            console.log('Connected to backend.');
            await this.getConfig();

            this.setMsg({ msg: 'navigation to ' + this.$router.currentRoute.path });
        },
        disconnect() {
            console.log('Disconnected from backend.');
            this.handledConnect = false;
        }
    },
    mounted() {
        this.showLoading(3000);
        this.connect();
    },
    methods: {
        ...mapActions(['getConfig', 'requestUpdate', 'setLoading', 'connect', 'setSocket', 'setMsg']),
        showLoading(duration) {
            this.setLoading(true);
            setTimeout(() => {
                this.setLoading(false);
            }, duration);
        }
    }
};
</script>

<style lang="scss">
.owi {
    display: inline-block;
    transform: translate(0, 0);
    width: 20px;
    height: 20px;
}

.owi-lg {
    width: 200px;
    height: 200px;
}

.owi-2x {
    width: 40px;
    height: 40px;
}

.owi-3x {
    width: 60px;
    height: 600px;
}

.owi-4x {
    width: 80px;
    height: 80px;
}

.owi-5x {
    width: 100px;
    height: 100px;
}

.owi-6x {
    width: 120px;
    height: 120px;
}

.owi-01d {
    background-image: url('./assets/weather/01d.svg');
}

.owi-01n {
    background-image: url('./assets/weather/01n.svg');
}

.owi-02d {
    background-image: url('./assets/weather/02d.svg');
}

.owi-02n {
    background-image: url('./assets/weather/02n.svg');
}

.owi-03d {
    background-image: url('./assets/weather/03d.svg');
}

.owi-03n {
    background-image: url('./assets/weather/03n.svg');
}

.owi-04d {
    background-image: url('./assets/weather/04d.svg');
}

.owi-04n {
    background-image: url('./assets/weather/04n.svg');
}

.owi-09d {
    background-image: url('./assets/weather/09d.svg');
}

.owi-09n {
    background-image: url('./assets/weather/09n.svg');
}

.owi-10d {
    background-image: url('./assets/weather/10d.svg');
}

.owi-10n {
    background-image: url('./assets/weather/10n.svg');
}

.owi-11d {
    background-image: url('./assets/weather/11d.svg');
}

.owi-11n {
    background-image: url('./assets/weather/11n.svg');
}

.owi-13d {
    background-image: url('./assets/weather/13d.svg');
}

.owi-13n {
    background-image: url('./assets/weather/13n.svg');
}

.owi-50d {
    background-image: url('./assets/weather/50d.svg');
}

.owi-50n {
    background-image: url('./assets/weather/50n.svg');
}
</style>

<style>
@font-face {
    font-family: 'Avenir LT Std';
    src: url('./assets/fonts/AvenirLTStd-Medium.woff2') format('woff2'),
        url('./assets/fonts/AvenirLTStd-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Avenir LT Std';
    src: url('./assets/fonts/AvenirLTStd-Book.woff2') format('woff2'),
        url('./assets/fonts/AvenirLTStd-Book.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Avenir LT Std';
    src: url('./assets/fonts/AvenirLTStd-Black.woff2') format('woff2'),
        url('./assets/fonts/AvenirLTStd-Black.woff') format('woff');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
}

html,
body {
    overflow-x: hidden;
}

.v-app-bar {
    z-index: 9 !important;
}

.v-navigation-drawer--temporary {
    z-index: 10 !important;
}

.v-tabs-slider-wrapper {
    height: 5px !important;
}

.drawer .v-list-item__title {
    font-size: 1.2rem !important;
}

.v-input--switch__thumb {
    color: #eeeeee !important;
}

.v-slider__thumb {
    box-shadow: none !important;
}

.v-btn .v-icon {
    font-size: 20px !important;
}

.cursor-pointer {
    cursor: pointer;
}

.prominent-app-bar {
    display: block !important;
}

.dense-app-bar {
    display: none !important;
}

@media (max-width: 1024px) and (orientation: landscape) {
    .prominent-app-bar {
        display: none !important;
    }

    .dense-app-bar {
        display: block !important;
    }
}

</style>
