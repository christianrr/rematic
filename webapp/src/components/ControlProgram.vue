<template>
    <div>
        <v-btn
            fab
            depressed
            width="35"
            height="35"
            color="grey lighten-3"
            @click.stop="buttonClicked"
            v-if="controlType === 'program'"
        >
            <v-icon color="grey darken-1">{{ control.icon }}</v-icon></v-btn
        >

        <PinInput :code="pin" :icon="control.icon" @confirmed="buttonClicked" v-else />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PinInput from './PinInput.vue';

export default {
    components: { PinInput },
    name: 'ControlProgram',
    props: {
        control: Object,
        forceStatus: Boolean
    },
    computed: {
        ...mapGetters([]),
        controlType() {
            if (this.control.param.startsWith('PIN')) return 'pin';
            return 'program';
        },
        program() {
            if (!this.control || !this.control.sourceKey) return;
            return { name: this.control.sourceKey };
        },
        pin() {
            return this.control.param?.replace('PIN|', '');
        }
    },
    data: () => ({}),
    methods: {
        ...mapActions(['setProgram']),
        handled() {},
        buttonClicked() {
            this.setProgram({ program: this.program });
        }
    }
};
</script>

<style scoped>
</style>
