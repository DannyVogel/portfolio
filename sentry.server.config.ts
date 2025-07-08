import * as Sentry from "@sentry/nuxt";
 
Sentry.init({
  dsn: "https://cff48a36be133f6c30c9e0af9f46ac9e@o4509635043196928.ingest.de.sentry.io/4509635046015056",

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
  
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
