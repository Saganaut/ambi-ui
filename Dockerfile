FROM node:24-alpine AS build

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY .storybook ./.storybook
COPY src ./src
COPY vite.config.ts tsconfig.json ./

RUN pnpm build-storybook --output-dir /app/storybook-static

FROM nginx:1.29-alpine

COPY --from=build /app/storybook-static /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/ || exit 1
