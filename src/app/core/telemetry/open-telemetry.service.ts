// // src/app/core/telemetry/open-telemetry.service.ts

// import { Injectable } from '@angular/core';
// import { defaultResource, resourceFromAttributes } from '@opentelemetry/resources';
// import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
// import { ConsoleSpanExporter, SimpleSpanProcessor, BatchSpanProcessor, SpanExporter } from '@opentelemetry/sdk-trace-base';
// import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
// import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
// import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
// import { UserInteractionInstrumentation } from '@opentelemetry/instrumentation-user-interaction';
// import { registerInstrumentations } from '@opentelemetry/instrumentation';
// import { environment } from '../../../environments/environment';
// import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

// @Injectable({ providedIn: 'root' })
// export class OpenTelemetryService {
//   constructor() {
//     this.initializeOpenTelemetry();
//   }

//   private initializeOpenTelemetry(): void {
//     const resource = defaultResource().merge(
//       resourceFromAttributes({
//         [ATTR_SERVICE_NAME]: 'booking-frontend',
//       })
//     );

//     const spanProcessors = [];

//     spanProcessors.push( new SimpleSpanProcessor(new ConsoleSpanExporter()));
//     spanProcessors.push(
//         new BatchSpanProcessor(
//         new OTLPTraceExporter({
//             url: '/v1/traces'
//         }),
//     )
//     )
   
    
//     if (!environment.production) {
//       spanProcessors.push(
//         new BatchSpanProcessor(new ConsoleSpanExporter() as unknown as SpanExporter)
//       );
//     }

//     const provider = new WebTracerProvider({resource, spanProcessors: spanProcessors});
//     provider.register();

//     registerInstrumentations({
//       instrumentations: [
//         new FetchInstrumentation({ propagateTraceHeaderCorsUrls: /.*/ }),
//         new XMLHttpRequestInstrumentation(),
//         new UserInteractionInstrumentation(),
//       ],
//     });
//   }
// }