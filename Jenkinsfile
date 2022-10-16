node {
  stage('========== Clone repository ==========') {
    checkout scm
  }
  stage('========== Build image ==========') {
    app = docker.build("hyeongin2024/aegis-client", "--network=host ./")
  }
  stage('========== Push image ==========') {
    docker.withRegistry('https://registry.hub.docker.com', 'docker_hub') {
      app.push("${env.BUILD_NUMBER}")
      app.push("latest")
    }
    sh '''docker rmi -f  $(docker images -q --filter 'reference=*/hyeongin2024/*')'''
  }
  stage('========== Update manifest file ==========') {
    withCredentials([gitUsernamePassword(credentialsId:'github', gitToolName:'git-tool')]){
      sh "git clone https://github.com/Hin1209/aegis-manifest.git"
      dir('aegis-manifest') {
        sh "sed -i 's/aegis-client:.*/aegis-client:${env.BUILD_NUMBER}/g' aegis.yaml"
        sh "git add aegis.yaml"
        sh "git commit -m 'fix: change docker image'"
        sh "git push origin main"
      }
      sh "rm -rf aegis-manifest"
    }
  }
}
