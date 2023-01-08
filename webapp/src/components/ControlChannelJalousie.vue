<template>
    <div>
        <p v-if="forceStatus" class="ma-0 pa-0">{{ status }}</p>

        <div v-else>
            <v-btn
                fab
                depressed
                width="35"
                height="35"
                color="grey lighten-3"
                class="ml-1"
                @click.stop="slatsDown"
                v-if="control.sourceType === 'JALOUSIE' || control.sourceType === 'BLIND-VIRTUAL-RECEIVER'"
            >
                <v-icon color="grey darken-1">fas fa-sort-amount-down</v-icon></v-btn
            >
            <v-btn fab depressed width="35" height="35" color="grey lighten-3" class="ml-1" @click.stop="levelDown">
                <v-icon color="grey darken-1">fas fa-angle-down</v-icon></v-btn
            >
            <v-btn fab depressed width="35" height="35" color="grey lighten-3" class="ml-1" @click.stop="stop">
                <v-icon color="grey darken-1">fas fa-grip-lines</v-icon></v-btn
            >
            <v-btn fab depressed width="35" height="35" color="grey lighten-3" class="ml-1" @click.stop="levelUp">
                <v-icon color="grey darken-1">fas fa-angle-up</v-icon></v-btn
            >
            <v-btn
                fab
                depressed
                width="35"
                height="35"
                color="grey lighten-3"
                class="ml-1"
                @click.stop="slatsUp"
                v-if="control.sourceType === 'JALOUSIE' || control.sourceType === 'BLIND-VIRTUAL-RECEIVER'"
            >
                <v-icon color="grey darken-1">fas fa-sort-amount-up</v-icon></v-btn
            >
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'ControlChannelJalousie',
    props: {
        control: Object,
        channels: Array,
        forceStatus: Boolean
    },
    computed: {
        ...mapGetters([]),
        status() {
            let value = 100 - this.channels['LEVEL'].value * 100;
            if (value === 0) return 'offen';
            if (value === 100) return 'zu';
            return value.toFixed(0) + '%';
        }
    },
    data: () => ({}),
    methods: {
        ...mapActions(['setChannel', 'setChannels']),
        handled() {},
        setLevel(level) {
            this.setChannel({ channel: this.channels['LEVEL'], value: level });
        },
        setSlatsLevel(level) {
            this.setChannels([{ channel: this.channels['LEVEL'], value: level }, { channel: this.channels['STOP'], value: true, delay: 200 }]);
        },
        stop() {
            this.setChannel({ channel: this.channels['STOP'], value: true });
        },
        levelDown() {
            this.setLevel(0);
        },
        levelUp() {
            this.setLevel(1);
        },
        slatsDown() {
            this.setSlatsLevel(0);
        },
        slatsUp() {
            this.setSlatsLevel(1);
        }
    }
};
</script>

<style scoped></style>
