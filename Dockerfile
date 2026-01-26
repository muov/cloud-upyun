FROM node:22

# install vscode and extension
RUN curl -fsSL https://code-server.dev/install.sh | sh \
    && code-server --install-extension ms-vscode.vscode-typescript-next \
    && code-server --install-extension cnbcool.cnb-welcome \
    && code-server --install-extension esbenp.prettier-vscode \
    && code-server --install-extension dbaeumer.vscode-eslint \
    && code-server --install-extension formulahendry.code-runner \
    && code-server --install-extension christian-kohler.npm-intellisense \
    && code-server --install-extension eg2.vscode-npm-script \
    && code-server --install-extension tencent-cloud.coding-copilot \
    && code-server --install-extension redjue.git-commit-plugin \
    && code-server --install-extension MS-CEINTL.vscode-language-pack-zh-hans

RUN apt-get update && \
    apt-get install -y wget unzip lsof nload htop net-tools dnsutils openssh-server && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN npm i -g pnpm

# Set Node.js development environment variables
ENV NODE_ENV=development
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_PROGRESS=false 