import { useEffect, useRef, useState } from 'react';
import { api } from '../api/client';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';

const UI_TEXT = {
  en: {
    title: 'Farm Assistant',
    subtitle: 'Ask me anything about farming',
    placeholder: 'Type your farming question...',
    send: 'Send',
    greeting:
      "Namaste! 🌾 I'm your Farm Assistant. Ask me about crops, soil, weather, pests, government schemes or anything related to farming. You can also type, speak using the mic, or listen to my answers.",
    errorGeneric: "Sorry, I couldn't connect right now. Please try again in a moment.",
    mic: 'Speak your question',
    listening: 'Listening... speak now',
    listen: 'Listen to this answer',
    stopListening: 'Stop reading',
    micUnsupported: 'Voice input is not supported in this browser.',
  },
  hi: {
    title: 'फार्म असिस्टेंट',
    subtitle: 'खेती से जुड़ा कोई भी सवाल पूछें',
    placeholder: 'अपना सवाल यहाँ लिखें...',
    send: 'भेजें',
    greeting:
      'नमस्ते! 🌾 मैं आपका फार्म असिस्टेंट हूँ। फसल, मिट्टी, मौसम, कीट या सरकारी योजनाओं से जुड़ा कोई भी सवाल पूछें। आप टाइप कर सकते हैं, माइक से बोल सकते हैं, या जवाब सुन भी सकते हैं।',
    errorGeneric: 'माफ़ कीजिए, अभी कनेक्ट नहीं हो पाया। कृपया थोड़ी देर बाद फिर से कोशिश करें।',
    mic: 'बोलकर सवाल पूछें',
    listening: 'सुन रहा हूँ... अभी बोलिए',
    listen: 'जवाब सुनें',
    stopListening: 'रोकें',
    micUnsupported: 'इस ब्राउज़र में आवाज़ से टाइप करने की सुविधा उपलब्ध नहीं है।',
  },
  mr: {
    title: 'फार्म असिस्टंट',
    subtitle: 'शेतीशी संबंधित कोणताही प्रश्न विचारा',
    placeholder: 'तुमचा प्रश्न इथे लिहा...',
    send: 'पाठवा',
    greeting:
      'नमस्कार! 🌾 मी तुमचा फार्म असिस्टंट आहे. पीक, माती, हवामान, कीड किंवा सरकारी योजनांबद्दल विचारा. तुम्ही टाइप करू शकता, मायकने बोलू शकता, किंवा उत्तर ऐकू शकता.',
    errorGeneric: 'क्षमस्व, सध्या कनेक्ट होऊ शकलो नाही. कृपया पुन्हा प्रयत्न करा.',
    mic: 'बोलून प्रश्न विचारा',
    listening: 'ऐकत आहे... आता बोला',
    listen: 'उत्तर ऐका',
    stopListening: 'थांबवा',
    micUnsupported: 'या ब्राउझरमध्ये आवाजाने टाइप करण्याची सुविधा नाही.',
  },
  te: {
    title: 'ఫార్మ్ అసిస్టెంట్',
    subtitle: 'వ్యవసాయానికి సంబంధించిన ఏ ప్రశ్న అయినా అడగండి',
    placeholder: 'మీ ప్రశ్నను ఇక్కడ టైప్ చేయండి...',
    send: 'పంపండి',
    greeting:
      'నమస్కారం! 🌾 నేను మీ ఫార్మ్ అసిస్టెంట్‌ని. పంటలు, నేల, వాతావరణం, పురుగులు లేదా ప్రభుత్వ పథకాల గురించి అడగండి. మీరు టైప్ చేయవచ్చు, మైక్‌తో మాట్లాడవచ్చు, లేదా సమాధానం వినవచ్చు.',
    errorGeneric: 'క్షమించండి, ఇప్పుడు కనెక్ట్ కాలేకపోయాను. దయచేసి మళ్లీ ప్రయత్నించండి.',
    mic: 'మాట్లాడి ప్రశ్న అడగండి',
    listening: 'వింటున్నాను... ఇప్పుడు మాట్లాడండి',
    listen: 'సమాధానం వినండి',
    stopListening: 'ఆపండి',
    micUnsupported: 'ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ అందుబాటులో లేదు.',
  },
  bn: {
    title: 'ফার্ম অ্যাসিস্ট্যান্ট',
    subtitle: 'কৃষি সম্পর্কিত যেকোনো প্রশ্ন জিজ্ঞাসা করুন',
    placeholder: 'আপনার প্রশ্ন এখানে লিখুন...',
    send: 'পাঠান',
    greeting:
      'নমস্কার! 🌾 আমি আপনার ফার্ম অ্যাসিস্ট্যান্ট। ফসল, মাটি, আবহাওয়া, পোকামাকড় বা সরকারি প্রকল্প নিয়ে জিজ্ঞাসা করুন। আপনি টাইপ করতে পারেন, মাইক দিয়ে বলতে পারেন, অথবা উত্তর শুনতে পারেন।',
    errorGeneric: 'দুঃখিত, এই মুহূর্তে সংযোগ করা যায়নি। একটু পরে আবার চেষ্টা করুন।',
    mic: 'বলে প্রশ্ন করুন',
    listening: 'শুনছি... এখন বলুন',
    listen: 'উত্তর শুনুন',
    stopListening: 'থামান',
    micUnsupported: 'এই ব্রাউজারে ভয়েস ইনপুট সমর্থিত নয়।',
  },
};

