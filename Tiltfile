load('ext://deployment', 'deployment_create')
load('ext://restart_process', 'docker_build_with_restart')

docker_build_with_restart('ghcr.io/cerusbots/website', '.', 'npm run dev', dockerfile='./Dockerfile.dev', live_update=[
  sync('.', '/usr/src/server'),
  run('npm i', trigger='package.json'),
], extra_tag='master')

k8s_yaml('./kube/deploy.yml')
k8s_yaml('./kube/service.yml')

k8s_resource(workload='cerus-website', labels=['cerus-frontend'], port_forwards=3000)