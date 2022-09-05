node {
  stage('========== Clone repository ==========') {
    checkout scm
  }
  stage('========== Build image ==========') {
    app = docker.build("hyeongin2024/aegis-client:${env.BUILD_NUMBER}", "--network=host ./")
  }
  stage('========== Push image ==========') {
    docker.withRegistry('https://registry.hub.docker.com', 'docker_hub') {
      app.push()
      app.push("latest")
    }
  }
}
