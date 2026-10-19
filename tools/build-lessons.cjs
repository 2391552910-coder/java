const fs=require('node:fs');
const path=require('node:path');
const course=require('../learn/course.js');
const root=path.resolve(__dirname,'..');
fs.mkdirSync(path.join(root,'lessons'),{recursive:true});
for(let n=0;n<course.lessons.length;n++){
  const l=course.lessons[n];
  const parts=[`# ${l.id} · ${l.title}`,`第 ${l.week} 周 · 首次讲解与小练习约 ${l.minutes} 分钟，项目实践另计。`,l.intro,
    ...l.sections.flatMap(([h,p])=>['## '+h,p]),'## 联系你的 Python 经验',l.python,'## 代码拆解','```'+l.code.lang+'\n'+l.code.text+'\n```',l.code.explain,
    '## 动手任务',l.exercise,'在本地 IDE 或终端实现并运行；网页不会编译 Java 或判定编程题正确。',
    ...l.hints.map((h,i)=>`<details>\n<summary>提示 ${i+1}</summary>\n\n${h}\n\n</details>`),
    `<details>\n<summary>尝试后再看参考思路</summary>\n\n${l.answer}\n\n</details>`,'## 自测',
    ...l.quizzes.map((q,i)=>`### ${i+1}. ${q.q}\n\n${q.options.map((x,k)=>`${k+1}. ${x}`).join('\n')}\n\n<details>\n<summary>答案与原因</summary>\n\n答案：${q.correct+1}。${q.explanation}\n\n</details>`),
    '## 实践验收',l.checks.map(x=>'- [ ] '+x).join('\n'),'## 独立复习','关闭 AI 和参考答案，重新实现本课任务的一个变式。记录“我能独立做什么、还需要什么提示、测试证据”。',
    `[课程目录](../docs/roadmap.md)${n>0?' · [上一课]('+course.lessons[n-1].id+'.md)':''}${n<course.lessons.length-1?' · [下一课]('+course.lessons[n+1].id+'.md)':''}`];
  fs.writeFileSync(path.join(root,'lessons',l.id+'.md'),parts.join('\n\n')+'\n','utf8');
}
const table=course.lessons.map(l=>`| [${l.id}](../lessons/${l.id}.md) | ${l.title} | ${l.week} |`).join('\n');
fs.writeFileSync(path.join(root,'docs','roadmap.md'),`# 中文课程目录与学习方式\n\n不必先看外部教程或官方文档。每课在仓库中提供讲解与练习；先尝试，再展开提示和答案。\n\n| 课 | 主题 | 周次 |\n|---|---|---|\n${table}\n\n## 每课循环\n\n1. 用 10–20 分钟读讲解；先预测代码行为，再运行。\n2. 用 20–40 分钟自己实现一个小任务，留下最小失败案例。\n3. 卡住才依次展开提示，不立即抄参考思路。\n4. 回答自测；错题回到相关段落解释原因。\n5. 在终端或 IDE 验证实践标准，记录证据。\n6. 次日或三天后脱离 AI 完成一个变式。\n\n一次课不要求完成整周项目。框架整合、数据库实验和最终部署通常需要额外多次实践。\n\n## 第一周建议\n\n- 第一天：00，跑通编译；01，写标题校验。\n- 第二天：不看答案复写标题校验；02，工单状态。\n- 第三天：03，内存仓库。\n- 第四天：运行 [练习检查器](../exercises/core/README.md)，修复失败。\n- 第五天：完成 [阶段挑战 A](checkpoints.md)，根据错误决定是否继续。\n\n后续按每周可用时间推进，不以看完页面代替掌握。\n`,'utf8');
console.log(`Generated ${course.lessons.length} lessons and roadmap`);
