export type Language = 'en' | 'hi';

export interface TranslationDictionary {
  [key: string]: {
    en: string;
    hi: string;
  };
}

export const translations: TranslationDictionary = {
  // Navigation
  nav_home: {
    en: 'Home',
    hi: 'होम',
  },
  nav_properties: {
    en: 'Properties',
    hi: 'प्रॉपर्टीज',
  },
  nav_sell: {
    en: 'Sell Property',
    hi: 'प्रॉपर्टी बेचें',
  },
  nav_blogs: {
    en: 'Blogs',
    hi: 'ब्लॉग्स',
  },
  nav_about: {
    en: 'About Us',
    hi: 'हमारे बारे में',
  },
  nav_contact: {
    en: 'Contact',
    hi: 'संपर्क करें',
  },
  consultant: {
    en: 'Property Consultant',
    hi: 'प्रॉपर्टी कंसल्टेंट',
  },
  call_now: {
    en: 'Call Now',
    hi: 'अभी कॉल करें',
  },
  chat_whatsapp: {
    en: 'Chat on WhatsApp',
    hi: 'व्हाट्सएप पर चैट करें',
  },

  // Hero Section
  hero_badge: {
    en: '✦ Agra\'s Trusted Property Partner',
    hi: '✦ आगरा का सबसे भरोसेमंद प्रॉपर्टी पार्टनर',
  },
  hero_title_prefix: {
    en: 'Find Your Dream Home & Investment in',
    hi: 'सपनों का आशियाना और सुरक्षित निवेश पाएं',
  },
  hero_title_city: {
    en: 'Agra',
    hi: 'आगरा में',
  },
  hero_subtitle: {
    en: 'Independent houses, commercial warehouses, luxury duplex villas, and residential plots in Agra with clear legal documentation and verified registry.',
    hi: 'आगरा में स्वतंत्र मकान, व्यावसायिक गोदाम, लक्ज़री डुप्लेक्स विला और आवासीय प्लॉट - स्पष्ट कानूनी दस्तावेज़ों और प्रमाणित रजिस्ट्री के साथ।',
  },
  buy_tab: {
    en: 'Buy Property',
    hi: 'प्रॉपर्टी खरीदें',
  },
  rent_tab: {
    en: 'Rent Property',
    hi: 'किराए पर लें',
  },
  search_placeholder: {
    en: 'Search by locality, colony, or keyword...',
    hi: 'इलाका, कॉलोनी या कीवर्ड से खोजें...',
  },
  locality_landmark: {
    en: 'Locality / Landmark',
    hi: 'इलाका / लैंडमार्क',
  },
  property_type_label: {
    en: 'Property Type',
    hi: 'प्रॉपर्टी का प्रकार',
  },
  all_types: {
    en: 'All Property Types',
    hi: 'सभी प्रकार की प्रॉपर्टी',
  },
  flat_type: {
    en: 'Flat / Apartment',
    hi: 'फ्लैट / अपार्टमेंट',
  },
  house_type: {
    en: 'House / Duplex Villa',
    hi: 'मकान / डुप्लेक्स विला',
  },
  plot_type: {
    en: 'Plot / Land',
    hi: 'प्लॉट / जमीन',
  },
  commercial_type: {
    en: 'Commercial / Warehouse',
    hi: 'कमर्शियल / वेयरहाउस',
  },
  search_btn: {
    en: 'Search',
    hi: 'खोजें',
  },

  // Stats / Badges
  experience_years: {
    en: '15+ Years Trust',
    hi: '15+ वर्षों का विश्वास',
  },
  happy_families: {
    en: '500+ Happy Families',
    hi: '500+ संतुष्ट परिवार',
  },
  clear_titles: {
    en: '100% Legal Clear Title',
    hi: '100% कानूनी रूप से स्पष्ट रजिस्ट्री',
  },
  local_expertise: {
    en: 'Agra Micro-Market Experts',
    hi: 'आगरा रियल एस्टेट विशेषज्ञ',
  },

  // Property Card & Listing
  featured_listings_tag: {
    en: 'Premium Selection',
    hi: 'विशेष चयन',
  },
  featured_listings: {
    en: 'Featured Properties in Agra',
    hi: 'आगरा की प्रमुख प्रॉपर्टीज',
  },
  featured_listings_desc: {
    en: 'Handpicked properties offering high appreciation, prime location, and complete paperwork verified.',
    hi: 'उत्तम लोकेशन, उच्च मूल्य वृद्धि और पूर्ण कानूनी कागजी कार्रवाई के साथ चुनिंदा प्रॉपर्टीज।',
  },
  view_all_properties: {
    en: 'View All Properties',
    hi: 'सभी प्रॉपर्टीज देखें',
  },
  featured_badge: {
    en: 'Featured',
    hi: 'विशेष',
  },
  available_badge: {
    en: 'Available',
    hi: 'उपलब्ध',
  },
  sold_badge: {
    en: 'Sold Out',
    hi: 'बिक चुका है',
  },
  rented_badge: {
    en: 'Rented',
    hi: 'किराए पर दिया गया',
  },
  view_details: {
    en: 'View Details',
    hi: 'विवरण देखें',
  },
  price_on_request: {
    en: 'Price on Request',
    hi: 'कीमत संपर्क पर',
  },
  all_properties_title: {
    en: 'Explore Available Properties in Agra',
    hi: 'आगरा में उपलब्ध प्रॉपर्टीज देखें',
  },
  filters_title: {
    en: 'Filters',
    hi: 'फ़िल्टर',
  },
  reset_filters: {
    en: 'Reset',
    hi: 'रीसेट करें',
  },
  apply_filters: {
    en: 'Apply Filters',
    hi: 'फ़िल्टर लागू करें',
  },
  locality_label: {
    en: 'Locality',
    hi: 'इलाका / क्षेत्र',
  },
  all_localities: {
    en: 'All Localities',
    hi: 'सभी इलाके',
  },
  budget_label: {
    en: 'Budget (INR)',
    hi: 'बजट (रुपये)',
  },
  sort_by: {
    en: 'Sort By',
    hi: 'क्रमबद्ध करें',
  },
  newest_first: {
    en: 'Newest First',
    hi: 'नवीनतम पहले',
  },
  price_low_high: {
    en: 'Price: Low to High',
    hi: 'कीमत: कम से ज्यादा',
  },
  price_high_low: {
    en: 'Price: High to Low',
    hi: 'कीमत: ज्यादा से कम',
  },
  most_popular: {
    en: 'Most Popular',
    hi: 'सर्वाधिक लोकप्रिय',
  },
  no_properties: {
    en: 'No properties found matching your selection.',
    hi: 'आपके चयन के अनुसार कोई प्रॉपर्टी नहीं मिली।',
  },

  // Services Section
  services_tag: {
    en: 'What We Offer',
    hi: 'हमारी सेवाएं',
  },
  services_title: {
    en: 'Professional Brokerage Services',
    hi: 'व्यावसायिक ब्रोकरेज और कंसल्टेंसी सेवाएं',
  },
  services_desc: {
    en: 'Providing clean deals, transparent pricing, and smooth documentation transitions.',
    hi: 'सुरक्षित सौदे, पारदर्शी कीमतें और आसान कागजी कार्यवाही।',
  },
  service_1_title: {
    en: 'Property Buying & Search',
    hi: 'प्रॉपर्टी खरीद व खोज सहायता',
  },
  service_1_desc: {
    en: 'Personalized assistance to find residential houses, commercial workspaces, or vacant plots in top developments across Agra. We short-list according to your budget and needs.',
    hi: 'आगरा में आवासीय मकान, व्यावसायिक गोदाम या प्लॉट खोजने में व्यक्तिगत मार्गदर्शन। आपके बजट और जरूरत के अनुसार बेहतरीन विकल्प।',
  },
  service_2_title: {
    en: 'Registry & Stamp Duty Guidance',
    hi: 'रजिस्ट्री और स्टांप शुल्क मार्गदर्शन',
  },
  service_2_desc: {
    en: 'Step-by-step documentation check and legal assistance for sale deed registers at the Sub-Registrar Office in Uttar Pradesh, calculating precise stamp duty and circle rates.',
    hi: 'उत्तर प्रदेश सब-रजिस्ट्रार कार्यालय में रजिस्ट्री के लिए सभी कानूनी दस्तावेजों की जांच और सही स्टांप शुल्क की गणना।',
  },
  service_3_title: {
    en: 'High Yield Investment Advisory',
    hi: 'उच्च लाभ निवेश परामर्श',
  },
  service_3_desc: {
    en: 'Expert insights on upcoming investment corridors (like Inner Ring Road and Lucknow Expressway Extension) to secure properties with high capital growth and rental yields.',
    hi: 'आगरा के नए विकासशील क्षेत्रों में निवेश की सलाह, जिससे आपकी पूंजी और किराए की आय में अधिकतम वृद्धि हो।',
  },

  // Why Choose Us
  why_us_tag: {
    en: 'Core Strengths',
    hi: 'हमारी विशेषताएं',
  },
  why_us_title: {
    en: 'Why Choose A1 Properties?',
    hi: 'A1 Properties ही क्यों चुनें?',
  },
  why_us_desc: {
    en: 'Unlike massive listing directories, we work selectively. We only manage verified properties at any given time, ensuring complete, dedicated focus on quality, legal transparency, and close liaison with buyers and sellers.',
    hi: 'अन्य सामान्य पोर्टल्स के विपरीत, हम केवल पूरी तरह से सत्यापित और प्रमाणित प्रॉपर्टीज पर ही काम करते हैं, ताकि आपको मिले 100% कानूनी सुरक्षा और पारदर्शी सौदा।',
  },
  why_point_1_title: {
    en: '100% Legal Clearances',
    hi: '100% कानूनी स्पष्टता',
  },
  why_point_1_desc: {
    en: 'Every property undergoes strict registry, title chain, and boundary validation before showcased.',
    hi: 'हर प्रॉपर्टी की 30 साल की रजिस्ट्री चेन और सीमा रेखाओं की गहन जांच की जाती है।',
  },
  why_point_2_title: {
    en: 'Personal Consultations',
    hi: 'व्यक्तिगत परामर्श',
  },
  why_point_2_desc: {
    en: 'Direct face-to-face assistance with property brokers for negotiable terms and clear contracts.',
    hi: 'कंसल्टेंट के साथ आमने-सामने बैठकर पारदर्शी बातचीत और सही शर्तों पर समझौता।',
  },
  why_point_3_title: {
    en: 'Agra Circle Expertise',
    hi: 'आगरा सर्किल व लोकल ज्ञान',
  },
  why_point_3_desc: {
    en: 'In-depth knowledge of local layout codes, water supply lines, and locality growth estimates.',
    hi: 'आगरा के हर इलाके, सर्किल रेट, पानी-बिजली की सुविधा और भावी विकास की पूरी समझ।',
  },

  // Testimonials
  testimonials_tag: {
    en: 'Success Stories',
    hi: 'संतुष्ट ग्राहक',
  },
  testimonials_title: {
    en: 'What Our Clients Say',
    hi: 'हमारे ग्राहकों के अनुभव',
  },
  testimonials_desc: {
    en: 'Honest feedback from local families and business owners we helped in Agra.',
    hi: 'आगरा के स्थानीय परिवारों और व्यापारियों की सच्ची प्रतिक्रियाएं।',
  },

  // Founder Section
  founder_tag: {
    en: 'The Broker Behind',
    hi: 'संस्थापक और मार्गदर्शक',
  },
  founder_title: {
    en: 'Consultation with Experience',
    hi: 'अनुभव और विश्वसनीयता के साथ परामर्श',
  },
  founder_desc: {
    en: 'With decades of experience navigating the local real estate landscape in Uttar Pradesh, our goal is to offer authentic, transparent brokerage services. We believe in quality relationships over sheer volume. We inspect each plot, verify every title deed, and stand beside our clients from search to registry.',
    hi: 'आगरा और उत्तर प्रदेश के रियल एस्टेट क्षेत्र में वर्षों के अनुभव के साथ, हमारा उद्देश्य पारदर्शी और भरोसेमंद सेवाएं देना है। हम हर प्रॉपर्टी की रजिस्ट्री जांचते हैं और खोज से लेकर रजिस्ट्री कराने तक अपने ग्राहकों के साथ खड़े रहते हैं।',
  },
  founder_name: {
    en: 'Mr. Vishal Verma',
    hi: 'मिस्टर विशाल वर्मा',
  },
  founder_role: {
    en: 'Founder & Principal Consultant',
    hi: 'संस्थापक एवं मुख्य कंसल्टेंट',
  },

  // Sell CTA
  sell_banner_title: {
    en: 'Selling a Property in Agra?',
    hi: 'क्या आप आगरा में प्रॉपर्टी बेचना चाहते हैं?',
  },
  sell_banner_desc: {
    en: 'Submit your property details, plot size, images, and locality, and we will list it directly for our premium network of pre-verified buyers.',
    hi: 'अपनी प्रॉपर्टी का विवरण, साइज, फोटो और इलाका दर्ज करें। हम इसे अपने सत्यापित खरीदारों के नेटवर्क के समक्ष प्रस्तुत करेंगे।',
  },
  sell_banner_btn: {
    en: 'Sell Your Property',
    hi: 'अपनी प्रॉपर्टी लिस्ट करें',
  },

  // Contact Section
  contact_tag: {
    en: 'Contact Office',
    hi: 'कार्यालय संपर्क',
  },
  contact_title: {
    en: 'Have Questions? Let\'s Talk',
    hi: 'कोई सवाल है? हमसे संपर्क करें',
  },
  contact_desc: {
    en: 'Feel free to visit our office or reach out via phone, email, or WhatsApp. We are happy to guide you on property rates, registration fees, and legal documentation.',
    hi: 'हमारे कार्यालय आएं या फोन/व्हाट्सएप पर संपर्क करें। हम प्रॉपर्टी रेट्स, रजिस्ट्री शुल्क और कागजात में आपका मार्गदर्शन करेंगे।',
  },
  office_hours_title: {
    en: 'Office Hours',
    hi: 'कार्यालय का समय',
  },
  office_hours_desc: {
    en: 'Monday - Saturday: 10:00 AM to 7:30 PM | Sunday: By appointment',
    hi: 'सोमवार - शनिवार: सुबह 10:00 से शाम 7:30 बजे | रविवार: पूर्व बुकिंग पर',
  },

  // Property Details Page
  property_overview: {
    en: 'Property Overview',
    hi: 'प्रॉपर्टी का संक्षिप्त विवरण',
  },
  property_specs: {
    en: 'Property Details Table',
    hi: 'प्रॉपर्टी की विस्तृत विशेषताएं',
  },
  plot_size: {
    en: 'Plot / Covered Size',
    hi: 'प्लॉट / कवर्ड एरिया',
  },
  bhk_config: {
    en: 'BHK Configuration',
    hi: 'बीएचके कॉन्फ़िगरेशन',
  },
  parking_available: {
    en: 'Parking',
    hi: 'पार्किंग',
  },
  water_supply: {
    en: 'Water Supply',
    hi: 'पानी की आपूर्ति',
  },
  nearby_places: {
    en: 'Nearby Places & Landmarks',
    hi: 'आस-पास के प्रमुख स्थान',
  },
  nearby_schools: {
    en: 'Nearby Schools',
    hi: 'नजदीकी स्कूल व कॉलेज',
  },
  nearby_hospitals: {
    en: 'Nearby Hospitals',
    hi: 'नजदीकी अस्पताल',
  },
  nearby_markets: {
    en: 'Nearby Markets',
    hi: 'नजदीकी बाजार',
  },
  asking_price: {
    en: 'Total Asking Price',
    hi: 'मांगी गई कुल कीमत',
  },
  direct_broker: {
    en: 'Direct Broker Contact',
    hi: 'सीधा कंसल्टेंट संपर्क',
  },
  inquire_title: {
    en: 'Inquire About This Property',
    hi: 'इस प्रॉपर्टी के बारे में पूछताछ करें',
  },
  your_name: {
    en: 'Your Name',
    hi: 'आपका नाम',
  },
  phone_number: {
    en: 'Phone Number',
    hi: 'फ़ोन नंबर',
  },
  message_label: {
    en: 'Message / Requirements',
    hi: 'संदेश / आवश्यकताएं',
  },
  send_inquiry: {
    en: 'Request Details',
    hi: 'विवरण का अनुरोध करें',
  },
  request_callback: {
    en: 'Request Callback',
    hi: 'कॉल बैक का अनुरोध करें',
  },
  send_message: {
    en: 'Send Message',
    hi: 'संदेश भेजें',
  },

  // Footer
  footer_tagline: {
    en: 'Agra\'s premier real estate consultancy. Delivering transparent property registry, legal verification, and verified deals.',
    hi: 'आगरा की प्रमुख रियल एस्टेट कंसल्टेंसी। पारदर्शी रजिस्ट्री, कानूनी सत्यापन और सुरक्षित सौदे।',
  },
  quick_links: {
    en: 'Quick Links',
    hi: 'त्वरित लिंक',
  },
  categories_title: {
    en: 'Categories',
    hi: 'श्रेणियां',
  },
  get_in_touch: {
    en: 'Get in Touch',
    hi: 'संपर्क सूत्र',
  },
  office_address: {
    en: 'Shop 104, Block-B, Jeevan Jyoti Tower, Sanjay Place, Agra, Uttar Pradesh - 282002',
    hi: 'दुकान 104, ब्लॉक-बी, जीवन ज्योति टॉवर, संजय प्लेस, आगरा, उत्तर प्रदेश - 282002',
  },
  all_rights_reserved: {
    en: 'All rights reserved.',
    hi: 'सर्वाधिकार सुरक्षित।',
  }
};
