load('ext://pulumi', 'pulumi_resource')

update_settings(k8s_upsert_timeout_secs=600)

docker_build('ghcr.io/cerusbots/website:latest', '.', dockerfile='./Dockerfile.dev', live_update=[
  sync('.', '/usr/src/server'),
  run('npm i', trigger='package.json'),
], extra_tag='master')

pulumi_resource('cerus-website', stack='CerusBots/website/dev', dir='deploy/pulumi', image_deps=['ghcr.io/cerusbots/website:latest'], image_configs=['image'], labels=['cerus'], port_forwards=['8083:3000'])