"use client";
import { useState, useEffect, useRef } from "react";

// PAPARAZZI — "Silver Flash" aesthetic — celebrity-forward, editorial, flash culture
const C = {
  base:"#0F0F12",surface:"#161618",panel:"#1E1E22",
  border:"rgba(248,247,244,0.07)",silver:"#BEC3CB",
  silverGlow:"rgba(190,195,203,0.15)",red:"#B73A4B",redGlow:"rgba(183,58,75,0.2)",
  gold:"#C5A35D",cream:"#F8F7F4",muted:"rgba(248,247,244,0.45)",dim:"rgba(248,247,244,0.22)",
};
const F={display:"'Playfair Display',Georgia,serif",sans:"'DM Sans',system-ui,sans-serif",mono:"'DM Mono',monospace"};

const TICKETS=[
  {date:"May 1, 2026",  url:"https://www.eventbrite.com/e/paparazzi-tickets-1983361435444"},
  {date:"Jun 1, 2026",  url:"https://www.eventbrite.com/e/paparazzi-tickets-1983361684188"},
  {date:"Jul 1, 2026",  url:"https://www.eventbrite.com/e/paparazzi-tickets-1983430772834"},
  {date:"Aug 1, 2026",  url:"https://www.eventbrite.com/e/paparazzi-tickets-1983432236211"},
  {date:"Sep 1, 2026",  url:"https://www.eventbrite.com/e/paparazzi-tickets-1983432751753"},
];

function useInView(t=0.1){const ref=useRef<HTMLDivElement>(null);const[v,setV]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold:t});o.observe(el);return()=>o.disconnect()},[t]);return[ref,v] as const}
function Reveal({children,d=0}:{children:React.ReactNode;d?:number}){const[ref,v]=useInView();return<div ref={ref} style={{transform:v?"translateY(0)":"translateY(40px)",opacity:v?1:0,transition:`all 1s cubic-bezier(0.16,1,0.3,1) ${d}s`}}>{children}</div>}
const Grain=()=><div style={{position:"absolute",inset:0,opacity:0.035,pointerEvents:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`}}/>;

function Nav(){const[sc,setSc]=useState(false);useEffect(()=>{const h=()=>setSc(window.scrollY>60);window.addEventListener("scroll",h,{passive:true});return()=>window.removeEventListener("scroll",h)},[]);return(
<nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,padding:sc?"12px clamp(24px,4vw,60px)":"24px clamp(24px,4vw,60px)",display:"flex",justifyContent:"space-between",alignItems:"center",background:sc?`${C.base}F5`:"transparent",backdropFilter:sc?"blur(20px)":"none",borderBottom:sc?`1px solid ${C.border}`:"none",transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)"}}>
<div><div style={{fontFamily:F.mono,fontSize:"7px",letterSpacing:"0.5em",textTransform:"uppercase",color:C.silver,marginBottom:"2px"}}>A KHG HugLife Event</div><span style={{fontFamily:F.display,fontSize:"20px",fontWeight:700,fontStyle:"italic",color:C.cream,letterSpacing:"0.04em"}}>Paparazzi</span></div>
<div style={{display:"flex",gap:"clamp(16px,2vw,32px)",alignItems:"center"}}>
{["Experience","Dates"].map(n=><a key={n} href={`#${n.toLowerCase()}`} style={{fontFamily:F.sans,fontSize:"10px",fontWeight:500,letterSpacing:"0.2em",textTransform:"uppercase",color:C.muted,textDecoration:"none",transition:"color 0.3s"}} onMouseEnter={e=>(e.target as HTMLAnchorElement).style.color=C.cream} onMouseLeave={e=>(e.target as HTMLAnchorElement).style.color=C.muted}>{n}</a>)}
<a href="#tickets" style={{fontFamily:F.sans,fontSize:"10px",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:C.base,background:C.silver,padding:"10px 24px",textDecoration:"none",display:"inline-block"}}>Get Tickets</a>
</div></nav>);}

