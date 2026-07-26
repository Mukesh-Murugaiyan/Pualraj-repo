import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Electra Weighing Systems (EWS)',
    short_name: 'EWS Weighing',
    description: 'High-accuracy industrial weighing machines, strain gauge load cells, dynamic checkweighers, and SPM automation.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050b14',
    theme_color: '#f97316',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
