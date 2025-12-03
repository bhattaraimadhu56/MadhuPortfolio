import { useState, useEffect } from 'react';

interface Settings {
  [key: string]: any;
}

export function useSettings(): Settings {
  const [settings, setSettings] = useState<Settings>({});

  useEffect(() => {
    const loadSettings = async () => {
      try {
        //  to show website in github with //Madhu-Portfolio
        // const response = await fetch('/Madhu-Portfolio/settings.json');
        // To display website in custom doamin with domainname/...
        const response = await fetch('/settings.json');
        if (!response.ok) throw new Error('Failed to load settings');
        const data = await response.json();
        setSettings(data);
      } catch (error) {
        console.error('Failed to load settings:', error);
        setSettings({});
      }
    };

    loadSettings();
  }, []);

  return settings;
}
