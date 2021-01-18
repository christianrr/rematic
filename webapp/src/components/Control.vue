<template>
    <div>
        <ControlData
            :control="control"
            :forceStatus="forceStatus"
            v-if="control && control.source && control.source.startsWith('DATA')"
        />        
        <ControlSysvar
            :control="control"
            :forceStatus="forceStatus"
            v-else-if="control && control.source && control.source.startsWith('SYSVAR')"
        />
        <ControlChannel
            :control="control"
            :forceStatus="forceStatus"
            v-else-if="control && control.source && control.source.startsWith('CHANNEL')"
        />
        <ControlProgram
            :control="control"
            :forceStatus="forceStatus"
            v-else-if="control && control.source && control.source.startsWith('PROGRAM')"
        />
    </div>
</template>

<script>
import ControlData from '@/components/ControlData.vue';
import ControlSysvar from '@/components/ControlSysvar.vue';
import ControlChannel from '@/components/ControlChannel.vue';
import ControlProgram from '@/components/ControlProgram.vue';

export default {
    name: 'Control',
    components: {
        ControlData,
        ControlSysvar,
        ControlChannel,
        ControlProgram
    },
    props: {
        control: Object,
        forceStatus: Boolean
    }
};
</script>

<style scoped></style>