function Hero(){const[ld,setLd]=useState(false);const[flash,setFlash]=useState(false);
useEffect(()=>{setTimeout(()=>setLd(true),100);const interval=setInterval(()=>{setFlash(true);setTimeout(()=>setFlash(false),150)},4000+Math.random()*3000);return()=>clearInterval(interval)},[]);
return(<section style={{position:"relative",width:"100%",height:"100vh",overflow:"hidden",background:C.base,display:"flex",alignItems:"flex-end"}}>
{/* Camera flash effect */}
<div style={{position:"absolute",inset:0,background:"white",opacity:flash?0.08:0,pointerEvents:"none",transition:"opacity 0.05s ease",zIndex:5}}/>
<div style={{position:"absolute",inset:0}}>
  <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 50% 80%, ${C.redGlow} 0%, transparent 55%)`}}/>
  <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 30% 30%, ${C.silverGlow} 0%, transparent 50%)`}}/>
  {/* Red carpet diagonal lines */}
  {[0,1,2,3,4].map(i=><div key={i} style={{position:"absolute",top:0,left:`${15+i*18}%`,width:"1px",height:"100%",background:`linear-gradient(180deg,transparent,${C.red}15,transparent)`,transform:"rotate(8deg)"}}/>)}
  <Grain/>
</div>
<div style={{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(15,15,18,0.97) 0%, rgba(15,15,18,0.45) 50%, transparent 100%)"}}/>

<div style={{position:"relative",zIndex:2,width:"100%",padding:"0 clamp(32px,5vw,80px) clamp(60px,7vh,96px)",maxWidth:"1400px",margin:"0 auto"}}>
  <div style={{opacity:ld?1:0,transition:"opacity 0.8s ease 0.3s",fontFamily:F.mono,fontSize:"9px",letterSpacing:"0.5em",textTransform:"uppercase",color:C.silver,marginBottom:"20px"}}>Atlanta, GA · Monthly · 2026</div>
  <div style={{overflow:"hidden",marginBottom:"4px"}}><h1 style={{fontFamily:F.display,fontSize:"clamp(64px,13vw,190px)",fontWeight:700,fontStyle:"italic",lineHeight:0.85,color:C.cream,margin:0,opacity:ld?1:0,transform:ld?"translateY(0)":"translateY(100%)",transition:"all 1.2s cubic-bezier(0.16,1,0.3,1) 0.4s"}}>Paparazzi</h1></div>
  <p style={{fontFamily:F.display,fontSize:"clamp(16px,2vw,26px)",fontStyle:"italic",color:C.silver,marginBottom:"32px",opacity:ld?1:0,transition:"opacity 1s ease 0.9s"}}>Every shot is a moment. Every moment is yours.</p>
  <p style={{fontFamily:F.sans,fontSize:"clamp(13px,1.1vw,16px)",lineHeight:1.85,color:C.muted,maxWidth:"440px",marginBottom:"40px",opacity:ld?1:0,transition:"opacity 1s ease 1.1s"}}>Atlanta&apos;s most photogenic nightlife experience. Upscale energy, celebrity-level production, and an atmosphere built to be seen. Five dates. One season. All 2026.</p>
  <div style={{display:"flex",gap:"14px",flexWrap:"wrap",opacity:ld?1:0,transition:"opacity 1s ease 1.4s"}}>
    <a href="#tickets" style={{fontFamily:F.sans,fontSize:"10px",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:C.base,background:C.silver,padding:"15px 48px",textDecoration:"none",display:"inline-block"}}>Get Tickets</a>
    <a href="mailto:thekollectiveworldwide@gmail.com?subject=Paparazzi VIP Inquiry" style={{fontFamily:F.sans,fontSize:"10px",fontWeight:500,letterSpacing:"0.14em",textTransform:"uppercase",color:C.cream,background:"transparent",border:`1px solid ${C.border}`,padding:"15px 36px",textDecoration:"none",display:"inline-block"}}>VIP Access</a>
  </div>
</div></section>);}

