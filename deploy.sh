#! /bin/bash
server='ark@192.168.1.203'
path='/ps_new/ark/service/www/ic'
password='ark2016'

npm run build && sshpass -p $password rsync -avz ./ $server:$path --exclude 'node_modules' --progress && sshpass -p $password rsync -avzhe ssh ./dist/index.html $server:$path
