
import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const [userIP, setUserIP] = useState<string>('Loading...');

  useEffect(() => {
    // Fetch user's IP address
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setUserIP(data.ip))
      .catch(() => setUserIP('Unable to fetch IP'));
  }, []);

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/su6osec', icon: Github },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/su6osec', icon: Linkedin },
    { name: 'Twitter', url: 'https://x.com/su6osec', icon: Twitter }
  ];

  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800 relative">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-wider">
            NOW THAT YOU KNOW ME...<br />
            <span className="text-red-500">LET'S MAKE SOMETHING GREAT.</span>
          </h2>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to secure your applications? Let's work together to build a safer digital world.
          </p>
        </div>

        {/* CTA Button */}
        <div className="text-center mb-16">
          <a
            href="mailto:deepanshu.infosec@gmail.com"
            className="inline-block bg-red-600 text-white px-12 py-4 font-black uppercase tracking-wider text-lg hover:bg-red-700 transition-colors"
          >
            GET IN TOUCH
          </a>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <h3 className="text-xl font-black text-white mb-4 uppercase tracking-wider">Email</h3>
            <p className="text-gray-300">deepanshu.infosec@gmail.com</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-black text-white mb-4 uppercase tracking-wider">Location</h3>
            <p className="text-gray-300">Dehradun, India</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-black text-white mb-4 uppercase tracking-wider">Availability</h3>
            <p className="text-gray-300">Open for Projects</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-16">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#111111] border border-gray-800 hover:border-red-500 flex items-center justify-center transition-all duration-300"
              >
                <Icon className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
              </a>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm font-bold uppercase tracking-wider">
              © 2024 Deepanshu Chauhan. All rights reserved.
            </div>
            <div className="text-gray-400 text-sm">
              Your IP: <span className="text-red-500 font-mono font-bold text-base">{userIP}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
