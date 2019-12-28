import PostMessageChart from './PostMessageChart';

class tingsChartJS {
    initialize(registry, store) {
        registry.registerPostMessageAttachmentComponent(PostMessageChart);
    }

    uninitialize() {
        // No clean up required.
    }
}

window.registerPlugin('com.spikeassociates.tings-chartjs', new tingsChartJS());