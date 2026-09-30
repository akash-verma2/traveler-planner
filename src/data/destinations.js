// Local Destination Data for TravelPlanner
// Pure JavaScript mock data - zero external API or API keys required

export const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80";

export const DESTINATIONS = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    region: "Europe",
    categories: ["City", "Cultural", "Luxury"],
    description: "The City of Light dazzles with iconic monuments, world-class art museums, charming sidewalk bistros, and romantic Seine riverbanks.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    bestTime: "April - June & September - October",
    dailyBudget: 130,
    accommodation: 75,
    food: 35,
    transport: 20,
    attractions: [
      "Eiffel Tower & Champ de Mars",
      "Louvre Museum & Glass Pyramid",
      "Montmartre & Sacré-Cœur Basilica",
      "Notre-Dame Cathedral & Latin Quarter",
      "Musée d'Orsay"
    ],
    travelTips: [
      "Purchase museum passes in advance to bypass long ticket lines.",
      "Use the Paris Metro with a contactless Navigo Easy card for seamless travel.",
      "Greet shopkeepers with 'Bonjour' before asking questions."
    ]
  },
  {
    id: 2,
    name: "Tokyo",
    country: "Japan",
    region: "Asia",
    categories: ["City", "Cultural", "Adventure"],
    description: "A breathtaking fusion of ultramodern neon skyscrapers and historic temples, renowned for peerless gastronomy, spotless streets, and efficient transit.",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    bestTime: "March - May (Cherry Blossoms) & October - November",
    dailyBudget: 110,
    accommodation: 60,
    food: 35,
    transport: 15,
    attractions: [
      "Shibuya Crossing & Hachiko Statue",
      "Senso-ji Temple in Asakusa",
      "Shinjuku Gyoen National Garden",
      "Meiji Jingu Shrine & Harajuku",
      "teamLab Planets Digital Art"
    ],
    travelTips: [
      "Get a digital Suica or Pasmo card on your phone for easy train transit.",
      "Keep cash on hand; small ramen shops and street stalls often do not accept cards.",
      "Convenience stores (Konbini) serve surprisingly gourmet, affordable meals."
    ]
  },
  {
    id: 3,
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    categories: ["Beach", "Nature", "Relaxation", "Budget"],
    description: "Tropical paradise famed for lush emerald rice terraces, volcanic peaks, sacred Hindu sea temples, world-class surf breaks, and serene yoga retreats.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    bestTime: "May - September (Dry Season)",
    dailyBudget: 55,
    accommodation: 30,
    food: 15,
    transport: 10,
    attractions: [
      "Uluwatu Temple & Sunset Kecak Dance",
      "Tegallalang Rice Terraces in Ubud",
      "Tanah Lot Sea Temple",
      "Mount Batur Sunrise Volcano Trek",
      "Seminyak & Canggu Beaches"
    ],
    travelTips: [
      "Hire a scooter or private driver through Grab/Gojek for flexible day trips.",
      "Dress respectfully with a sarong when entering Balinese Hindu temples.",
      "Drink bottled or filtered water rather than tap water."
    ]
  },
  {
    id: 4,
    name: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East",
    categories: ["City", "Luxury", "Adventure"],
    description: "A visionary desert metropolis boasting the world's tallest skyscrapers, opulent shopping malls, gold souks, and heart-pumping desert dune safaris.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    bestTime: "November - March (Mild Winter)",
    dailyBudget: 165,
    accommodation: 95,
    food: 45,
    transport: 25,
    attractions: [
      "Burj Khalifa Observation Deck",
      "The Dubai Mall & Fountain Show",
      "Palm Jumeirah & Atlantis",
      "Desert Safari Dune Bashing & BBQ",
      "Museum of the Future"
    ],
    travelTips: [
      "Visit during the winter months to enjoy comfortable outdoor temperatures.",
      "The driverless Dubai Metro connects DXB airport directly to downtown.",
      "Dress modestly in government buildings and traditional heritage districts."
    ]
  },
  {
    id: 5,
    name: "London",
    country: "United Kingdom",
    region: "Europe",
    categories: ["City", "Cultural"],
    description: "A grand historic powerhouse where royal royal palaces, Shakespearean theatre, iconic double-decker buses, and vibrant free national museums converge.",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
    bestTime: "May - September",
    dailyBudget: 140,
    accommodation: 80,
    food: 40,
    transport: 20,
    attractions: [
      "Tower Bridge & Tower of London",
      "British Museum (Free Admission)",
      "Big Ben & Palace of Westminster",
      "Buckingham Palace Changing of Guard",
      "Borough Market & South Bank"
    ],
    travelTips: [
      "Most major museums (British Museum, Tate Modern, Natural History) offer free entry.",
      "Tap your contactless credit/debit card on London Underground gates.",
      "Pack a compact umbrella; London weather is famously unpredictable."
    ]
  },
  {
    id: 6,
    name: "New York",
    country: "United States",
    region: "North America",
    categories: ["City", "Cultural", "Entertainment"],
    description: "The city that never sleeps offers electric Broadway shows, towering Manhattan architecture, sprawling Central Park, and diverse global neighborhoods.",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80",
    bestTime: "September - November & April - June",
    dailyBudget: 175,
    accommodation: 105,
    food: 45,
    transport: 25,
    attractions: [
      "Central Park & The Ramble",
      "Empire State Building / Top of the Rock",
      "Statue of Liberty & Ellis Island",
      "Broadway Theater District",
      "The High Line & Chelsea Market"
    ],
    travelTips: [
      "OMNY allows you to tap-and-pay for subways using any contactless card or phone.",
      "Walk the Brooklyn Bridge from Brooklyn towards Manhattan for the best skyline views.",
      "Tip 18-20% at full-service restaurants in NYC."
    ]
  },
  {
    id: 7,
    name: "Singapore",
    country: "Singapore",
    region: "Asia",
    categories: ["City", "Nature", "Luxury"],
    description: "A pristine garden city featuring futuristic solar Supertrees, Michelin-starred open-air hawker centers, lush cloud forests, and Marina Bay glamour.",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
    bestTime: "Year-round (November - January is festive)",
    dailyBudget: 130,
    accommodation: 75,
    food: 35,
    transport: 20,
    attractions: [
      "Gardens by the Bay & Supertree Grove",
      "Marina Bay Sands SkyPark",
      "Changi Jewel Indoor Waterfall",
      "Sentosa Island & Universal Studios",
      "Chinatown & Maxwell Hawker Centre"
    ],
    travelTips: [
      "Eat like a local at hawker centres (Maxwell, Newton, Lau Pa Sat) for $4-$8 gourmet meals.",
      "Tap-and-go with any credit card directly on MRT train turnstiles.",
      "Singapore is strict about cleanliness; littering and chewing gum are prohibited."
    ]
  },
  {
    id: 8,
    name: "Rome",
    country: "Italy",
    region: "Europe",
    categories: ["Cultural", "City"],
    description: "An open-air living museum where 2,000-year-old Roman amphitheaters and Vatican treasures stand proudly alongside espresso bars and trattorias.",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
    bestTime: "April - May & September - October",
    dailyBudget: 115,
    accommodation: 65,
    food: 35,
    transport: 15,
    attractions: [
      "Colosseum, Roman Forum & Palatine Hill",
      "Vatican City, St. Peter's & Sistine Chapel",
      "Trevi Fountain & Spanish Steps",
      "Pantheon & Piazza Navona",
      "Trastevere Cobblestone Food Tour"
    ],
    travelTips: [
      "Refill water bottles for free at public fontanelle ('nasoni') water fountains throughout Rome.",
      "Cover shoulders and knees when visiting churches including the Vatican.",
      "Try authentic Roman pasta dishes: Cacio e Pepe, Carbonara, and Amatriciana."
    ]
  },
  {
    id: 9,
    name: "Bangkok",
    country: "Thailand",
    region: "Asia",
    categories: ["City", "Cultural", "Budget"],
    description: "An intoxicating sensory journey through glittering gold temples, lively canal longboats, sizzling street food vendors, and energetic night markets.",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80",
    bestTime: "November - February (Cooler dry season)",
    dailyBudget: 50,
    accommodation: 25,
    food: 15,
    transport: 10,
    attractions: [
      "The Grand Palace & Wat Phra Kaew",
      "Wat Arun (Temple of Dawn)",
      "Chatuchak Weekend Market",
      "Chao Phraya River Express Ferry",
      "Khao San Road & Yaowarat Chinatown"
    ],
    travelTips: [
      "Ride the BTS Skytrain and MRT to effortlessly bypass Bangkok's heavy road traffic.",
      "Street food stalls with high local turnover are both delicious and safe.",
      "Negotiate tuk-tuk fares before getting in, or use Grab app for metered rides."
    ]
  },
  {
    id: 10,
    name: "Zermatt & Swiss Alps",
    country: "Switzerland",
    region: "Europe",
    categories: ["Mountains", "Nature", "Adventure", "Luxury"],
    description: "Postcard-perfect Alpine wonderland with snow-dusted summits, the legendary Matterhorn peak, pristine crystal lakes, and scenic cogwheel mountain trains.",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    bestTime: "June - September (Hiking) or Dec - March (Skiing)",
    dailyBudget: 190,
    accommodation: 110,
    food: 55,
    transport: 25,
    attractions: [
      "Matterhorn Glacier Paradise",
      "Gornergrat Railway & Viewpoint",
      "Lake Riffelsee Reflection Walk",
      "Glacier Express Panoramic Train",
      "Traditional Alpine Chalet Villages"
    ],
    travelTips: [
      "Zermatt is completely car-free; arrive comfortably by scenic train.",
      "Get a Swiss Travel Pass if planning multiple panoramic train rides and cable cars.",
      "Pick up fresh Swiss cheese and bread at local Coop or Migros supermarkets for scenic picnic lunches."
    ]
  },
  {
    id: 11,
    name: "Kerala",
    country: "India",
    region: "Asia",
    categories: ["Nature", "Beach", "Budget", "Relaxation"],
    description: "Known as God's Own Country, Kerala enchants travelers with peaceful palm-fringed backwaters, traditional houseboats, rolling tea hills, and Ayurvedic wellness.",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    bestTime: "September - March",
    dailyBudget: 45,
    accommodation: 22,
    food: 13,
    transport: 10,
    attractions: [
      "Alleppey (Alappuzha) Houseboat Cruise",
      "Munnar Misty Tea Plantations & Waterfalls",
      "Fort Kochi Chinese Fishing Nets & Heritage",
      "Periyar National Park Wildlife Sanctuary",
      "Varkala Cliff Beach & Sunset Views"
    ],
    travelTips: [
      "Book an overnight traditional kettuvallam houseboat stay in Alleppey.",
      "Savor authentic Kerala sadya meals served on fresh banana leaves.",
      "Visit spice plantations in Thekkady to see cardamoms, pepper, and cinnamon growing."
    ]
  },
  {
    id: 12,
    name: "Jaipur",
    country: "India",
    region: "Asia",
    categories: ["Cultural", "Budget", "City"],
    description: "The fabled Pink City of Rajasthan showcases majestic sandstone hill forts, ornate royal palaces, intricate geometric stepwells, and vibrant gemstone bazaars.",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    bestTime: "October - March (Comfortable Winter)",
    dailyBudget: 42,
    accommodation: 20,
    food: 12,
    transport: 10,
    attractions: [
      "Hawa Mahal (Palace of Winds)",
      "Amber Fort & Sheesh Mahal (Mirror Palace)",
      "City Palace & Royal Observatory (Jantar Mantar)",
      "Nahargarh Fort Sunset Viewpoint",
      "Johari Bazaar for Textiles & Jewelry"
    ],
    travelTips: [
      "Purchase the composite entrance ticket to visit Amber Fort, Jantar Mantar, and Hawa Mahal at a discount.",
      "Visit Nahargarh Fort right before dusk for sweeping panoramic views of the illuminated pink city.",
      "Taste authentic Dal Baati Churma and sweet Ghewar at heritage sweet shops."
    ]
  },
  {
    id: 13,
    name: "Barcelona",
    country: "Spain",
    region: "Europe",
    categories: ["City", "Cultural", "Beach"],
    description: "A sun-drenched Mediterranean jewel famous for Antoni Gaudí's whimsical modernist architecture, lively tapas bars, Gothic quarter lanes, and golden city beaches.",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80",
    bestTime: "May - June & September - October",
    dailyBudget: 110,
    accommodation: 60,
    food: 35,
    transport: 15,
    attractions: [
      "Basílica de la Sagrada Família",
      "Park Güell Colorful Mosaics",
      "Casa Batlló & Casa Milà",
      "Gothic Quarter & Barcelona Cathedral",
      "Barceloneta Beach Promenade"
    ],
    travelTips: [
      "Reserve Sagrada Família tickets 2-3 weeks in advance; they frequently sell out.",
      "Locals have dinner late, starting around 9:00 PM to 10:00 PM.",
      "Stay vigilant against pickpockets along Las Ramblas and crowded metro stations."
    ]
  },
  {
    id: 14,
    name: "Sydney",
    country: "Australia",
    region: "Oceania",
    categories: ["City", "Beach", "Nature"],
    description: "Australia's dazzling harbor city celebrated for its iconic sail-shaped Opera House, Sydney Harbour Bridge, famous Bondi coastal walks, and sun-soaked outdoor lifestyle.",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
    bestTime: "September - November & March - May",
    dailyBudget: 145,
    accommodation: 80,
    food: 42,
    transport: 23,
    attractions: [
      "Sydney Opera House & Circular Quay",
      "Sydney Harbour Bridge Climb or Pylon Lookout",
      "Bondi to Coogee Coastal Walk",
      "Manly Ferry Ride across Sydney Cove",
      "Taronga Zoo with Harbor Backdrop"
    ],
    travelTips: [
      "Ride the public ferry from Circular Quay to Manly for the cheapest, most scenic harbor tour.",
      "Use your contactless bank card on all Opal trains, buses, and ferries.",
      "Always swim between the red and yellow safety flags at Bondi and Manly beaches."
    ]
  },
  {
    id: 15,
    name: "Cape Town",
    country: "South Africa",
    region: "Africa",
    categories: ["Nature", "Beach", "Adventure", "Mountains"],
    description: "A dramatic seaside metropolis crowned by flat-topped Table Mountain, dramatic Atlantic cliffs, penguin-populated beaches, and world-renowned Cape Winelands.",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80",
    bestTime: "November - March (Southern Hemisphere Summer)",
    dailyBudget: 85,
    accommodation: 45,
    food: 25,
    transport: 15,
    attractions: [
      "Table Mountain Aerial Cableway",
      "Boulders Beach African Penguin Colony",
      "Cape Point & Cape of Good Hope",
      "Kirstenbosch National Botanical Garden",
      "V&A Waterfront & Robben Island Ferry"
    ],
    travelTips: [
      "Take Table Mountain Cableway on the first clear sunny day, as weather changes quickly.",
      "Use Uber for safe, reliable, and very affordable transportation around the city.",
      "Drive Chapman's Peak Drive for one of the most stunning coastal road views in the world."
    ]
  },
  {
    id: 16,
    name: "Machu Picchu & Cusco",
    country: "Peru",
    region: "South America",
    categories: ["Cultural", "Adventure", "Mountains"],
    description: "The mysterious 15th-century Inca citadel perched high above misty Andean cloud forests, flanked by ancient stone terraces, sacred temples, and llama trails.",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80",
    bestTime: "May - October (Dry Andean Season)",
    dailyBudget: 80,
    accommodation: 40,
    food: 22,
    transport: 18,
    attractions: [
      "Machu Picchu Lost Inca Citadel",
      "Cusco Plaza de Armas & San Pedro Market",
      "Sacred Valley of the Incas & Ollantaytambo",
      "Rainbow Mountain (Vinicunca)",
      "Inca Trail / Salkantay Trekking"
    ],
    travelTips: [
      "Acclimatize in Cusco for 2 days to prevent altitude sickness before strenuous hiking.",
      "Book Machu Picchu entrance tickets and train permits months ahead due to daily quotas.",
      "Drink traditional coca tea to help with high-altitude adjustment."
    ]
  }
];

export const CATEGORIES = [
  "Beach",
  "Mountains",
  "City",
  "Adventure",
  "Nature",
  "Cultural",
  "Luxury",
  "Budget"
];

export const REGIONS = [
  "All",
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Africa",
  "Middle East",
  "Oceania"
];

export const BUDGET_RANGES = [
  { label: "Any", value: "all" },
  { label: "Budget (<$80/day)", value: "budget" },
  { label: "Moderate ($80-$150/day)", value: "moderate" },
  { label: "Luxury (>$150/day)", value: "luxury" }
];

export const ACTIVITY_CATEGORIES = [
  "Sightseeing",
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Relaxation",
  "Other"
];
