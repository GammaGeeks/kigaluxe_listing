# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=20.15.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}

WORKDIR /kigaluxe-backend

# COPY public/ /KigaliXe_Backend/public
COPY . /kigaluxe-backend


EXPOSE 3000

RUN npm install

CMD ["npm", "start"]
