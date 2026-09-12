import Property from '../models/Property';
import Blog from '../models/Blog';
import User from '../models/User';
import bcrypt from 'bcryptjs';

const DEFAULT_EMAIL = process.env.ADMIN_EMAIL || 'admin@a1properties.com';
const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || 'admin_secure_password_123';

export const seedDatabase = async () => {
  try {
    // 1. Seed Admin User
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('Seeding default admin user...');
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, salt);
      await User.create({
        email: DEFAULT_EMAIL,
        passwordHash,
        name: 'Vishal Verma',
      });
      console.log(`Admin user seeded. Login with: ${DEFAULT_EMAIL} / ${DEFAULT_PASSWORD}`);
    }

    // 2. Seed Properties
    const propertyCount = await Property.countDocuments();
    if (propertyCount === 0) {
      console.log('Seeding demo properties in Agra...');
      
      const sampleProperties = [
        {
          title: '3 BHK Park Facing Independent House in Avas Vikas Colony',
          description: 'Newly built modern 3 BHK duplex independent house situated in the prime location of Avas Vikas Colony, Agra. This ADA approved property is west facing and directly park facing, located on a wide 30 ft road. Built on a 75 Sq Yards plot, it offers spacious bedrooms, elegant interior woodwork, stylish stainless steel balcony railings, designer iron main gates, and dedicated car ramp & parking. Ready to move with clear legal title and documentation.',
          price: 7500000, // 75 Lakhs
          propertyType: 'house',
          bhk: 3,
          plotSize: '75 Sq Yards',
          address: 'Sector 7, Avas Vikas Colony, Near Central Park',
          locality: 'Avas Vikas',
          city: 'Agra',
          state: 'Uttar Pradesh',
          coordinates: { lat: 27.2144, lng: 78.0289 },
          nearbySchools: ['Milton Public School', 'St. Clares Senior Secondary School', 'Delhi Public School Agra'],
          nearbyHospitals: ['Pushpanjali Hospital', 'Upadhyay Hospital', 'Rainbow Hospital'],
          nearbyMarkets: ['Avas Vikas Local Market', 'Sikandra Commercial Hub', 'Bodhaki Road Market'],
          parking: true,
          waterSupply: '24 Hours Supply + Submersible',
          contactNumber: '+91 97565 35933',
          whatsappNumber: '+91 97565 35933',
          images: [
            '/properties/avas-vikas-3bhk-house.jpg'
          ],
          status: 'available',
          featured: true,
          views: 185
        },
        {
          title: 'Industrial Warehouse / Commercial Shed on Rent (3000 to 10000 Sq Ft)',
          description: 'Prime industrial warehouse & commercial shed available for rent on Main Kanpur-Agra Highway (NH-19), near Kuberpur, Agra. Flexible covered space available from 3,000 Sq Ft up to 10,000 Sq Ft at an attractive rate of ₹20/Sq Ft with full industrial electricity connection & water connection included ("Connection Sahit"). Features high ceiling steel PEB structure, heavy-duty paved flooring for multi-axle trucks/trailers, built-in office cabin, and wide sliding gate entry with immediate connectivity to Agra-Lucknow and Yamuna Expressways.',
          price: 60000, // Starts at 60k/month (3000 sq ft @ ₹20/sq ft)
          propertyType: 'rent',
          plotSize: '3000 - 10000 Sq Ft',
          address: 'Main Kanpur-Agra Highway (NH-19), Near Kuberpur Toll Plaza & Outer Ring Road',
          locality: 'Kuberpur',
          city: 'Agra',
          state: 'Uttar Pradesh',
          coordinates: { lat: 27.2289, lng: 78.1154 },
          nearbySchools: ['Transport Nagar Logistics Hub', 'Kuberpur Industrial Belt'],
          nearbyHospitals: ['Highway Trauma Center Kuberpur', 'Emergency Medical Center'],
          nearbyMarkets: ['Kuberpur Wholesale Market', 'Transport Nagar Hub', 'Agra Grain Market'],
          parking: true,
          waterSupply: '24 Hours Water & Heavy Electricity Connection',
          contactNumber: '+91 97565 35933',
          whatsappNumber: '+91 97565 35933',
          images: [
            '/properties/warehouse-kuberpur-1.png',
            '/properties/warehouse-kuberpur-2.jpg',
            '/properties/warehouse-kuberpur-3.jpg',
            '/properties/warehouse-kuberpur-4.png'
          ],
          status: 'available',
          featured: true,
          views: 140
        },
        {
          title: 'Luxury 3 BHK Duplex Villa in Gated Society, Shastripuram',
          description: 'Brand new ultra-modern 3 BHK duplex luxury villa located in a premium gated society at prime location of Shastripuram, Agra. Built on 100 Sq. Yards plot with contemporary elevation, fluted concrete architectural wall finishes, frameless glass balcony railings, and individual car ramp & parking. Interior features premium vitrified flooring, designer false ceiling with warm ambient LED strip lighting, modular bathrooms with wall-hung commodes & luxury quartz vanity, and stainless steel staircase railings. Society offers 24x7 security, lush green central park with children\'s play area / slides, wide concrete roads, and uninterrupted water supply.',
          price: 11200000, // 1.12 Crore
          propertyType: 'house',
          bhk: 3,
          plotSize: '100 Sq Yards',
          address: 'Palm Green Enclave, Sector C, Main Shastripuram',
          locality: 'Shastripuram',
          city: 'Agra',
          state: 'Uttar Pradesh',
          coordinates: { lat: 27.1892, lng: 77.9825 },
          nearbySchools: ['Holy Public School', 'Shastripuram Academy', 'St. Andrews Public School'],
          nearbyHospitals: ['Jaikrishan Hospital', 'Grover Hospital', 'Rainbow Hospital'],
          nearbyMarkets: ['Shastripuram Central Plaza', 'Sikandra Crossing Market', 'Westend Mall'],
          parking: true,
          waterSupply: '24 Hours Society Overhead Reservoir & Ganga Jal',
          contactNumber: '+91 97565 35933',
          whatsappNumber: '+91 97565 35933',
          images: [
            '/properties/shastripuram-villa-1.png',
            '/properties/shastripuram-villa-6.png',
            '/properties/shastripuram-villa-2.png',
            '/properties/shastripuram-villa-3.png',
            '/properties/shastripuram-villa-4.png',
            '/properties/shastripuram-villa-7.jpg',
            '/properties/shastripuram-villa-5.jpg'
          ],
          status: 'available',
          featured: true,
          views: 165
        },
        {
          title: 'Operational Educational Institution / College Campus (10,185 Sq Mtr Land)',
          description: 'Fully operational and approved educational institution / college campus situated in prime location of Bamrauli Katara, near Hotel Ramada Plaza, off Main Fatehabad Road, Agra. Spanning a vast 10,185 Sq. Meters of lush green land (~2.51 Acres) with approx. 60,000 Sq. Ft. of built-up institutional construction.\n\nApproved Courses & Infrastructure:\n• Approved Courses: B.Ed (100 Seats) & BTC / D.El.Ed (50 Seats)\n• Infrastructure: Complete Library, furniture for 500+ students, and small transport van\n• Legal Status: Registered under Society Act with valid 80G & 12A tax exemption certificates\n• Campus: Beautiful landscaped gardens, paved pathways, vertical ivy green walls, spacious corridors & office blocks.',
          price: 0, // Price on Request
          propertyType: 'commercial',
          plotSize: '10,185 Sq Mtrs (~2.51 Acres)',
          address: 'Near Hotel Ramada Plaza, Bamrauli Katara, Main Fatehabad Road',
          locality: 'Bamrauli Katara',
          city: 'Agra',
          state: 'Uttar Pradesh',
          coordinates: { lat: 27.1356, lng: 78.1128 },
          nearbySchools: ['Fatehabad Road Educational Hub', 'Heritage International School'],
          nearbyHospitals: ['Rainbow Hospital Fatehabad Road', 'Agra Cantt Health Center'],
          nearbyMarkets: ['Ramada Plaza Commercial Zone', 'Fatehabad Road Retail Corridor'],
          parking: true,
          waterSupply: '24 Hours Supply & Dedicated Power Substation',
          contactNumber: '+91 97565 35933',
          whatsappNumber: '+91 97565 35933',
          images: [
            '/properties/college-fatehabad-1.png',
            '/properties/college-fatehabad-2.jpg',
            '/properties/college-fatehabad-3.jpg',
            '/properties/college-fatehabad-4.png',
            '/properties/college-fatehabad-9.png',
            '/properties/college-fatehabad-8.png',
            '/properties/college-fatehabad-6.png',
            '/properties/college-fatehabad-5.png',
            '/properties/college-fatehabad-7.png',
            '/properties/college-fatehabad-spec.png'
          ],
          status: 'available',
          featured: true,
          views: 210
        }
      ];

      // Note: pre-validate hook will generate the slugs
      await Property.create(sampleProperties);
      console.log('Demo properties seeded.');
    }

    // 3. Seed Blogs
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      console.log('Seeding blog articles...');
      
      const sampleBlogs = [
        {
          title: 'Best Areas to Buy Property in Agra',
          excerpt: 'Planning to invest in Agra real estate? Read this comprehensive guide highlighting the top residential and commercial areas like Dayalbagh, Fatehabad Road, and Shastri Nagar.',
          content: `Investing in real estate in Agra is a decision that offers both heritage value and long-term financial appreciation. With infrastructure improvements like the Agra Metro and rapid transit systems connecting to Noida, property demand is higher than ever.

Here are the best areas to buy property in Agra:

### 1. Dayalbagh
Dayalbagh is well-known for its clean surroundings, academic vibe, and peaceful residential communities. If you prefer independent houses, Dayalbagh provides structured colonies, wide roads, and parks.

### 2. Fatehabad Road & Taj Ganj
For those seeking luxury apartments or commercial properties, Fatehabad Road is the hotspot. It boasts major shopping complexes, premium hotels, and beautiful luxury high-rises with direct views of the Taj Mahal.

### 3. Shastri Nagar
Located near Sikandra, Shastri Nagar is a mature, well-connected residential locality. It is popular among families because of its proximity to schools, hospitals, and local transport facilities.

**Conclusion:** Decide based on your budget and preferences. For peace and villas, go for Dayalbagh. For modern apartments, Taj Ganj/Fatehabad Road is the clear winner.`,
          coverImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
          views: 150
        },
        {
          title: 'Property Rates in Agra (2026 Guide)',
          excerpt: 'An detailed overview of real estate rates in Agra. Know the average prices per square yard and square foot in major Agra localities.',
          content: `Real estate prices in Agra have seen steady growth over the last 3 years, driven by commercial expansion and transport improvements. Here is a breakdown of current market rates in major areas:

| Locality | Average Rate (Residential Plots) | Flat Rates (Avg 3 BHK) |
|---|---|---|
| **Dayalbagh** | ₹45,000 - ₹65,000 per Sq Yard | ₹60 Lakhs - ₹90 Lakhs |
| **Sanjay Place** | ₹1,50,000 - ₹2,50,000 per Sq Yard | (Mostly Commercial Listings) |
| **Taj Ganj / Fatehabad Road** | ₹50,000 - ₹75,000 per Sq Yard | ₹75 Lakhs - ₹1.2 Crore |
| **Shastri Nagar / Sikandra** | ₹35,000 - ₹50,000 per Sq Yard | ₹45 Lakhs - ₹70 Lakhs |
| **Kamla Nagar** | ₹55,000 - ₹80,000 per Sq Yard | ₹55 Lakhs - ₹80 Lakhs |

### Factors Affecting Property Value in Agra
- **Road Width:** Properties on 30ft or 40ft wide roads carry a premium.
- **Water Quality:** Municipal connections vs ground-water availability play a major role in Shastri Nagar and Sikandra.
- **Agra Metro Proximity:** Areas within 1km of upcoming Metro stations are commanding a 15-20% price premium.`,
          coverImage: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=800&q=80',
          views: 230
        },
        {
          title: 'Registry Process in Uttar Pradesh: A Step-by-Step Guide',
          excerpt: 'Understanding the property registry process in Uttar Pradesh (Agra). Learn about registry fees, stamp duty rates, and required documentation.',
          content: `Registering a property in Uttar Pradesh is a formal legal procedure that must be done at the Sub-Registrar's Office (SRO) in the local jurisdiction. Here is the step-by-step process:

### Step 1: Document Preparation
Prepare the Sale Deed. Ensure it details:
- Complete details of buyer and seller.
- Property area, layout map, boundaries, and construction status.
- Final agreed sale value.

### Step 2: Stamp Duty Calculation
For Uttar Pradesh:
- **Male Buyer:** 7% of property circle rate value.
- **Female Buyer:** 6% (discounted by 1%).
- **Joint Ownership (Male + Female):** 6.5%.
*Registration fee is generally 1% of the property value.*

### Step 3: Online Fee Payment & Slot Booking
Log on to the IGRSUP portal (igrsup.gov.in), fill in property data, pay the stamp duty online, and book an appointment slot at the SRO office in Agra.

### Step 4: Sub-Registrar Office Visit
On the booked date, both buyer, seller, and two witnesses must visit the SRO office. Carry:
- Original Aadhaar Card and PAN Card.
- Copy of the paid stamp duty receipt.
- Two passport size photos.
- The Sale Deed copy.

Once verified, biometric scans and photographs are taken, and the document is registered.`,
          coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
          views: 180
        },
        {
          title: 'Best Investment Locations in Agra for High Returns',
          excerpt: 'Looking to invest for high rental yields and capital gains? Check out these upcoming investment hubs around Agra.',
          content: `If you are looking for investments that will double in value over the next 5 to 7 years, you must look at outer development zones and transit corridors. Here are the top locations:

### 1. Agra-Lucknow Expressway Outer Ring Road
As the ring road connects the highway systems around Agra, residential townships and logistics parks are booming. Land prices here are still affordable (₹15,000 - ₹25,000 per Sq Yard), making it a high-potential investment zone.

### 2. Inner Ring Road Corridor (near Fatehabad Road)
The Inner Ring Road connects Yamuna Expressway to Fatehabad Road. Since it enables swift travel to Delhi/Noida, multiple modern gated townships are coming up in this corridor. It is perfect for commercial retail complexes and high-end residential plots.

### 3. Dayalbagh Extension Zones
The extension areas beyond Dayalbagh are witnessing significant demand as buyers look for pollution-free spaces. With the Dayalbagh educational institutions nearby, rental demand for students and staff remains high.

### Summary Strategy
- **Low Budget (< 25 Lakhs):** Go for plots near Agra-Lucknow Expressway.
- **Medium Budget (30-60 Lakhs):** Residential plots in Dayalbagh Extension.
- **High Budget (1 Crore+):** Commercial plots or shops along the Inner Ring Road.`,
          coverImage: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80',
          views: 310
        }
      ];

      await Blog.create(sampleBlogs);
      console.log('Demo blog posts seeded.');
    }

  } catch (error) {
    console.error('Database seeding failed:', error);
  }
};
