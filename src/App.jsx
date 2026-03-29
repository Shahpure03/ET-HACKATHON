import React, { useState } from 'react';
import { 
  User, 
  ChevronRight, 
  ArrowLeft, 
  Languages, 
  Headphones, 
  MonitorPlay,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import './App.css';

// Mock Data
const NEWS_DATA = [
  {
    id: '1',
    title: 'Middle East Conflict Impacts Oil Supply',
    hindiTitle: 'मध्य पूर्व संघर्ष का तेल आपूर्ति पर प्रभाव',
    summary: 'Rising tensions disrupt global oil trade routes and production.',
    hindiSummary: 'बढ़ते तनाव से वैश्विक तेल व्यापार मार्ग और उत्पादन बाधित हो रहे हैं।',
    image: '/oil.png',
    audioSrc: '/news1.wav',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-animation-of-futuristic-devices-and-a-robot-3142-large.mp4',
    isImportant: true,
    impactChain: [
      { text: 'Conflict', hindiText: 'संघर्ष', direction: 'neutral' },
      { text: 'Oil supply', hindiText: 'तेल आपूर्ति', direction: 'down' },
      { text: 'Oil prices', hindiText: 'तेल की कीमतें', direction: 'up' },
      { text: 'India import cost', hindiText: 'आयात लागत', direction: 'up' },
      { text: 'Fuel prices', hindiText: 'ईंधन की कीमतें', direction: 'up' },
      { text: 'Inflation', hindiText: 'महंगाई', direction: 'up' }
    ],
    personalImpact: {
      student: [
        { en: 'Travel costs may increase', hi: 'यात्रा की लागत बढ़ सकती है' },
        { en: 'Daily expenses may rise', hi: 'दैनिक खर्च बढ़ सकते हैं' },
        { en: 'Job market competition may increase', hi: 'नौकरी बाजार में प्रतिस्पर्धा बढ़ सकती है' }
      ],
      investor: [
        { en: 'Energy stocks may rally temporarily', hi: 'ऊर्जा शेयरों में अस्थायी तेजी आ सकती है' },
        { en: 'Auto sector margins could shrink', hi: 'ऑटो सेक्टर का मार्जिन कम हो सकता है' },
        { en: 'Interest rate cuts might be delayed', hi: 'ब्याज दर में कटौती में देरी हो सकती है' }
      ],
      general: [
        { en: 'Daily commute costs likely to rise', hi: 'रोजमर्रा की यात्रा की लागत बढ़ने की संभावना है' },
        { en: 'Household grocery bills may increase', hi: 'किराने का बिल बढ़ सकता है' },
        { en: 'Imported electronics prices could hike', hi: 'विदेशी इलेक्ट्रॉनिक्स की कीमतें बढ़ सकती हैं' }
      ]
    },
    whatToDo: {
      student: [
        { en: 'Focus on skill building (DSA, projects)', hi: 'कौशल निर्माण पर ध्यान दें' },
        { en: 'Explore emerging tech (AI)', hi: 'उभरती तकनीक का अन्वेषण करें' },
        { en: 'Consider global opportunities', hi: 'वैश्विक अवसरों पर विचार करें' }
      ],
      investor: [
        { en: 'Hedge portfolio with energy ETFs', hi: 'ऊर्जा ETF के साथ पोर्टफोलियो हेज करें' },
        { en: 'Re-evaluate high-debt company stocks', hi: 'उच्च-ऋण कंपनी शेयरों का पुनर्मूल्यांकन करें' },
        { en: 'Maintain emergency cash reserves', hi: 'आपातकालीन नकद बनाए रखें' }
      ],
      general: [
        { en: 'Review monthly transportation budget', hi: 'मासिक परिवहन बजट की समीक्षा करें' },
        { en: 'Consider energy-efficient alternatives', hi: 'ऊर्जा-कुशल विकल्पों पर विचार करें' },
        { en: 'Postpone non-essential large purchases', hi: 'गैर-जरूरी बड़ी खरीदारी टाल दें' }
      ]
    },
    watchNext: [
      { en: 'Government fuel policy updates', hi: 'सरकार की ईंधन नीति के अपडेट' },
      { en: 'Central bank decisions', hi: 'केंद्रीय बैंक के फैसले' },
      { en: 'Global oil production changes', hi: 'वैश्विक तेल उत्पादन में बदलाव' }
    ],
    confidence: { en: 'Medium', hi: 'मध्यम' },
    disclaimer: { 
      en: 'Based on historical patterns. Actual outcomes may vary depending on policy decisions.',
      hi: 'ऐतिहासिक स्वरूपों पर आधारित। वास्तविक परिणाम नीतिगत निर्णयों पर निर्भर कर सकते हैं।'
    }
  },
  {
    id: '2',
    title: 'AI Startups Disrupt Job Market',
    hindiTitle: 'AI स्टार्ट-अप ने रोजगार बाजार में हलचल मचाई',
    summary: 'Generative AI adoption accelerates automation across major tech firms.',
    hindiSummary: 'जनरेटिव AI को अपनाने से प्रमुख टेक कंपनियों में ऑटोमेशन में तेजी।',
    image: '/ai.png',
    audioSrc: '', // default fake audio fallback
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-network-of-connections-3151-large.mp4',
    isImportant: false,
    impactChain: [
      { text: 'AI Adoption', hindiText: 'AI अपनाना', direction: 'up' },
      { text: 'Routine Tasks', hindiText: 'नियमित कार्य', direction: 'down' },
      { text: 'Productivity', hindiText: 'उत्पादकता', direction: 'up' },
      { text: 'Tech Hiring', hindiText: 'तकनीकी भर्तियां', direction: 'neutral' },
      { text: 'New Roles', hindiText: 'नई भूमिकाएं', direction: 'up' }
    ],
    personalImpact: {
      student: [
        { en: 'Traditional entry-level roles shifting', hi: 'पारंपरिक प्रवेश-स्तर की भूमिकाएं बदल रही हैं' },
        { en: 'Premium on AI-assisted coding skills', hi: 'AI-सहायता कोडिंग कौशल पर प्रीमियम' },
        { en: 'Need for cross-disciplinary knowledge', hi: 'अंतःविषय ज्ञान की आवश्यकता है' }
      ],
      investor: [
        { en: 'Cloud infrastructure providers surge', hi: 'क्लाउड इंफ्रास्ट्रक्चर प्रदाताओं में उछाल' },
        { en: 'Software margins expected to improve', hi: 'सॉफ्टवेयर मार्जिन में सुधार की उम्मीद है' },
        { en: 'Legacy B2B services face risk', hi: 'पुरानी B2B सेवाओं को खतरा' }
      ],
      general: [
        { en: 'Need to upskill in current roles', hi: 'वर्तमान भूमिकाओं में कौशल बढ़ाने की आवश्यकता है' },
        { en: 'New productivity tools available', hi: 'नए उत्पादकता उपकरण उपलब्ध हैं' },
        { en: 'Workplace dynamics evolving rapidly', hi: 'कार्यस्थल की गतिशीलता तेजी से विकसित हो रही है' }
      ]
    },
    whatToDo: {
      student: [
        { en: 'Learn prompt engineering', hi: 'प्रॉम्प्ट इंजीनियरिंग सीखें' },
        { en: 'Build AI-integrated projects', hi: 'AI-एकीकृत प्रोजेक्ट बनाएं' },
        { en: 'Focus on complex problem solving', hi: 'जटिल समस्याओं को हल करने पर ध्यान दें' }
      ],
      investor: [
        { en: 'Evaluate AI hardware supply chain', hi: 'AI हार्डवेयर आपूर्ति श्रृंखला का मूल्यांकन करें' },
        { en: 'Identify AI application leaders', hi: 'AI अनुप्रयोग नेताओं की पहचान करें' },
        { en: 'Monitor regulatory landscape', hi: 'विनियामक परिदृश्य की निगरानी करें' }
      ],
      general: [
        { en: 'Experiment with AI writing tools', hi: 'AI राइटिंग टूल्स के साथ प्रयोग करें' },
        { en: 'Stay updated on industry shifts', hi: 'इंडस्ट्री में हो रहे बदलावों से अपडेट रहें' },
        { en: 'Enhance interpersonal skills', hi: 'पारस्परिक कौशल को बढ़ाएं' }
      ]
    },
    watchNext: [
      { en: 'Major tech earnings reports', hi: 'प्रमुख टेक कंपनियों की आय रिपोर्ट' },
      { en: 'AI regulation bills in parliament', hi: 'संसद में AI विनियमन विधेयक' },
      { en: 'Enterprise adoption metrics', hi: 'उद्यम कंपनियों में AI अपनाने का मेट्रिक्स' }
    ],
    confidence: { en: 'High', hi: 'उच्च' },
    disclaimer: {
      en: 'Based on current corporate hiring trends and technology investment patterns.',
      hi: 'वर्तमान कॉर्पोरेट हायरिंग रुझान और प्रौद्योगिकी निवेश पैटर्न पर आधारित।'
    }
  }
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('landing'); // 'landing', 'profile', 'feed', 'insight'
  const [profile, setProfile] = useState(null);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [lang, setLang] = useState('en');

  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.slice(1);
      if (['landing', 'profile', 'feed', 'insight'].includes(hash)) {
        setCurrentScreen(hash);
      } else {
        window.location.hash = 'landing';
        setCurrentScreen('landing');
      }
    };
    
    // Check initial hash
    if (!window.location.hash) {
      window.location.hash = 'landing';
    } else {
      handleHash();
    }

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigate = (screen) => {
    window.location.hash = screen;
    setCurrentScreen(screen);
  };

  const handleProfileSelect = (selectedProfile) => {
    setProfile(selectedProfile);
    navigate('feed');
  };

  const handleArticleSelect = (articleId) => {
    setSelectedArticleId(articleId);
    navigate('insight');
  };

  return (
    <div className="app-container">
      {currentScreen === 'landing' && (
        <LandingScreen onEnter={() => navigate('profile')} lang={lang} />
      )}
      {currentScreen === 'profile' && (
        <ProfileSelection onSelect={handleProfileSelect} lang={lang} />
      )}
      {currentScreen === 'feed' && (
        <FeedScreen 
          profile={profile} 
          lang={lang}
          onProfileClick={() => navigate('profile')}
          onArticleClick={handleArticleSelect} 
        />
      )}
      {currentScreen === 'insight' && (
        <InsightScreen 
          articleId={selectedArticleId} 
          profile={profile}
          lang={lang}
          setLang={setLang}
          onBack={() => navigate('feed')} 
        />
      )}
    </div>
  );
}

