// @ts-nocheck
import health from 'grpc-health-check';

const statusMap = {
  "": proto.grpc.health.v1.HealthCheckResponse.ServingStatus.SERVING,
};

let healthImpl = new health.Implementation(statusMap);

export default {
  service: health.service,
  implementation: healthImpl,
};
