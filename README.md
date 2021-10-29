# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

yarn install => To install dependencies
yarn start => To start an application
yarn test  => To run test cases

For Docker: 

docker build -t race-events:dev .  => To build docker image

docker run -it --rm \
-v ${PWD}:/app \
-v /app/node_modules \
-p 3001:3000 \
-e CHOKIDAR_USEPOLLING=true \
race-events:dev                   => To run the application on interactive mode at port


