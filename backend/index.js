// index.js (backend)
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const path = require.resolve('axe-core'); // Correct path to axe-core

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/audit', async (req, res) => {
  const { url } = req.body;

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Optional: avoid bot detection
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // Log to check if page is loaded
    const htmlContent = await page.content();
    console.log(`✅ Loaded ${url} | Content length: ${htmlContent.length}`);

    // Inject axe-core into the page
    await page.addScriptTag({ path });

    // Run axe-core inside the browser context
    const results = await page.evaluate(async () => {
      if (!window.axe) {
        return { error: 'axe is not defined' };
      }

      return await window.axe.run(document, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa']
        }
      });
    });

    await browser.close();

    // Handle error if axe failed to inject or run
    if (results.error) {
      console.error("❌ AXE ERROR:", results.error);
      return res.status(500).json({ error: results.error });
    }

    // Debug log violations
    console.log(`🔎 Found ${results.violations.length} accessibility issues`);
    results.violations.forEach((v, i) =>
      console.log(`${i + 1}. ${v.id} (${v.impact}) - ${v.help}`)
    );

    res.json({ violations: results.violations });

  } catch (error) {
    console.error("🚨 Audit Error:", error.message);
    res.status(500).json({ error: "Audit failed" });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running at http://localhost:5000");
});
