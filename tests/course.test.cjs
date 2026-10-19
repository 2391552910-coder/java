const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const course=require('../learn/course.js'),M=require('../learn/model.js');
test('all lessons contain substantive content, valid quizzes and generated notes',()=>{
  assert.equal(course.lessons.length,16);assert.equal(new Set(course.lessons.map(x=>x.id)).size,16);
  for(const l of course.lessons){assert.ok(l.sections.length>=3,l.id);assert.ok(l.sections.every(s=>s[1].length>=90),l.id);assert.equal(l.hints.length,3);assert.equal(l.checks.length,3);assert.equal(l.quizzes.length,2);assert.ok(l.code.text&&l.answer&&l.exercise);for(const q of l.quizzes){assert.ok(q.correct>=0&&q.correct<q.options.length);assert.ok(q.explanation.length>10);}assert.ok(fs.readFileSync(path.join(__dirname,'../lessons',l.id+'.md'),'utf8').startsWith('# '+l.id));}
});
test('wrong answers enter review, correction removes them and preserves mistake count',()=>{
  const s=M.fresh(),l=course.lessons[0],q=l.quizzes[0];
  M.recordAnswer(s,l.id,0,(q.correct+1)%q.options.length,false,1000);
  assert.equal(M.wrongQuestions(s,course).length,1);assert.equal(s.lessons[l.id].nextReview,1000+M.DAY);
  M.recordAnswer(s,l.id,0,q.correct,true,2000);
  assert.equal(M.wrongQuestions(s,course).length,0);assert.equal(s.lessons[l.id].answers[0].wrong,1);assert.equal(s.lessons[l.id].answers[0].attempts,2);
});
test('practice completion requires all real checklist items',()=>{
  const s=M.fresh(),l=course.lessons[0];assert.equal(M.completed(s,l),false);M.lesson(s,l.id).checks=[0,1];assert.equal(M.completed(s,l),false);M.lesson(s,l.id).checks.push(2);assert.equal(M.completed(s,l),true);
});
test('import roundtrip preserves notes, answers and practice while recomputing truth',()=>{
  const s=M.fresh(),l=course.lessons[0];const item=M.lesson(s,l.id);item.note='中文笔记 <script>只是文本</script>';item.checks=[0,1,2];item.lastPracticed=1000;M.recordAnswer(s,l.id,0,l.quizzes[0].correct,true,2000);const restored=M.validate(JSON.parse(JSON.stringify(s)),course);assert.equal(restored.lessons[l.id].note,item.note);assert.equal(M.completed(restored,l),true);assert.equal(restored.lessons[l.id].answers[0].correct,true);
  const fake=JSON.parse(JSON.stringify(s));fake.lessons[l.id].answers[0].selected=(l.quizzes[0].correct+1)%3;fake.lessons[l.id].answers[0].correct=true;assert.equal(M.validate(fake,course).lessons[l.id].answers[0].correct,false);
});
test('malformed imports cannot manufacture progress or unknown lessons',()=>{
  assert.throws(()=>M.validate({version:2,lessons:{}},course));assert.throws(()=>M.validate({version:1,lessons:[]},course));
  const s=M.validate({version:1,current:'unknown',lessons:{'00':{checks:[0,0,-1,99,'1'],note:123,answers:{0:{selected:99}}},unknown:{checks:[0,1,2]}}},course);
  assert.equal(s.current,'00');assert.deepEqual(s.lessons['00'].checks,[0]);assert.equal(s.lessons['00'].note,'');assert.deepEqual(s.lessons['00'].answers,{});assert.equal(s.lessons.unknown,undefined);
});
test('all Markdown local file links resolve',()=>{
  const root=path.resolve(__dirname,'..');
  function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
  for(const file of walk(root).filter(x=>x.endsWith('.md'))){
    for(const match of fs.readFileSync(file,'utf8').matchAll(/\]\(([^)]+)\)/g)){
      const target=match[1];if(/^(https?:|#|mailto:)/.test(target))continue;
      assert.ok(fs.existsSync(path.resolve(path.dirname(file),target.split('#')[0])),file+' -> '+target);
    }
  }
});
