'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function getDeviceType() {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'Tablet';
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return 'Mobile';
  return 'Desktop';
}

function getBrowser() {
  const ua = navigator.userAgent;
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('SamsungBrowser')) return 'Samsung Internet';
  if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
  if (ua.includes('Edge') || ua.includes('Edg')) return 'Edge';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  return 'Other';
}

function getOS() {
  const ua = navigator.userAgent;
  if (ua.includes('Win')) return 'Windows';
  if (ua.includes('Mac')) return 'MacOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('like Mac')) return 'iOS';
  return 'Other';
}

export function useAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Generate a simple session ID if one doesn't exist
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('analytics_session_id', sessionId);
    }

    // Don't track admin routes
    if (pathname?.startsWith('/admin') || pathname?.startsWith('/auth')) {
      return;
    }

    const trackPageview = async () => {
      try {
        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            path: pathname,
            referrer: document.referrer || 'Direct',
            deviceType: getDeviceType(),
            browser: getBrowser(),
            os: getOS(),
            country: 'Unknown', // Typically requires IP geolocation service
          }),
        });
      } catch (error) {
        console.error('Analytics tracking failed', error);
      }
    };

    trackPageview();
  }, [pathname]);

  return null;
}
