<template>
    <div>
        <p v-if="forceStatus" class="ma-0 pa-0">{{ status }}</p>

        <v-toggle-btn
            fab
            depressed
            width="35"
            height="35"
            color="success"
            v-model="channels['STATE'].value"
            v-else-if="controlType === 'button'"
            @click.stop="buttonClicked"
        >
            <v-icon>{{ control.icon }}</v-icon></v-toggle-btn
        >
        <v-switch
            color="success"
            flat
            v-model="channels['STATE'].value"
            height="45"
            @change="setState"
            @click.stop="handled"
            v-else
        ></v-switch>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'ControlChannelSwitch',
    props: {
        control: Object,
        channels: Array,
        forceStatus: Boolean
    },
    computed: {
        ...mapGetters([]),
        status() {
            return this.channels['STATE'].value ? 'An' : 'Aus';
        },
        controlType() {
            if (this.control.param.indexOf('BUTTON') >= 0) return 'button';
            return 'switch';
        }
    },
    data: () => ({}),
    methods: {
        ...mapActions(['setChannel']),
        handled() {},
        setState() {
            this.setChannel({ channel: this.channels['STATE'], value: this.channels['STATE'].value });
        }
    }
};
</script>

<style scoped></style>
