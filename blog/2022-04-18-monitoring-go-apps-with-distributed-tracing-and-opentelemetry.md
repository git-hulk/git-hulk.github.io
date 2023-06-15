---
title: Monitoring Go apps with Distributed Tracing and OpenTelemetry
slug: monitoring-go-apps-with-distributed-tracing-and-opentelemetry
tags: [Uptrace, OpenTelemetry]
author: Vladimir Mihailenco
---

This article gives a brief introduction into monitoring Go applications using OpenTelemetry and Uptrace.

<!--truncate-->

## What is OpenTelemetry?

[OpenTelemetry](https://uptrace.dev/opentelemetry/) is an open source and vendor-neutral API for [distributed tracing](https://uptrace.dev/opentelemetry/distributed-tracing.html) (including logs and errors) and [OpenTelemetry metrics](https://uptrace.dev/opentelemetry/metrics.html).

It specifies how to collect and export telemetry data in a vendor agnostic way. With OpenTelemetry, you can instrument your application once and then add or change vendors without changing the instrumentation, for example, many [open source tracing tools](https://uptrace.dev/blog/distributed-tracing-tools.html) already support OpenTelemetry.

By being vendor-neutral, OpenTelemetry makes it possible to try different products with minimal efforts and avoid being stuck with a vendor forever.

OpenTelemetry also enables different companies to work together on maintaining a single framework instead of duplicating efforts in proprietary projects which benefits everyone. It also means that OpenTelemetry works almost everywhere and you can trace requests across different languages, platforms, and even clouds.

## How to use OpenTelemetry?

The easiest way to get started with OpenTelemetry is to pick an [OpenTelemetry backend](https://uptrace.dev/blog/opentelemetry-backend.html) (vendor) and follow the documentation. Most vendors provide pre-configured OpenTelemetry distros that allow you to skip some steps and can significantly improve your experience.

If you are looking for an open source solution, Jaeger is historically the default choice, but Uptrace provides more features and might be a better choice nowadays.

Uptrace is an [open source APM](https://uptrace.dev/get/open-source-apm.html) for OpenTelemetry that uses ClickHouse database to store traces, metrics, and logs. You can use it to monitor applications and set up automatic alerts to receive notifications via email, Slack, Telegram, and more.

## What is tracing?

[Distributed tracing](https://uptrace.dev/opentelemetry/distributed-tracing.html) allows to observe requests as they propagate through distributed systems, especially those built using a microservices architecture.

Tracing provides insights into your app performance along with any errors and logs. You immediately see what conditions cause errors and how particular error affects app performance.

![image](https://cdn.jsdelivr.net/gh/git-hulk/git-hulk.github.io/images/monitoring/tracing-graph.png)

Using tracing, you can break down requests into [spans](https://uptrace.dev/opentelemetry/distributed-tracing.html#spans). **Span** is an operation (unit of work) your app performs handling a request, for example, a database query or a network call.

**Trace** is a tree of spans that shows the path that a request makes through an app. Root span is the first span in a trace.

![image](https://cdn.jsdelivr.net/gh/git-hulk/git-hulk.github.io/images/monitoring/trace-graph.png)

To learn more about tracing, see [Distributed tracing using OpenTelemetry](https://uptrace.dev/opentelemetry/distributed-tracing.html).

## OpenTelemetry API

OpenTelemetry API is a programming interface that you can use to instrument code to collect telemetry data such as traces, metrics, and logs.

You can create spans using OpenTelemetry API for Go like this:

```go
import "go.opentelemetry.io/otel"

var tracer = otel.Tracer("app_or_package_name")

func someFunc(ctx context.Context) error {
    ctx, span := tracer.Start(ctx, "some-func")
    defer span.End()

    // the code you are measuring

    return nil
}
```

You can also record [attributes](https://uptrace.dev/opentelemetry/distributed-tracing.html#attributes) and errors:

```go
func someFunc(ctx context.Context) error {
    ctx, span := tracer.Start(ctx, "some-func")
    defer span.End()

    if span.IsRecording() {
        span.SetAttributes(
            attribute.Int64("enduser.id", userID),
            attribute.String("enduser.email", userEmail),
        )
    }

    if err := someOtherFunc(ctx); err != nil {
        span.RecordError(err)
        span.SetStatus(codes.Error, err.Error())
    }

    return nil
}
```

See [OpenTelemetry Go API](https://uptrace.dev/opentelemetry/go-tracing.html) for details.

## What is Uptrace?

Uptrace is an [open source APM](https://uptrace.dev/get/open-source-apm.html) with an intuitive query builder, rich dashboards, automatic alerts, and integrations for most languages and frameworks.

Uptrace accepts data from OpenTelemetry and stores it in a ClickHouse database. ClickHouse is a columnar database that is much more efficient for traces and logs than, for example, Elastic Search. On the same hardware, ClickHouse can store 10x more traces and, at the same time, provide much better performance.

You can [install](https://uptrace.dev/get/install.html) Uptrace by downloading a DEB/RPM package or a pre-compiled binary.

![image](https://cdn.jsdelivr.net/gh/git-hulk/git-hulk.github.io/images/monitoring/uptrace.png)

## Metrics monitoring

Uptrace also allows you to monitor metrics using Prometheus-like alerting rules. For example, the following monitor uses the group by node expression to create an alert whenever an individual Redis shard is down:

```yaml
monitors:
  - name: Redis shard is down
    metrics:
      - redis_up as $redis_up
    query:
      - group by cluster # monitor each cluster,
      - group by bdb # each database,
      - group by node # and each shard
      - $redis_up
    min_allowed_value: 1
    # shard should be down for 5 minutes to trigger an alert
    for_duration: 5m
```

You can also create queries with more complex expressions. For example, the following rules create an alert when the keyspace hit rate is lower than 75% or memory fragmentation is too high:

```yaml
monitors:
  - name: Redis read hit rate < 75%
    metrics:
      - redis_keyspace_read_hits as $hits
      - redis_keyspace_read_misses as $misses
    query:
      - group by cluster
      - group by bdb
      - group by node
      - $hits / ($hits + $misses) as hit_rate
    min_allowed_value: 0.75
    for_duration: 5m
```

See [Alerting and Notifications](https://uptrace.dev/get/alerting.html) for details.

## What's next?

Next, you can continue exploring [OpenTelemetry](https://uptrace.dev/opentelemetry/) or start instrumenting your app using popular instrumentations:

- [OpenTelemetry Gin](https://uptrace.dev/get/instrument/opentelemetry-gin.html)
- [OpenTelemetry Go gRPC](https://uptrace.dev/get/instrument/opentelemetry-go-grpc.html)
- [OpenTelemetry database/sql](https://uptrace.dev/get/instrument/opentelemetry-database-sql.html)
- [OpenTelemetry Redis](https://uptrace.dev/get/monitor/opentelemetry-redis.html)
