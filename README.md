Running instructions
===============================================

Overview
-----------------------------------------------
It's an real-time chatting web app, that supporting chatting between multiple friends, adding friends, storing chatting history and caching offline message. [let's play](http://www.jchatting.com)

Here is [my post](https://jiangxiaoyong.github.io/portfolio/jchat/) about this project, which includes project architecture, design and summary

Set up Docker for Running Environment
-----------------------------------------------
- Download official docker image from docker hub
```
$ docker pull node
$ docker pull redis
$ docker pull mongo
```
- Run mongodb container
```
$ docker run --name mongodb --expose 27017 -p 27017:27017 -d mongo
```
- Run redis container
```
$ docker run --name redis --expose 6379 -p 6379:6379 -d redis
```
- Run docker nodejs and link to redis and mongodb
```
$ docker run -it --name node --link redis:redis --link mongodb:mongodb -p 3000:3000 -p 8080:8080 -p 8989:8989 -v /path/to/your/working/directory/:/app -d node
```
- port 3000: webpack hot reload
- port 8080: nodejs app
- port 8989: nodejs debugger port
- note your node container ID by running `docker ps -a` then run command `docker exec -it <container ID> /bin/bash` (on Mac) to go inside the node container
- install webpack globally `npm install webpack -g` at the root of the node container
- change listening port 80 in file app.js at line 46 to 8080 for development environment
- run `webpack` from /app to build module bundle
- run `npm install` from /app folder to install all model dependencies
- run 'npm start' from /app folder to run node app
- done! Now you are browse to `http://localhost:8080` to sign up JChat anc start to chat with your friends!

Set up WebPack for Development Environment
------------------------------------------------
- install WebPack Development Server in the node container
```
npm install webpack-dev-server -g
```
- uncomment lines marked as `uncomment` in webpack config file
- run WebPack development server in the node container to start hot reload
```
webpack-dev-server --hot --inline
```
- run node server by opening another docker machine while running WebPack dev server
- done

MongoDB command
================================================
- add new fields if the specified field does not exist
```
db.users.update( {"_id": ObjectId("56fd8b59226076750236d579")}, { $set : {"friendList" :[ {"id": '', "chID": '', 'userName':'mike', 'userStatus':'online', 'imgSrc':'/images/avatar.ico'}]}})
```

debug mode of nodeJS
================================================
- node --debug=8989 app.js
