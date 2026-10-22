import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export const LANGUAGES = [
  { code: 'en', label: 'English', speech: 'en-IN' },
  { code: 'hi', label: 'हिन्दी', speech: 'hi-IN' },
  { code: 'mr', label: 'मराठी', speech: 'mr-IN' },
  { code: 'te', label: 'తెలుగు', speech: 'te-IN' },
  { code: 'bn', label: 'বাংলা', speech: 'bn-IN' },
];

// Core UI translations. Unknown/long content safely falls back to English.
const DICT = {
  en: {},
  hi: {
    'Marketplace':'मार्केटप्लेस','Weather':'मौसम','Advisory':'सलाह','Disease Check':'रोग जाँच','Community':'समुदाय','Experts':'विशेषज्ञ','Schemes':'योजनाएँ','Premium':'प्रीमियम','Log in':'लॉग इन','Log out':'लॉग आउट','Get started':'शुरू करें','Dashboard':'डैशबोर्ड',
    'Farm Assistant':'फार्म असिस्टेंट','Ask me anything about farming':'खेती से जुड़ा कोई भी सवाल पूछें','Send':'भेजें','Weather Intelligence':'मौसम जानकारी','Live conditions':'वर्तमान स्थिति','Farming advisories':'कृषि सलाह','6-day outlook':'6-दिन का पूर्वानुमान','Humidity':'नमी','Wind':'हवा','Rain':'बारिश','Search':'खोजें','Enter city or village name':'शहर या गाँव का नाम दर्ज करें',
    'Welcome back':'वापसी पर स्वागत है','Email':'ईमेल','Password':'पासवर्ड','Create an account':'खाता बनाएँ','New to AgroNexus?':'AgroNexus पर नए हैं?','Get started free':'मुफ्त में शुरू करें','Try crop advisory':'फसल सलाह आज़माएँ','Explore →':'देखें →','How it works':'यह कैसे काम करता है','With gratitude':'आभार के साथ','Thank You':'धन्यवाद',
  },
  mr: {
    'Marketplace':'मार्केटप्लेस','Weather':'हवामान','Advisory':'सल्ला','Disease Check':'रोग तपासणी','Community':'समुदाय','Experts':'तज्ज्ञ','Schemes':'योजना','Premium':'प्रीमियम','Log in':'लॉग इन','Log out':'लॉग आउट','Get started':'सुरू करा','Dashboard':'डॅशबोर्ड',
    'Farm Assistant':'फार्म असिस्टंट','Ask me anything about farming':'शेतीबद्दल कोणताही प्रश्न विचारा','Send':'पाठवा','Weather Intelligence':'हवामान माहिती','Live conditions':'सध्याची स्थिती','Farming advisories':'शेतीसाठी सल्ले','6-day outlook':'६ दिवसांचा अंदाज','Humidity':'आर्द्रता','Wind':'वारा','Rain':'पाऊस','Search':'शोधा','Enter city or village name':'शहर किंवा गावाचे नाव लिहा',
    'Welcome back':'पुन्हा स्वागत आहे','Email':'ईमेल','Password':'पासवर्ड','Create an account':'खाते तयार करा','New to AgroNexus?':'AgroNexus वर नवीन आहात?','Get started free':'मोफत सुरू करा','Try crop advisory':'पीक सल्ला वापरा','Explore →':'पहा →','How it works':'हे कसे काम करते','With gratitude':'कृतज्ञतेसह','Thank You':'धन्यवाद',
  },
  te: {
    'Marketplace':'మార్కెట్‌ప్లేస్','Weather':'వాతావరణం','Advisory':'సలహా','Disease Check':'వ్యాధి తనిఖీ','Community':'కమ్యూనిటీ','Experts':'నిపుణులు','Schemes':'పథకాలు','Premium':'ప్రీమియం','Log in':'లాగిన్','Log out':'లాగ్ అవుట్','Get started':'ప్రారంభించండి','Dashboard':'డ్యాష్‌బోర్డ్',
    'Farm Assistant':'ఫార్మ్ అసిస్టెంట్','Ask me anything about farming':'వ్యవసాయం గురించి ఏ ప్రశ్నైనా అడగండి','Send':'పంపండి','Weather Intelligence':'వాతావరణ సమాచారం','Live conditions':'ప్రస్తుత పరిస్థితులు','Farming advisories':'వ్యవసాయ సూచనలు','6-day outlook':'6 రోజుల అంచనా','Humidity':'తేమ','Wind':'గాలి','Rain':'వర్షం','Search':'వెతకండి','Enter city or village name':'నగరం లేదా గ్రామం పేరు నమోదు చేయండి',
    'Welcome back':'తిరిగి స్వాగతం','Email':'ఈమెయిల్','Password':'పాస్‌వర్డ్','Create an account':'ఖాతా సృష్టించండి','New to AgroNexus?':'AgroNexus కి కొత్తవారా?','Get started free':'ఉచితంగా ప్రారంభించండి','Try crop advisory':'పంట సలహా ప్రయత్నించండి','Explore →':'చూడండి →','How it works':'ఇది ఎలా పనిచేస్తుంది','With gratitude':'కృతజ్ఞతలతో','Thank You':'ధన్యవాదాలు',
  },
  bn: {
    'Marketplace':'মার্কেটপ্লেস','Weather':'আবহাওয়া','Advisory':'পরামর্শ','Disease Check':'রোগ পরীক্ষা','Community':'কমিউনিটি','Experts':'বিশেষজ্ঞ','Schemes':'সরকারি প্রকল্প','Premium':'প্রিমিয়াম','Log in':'লগ ইন','Log out':'লগ আউট','Get started':'শুরু করুন','Dashboard':'ড্যাশবোর্ড',
    'Farm Assistant':'ফার্ম অ্যাসিস্ট্যান্ট','Ask me anything about farming':'কৃষি সম্পর্কে যেকোনো প্রশ্ন করুন','Send':'পাঠান','Weather Intelligence':'আবহাওয়া তথ্য','Live conditions':'বর্তমান অবস্থা','Farming advisories':'কৃষি পরামর্শ','6-day outlook':'৬ দিনের পূর্বাভাস','Humidity':'আর্দ্রতা','Wind':'বাতাস','Rain':'বৃষ্টি','Search':'খুঁজুন','Enter city or village name':'শহর বা গ্রামের নাম লিখুন',
    'Welcome back':'আবার স্বাগতম','Email':'ইমেল','Password':'পাসওয়ার্ড','Create an account':'অ্যাকাউন্ট তৈরি করুন','New to AgroNexus?':'AgroNexus-এ নতুন?','Get started free':'বিনামূল্যে শুরু করুন','Try crop advisory':'ফসলের পরামর্শ দেখুন','Explore →':'দেখুন →','How it works':'এটি কীভাবে কাজ করে','With gratitude':'কৃতজ্ঞতার সাথে','Thank You':'ধন্যবাদ',
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('agronexus_lang') || 'en');

  useEffect(() => {
    localStorage.setItem('agronexus_lang', language);
    document.documentElement.lang = language;
    document.documentElement.dir = 'ltr';
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    LANGUAGES,
    t: (key) => DICT[language]?.[key] || key,
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

export function translateText(text, language) {
  return DICT[language]?.[text] || text;
}
