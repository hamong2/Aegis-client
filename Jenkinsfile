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
    step {
        git credentialsId: 'github',
        url: 'https://github.com/Hin1209/aegis-manifest.git',
        branch: 'main'
        sh "git clone https://github.com/Hin1209/aegis-manifest.git"
        sh "sed -i 's/hyeongin2024/aegis-client:.*\$hyeongin2024/aegis-client:${env.BUILD_NUMBER}/g' aegis-client/aegis.yaml"
        sh "git add aegis-client/aegis.yaml"
        sh "git remote add origin https://github.com/Hin1209/aegis-manifest.git"
        sh "git push origin main"
    }
    post {
        failure {
            echo "K8S Manifest Update failure!"
        }
        success {
            echo "K8S Manifest Update success!"
        }
    }
  }
}
