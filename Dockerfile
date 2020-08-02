# copy .env.dev to root directory and src directory(for migrations)
# remove the .env from the src
FROM keymetrics/pm2:12-alpine

# Bundle APP files
COPY src src/
COPY __tests__ __tests__/
COPY package.json .
COPY yarn.lock .
COPY pm2.json .
COPY jest.config.json .
COPY jest.setup.js .
COPY .eslintrc.js .

# Copy the entry point for handle migrations
COPY docker-entrypoint.sh .

# Install app dependencies
RUN yarn install

# Run lint
RUN yarn lint

# Run Tests
RUN yarn test


CMD [ "pm2-runtime", "start", "pm2.json" ]

ENTRYPOINT [ "docker-entrypoint.sh" ]