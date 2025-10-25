import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";

const api_service = new digitalocean.App("api-service", {spec: {
    name: "api-service",
    region: digitalocean.Region.LON1,
    services: [{
      name: "api-service",
      instanceCount: 1,
      instanceSizeSlug: "apps-s-1vcpu-1gb",
      github: {
        repo: "harryfpayne/infra-test",
        branch: "main",
        deployOnPush: true,
      },
      sourceDir: "services/api",
      dockerfilePath: "services/api/Dockerfile",
      httpPort: 8080,
    }]
  }});

const pug_service = new digitalocean.App("pug-service", {spec: {
    name: "pug-service",
    region: digitalocean.Region.LON1,
    services: [{
      name: "pug-site",
      instanceCount: 1,
      instanceSizeSlug: "apps-s-1vcpu-1gb",
      github: {
        repo: "harryfpayne/infra-test",
        branch: "main",
        deployOnPush: true,
      },
      sourceDir: "services/pug-site",
      dockerfilePath: "services/pug-site/Dockerfile",
      httpPort: 8888,
    }]
  }});
