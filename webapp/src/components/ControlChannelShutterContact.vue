<template>
    <div>
        <p v-if="forceStatus" class="ma-0 pa-0">{{ status }}</p>
        <v-icon color="grey darken-1" v-else>{{ icon }}</v-icon>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'ControlChannelShutterContact',
    props: {
        control: Object,
        channels: Array,
        forceStatus: Boolean
    },
    computed: {
        ...mapGetters([]),
        status() {
            if (this.control.param && this.control.param.indexOf('|') >= 0)
                return this.channels['STATE'].value
                    ? this.control.param.split('|')[0]
                    : this.control.param.split('|')[1];
            return this.channels['STATE'].value ? 'Offen' : 'Geschlossen';
        },
        icon() {
            if (this.control.param && this.control.param.indexOf('|') >= 0)
                return this.channels['STATE'].value
                    ? this.control.param.split('|')[0]
                    : this.control.param.split('|')[1];
            return this.channels['STATE'].value ? 'fas fa-door-open' : 'fas fa-door-closed';
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
