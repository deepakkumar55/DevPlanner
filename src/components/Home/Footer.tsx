"use client";
import Link from "next/link";

export default function Footer() {
  const socialLinks = [
    {
      name: "Discord",
      icon: "M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.819 0.934541 10.589 0.461744 10.3368 0C8.48074 0.318797 6.67795 0.879656 4.96746 1.67671C0.714747 8.83916 -0.347906 15.8677 0.248848 22.8138C2.70984 24.6688 5.58546 25.9999 8.6322 26.6312C9.24776 25.7829 9.79988 24.8894 10.2831 23.9592C9.3936 23.6233 8.52978 23.2275 7.69887 22.7808C7.93887 22.6067 8.17263 22.4275 8.4013 22.2433C11.5666 23.7307 15.0607 23.7307 18.1846 22.2433C18.4133 22.4275 18.647 22.6067 18.887 22.7808C18.0561 23.2275 17.1923 23.6233 16.3028 23.9592C16.786 24.8894 17.3381 25.7829 17.9537 26.6312C21.0004 25.9999 23.876 24.6688 26.337 22.8138C27.0284 14.8477 25.0912 7.87884 23.0212 1.67671Z",
      gradient: "from-indigo-600 to-purple-600"
    },
    {
      name: "Telegram",
      icon: "M24 12C24 18.627 18.627 24 12 24C5.373 24 0 18.627 0 12C0 5.373 5.373 0 12 0C18.627 0 24 5.373 24 12ZM12.43 8.859C11.232 9.344 8.837 10.349 5.246 11.874C4.631 12.099 4.307 12.319 4.276 12.535C4.225 12.885 4.693 13.026 5.375 13.242L5.617 13.319C6.289 13.538 7.19 13.799 7.656 13.808C8.086 13.816 8.569 13.636 9.105 13.267C12.455 11.085 14.19 9.991 14.31 9.984C14.396 9.98 14.511 9.975 14.586 10.048C14.661 10.121 14.654 10.252 14.646 10.286C14.618 10.414 12.793 12.128 11.846 13.016C11.549 13.295 11.331 13.5 11.288 13.545C11.194 13.643 11.098 13.734 11.006 13.822C10.391 14.408 9.937 14.841 11.027 15.548C11.559 15.892 11.981 16.176 12.402 16.461C12.859 16.773 13.315 17.085 13.904 17.472C14.048 17.563 14.186 17.658 14.318 17.749C14.817 18.083 15.262 18.378 15.82 18.328C16.161 18.297 16.512 17.973 16.691 16.949C17.117 14.513 17.958 9.309 18.156 7.108C18.174 6.928 18.155 6.699 18.138 6.603C18.121 6.507 18.078 6.393 17.942 6.325C17.778 6.244 17.532 6.217 17.436 6.219C16.896 6.228 16.044 6.557 12.43 8.859Z",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "Facebook",
      icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
      gradient: "from-blue-600 to-blue-700"
    },
    {
      name: "Instagram",
      icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
      gradient: "from-pink-500 to-orange-500"
    },
    {
      name: "LinkedIn",
      icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
      gradient: "from-blue-700 to-blue-800"
    },
    {
      name: "Twitter",
      icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
      gradient: "from-sky-500 to-blue-500"
    },
    {
      name: "YouTube",
      icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
      gradient: "from-red-600 to-red-700"
    },
    {
      name: "GitHub",
      icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
      gradient: "from-gray-600 to-gray-800"
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white relative overflow-hidden border-t border-gray-100 py-20">
      {/* Background Elements - matching other components */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-br from-green-200 to-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-6">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mr-5 shadow-xl">
                <span className="text-white font-bold text-2xl">C</span>
              </div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  CashflowCoders
                </h3>
                <p className="text-lg text-gray-500 -mt-1">by TheCampusCoders</p>
              </div>
            </div>
            <p className="text-gray-600 text-xl leading-relaxed mb-8 max-w-lg">
              Transform your daily routine into a powerful progress tracking system. 
              Set goals, build habits, and achieve your personal milestones with precision.
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-600 font-semibold text-lg">Empowering your journey to success</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-2xl font-bold mb-8 text-gray-900">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-green-600 transition-all duration-300 hover:translate-x-2 text-lg">
                Dashboard
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-green-600 transition-all duration-300 hover:translate-x-2 text-lg">
                About Us
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-green-600 transition-all duration-300 hover:translate-x-2 text-lg">
                Contact
              </Link>
              <Link href="/privacy" className="text-gray-600 hover:text-green-600 transition-all duration-300 hover:translate-x-2 text-lg">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-green-600 transition-all duration-300 hover:translate-x-2 text-lg">
                Terms of Service
              </Link>
            </nav>
          </div>

          {/* Social Media Section */}
          <div className="lg:col-span-3">
            <h4 className="text-2xl font-bold mb-8 text-gray-900">
              Connect With Us
            </h4>
            <div className="grid grid-cols-4 sm:grid-cols-3 lg:grid-cols-3 gap-4 mb-8">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`group flex items-center justify-center w-14 h-14 bg-gradient-to-br ${social.gradient} rounded-2xl hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl animate-fade-in-up`}
                  style={{ animationDelay: `${0.1 + index * 0.05}s`, animationFillMode: 'both' }}
                  title={social.name}
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
            <div className="text-lg text-gray-500">
              Follow us for updates, tips, and inspiration!
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-16 pt-10">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">©</span>
                </div>
                <p className="text-gray-500 text-lg">
                  2025 <span className="font-semibold text-gray-700">TheCampusCoders</span>. All rights reserved.
                </p>
              </div>
            </div>
            <div className="text-gray-500 text-lg">
              Built with <span className="text-red-500 font-semibold">❤️</span> by Deepak kumar
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }
      `}</style>
    </footer>
  );
}
