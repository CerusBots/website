import * as k8s from '@pulumi/kubernetes'
import * as pulumi from '@pulumi/pulumi'
import { Configuration } from '../config'

export const deployment = (
  config: Configuration,
  provider?: k8s.Provider,
  dependsOn?: pulumi.Resource[]
) =>
  new k8s.apps.v1.Deployment(
    'cerus-website',
    {
      metadata: {
        labels: {
          app: 'cerus-website',
        },
        name: 'cerus-website',
        namespace: config.namespace,
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: {
            app: 'cerus-website',
          },
        },
        template: {
          metadata: {
            labels: {
              app: 'cerus-website',
            },
          },
          spec: {
            containers: [
              {
                image: config.image,
                imagePullPolicy: config.dev ? 'IfNotPresent' : 'Always',
                name: 'cerus-website',
                ports: [{ containerPort: 3000 }],
                readinessProbe: {
                  httpGet: {
                    path: '/',
                    port: 3000,
                  },
                  initialDelaySeconds: 60,
                },
                livenessProbe: {
                  httpGet: {
                    path: '/',
                    port: 3000,
                  },
                  initialDelaySeconds: 60,
                },
                env: [
                  {
                    name: 'SENTRY_DSN',
                    value: config.sentry.dsn,
                  },
                  {
                    name: 'DOMAIN',
                    value: config.domain,
                  },
                  {
                    name: 'ANALYTICS_HOST',
                    value: config.analytics.host,
                  },
                  config.analytics.enable && {
                    name: 'ENABLE_ANALYTICS',
                    value: '1',
                  },
                ].filter(
                  (env) => typeof env !== 'undefined'
                ) as k8s.types.input.core.v1.EnvVar[],
              },
            ],
          },
        },
      },
    },
    { provider, dependsOn }
  )

export const service = (
  config: Configuration,
  provider?: k8s.Provider,
  dependsOn?: pulumi.Resource[]
) =>
  new k8s.core.v1.Service(
    'cerus-website',
    {
      metadata: {
        labels: {
          app: 'cerus-website',
        },
        name: 'cerus-website',
        namespace: config.namespace,
      },
      spec: {
        clusterIP: 'None',
        ports: [{ port: 3000 }],
        selector: {
          app: 'cerus-website',
        },
      },
    },
    {
      dependsOn,
      provider,
    }
  )

export default function webapp(
  config: Configuration,
  provider?: k8s.Provider,
  dependsOn?: pulumi.Resource[]
) {
  dependsOn = dependsOn || []
  const deploymentRes = deployment(config, provider, dependsOn)
  const serviceRes = service(config, provider, [...dependsOn, deploymentRes])
  return [deploymentRes, serviceRes]
}
