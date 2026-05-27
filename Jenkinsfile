pipeline {
    agent any

    environment {
        EC2_IP = '15.206.158.93'
        FRONTEND_DIR = '/var/www/frontend'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Pulling frontend code from GitHub...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm packages...'
                bat 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                echo 'Building React app...'
                bat 'npm run build'
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo 'Deploying frontend to EC2...'
                withCredentials([sshUserPrivateKey(
                    credentialsId: 'ec2-ssh-key',
                    keyFileVariable: 'SSH_KEY',
                    usernameVariable: 'SSH_USER'
                )]) {
                    bat """
                        copy "%SSH_KEY%" "%WORKSPACE%\\ec2_key.pem"
                        icacls "%WORKSPACE%\\ec2_key.pem" /inheritance:r /grant:r "%USERNAME%:R"
                        ssh -o StrictHostKeyChecking=no -i "%WORKSPACE%\\ec2_key.pem" ubuntu@15.206.158.93 "sudo rm -rf /var/www/frontend/*"
                        scp -o StrictHostKeyChecking=no -i "%WORKSPACE%\\ec2_key.pem" -r dist/* ubuntu@15.206.158.93:/var/www/frontend/
                        ssh -o StrictHostKeyChecking=no -i "%WORKSPACE%\\ec2_key.pem" ubuntu@15.206.158.93 "sudo chown -R www-data:www-data /var/www/frontend && sudo systemctl restart nginx"
                        del "%WORKSPACE%\\ec2_key.pem"
                    """
                }
            }
        }
    }

    post {
        success {
            echo '✅ Frontend deployed successfully!'
            echo '🌍 Live at http://hybridworks.dqubeh.in'
        }
        failure {
            echo '❌ Frontend deployment failed!'
        }
    }
}