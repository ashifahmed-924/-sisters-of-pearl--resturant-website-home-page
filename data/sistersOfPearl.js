/**
 * Central business data for Sisters of Pearl.
 * Menu prices: only set when visibly verified from a current source.
 * Research date: 2026-10-07
 */

export const business = {
  name: "Sisters of Pearl",
  shortName: "Sisters of Pearl",
  tagline: "Chinese dining in Glen Waverley",
  cuisine: "Chinese / Cantonese",
  description:
    "Sisters of Pearl is a Chinese restaurant in Glen Waverley, with a menu featuring seafood, Cantonese-style dishes and shared dining.",

  address: {
    street: "8 Kerrie Rd",
    suburb: "Glen Waverley",
    state: "VIC",
    postcode: "3150",
    country: "Australia",
    full: "8 Kerrie Rd, Glen Waverley VIC 3150, Australia",
    locatedIn: "Kerrie Road Shops",
  },

  phone: "+61 3 9803 3489",
  phoneTel: "tel:+61398033489",
  email: "booking@sistersofpearl.com.au",
  emailMailto: "mailto:booking@sistersofpearl.com.au",

  instagram: "https://instagram.com/sistersofpearlau",
  instagramHandle: "@sistersofpearlau",

  mapsUrl:
    "https://www.google.com/maps/place/Sisters+of+Pearl/@-37.875867,145.1753485,17z/data=!4m7!3m6!1s0x6ad63fe527a0859d:0x1be044f157e7f0a2!8m2!3d-37.8758713!4d145.1779234!10e9!16s%2Fg%2F11fslttzlm",

  website: "https://sistersofpearl.com.au/",

  reservationUrl: null,

  facebook: "https://facebook.com/108218867232411",

  google: {
    rating: 4.0,
    reviewCount: 263,
    category: "Asian restaurant",
    researchedAt: "2026-10-07",
    source: "Google Maps listing",
  },

  hoursNote:
    "Trading hours can change. Please confirm before visiting.",

  hours: [
    { day: "Monday", hours: "12–3 / 5–10", closed: false },
    { day: "Tuesday", hours: "Closed", closed: true },
    { day: "Wednesday", hours: "12–3 / 5–10", closed: false },
    { day: "Thursday", hours: "12–3 / 5–10", closed: false },
    { day: "Friday", hours: "12–3 / 5–10", closed: false },
    { day: "Saturday", hours: "12–3 / 5–10", closed: false },
    { day: "Sunday", hours: "12–3 / 5–10", closed: false },
  ],

  hoursSource: "Google Maps — verified 2026-10-07",

  facts: [
    { label: "Glen Waverley", detail: "8 Kerrie Rd" },
    { label: "Lunch + Dinner", detail: "Split service days" },
    { label: "Chinese / Cantonese", detail: "Shared dining" },
  ],

  diningDetails: ["Lunch", "Dinner", "Reservations", "Table service"],

  /**
   * Menu items verified by name from public menu listings / reviews.
   * Prices remain null — no legible current price sheet was available.
   */
  menuCategories: [
    {
      id: "appetisers",
      label: "Appetisers",
      tagline: "Small bites, bold flavours",
      icon: "appetisers",
      items: [
        {
          id: "sesame-prawn",
          name: "Sesame Prawn",
          chineseName: null,
          category: "Appetisers",
          description: "Crispy prawns finished with toasted sesame.",
          price: null,
          image: "/images/sisters-of-pearl/menu-prawn.jpg",
          badge: "Chef's Choice",
          featured: true,
          source: "Public menu listing — restaurants-info / Zmenu",
          verified: true,
        },
        {
          id: "chinese-sausage",
          name: "Chinese Sausage",
          chineseName: null,
          category: "Appetisers",
          description: "Sweet-savoury lap cheong, simply prepared.",
          price: null,
          image: "/images/sisters-of-pearl/dish-02.jpg",
          badge: null,
          featured: false,
          source: "Public menu listing",
          verified: true,
        },
        {
          id: "stuffed-crab-claw",
          name: "Stuffed Crab Claw",
          chineseName: "酿蟹钳",
          category: "Appetisers",
          description: "Delicate crab claw with a golden crumb finish.",
          price: null,
          image: "/images/sisters-of-pearl/menu-sesame.jpg",
          badge: "Popular",
          featured: false,
          source: "Public menu listing (Chinese name as printed)",
          verified: true,
        },
      ],
    },
    {
      id: "soup",
      label: "Soup",
      tagline: "Warming bowls, classic broths",
      icon: "soup",
      items: [
        {
          id: "vegetarian-soup",
          name: "Vegetarian Soup",
          chineseName: null,
          category: "Soup",
          description: "A clear, gentle broth of seasonal vegetables.",
          price: null,
          image: "/images/sisters-of-pearl/mosaic-03.jpg",
          badge: null,
          featured: false,
          source: "Public menu listing",
          verified: true,
        },
        {
          id: "wonton-soup",
          name: "Wonton Soup",
          chineseName: null,
          category: "Soup",
          description: "Hand-folded wontons in a fragrant clear broth.",
          price: null,
          image: "/images/sisters-of-pearl/dish-01.jpg",
          badge: "Popular",
          featured: false,
          source: "Public menu listing",
          verified: true,
        },
        {
          id: "sichuan-hot-sour",
          name: "Sichuan Hot & Sour Soup",
          chineseName: "四川酸辣羹",
          category: "Soup",
          description: "A lively balance of heat, vinegar and spice.",
          price: null,
          image: "/images/sisters-of-pearl/mosaic-01.jpg",
          badge: "Chef's Choice",
          featured: false,
          source: "Public menu listing (Chinese name as printed)",
          verified: true,
        },
        {
          id: "chicken-sweet-corn",
          name: "Chicken Sweet Corn Soup",
          chineseName: null,
          category: "Soup",
          description: "Silky sweet corn broth with tender chicken.",
          price: null,
          image: "/images/sisters-of-pearl/gallery-04.jpg",
          badge: null,
          featured: false,
          source: "Public menu listing",
          verified: true,
        },
      ],
    },
    {
      id: "seafood",
      label: "Seafood",
      tagline: "Ocean-fresh, made for sharing",
      icon: "seafood",
      items: [
        {
          id: "steamed-fish",
          name: "Steamed Fish",
          chineseName: null,
          category: "Seafood",
          description: "Gently steamed and finished with fragrant aromatics.",
          price: null,
          image: "/images/sisters-of-pearl/menu-fish.jpg",
          badge: "Chef's Choice",
          featured: true,
          source: "Google Maps topics + Tripadvisor reviews (steamed fish / barramundi)",
          verified: true,
        },
        {
          id: "scallops",
          name: "Scallops",
          chineseName: null,
          category: "Seafood",
          description: "Sweet scallops prepared for the shared table.",
          price: null,
          image: "/images/sisters-of-pearl/seafood-wide.jpg",
          badge: null,
          featured: false,
          source: "Public guest reviews",
          verified: true,
        },
        {
          id: "prawns-scallops-nest",
          name: "Prawns and Scallops in Bird's Nest",
          chineseName: null,
          category: "Seafood",
          description: "Prawns and scallops nestled in a crisp basket.",
          price: null,
          image: "/images/sisters-of-pearl/gallery-01.jpg",
          badge: "Popular",
          featured: true,
          source: "Public guest reviews",
          verified: true,
        },
      ],
    },
    {
      id: "poultry",
      label: "Poultry",
      tagline: "Crispy, glazed, shared plates",
      icon: "poultry",
      items: [
        {
          id: "honey-chicken",
          name: "Honey Chicken",
          chineseName: "蜜糖鸡球",
          category: "Poultry",
          description: "Crispy golden pieces with a warm honey glaze.",
          price: null,
          image: "/images/sisters-of-pearl/dish-03.jpg",
          badge: "Chef's Choice",
          featured: true,
          source: "Public menu listing (Chinese name as printed)",
          verified: true,
        },
        {
          id: "sweet-sour-crispy",
          name: "Sweet and Sour Crispy",
          chineseName: null,
          category: "Poultry",
          description: "Crisp pieces tossed in a bright sweet-sour finish.",
          price: null,
          image: "/images/sisters-of-pearl/menu-duck.jpg",
          badge: null,
          featured: false,
          source: "Public menu listing (truncated name on aggregator)",
          verified: true,
        },
      ],
    },
    {
      id: "noodles",
      label: "Noodles",
      tagline: "Wok-fired favourites",
      icon: "noodles",
      items: [
        {
          id: "soy-sauce-noodles",
          name: "Soy Sauce Fried Noodles",
          chineseName: "豉油皇炒麵",
          category: "Noodles",
          description: "Wok-tossed noodles with fragrant soy.",
          price: null,
          image: "/images/sisters-of-pearl/menu-noodles.jpg",
          badge: "Popular",
          featured: true,
          source: "Public menu listing (Chinese name as printed)",
          verified: true,
        },
        {
          id: "beef-satay-noodle",
          name: "Beef in Satay Sauce Fried Rice Noodle",
          chineseName: null,
          category: "Noodles",
          description: "Flat rice noodles with beef in satay sauce.",
          price: null,
          image: "/images/sisters-of-pearl/dish-05.jpg",
          badge: null,
          featured: false,
          source: "Public menu listing",
          verified: true,
        },
        {
          id: "efu-mushroom",
          name: "Stir Fried E-Fu Noodle with Mushroom Oyster Sauce",
          chineseName: null,
          category: "Noodles",
          description: "Springy e-fu noodles with mushroom oyster sauce.",
          price: null,
          image: "/images/sisters-of-pearl/gallery-06.jpg",
          badge: null,
          featured: false,
          source: "Public menu listing",
          verified: true,
        },
        {
          id: "xo-eggplant-efu",
          name: "XO Sauce Eggplant with Pork Floss and E-Fu Noodles",
          chineseName: "XO醬茄子肉鬆炆伊麵",
          category: "Noodles",
          description: "E-fu noodles with XO eggplant and pork floss.",
          price: null,
          image: "/images/sisters-of-pearl/dish-04.jpg",
          badge: "Chef's Choice",
          featured: false,
          source: "Public menu listing (Chinese name as printed)",
          verified: true,
        },
      ],
    },
  ],

  signatureDishes: [
    {
      id: "sig-01",
      number: "01",
      name: "Steamed Fish",
      description:
        "Gently steamed and finished with fragrant aromatics — a house favourite.",
      layout: "image-left",
      image: "/images/sisters-of-pearl/dish-01.jpg",
      alt: "Editorial photograph of steamed dumplings and shared plates",
      href: "#menu",
    },
    {
      id: "sig-02",
      number: "02",
      name: "Honey Chicken",
      description:
        "Crispy golden pieces glazed in a warm honey finish, made for sharing.",
      layout: "title-left",
      image: "/images/sisters-of-pearl/dish-03.jpg",
      alt: "Crispy glazed honey chicken with greens",
      href: "#menu",
    },
    {
      id: "sig-03",
      number: "03",
      name: "Prawns + Scallops",
      description:
        "Ocean-fresh seafood, carefully prepared and plated for the table.",
      layout: "crossing",
      image: "/images/sisters-of-pearl/dish-05.jpg",
      alt: "Seafood plating with prawns and shared dining",
      href: "#menu",
    },
  ],

  kitchenFeatures: [
    { id: "fresh", label: "Fresh Ingredients", icon: "leaf" },
    { id: "recipes", label: "Traditional Recipes", icon: "bowl" },
    { id: "chefs", label: "Expert Chefs", icon: "chef" },
    { id: "passion", label: "Made with Passion", icon: "heart" },
  ],

  kitchenScene: {
    image: "/images/sisters-of-pearl/restaurant-interior.jpg",
    alt: "Open kitchen and dining room at Sisters of Pearl",
    badge: "From our kitchen to your table",
  },

  seaMoment: {
    label: "04 — From the sea",
    title: ["Caught for the", "shared table."],
    accentWord: "shared",
    copy: "Ocean-fresh seafood prepared for sharing — steamed fish, scallops, and prawns from our Glen Waverley kitchen.",
    cta: { label: "Browse seafood", href: "#menu" },
    script: "Fresh from the ocean",
    vertical: "Seafood · Glen Waverley",
    pearls: [
      {
        id: "sea-main",
        image: "/images/sisters-of-pearl/seafood-wide.jpg",
        alt: "Seafood presentation for shared Cantonese dining",
        size: "main",
      },
      {
        id: "sea-fish",
        image: "/images/sisters-of-pearl/menu-fish.jpg",
        alt: "Steamed fish finished with aromatics",
        size: "mid",
        caption: "Steamed Fish",
      },
      {
        id: "sea-prawn",
        image: "/images/sisters-of-pearl/menu-prawn.jpg",
        alt: "Prawn dish detail",
        size: "small",
        caption: "Prawns",
      },
    ],
  },

  /**
   * Offers: lunch sets and banquets are publicly evidenced,
   * but current titles/prices were not confidently verified.
   */
  offers: [
    {
      id: "lunch",
      title: "Lunch",
      eyebrow: "Day service",
      body: "Ask about today's lunch sets.",
      cta: "Enquire",
      image: "/images/sisters-of-pearl/lunch-panel.jpg",
      verifiedContents: false,
      verifiedPrice: false,
    },
    {
      id: "banquet",
      title: "Banquet",
      eyebrow: "Shared dining",
      body: "Enquire about banquet and group dining options.",
      cta: "Enquire",
      image: "/images/sisters-of-pearl/banquet-panel.jpg",
      verifiedContents: false,
      verifiedPrice: false,
    },
  ],

  gallery: [
    {
      id: "g1",
      src: "/images/sisters-of-pearl/gallery-01.jpg",
      label: "Seafood",
      aspect: "portrait",
      alt: "Seafood dish detail",
    },
    {
      id: "g2",
      src: "/images/sisters-of-pearl/gallery-02.jpg",
      label: "The Table",
      aspect: "landscape",
      alt: "Shared dining table composition",
    },
    {
      id: "g3",
      src: "/images/sisters-of-pearl/table-detail.jpg",
      label: "Detail",
      aspect: "square",
      alt: "Table setting detail",
    },
    {
      id: "g4",
      src: "/images/sisters-of-pearl/gallery-04.jpg",
      label: "Dinner",
      aspect: "wide",
      alt: "Dinner plating",
    },
    {
      id: "g5",
      src: "/images/sisters-of-pearl/gallery-05.jpg",
      label: "Glen Waverley",
      aspect: "portrait",
      alt: "Restaurant dining atmosphere",
    },
    {
      id: "g6",
      src: "/images/sisters-of-pearl/gallery-06.jpg",
      label: "The Table",
      aspect: "landscape",
      alt: "Shared plates on the table",
    },
  ],

  mosaic: [
    {
      id: "m1",
      src: "/images/sisters-of-pearl/mosaic-01.jpg",
      alt: "Sauce and plating detail",
      label: "Sauce & plating",
      shape: "tall",
    },
    {
      id: "m2",
      src: "/images/sisters-of-pearl/mosaic-02.jpg",
      alt: "Texture and spice detail",
      label: "Texture & spice",
      shape: "square",
    },
    {
      id: "m3",
      src: "/images/sisters-of-pearl/mosaic-03.jpg",
      alt: "Broth and steam detail",
      label: "Broth & steam",
      shape: "wide",
    },
  ],

  reviewThemes: [
    {
      id: "r1",
      keyword: "Seafood",
      text: "Seafood dishes regularly receive attention in public customer feedback.",
    },
    {
      id: "r2",
      keyword: "Sharing",
      text: "Guests often mention shared meals, group dining and lunch sets.",
    },
    {
      id: "r3",
      keyword: "Presentation",
      text: "Food presentation is frequently discussed by visitors.",
    },
    {
      id: "r4",
      keyword: "Service",
      text: "Service receives positive mentions across multiple public reviews.",
    },
  ],

  images: {
    heroMain: "/images/sisters-of-pearl/hero-circle-main.jpg",
    heroDetail: "/images/sisters-of-pearl/hero-circle-secondary-01.jpg",
    heroSecondary: "/images/sisters-of-pearl/hero-circle-secondary-02.jpg",
    heroNoodles: "/images/sisters-of-pearl/dish-04.jpg",
    heroPlate: "/images/sisters-of-pearl/dish-03.jpg",
    heroCherry: "/images/sisters-of-pearl/hero-cherry-blossom.jpg",
    heroPagoda: "/images/sisters-of-pearl/hero-pagoda.jpg",
    introOval: "/images/sisters-of-pearl/intro-oval.jpg",
    seafoodWide: "/images/sisters-of-pearl/seafood-wide.jpg",
    interior: "/images/sisters-of-pearl/restaurant-interior.jpg",
    cta: "/images/sisters-of-pearl/cta-image.jpg",
  },

  placeholdersNote:
    "Photography on this site may include high-quality temporary placeholders pending client-supplied assets.",
};

export function formatPrice(price) {
  if (price === null || price === undefined || price === "") {
    return "Enquire";
  }
  return price;
}

export function getVerifiedMenu() {
  return business.menuCategories
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((item) => item.verified),
    }))
    .filter((cat) => cat.items.length > 0);
}

export function getJsonLd() {
  const { address, hours } = business;

  const openingHoursSpecification = hours
    .filter((h) => !h.closed)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: "12:00",
      closes: "15:00",
    }))
    .concat(
      hours
        .filter((h) => !h.closed)
        .map((h) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: h.day,
          opens: "17:00",
          closes: "22:00",
        }))
    );

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: business.name,
    image: business.images.heroMain,
    url: business.website,
    telephone: business.phone,
    email: business.email,
    servesCuisine: "Chinese",
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.suburb,
      addressRegion: address.state,
      postalCode: address.postcode,
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -37.8758713,
      longitude: 145.1779234,
    },
    openingHoursSpecification,
    sameAs: [business.instagram, business.facebook, business.mapsUrl].filter(
      Boolean
    ),
  };
}
