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
    withCredentials([gitUsernamePassword(credentialsId: 'github', gitToolName: 'git-tool')]){
        sh "git config --global user.name 'Hin1209'"
        sh "git config --global user.email 'hyeongin2024@gmail.com'"
        sh "git clone https://github.com/Hin1209/aegis-manifest.git"
        sh "sed -i 's/hyeongin2024/aegis-client:.*\$hyeongin2024/aegis-client:${env.BUILD_NUMBER}/g' aegis-client/aegis.yaml"
        sh "git add aegis-client/aegis.yaml"
        sh "git commit -m 'fix: change docker image'"
        sh "git push origin main"
    }
  }
}
