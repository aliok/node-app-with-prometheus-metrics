var express = require('express'),
    app     = express(),
    morgan  = require('morgan'),
    promClient = require('prom-client');

// don't collect default metrics and pollute prometheus with node memory or cpu usage
// if you would like to see those, uncomment following lines
//
// const collectDefaultMetrics = promClient.collectDefaultMetrics;
// collectDefaultMetrics({ timeout: 5000 });

var gauge = new promClient.Gauge({ name: "foo_gauge", help: "foo_gauge_help" });
promClient.register.registerMetric(gauge);

setInterval(function(){
    gauge.set(Math.ceil(Math.random() * 1000));
}, 1000);

app.use(morgan('combined'));

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.get('/', function (req, res) {
    res.end('<html><body>See what <a href="/metrics"> metrics </a> return.</body></html>');
});

app.get('/metrics', function (req, res) {
    res.set('Content-Type', promClient.register.contentType);
    return res.end(promClient.register.metrics());
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
