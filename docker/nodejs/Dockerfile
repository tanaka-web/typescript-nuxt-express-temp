FROM node:14-buster-slim

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

RUN apt-get update && \
apt-get install -y vim less procps libssl-dev curl

RUN mkdir /srv/app && chown -R nodejs:nodejs /srv
WORKDIR /srv/app
USER node
EXPOSE 3000