<template>
    <div>
        <ControlChannelJalousie
            v-if="control.sourceType === 'JALOUSIE' || control.sourceType === 'BLIND'"
            :control="control"
            :channels="channels"
            :forceStatus="forceStatus"
        />
        <ControlChannelAccelerationTransceiver
            v-else-if="control.sourceType === 'ACCELERATION-TRANSCEIVER'"
            :control="control"
            :channels="channels"
            :forceStatus="forceStatus"
        />
        <ControlChannelShutterContact
            v-else-if="control.sourceType === 'SHUTTER-CONTACT'"
            :control="control"
            :channels="channels"
            :forceStatus="forceStatus"
        />
        <ControlChannelSwitch
            v-else-if="control.sourceType && control.sourceType.indexOf('SWITCH') >= 0"
            :control="control"
            :channels="channels"
            :forceStatus="forceStatus"
        />
        <ControlChannelRGBWDimmer
            v-else-if="control.sourceType && control.sourceType.indexOf('DIMMER') >= 0"
            :control="control"
            :channels="channels"
            :forceStatus="forceStatus"
            :hasColor="false"
            :hasTemperature="false"
        />
        <ControlChannelRGBWDimmer
            v-else-if="control.sourceType && control.sourceType.indexOf('RGB-DIM') >= 0"
            :control="control"
            :channels="channels"
            :forceStatus="forceStatus"
            :hasColor="true"
            :hasTemperature="false"
        />
        <ControlChannelRGBWDimmer
            v-else-if="control.sourceType && control.sourceType.indexOf('RGBW-DIM') >= 0"
            :control="control"
            :channels="channels"
            :forceStatus="forceStatus"
            :hasColor="true"
            :hasTemperature="true"
        />
        <ControlChannelKey
            v-else-if="control.sourceType && control.sourceType.indexOf('KEY') >= 0"
            :control="control"
            :channels="channels"
            :forceStatus="forceStatus"
            :hasColor="true"
            :hasTemperature="true"
        />

        <p v-else-if="forceStatus" class="ma-0 pa-0">{{ status }}</p>
        <v-select
            :items="Object.values(channels)"
            item-value="datapointName"
            item-text="datapoint"
            placeholder="Endpunkte"
            return-object
            single-line
            @click.stop="handled"
            v-else
        />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ControlChannelJalousie from '@/components/ControlChannelJalousie.vue';
import ControlChannelAccelerationTransceiver from '@/components/ControlChannelAccelerationTransceiver.vue';
import ControlChannelShutterContact from '@/components/ControlChannelShutterContact.vue';
import ControlChannelSwitch from '@/components/ControlChannelSwitch.vue';
import ControlChannelRGBWDimmer from '@/components/ControlChannelRGBWDimmer.vue';
import ControlChannelKey from '@/components/ControlChannelKey.vue';

export default {
    name: 'ControlChannel',
    components: {
        ControlChannelJalousie,
        ControlChannelAccelerationTransceiver,
        ControlChannelShutterContact,
        ControlChannelSwitch,
        ControlChannelRGBWDimmer,
        ControlChannelKey
    },
    props: {
        control: Object,
        forceStatus: Boolean
    },
    computed: {
        ...mapGetters(['values']),
        channels() {
            if (!this.control || !this.control.sourceKey) return;
            const channels = [];
            Object.values(this.values).forEach(value => {
                if (value.channel === this.control.sourceKey) channels[value.datapoint] = value;
            });
            return channels;
        },
        status() {
            if (this.control.paramKey && this.control.paramKey in this.channels)
                return this.channels[this.control.paramKey].value;
            return Object.values(this.channels)[0].value;
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
