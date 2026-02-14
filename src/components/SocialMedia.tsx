import { Instagram, Linkedin, Mail, MessageCircle } from 'lucide-react';

export default function SocialMedia() {
  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: 'https://chat.whatsapp.com/your-group-link',
      color: 'bg-green-500 hover:bg-green-600',
      label: 'Join our WhatsApp group',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/your-club',
      color: 'bg-pink-500 hover:bg-pink-600',
      label: 'Follow us on Instagram',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/company/your-club',
      color: 'bg-blue-700 hover:bg-blue-800',
      label: 'Connect on LinkedIn',
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:club@example.com',
      color: 'bg-gray-700 hover:bg-gray-800',
      label: 'Send us an email',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Connect With Us
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
          <p className="text-gray-300 mt-4 text-lg">
            Stay updated with our latest events and activities
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target={social.name !== 'Email' ? '_blank' : undefined}
                rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                className={`${social.color} text-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center gap-3 group`}
                aria-label={social.label}
              >
                <Icon className="w-12 h-12 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-lg">{social.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
