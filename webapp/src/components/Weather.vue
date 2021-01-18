<template>
    <div>
        <v-row class="ma-0 pa-0 mx-4 mt-4 mb-3">
            <v-col cols="4" md="2" class="ma-0 pa-0">
                <div>
                    <p class="ma-0 mt-3"><i class="wi wi-5x wi-owm-01d"></i></p>
                </div>
            </v-col>
            <v-col cols="8" md="10" class="ma-0 pa-0">
                <h1 class="accent--text">23°C</h1>
                <h2 class="mb-3">bewölkt</h2>
                <p class="my-0"><i class="fas fa-temperature-high"></i> 10°C</p>
                <p class="my-0"><i class="fas fa-temperature-low"></i> 2°C</p>
                <p class="my-0"><i class="fas fa-wind"></i> 10 km/h O</p>
                <p class="my-0"><i class="fas fa-tint"></i> 90%</p>
            </v-col>
        </v-row>

        <v-row class="ma-0 pa-0 pt-3">
            <v-col cols="6" md="3" lg="2" class="ma-0 pa-0">
                <v-card
                    class="device-tile fill-height fill-width ma-0 pa-0 d-flex flex-column justify-center"
                    :ripple="false"
                    flat
                >
                    <div class="d-flex flex-column align-center">
                        <h5 class="accent--text mb-2">13:00</h5>
                        <p class="ma-0 mb-2"><i class="wi wi-2x wi-owm-01d"></i></p>
                        <h5 class="mb-2">12°C/4°C</h5>
                        <h5>bewölkt</h5>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="6" md="3" lg="2" class="ma-0 pa-0">
                <v-card
                    class="device-tile fill-height fill-width ma-0 pa-0 d-flex flex-column justify-center"
                    :ripple="false"
                    flat
                >
                    <div class="d-flex flex-column align-center">
                        <h5 class="accent--text mb-2">14:00</h5>
                        <p class="ma-0 mb-2"><i class="wi wi-2x wi-owm-01d"></i></p>
                        <h5 class="mb-2">12°C/4°C</h5>
                        <h5>bewölkt</h5>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="6" md="3" lg="2" class="ma-0 pa-0">
                <v-card
                    class="device-tile fill-height fill-width ma-0 pa-0 d-flex flex-column justify-center"
                    :ripple="false"
                    flat
                >
                    <div class="d-flex flex-column align-center">
                        <h5 class="accent--text mb-2">15:00</h5>
                        <p class="ma-0 mb-2"><i class="wi wi-2x wi-owm-01d"></i></p>
                        <h5 class="mb-2">12°C/4°C</h5>
                        <h5>bewölkt</h5>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="6" md="3" lg="2" class="ma-0 pa-0">
                <v-card
                    class="device-tile fill-height fill-width ma-0 pa-0 d-flex flex-column justify-center"
                    :ripple="false"
                    flat
                >
                    <div class="d-flex flex-column align-center">
                        <h5 class="accent--text mb-2">16:00</h5>
                        <p class="ma-0 mb-2"><i class="wi wi-2x wi-owm-01d"></i></p>
                        <h5 class="mb-2">12°C/4°C</h5>
                        <h5>bewölkt</h5>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="6" md="3" lg="2" class="ma-0 pa-0">
                <v-card
                    class="device-tile fill-height fill-width ma-0 pa-0 d-flex flex-column justify-center"
                    :ripple="false"
                    flat
                >
                    <div class="d-flex flex-column align-center">
                        <h5 class="accent--text mb-2">17:00</h5>
                        <p class="ma-0 mb-2"><i class="wi wi-2x wi-owm-01d"></i></p>
                        <h5 class="mb-2">12°C/4°C</h5>
                        <h5>bewölkt</h5>
                    </div>
                </v-card>
            </v-col>
        </v-row>

        <h3 class="my-5 mx-4">Ausblick</h3>

        <v-row class="ma-0 pa-0">
            <v-col cols="6" md="3" lg="2" class="ma-0 pa-0">
                <v-card
                    class="device-tile fill-height fill-width ma-0 pa-0 d-flex flex-column justify-center"
                    :ripple="false"
                    flat
                >
                    <div class="d-flex flex-column align-center">
                        <h5 class="accent--text mb-2">Montag</h5>
                        <p class="ma-0 mb-2"><i class="wi wi-2x wi-owm-01d"></i></p>
                        <h5 class="mb-2">12°C/4°C</h5>
                        <h5>bewölkt</h5>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="6" md="3" lg="2" class="ma-0 pa-0">
                <v-card
                    class="device-tile fill-height fill-width ma-0 pa-0 d-flex flex-column justify-center"
                    :ripple="false"
                    flat
                >
                    <div class="d-flex flex-column align-center">
                        <h5 class="accent--text mb-2">Dienstag</h5>
                        <p class="ma-0 mb-2"><i class="wi wi-2x wi-owm-01d"></i></p>
                        <h5 class="mb-2">12°C/4°C</h5>
                        <h5>bewölkt</h5>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="6" md="3" lg="2" class="ma-0 pa-0">
                <v-card
                    class="device-tile fill-height fill-width ma-0 pa-0 d-flex flex-column justify-center"
                    :ripple="false"
                    flat
                >
                    <div class="d-flex flex-column align-center">
                        <h5 class="accent--text mb-2">Mittwoch</h5>
                        <p class="ma-0 mb-2"><i class="wi wi-2x wi-owm-01d"></i></p>
                        <h5 class="mb-2">12°C/4°C</h5>
                        <h5>bewölkt</h5>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="6" md="3" lg="2" class="ma-0 pa-0">
                <v-card
                    class="device-tile fill-height fill-width ma-0 pa-0 d-flex flex-column justify-center"
                    :ripple="false"
                    flat
                >
                    <div class="d-flex flex-column align-center">
                        <h5 class="accent--text mb-2">Donnerstag</h5>
                        <p class="ma-0 mb-2"><i class="wi wi-2x wi-owm-01d"></i></p>
                        <h5 class="mb-2">12°C/4°C</h5>
                        <h5>bewölkt</h5>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="6" md="3" lg="2" class="ma-0 pa-0">
                <v-card
                    class="device-tile fill-height fill-width ma-0 pa-0 d-flex flex-column justify-center"
                    :ripple="false"
                    flat
                >
                    <div class="d-flex flex-column align-center">
                        <h5 class="accent--text mb-2">Freitag</h5>
                        <p class="ma-0 mb-2"><i class="wi wi-2x wi-owm-01d"></i></p>
                        <h5 class="mb-2">12°C/4°C</h5>
                        <h5>bewölkt</h5>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Weather',
    props: {
        control: Object,
        forceStatus: Boolean
    },
    computed: {
        ...mapGetters(['data']),
        data() {
            if (!this.control || !this.control.sourceKey) return;
            console.log(this.data[this.control.sourceKey]);
            return this.data[this.control.sourceKey];
        }
    },
    data: () => ({}),
    methods: {}
};
</script>

<style scoped>

</style>
