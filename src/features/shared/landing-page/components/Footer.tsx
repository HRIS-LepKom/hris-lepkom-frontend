import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const footerLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Tentang', href: '#tentang' },
  { label: 'Jadwal', href: '#jadwal' },
  { label: 'Tahapan', href: '#tahapan' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Kontak', href: '#kontak' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0C2A17] text-white">
      {/* Ribbon warna */}
      <div className="flex h-1 w-full" aria-hidden>
        <div className="flex-1 bg-lepkom-green" />
        <div className="flex-1 bg-amber-400" />
        <div className="flex-1 bg-sky-400" />
        <div className="flex-1 bg-violet-500" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-lepkom-green to-emerald-600 rounded-lg flex items-center justify-center p-1.5 shadow-lg shadow-black/20">
                <img
                  src="/assets/images/logo.svg"
                  alt="LepKOM Logo"
                  className="w-full h-full object-contain brightness-0 invert"
                />
              </div>
              <div className="leading-tight">
                <span className="block text-base font-bold text-white">HRIS LepKOM</span>
                <span className="block text-xs text-emerald-200/70">
                  Open Recruitment Calon Asisten 2026
                </span>
              </div>
            </div>
            <p className="text-xs text-emerald-100/50 max-w-xs text-center md:text-left">
              Sistem Informasi Sumber Daya Manusia Lembaga Pengembangan Komputer Universitas Gunadarma.
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-emerald-100/70 hover:text-amber-300 hover:border-b border-amber-300 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col items-center md:items-end gap-2 text-xs text-emerald-100/50">
            <span className="inline-flex items-center gap-1.5 text-emerald-200/80 font-medium">
              <Sparkles className="h-3.5 w-3.5" />
              Periode 2026
            </span>
            <div className="flex items-center space-x-4">
              <a
                href="https://lepkom.gunadarma.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-300 transition-colors"
              >
                Situs Web Utama
              </a>
              <a
                href="https://vm.lepkom.gunadarma.ac.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-violet-300 transition-colors"
              >
                Situs Web VM LepKOM
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-emerald-100/40">
          <p>
            &copy; {new Date().getFullYear()} Lembaga Pengembangan Komputer. All rights reserved.
          </p>
          <div className="flex items-center space-x-5">
            <Link to="/login" className="hover:text-sky-300 transition-colors">
              Masuk
            </Link>
            <Link to="/register" className="hover:text-amber-300 transition-colors">
              Daftar
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};