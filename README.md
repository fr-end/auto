##Install source code version

git clone https://github.com/fr-end/auto.git

cd auto

npm install

if you want to #install mongoDB locally

download and install mongoDB from https://www.mongodb.org/downloads

Run server from the terminal using the "mongod" command.
If mongod command is not available from your terminal add the default path
"C:\Program Files\MongoDB\Server\3.0\bin" to your PATH variable on Windows.
If there are some troubles - google it :)

Successful output might be like "waiting for connections on port 27017"

##Run

gulp

##Test

After Install and Run you can see our project at http://localhost:8080/

##Notes

by evgen zhukov:
"flow работы с репозиторием.
в мастер не пушим.
под таску делаем свою ветку.
дальше своя ветка пул риквестом мерджится в девелоп, если таска прошла код ревью и потом удаляется.
с девелопа выкатываем боевой код =)"

API:
https://github.com/ria-com/auto-ria-rest-api

##plans

add publish/subscribe functions http://davidwalsh.name/pubsub-javascript

add bower for project if needed http://bower.io/

Gulp + Browserify doc:
http://frontender.info/gulp-browserify-starter-faq/

##npm install

npm install frend-auto

cd node_modules/frend-auto
