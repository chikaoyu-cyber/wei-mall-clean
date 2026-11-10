# JMeter 压测脚本说明

`tests/` 下提供两个 JMeter 5.4.1 测试计划，用于验证门户接口性能与限流 / 服务保护效果。

| 脚本 | 用途 |
| --- | --- |
| `微商城测试.jmx` | 门户接口基础压测 |
| `雪崩测试.jmx` | 高并发场景下的服务保护与限流验证 |

## 使用步骤

1. 安装 JDK 与 Apache JMeter（官网：https://jmeter.apache.org/download_jmeter.cgi）。
2. 启动 JMeter，`File → Open` 选择对应的 `.jmx` 文件。
3. 按目标环境调整线程组里的服务器地址、端口与并发数（默认指向 `localhost:18080`）。
4. 运行后在「聚合报告 / 察看结果树」查看响应时间、吞吐量与错误率；配合 Sentinel Dashboard（`:8090`）可观察 QPS 限流是否生效。

> 脚本中的账号、地址与并发参数均为示例值，请按实际部署环境修改。
