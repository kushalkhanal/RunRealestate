const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/plots', require('./routes/plots'));
app.use('/api/enquiry', require('./routes/enquiry'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Run Real Estate API is running 🏡' });
});

// Dynamic Sitemap
app.get('/sitemap.xml', async (req, res) => {
  try {
    const Plot = require('./models/Plot');
    const plots = await Plot.find({});

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
  <url>
    <loc>https://runrealestate.com.np/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://runrealestate.com.np/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://runrealestate.com.np/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;

    // Dynamic Plot Pages
    plots.forEach(plot => {
      // Use slugified title or ID
      const slug = plot._id || plot.title.replace(/\s+/g, '-').toLowerCase();
      const lastMod = plot.updatedAt ? new Date(plot.updatedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

      xml += `  <url>
    <loc>https://runrealestate.com.np/plot/${slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>\n`;
    });

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.status(200).send(xml);
  } catch (err) {
    console.error('Sitemap generation error:', err);
    res.status(500).end();
  }
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
