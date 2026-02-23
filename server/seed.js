const mongoose = require('mongoose');
require('dotenv').config();
const Plot = require('./models/Plot');

const plots = [
    {
        title: 'Sunrise Valley Residential Plot',
        price: '₹45 Lakhs',
        area: '1200 sq.ft',
        category: 'residential',
        location: 'Pokhara Road, Butwal',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&auto=format',
        badge: 'Hot',
        featured: true,
        amenities: ['24/7 Security', 'Water Supply', 'Electricity', 'Road Access'],
    },
    {
        title: 'Green Meadows Residential Plot',
        price: '₹32 Lakhs',
        area: '900 sq.ft',
        category: 'residential',
        location: 'Siddharthanagar, Bhairahawa',
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&auto=format',
        badge: 'New',
        featured: true,
        amenities: ['Gated Community', 'Park Area', 'Club House'],
    },
    {
        title: 'City Centre Commercial Space',
        price: '₹1.2 Crore',
        area: '2400 sq.ft',
        category: 'commercial',
        location: 'Main Bazaar, Butwal',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format',
        badge: 'Premium',
        featured: false,
        amenities: ['Prime Location', 'Corner Plot', 'High Footfall Area'],
    },
    {
        title: 'Highway Frontage Commercial Plot',
        price: '₹85 Lakhs',
        area: '3200 sq.ft',
        category: 'commercial',
        location: 'Butwal-Nawalparasi Highway',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format',
        badge: 'Featured',
        featured: true,
        amenities: ['Highway Access', 'Boundary Wall', 'CCTV Security'],
    },
    {
        title: 'Fertile Land Agricultural Plot',
        price: '₹18 Lakhs',
        area: '5 Ropani',
        category: 'agricultural',
        location: 'Tilottama, Rupandehi',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format',
        badge: 'New',
        featured: false,
        amenities: ['Irrigation Canal', 'Road Access', 'Fertile Soil'],
    },
    {
        title: 'Riverside Agricultural Land',
        price: '₹25 Lakhs',
        area: '8 Ropani',
        category: 'agricultural',
        location: 'Tinau River Belt, Butwal',
        image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&auto=format',
        badge: '',
        featured: false,
        amenities: ['River Frontage', 'Natural Water', 'Motorable Road'],
    },
    {
        title: 'Lakeview Premium Residential',
        price: '₹72 Lakhs',
        area: '1800 sq.ft',
        category: 'residential',
        location: 'Devdaha, Rupandehi',
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&auto=format',
        badge: 'Hot',
        featured: true,
        amenities: ['Lake View', 'Paved Roads', 'Electricity', 'Water Supply'],
    },
    {
        title: 'Industrial Zone Commercial Plot',
        price: '₹95 Lakhs',
        area: '6000 sq.ft',
        category: 'commercial',
        location: 'Industrial Area, Butwal',
        image: 'https://images.unsplash.com/photo-1481026469463-66327c86e544?w=600&auto=format',
        badge: 'Featured',
        featured: false,
        amenities: ['Three Phase Power', 'Wide Road', 'Near Industrial Hub'],
    },
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected for seeding');

        await Plot.deleteMany({});
        await Plot.insertMany(plots);
        console.log(`🌱 Seeded ${plots.length} plots successfully!`);

        process.exit(0);
    } catch (err) {
        console.error('❌ Seed error:', err.message);
        process.exit(1);
    }
}

seed();
