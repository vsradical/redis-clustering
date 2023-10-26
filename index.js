import express from 'express'
const app = express()
import Redis from 'ioredis'

const redisNodes = [
  { port: 6380, host: '127.0.0.1'},
  { port: 6381, host: '127.0.0.1'},
  { port: 6382, host: '127.0.0.1'},
  { port: 6383, host: '127.0.0.1'},
  { port: 6384, host: '127.0.0.1'},
  { port: 6385, host: '127.0.0.1'}
]

const redisCluster = new Redis.Cluster(redisNodes)

app.listen(3001, async () => {
  console.log(`server running on port ${3001}`)
  
  redisNodes.forEach(async node => {
    console.log(node)
    const client = await new Redis(node.port, node.host);
    client.config("SET", "notify-keyspace-events", "Ex")
  
    // Use the 'psubscribe' method to listen for expiration events across all databases
    await client.psubscribe('__keyevent@*__:expired');
  
    client.on('pmessage', (pattern, channel, expiredKey) => {
      console.log(`Key ${expiredKey} has expired on ${node.host}:${node.port}`);
    });
  });

  for (let i = 0; i < 10; i++) {
    await redisCluster.set(`test_key-${i}`, `value-${i}`, 'EX', i+1);
  }
  
})