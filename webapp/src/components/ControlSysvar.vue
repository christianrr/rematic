<template>
    <div v-if="sysvar">
        <p class="pa-0 ma-0" v-if="forceStatus">{{ status }}</p>

        <v-switch
            color="success"
            flat
            v-model="sysvar.value"
            v-else-if="controlType === 'switch'"
            height="45"
            @change="valueChanged"
            @click.stop="handled"
        ></v-switch>

        <PinInput :code="pin" :icon="control.icon" @confirmed="toggleValue" v-else-if="controlType === 'pin'" />

        <v-menu :close-on-click="true" v-else-if="controlType === 'menu'">
            <template v-slot:activator="{ on, attrs }">
                <v-btn fab depressed width="35" height="35" color="grey lighten-3" v-bind="attrs" v-on="on">
                    <v-icon color="grey darken-1">{{ control.icon }}</v-icon></v-btn
                >
            </template>

            <v-list>
                <v-list-item v-for="(item, index) in selectOptions" :key="index" ripple @click="menuClicked(index)">
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <v-select
            :value="sysvar.value"
            :items="selectOptions"
            item-value="id"
            item-text="name"
            return-object
            single-line
            v-else-if="controlType === 'select'"
            @change="selectChanged"
            @click.stop="handled"
            class="opt-select"
        ></v-select>

        <v-btn
            fab
            depressed
            width="35"
            height="35"
            color="grey lighten-3"
            v-else-if="controlType === 'button'"
            @click.stop="buttonClicked"
        >
            <v-icon color="grey darken-1">{{ control.icon }}</v-icon></v-btn
        >

        <p class="pa-0 ma-0" v-else>{{ status }}</p>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PinInput from './PinInput.vue';

export default {
    components: { PinInput },
    name: 'ControlSysvar',
    props: {
        control: Object,
        forceStatus: Boolean
    },
    computed: {
        ...mapGetters(['sysvars', 'values']),
        sysvar() {
            if (!this.control || !this.control.sourceKey) return;
            return this.sysvars[this.control.sourceKey];
        },
        controlType() {
            if (this.control.param === 'TEXT') return 'text';
            if (this.sysvar && this.sysvar.valueType == 'boolean' && this.control.param.startsWith('PIN')) return 'pin';
            if (this.sysvar && this.sysvar.valueType == 'boolean') return 'switch';
            if (
                this.sysvar &&
                this.sysvar.valueType == 'number' &&
                this.sysvar.enum.length > 1 &&
                this.control.param === 'MENU'
            )
                return 'menu';
            if (this.sysvar && this.sysvar.valueType == 'number' && this.sysvar.enum.length > 1 && !this.control.param)
                return 'select';
            if (this.sysvar && this.sysvar.valueType == 'number' && this.sysvar.enum.length > 1 && this.control.param)
                return 'button';
            return 'text';
        },
        status() {
            let value = '';
            if (this.sysvar.valueEnum) value = this.sysvar.valueEnum;
            else value = this.sysvar.value;

            let unit = '';
            if (this.sysvar.unit) unit += ' ' + this.sysvar.unit;
            if (this.control.param && this.control.param !== 'TEXT') unit += ' ' + this.control.param;

            return value + unit;
        },
        selectOptions() {
            if (!this.control || !this.control.source) return;
            var selectOptions = [];
            this.sysvar.enum.forEach((e, i) => {
                selectOptions.push({ id: i, name: e });
            });
            return selectOptions;
        },
        pin() {
            return this.control.param?.replace("PIN|", "");
        }
    },
    data: () => ({}),
    methods: {
        ...mapActions(['setSysvar', 'setProgram', 'setChannel', 'setMsg']),
        handled() {},
        selectChanged(value) {
            this.sysvar.value = value.id;
            this.valueChanged();
        },
        menuClicked(index) {
            this.sysvar.value = index;
            this.valueChanged();
        },
        toggleValue() {
            this.sysvar.value = !this.sysvar.value;
            this.valueChanged();
        },
        valueChanged() {
            if (this.control.param.indexOf('PROGRAM') >= 0) {
                // launch any assigned program
                const key = this.control.param.replace('PROGRAM|', '');
                this.setProgram({ program: key });
            } else if (this.control.param.indexOf('CHANNEL') >= 0) {
                // set any assigned channel
                const channelKey = Object.keys(this.values).find(v => v.indexOf(this.control.paramKey) >= 0);
                if (channelKey) this.setChannel({ channel: this.values[channelKey], value: true });
            } else if (this.control.param.indexOf('DATA:MSG') >= 0) {
                // send assigned msg
                this.setMsg({ msg: this.control.paramKey });
            } else {
                // set the value of the sysvar
                this.setSysvar({ sysvar: this.sysvar });
            }
        },
        buttonClicked() {
            // set the value of the sysvar
            this.sysvar.value = this.control.param;
            this.setSysvar({ sysvar: this.sysvar });
        }
    }
};
</script>

<style scoped>
.v-input--selection-controls {
    margin-top: 0px;
    padding-top: 0px;
    height: 45px;
}

.opt-select {
    width: 90px;
}
</style>
