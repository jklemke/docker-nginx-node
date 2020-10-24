# docker-nginx-node

A docker-compose project with these servers:
  * webserver -- an nginx reverse proxy, TLS server
  * therapeutichermeneutic.org -- an express-node webserver (change to your own domain name)
  * certbot -- the certbot utility, which talks to letsencrypt.org to automate the process of obtaining and renewing HTTPS certificates
  
This project is based on an excellent [Digital Ocean tutorial](https://www.digitalocean.com/community/tutorials/how-to-secure-a-containerized-node-js-application-with-nginx-let-s-encrypt-and-docker-compose) by Kathleen Juell, so go there for details.

## Notes
* change all occurrences of therapeutichermeneutic.org or theraherm to your own domain name
* mkdir dhparam, and create your own TLS certificate

      sudo openssl dhparam -out ~/yourproject/dhparam/example-dhparam-2048.pem 2048
* the certbot_renew.sh script is set to perform a "dry run". In order to perform an actual renewal change this line

      $COMPOSE run certbot renew --dry-run && $COMPOSE kill -s SIGHUP webserver
  to this
  
      $COMPOSE run certbot renew && $COMPOSE kill -s SIGHUP webserver
* setup a cron job to run certbot_renew.sh at regular intervals (e.g. weekly)
