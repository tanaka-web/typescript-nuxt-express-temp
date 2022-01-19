# app

## Build Setup (development)

```bash
$ cd app

# set .env
$ cp .env.example .env
```

```bash
$ cd docker

# launch environment for develop
# localhost:3000 -> application 
# localhost:9000 -> minio (s3)
$ docker-compose up
```

```bash
# create db schema
$ docker exec -it app bash
$ npx prisma db pull
$ npx prisma generate
```

## local s3(minio)
```
localhost:9000

login
username: minio
password: miniosecret

setup
1. buckets へ移動
2. static の Manage へ
3. Access Policy を public に変更
```


## code formatting
```bash
$ cd app

## check lint
$ yarn lint

## auto fix lint
$ yarn lint:fix
```
