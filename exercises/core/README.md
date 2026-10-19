# 第一组编程练习：工单内存仓库

对应第 1–4 课。这里提供任务骨架和 12 个行为检查，**初次执行失败是预期行为**，请实现 TicketLab.java 中六个 TODO。

## 运行

需要 JDK 21，java 与 javac 都可在终端使用。进入本目录后执行：

```powershell
javac -encoding UTF-8 TicketLab.java Check.java
java Check
```

如果编译失败，先修复再执行 java；避免误跑上次的旧 class。检查器无需 Maven 或第三方库，失败返回非零退出码。它只验证列出的行为，不是完整工程测试。

## 规则

1. normalizeTitle：拒绝 null、空白；去两端空白；Java length() 不超过 100。
2. close：OPEN → CLOSED；其他状态抛 IllegalStateException。
3. reopen：CLOSED → OPEN；其他状态抛 IllegalStateException。
4. create：重复 ID 拒绝，不能覆盖原对象。
5. findById：不存在返回 Optional.empty。
6. findOpen：只保留 OPEN，按 ID 升序，返回列表不可增删。此单线程练习不要求元素深不可变。

## 提示

<details><summary>提示 1：先做哪个？</summary>

先实现 normalizeTitle，再实现状态转换，最后实现仓库。构造器依赖标题校验，先完成它能消除大量连带失败。

</details>

<details><summary>提示 2：常用 API</summary>

String.strip / isBlank、Map.containsKey / put / get、Optional.ofNullable、Stream.filter / sorted / toList、Comparator.comparingLong。

</details>

<details><summary>参考实现位置，尝试后再展开</summary>

[参考实现](../../solutions/core/TicketLab.java)。不要把参考实现与练习的同名类一起编译。

</details>

## 通过后的独立变式

增加“重开次数最多 2 次”的规则，为第二次允许、第三次拒绝分别写检查；不要先看 AI 答案。再解释为什么本仓库不是线程安全的。
