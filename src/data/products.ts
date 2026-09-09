import { Product } from '../types';

export const products: Product[] = [
  // ==================== ELECTRONICS (6) ====================
  {
    id: 'prod-elec-1',
    title: 'Sony WH-1000XM5 Wireless Noise-Cancelling Headphones',
    brand: 'Sony',
    category: 'electronics',
    price: 328.00,
    originalPrice: 399.99,
    rating: 4.7,
    reviewCount: 14820,
    isPrime: true,
    isBestSeller: true,
    isDeal: true,
    inStock: true,
    stockCount: 42,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Industry-leading noise cancellation optimized to your environment with two processors and 8 microphones. Enjoy up to 30 hours of battery life with ultra-comfortable lightweight design.',
    features: [
      'Two processors control 8 microphones for unprecedented noise cancellation',
      'Auto NC Optimizer automatically adjusts cancellation based on wearing conditions',
      'Up to 30-hour battery life with 3-minute quick charging for 3 hours playback',
      'Ultra-comfortable, lightweight design with soft fit leather'
    ],
    specs: {
      'Battery Life': '30 Hours',
      'Noise Cancelling': 'Yes (Active Dual Processor)',
      'Connectivity': 'Bluetooth 5.2 / 3.5mm Aux',
      'Weight': '250 grams'
    }
  },
  {
    id: 'prod-elec-2',
    title: 'Apple AirPods Pro (2nd Generation) with MagSafe Case (USB-C)',
    brand: 'Apple',
    category: 'electronics',
    price: 189.99,
    originalPrice: 249.00,
    rating: 4.8,
    reviewCount: 38290,
    isPrime: true,
    isBestSeller: true,
    isDeal: true,
    inStock: true,
    stockCount: 120,
    images: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Up to 2x more Active Noise Cancellation than the previous generation. Transparency mode lets you hear the world around you, while all-new Adaptive Audio tailors noise control to your environment.',
    features: [
      'Apple-designed H2 chip pushes advanced audio performance higher than ever',
      'Personalized Spatial Audio with dynamic head tracking',
      'Up to 6 hours of listening time with ANC enabled',
      'MagSafe Charging Case (USB-C) with speaker and lanyard loop'
    ],
    specs: {
      'Chip': 'Apple H2 Headphone Chip',
      'Water Resistance': 'IP54 sweat and water resistant',
      'Battery Life': 'Up to 30 hours with case',
      'Charging': 'USB-C, MagSafe, Qi wireless'
    }
  },
  {
    id: 'prod-elec-3',
    title: 'Bose SoundLink Revolve+ (Series II) Portable Bluetooth Speaker',
    brand: 'Bose',
    category: 'electronics',
    price: 229.00,
    originalPrice: 329.00,
    rating: 4.6,
    reviewCount: 9450,
    isPrime: true,
    isBestSeller: false,
    isDeal: true,
    inStock: true,
    stockCount: 18,
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Delivers true 360-degree sound for consistent, uniform audio coverage. Durable and water-resistant with a flexible fabric handle for easy grab-and-go portability.',
    features: [
      'Engineered to deliver true 360 sound for deep, jaw-dropping audio in every direction',
      'Durable water and dust-resistant design (IP55 rating)',
      'Rechargeable lithium-ion battery plays up to 17 hours per charge',
      'Built-in microphone for speakerphone calls and voice assistant access'
    ],
    specs: {
      'Battery Life': '17 Hours',
      'Durability': 'IP55 Water and Dust Resistant',
      'Connectivity': 'Bluetooth 4.2 / NFC / 3.5mm Aux',
      'Dimensions': '7.25" H x 4.13" W x 4.13" D'
    }
  },
  {
    id: 'prod-elec-4',
    title: 'Samsung 65-Inch Class OLED 4K S90D Series Smart TV',
    brand: 'Samsung',
    category: 'electronics',
    price: 1597.99,
    originalPrice: 2197.99,
    rating: 4.7,
    reviewCount: 3120,
    isPrime: true,
    isBestSeller: false,
    isDeal: true,
    inStock: true,
    stockCount: 10,
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Experience pure blacks and vibrant colors powered by Quantum Dot technology. Neural Quantum Processor 4K upscale every scene automatically for cinema-grade clarity.',
    features: [
      'OLED Technology with Pantone-validated color accuracy',
      'Neural Quantum Processor 4K with AI upscaling',
      'Motion Xcelerator 144Hz for smooth, lag-free gaming',
      'Dolby Atmos and Object Tracking Sound Lite'
    ],
    specs: {
      'Display Size': '65 Inches',
      'Resolution': '4K UHD (3,840 x 2,160)',
      'Refresh Rate': '144Hz',
      'Smart OS': 'Tizen OS with Gaming Hub'
    }
  },
  {
    id: 'prod-elec-5',
    title: 'Sony Alpha 7 IV Full-frame Mirrorless Interchangeable Lens Camera',
    brand: 'Sony',
    category: 'electronics',
    price: 2298.00,
    originalPrice: 2499.99,
    rating: 4.8,
    reviewCount: 4210,
    isPrime: true,
    isBestSeller: false,
    isDeal: false,
    inStock: true,
    stockCount: 8,
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'The benchmark hybrid mirrorless camera featuring a 33MP full-frame Exmor R sensor, 4K 60p recording, and real-time Eye AF tracking for humans, animals, and birds.',
    features: [
      '33MP full-frame Exmor R back-illuminated CMOS sensor',
      'BIONZ XR image processing engine with up to 8x processing power',
      'Up to 4K 60p 10-bit 4:2:2 video recording with full pixel readout',
      '759-point phase-detection AF covering 94% of the image area'
    ],
    specs: {
      'Sensor': '33MP Full-Frame CMOS',
      'Video': '4K 60p 10-bit 4:2:2',
      'ISO Range': '100-51200 (Expandable to 50-204800)',
      'Stabilization': '5-axis in-body image stabilization'
    }
  },
  {
    id: 'prod-elec-6',
    title: 'Kindle Paperwhite (16 GB) – 6.8" Display with Adjustable Warm Light',
    brand: 'Amazon',
    category: 'electronics',
    price: 139.99,
    originalPrice: 149.99,
    rating: 4.7,
    reviewCount: 52100,
    isPrime: true,
    isBestSeller: true,
    isDeal: false,
    inStock: true,
    stockCount: 85,
    images: [
      'https://images.unsplash.com/photo-1592496001020-d31bd830651f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Now with a 6.8" display and thinner borders, adjustable warm light, up to 10 weeks of battery life, and 20% faster page turns compared to the previous generation.',
    features: [
      'Purpose-built for reading with a flush-front 300 ppi glare-free display',
      'Adjustable warm light to shift screen shade from white to amber',
      'Waterproof (IPX8) tested to withstand accidental submersion in water',
      'Single charge via USB-C lasts up to 10 weeks'
    ],
    specs: {
      'Screen Size': '6.8" glare-free Paperwhite',
      'Storage': '16 GB',
      'Battery Life': 'Up to 10 weeks',
      'Weight': '205 grams'
    }
  },

  // ==================== COMPUTERS (6) ====================
  {
    id: 'prod-comp-1',
    title: 'Apple MacBook Air 15-inch Laptop with M3 chip (16GB Unified, 512GB SSD)',
    brand: 'Apple',
    category: 'computers',
    price: 1449.00,
    originalPrice: 1699.00,
    rating: 4.8,
    reviewCount: 8940,
    isPrime: true,
    isBestSeller: true,
    isDeal: true,
    inStock: true,
    stockCount: 25,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Super-slim and blazing fast with the M3 chip. Built for Apple Intelligence and equipped with a stunning Liquid Retina display that supports 1 billion colors.',
    features: [
      'Blazing-fast M3 chip with 8-core CPU and 10-core GPU',
      'Up to 18 hours of battery life to go all day unplugged',
      '15.3-inch Liquid Retina display with 500 nits of brightness',
      'MagSafe charging port, two Thunderbolt ports, and headphone jack'
    ],
    specs: {
      'Processor': 'Apple M3 Chip (8-core CPU, 10-core GPU)',
      'Memory': '16GB Unified Memory',
      'Storage': '512GB NVMe SSD',
      'Weight': '3.3 lbs (1.51 kg)'
    }
  },
  {
    id: 'prod-comp-2',
    title: 'Dell XPS 14 9440 Laptop – Intel Core Ultra 7, 32GB RAM, 1TB SSD, RTX 4050',
    brand: 'Dell',
    category: 'computers',
    price: 1899.99,
    originalPrice: 2299.99,
    rating: 4.5,
    reviewCount: 2310,
    isPrime: true,
    isBestSeller: false,
    isDeal: true,
    inStock: true,
    stockCount: 14,
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Machined aluminum chassis with seamless glass touchpad and capacitive touch function row. Powered by Intel Core Ultra 7 with dedicated NPU for local AI acceleration.',
    features: [
      'Intel Core Ultra 7 155H with AI Boost NPU',
      'NVIDIA GeForce RTX 4050 6GB GDDR6 Laptop GPU',
      '14.5" 3.2K (3200 x 2000) OLED Touch Display at 120Hz',
      'ExpressCharge charges battery up to 80% in 60 minutes'
    ],
    specs: {
      'Processor': 'Intel Core Ultra 7 155H (16 cores)',
      'RAM': '32GB LPDDR5x',
      'Graphics': 'NVIDIA RTX 4050 6GB',
      'Display': '14.5" 3.2K OLED 120Hz Touch'
    }
  },
  {
    id: 'prod-comp-3',
    title: 'Logitech MX Master 3S Wireless Performance Mouse (Quiet Clicks, 8K DPI)',
    brand: 'Logitech',
    category: 'computers',
    price: 89.99,
    originalPrice: 99.99,
    rating: 4.8,
    reviewCount: 31200,
    isPrime: true,
    isBestSeller: true,
    isDeal: false,
    inStock: true,
    stockCount: 75,
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'An iconic ergonomic mouse remastered with Quiet Clicks and an 8,000 DPI track-on-glass optical sensor for ultimate precision on any desk surface.',
    features: [
      'Quiet Clicks deliver satisfying tactile feel with 90% less click noise',
      'MagSpeed electromagnetic scrolling scrolls 1,000 lines in a second',
      'Track anywhere on any surface including glass with 8K DPI sensor',
      'Connect up to 3 devices via Bluetooth Low Energy or Logi Bolt receiver'
    ],
    specs: {
      'Sensor': '8,000 DPI Darkfield sensor',
      'Battery': 'Up to 70 days on a full charge',
      'Connectivity': 'Bluetooth / Logi Bolt USB',
      'Compatibility': 'Windows, macOS, Linux, iPadOS'
    }
  },
  {
    id: 'prod-comp-4',
    title: 'LG 34-Inch UltraWide Curved Gaming Monitor QHD (3440 x 1440) 160Hz',
    brand: 'LG',
    category: 'computers',
    price: 349.99,
    originalPrice: 499.99,
    rating: 4.6,
    reviewCount: 7850,
    isPrime: true,
    isBestSeller: false,
    isDeal: true,
    inStock: true,
    stockCount: 19,
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Immerse yourself in productivity and gaming with 34 inches of curved 21:9 UltraWide real estate. 160Hz refresh rate and 1ms MBR for silky smooth motion.',
    features: [
      '34" Curved UltraWide QHD (3440 x 1440) display',
      '160Hz refresh rate with 1ms Motion Blur Reduction',
      'AMD FreeSync Premium technology eliminates screen tearing',
      'HDR10 support with sRGB 99% color gamut coverage'
    ],
    specs: {
      'Resolution': '3440 x 1440 UltraWide QHD',
      'Curvature': '1800R',
      'Refresh Rate': '160Hz',
      'Ports': '2x HDMI, 1x DisplayPort, Headphone Out'
    }
  },
  {
    id: 'prod-comp-5',
    title: 'Samsung T7 Shield 2TB Portable SSD – Rugged IP65 USB 3.2 External Drive',
    brand: 'Samsung',
    category: 'computers',
    price: 169.99,
    originalPrice: 219.99,
    rating: 4.8,
    reviewCount: 22400,
    isPrime: true,
    isBestSeller: true,
    isDeal: true,
    inStock: true,
    stockCount: 60,
    images: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Tough, fast, and compact. The rugged exterior and IP65 rating protect your data from water and dust drops up to 9.8 feet, with read speeds up to 1,050 MB/s.',
    features: [
      'Transfer huge files in seconds with sequential read/write speeds up to 1,050/1,000 MB/s',
      'Water and dust resistant with IP65 rating and drop protection up to 9.8 feet',
      'Dynamic Thermal Guard controls heat to maintain steady speeds',
      'Compatible with PC, Mac, Android devices, gaming consoles, and cameras'
    ],
    specs: {
      'Capacity': '2TB',
      'Interface': 'USB 3.2 Gen 2 (10Gbps)',
      'Speeds': 'Up to 1,050 MB/s read, 1,000 MB/s write',
      'Durability': 'IP65 Water/Dust / 3-meter drop resistant'
    }
  },
  {
    id: 'prod-comp-6',
    title: 'Keychron K2 Version 2 Wireless Mechanical Keyboard for Mac & Windows',
    brand: 'Keychron',
    category: 'computers',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.6,
    reviewCount: 8900,
    isPrime: true,
    isBestSeller: false,
    isDeal: false,
    inStock: true,
    stockCount: 30,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'A 75% layout compact wireless mechanical keyboard featuring tactile Gateron G Pro switches, white LED backlighting, and dual Mac and Windows compatibility.',
    features: [
      'Connects with up to 3 devices via Bluetooth or wired Type-C mode',
      'Features all necessary Mac function keys while compatible with Windows',
      '4000 mAh large battery can last up to 240 hours with backlights off',
      'Ergonomic inclined bottom frame with 2-level adjustable rubber feet'
    ],
    specs: {
      'Layout': '75% (84 keys)',
      'Switches': 'Gateron G Pro Brown Tactile',
      'Connectivity': 'Bluetooth 5.1 / Type-C Cable',
      'Battery': '4000mAh rechargeable Li-polymer'
    }
  },

  // ==================== HOME & KITCHEN (6) ====================
  {
    id: 'prod-home-1',
    title: 'Ninja AF101 Air Fryer that Crisps, Roasts, Reheats & Dehydrates (4 Quart)',
    brand: 'Ninja',
    category: 'home',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviewCount: 65400,
    isPrime: true,
    isBestSeller: true,
    isDeal: true,
    inStock: true,
    stockCount: 50,
    images: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Now you can cook with up to 75% less fat than traditional frying methods. The 4-quart nonstick basket holds up to 2 lbs of French fries with wide temperature range up to 400°F.',
    features: [
      'Air fry with up to 75% less fat than traditional frying methods',
      'Wide temperature range: 105°F to 400°F allows gentle dehydration or quick crisping',
      '4-quart ceramic-coated nonstick basket fits 2 lbs of french fries',
      'Dishwasher-safe parts for effortless clean up'
    ],
    specs: {
      'Capacity': '4 Quarts',
      'Wattage': '1550 Watts',
      'Dimensions': '13.6" D x 11" W x 13.3" H',
      'Weight': '10.58 lbs'
    }
  },
  {
    id: 'prod-home-2',
    title: 'Breville Barista Touch Espresso Machine with Touch Screen & Auto Milk Steam',
    brand: 'Breville',
    category: 'home',
    price: 899.95,
    originalPrice: 999.95,
    rating: 4.7,
    reviewCount: 4230,
    isPrime: true,
    isBestSeller: false,
    isDeal: true,
    inStock: true,
    stockCount: 12,
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Automated touch screen operation simplifies making your favorite specialty coffee in 3 easy steps: Grind, Brew and Milk. Automatic steam wand creates silky microfoam for latte art.',
    features: [
      'Touch screen display with pre-programmed coffee menu (Espresso, Latte, Flat White)',
      'ThermoJet heating system reaches optimal extraction temperature in 3 seconds',
      'Integrated hardened steel conical burr grinder with 30 grind size settings',
      'Automatic microfoam milk texturing with adjustable temperature and texture levels'
    ],
    specs: {
      'Water Tank Capacity': '67 fl. oz (2L)',
      'Bean Hopper': '1/2 lb',
      'Material': 'Brushed Stainless Steel',
      'Heating System': 'ThermoJet (3-second heat up)'
    }
  },
  {
    id: 'prod-home-3',
    title: 'Dyson V15 Detect Cordless Vacuum Cleaner with Laser Dirt Detection',
    brand: 'Dyson',
    category: 'home',
    price: 649.99,
    originalPrice: 749.99,
    rating: 4.6,
    reviewCount: 8120,
    isPrime: true,
    isBestSeller: true,
    isDeal: true,
    inStock: true,
    stockCount: 16,
    images: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Dyson’s most powerful, intelligent cordless vacuum. A precisely-angled laser reveals invisible dust on hard floors, and a piezo sensor measures and counts dust particles automatically.',
    features: [
      'Laser reveals microscopic dust on hard floors for scientific proof of deep clean',
      'Intelligently adapts suction power based on floor type and debris level',
      'LCD screen shows particle counts and real-time battery run time',
      'Up to 60 minutes of fade-free suction across hard floors and carpets'
    ],
    specs: {
      'Run Time': 'Up to 60 minutes',
      'Suction Power': '230 Air Watts',
      'Bin Volume': '0.2 Gallons',
      'Weight': '6.8 lbs'
    }
  },
  {
    id: 'prod-home-4',
    title: 'Le Creuset Enameled Cast Iron Signature Round Dutch Oven, 5.5 Qt',
    brand: 'Le Creuset',
    category: 'home',
    price: 420.00,
    originalPrice: 420.00,
    rating: 4.9,
    reviewCount: 6890,
    isPrime: true,
    isBestSeller: true,
    isDeal: false,
    inStock: true,
    stockCount: 22,
    images: [
      'https://images.unsplash.com/photo-1584990347449-a2928509c13b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'An indispensable classic in kitchens around the world. Crafted by French artisans since 1925, delivering superior heat distribution and retention for slow-cooking, braising and roasting.',
    features: [
      'Enameled cast iron delivers superior heat distribution and heat retention',
      'Ready to use, requires no seasoning, and cleans easily in the dishwasher',
      'Tight-fitting lid circulating steam and return moisture back to food',
      'Compatible with all cooktops and oven-safe up to 500°F'
    ],
    specs: {
      'Capacity': '5.5 Quarts',
      'Material': 'Enameled Cast Iron',
      'Origin': 'Made in France',
      'Heat Source': 'Gas, Electric, Ceramic, Halogen, Induction, Oven'
    }
  },
  {
    id: 'prod-home-5',
    title: 'iRobot Roomba j7+ Self-Emptying Robot Vacuum with Obstacle Avoidance',
    brand: 'iRobot',
    category: 'home',
    price: 599.00,
    originalPrice: 799.99,
    rating: 4.4,
    reviewCount: 11200,
    isPrime: true,
    isBestSeller: false,
    isDeal: true,
    inStock: true,
    stockCount: 15,
    images: [
      'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Avoids pet waste and power cords with PrecisionVision navigation. Automatically empties its bin for up to 60 days in the Clean Base automatic dirt disposal dock.',
    features: [
      'Identifies and avoids obstacles like cords, socks, and pet waste',
      'Empties on its own for up to 60 days into enclosed allergen lock bags',
      'Imprint Smart Mapping allows you to clean specific rooms by voice command',
      '3-Stage Cleaning System packs 10x the power-lifting suction'
    ],
    specs: {
      'Bin Capacity': 'Automatic self-emptying 60-day base',
      'Battery Life': 'Up to 90 minutes with smart recharge & resume',
      'Filter Type': 'High-Efficiency allergen filter',
      'Connectivity': 'Wi-Fi / Alexa / Google Assistant'
    }
  },
  {
    id: 'prod-home-6',
    title: 'Philips Hue White & Color Ambiance Smart LED Starter Kit (4 A19 Bulbs + Bridge)',
    brand: 'Philips Hue',
    category: 'home',
    price: 159.99,
    originalPrice: 199.99,
    rating: 4.7,
    reviewCount: 19400,
    isPrime: true,
    isBestSeller: false,
    isDeal: true,
    inStock: true,
    stockCount: 40,
    images: [
      'https://images.unsplash.com/photo-1550985543-f47f38aeee65?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Transform your home with 16 million colors and shades of white light. Automate your lights, sync with movies and gaming, and control remotely from anywhere.',
    features: [
      'Includes 4 smart color LED bulbs and Hue Bridge hub',
      'Choose from 16 million colors and 50,000 shades of warm-to-cool white light',
      'Works with Alexa, Apple Home, Google Assistant, and Matter',
      'Hue Bridge allows whole-home control of up to 50 lights and accessories'
    ],
    specs: {
      'Bulb Base': 'E26 Standard',
      'Brightness': '1100 Lumens (75W equivalent)',
      'Lifespan': '25,000 hours',
      'Protocol': 'Zigbee / Bluetooth / Matter compatible'
    }
  },

  // ==================== FASHION (6) ====================
  {
    id: 'prod-fash-1',
    title: "Levi's Men's 501 Original Fit Jeans – 100% Cotton Heritage Denim",
    brand: "Levi's",
    category: 'fashion',
    price: 59.99,
    originalPrice: 79.50,
    rating: 4.6,
    reviewCount: 48900,
    isPrime: true,
    isBestSeller: true,
    isDeal: true,
    inStock: true,
    stockCount: 80,
    images: [
      'https://images.unsplash.com/photo-1542272604-780c96856592?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'The archetype of all jeans. Since invented in 1873, the 501 features the signature straight leg fit and iconic button fly styling that has defined generations.',
    features: [
      '100% Cotton non-stretch authentic heavy-duty denim',
      'Classic straight leg fit sits comfortably at your natural waist',
      'Signature 5-pocket styling and iconic button fly closure',
      'Machine washable with durable double-stitched seams'
    ],
    specs: {
      'Material': '100% Cotton',
      'Fit': 'Regular through thigh with straight leg opening',
      'Closure': 'Button Fly',
      'Care': 'Machine wash cold inside out'
    }
  },
  {
    id: 'prod-fash-2',
    title: 'Patagonia Men’s Better Sweater Fleece Full-Zip Jacket',
    brand: 'Patagonia',
    category: 'fashion',
    price: 159.00,
    originalPrice: 159.00,
    rating: 4.8,
    reviewCount: 6120,
    isPrime: true,
    isBestSeller: false,
    isDeal: false,
    inStock: true,
    stockCount: 28,
    images: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'A warm, low-bulk full-zip jacket made of soft 100% recycled polyester fleece dyed with a low-impact process that significantly reduces dyestuffs and water usage.',
    features: [
      '100% recycled polyester fleece with sweater-knit aesthetic',
      'Full-length zipper with stand-up collar and kissing-welt garage',
      'Raglan sleeves for mobility and pack-wearing comfort',
      'Fair Trade Certified sewn'
    ],
    specs: {
      'Fabric': '10-oz 100% recycled polyester fleece',
      'Weight': '22.5 oz (638 g)',
      'Pockets': 'Zippered handwarmers and vertical chest security pocket',
      'Certifications': 'bluesign approved fabric, Fair Trade sewn'
    }
  },
  {
    id: 'prod-fash-3',
    title: 'Nike Air Force 1 \'07 Men’s Triple White Leather Sneakers',
    brand: 'Nike',
    category: 'fashion',
    price: 115.00,
    originalPrice: 115.00,
    rating: 4.7,
    reviewCount: 74200,
    isPrime: true,
    isBestSeller: true,
    isDeal: false,
    inStock: true,
    stockCount: 65,
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'The radiance lives on in the Nike Air Force 1 \'07, the b-ball icon that puts a fresh spin on what you know best: crisp leather, bold details and the perfect amount of flash.',
    features: [
      'Stitched leather overlays on the upper add heritage style, durability, and support',
      'Originally designed for performance hoops, Nike Air cushioning adds lightweight comfort',
      'Low-cut silhouette adds a clean, streamlined look',
      'Perforations on the toe keep feet ventilated'
    ],
    specs: {
      'Upper': 'Genuine and synthetic leather',
      'Sole': 'Non-marking rubber outsole with pivot circle',
      'Cushioning': 'Encapsulated Nike Air unit',
      'Color': 'White/White'
    }
  },
  {
    id: 'prod-fash-4',
    title: 'Ray-Ban Classic Aviator Sunglasses (Non-Polarized, 58mm G-15 Green Lens)',
    brand: 'Ray-Ban',
    category: 'fashion',
    price: 142.99,
    originalPrice: 180.00,
    rating: 4.7,
    reviewCount: 18900,
    isPrime: true,
    isBestSeller: true,
    isDeal: true,
    inStock: true,
    stockCount: 35,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Originally designed for U.S. aviators in 1937. Ray-Ban Aviator Classic sunglasses are a timeless model combining great aviator styling with exceptional quality and comfort.',
    features: [
      'Classic teardrop metal frame with legendary crystal green G-15 lenses',
      '100% UV400 protection absorbing 85% of visible light and blocking most blue light',
      'Adjustable soft silicone nose pads for personalized fit',
      'Includes authentic Ray-Ban leather protective case and cleaning cloth'
    ],
    specs: {
      'Frame Material': 'Polished Gold Metal',
      'Lens Width': '58 mm',
      'Bridge Width': '14 mm',
      'Temple Length': '135 mm'
    }
  },
  {
    id: 'prod-fash-5',
    title: 'Samsonite Omni 2 Hardside Expandable Luggage with Spinner Wheels (24-inch)',
    brand: 'Samsonite',
    category: 'fashion',
    price: 139.99,
    originalPrice: 209.99,
    rating: 4.6,
    reviewCount: 23100,
    isPrime: true,
    isBestSeller: false,
    isDeal: true,
    inStock: true,
    stockCount: 20,
    images: [
      'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581553680321-4fffae59fccd?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Omni 2 combines scratch-resistant textures with lightweight 100% polycarbonate construction, ensuring your luggage looks as great on the 100th trip as it did on the first.',
    features: [
      '24-inch medium checked bag maximizes packing power for 5-7 day journeys',
      'Four multi-directional oversized dual spinner wheels for effortless 360-degree mobility',
      'Side-mounted TSA lock ensures security while airport inspectors can inspect without damage',
      'Book-opening case with mesh divider and cross straps to keep clothes wrinkle-free'
    ],
    specs: {
      'Overall Dimensions': '26.75" x 17.75" x 11.0"',
      'Weight': '8.34 lbs',
      'Material': '100% Polycarbonate with micro-diamond texture',
      'Lock': 'Integrated TSA combination lock'
    }
  },
  {
    id: 'prod-fash-6',
    title: 'Carhartt Men’s K87 Workwear Short-Sleeve Pocket T-Shirt (Heavyweight)',
    brand: 'Carhartt',
    category: 'fashion',
    price: 19.99,
    originalPrice: 24.99,
    rating: 4.7,
    reviewCount: 92300,
    isPrime: true,
    isBestSeller: true,
    isDeal: false,
    inStock: true,
    stockCount: 150,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Debuted in 1992, the K87 quickly became an American staple. Made with heavyweight 6.75-ounce cotton knit that handles tough workdays and weekend downtime effortlessly.',
    features: [
      'Heavyweight 6.75-ounce 100% cotton jersey knit',
      'Rib-knit crewneck holds its shape throughout the day',
      'Left-chest pocket with sewn-on authentic Carhartt patch',
      'Side-seam construction minimizes twisting'
    ],
    specs: {
      'Fabric': '6.75 oz 100% Cotton Jersey',
      'Fit': 'Loose original fit',
      'Neckline': 'Tagless crew neck',
      'Care': 'Machine wash warm, tumble dry medium'
    }
  },

  // ==================== BOOKS (6) ====================
  {
    id: 'prod-book-1',
    title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    brand: 'James Clear',
    category: 'books',
    price: 13.79,
    originalPrice: 27.00,
    rating: 4.9,
    reviewCount: 142000,
    isPrime: true,
    isBestSeller: true,
    isDeal: true,
    inStock: true,
    stockCount: 200,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Over 15 million copies sold worldwide. The definitive guide to breaking bad behaviors and adopting good habits in small, incremental steps that compound over time.',
    features: [
      '#1 New York Times Bestseller for over 200 weeks',
      'Practical frameworks: Make it Obvious, Make it Attractive, Make it Easy, Make it Satisfying',
      'Learn how to make time for new habits and overcome lack of motivation',
      'Applicable for business leaders, athletes, artists, and everyday life'
    ],
    specs: {
      'Format': 'Hardcover',
      'Pages': '320 pages',
      'Publisher': 'Avery',
      'Language': 'English'
    }
  },
  {
    id: 'prod-book-2',
    title: 'Steve Jobs – The Exclusive Groundbreaking Biography by Walter Isaacson',
    brand: 'Walter Isaacson',
    category: 'books',
    price: 18.99,
    originalPrice: 35.00,
    rating: 4.8,
    reviewCount: 32400,
    isPrime: true,
    isBestSeller: false,
    isDeal: true,
    inStock: true,
    stockCount: 45,
    images: [
      'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Based on more than forty interviews with Steve Jobs conducted over two years—as well as interviews with more than a hundred family members, friends, adversaries, competitors, and colleagues.',
    features: [
      'Unvarnished, authorized account of the creative entrepreneur who revolutionized six industries',
      'Deep behind-the-scenes narrative of Apple, Pixar, NeXT, and digital media disruption',
      'Written by acclaimed biographer Walter Isaacson',
      'Includes exclusive photographs from private collections'
    ],
    specs: {
      'Format': 'Hardcover',
      'Pages': '656 pages',
      'Publisher': 'Simon & Schuster',
      'Language': 'English'
    }
  },
  {
    id: 'prod-book-3',
    title: 'Thinking, Fast and Slow – Nobel Laureate Daniel Kahneman',
    brand: 'Daniel Kahneman',
    category: 'books',
    price: 14.29,
    originalPrice: 22.00,
    rating: 4.7,
    reviewCount: 45100,
    isPrime: true,
    isBestSeller: false,
    isDeal: true,
    inStock: true,
    stockCount: 60,
    images: [
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'The monumental international bestseller explaining the two systems that drive the way we think: System 1 (fast, intuitive, emotional) and System 2 (slower, deliberate, logical).',
    features: [
      'Winner of the National Academy of Sciences Best Book Award',
      'Explores cognitive biases, behavioral economics, and decision theory',
      'Practical insights on when to trust our intuition and how to slow down mistakes',
      'Selected by the New York Times as one of the 10 best books of the year'
    ],
    specs: {
      'Format': 'Paperback',
      'Pages': '512 pages',
      'Publisher': 'Farrar, Straus and Giroux',
      'Language': 'English'
    }
  },
  {
    id: 'prod-book-4',
    title: 'The Psychology of Money: Timeless Lessons on Wealth, Greed, and Happiness',
    brand: 'Morgan Housel',
    category: 'books',
    price: 12.99,
    originalPrice: 19.99,
    rating: 4.8,
    reviewCount: 56700,
    isPrime: true,
    isBestSeller: true,
    isDeal: true,
    inStock: true,
    stockCount: 110,
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Doing well with money isn’t necessarily about what you know. It’s about how you behave. 19 short stories exploring the strange ways people think about wealth and decision-making.',
    features: [
      'Over 4 million copies sold globally',
      'Explains how personal history, ego, and luck influence financial success',
      'Engaging, accessible storytelling formatted in short digestible chapters',
      'Wall Street Journal and Sunday Times Bestseller'
    ],
    specs: {
      'Format': 'Paperback',
      'Pages': '256 pages',
      'Publisher': 'Harriman House',
      'Language': 'English'
    }
  },
  {
    id: 'prod-book-5',
    title: 'Designing Data-Intensive Applications: The Big Ideas Behind Reliable Systems',
    brand: 'Martin Kleppmann',
    category: 'books',
    price: 42.49,
    originalPrice: 59.99,
    rating: 4.9,
    reviewCount: 8920,
    isPrime: true,
    isBestSeller: true,
    isDeal: true,
    inStock: true,
    stockCount: 35,
    images: [
      'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'The definitive engineering classic on building scalable, reliable, and maintainable software architectures across distributed databases, stream processing, and consensus protocols.',
    features: [
      'Deep dive into storage engines, replication, partitioning, and transactions',
      'Compare pros and cons of relational, document, graph, and column storage models',
      'Navigate trade-offs in consistency, scalability, fault tolerance, and complexity',
      'Universally recommended reference for software architects and staff engineers'
    ],
    specs: {
      'Format': 'Paperback',
      'Pages': '616 pages',
      'Publisher': "O'Reilly Media",
      'Language': 'English'
    }
  },
  {
    id: 'prod-book-6',
    title: 'Dune: Deluxe Edition Hardcover – Frank Herbert Masterpiece',
    brand: 'Frank Herbert',
    category: 'books',
    price: 24.99,
    originalPrice: 40.00,
    rating: 4.8,
    reviewCount: 39400,
    isPrime: true,
    isBestSeller: false,
    isDeal: true,
    inStock: true,
    stockCount: 40,
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the spice melange.',
    features: [
      'Stunning deluxe hardcover edition with embossed cover and stained edges',
      'Winner of the Hugo and Nebula Awards for best science fiction novel',
      'Includes an updated introduction by Brian Herbert and full-color planetary map',
      'Widely regarded as the greatest sci-fi epic ever written'
    ],
    specs: {
      'Format': 'Deluxe Collector Hardcover',
      'Pages': '688 pages',
      'Publisher': 'Ace',
      'Language': 'English'
    }
  },

  // ==================== BEAUTY (6) ====================
  {
    id: 'prod-beau-1',
    title: 'Dyson Airwrap Multi-Styler Complete Long for Multiple Hair Types',
    brand: 'Dyson',
    category: 'beauty',
    price: 499.99,
    originalPrice: 599.99,
    rating: 4.7,
    reviewCount: 16800,
    isPrime: true,
    isBestSeller: true,
    isDeal: true,
    inStock: true,
    stockCount: 15,
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Styles with air, not extreme heat. Re-engineered attachments harness Enhanced Coanda airflow to create clockwise and counter-clockwise curls with a single barrel.',
    features: [
      'Styles without extreme heat damage using aerodynamic Coanda effect',
      'Includes 6 styling attachments: 1.2" and 1.6" long barrels, firm smoothing brush, soft smoothing brush, round volumizing brush, and Coanda smoothing dryer',
      'Measures airflow temperature over 40 times a second to keep heat under 302°F',
      'Prussian blue presentation storage case with magnetic latch'
    ],
    specs: {
      'Airflow': '13.5 liters/second',
      'Wattage': '1300 Watts',
      'Heat Settings': '3 precise heat settings including cold shot',
      'Weight': '1.5 lbs'
    }
  },
  {
    id: 'prod-beau-2',
    title: 'CeraVe Daily Moisturizing Lotion with Hyaluronic Acid and 3 Essential Ceramides',
    brand: 'CeraVe',
    category: 'beauty',
    price: 15.99,
    originalPrice: 19.99,
    rating: 4.8,
    reviewCount: 98400,
    isPrime: true,
    isBestSeller: true,
    isDeal: false,
    inStock: true,
    stockCount: 200,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608248597359-074495c64390?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Developed with dermatologists, this lightweight, oil-free moisturizer helps hydrate the skin and restore its natural protective barrier with three essential ceramides.',
    features: [
      'Formulated with 3 essential ceramides (1, 3, 6-II) and hydrating hyaluronic acid',
      'Patented MVE Delivery Technology provides 24-hour controlled hydration',
      'Lightweight, non-greasy, fast-absorbing texture',
      'Fragrance-free, allergy-tested, and non-comedogenic (won’t clog pores)'
    ],
    specs: {
      'Size': '19 oz (562 ml) with pump',
      'Skin Type': 'Normal to Dry skin',
      'Key Ingredients': 'Ceramides 1, 3, 6-II, Hyaluronic Acid',
      'Certifications': 'National Eczema Association Accepted'
    }
  },
  {
    id: 'prod-beau-3',
    title: 'Maison Francis Kurkdjian Baccarat Rouge 540 Eau de Parfum (2.4 fl oz)',
    brand: 'Maison Francis Kurkdjian',
    category: 'beauty',
    price: 325.00,
    originalPrice: 325.00,
    rating: 4.9,
    reviewCount: 4210,
    isPrime: true,
    isBestSeller: false,
    isDeal: false,
    inStock: true,
    stockCount: 10,
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Luminous and sophisticated, Baccarat Rouge 540 lays on the skin like an amber, floral and woody breeze with notes of Egyptian grandiflorum jasmine, saffron, and cedarwood.',
    features: [
      'Prestigious Parisian niche fragrance crafted by master perfumer Francis Kurkdjian',
      'Top notes: Blood orange, Saffron; Heart notes: Hedione, Lavender; Base notes: Ambergris, Oakmoss',
      'Exceptional sillage and longevity lasting over 12 hours on skin',
      'Iconic heavy glass flacon with golden cap'
    ],
    specs: {
      'Volume': '70 ml / 2.4 fl. oz.',
      'Concentration': 'Eau de Parfum',
      'Fragrance Family': 'Woody Amber Floral',
      'Origin': 'Made in France'
    }
  },
  {
    id: 'prod-beau-4',
    title: 'La Roche-Posay Anthelios Melt-in Milk Sunscreen SPF 60 (Cell-Ox Shield)',
    brand: 'La Roche-Posay',
    category: 'beauty',
    price: 25.99,
    originalPrice: 37.99,
    rating: 4.7,
    reviewCount: 29800,
    isPrime: true,
    isBestSeller: true,
    isDeal: true,
    inStock: true,
    stockCount: 85,
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Multiple beauty award-winner. Broad-spectrum SPF 60 face and body sunscreen with Cell-Ox Shield technology: broad spectrum UVA/UVB protection plus antioxidants.',
    features: [
      'Oxybenzone and octinoxate-free broad-spectrum sun protection',
      'Melt-in milk texture absorbs rapidly without white cast or greasy residue',
      'Water resistant for up to 80 minutes',
      'Formulated with Senna Alata antioxidant to protect skin from free radicals'
    ],
    specs: {
      'SPF Rating': 'SPF 60 Broad Spectrum',
      'Volume': '5.0 fl oz (150 ml)',
      'Water Resistance': '80 minutes',
      'Dermatologist Tested': 'Safe for sensitive skin'
    }
  },
  {
    id: 'prod-beau-5',
    title: 'Olaplex No. 3 Hair Perfector Repairing Treatment (3.3 Fl Oz)',
    brand: 'Olaplex',
    category: 'beauty',
    price: 30.00,
    originalPrice: 30.00,
    rating: 4.6,
    reviewCount: 114000,
    isPrime: true,
    isBestSeller: true,
    isDeal: false,
    inStock: true,
    stockCount: 90,
    images: [
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'The global best-selling at-home treatment that repairs and strengthens damaged, compromised hair caused by chemical treatments, heat styling, and environmental stressors.',
    features: [
      'Patented OLAPLEX Bond Building technology relinks broken disulfide bonds',
      'Restores healthy appearance and texture by repairing damaged hair from within',
      'Reduces breakage and visibly strengthens hair structure',
      'Suitable and beneficial for all hair types (virgin, colored, curly, or straight)'
    ],
    specs: {
      'Volume': '100 ml / 3.3 fl oz',
      'pH Balance': '3.5 - 5.0 optimal for hair cuticle',
      'Formulation': 'Sulfate-Free, Paraben-Free, Phthalate-Free, Cruelty-Free',
      'Frequency': 'Use 1-3 times weekly before shampooing'
    }
  },
  {
    id: 'prod-beau-6',
    title: 'Oral-B iO Series 9 Electric Toothbrush with 4 Brush Heads and Smart Pressure Sensor',
    brand: 'Oral-B',
    category: 'beauty',
    price: 249.99,
    originalPrice: 299.99,
    rating: 4.6,
    reviewCount: 8400,
    isPrime: true,
    isBestSeller: false,
    isDeal: true,
    inStock: true,
    stockCount: 24,
    images: [
      'https://images.unsplash.com/photo-1559591937-e10220268571?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Revolutionary magnetic iO technology combines oscillating round brush heads with gentle micro-vibrations for a professional clean feeling every single day.',
    features: [
      'Interactive Color Display coaches you through 7 customized brushing modes',
      '3D Teeth Tracking with A.I. monitors your brushing across the front, top and back surfaces',
      'Smart Pressure Sensor signals red when brushing too hard and green when just right',
      'Magnetic fast charger delivers a 3-hour quick charge with Power2Go travel case'
    ],
    specs: {
      'Brushing Modes': '7 Modes (Daily Clean, Sensitive, Whitening, Gum Care, Intense, Super Sensitive, Tongue Clean)',
      'Battery': 'Rechargeable Li-Ion with magnetic fast charge',
      'Sensor': 'Smart Pressure Sensor with multi-color ring',
      'Connectivity': 'Bluetooth app synchronization'
    }
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  if (!category || category === 'all') return products;
  return products.filter(p => p.category === category);
};

export const getDealProducts = (): Product[] => {
  return products.filter(p => p.isDeal);
};

export const getBestSellerProducts = (): Product[] => {
  return products.filter(p => p.isBestSeller);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const searchProducts = (query: string, category: string = 'all'): Product[] => {
  let list = products;
  if (category && category !== 'all') {
    list = list.filter(p => p.category === category);
  }
  if (!query.trim()) return list;

  const q = query.toLowerCase().trim();
  return list.filter(p => 
    p.title.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  );
};
