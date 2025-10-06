import { useState } from 'react';
import { 
  Mail, 
  Github, 
  Linkedin, 
  Facebook, 
  Globe,
  Code2,
  BookOpen,
  Sparkles,
  Zap,
  Heart,
  Coffee,
  Send,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const About = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const skills = [
    { name: 'JavaScript', category: 'coding', icon: '⚡' },
    { name: 'React', category: 'coding', icon: '⚛️' },
    { name: 'Node.js', category: 'coding', icon: '🟢' },
    { name: 'Python', category: 'coding', icon: '🐍' },
    { name: 'TypeScript', category: 'coding', icon: '💙' },
    { name: 'Poetry', category: 'literature', icon: '✨' },
    { name: 'Essay Writing', category: 'literature', icon: '📝' },
    { name: 'Literary Analysis', category: 'literature', icon: '📚' },
    { name: 'Creative Writing', category: 'literature', icon: '🎭' },
    { name: 'Storytelling', category: 'literature', icon: '📖' }
  ];

  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: Github, 
      url: 'https://github.com/yourusername',
      color: 'from-gray-700 to-gray-900',
      hoverColor: 'hover:from-gray-600 hover:to-gray-800'
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      url: 'https://linkedin.com/in/yourusername',
      color: 'from-blue-500 to-blue-700',
      hoverColor: 'hover:from-blue-400 hover:to-blue-600'
    },
    { 
      name: 'Portfolio', 
      icon: Globe, 
      url: 'https://yourportfolio.com',
      color: 'from-purple-500 to-pink-500',
      hoverColor: 'hover:from-purple-400 hover:to-pink-400'
    },
    { 
      name: 'Facebook', 
      icon: Facebook, 
      url: 'https://facebook.com/yourusername',
      color: 'from-blue-600 to-indigo-600',
      hoverColor: 'hover:from-blue-500 hover:to-indigo-500'
    }
  ];

  const journey = [
    {
      year: '2020',
      title: 'Started Coding Journey',
      description: 'Began learning web development and fell in love with creating digital experiences.',
      icon: Code2
    },
    {
      year: '2021',
      title: 'Discovered Literary Writing',
      description: 'Started exploring creative writing and literary analysis, merging technical and creative passions.',
      icon: BookOpen
    },
    {
      year: '2023',
      title: 'Launched EpiCode',
      description: 'Created this blog to share knowledge and stories about coding and literature.',
      icon: Sparkles
    },
    {
      year: '2024',
      title: 'Growing Community',
      description: 'Building a community of developers and writers who share similar passions.',
      icon: Heart
    }
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative mb-20 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-8xl">{'<>'}</div>
          <div className="absolute top-20 right-20 text-6xl">"</div>
          <div className="absolute bottom-10 left-1/4 text-7xl">{ }</div>
          <div className="absolute bottom-20 right-1/3 text-5xl">"</div>
        </div>

        <div className="relative grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Photo */}
          <div className="flex justify-center md:justify-end animate-fadeInLeft">
            <div className="relative group">
              {/* Decorative rings */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="absolute -inset-4 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-full opacity-20 animate-pulse"></div>
              
              {/* Photo */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[var(--surface)] shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white text-6xl font-bold">
                  EP
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-[var(--surface)] border-2 border-[var(--primary)] rounded-full p-3 shadow-lg animate-bounce">
                <Code2 className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[var(--surface)] border-2 border-[var(--secondary)] rounded-full p-3 shadow-lg animate-bounce" style={{ animationDelay: '0.2s' }}>
                <BookOpen className="w-6 h-6 text-[var(--secondary)]" />
              </div>
            </div>
          </div>

          {/* Right: Intro */}
          <div className="animate-fadeInRight">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-sm font-semibold text-[var(--primary)]">Developer & Writer</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-[var(--text-primary)] mb-6 leading-tight">
              Hey, I'm <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">Your Name</span>
            </h1>

            <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-6">
              A passionate developer who codes by day and writes by night. I believe in the beauty of clean code and compelling stories.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#journey"
                className="flex items-center gap-2 px-6 py-3 bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] rounded-full font-semibold hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
              >
                <Coffee className="w-5 h-5" />
                <span>My Journey</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About the Blog */}
      <section className="mb-20 animate-fadeInUp">
        <div className="bg-gradient-to-br from-[var(--primary)]/5 via-[var(--secondary)]/5 to-[var(--accent)]/5 rounded-3xl p-8 md:p-12 border border-[var(--border)]">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-8 h-8 text-[var(--primary)]" />
            <h2 className="text-3xl font-bold text-[var(--text-primary)]">About EpiCode</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[var(--primary)]" />
                The Mission
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                EpiCode is a unique space where technology meets creativity. My mission is to bridge the gap between logical programming and expressive writing, showing that developers can be storytellers and writers can understand code.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[var(--secondary)]" />
                What You'll Find
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                From in-depth coding tutorials and algorithm breakdowns to literary analysis and creative fiction, this blog covers it all. Whether you're debugging code at 3 AM or exploring the depths of a classic novel, there's something here for you.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-[var(--surface)] rounded-2xl">
              <p className="text-3xl font-bold text-[var(--primary)]">100+</p>
              <p className="text-sm text-[var(--text-secondary)]">Articles</p>
            </div>
            <div className="text-center p-4 bg-[var(--surface)] rounded-2xl">
              <p className="text-3xl font-bold text-[var(--secondary)]">50K+</p>
              <p className="text-sm text-[var(--text-secondary)]">Readers</p>
            </div>
            <div className="text-center p-4 bg-[var(--surface)] rounded-2xl">
              <p className="text-3xl font-bold text-[var(--accent)]">20+</p>
              <p className="text-sm text-[var(--text-secondary)]">Topics</p>
            </div>
            <div className="text-center p-4 bg-[var(--surface)] rounded-2xl">
              <p className="text-3xl font-bold text-[var(--primary)]">2+</p>
              <p className="text-sm text-[var(--text-secondary)]">Years</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-20 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-8 flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-[var(--primary)]" />
          Skills & Expertise
        </h2>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`group px-5 py-3 rounded-full font-semibold transition-all cursor-pointer hover:scale-110 hover:shadow-lg ${
                skill.category === 'coding'
                  ? 'bg-gradient-to-r from-[var(--primary)]/10 to-[var(--primary)]/20 text-[var(--primary)] border border-[var(--primary)]/30 hover:from-[var(--primary)] hover:to-[var(--secondary)] hover:text-white'
                  : 'bg-gradient-to-r from-[var(--secondary)]/10 to-[var(--secondary)]/20 text-[var(--secondary)] border border-[var(--secondary)]/30 hover:from-[var(--secondary)] hover:to-[var(--accent)] hover:text-white'
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <span className="mr-2">{skill.icon}</span>
              {skill.name}
            </div>
          ))}
        </div>
      </section>

      {/* Journey Timeline */}
      <section id="journey" className="mb-20 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-12 flex items-center gap-3">
          <Heart className="w-8 h-8 text-[var(--primary)]" />
          My Journey
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]"></div>

          <div className="space-y-12">
            {journey.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.year}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                >
                  {/* Content */}
                  <div className={`w-full md:w-5/12 ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} pl-20 md:pl-0`}>
                    <div className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)] hover:shadow-xl hover:scale-105 transition-all">
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-full text-sm font-bold mb-3">
                        {item.year}
                      </span>
                      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[var(--text-secondary)] text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-16 h-16 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-full flex items-center justify-center shadow-lg border-4 border-[var(--bg)] z-10">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Spacer for desktop */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="mb-20 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-8 flex items-center gap-3">
          <Globe className="w-8 h-8 text-[var(--primary)]" />
          Connect With Me
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden bg-gradient-to-r ${social.color} p-6 rounded-2xl text-white hover:shadow-2xl transition-all hover:scale-105`}
              >
                <div className="relative z-10">
                  <Icon className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                  <p className="font-bold text-lg">{social.name}</p>
                  <p className="text-sm opacity-90">Follow me</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
        <div className="bg-gradient-to-br from-[var(--surface)] to-[var(--bg)] rounded-3xl p-8 md:p-12 border border-[var(--border)]">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10 rounded-full mb-4">
                <Mail className="w-4 h-4 text-[var(--primary)]" />
                <span className="text-sm font-semibold text-[var(--primary)]">Let's Talk</span>
              </div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-3">
                Get in Touch
              </h2>
              <p className="text-[var(--text-secondary)]">
                Have a question or want to collaborate? Drop me a message!
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-12 animate-fadeIn">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                  Message Sent! 🎉
                </h3>
                <p className="text-[var(--text-secondary)]">
                  Thanks for reaching out. I'll get back to you soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[var(--code-bg)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text-primary)] transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[var(--code-bg)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text-primary)] transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-[var(--code-bg)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text-primary)] transition-all resize-none"
                    placeholder="What's on your mind?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="group w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all"
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out;
        }
        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
          animation-fill-mode: both;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default About;