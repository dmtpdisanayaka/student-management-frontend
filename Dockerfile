FROM node:20-slim

WORKDIR /app

COPY . .

RUN npm install -g pnpm
RUN pnpm install

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]