(() => {
  const translations = {
    hi:{Marketplace:'मार्केटप्लेस',Weather:'मौसम',Advisory:'सलाह','Disease Check':'रोग जाँच',Community:'समुदाय',Experts:'विशेषज्ञ',Schemes:'योजनाएँ',Premium:'प्रीमियम','Log in':'लॉग इन','Log out':'लॉग आउट','Get started':'शुरू करें',Dashboard:'डैशबोर्ड','Farm Assistant':'फार्म असिस्टेंट','Weather Intelligence':'मौसम जानकारी','Live conditions':'वर्तमान स्थिति','Farming advisories':'कृषि सलाह','6-day outlook':'6-दिन का पूर्वानुमान',Humidity:'नमी',Wind:'हवा',Rain:'बारिश',Search:'खोजें','Enter city or village name':'शहर या गाँव का नाम दर्ज करें','Welcome back':'वापसी पर स्वागत है',Email:'ईमेल',Password:'पासवर्ड','Create an account':'खाता बनाएँ','Get started free':'मुफ्त में शुरू करें','Try crop advisory':'फसल सलाह आज़माएँ','Explore →':'देखें →','How it works':'यह कैसे काम करता है','Thank You':'धन्यवाद'},
    mr:{Marketplace:'मार्केटप्लेस',Weather:'हवामान',Advisory:'सल्ला','Disease Check':'रोग तपासणी',Community:'समुदाय',Experts:'तज्ज्ञ',Schemes:'योजना',Premium:'प्रीमियम','Log in':'लॉग इन','Log out':'लॉग आउट','Get started':'सुरू करा',Dashboard:'डॅशबोर्ड','Farm Assistant':'फार्म असिस्टंट','Weather Intelligence':'हवामान माहिती','Live conditions':'सध्याची स्थिती','Farming advisories':'शेतीसाठी सल्ले','6-day outlook':'६ दिवसांचा अंदाज',Humidity:'आर्द्रता',Wind:'वारा',Rain:'पाऊस',Search:'शोधा','Enter city or village name':'शहर किंवा गावाचे नाव लिहा','Welcome back':'पुन्हा स्वागत आहे',Email:'ईमेल',Password:'पासवर्ड','Create an account':'खाते तयार करा','Get started free':'मोफत सुरू करा','Try crop advisory':'पीक सल्ला वापरा','Explore →':'पहा →','How it works':'हे कसे काम करते','Thank You':'धन्यवाद'},
    te:{Marketplace:'మార్కెట్‌ప్లేస్',Weather:'వాతావరణం',Advisory:'సలహా','Disease Check':'వ్యాధి తనిఖీ',Community:'కమ్యూనిటీ',Experts:'నిపుణులు',Schemes:'పథకాలు',Premium:'ప్రీమియం','Log in':'లాగిన్','Log out':'లాగ్ అవుట్','Get started':'ప్రారంభించండి',Dashboard:'డ్యాష్‌బోర్డ్','Farm Assistant':'ఫార్మ్ అసిస్టెంట్','Weather Intelligence':'వాతావరణ సమాచారం','Live conditions':'ప్రస్తుత పరిస్థితులు','Farming advisories':'వ్యవసాయ సూచనలు','6-day outlook':'6 రోజుల అంచనా',Humidity:'తేమ',Wind:'గాలి',Rain:'వర్షం',Search:'వెతకండి','Enter city or village name':'నగరం లేదా గ్రామం పేరు నమోదు చేయండి','Welcome back':'తిరిగి స్వాగతం',Email:'ఈమెయిల్',Password:'పాస్‌వర్డ్','Create an account':'ఖాతా సృష్టించండి','Get started free':'ఉచితంగా ప్రారంభించండి','Try crop advisory':'పంట సలహా ప్రయత్నించండి','Explore →':'చూడండి →','How it works':'ఇది ఎలా పనిచేస్తుంది','Thank You':'ధన్యవాదాలు'},
    bn:{Marketplace:'মার্কেটপ্লেস',Weather:'আবহাওয়া',Advisory:'পরামর্শ','Disease Check':'রোগ পরীক্ষা',Community:'কমিউনিটি',Experts:'বিশেষজ্ঞ',Schemes:'সরকারি প্রকল্প',Premium:'প্রিমিয়াম','Log in':'লগ ইন','Log out':'লগ আউট','Get started':'শুরু করুন',Dashboard:'ড্যাশবোর্ড','Farm Assistant':'ফার্ম অ্যাসিস্ট্যান্ট','Weather Intelligence':'আবহাওয়া তথ্য','Live conditions':'বর্তমান অবস্থা','Farming advisories':'কৃষি পরামর্শ','6-day outlook':'৬ দিনের পূর্বাভাস',Humidity:'আর্দ্রতা',Wind:'বাতাস',Rain:'বৃষ্টি',Search:'খুঁজুন','Enter city or village name':'শহর বা গ্রামের নাম লিখুন','Welcome back':'আবার স্বাগতম',Email:'ইমেল',Password:'পাসওয়ার্ড','Create an account':'অ্যাকাউন্ট তৈরি করুন','Get started free':'বিনামূল্যে শুরু করুন','Try crop advisory':'ফসলের পরামর্শ দেখুন','Explore →':'দেখুন →','How it works':'এটি কীভাবে কাজ করে','Thank You':'ধন্যবাদ'}
  };

  const css = `
  .agro-weather-scene{position:absolute;inset:0;overflow:hidden;pointer-events:none;border-radius:inherit;z-index:0}
  .agro-weather-scene .sun{position:absolute;width:170px;height:170px;right:7%;top:8%;border-radius:50%;background:radial-gradient(circle,#ffd45d 0 22%,rgba(244,168,51,.25) 42%,transparent 70%);box-shadow:0 0 70px rgba(244,168,51,.35);animation:agroSun 4s ease-in-out infinite}
  .agro-weather-scene .cloud{position:absolute;width:190px;height:55px;border-radius:50px;background:rgba(235,242,246,.75);top:18%;left:5%;animation:agroCloud 12s ease-in-out infinite}
  .agro-weather-scene .cloud:before,.agro-weather-scene .cloud:after{content:"";position:absolute;border-radius:50%;background:inherit}
  .agro-weather-scene .cloud:before{width:70px;height:70px;left:30px;top:-34px}.agro-weather-scene .cloud:after{width:90px;height:90px;right:25px;top:-48px}
  .agro-weather-scene .drop{position:absolute;top:-20%;left:calc(var(--i)*2.4%);width:2px;height:22px;background:linear-gradient(180deg,transparent,#9ddcff);transform:rotate(14deg);animation:agroRain .65s linear infinite;animation-delay:calc(var(--i)*-.04s)}
  @keyframes agroSun{50%{transform:scale(1.08)}} @keyframes agroCloud{50%{transform:translateX(60px)}} @keyframes agroRain{to{transform:translate(35px,140vh) rotate(14deg)}}
  `;
  const style=document.createElement('style'); style.textContent=css; document.head.appendChild(style);

  function translate(){
    const lang=localStorage.getItem('agronexus_lang')||'en';
    document.documentElement.lang=lang;
    const dict=translations[lang]||{};
    const root=document.getElementById('root'); if(!root) return;
    const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT), nodes=[]; let n;
    while(n=w.nextNode()) nodes.push(n);
    nodes.forEach(node=>{const raw=node.nodeValue, key=raw&&raw.trim(); if(!key||!dict[key]) return; node.nodeValue=raw.replace(key,dict[key]);});
    root.querySelectorAll('input,textarea,button,[aria-label],[title]').forEach(el=>{
      ['placeholder','aria-label','title'].forEach(a=>{const v=el.getAttribute(a);if(v&&dict[v])el.setAttribute(a,dict[v]);});
    });
  }

  function weather(){
    const root=document.getElementById('root'); if(!root) return;
    const heading=[...root.querySelectorAll('h1')].find(h=>h.textContent.includes('Weather Intelligence')||h.textContent.includes('मौसम जानकारी')||h.textContent.includes('हवामान माहिती')||h.textContent.includes('వాతావరణ సమాచారం')||h.textContent.includes('আবহাওয়া তথ্য'));
    if(!heading) return;
    const card=[...root.querySelectorAll('.bg-forest')].find(el=>el.textContent.includes('°C')&&el.textContent.includes('km/h'));
    if(!card||card.querySelector('.agro-weather-scene')) return;
    const txt=card.textContent.toLowerCase();
    const scene=document.createElement('div'); scene.className='agro-weather-scene';
    if(/rain|drizzle|storm|बारिश|पाऊस|వర్ష|বৃষ্টি/.test(txt)){
      for(let i=0;i<42;i++){const d=document.createElement('i');d.className='drop';d.style.setProperty('--i',i);scene.appendChild(d);}
    } else {
      const s=document.createElement('div');s.className='sun';scene.appendChild(s);
    }
    if(/cloud|overcast|fog|rain|drizzle|storm|बादल|ढग|మేఘ|মেঘ/.test(txt)){const c=document.createElement('div');c.className='cloud';scene.appendChild(c);}
    card.style.position='relative'; card.insertBefore(scene,card.firstChild);
    [...card.children].forEach((el,i)=>{if(i>0)el.style.position='relative';if(i>0)el.style.zIndex='1';});
  }

  let lastLang=localStorage.getItem('agronexus_lang')||'en';
  const observer=new MutationObserver(()=>{requestAnimationFrame(()=>{translate();weather();});});
  observer.observe(document.documentElement,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['placeholder','aria-label','title']});
  setInterval(()=>{const l=localStorage.getItem('agronexus_lang')||'en';if(l!==lastLang){lastLang=l;translate();}},250);
  translate(); weather();
})();