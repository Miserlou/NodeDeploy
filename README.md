# Node Deploy Files
## Rich Jones - rich@gun.io
This is a living document! Please let me know if I'm doing anything really stupid here. Patches graciously accepted. [Tutorial form available here.](http://gun.io/blog/tutorial-deploy-node-js-server-with-example/)

## Our goal:
 * Run a Node-based front end proxy which proxies to a Node app and either Apache or Nginix, depending on the hostname.
 * Must support WebSockets served from SocketIO.
 * If the node app crashes (which it will), it must restart.
 * Servers must start upon the boot of the machine.
 * It must be secured with SSL. [TODO]
 * Incoming 80 traffic -> Firewall -> Proxy (8000) -> Node (8080) OR -> Apache (9000)

## Tools:
 * Node.js, NPM, Apache or Nginx (duh)
 * Socket.io for WebSockets
 * node-http-proxy (https://github.com/nodejitsu/node-http-proxy)
   * We are choosing this over 'bouncy' because it is slightly faster and there are more examples dealing with SSL, although the API is slightly worse. It's also made by Nodejitsu, who seem knowledgable and responsive.
 * Monit, for monitoring the node applications.
  * sudo apt-get install monit

## Files included here:
 * /etc/init.d/YOUR\_APP - an init.d script for your node app.
 * /etc/init.d/http-proxy - an init.d script for your proxy.
 * /var/www/yourapp/proxy.js - the proxy!
 * /var/www/yourapp/server.js - placeholder server code.
 * /etc/monit/monitrc - the monit resource for checking our server health

## Notes:
You don't want to run node as root in production. Instead, you can run it as a higher port and forward all 8080 traffic to it. This seems a little fucked to me - should be changed to just drop permissions after starting proxy server.

\# REDIRECT port 80 to 8000
$IPTABLES -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8000

## Sources:
 * http://pau.calepin.co/how-to-deploy-a-nodejs-application-with-monit-nginx-and-bouncy.html
 * http://eastmond.org/blog/?p=45bouncy
 * http://stackoverflow.com/questions/8041792/will-running-node-js-with-apache-causes-too-much-performance-degradation
