# DanskPath — Full Danish Education M1→PD3
# Production Dockerfile — serves frontend + backend in one container
# Fixed v2: Remove danish-platform-db.json copy which fails if file missing — server.js creates it automatically

FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --include=dev
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001

# Copy built files and server — only essential files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/package.json ./package.json

# Only production deps
RUN npm ci --only=production && npm cache clean --force

# Create data dir for persistent DB — server.js will auto-create danish-platform-db.json if missing
RUN mkdir -p /data

EXPOSE 3001

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/api/health || exit 1

CMD ["node", "server.js"]
