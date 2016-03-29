** how to run docker nodejs **
docker run --name node --link redis:redis -p 3000:3000 -p 8080:8080 -p 8989:8989 -v /Users/jxymacbook/IdeaProjects/JChat/:/app -it jiangxiaoyong/node /bin/bash

