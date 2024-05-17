FROM redis:latest

ARG REDIS_PASSWORD
ENV REDIS_PASSWORD=${REDIS_PASSWORD}

RUN mkdir -p /usr/local/etc/redis

COPY redis.conf /usr/local/etc/redis/redis.conf

RUN echo "requirepass ${REDIS_PASSWORD}" >> /usr/local/etc/redis/redis.conf

CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]
