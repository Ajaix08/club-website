import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Tech Innovation Club</h3>
          <p className="text-gray-400 mb-4">
            Empowering students through technology
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>by Tech Innovation Club</span>
          </div>
          <p className="text-gray-500 text-sm mt-2">
            © {currentYear} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
