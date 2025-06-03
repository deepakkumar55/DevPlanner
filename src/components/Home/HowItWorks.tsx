"use client";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Set Your Goals",
      description: "Define your daily objectives, milestones, and track what matters most to your success.",
      icon: "🎯"
    },
    {
      number: "2",
      title: "Track Daily Progress",
      description: "Monitor your achievements, visualize progress, and maintain consistency with detailed analytics.",
      icon: "📊"
    },
    {
      number: "3",
      title: "Reflect & Improve",
      description: "Write daily reflections, celebrate wins, and continuously optimize your approach.",
      icon: "🚀"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Transform your daily routine into a powerful progress tracking system
          </p>
        </div>

        <div className="relative">
          {/* Connecting Lines */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 transform -translate-y-1/2"></div>
          
          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: `${0.4 + index * 0.2}s`, animationFillMode: 'both' }}
              >
                {/* Icon Circle */}
                <div className="relative mx-auto mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                    {step.number}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-lg shadow-md group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-600 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Step Connector for Mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center mt-8 mb-4">
                    <div className="w-px h-8 bg-gradient-to-b from-green-300 to-blue-300"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in-up animation-delay-1000" style={{ animationFillMode: 'both' }}>
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-full text-green-700 font-medium">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
            Ready to start your progress journey?
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-1000 { animation-delay: 1s; }
      `}</style>
    </section>
  );
}
