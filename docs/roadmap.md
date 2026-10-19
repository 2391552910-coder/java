# 12 周学习路线与资源

每周建议：9 小时项目、5 小时阅读、3 小时基础练习、1–3 小时复盘。每阶段最多选一个主阅读入口；补充资料按问题查询。

## 第 1–2 周：Java 基础

**主资源：** [Dev.java Learn](https://dev.java/learn/)。依次阅读 First Steps、Language Basics、Object Oriented Programming、Generics、Exceptions、Collections 和 Streams 对应部分。

**学习任务：**
- 基本类型与引用类型、字符串、数组、类与接口、组合与继承。
- 泛型、异常、枚举；ArrayList、HashMap、HashSet。
- equals/hashCode、空值处理、不可变对象；基本 Lambda 和 Stream。
- 对比 Python：静态类型、编译、接口契约、对象引用与异常传播。

**练习：** 命令行工单管理：创建、按 ID 查询、列表过滤、状态更新。状态使用枚举，业务规则放在服务类中。先使用内存集合。

**验收：** 不看教程独立实现；能解释集合选择、引用修改的影响、equals 与 == 的区别，以及非法状态变更如何处理。

**暂缓：** GUI、自定义注解、复杂反射、设计模式大全。

## 第 3 周：工程工具与测试

- [Maven Getting Started](https://maven.apache.org/guides/getting-started/)：POM、目录结构、依赖与构建生命周期。
- [JUnit 官方文档](https://docs.junit.org/current/user-guide/)：基本断言、生命周期、参数化测试；版本随项目依赖管理。
- [Pro Git 中文版](https://git-scm.com/book/zh/v2)：提交、分支、合并和远程仓库。
- [SLF4J 手册](https://www.slf4j.org/manual.html)：日志门面与参数化日志，按需查阅。

**练习：** 把工单程序整理为 Maven 项目；测试非法输入、工单不存在、状态不允许变更等业务边界。使用断点和堆栈定位一个主动制造的错误。

**验收：** 能运行构建和测试、解释失败原因，日志不包含密码或模型密钥。

## 第 4–5 周：Spring Boot 与接口

- [Spring Guides](https://spring.io/guides/)：查找 RESTful Web Service、Testing the Web Layer、Validation 等指南。
- [Spring Boot 文档](https://docs.spring.io/spring-boot/)：配置、Web 应用、测试。
- [Spring Framework 文档](https://docs.spring.io/spring-framework/reference/)：IoC Container、Spring MVC；按章节阅读。
- [Spring Initializr](https://start.spring.io/)：生成项目，选择兼容的稳定版本与 Maven。

**学习任务：** 构造器依赖注入、Controller/Service/数据访问层职责、DTO、参数校验、统一异常处理、分页、HTTP 状态码、环境配置。

**练习：** 实现工单创建/查询/状态修改和知识库管理接口。先关注接口契约，不急着增加微服务。

**验收：** 能演示正确请求、字段缺失、资源不存在及业务冲突；不能所有错误都返回成功状态。

## 第 6–7 周：数据库与事务

- [MySQL 官方手册入口](https://dev.mysql.com/doc/)：选择实际安装版本；查阅 SQL、索引、EXPLAIN、InnoDB 事务与锁。
- [MyBatis 中文文档](https://mybatis.org/mybatis-3/zh_CN/index.html)：入门、XML 映射、动态 SQL、参数绑定。
- [MyBatis Spring Boot 集成](https://mybatis.org/spring-boot-starter/mybatis-spring-boot-autoconfigure/)：核对兼容性后使用。
- [Spring 事务文档](https://docs.spring.io/spring-framework/reference/data-access/transaction.html)：声明式事务与代理边界。

**学习任务：** 主键和唯一约束、关联查询、分页、联合索引、执行计划、隔离级别、事务回滚、乐观锁、幂等。

**练习：** 工单与操作记录同一事务写入；制造第二次写入失败并验证回滚；使用版本字段防止并发覆盖；请求 ID 加唯一约束防止重复创建。

**验收：** 提供表结构、两条查询的执行计划、回滚测试、并发冲突测试。能说明为什么数据库事务无法直接回滚远程模型调用。

## 第 8 周：权限与 Redis

- [Spring Security 文档](https://docs.spring.io/spring-security/reference/)：Architecture、Authentication、Authorization、Password Storage。
- [Redis 官方文档](https://redis.io/docs/latest/)：数据类型、过期、缓存基础。
- [Spring Data Redis 文档](https://docs.spring.io/spring-data/redis/reference/)：连接与基本读写。

**学习任务：** 认证与授权、密码哈希、登录态、角色与资源归属；缓存更新、失效和降级。先选择一种认证方案，不自己发明密码或令牌算法。

**练习：** 用户只能访问授权知识库；热点知识库元信息增加缓存。权限必须由服务端校验，不能信任请求里的 userId。

**验收：** 用户 A 改 ID 仍无法访问用户 B 数据；缓存不可用时基本业务仍可正确执行。Redis 先用于缓存，不承担未设计持久化与恢复方案的关键任务真相源。

## 第 9–10 周：Java + Python AI 服务

- [Spring REST Clients](https://docs.spring.io/spring-framework/reference/integration/rest-clients.html)：按选定版本学习客户端。
- [FastAPI 官方教程](https://fastapi.tiangolo.com/tutorial/)：接口校验、异常、测试等按需复习。
- [LangGraph 文档](https://docs.langchain.com/oss/python/langgraph/overview)：需要恢复执行时再阅读持久化与状态管理。

**学习任务：** HTTP 契约、服务间认证、请求 ID、超时、取消、重试边界、任务幂等、状态持久化；流式输出的连接关闭与资源释放。

**练习：** Java 创建 AI 任务，Python 执行检索或 Agent，Java 查询状态。任务有 pending/running/succeeded/failed/cancelled 状态；约定合法转换及超时任务处理。

**验收：** 模拟 Python 不可用、响应慢、已受理但响应丢失、重复提交、用户断开连接；不无限等待，不重复创建业务记录。

## 第 11 周：并发和 JVM

- [Dev.java Learn](https://dev.java/learn/)：JVM、Core JDK Tools、JFR Monitoring and Troubleshooting。
- [Java 官方文档入口](https://docs.oracle.com/en/java/)：选择项目 JDK 对应 API，查阅 java.util.concurrent。

**学习任务：** 线程池、队列、线程安全、synchronized、volatile、原子类、并发集合、CompletableFuture；堆、栈、GC、线程转储与基础性能分析。

**练习：** AI 请求使用有界并发和明确拒绝策略；记录排队时间与调用时间；模拟慢下游，观察队列和线程状态。

**验收：** 能解释并发限制与限流的区别、为什么 volatile 不等于复合操作原子性、为何下游变慢会导致本服务资源耗尽。

## 第 12 周：交付与部署

- [Docker Compose 文档](https://docs.docker.com/compose/)：服务配置、网络、数据卷、环境变量。
- [Spring Boot 文档](https://docs.spring.io/spring-boot/)：测试、打包、运维端点，注意限制敏感端点访问。
- [Testcontainers Java](https://java.testcontainers.org/)：需要真实数据库集成测试时选学。

**练习：** 提供 Java、Python、数据库、Redis 的启动配置和示例环境文件；文档列明依赖、启动、测试、演示与清理方式。

**验收：** 他人可照文档启动；正常流程和故障场景均可重现；性能报告写明数据规模、并发、硬件与模型配置，不虚构优化数字。

## 完成后的选学

[Spring AI](https://spring.io/projects/spring-ai/)：用 1–2 周实现一个模型调用或工具调用模块，对比 Python 方案。数据库、权限、事务未完成前，不把 AI 框架数量当作学习成果。
