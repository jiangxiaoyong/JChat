FROM node:argon

RUN npm install --global gulp
RUN npm install --global webpack
RUN npm install --global webpack-dev-server

# app main entry port for production
EXPOSE 80

# app main entry port for development
EXPOSE 8080

# debug port
EXPOSE 8989

# webpack hot reload port
EXPOSE 3000
