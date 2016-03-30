how to run docker nodejs and link to redis
===============================================
- docker run --name node --link redis:redis -p 3000:3000 -p 8080:8080 -p 8989:8989 -v /Users/jxymacbook/IdeaProjects/JChat/:/app -it jiangxiaoyong/node /bin/bash
- port 3000: webpack hot reload
- port 8080: nodejs app
- port 8989: nodejs debugger port

