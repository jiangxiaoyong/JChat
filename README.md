how to run docker nodejs and link to redis
===============================================
- docker run -it --name node --link redis:redis --link mongodb:mongodb -p 3000:3000 -p 80:80 -p 8989:8989 -v /Users/jxymacbook/IdeaProjects/JChat/:/app -d jiangxiaoyong/node
- port 3000: webpack hot reload
- port 8080: nodejs app
- port 8989: nodejs debugger port

MongoDB command
================================================
**add new fields if the specified field does not exiest**
- db.users.update( {"_id": ObjectId("56fd8b59226076750236d579")}, { $set : {"friendList" :[ {"id": '', "chID": '', 'userName':'mike', 'userStatus':'online', 'imgSrc':'/images/avatar.ico'}]}})

debug mode of nodeJS
================================================
- node --debug=8989 app.js
