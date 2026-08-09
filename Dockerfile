FROM node:20-bookworm-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends git ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 8081 19000 19001

ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
ENV CHOKIDAR_USEPOLLING=1
ENV CI=0

CMD ["npx", "expo", "start", "--lan", "--port", "8081", "--clear"]
