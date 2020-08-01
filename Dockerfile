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

# Install app dependencies
RUN yarn install

# Run migrations
RUN yarn installation

# Run Tests
RUN yarn test

# Show current folder structure in logs
RUN ls -al -R

CMD [ "pm2-runtime", "start", "pm2.json" ]