"use client";

export default function WhyTrack() {
  const benefits = [
    {
      title: "Build Consistent Habits",
      description: "Develop discipline through daily accountability and structured tracking.",
      icon: "🎯",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      title: "Visualize Your Progress",
      description: "See your growth in real-time with detailed analytics and insights.",
      icon: "📊",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      title: "Stay Motivated Daily",
      description: "Get automated reminders and celebrate your wins along the way.",
      icon: "⚡",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      title: "Track What Matters",
      description: "Focus on your personal goals and measure what's important to you.",
      icon: "🚀",
      gradient: "from-orange-500 to-red-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-green-200 to-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
            Why Track Your Progress?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Transform your goals into achievements with powerful tracking tools
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${0.4 + index * 0.1}s`, animationFillMode: 'both' }}
            >
              <div className="flex items-start space-x-6">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 flex-shrink-0`}>
                  <span className="text-2xl">{benefit.icon}</span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Checkmark */}
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors duration-300">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in-up animation-delay-800" style={{ animationFillMode: 'both' }}>
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-full border border-green-200">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-4 animate-pulse"></span>
            <span className="text-lg font-semibold text-gray-700">
              Ready to transform your daily routine into success?
            </span>
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
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-800 { animation-delay: 0.8s; }
      `}</style>
    </section>
  );
}
