(function(){
  'use strict';
  const course=window.JAVA_COURSE, M=window.CourseModel, KEY='java-learning-progress-v1';
  const $=id=>document.getElementById(id);
  let state=M.fresh(), current=null, noticeTimer;
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function tell(message){$('notice').textContent=message;clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>$('notice').textContent='',4500);}
  try{const raw=localStorage.getItem(KEY);if(raw)state=M.validate(JSON.parse(raw),course);}catch{tell('未能读取本地进度；你仍可学习，建议导出备份。');}
  function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{tell('浏览器未能保存进度，请使用“导出进度”备份。');}}
  function nav(){
    const needle=$('search').value.trim().toLowerCase();
    const filtered=course.lessons.filter(l=>(l.title+' '+l.week+' '+l.intro).toLowerCase().includes(needle));
    $('nav').innerHTML=filtered.length?filtered.map(l=>`<button data-lesson="${l.id}" class="${current===l.id?'active ':''}${M.completed(state,l)?'done':''}" ${current===l.id?'aria-current="page"':''}><span class="num">${M.completed(state,l)?'✓':l.id}</span>${esc(l.title)}</button>`).join(''):'<p class="small muted">没有匹配课程，试试其他关键词。</p>';
    const done=course.lessons.filter(l=>M.completed(state,l)).length;
    $('progressText').textContent=`${done} / ${course.lessons.length} 课`;$('progress').value=done;
  }
  function quizHtml(l,i,prefix='q'){
    const q=l.quizzes[i],a=state.lessons[l.id]?.answers[i],name=`${prefix}-${l.id}-${i}`;
    return `<form class="quiz" data-quiz="${i}" data-id="${l.id}"><fieldset><legend>${i+1}. ${esc(q.q)}</legend>${q.options.map((o,k)=>`<label class="option"><input type="radio" name="${name}" value="${k}" ${a?.selected===k?'checked':''} required><span>${esc(o)}</span></label>`).join('')}</fieldset><button type="submit">提交答案</button><div class="quiz-result" aria-live="polite">${a?feedback(q,a):''}</div></form>`;
  }
  function feedback(q,a){return `<div class="feedback ${a.correct?'correct':'incorrect'}">${a.correct?'回答正确':'还需要复习'}。${esc(q.explanation)}<br>正确选项：${esc(q.options[q.correct])}</div>`;}
  function show(id,focus=false){
    const l=course.lessons.find(x=>x.id===id)||course.lessons[0];current=l.id;state.current=l.id;const item=M.lesson(state,l.id);save();nav();
    const n=course.lessons.indexOf(l),due=item.nextReview&&item.nextReview<=Date.now();
    $('lesson').innerHTML=`<div class="eyebrow">LESSON ${l.id} · 第 ${esc(l.week)} 周</div><h2>${esc(l.title)}</h2><span class="pill">首次学习约 ${l.minutes} 分钟</span><span class="pill">项目实践另计</span>${due?'<span class="pill">今天适合复习</span>':''}<p class="intro">${esc(l.intro)}</p><div class="panel"><h3>先理解，再动手</h3>${l.sections.map(([h,p])=>`<h4>${esc(h)}</h4><p>${esc(p)}</p>`).join('')}</div><div class="compare"><strong>联系你的 Python 经验</strong><p>${esc(l.python)}</p></div><h3>代码拆解</h3><div class="codebar"><span class="label">${esc(l.code.lang)} · 教学示例</span><button id="copyCode">复制代码</button></div><pre><code>${esc(l.code.text)}</code></pre><p class="explain">${esc(l.code.explain)}</p><section class="panel task"><p class="label">动手任务</p><h3>在本地完成这个练习</h3><p>${esc(l.exercise)}</p><p class="small">页面不编译 Java，也不把笔记自动判定为正确。请在终端或 IDE 运行并保留证据。</p></section><h3>卡住了？逐级展开</h3>${l.hints.map((h,i)=>`<details><summary>提示 ${i+1}${i===0?' · 先看方向':i===1?' · 缩小范围':' · 具体做法'}</summary><p>${esc(h)}</p></details>`).join('')}<details class="answer"><summary>完成尝试后，查看参考思路</summary><p>${esc(l.answer)}</p></details><section class="panel"><h3>检查理解</h3><p class="muted small">测验自动判分；答错会进入错题复习。答对不等于编程任务已经完成。</p>${l.quizzes.map((_,i)=>quizHtml(l,i)).join('')}</section><section class="panel"><h3>实践验收 · 自评</h3>${l.checks.map((c,i)=>`<label class="check"><input type="checkbox" data-check="${i}" ${item.checks.includes(i)?'checked':''}><span>${esc(c)}</span></label>`).join('')}<p id="completion" class="completion">${M.completed(state,l)?'本课实践已自评完成':'完成本地验收后再勾选'}</p><button id="practiced">我已完成一次脱离 AI 的练习</button><p id="practiceStatus" class="small muted">${practiceText(item)}</p></section><section class="panel"><h3>我的实现、错误与疑问</h3><label for="note" class="muted small">记录实现要点、测试证据、最困惑的地方；不要保存密钥。</label><textarea id="note" maxlength="30000" placeholder="我的实现：\n测试输入与结果：\n我仍不能解释的地方：">${esc(item.note)}</textarea><div class="actions"><button id="tutor" class="primary">复制本课导师提问</button><button id="copyReview">复制代码审查提问</button></div><p class="small muted">复制到你使用的 AI 聊天中继续问答。本页本身没有连接大模型。</p></section><div class="footer-nav"><button id="prev" ${n===0?'disabled':''}>← 上一课</button><span class="small muted">${n+1} / ${course.lessons.length}</span><button id="next" class="primary" ${n===course.lessons.length-1?'disabled':''}>下一课 →</button></div><p class="footnote">首次学习时间仅指讲解与小练习；数据库、Spring 集成和最终项目通常需要额外多次实践。进度仅保存在当前浏览器，可导出迁移。</p>`;
    $('copyCode').onclick=()=>copy(l.code.text,'代码已复制');
    $('note').oninput=()=>{item.note=$('note').value;save();};
    $('practiced').onclick=()=>{item.lastPracticed=Date.now();item.nextReview=Date.now()+3*M.DAY;save();$('practiceStatus').textContent=practiceText(item);tell('已记录，3 天后安排复习提醒标记。');};
    $('tutor').onclick=()=>copy(tutor(l,item,false),'导师提问已复制，可粘贴到 AI 聊天');
    $('copyReview').onclick=()=>copy(tutor(l,item,true),'审查提问已复制');
    $('prev').onclick=()=>navigate(course.lessons[n-1].id);$('next').onclick=()=>navigate(course.lessons[n+1].id);
    if(focus){$('lesson').focus();window.scrollTo({top:0,behavior:'smooth'});}
  }
  function practiceText(item){return item.lastPracticed?'最近独立练习：'+new Date(item.lastPracticed).toLocaleDateString()+'；建议复习：'+new Date(item.nextReview).toLocaleDateString():'尚未记录独立练习。';}
  function tutor(l,item,review){return `我会 Python、FastAPI、RAG、LangChain，正在补 Java 业务后端。\n当前课程：${l.id} ${l.title}\n本课背景：${l.intro}\n任务：${l.exercise}\n验收标准：\n${l.checks.map(x=>'- '+x).join('\n')}\n我的代码/笔记：\n${item.note||'（请在这里贴代码、报错与我的尝试）'}\n\n${review?'请审查实际代码的正确性，指出触发条件、影响和验证办法。区分确定缺陷与待验证猜测。不要直接重写全部代码。':'请先根据我的记录提出一个诊断问题，每次只问一个，等我回答后再继续。先给提示，不直接提供完整实现。若需要版本和运行输出，请明确告诉我缺少哪些证据。'}`;}
  async function copy(value,message){try{await navigator.clipboard.writeText(value);tell(message);}catch{const t=document.createElement('textarea');t.value=value;t.style.position='fixed';t.style.left='-10000px';document.body.append(t);t.select();let ok=false;try{ok=document.execCommand('copy');}catch{}t.remove();tell(ok?message:'复制不可用，请手动选择正文或笔记。');}}
  function navigate(id){if(location.hash.slice(1)===id)show(id,true);else location.hash=id;}
  function review(){current=null;nav();const wrong=M.wrongQuestions(state,course),due=course.lessons.filter(l=>state.lessons[l.id]?.nextReview<=Date.now());$('lesson').innerHTML=`<div class="eyebrow">REVIEW</div><h2>把错题变成下一次练习</h2><p class="intro">${wrong.length} 道当前错题 · ${due.length} 课到期复习。这里只展示最近一次仍答错的题，答对后会移出。</p><div class="panel"><h3>到期课程</h3>${due.length?due.map(l=>`<p><button data-lesson="${l.id}">${esc(l.title)}</button></p>`).join(''):'<p class="muted">还没有到期课程。独立练习后会安排 3 天后的复习标记；错题会安排次日标记。</p>'}</div>${wrong.length?wrong.map(x=>`<section class="panel review-item"><p class="label">课程 ${x.lesson.id} · ${esc(x.lesson.title)}</p>${quizHtml(x.lesson,x.index,'review')}<button data-lesson="${x.lesson.id}">回课文找原因</button></section>`).join(''):'<div class="panel empty">暂无未纠正的错题。先完成一课测验，再回来看。</div>'}`;$('lesson').focus();}
  document.addEventListener('click',e=>{const button=e.target.closest('[data-lesson]');if(button)navigate(button.dataset.lesson);});
  $('lesson').addEventListener('change',e=>{if(e.target.matches('[data-check]')){const item=M.lesson(state,current),i=Number(e.target.dataset.check);item.checks=e.target.checked?[...new Set([...item.checks,i])]:item.checks.filter(x=>x!==i);save();nav();$('completion').textContent=M.completed(state,course.lessons.find(x=>x.id===current))?'本课实践已自评完成':'完成本地验收后再勾选';}});
  $('lesson').addEventListener('submit',e=>{const form=e.target.closest('[data-quiz]');if(!form)return;e.preventDefault();const selected=form.querySelector('input:checked');if(!selected){tell('请先选择一个答案');return;}const l=course.lessons.find(x=>x.id===form.dataset.id),i=Number(form.dataset.quiz),k=Number(selected.value);M.recordAnswer(state,l.id,i,k,k===l.quizzes[i].correct);save();form.querySelector('.quiz-result').innerHTML=feedback(l.quizzes[i],state.lessons[l.id].answers[i]);});
  $('search').oninput=nav;$('review').onclick=()=>{location.hash='review';review();};
  $('export').onclick=()=>{const blob=new Blob([JSON.stringify({...state,exportedAt:new Date().toISOString()},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='java-learning-progress.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);tell('进度已导出，包含笔记与测验记录。');};
  $('import').onchange=async e=>{const file=e.target.files[0];if(!file)return;try{if(file.size>2*1024*1024)throw new Error('文件超过2MB');const next=M.validate(JSON.parse(await file.text()),course);if(!confirm('导入会替换当前浏览器进度与笔记。建议先导出备份。确定导入吗？'))return;state=next;save();navigate(state.current);tell('进度已导入');}catch(err){tell('导入失败：'+err.message);}finally{e.target.value='';}};
  window.addEventListener('hashchange',()=>{const id=location.hash.slice(1);id==='review'?review():show(id,true);});
  if(location.hash==='#review')review();else show(location.hash.slice(1)||state.current);
})();
