# SETUP LOCAL REDIS CLUSTER

mkdir cluster\
cd cluster\
mkdir 6380\
mkdir 6381\
mkdir 6382\
mkdir 6383\
mkdir 6384\
mkdir 6385

For each folder created, created a file called `redis.conf`
Within the file, paste in the code below, change the port based on the folder number.
```
port 6380
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 15000
appendonly yes
```

### Run the Cluster
`redis-cli --cluster create 127.0.0.1:6380 127.0.0.1:6381 127.0.0.1:6382 127.0.0.1:6383 127.0.0.1:6384 127.0.0.1:6385 --cluster-replicas 1`

### Extra Commands

`pkill -KILL redis-server`\
`redis-cli cluster nodes`\
`redis-cli cluster check`\
`ps aux | grep redis-server`\
`redis-cli -p 6380 -c`\
`lsof -i :445`