// One message bubble. Assistant replies get a "listen" (text-to-speech) button
// so users who can't read well can hear the answer instead.
function MessageBubble({ role, content, speechLang, t }) {
  const [speaking, setSpeaking] = useState(false);

  const toggleSpeak = () => {
    if (!('speechSynthesis' in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(content);
    utter.lang = speechLang;
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utter);
    setSpeaking(true);
  };

  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-end gap-1.5 max-w-[85%] ${role === 'user' ? 'flex-row-reverse' : ''}`}>
        <div
          className={`px-4 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
            role === 'user'
              ? 'bg-leaf-600 text-cream rounded-2xl rounded-br-sm'
              : 'bg-white border border-forest-100 text-ink rounded-2xl rounded-bl-sm shadow-sm'
          }`}
        >
          {content}
        </div>
        {role === 'assistant' && (
          <button
            onClick={toggleSpeak}
            aria-label={speaking ? t.stopListening : t.listen}
            title={speaking ? t.stopListening : t.listen}
            className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm transition-colors ${
              speaking ? 'bg-leaf-600 text-cream' : 'bg-forest-50 text-forest-400 hover:bg-forest-100'
            }`}
          >
            {speaking ? '⏸' : '🔊'}
          </button>
        )}
      </div>
    </div>
  );
}

export default function FarmAssistant() {
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [micSupported, setMicSupported] = useState(true);
  const [micError, setMicError] = useState('');
  const scrollRef = useRef(null);
  const recognitionRef = useRef(null);

  const t = UI_TEXT[language] || UI_TEXT.en;
  const speechLang = (LANGUAGES.find((l) => l.code === language) || LANGUAGES[0]).speech;

  // Reset with a fresh greeting whenever the language changes.
  useEffect(() => {
    setMessages([{ role: 'assistant', content: t.greeting }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  // Stop any ongoing speech + recognition when panel closes.
  useEffect(() => {
    if (!open) {
      window.speechSynthesis?.cancel();
      recognitionRef.current?.stop();
      setListening(false);
    }
  }, [open]);

  const sendMessage = async (overrideText) => {
    const text = (overrideText ?? input).trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const history = nextMessages.slice(-10).map((m) => ({ role: m.role, content: m.content }));
      const data = await api.post('/assistant/chat', { message: text, language, history });
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', content: t.errorGeneric }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Voice input: mic button fills the text box using the browser's built-in
  // speech recognition, in the currently selected language.
  const toggleMic = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicSupported(false);
      setMicError(t.micUnsupported);
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = speechLang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript || '';
      if (transcript) {
        setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
      }
    };
    recognition.onerror = () => {
      setListening(false);
      setMicError(t.micUnsupported);
    };
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    setMicError('');
    setListening(true);
    recognition.start();
  };

  return (
    <div className="fixed bottom-6 right-5 md:right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="assistant-panel-in w-[350px] max-w-[92vw] h-[520px] max-h-[78vh] bg-cream rounded-3xl shadow-2xl border border-forest-100 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-forest-600 text-cream px-4 py-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="assistant-leaf-sway text-xl">🌿</span>
              <div className="min-w-0">
                <p className="font-display font-semibold text-sm leading-tight truncate">{t.title}</p>
                <p className="text-[11px] text-cream/70 truncate">{t.subtitle}</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="w-7 h-7 rounded-full hover:bg-cream/10 flex items-center justify-center text-cream/80 hover:text-cream transition-colors shrink-0"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-cream-200/40">
            {messages.map((m, i) => (
              <MessageBubble key={i} role={m.role} content={m.content} speechLang={speechLang} t={t} />
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-forest-100 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5 shadow-sm">
                  <span className="assistant-typing-dot w-1.5 h-1.5 rounded-full bg-forest-400 inline-block" />
                  <span className="assistant-typing-dot w-1.5 h-1.5 rounded-full bg-forest-400 inline-block" />
                  <span className="assistant-typing-dot w-1.5 h-1.5 rounded-full bg-forest-400 inline-block" />
                </div>
              </div>
            )}
            {micError && (
              <div className="text-center text-[11px] text-soil-600 bg-soil-100 border border-soil/30 rounded-xl px-3 py-2">
                {micError}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-forest-100 p-3 flex items-end gap-2 bg-white">
            {micSupported && (
              <button
                onClick={toggleMic}
                aria-label={listening ? t.listening : t.mic}
                title={listening ? t.listening : t.mic}
                className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-colors ${
                  listening
                    ? 'bg-red-500 text-cream animate-pulse'
                    : 'bg-forest-50 text-forest-500 hover:bg-forest-100'
                }`}
              >
                {listening ? '⏺' : '🎤'}
              </button>
            )}
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={listening ? t.listening : t.placeholder}
              className="flex-1 resize-none rounded-2xl border border-forest-100 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-leaf-400 max-h-24"
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              aria-label={t.send}
              className="w-10 h-10 shrink-0 rounded-full bg-leaf-600 hover:bg-leaf-700 disabled:opacity-40 disabled:hover:bg-leaf-600 text-cream flex items-center justify-center transition-colors"
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Floating action button — logo & animation unchanged */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t.title}
        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-leaf-600 to-forest-600 shadow-xl shadow-forest-900/30 flex items-center justify-center hover:scale-105 transition-transform"
      >
        <span className="assistant-fab-ring absolute inset-0 rounded-full border-2 border-leaf-400" />
        <span className="assistant-leaf-sway text-2xl">{open ? '💬' : '🌾'}</span>
      </button>
    </div>
  );
}
