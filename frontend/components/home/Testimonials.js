'use client';

import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Verified Customer',
      rating: 5,
      comment: 'Amazing shopping experience! The products are exactly as described and delivery was super fast. Will definitely shop here again.',
      avatar: '/avatars/sarah.jpg'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Verified Customer',
      rating: 5,
      comment: 'Great quality products and excellent customer service. The seller was very helpful and responsive to my questions.',
      avatar: '/avatars/michael.jpg'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Verified Customer',
      rating: 5,
      comment: 'I love the variety of products available. Found exactly what I was looking for at a great price. Highly recommended!',
      avatar: '/avatars/emily.jpg'
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Verified Customer',
      rating: 5,
      comment: 'Fast shipping and secure payment options. The platform is easy to use and the product quality exceeded my expectations.',
      avatar: '/avatars/david.jpg'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      role: 'Verified Customer',
      rating: 5,
      comment: 'Outstanding customer support and a wide selection of products. The return process was smooth and hassle-free.',
      avatar: '/avatars/lisa.jpg'
    },
    {
      id: 6,
      name: 'James Wilson',
      role: 'Verified Customer',
      rating: 5,
      comment: 'Best e-commerce platform I\'ve used. Competitive prices, reliable sellers, and excellent user experience.',
      avatar: '/avatars/james.jpg'
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`w-4 h-4 ${
            i <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="card p-6 hover:shadow-medium transition-shadow">
          {/* Quote Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <FaQuoteLeft className="w-6 h-6 text-primary-600" />
            </div>
          </div>

          {/* Rating */}
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-1">
              {renderStars(testimonial.rating)}
            </div>
          </div>

          {/* Comment */}
          <blockquote className="text-gray-700 text-center mb-6 italic">
            "{testimonial.comment}"
          </blockquote>

          {/* Customer Info */}
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-lg mb-2 mx-auto">
                {testimonial.name.charAt(0)}
              </div>
              <div className="font-semibold text-gray-900">{testimonial.name}</div>
              <div className="text-sm text-gray-500">{testimonial.role}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Testimonials; 