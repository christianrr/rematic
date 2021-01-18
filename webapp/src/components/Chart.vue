<template>
    <div class="chart-container pa-4 d-flex flex-column align-start">
        <h4>{{ title }}</h4>
        <div class="my-2" style="position: relative; width:100%" v-if="chartData">
            <bar-chart :chartData="datacollection" :options="options" responsive v-if="chartData.chartType === 'bar'" />
            <line-chart :chartData="datacollection" :options="options" responsive v-else />
        </div>
        <div class="mt-2 controls d-flex flex-row align-center">
            <Control :control="controls[1]" v-if="controls && controls[1]" />
            <Control :control="controls[2]" v-if="controls && controls[2]" />
            <h4 class="mt-2 ml-3" v-if="chartData && chartData.title">{{ chartData.title }}</h4>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Control from '@/components/Control.vue';
import LineChart from './charts/LineChart.js';
import BarChart from './charts/BarChart.js';

export default {
    name: 'Chart',
    components: {
        Control,
        LineChart,
        BarChart
    },
    props: {
        title: String,
        controls: Array
    },
    data() {
        return {
            datacollection: undefined,
            options: undefined
        };
    },
    computed: {
        ...mapGetters(['data']),
        chartData() {
            if (!this.controls || !this.controls[0] || !this.controls[0].sourceKey) return;
            var data = this.data[this.controls[0].sourceKey];
            if (data) this.fillData(data);
            return this.data[this.controls[0].sourceKey];
        }
    },
    methods: {
        fillData(data) {
            this.chartType = data.chartType;

            this.options = data.options;
            this.options.responsive = true;
            this.options.maintainAspectRatio = false;

            if(data.unit) {
                this.options.tooltips = {
                    callbacks: {
                        label: (tooltipItems, data) => {
                            return data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index] + ' kW';
                        }
                    }
                }
            }

            if(!data.labels || data.labels.length === 0) {
                this.datacollection = {
                    labels: data.data[0].map(d => d.x)
                };
            } else {
                this.datacollection = {
                    labels: data.labels
                }
            }
            this.datacollection.datasets = [];
            for (var i = 0; i < data.data.length; i++) {
                this.datacollection.datasets.push({
                    label: data.series[i],
                    borderWidth: 2,
                    pointRadius: 1,
                    borderColor: data.seriesColors && data.seriesColors[i] ? data.seriesColors[i] : '#f87979',
                    pointBackgroundColor: data.seriesColors && data.seriesColors[i] ? data.seriesColors[i] : '#f87979',
                    backgroundColor:
                        data.chartType === 'bar' && data.seriesColors && data.seriesColors[i]
                            ? data.seriesColors[i]
                            : undefined,
                    data: data.data[i]
                });
            }
        }
    }
};
</script>

<style>
.chart-container {
    border-bottom: 2px solid #eeeeee !important;
}
.controls {
    height: 45px;
}
</style>
