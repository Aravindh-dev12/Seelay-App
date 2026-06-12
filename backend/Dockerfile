FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY packages ./packages
COPY apps/api/package.json ./apps/api/package.json
RUN npm install

FROM deps AS build
COPY apps/api ./apps/api
RUN npm --workspace @qanbie/shared run build && npm --workspace @qanbie/api run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/packages ./packages
COPY --from=build /app/apps/api ./apps/api
CMD ["node", "apps/api/dist/index.js"]