function Experience(){
return(<section id="experience" style={{background:C.surface,padding:"120px clamp(32px,5vw,80px)",position:"relative",overflow:"hidden"}}>
<div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 60% 50%, ${C.redGlow} 0%, transparent 55%)`}}/>
<Grain/>
<div style={{maxWidth:"1400px",margin:"0 auto",position:"relative",zIndex:1}}>
<Reveal><div style={{fontFamily:F.mono,fontSize:"9px",letterSpacing:"0.5em",textTransform:"uppercase",color:C.silver,marginBottom:"16px"}}>The Experience</div>
<h2 style={{fontFamily:F.display,fontSize:"clamp(36px,5.5vw,76px)",fontWeight:700,fontStyle:"italic",lineHeight:0.95,color:C.cream,marginBottom:"64px"}}>Dress up.<br/><em style={{color:C.red}}>Show out.</em></h2></Reveal>
<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"2px",background:C.border}}>
{[{t:"Celebrity Production",d:"Professional lighting rigs, photographers, and a venue setup that makes every guest feel like the main event.",n:"01"},{t:"Upscale Crowd",d:"Paparazzi attracts Atlanta&apos;s most stylish. Dress code enforced. Come ready to be seen.",n:"02"},{t:"Monthly Frequency",d:"Five consecutive months. Build your summer around Atlanta&apos;s most consistent upscale experience.",n:"03"}].map((p,i)=><Reveal key={p.t} d={i*0.07}>
<div style={{background:C.base,padding:"44px 32px",position:"relative",overflow:"hidden"}}>
<div style={{position:"absolute",top:0,left:0,right:0,height:"2px",background:`linear-gradient(90deg,${C.red},transparent)`}}/>
<div style={{fontFamily:F.mono,fontSize:"10px",color:C.red,opacity:0.5,marginBottom:"14px"}}>{p.n}</div>
<div style={{fontFamily:F.display,fontSize:"clamp(18px,2.2vw,28px)",fontStyle:"italic",color:C.cream,marginBottom:"12px"}}>{p.t}</div>
<p style={{fontFamily:F.sans,fontSize:"13px",lineHeight:1.75,color:C.muted}}>{p.d}</p>
</div></Reveal>)}
</div></div></section>);}

function Tickets(){const[sel,setSel]=useState(0);return(
<section id="tickets" style={{background:C.base,padding:"100px clamp(32px,5vw,80px)",position:"relative",overflow:"hidden"}}>
<div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 50% 50%, ${C.silverGlow} 0%, transparent 55%)`}}/>
<Grain/>
<div style={{maxWidth:"1200px",margin:"0 auto",position:"relative",zIndex:1}}>
<Reveal><div style={{fontFamily:F.mono,fontSize:"9px",letterSpacing:"0.5em",textTransform:"uppercase",color:C.silver,marginBottom:"16px"}}>2026 Season Dates</div>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:"24px",marginBottom:"48px"}}>
<h2 style={{fontFamily:F.display,fontSize:"clamp(36px,6vw,84px)",fontWeight:700,fontStyle:"italic",color:C.cream,lineHeight:0.9}}>Pick Your Night</h2>
<p style={{fontFamily:F.sans,fontSize:"14px",color:C.muted,maxWidth:"300px",lineHeight:1.75}}>Five months. Five chances to be in the room. Each show sells out.</p>
</div></Reveal>
{/* 5-date grid */}
<div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"2px",background:`${C.silver}15`,marginBottom:"3px"}}>
{TICKETS.map((t,i)=><Reveal key={t.date} d={i*0.06}>
<div onClick={()=>setSel(i)} style={{background:sel===i?C.panel:C.surface,padding:"28px 20px",cursor:"pointer",borderTop:`2px solid ${sel===i?C.red:"transparent"}`,transition:"all 0.3s"}}>
<div style={{display:"flex",alignItems:"center",gap:"5px",marginBottom:"12px"}}>
<div style={{width:"5px",height:"5px",borderRadius:"50%",background:"#4ADE80",animation:"pulse 2s infinite"}}/>
<span style={{fontFamily:F.mono,fontSize:"7px",letterSpacing:"0.25em",color:"#4ADE80",textTransform:"uppercase"}}>Sale</span>
</div>
<div style={{fontFamily:F.display,fontSize:"clamp(15px,1.5vw,20px)",fontStyle:"italic",color:C.cream,marginBottom:"4px"}}>{t.date}</div>
<div style={{fontFamily:F.sans,fontSize:"10px",color:C.muted,marginBottom:"16px"}}>Atlanta, GA</div>
<a href={t.url} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{fontFamily:F.sans,fontSize:"9px",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:sel===i?C.base:C.cream,background:sel===i?C.red:"transparent",border:sel===i?"none":`1px solid ${C.border}`,padding:"10px 16px",textDecoration:"none",display:"inline-block",transition:"all 0.3s"}}>Buy →</a>
</div></Reveal>)}
</div>
<Reveal d={0.2}><div style={{background:C.surface,padding:"32px 36px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"24px",borderLeft:`2px solid ${C.red}40`}}>
<div><div style={{fontFamily:F.mono,fontSize:"8px",letterSpacing:"0.4em",textTransform:"uppercase",color:C.silver,marginBottom:"8px"}}>VIP & Group Access</div>
<div style={{fontFamily:F.display,fontSize:"clamp(16px,2vw,22px)",fontStyle:"italic",color:C.cream}}>Private tables, birthday packages & group entry</div></div>
<div style={{display:"flex",gap:"12px",flexWrap:"wrap"}}>
<a href="mailto:thekollectiveworldwide@gmail.com?subject=Paparazzi VIP Table Inquiry" style={{fontFamily:F.sans,fontSize:"10px",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:C.base,background:C.silver,padding:"12px 28px",textDecoration:"none",display:"inline-block"}}>Reserve VIP</a>
<a href="mailto:thekollectiveworldwide@gmail.com?subject=Paparazzi Birthday Package" style={{fontFamily:F.sans,fontSize:"10px",fontWeight:500,letterSpacing:"0.12em",textTransform:"uppercase",color:C.cream,background:"transparent",border:`1px solid ${C.border}`,padding:"12px 24px",textDecoration:"none",display:"inline-block"}}>Birthday Package</a>
</div></div></Reveal>
<div style={{marginTop:"28px",display:"flex",gap:"32px",justifyContent:"center",flexWrap:"wrap"}}>
{["Powered by Eventbrite","Secure Checkout","21+ Event","Dress Code Required"].map(s=><div key={s} style={{fontFamily:F.mono,fontSize:"9px",color:"rgba(255,255,255,0.18)",letterSpacing:"0.2em"}}>{s}</div>)}
</div></div>
<style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
</section>);}

