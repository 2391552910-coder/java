(function(root){
  'use strict';
  const DAY=86400000;
  function fresh(){return {version:1,current:'00',lessons:{}};}
  function blank(){return {checks:[],answers:{},note:'',lastPracticed:null,nextReview:null};}
  function lesson(state,id){return state.lessons[id]||(state.lessons[id]=blank());}
  function recordAnswer(state,id,index,selected,correct,now=Date.now()){
    const item=lesson(state,id), old=item.answers[index]||{attempts:0,wrong:0};
    item.answers[index]={selected,correct,attempts:old.attempts+1,wrong:old.wrong+(correct?0:1)};
    item.nextReview=now+(correct?3:1)*DAY;
  }
  function completed(state,definition){const item=state.lessons[definition.id];return !!item&&definition.checks.every((_,i)=>item.checks.includes(i));}
  function wrongQuestions(state,course){return course.lessons.flatMap(l=>l.quizzes.map((q,i)=>({lesson:l,index:i,question:q,record:state.lessons[l.id]?.answers[i]}))).filter(x=>x.record&&!x.record.correct);}
  function validate(raw,course){
    if(!raw||raw.version!==1||!raw.lessons||typeof raw.lessons!=='object'||Array.isArray(raw.lessons))throw new Error('不是受支持的进度文件');
    const out=fresh();
    if(course.lessons.some(x=>x.id===raw.current))out.current=raw.current;
    for(const l of course.lessons){
      const src=Object.prototype.hasOwnProperty.call(raw.lessons,l.id)?raw.lessons[l.id]:null;
      if(!src||typeof src!=='object')continue;
      const dst=blank();
      dst.checks=Array.isArray(src.checks)?[...new Set(src.checks.filter(x=>Number.isInteger(x)&&x>=0&&x<l.checks.length))]:[];
      dst.note=typeof src.note==='string'?src.note.slice(0,30000):'';
      for(const [i,q] of l.quizzes.entries()){
        const a=src.answers&&src.answers[i];
        if(a&&Number.isInteger(a.selected)&&a.selected>=0&&a.selected<q.options.length){
          dst.answers[i]={selected:a.selected,correct:a.selected===q.correct,attempts:Number.isSafeInteger(a.attempts)&&a.attempts>0?a.attempts:1,wrong:Number.isSafeInteger(a.wrong)&&a.wrong>=0?a.wrong:0};
        }
      }
      for(const key of ['lastPracticed','nextReview'])if(Number.isFinite(src[key])&&src[key]>0)dst[key]=src[key];
      out.lessons[l.id]=dst;
    }
    return out;
  }
  const api={fresh,lesson,recordAnswer,completed,wrongQuestions,validate,DAY};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CourseModel=api;
})(typeof window!=='undefined'?window:this);
