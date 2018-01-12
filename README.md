Deploy:
---------


```
git clone <this repo>
oc project <project-that-aerogear's-configured-prometheus-is-running>
oc new-app -f openshift-template.json
```


Random value for a gauge is set every second. This means, when Prometheus requests "/metrics" every 5 seconds,
it will get a different value every time.

Name of that gauge is `foo_gauge`.

The annotation `"org.aerogear.metrics/plain_endpoint": "/metrics"` is set on the service resource. That means,
Prometheus instance that is configured using AeroGear's metrics APB, <https://github.com/aerogearcatalog/metrics-apb>,
will discover this example service immediately and start scraping it.

Morgan is enabled in the project for access logging. So, you can see something in the logs when Prometheus makes a 
request to metrics endpoint. 