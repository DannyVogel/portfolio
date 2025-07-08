import { getWebInstrumentations, initializeFaro } from "@grafana/faro-web-sdk";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";

export default defineNuxtPlugin((nuxtApp) => {
  initializeFaro({
    url: "https://faro-collector-prod-eu-central-0.grafana.net/collect/a025b27855561036f643c7f1ef768cf3",
    app: {
      name: "DV-portfolio",
      version: "1.0.0",
      environment: "production",
    },

    instrumentations: [
      // Mandatory, omits default instrumentations otherwise.
      ...getWebInstrumentations(),

      // Tracing package to get end-to-end visibility for HTTP requests.
      new TracingInstrumentation(),
    ],
  });
});
