<template>
    <div>
        <v-btn fab depressed width="35" height="35" color="grey lighten-3" @click.stop="buttonClicked">
            <v-icon color="grey darken-1">{{ control.icon }}</v-icon></v-btn
        >
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'ControlProgram',
    props: {
        control: Object,
        forceStatus: Boolean
    },
    computed: {
        ...mapGetters([]),
        program() {
            if (!this.control || !this.control.sourceKey) return;
            return { name: this.control.sourceKey };
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

<style scoped></style>
