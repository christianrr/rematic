<template>
    <div>
        <p v-if="forceStatus" class="ma-0 pa-0">{{ status }}</p>

        <v-btn fab depressed width="35" height="35" color="gray lighten-2" v-else @click.stop="setState">
            <v-icon color="grey darken-1">{{ control.icon }}</v-icon></v-btn
        >
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'ControlChannelKey',
    props: {
        control: Object,
        channels: Array,
        forceStatus: Boolean
    },
    computed: {
        ...mapGetters([]),
        status() {
            return '';
        },
        controlType() {
            return 'button';
        }
    },
    data: () => ({}),
    methods: {
        ...mapActions(['setChannel']),
        handled() {},
        setState() {
            console.log(JSON.stringify(this.control));
            console.log(this.channels);
            var datapoint = 'PRESS_SHORT';
            if (this.control.paramKey) datapoint = this.control.paramKey;
            this.setChannel({ channel: this.channels[datapoint], value: true });
        }
    }
};
</script>

<style scoped></style>
