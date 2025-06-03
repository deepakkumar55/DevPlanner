"use client";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "CashflowCoders transformed how I track my daily goals. The progress visualization keeps me motivated every single day!",
      author: "Arjun Sharma",
      role: "Goal Achiever",
      rating: 5,
      avatar: "A",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      quote: "Thanks to TheCampusCoders team, I finally have a system that helps me stay accountable and consistent with my objectives.",
      author: "Priya Patel",
      role: "Progress Tracker",
      rating: 5,
      avatar: "P",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      quote: "The analytics and daily tracking features are incredible. CashflowCoders made goal achievement feel manageable and fun!",
      author: "Rohit Kumar",
      role: "Habit Builder",
      rating: 5,
      avatar: "R",
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-br from-green-200 to-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Join thousands who've transformed their goals with <span className="font-semibold text-green-600">CashflowCoders by TheCampusCoders</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${0.4 + index * 0.1}s`, animationFillMode: 'both' }}
            >
              {/* Quote Icon */}
              <div className="text-6xl text-green-200 mb-4 leading-none">"</div>
              
              {/* Stars */}
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Quote */}
              <p className="text-lg text-gray-700 mb-6 leading-relaxed italic">
                {testimonial.quote}
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className={`w-14 h-14 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {testimonial.avatar}
                </div>
                <div className="ml-4">
                  <p className="font-bold text-gray-900 text-lg">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
            </div>
          ))}
        </div>

        {/* Brand Section */}
        <div className="text-center mt-16 animate-fade-in-up animation-delay-800" style={{ animationFillMode: 'both' }}>
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-full border border-green-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-lg font-bold text-gray-800">CashflowCoders</span>
              <span className="text-gray-500">by</span>
              <span className="text-lg font-semibold text-blue-700">TheCampusCoders</span>
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
