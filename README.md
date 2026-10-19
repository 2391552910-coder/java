# Java学习：从 Python 到 AI 应用后端

这里是一套可以直接跟学的中文课程。**先读仓库里的讲解、做练习，再用互动页测理解；不要求阅读官方文档。**

面向已有 Python、FastAPI、RAG、LangChain 基础，希望补足 Java 业务后端能力的学习者。Java 处理业务、权限与事务，Python 保留 AI 主流程。

## 今天从这里开始

1. 打开 [第 0 课：跑通第一个程序](lessons/00.md)，检查 JDK 与编译器。
2. 学习 [第 1 课：类型、字符串与异常](lessons/01.md)，完成标题校验。
3. 进入 [第一组编程练习](exercises/core/README.md)，实现 TODO 并运行 12 个行为检查。

## 两种学习方式

**直接在 GitHub 学：** 进入 [16 课目录](docs/roadmap.md)。每课有中文讲解、Python 对照、代码拆解、动手任务、三级提示、参考思路、自测与验收。

**在互动页学：** 下载仓库并解压，双击 `learn/index.html`。可以做 32 道自测、复习错题、记录笔记、勾选实践验收、复制导师提问，导出/导入学习进度。详见 [互动页说明](learn/README.md)。GitHub 文件预览不会运行 HTML。

如果本地文件模式保存进度受限，安装 Node.js 后在仓库根目录执行：

```text
node tools/serve.cjs
```

打开 http://localhost:8765/learn/index.html 。无第三方依赖、无 API Key，不上传笔记。没有开启 GitHub Pages，也没有创建外部网站。

## 课程安排

| 周次 | 学习内容 | 本地课程 |
|---|---|---|
| 准备 | JDK、编译和运行 | [00](lessons/00.md) |
| 1 | 类型、异常、对象与接口 | [01](lessons/01.md) · [02](lessons/02.md) |
| 2 | 集合、泛型与内存仓库 | [03](lessons/03.md) |
| 3 | Maven、测试与调试 | [04](lessons/04.md) |
| 4 | Spring 与构造器注入 | [05](lessons/05.md) |
| 5 | HTTP、DTO 与参数校验 | [06](lessons/06.md) |
| 6 | SQL、MyBatis 与索引 | [07](lessons/07.md) |
| 7 | 事务与乐观锁 | [08](lessons/08.md) |
| 8 | 认证授权与缓存 | [09](lessons/09.md) · [10](lessons/10.md) |
| 9 | Java 调用 Python | [11](lessons/11.md) |
| 10 | 幂等、状态机、流式响应与工具 | [12](lessons/12.md) · [13](lessons/13.md) |
| 11 | 并发、负载与 JVM 诊断 | [14](lessons/14.md) |
| 12 | 部署、故障演练与复盘 | [15](lessons/15.md) |

课内时间只估计首次讲解与小练习，完整项目实践另计。按能力验收推进；已能独立完成某课，可做自测与变式后跳过。

## 怎样互动学习

- [AI 导师模式](docs/ai-tutor.md)：一次一个诊断问题、先提示后答案；附可直接粘贴的上下文。
- [阶段挑战](docs/checkpoints.md)：6 次脱离 AI 的实践验收。
- [贯穿项目](docs/project.md)：AI 知识库与工单助手的功能规格。
- [学习进度](PROGRESS.md)：跟踪独立完成能力与测试证据。
- [可选参考来源](docs/references.md)：用于核对版本与深入查询，不是必读任务。

浏览器只自动判概念题，不编译 Java 或执行 SQL；实践勾选是自评。第一组 Java 练习有可运行骨架和参考解；后续 Spring、数据库与网络示例是有说明的教学片段，需要逐步整合成自己的工程。没有伪装成已经完成的生产后端。

## 维护课程

内容源：`learn/course.js`。修改后运行 `node tools/build-lessons.cjs`，生成 Markdown 讲义；运行 `node --test tests/course.test.cjs` 检查课程结构与进度逻辑。

课程按 JDK 21 的基础语法设计，框架片段使用现代 Spring/Jakarta 风格。创建 Spring 项目时选择相互兼容的稳定版本并记录版本，不混抄不同主版本依赖。整理日期：2026-10-19。
