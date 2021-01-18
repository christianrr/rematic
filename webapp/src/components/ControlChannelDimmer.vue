<template>
    <div>
        <p v-if="forceStatus" class="ma-0 pa-0">{{ status }}</p>
        <v-slider
            :color="channels['LEVEL'].value > 0 ? 'success' : 'grey lighten-3'"
            v-model="channels['LEVEL'].value"
            min="0"
            max="1"
            step="0.1"
            :validate-on-blur="true"
            @change="setLevel"
            @click.stop="handled"
            height="20"
            class="slider"
            v-else
        />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'ControlChannelDimmer',
    props: {
        control: Object,
        channels: Array,
        forceStatus: Boolean
    },
    computed: {
        ...mapGetters([]),
        status() {
            return (this.channels['LEVEL'].value * 100).toFixed(0) + '%';
        }
    },
    data: () => ({}),
    methods: {
        ...mapActions(['setChannel']),
        handled() {},
        setLevel() {
            this.setChannel({ channel: this.channels['LEVEL'], value: this.channels['LEVEL'].value });
        }
    }
};
</script>

<style scoped>
.slider {
    width: 100px;
    height: 20px;
}
</style>