function Footer(){return(<footer style={{background:"#0C0C0F",borderTop:`1px solid ${C.border}`,padding:"48px clamp(32px,5vw,80px) 32px"}}>
<div style={{maxWidth:"1400px",margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"32px"}}>
<div><div style={{fontFamily:F.display,fontSize:"24px",fontStyle:"italic",fontWeight:700,color:C.cream,marginBottom:"4px"}}>Paparazzi</div>
<div style={{fontFamily:F.mono,fontSize:"9px",letterSpacing:"0.3em",color:C.silver}}>A KHG HUGLIFE EVENT</div>
<p style={{fontFamily:F.sans,fontSize:"12px",color:C.muted,marginTop:"10px",maxWidth:"240px",lineHeight:1.65}}>Atlanta&apos;s most photogenic nightlife experience. 5 dates. 2026.</p></div>
<div style={{display:"flex",gap:"48px",flexWrap:"wrap"}}>
{[{h:"Season",l:["May 1","Jun 1","Jul 1","Aug 1","Sep 1"]},{h:"Connect",l:["Get Tickets","VIP Tables","Birthday Packages","@thekollectiveworldwide"]}].map(col=><div key={col.h}>
<div style={{fontFamily:F.mono,fontSize:"8px",letterSpacing:"0.4em",textTransform:"uppercase",color:C.silver,marginBottom:"14px"}}>{col.h}</div>
<ul style={{listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:"8px"}}>{col.l.map(item=><li key={item} style={{fontFamily:F.sans,fontSize:"12px",color:C.muted}}>{item}</li>)}</ul>
</div>)}
</div></div>
<div style={{maxWidth:"1400px",margin:"28px auto 0",paddingTop:"20px",borderTop:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"10px"}}>
<div style={{fontFamily:F.mono,fontSize:"10px",color:"rgba(255,255,255,0.18)"}}>© 2026 Paparazzi. A KHG Enterprise.</div>
</div></footer>);}

export default function PaparazziSite(){return(<div style={{background:C.base}}><Nav/><Hero/><Experience/><Tickets/><Footer/></div>);}