function LandingScreen({ onEnter, lang }) {
  return (
    <div className="fade-in flex flex-col items-center justify-center p-4" style={{ minHeight: '100vh', background: 'var(--primary-color)', color: 'white' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '1rem', fontFamily: 'Georgia, serif' }}>
          ET Insights AI
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
          {lang === 'en' ? 'Smarter News For A Faster World' : 'तेज़ दुनिया के लिए अधिक स्मार्ट समाचार'}
        </p>
      </div>
      
      <button 
        onClick={onEnter}
        style={{
          background: 'white',
          color: 'var(--primary-color)',
          padding: '1rem 2.5rem',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          transition: 'transform 0.2s',
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {lang === 'en' ? 'Get Started' : 'शुरू करें'}
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

function ProfileSelection({ onSelect, lang }) {
  return (
    <div className="fade-in flex flex-col items-center justify-center p-4" style={{ minHeight: '100vh' }}>
      <h1 className="text-2xl mb-1 text-center">{lang === 'en' ? 'Welcome' : 'स्वागत है'}</h1>
      <p className="text-muted mb-4 text-center">{lang === 'en' ? 'Choose how you want your news experience' : 'चुनें कि आप अपना तकनीकी समाचार अनुभव कैसे चाहते हैं'}</p>
      
      <div className="flex flex-col gap-3" style={{ width: '100%', maxWidth: '300px' }}>
        <button className="profile-card" onClick={() => onSelect('student')}>
          <span>{lang === 'en' ? 'Student' : 'छात्र'}</span>
          <span style={{ fontSize: '1.5rem' }}>👩‍🎓</span>
        </button>
        <button className="profile-card" onClick={() => onSelect('investor')}>
          <span>{lang === 'en' ? 'Investor' : 'निवेशक'}</span>
          <span style={{ fontSize: '1.5rem' }}>💼</span>
        </button>
        <button className="profile-card" onClick={() => onSelect('general')}>
          <span>{lang === 'en' ? 'General' : 'सामान्य'}</span>
          <span style={{ fontSize: '1.5rem' }}>🌍</span>
        </button>
      </div>
    </div>
  );
}

function FeedScreen({ profile, lang, onProfileClick, onArticleClick }) {
  const importantNews = NEWS_DATA.find(n => n.isImportant);
  const forYouNews = NEWS_DATA.filter(n => !n.isImportant);

  return (
    <div className="fade-in">
      <header className="header">
        <div>
          <div className="logo-text">ET <span>AI</span></div>
          <div className="tagline">{lang === 'en' ? 'Understand the News' : 'खबरों को समझें'}</div>
        </div>
        <button className="profile-icon" onClick={onProfileClick} aria-label="Change Profile">
          <User size={20} />
        </button>
      </header>

      <main className="p-4">
        {importantNews && (
          <section className="mb-4">
            <h2 className="section-title">{lang === 'en' ? 'Important Now' : 'अब महत्वपूर्ण'}</h2>
            <div className="news-card" onClick={() => onArticleClick(importantNews.id)}>
              <h3>{lang === 'en' ? importantNews.title : importantNews.hindiTitle}</h3>
              <p>{lang === 'en' ? importantNews.summary : importantNews.hindiSummary}</p>
            </div>
          </section>
        )}

        <section>
          <h2 className="section-title">{lang === 'en' ? 'For You' : 'आपके लिए'}</h2>
          <div className="news-grid">
            {forYouNews.map(news => (
              <div key={news.id} className="news-card" onClick={() => onArticleClick(news.id)}>
                <h3>{lang === 'en' ? news.title : news.hindiTitle}</h3>
                <p>{lang === 'en' ? news.summary : news.hindiSummary}</p>
              </div>
            ))}
            {/* Duplicated for visual appeal if only 1 item */}
            <div className="news-card" onClick={() => onArticleClick(NEWS_DATA[0].id)}>
              <h3>{lang === 'en' ? 'Tech Giants Announce New Semiconductor Collaboration' : 'तकनीकी दिग्गजों ने सहयोग की घोषणा की'}</h3>
              <p>{lang === 'en' ? 'Joint venture aims to reduce reliance on existing global supply chains.' : 'संयुक्त उद्यम का उद्देश्य आपूर्ति श्रृंखला पर निर्भरता कम करना है।'}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function InsightScreen({ articleId, profile, lang, setLang, onBack }) {
  const article = NEWS_DATA.find(n => n.id === articleId) || NEWS_DATA[0];
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [showVideo, setShowVideo] = React.useState(false);
  const audioRef = React.useRef(null);

  const renderDirectionIcon = (direction) => {
    switch(direction) {
      case 'up': return <ArrowUp size={24} className="text-primary" />;
      case 'down': return <ArrowDown size={24} style={{ color: '#1b5e20' }} />;
      default: return <Minus size={24} className="text-muted" />;
    }
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'hi' : 'en');
  };

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fade-in bg-white" style={{ minHeight: '100vh', paddingBottom: '2rem' }}>
      <header className="insight-header" style={{ flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <button className="back-btn" onClick={onBack} aria-label="Go Back">
            <ArrowLeft size={24} />
          </button>
          <h1 className="insight-title">{lang === 'en' ? article.title : article.hindiTitle}</h1>
        </div>
        <p className="text-muted mt-2" style={{ paddingLeft: '2.5rem' }}>
          {lang === 'en' ? article.summary : article.hindiSummary}
        </p>
      </header>

      {/* Multimodal Actions */}
      <div className="multimodal-bar border-b" style={{ flexWrap: 'wrap' }}>
        <button className="action-btn" onClick={toggleLanguage}>
          <Languages size={18} />
          {lang === 'en' ? 'Translate to Hindi 🇮🇳' : 'आंग्ल भाषा में बदलें 🇬🇧'}
        </button>
        <button className="action-btn" onClick={toggleAudio}>
          <Headphones size={18} />
          {isPlaying ? (lang === 'en' ? 'Pause Audio' : 'ऑडियो रोकें') : (lang === 'en' ? 'Listen' : 'सुनें')}
        </button>
        <button className="action-btn" onClick={() => setShowVideo(!showVideo)}>
          <MonitorPlay size={18} />
          {lang === 'en' ? 'Watch' : 'वीडियो देखें'}
        </button>
      </div>

      {/* Hidden Audio Element for Demo - Uses the PowerShell TTS generated audio when watching Article 1! */}
      <audio ref={audioRef} src={article.audioSrc} onEnded={() => setIsPlaying(false)} />

      {/* Conditional Video Embed container */}
      {showVideo && (
        <div className="insight-section" style={{ background: 'black', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <p style={{ color: 'white', fontSize: '0.8rem', opacity: 0.8 }}>
            {lang === 'en' ? 'AI Generated News Summary' : 'AI जनरेटेड समाचार सारांश'}
          </p>
          <video style={{ width: '100%', maxWidth: '600px', borderRadius: '8px' }} controls autoPlay loop>
            <source src={article.videoSrc} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
        </div>
      )}

      {/* Featured News Image */}
      {article.image && !showVideo && (
        <div style={{ width: '100%', height: 'auto', background: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
          <img src={article.image} alt={lang === 'en' ? article.title : article.hindiTitle} style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} />
        </div>
      )}

      {/* Impact Chain */}
      <section className="insight-section">
        <h2 className="text-xl mb-3 font-bold" style={{ color: 'var(--primary-color)' }}>
          {lang === 'en' ? 'Chain Reaction' : 'प्रतिक्रिया श्रृंखला'}
        </h2>
        <div className="impact-chain">
          {article.impactChain.map((node, i) => (
            <div key={i} className="impact-node">
              <div className={`node-dot ${node.direction}`}>
                {renderDirectionIcon(node.direction)}
              </div>
              <div className="node-text">
                {lang === 'en' ? node.text : node.hindiText}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Personal Impact */}
      <section className="insight-section">
        <h2 className="text-xl mb-3 font-bold">
          {lang === 'en' ? 'What this means for you' : 'आपके लिए इसका क्या अर्थ है'}
        </h2>
        <p className="text-sm text-muted mb-2 uppercase tracking-wide font-bold">
          ({profile} {lang === 'en' ? 'profile' : 'प्रोफ़ाइल'})
        </p>
        <ul className="custom-list">
          {article.personalImpact[profile].map((impact, i) => (
            <li key={i}>{lang === 'en' ? impact.en : impact.hi}</li>
          ))}
        </ul>
      </section>

      {/* What to do next */}
      <section className="insight-section" style={{ background: '#fafafa' }}>
        <h2 className="text-xl mb-3 font-bold">
          {lang === 'en' ? 'What you can do next' : 'आप आगे क्या कर सकते हैं'}
        </h2>
        <ul className="custom-list">
          {article.whatToDo[profile].map((action, i) => (
            <li key={i}>{lang === 'en' ? action.en : action.hi}</li>
          ))}
        </ul>
      </section>

      {/* What to watch next */}
      <section className="insight-section border-b-0">
        <h2 className="text-xl mb-3 font-bold">
          {lang === 'en' ? 'What to watch next' : 'आगे क्या देखना है'}
        </h2>
        <div className="flex flex-col gap-2">
          {article.watchNext.map((watch, i) => (
            <div key={i} className="flex items-center gap-2 text-sm p-3 border rounded shadow-sm bg-white">
              <ChevronRight size={16} className="text-primary" />
              <span className="font-medium">{lang === 'en' ? watch.en : watch.hi}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Confidence & Disclaimer */}
      <section className="disclaimer text-sm text-muted">
        <div className="confidence-badge">
          {lang === 'en' ? 'Confidence' : 'सटीकता'}: {lang === 'en' ? article.confidence.en : article.confidence.hi}
        </div>
        <p>{lang === 'en' ? article.disclaimer.en : article.disclaimer.hi}</p>
      </section>
    </div>
  );
}
