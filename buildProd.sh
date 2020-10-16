targetDir=/opt/node-apps/HaenenHome/Kast

service kast stop

npm run build
cp ./server.js $targetDir/server.js
cp -r ./node_modules $targetDir/node_modules

cp ./prod_dist/* $targetDir/dist/

service kast restart