---
title: Monitoring Go apps with Distributed Tracing and OpenTelemetry
slug: monitoring-go-apps-with-distributed-tracing-and-opentelemetry 
tags: [Uptrace, OpenTelemetry]
author: Vladimir Mihailenco
---

## What is tracing?

[Distributed tracing](https://opentelemetry.uptrace.dev/guide/distributed-tracing.html) allows to
observe requests as they propagate through distributed systems, especially those built using a
microservices architecture.

<!--truncate-->


Tracing provides insights into your app performance along with any errors and logs. You immediately
see what conditions cause errors and how particular error affects app performance.

![Uptrace tracing tool](https://get.uptrace.dev/opentelemetry-and-uptrace/tracing-graph.png)

Using tracing, you can break down requests into [spans](https://opentelemetry.uptrace.dev/guide/distributed-tracing.html#spans). **Span** is an
operation (unit of work) your app performs handling a request, for example, a database query or a
network call.

**Trace** is a tree of spans that shows the path that a request makes through an app. Root span is
the first span in a trace.

![Uptrace tracing tool](https://get.uptrace.dev/opentelemetry-and-uptrace/trace-graph.png)

To learn more about tracing, see [Distributed tracing using OpenTelemetry](https://opentelemetry.uptrace.dev/guide/distributed-tracing.html).

## What is OpenTelemetry?

[OpenTelemetry](https://opentelemetry.uptrace.dev/) is an open source and vendor-neutral API for [distributed tracing](https://opentelemetry.uptrace.dev/guide/distributed-tracing.html) (including
logs and errors) and [metrics](https://opentelemetry.uptrace.dev/guide/metrics.html).

It specifies how to collect and export telemetry data in a vendor agnostic way. With OpenTelemetry,
you can [instrument](https://opentelemetry.uptrace.dev/instrumentations/) your application once and
then add or change vendors without changing the instrumentation, for example, many [open source tracing tools](https://get.uptrace.dev/compare/distributed-tracing-tools.html) already
support OpenTelemetry.

## How to use OpenTelemetry?

OpenTelemetry is available for most programming languages and provides interoperability across
different languages and environments.

You can [get started with OpenTelemetry](https://opentelemetry.uptrace.dev/) by following these 5
steps:

- **Step 1**. Install a [distributed tracing tool](https://get.uptrace.dev/compare/distributed-tracing-tools.html).
  
- **Step 2**. Browse [OpenTelemetry instrumentations](https://opentelemetry.uptrace.dev/instrumentations/) to find
  examples for your framework and libraries.
  
- **Step 3**. [Configure](https://docs.uptrace.dev/#getting-started) OpenTelemetry SDK to export
  telemetry data to the tracing tool.
  
- **Step 4**. Learn about [OpenTelemetry Tracing API](https://opentelemetry.uptrace.dev/guide/distributed-tracing.html#what-s-next) for your programming language to create custom instrumentations.
  
- **Step 5**. Install [OpenTelemetry Collector](https://opentelemetry.uptrace.dev/guide/collector.html) to gather [infrastructure metrics](https://opentelemetry.uptrace.dev/guide/collector.html#host-metrics).
  

## OpenTelemetry Go API

You can create spans using [OpenTelemetry Go API](https://opentelemetry.uptrace.dev/guide/go-tracing.html) like this:

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

You can also record [attributes](https://opentelemetry.uptrace.dev/guide/distributed-tracing.html#attributes) and
errors:

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

## What is Uptrace?

[Uptrace](https://uptrace.dev/) is an [open source DataDog competitor](https://get.uptrace.dev/compare/datadog-competitors.html) with an
intuitive query builder, rich dashboards, automatic alerts, and integrations for most languages and
frameworks.

Uptrace accepts data from OpenTelemetry and stores it in a ClickHouse database. ClickHouse is a
columnar database that is much more efficient for traces and logs than, for example, Elastic Search.
On the same hardware, ClickHouse can store 10x more traces and, at the same time, provide much
better performance.

You can [install](https://get.uptrace.dev/guide/opentelemetry-tracing-tool.html) Uptrace by
downloading a DEB/RPM package or a pre-compiled binary.

![Uptrace tracing tool](https://get.uptrace.dev/opentelemetry-and-uptrace/uptrace.png)

## What's next?

Next, you can continue exploring [OpenTelemetry](https://opentelemetry.uptrace.dev) or start
instrumenting your app using popular instrumentations:

- [OpenTelemetry guide for Gin and GORM](https://get.uptrace.dev/opentelemetry/gin-gorm.html)
- [gRPC OpenTelemetry](https://opentelemetry.uptrace.dev/instrumentations/go-grpc.html)
- [Golang ORM OpenTelemetry](https://bun.uptrace.dev/guide/performance-monitoring.html)
- [Go Redis OpenTelemetry](https://redis.uptrace.dev/guide/go-redis-monitoring.html)
- [Zap OpenTelemetry](https://opentelemetry.uptrace.dev/instrumentations/go-zap.html)
