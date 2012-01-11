# Node Deploy Files
## Rich Jones - rich@gun.io
This is a work in progress! Please let me know if I'm doing anything really stupid here.

## Our goal:
 * Run a Node-based front end proxy which proxies to a Node app and either Apache or Nginix, depending on the hostname.
 * Must support WebSockets served from SocketIO.
 * If the node app crashes (which it will), it must restart.
 * Servers must start upon the boot of the machine.
 * It must be secured with SSL. [TODO]

## Tools:
 * Node.js, NPM, Apache or Nginx (duh)
 * Socket.io for WebSockets
 * node-http-proxy (https://github.com/nodejitsu/node-http-proxy)
   - We are choosing this over 'bouncy' because it is slightly faster and there are more examples dealing with SSL, although the API is slightly worse. It's also made by Nodejitsu, who seem knowledgable and responsive.
  * Monit, for monitoring the node applications.

## Files included here:
 * /etc/init.d/YOUR\_APP - an init.d script for your node app.
 * /etc/init.d/http-proxy - an init.d script for your proxy.
 * /var/www/yourapp/proxy.js - the proxy!
 * /var/www/yourapp/server.js - placeholder server code.

## Notes:
    You don't want to run node as root in production.
    Instead, you can run it as a higher port and forward all 8080 traffic to it.
    This seems a little fucked to me - should be changed to just drop permissions
    after starting proxy server.

> #REDIRECT port 80 to 8080
> $IPTABLES -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080

# Sources:
 * http://pau.calepin.co/how-to-deploy-a-nodejs-application-with-monit-nginx-and-bouncy.html
 * http://eastmond.org/blog/?p=45bouncy
 * http://stackoverflow.com/questions/8041792/will-running-node-js-with-apache-causes-too-much-performance-degradation
