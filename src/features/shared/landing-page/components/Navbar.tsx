import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '@/components/ui';
import { Menu, X, Sparkles } from 'lucide-react';

const navLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Tentang', href: '#tentang' },
  { label: 'Jadwal', href: '#jadwal' },
  { label: 'Tahapan', href: '#tahapan' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Kontak', href: '#kontak' },
];

export const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md shadow-sm">
      {/* Ribbon warna — aksen playful di atas navbar */}
      <div className="flex h-1 w-full" aria-hidden>
        <div className="flex-1 bg-lepkom-green" />
        <div className="flex-1 bg-amber-400" />
        <div className="flex-1 bg-sky-400" />
        <div className="flex-1 bg-violet-500" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#beranda" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-lepkom-green to-emerald-600 rounded-lg flex items-center justify-center p-1.5 shadow-md shadow-green-600/20">
            <img src="/assets/images/logo.svg" alt="LepKOM Logo" className="w-full h-full object-contain brightness-0 invert" />
          </div>
          <div className="leading-tight">
            <span className="block text-lg font-bold text-gray-900 tracking-tight">HRIS LepKOM</span>
            <span className="block text-[11px] font-semibold text-lepkom-green uppercase tracking-wide">
              Open Recruitment 2026
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-gray-600 hover:text-lepkom-green transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center space-x-3">
            <Link to="/login">
              <Button variant="outline" className="text-lepkom-blue border-lepkom-blue/30 hover:bg-lepkom-blue/5 font-medium px-5">
                Masuk
              </Button>
            </Link>
            <Link to="/register" className="hidden lg:block">
              <Button className="bg-gradient-to-r from-lepkom-green to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-5 shadow-md shadow-green-600/20">
                <Sparkles className="mr-1.5 h-4 w-4" />
                Daftar
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile toggle */}
        <div className="flex lg:hidden items-center space-x-3">
          <Link to="/register">
            <Button className="bg-gradient-to-r from-lepkom-green to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-4 text-sm h-9 shadow-md shadow-green-600/20">
              Daftar
            </Button>
          </Link>
          <button
            type="button"
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden border-t border-gray-200 bg-white px-4 pb-5 pt-3"
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-lepkom-green transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 mt-2 border-t border-gray-100 flex items-center space-x-3">
              <Link to="/login" className="flex-1" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full text-lepkom-blue border-lepkom-blue/30 font-medium">
                  Masuk
                </Button>
              </Link>
              <Link to="/register" className="flex-1" onClick={() => setOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-lepkom-green to-emerald-600 text-white font-semibold">
                  Daftar
                </Button>
              </Link>
            </div>
          </div>
        </motion.nav>
      )}
    </header>
  );
};