'use client'

const IpInfoApiToken = process.env.IPINFO_API_TOKEN

export const getUserLocation = async (): Promise<{ country: string; region: string }> => {
  try {
    const response = await fetch(`https://ipinfo.io/json?token=${IpInfoApiToken}`);
    const data = await response.json();
    return { country: data.country, region: data.region };
  } catch (error) {
    console.error('Error fetching location:', error);
    return { country: 'DEFAULT', region: '' };
  }
};