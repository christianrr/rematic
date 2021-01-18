<template>
    <div>
        <p v-if="forceStatus" class="ma-0 pa-0">{{ status }}</p>
        <v-icon color="grey darken-1" v-else>{{ icon }}</v-icon>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'ControlChannelAccelerationTransceiver',
    props: {
        control: Object,
        channels: Array,
        forceStatus: Boolean
    },
    computed: {
        ...mapGetters([]),
        status() {
            if (this.control.param.indexOf('|') >= 0)
                return this.channels['MOTION'].value
                    ? this.control.param.split('|')[0]
                    : this.control.param.split('|')[1];
            return this.channels['MOTION'].value ? 'Geneigt' : 'Waagerecht';
        },
        icon() {
            if (this.control.param.indexOf('|') >= 0)
                return this.channels['MOTION'].value
                    ? this.control.param.split('|')[0]
                    : this.control.param.split('|')[1];
            return this.channels['MOTION'].value ? 'fas fa-grip-lines-vertical' : 'fas fa-grip-lines';
        }
    },
    data: () => ({}),
    methods: {
        ...mapActions([]),
        handled() {}
    }
};
</script>

<style scoped></style>
