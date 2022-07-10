import * as k8s from '@pulumi/kubernetes'
import * as pulumi from '@pulumi/pulumi'
import { Configuration } from './config'

import namespace from './components/namespace'
import website from './components/website'

export function createKube(config: Configuration, provider?: k8s.Provider) {
  const dependsOn: pulumi.Resource[] = []
  if (!config.hasNamespace) dependsOn.push(namespace(config, provider))
  return [...dependsOn, website(config, provider, dependsOn)]
}
