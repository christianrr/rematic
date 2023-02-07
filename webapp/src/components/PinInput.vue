<template>
    <v-dialog v-model="pinDialog" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-btn fab depressed width="35" height="35" color="grey lighten-3" v-bind="attrs" v-on="on">
                <v-icon color="grey darken-1">{{ icon }}</v-icon>
            </v-btn>
        </template>
        <v-container class="pa-0 py-2 white">
            <v-row class="pa-0 ma-0">
                <v-col cols="4" class="p-keypad">
                    <v-btn fab depressed width="50" height="50" color="grey lighten-3" @click="pinDigitClicked(1)"> 1 </v-btn>
                </v-col>
                <v-col cols="4" class="p-keypad">
                    <v-btn fab depressed width="50" height="50" color="grey lighten-3" @click="pinDigitClicked(2)"> 2 </v-btn>
                </v-col>
                <v-col cols="4" class="p-keypad">
                    <v-btn fab depressed width="50" height="50" color="grey lighten-3" @click="pinDigitClicked(3)"> 3 </v-btn>
                </v-col>
            </v-row>
            <v-row class="pa-0 ma-0">
                <v-col cols="4" class="p-keypad">
                    <v-btn fab depressed width="50" height="50" color="grey lighten-3" @click="pinDigitClicked(4)"> 4 </v-btn>
                </v-col>
                <v-col cols="4" class="p-keypad">
                    <v-btn fab depressed width="50" height="50" color="grey lighten-3" @click="pinDigitClicked(5)"> 5 </v-btn>
                </v-col>
                <v-col cols="4" class="p-keypad">
                    <v-btn fab depressed width="50" height="50" color="grey lighten-3" @click="pinDigitClicked(6)"> 6 </v-btn>
                </v-col>
            </v-row>
            <v-row class="pa-0 ma-0">
                <v-col cols="4" class="p-keypad">
                    <v-btn fab depressed width="50" height="50" color="grey lighten-3" @click="pinDigitClicked(7)"> 7 </v-btn>
                </v-col>
                <v-col cols="4" class="p-keypad">
                    <v-btn fab depressed width="50" height="50" color="grey lighten-3" @click="pinDigitClicked(8)"> 8 </v-btn>
                </v-col>
                <v-col cols="4" class="p-keypad">
                    <v-btn fab depressed width="50" height="50" color="grey lighten-3" @click="pinDigitClicked(9)"> 9 </v-btn>
                </v-col>
            </v-row>
            <v-row class="pa-0 ma-0">
                <v-col cols="4" class="p-keypad"><strong>{{ pin }}</strong></v-col>
                <v-col cols="4" class="p-keypad">
                    <v-btn fab depressed width="50" height="50" color="grey lighten-3" @click="pinDigitClicked(0)"> 0 </v-btn>
                </v-col>
                <v-col cols="4" class="p-keypad">
                    <v-btn fab depressed width="50" height="50" color="grey lighten-3" @click="pinConfirmed">
                        <v-icon color="grey darken-1">{{ icon }}</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-dialog>
</template>

<script>

export default {
    name: 'PinInput',
    props: {
        code: String,
        icon: String
    },
    data: () => ({
        pinDialog: false,
        pin: ''
    }),
    methods: {
        pinDigitClicked(pin) {
            this.pin += pin;
        },
        pinConfirmed() {
            if(this.code === this.pin) {
                this.pinDialog = false;
                this.$emit('confirmed');
            } 
            this.pin = '';
        }
    }
};
</script>

<style scoped>
.p-keypad {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 10px;
}
</style>
