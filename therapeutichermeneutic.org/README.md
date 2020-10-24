# express-node web site
A basic HTML site built with the [Boostrap](https://getbootstrap.com/) toolkit. This site can be run independently of the nginx server using either node or node-within-docker.  Pages are delivered with node.js and Express.  Can be used without Docker if npm and node are installed.  If node and npm are not installed on the host, then can be used with a docker image built on node:alpine.  

Includes a module /app/groxlog.js which uses core node functionality to write to a log file on the host machine.

## start with node.js
* node index

## start with npm
* npm start

## Using docker
* docker build -t bootstrap-001 .
* docker run -it -d -p 8181:8181 bootstrap-001
