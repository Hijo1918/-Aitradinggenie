import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Search, HelpCircle, ExternalLink } from 'lucide-react'

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [openItems, setOpenItems] = useState({})

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const faqCategories = [
    {
      title: 'Getting Started',
      faqs: [
        {
          question: 'How do I create an account?',
          answer: 'Creating an account is simple! Click the "Sign Up" button in the top right corner, enter your email and password, and verify your email address. You\'ll be ready to start trading in minutes.'
        },
        {
          question: 'What is AI Trading Genie?',
          answer: 'AI Trading Genie is an advanced cryptocurrency trading platform that uses artificial intelligence to generate high-confidence trading signals, manage risk, and execute trades automatically. Our AI analyzes thousands of market indicators in real-time to help you make profitable trading decisions.'
        },
        {
          question: 'Do I need trading experience to use the platform?',
          answer: 'No! Our platform is designed for both beginners and experienced traders. We provide educational resources, risk management tools, and AI-powered signals that make trading accessible to everyone.'
        }
      ]
    },
    {
      title: 'Trading & Signals',
      faqs: [
        {
          question: 'How accurate are the AI trading signals?',
          answer: 'Our AI trading signals have an average accuracy rate of 85%+. The signals are generated using advanced machine learning algorithms that analyze market patterns, technical indicators, and sentiment data from multiple sources.'
        },
        {
          question: 'Can I customize the trading signals?',
          answer: 'Yes! You can customize signals based on your risk tolerance, preferred cryptocurrencies, and trading timeframes. Our platform allows you to set filters and preferences to receive only the signals that match your trading strategy.'
        },
        {
          question: 'What cryptocurrencies are supported?',
          answer: 'We support all major cryptocurrencies including Bitcoin (BTC), Ethereum (ETH), Cardano (ADA), Solana (SOL), and many more. Our platform covers over 100 trading pairs across multiple exchanges.'
        }
      ]
    },
    {
      title: 'Smart Contracts & Security',
      faqs: [
        {
          question: 'How do smart contracts work on the platform?',
          answer: 'Our smart contracts are deployed on the Ethereum blockchain and handle profit distribution, trade execution, and fund management automatically. They provide transparency and security by ensuring all transactions are recorded on the blockchain.'
        },
        {
          question: 'Is my money safe?',
          answer: 'Yes! We use bank-grade security measures including encryption, multi-factor authentication, and cold storage for funds. Our smart contracts are audited by third-party security firms to ensure maximum protection.'
        },
        {
          question: 'Can I withdraw my profits anytime?',
          answer: 'Absolutely! You can withdraw your profits at any time through our smart contract interface. Withdrawals are processed automatically and typically complete within 15 minutes, subject to blockchain confirmation times.'
        }
      ]
    },
    {
      title: 'Pricing & Plans',
      faqs: [
        {
          question: 'What are the different pricing plans?',
          answer: 'We offer three plans: Starter ($29/month) for beginners, Professional ($79/month) for serious traders, and Enterprise ($199/month) for trading firms. Each plan includes different features and signal limits.'
        },
        {
          question: 'Is there a free trial?',
          answer: 'Yes! We offer a 7-day free trial for new users. You can access all features of the Professional plan during your trial period with no commitment required.'
        },
        {
          question: 'Are there any hidden fees?',
          answer: 'No hidden fees! Our pricing is transparent. The only additional costs are standard blockchain gas fees for smart contract transactions and a small 1% fee on profitable trades.'
        }
      ]
    },
    {
      title: 'Technical Support',
      faqs: [
        {
          question: 'How can I contact support?',
          answer: 'You can reach our support team 24/7 through live chat, email (support@aitradinggenie.com), or by scheduling a call. We typically respond to inquiries within 2 hours.'
        },
        {
          question: 'What if I encounter technical issues?',
          answer: 'Our technical support team is available around the clock to help resolve any issues. You can also check our status page for real-time system updates and known issues.'
        },
        {
          question: 'Do you provide trading education?',
          answer: 'Yes! We offer comprehensive educational resources including video tutorials, trading guides, webinars, and a knowledge base to help you improve your trading skills.'
        }
      ]
    }
  ]

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0)

  const externalResources = [
    {
      title: 'Cryptocurrency Basics',
      url: 'https://www.coinbase.com/learn/crypto-basics',
      description: 'Learn the fundamentals of cryptocurrency'
    },
    {
      title: 'Trading Strategies Guide',
      url: 'https://www.investopedia.com/cryptocurrency-trading-strategies-5200707',
      description: 'Comprehensive guide to crypto trading strategies'
    },
    {
      title: 'Blockchain Technology',
      url: 'https://ethereum.org/en/developers/docs/',
      description: 'Understanding blockchain and smart contracts'
    },
    {
      title: 'Risk Management',
      url: 'https://www.investopedia.com/articles/trading/09/risk-management.asp',
      description: 'Essential risk management principles'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Frequently Asked
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}Questions
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Find answers to common questions about AI Trading Genie. 
              Can't find what you're looking for? Contact our support team.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.length > 0 ? (
            <div className="space-y-12">
              {filteredFAQs.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <HelpCircle className="w-6 h-6 mr-3 text-blue-600" />
                    {category.title}
                  </h2>
                  
                  <div className="space-y-4">
                    {category.faqs.map((faq, faqIndex) => {
                      const itemKey = `${categoryIndex}-${faqIndex}`
                      const isOpen = openItems[itemKey]
                      
                      return (
                        <div
                          key={faqIndex}
                          className="bg-white rounded-2xl shadow-md overflow-hidden"
                        >
                          <button
                            onClick={() => toggleItem(itemKey)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-semibold text-gray-900 pr-4">
                              {faq.question}
                            </span>
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            )}
                          </button>
                          
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="px-6 pb-4"
                            >
                              <div className="border-t border-gray-200 pt-4">
                                <p className="text-gray-600 leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <HelpCircle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or browse all categories above.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* External Resources */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Additional Learning Resources
            </h2>
            <p className="text-xl text-gray-600">
              Expand your knowledge with these helpful external resources
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {externalResources.map((resource, index) => (
              <motion.a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors group"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {resource.title}
                  </h3>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <p className="text-gray-600">{resource.description}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Our support team is here to help you 24/7. Get in touch and we'll respond quickly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl"
              >
                Contact Support
              </a>
              <button className="inline-flex items-center px-8 py-4 bg-transparent text-white font-semibold rounded-2xl border-2 border-white hover:bg-white hover:text-blue-600 transition-colors">
                Start Live Chat
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default FAQ
