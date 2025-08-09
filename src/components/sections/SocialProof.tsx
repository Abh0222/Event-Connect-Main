'use client'

import { Star, Award, Users, Calendar } from 'lucide-react'

const stats = [
  {
    icon: Calendar,
    value: '500+',
    label: 'Events Created',
    description: 'Memorable experiences delivered'
  },
  {
    icon: Users,
    value: '50K+',
    label: 'Happy Guests',
    description: 'Across all our events'
  },
  {
    icon: Award,
    value: '25+',
    label: 'Industry Awards',
    description: 'Recognition for excellence'
  },
  {
    icon: Star,
    value: '4.9/5',
    label: 'Client Rating',
    description: 'Based on 200+ reviews'
  }
]

const clientLogos = [
  {
    name: 'Luxury Hotels Group',
    logo: 'https://via.placeholder.com/120x60/6B7280/FFFFFF?text=LHG'
  },
  {
    name: 'Tech Innovations Inc',
    logo: 'https://via.placeholder.com/120x60/6B7280/FFFFFF?text=TII'
  },
  {
    name: 'Wedding Planners Co',
    logo: 'https://via.placeholder.com/120x60/6B7280/FFFFFF?text=WPC'
  },
  {
    name: 'Corporate Events Ltd',
    logo: 'https://via.placeholder.com/120x60/6B7280/FFFFFF?text=CEL'
  },
  {
    name: 'Festival Productions',
    logo: 'https://via.placeholder.com/120x60/6B7280/FFFFFF?text=FP'
  },
  {
    name: 'Elite Celebrations',
    logo: 'https://via.placeholder.com/120x60/6B7280/FFFFFF?text=EC'
  }
]

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Bride',
    content: 'VibeSphere turned our dream wedding into reality. Every detail was perfect, and our guests are still talking about it months later!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    role: 'Corporate Event Manager',
    content: 'Professional, creative, and flawless execution. Our annual conference was a huge success thanks to the VibeSphere team.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Anita Desai',
    role: 'Party Host',
    content: 'From concept to execution, everything was seamless. They understood our vision and brought it to life beautifully.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face'
  }
]

export default function SocialProof() {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-500/10 mb-4">
                <stat.icon className="h-6 w-6 text-accent-500" />
              </div>
              <div className="text-display-md text-primary-900 mb-2">
                {stat.value}
              </div>
              <div className="font-semibold text-primary-900 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-neutral-600">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Client Logos */}
        <div className="mb-16">
          <h3 className="text-center text-lg font-semibold text-primary-900 mb-8">
            Trusted by Leading Organizations
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {clientLogos.map((client, index) => (
              <div key={index} className="flex items-center justify-center">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="text-display-lg text-center text-primary-900 mb-12">
            What Our Clients Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-muted-100 rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow duration-300"
              >
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-body text-primary-900 mb-6 italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-primary-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-neutral-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-gradient-to-r from-primary-900 to-primary-700 rounded-2xl p-12 text-white">
          <h3 className="text-display-lg mb-4">
            Ready to Create Your Perfect Event?
          </h3>
          <p className="text-body mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who trusted VibeSphere to bring their vision to life. 
            Let's start planning your unforgettable experience today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-accent-500 hover:bg-accent-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Book a Consultation
            </button>
            <button className="border border-white/30 hover:bg-white/10 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              View Packages
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
