# Deploying SailCMS

Deploying SailCMS should be a fairly easy process. You must move your files (we recommend not putting your vendor directory in git) and run composer and build your graphql schema cache (if you are using it).

```bash
you@yourhost: composer update
you@yourhost: php sail build:schema
```

## Framework Mode

If you are using SailCMS in Framework Mode, you must add the `--hidecms=1` flag to your `build:schema` command.

```bash
you@yourhost: php sail build:schema --hidecms=1
```

## Serverless
When deploying to AWS Lambda with Bref, run your composer update and build your schema before running your deployment command.