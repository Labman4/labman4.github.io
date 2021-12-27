~~~
qemu/kvm 安装openwrt
~~~

<!-- more -->

首先主机创建网桥

选用netctl 管理

https://wiki.archlinux.org/title/Bridge_with_netctl

```
Description="Example Bridge connection"
Interface=br0
Connection=bridge
BindsToInterfaces=(eth0) //有线网卡 ifconfig查看
MACAddress=eth0
IP=static
Address='192.168.1.20/24' //与主机同一网段
Gateway='192.168.1.1'  //主路由
## Ignore (R)STP and immediately activate the bridge
SkipForwardingDelay=yes
```

```
netctl start bridge //启动
netctl status bridge //查看
netclt enable bridge //开机启动
```

使用官方下载镜像，github的版本分支编译出来是snapshot版本没有镜像源使用

[generic-ext4-combined.img.gz](https://downloads.openwrt.org/releases/21.02.1/targets/x86/64/openwrt-21.02.1-x86-64-generic-ext4-combined.img.gz)

使用virt-manager 管理

create 

 选择 import existing disk image

​		类型选择generic os

​		网卡选择自建的网桥br0

​		其他全默认设置  // 自用cpu架构改成q35会失败,除架构外都可日后更改配置

 // 自编译iso安装发现重启会丢失引导，查看detail发现安装完成重启会删除硬盘，而import img不会

安装完成敲回车

```
uci set network.lan.proto=dhcp
uci commit network
/etc/init.d/network restart
```

opkg 更换清华源

```
sed -i 's_downloads.openwrt.org_mirrors.tuna.tsinghua.edu.cn/openwrt_' /etc/opkg/distfeeds.conf
opkg update
```

安装v2ray

```
wget -O kuoruan-public.key http://openwrt.kuoruan.net/packages/public.key
opkg-key add kuoruan-public.key

echo "src/gz kuoruan_packages http://openwrt.kuoruan.net/packages/releases/$(. /etc/openwrt_release ; echo $DISTRIB_ARCH)" \
  >> /etc/opkg/customfeeds.conf
  
opkg update
opkg install v2ray-core

//手动安装luci-app-v2ray及语言包
wget -O v2ray_2.0.0-1_all1.ipk https://github.com/kuoruan/luci-app-v2ray/releases/download/v2.0.0-1/luci-app-v2ray_2.0.0-1_all.ipk

wget -O luci-i18n-package-zh-cn_2.0.0-1_all.ipk https://github.com/kuoruan/luci-app-v2ray/releases/download/v2.0.0-1/luci-i18n-package-zh-cn_2.0.0-1_all.ipk

opkg remove dnsmasq
opkg install dnsmasq-full //如果网络异常编辑/etc/resolve.conf nameserver 192.168.1.1(主路由)
opkg install luci-app-v2ray_2.0.0-1_all.ipk
opkg install luci-i18n-package-zh-cn_2.0.0-1_all.ipk

```

配置代理

​        全局设置	

​		 		内存百分比不要动。服务会起不来

​				 访问日志access可以先打开调试，日志等级改到info

​		         入站启用dokodemo_door

​				 出站启用vmess 并在出站设置地址端口userID alterID

​		透明代理

​				转发dokodemo_door-1081

​				选择lan口

​				代理选cn direct

关闭dhcp

​		接口/lan/常规设置

​				协议 static address

​				IPv4地址 和主路由一个网段不冲突即可

​				掩码 255.255.255.0

​				IPv4网关写主路由地址

​		接口/lan/dhcp服务器

​				常规设置勾选忽略此接口

​				高级设置/dhcp选项

​						新增3,192.168.1.1(主路由) 

​						新增6,192.168.1.1(主路由) //设置网关和dns

主路由设置

​		默认网关/dns 设置为以上设置的IPv4地址



以上配置实现了连接主路由的设备以旁路由为网关，流量经由旁路由代理再返回给主路由连通外网

