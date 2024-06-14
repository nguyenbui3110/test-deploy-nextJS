FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN  npm install --force

FROM node:20-alpine as builder

ARG NEXT_PUBLIC_BACKEND_API_URL
ARG NEXT_PUBLIC_CLIENT_GOOGLE_ID

ENV NEXT_PUBLIC_BACKEND_API_URL=https://culture-stay-api.whitemage.fun
ENV NEXT_PUBLIC_CLIENT_GOOGLE_ID=486089736533-02ujmkoe4o2qfa8e5fdne829bjrmt5n1.apps.googleusercontent.com

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine as runner

WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]
