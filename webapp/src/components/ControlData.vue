<template>
    <div>
        <p class="pa-0 ma-0" v-if="forceStatus && control.sourceType !== 'HTML'">{{ value }}</p>

        <div v-else-if="control.sourceType === 'HTML'" v-html="html"/>

        <v-btn
            fab
            depressed
            width="35"
            height="35"
            color="grey lighten-3"
            v-else-if="control.sourceType === 'MSG'"
            @click.stop="buttonClicked"
        >
            <v-icon color="grey darken-1">{{ control.icon }}</v-icon></v-btn
        >

        <p class="pa-0 ma-0" v-else>{{ value }}</p>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'ControlData',
    props: {
        control: Object,
        forceStatus: Boolean
    },
    computed: {
        ...mapGetters(['data']),
        value() {
            let unit = '';
            if (this.control.param) unit += ' ' + this.control.param;
            return this.data[this.control.sourceKey] + unit;
        },
        html() {
            return this.data[this.control.sourceKey]
        }
    },
    data: () => ({}),
    methods: {
        ...mapActions(['setMsg']),
        handled() {},
        buttonClicked() {
            this.setMsg({ msg: this.control.sourceKey });
        }
    }
};
</script>

<style scoped></style>
