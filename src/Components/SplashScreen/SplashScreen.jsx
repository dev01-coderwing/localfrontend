import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SUPPORTED_LANGS = ['en', 'es', 'fr', 'de', 'it', 'ja', 'ko', 'pt', 'zh'];

export default function SplashScreen() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/LanguagePage'), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => {
        const lang = (data.languages || '').split(',')[0].split('-')[0];
        if (SUPPORTED_LANGS.includes(lang)) {
          i18n.changeLanguage(lang);
        }
      })
      .catch(() => {});
  }, [i18n]);

  return (
    <div
      className="w-screen h-screen flex flex-col justify-center items-center select-none"
      style={{
        background: 'linear-gradient(180deg, var(--linear-1) 0%, var(--linear-2) 100%)',
      }}
    >
      <style>{`
        @keyframes splashLogoIn {
          from { opacity: 0; transform: scale(0.8); }
          to   { opacity: 1; transform: scale(1);   }
        }
        @keyframes splashFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      <img
        src="/Image/iameetyou.png" 
        alt="IAMeetYou Logo"
        style={{
          width: '130px',
          height: 'auto',
          animation: 'splashLogoIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        }}
      />
      <img
        src="/Image/iameetyou.png"
        alt="IAMeetYou Main"
        style={{
          width: '220px',
          height: 'auto',
          animation: 'splashLogoIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        }}
        className='pt-5'
      />

      <p
        style={{
          color: 'var(--text-dim)',
          marginTop: '8px',
          fontSize: '12px',
          letterSpacing: '3px',
          fontFamily: 'sans-serif',
          fontWeight: '300',
          textTransform: 'uppercase',
          opacity: 0,
          animation: 'splashFadeIn 0.7s ease-out 1.3s forwards',
        }}
      >
        {t('splash.tagline')}
      </p>

      <p style={{
          color: 'white',
          fontFamily: 'sans-serif',
          fontSize: '16px',
          fontWeight: '300',
          marginTop: '10px',
          letterSpacing: '2px',
          opacity: 0,
          animation: 'splashFadeIn 0.7s ease-out 1.5s forwards'
        }}>
        CONNECTEZ DIFFÉREMMENT
      </p>
    </div>
  );
}
