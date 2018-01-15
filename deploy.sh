#! /bin/bash
server='ark@192.168.1.151'
path='/home/ark/service/www/ark'
password='ark2016'

sshpass -p $password ssh $server "cd $path && rm -rf *"
scp -Cr ./dist/** $server:$path
