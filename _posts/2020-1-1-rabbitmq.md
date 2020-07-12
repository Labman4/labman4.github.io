# rabbitmq
集群和主题模式
<!-- more -->
​rabbitmq 通过同步erlang集群各节点的cookie，共享metadata实现集群 天生的分布式

metadata包括

a.队列元数据：队列名称和它的属性；
 b.交换器元数据：交换器名称、类型和属性；
 c.绑定元数据：一张简单的表格展示了如何将消息路由到队列；
 d.vhost元数据：为vhost内的队列、交换器和绑定提供命名空间和安全属性；

原生连接 ，

连接工厂创建，工厂创建连接，连接创建信道,信道创建消息，设定分发模式，属性，发送消息，关闭信道。关闭连接

```java
ConnectionFactory factory=new ConnectionFactory();
factory.setHost("ip");
factory.setPort("port");
factory.setUsername("");
factory.setPassword("");
factory.setVirtualHost("/?");
Connection connection =factory.newConnection();
Channel channel=connection.createChannel();
```



```jave
// 绑定队列
channel.queueDeclare(QUEUE_NAME,durable,exclusive,auto_delete,null);
//绑定交换机
channel.exchangeDeclare(EXCHANGE_NAME,BuiltExchangeType.TOPIC/DIRECT/FANOUT)
String queueName =channel.queueDeclare().getQueue();
String routingKey ="";
channel.queueBind(queueName,EXCHANGE_NAME,routingKey);
channel.basicPublic(EXCHAGE_NAME,routingKey,null,message.getBytes("UTF-8"))
	   

```

```java
// 获取消息
DeliverCallback deliverCallback = (consumerTag, delivery) -> {
    String message = new String(delivery.getBody(), "UTF-8");
});
channel.basicConsume(QUEUE_NAME, true, deliverCallback, consumerTag -> {});
```



## 工作模式

### 	轮询

​			你一个我一个

### 	公平分发

```java
/*
 prefetchCount=n
 限制 RabbitMQ 只发不超过 n 条的消息给同一个消费者。
 当消息处理完毕后，有了反馈，才会进行第二次发送。
 */

channel.basicQos(prefetchCount);
DeliverCallback deliverCallback = (consumerTag, delivery) -> {
 String message = new String(delivery.getBody(), "UTF-8");
}
channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
// 监听队列
 /*
 autoAck = true 代表自动确认消息
 autoAck = false 代表手动确认消息
 */
 boolean autoAck = false;
channel.basicConsume(QUEUE_NAME, autoAck, deliverCallback, consumerTag -> {
 });
```

## 订阅模式

生产者

```java
channel.exchangeDeclare(EXCHANGE_NAME,BuiltinExchangeType.FANOUT);
channel.basicPublish(EXCHANGE_NAME, "", null,message.getBytes("UTF-8"));
```

消费者

```java
channel.exchangeDeclare(EXCHANGE_NAME, BuiltinExchangeType.FANOUT);
String queueName = channel.queueDeclare().getQueue();
channel.queueBind(queueName, EXCHANGE_NAME, "");
```

## 

## 主题模式

routing key 中可以存在两种特殊字符“*”与“#”，用于做模糊匹配，其中 “*”用于匹配一个单词，“#”用于匹配多个单词（可以是零个）

## 路由模式

```java
channel.exchangeDeclare(EXCHANGE_NAME,BuiltinExchangeType.DIRECT);
channel.basicPublish(EXCHANGE_NAME, routingKey, null,message.getBytes("UTF-8"));
```

```java
channel.exchangeDeclare(EXCHANGE_NAME, BuiltinExchangeType.DIRECT);
String queueName = channel.queueDeclare().getQueue();
channel.queueBind(queueName, EXCHANGE_NAME, routingKey);
```

路由和主题模式的不同表现在于routingkey匹配方法

##  Rpc 

消息发送时附消息属性

​	replyto： queue 处理完成后通知（随附correlationId）发送到这个queue

​	correlationId  标识号 处理完成将标识号返回，据此判断执行情况

```java
channel.queueDeclare(RPC_QUEUE_NAME, false, false, false,null);
channel.queuePurge(RPC_QUEUE_NAME);
/*
 限制 RabbitMQ 只发不超过 1 条的消息给同一个消费者。
 当消息处理完毕后，有了反馈，才会进行第二次发送。
 */
 int prefetchCount = 1;
 channel.basicQos(prefetchCount);
DeliverCallback deliverCallback = (consumerTag, delivery) -> {
 // 获取 replyTo 队列和 correlationId 请求标识
 AMQP.BasicProperties replyProps = new AMQP.BasicProperties
 .Builder().correlationId(delivery.getProperties().getCorrelationId())
 .build();
	String message = new String(delivery.getBody(), "UTF-8");
}
```

Client

``` java
RPCClient rpc=new RPCClient();
String response=rpc.call(str);

final String corrId=UUID.randomUUID().toString();
String replyQueueName = channel.queueDeclare().getQueue();
AMQP.BasicProperties props = new AMQP.BasicProperties
 .Builder()
 .correlationId(corrId)
 .replyTo(replyQueueName)
 .build();
channel.basicPublish("", requestQueueName, props, message.getBytes("UTF-8"));

// 设置线程等待，每次只接收一个响应结果
 final BlockingQueue<String> response = new ArrayBlockingQueue<>(1);
 // 接受服务器返回结果
 String ctag = channel.basicConsume(replyQueueName, true,(consumerTag, delivery) -> 
 {
 	if(delivery.getProperties().getCorrelationId().equals(corrId)) {
 // 将给定的元素在给定的时间内设置到线程队列中，如果设置成功返回true, 否则返回 false
 	response.offer(new String(delivery.getBody(), "UTF-8"));
 	}
 }, consumerTag -> {});
// 从线程队列中获取值，如果线程队列中没有值，线程会一直阻塞，直到线程队列中有值，并且取得该值
 String result = response.take();
 // 从消息队列中丢弃该值
 channel.basicCancel(ctag);

```



