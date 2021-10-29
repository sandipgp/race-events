FROM node:14-alpine AS development
ENV NODE_ENV development
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
# Expose port
EXPOSE 3001
# Start the app
CMD [ "yarn", "start" ]