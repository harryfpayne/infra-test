import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";

const postgres_db = new digitalocean.DatabaseCluster("postgres-db", {
  name: "postgres-cluster",
  engine: "pg",
  version: "17",
  size: digitalocean.DatabaseSlug.DB_1VPCU1GB,
  region: digitalocean.Region.LON1,
  nodeCount: 1,
});

const postgres_user = new digitalocean.DatabaseUser("db-user", {
  clusterId: postgres_db.id,
  name: "harry"
})

const db = new digitalocean.DatabaseDb("database-example", {
  clusterId: postgres_db.id,
  name: "paace",
});

const dbConnection = pulumi.interpolate`postgres://${postgres_user.name}:${postgres_user.password}@${postgres_db.host}:${postgres_db.port}/${db.name}`;
const env = {
  DB_USER: postgres_user.name,
  DB_PASSWORD: postgres_user.password,
  DB_HOST: postgres_db.host,
  DB_PORT: postgres_db.port.apply(v => v.toString()),
  DB_CONNECTION: dbConnection
}


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
    }],
    envs: Object.entries(env).map(([key, value]) => ({
      key: key,
      value: value
    }))
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

export const DB_CONNECTION = dbConnection;
