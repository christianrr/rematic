<template>
    <div>
        <p v-if="forceStatus" class="ma-0 pa-0">{{ status }}</p>

        <div class="controls d-flex flex-row align-center justify-center" v-else>
            <v-switch
                color="success"
                flat
                :input-value="toggleState"
                height="45"
                @change="onToggleUpdated"
                @click.stop="handled"
                class="controls pa-0 ma-0"
            ></v-switch>
            <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn fab depressed width="35" height="35" color="grey lighten-3" v-bind="attrs" v-on="on">
                        <v-icon color="grey darken-1">fas fa-cog</v-icon>
                    </v-btn>
                </template>
                <v-container class="pa-0 py-2 white">
                    <div class="px-4 py-3">
                        <h4>Helligkeit:</h4>
                        <v-slider
                            min="0"
                            max="1"
                            step="0.1"
                            v-model="channels['LEVEL'].value"
                            class="brightness-slider"
                            color="grey lighten-2"
                            @change="setLevel(channels['LEVEL'].value)"
                        ></v-slider>
                    </div>

                    <v-divider class="pa-0" v-if="hasColor" />

                    <div class="px-4 py-3" v-if="hasColor">
                        <h4>Farbe:</h4>
                        <v-color-picker
                            dot-size="25"
                            hide-inputs
                            hide-mode-switch
                            mode="rgba"
                            swatches-max-height="200"
                            class="picker mt-2"
                            :value="color"
                            @update:color="onColorUpdated"
                        ></v-color-picker>
                    </div>

                    <v-divider class="pa-0" v-if="hasTemperature" />

                    <div class="px-4 py-3" v-if="hasTemperature">
                        <h4 class="mt-2">Temperatur:</h4>
                        <v-slider
                            min="2500"
                            max="6500"
                            v-model="channels['WHITE'].value"
                            class="temp-slider"
                            color="grey lighten-2"
                            @change="setWhite(channels['WHITE'].value)"
                            :validate-on-blur="true"
                        ></v-slider>
                    </div>
                </v-container>
            </v-dialog>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'ControlChannelRGBWDimmer',
    props: {
        control: Object,
        channels: Array,
        hasColor: Boolean,
        hasTemperature: Boolean,
        forceStatus: Boolean
    },
    computed: {
        ...mapGetters([]),
        status() {
            return (this.channels['LEVEL'].value * 100).toFixed(0) + '%';
        },
        toggleState() {
            if ('STATE' in this.channels) return this.channels['STATE'].value;
            return this.channels['LEVEL'].value > 0;
        },
        color() {
            if (this.channels['RGBW']) {
                let color = this.channels['RGBW'].value;
                color = color.replace('rgb(', '').replace(')', '');
                const rgbw = color.split(',');
                return { r: rgbw[0], g: rgbw[1], b: rgbw[2], a: 1 };
            } else return {};
        }
    },
    data: () => ({
        dialog: false,
        currentColor: Object
    }),
    watch: {
        color() {
            this.currentColor = this.color;
        }
    },
    methods: {
        ...mapActions(['setChannel']),
        handled() {},
        setLevel(l) {
            this.setChannel({ channel: this.channels['LEVEL'], value: l });
        },
        setRGBW(r, g, b) {
            this.setChannel({ channel: this.channels['RGBW'], value: `rgb(${r},${g},${b},255)` });
        },
        setWhite(w) {
            this.setChannel({ channel: this.channels['WHITE'], value: w });
        },
        onColorUpdated(color) {
            if (color.rgba === this.currentColor) return;
            this.setRGBW(color.rgba.r, color.rgba.g, color.rgba.b);
        },
        onToggleUpdated(value) {
            if (value) this.setLevel(1);
            else this.setLevel(0);
        }
    }
};
</script>

<style scoped>
.controls {
    height: 45px;
}

.slider {
    width: 100px;
    height: 20px;
}

.picker >>> .v-color-picker__hue {
    margin-bottom: 0px !important;
    margin-top: 5px !important;
}

.picker >>> .v-color-picker__alpha {
    visibility: collapse;
}

.brightness-slider {
    height: 30px;
}

.brightness-slider >>> .v-slider__track-container {
    height: 10px;
    border-radius: 5px;
}

.brightness-slider >>> .v-slider__track-fill {
    border-radius: 5px;
    background: #e0e0e0;
    background-color: #e0e0e0 !important;
}

.brightness-slider >>> .v-slider__track-background {
    border-radius: 5px;
    background: #eeeeee;
    background-color: #eeeeee !important;
}

.temp-slider >>> .v-slider__track-container {
    height: 10px;
    background: linear-gradient(90deg, rgba(113, 107, 255, 1) 0%, rgba(255, 252, 0, 1) 100%);
    border-radius: 5px;
}

.temp-slider >>> .v-slider__track-fill {
    border-radius: 5px;
    background: transparent;
    background-color: transparent !important;
}

.temp-slider >>> .v-slider__track-background {
    border-radius: 5px;
    visibility: collapse;
}
</style>
