# Use the official Redis image from the Docker Hub
FROM redis:latest

# Set environment variables
ARG REDIS_PASSWORD
ENV REDIS_PASSWORD=${REDIS_PASSWORD}

# Create the directory for Redis configuration if it doesn't exist
RUN mkdir -p /usr/local/etc/redis

# Copy the custom Redis configuration file into the container
COPY redis.conf /usr/local/etc/redis/redis.conf

# Modify the configuration file to include the password
RUN echo "requirepass ${REDIS_PASSWORD}" >> /usr/local/etc/redis/redis.conf

# Command to run Redis server with the custom configuration
CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]
