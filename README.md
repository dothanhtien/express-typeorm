# Express Typescript TypeORM

## I. ENV template
```
NODE_ENV="development"
PORT=8080

DEV_DB_PORT="localhost"
DEV_DB_PORT=3306
DEV_DB_USERNAME="root"
DEV_DB_PASSWORD="password"
DEV_DB_DATABASE="database_name"
```
## II. Scripts
### 1. Generate migration
`yarn typeorm migration:generate ./src/database/migrations/<migrationFileName> -d ./src/database/app-data-source.ts`

