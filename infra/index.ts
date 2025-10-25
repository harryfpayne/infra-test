import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";

const api_service = new digitalocean.App("api-service", {spec: {
    name: "api-service",
    region: digitalocean.Region.LON1,
    services: [{
      name: "api-service",
      instanceCount: 1,
      instanceSizeSlug: "apps-s-1vcpu-1gb",
      git: {
        repoCloneUrl: "https://github.com/digitalocean/sample-golang.git",
        branch: "main",
      },
    }],
  }});
