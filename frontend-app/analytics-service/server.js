const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ClickHouse } = require('clickhouse');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const clickhouse = new ClickHouse({
  url: 'http://clickhouse:8123',
  debug: false,
  basicAuth: null,
  isUseGzip: false,
  format: "json",
  config: {
    session_timeout: 60,
    output_format_json_quote_64bit_integers: 0,
    enable_http_compression: 0
  }
});

// pageview endpoint
app.post('/pageview', async (req, res) => {
  try {
    const { page } = req.body;
    await clickhouse.query(
      `INSERT INTO pageviews (timestamp, page) VALUES (now(), '${page}')`
    ).toPromise();
    res.sendStatus(204);
  } catch (err) {
    console.error('Pageview insert error:', err);
    res.status(500).send('Error inserting pageview');
  }
});

// click endpoint
app.post('/click', async (req, res) => {
  try {
    const { element } = req.body;
    await clickhouse.query(
      `INSERT INTO clicks (timestamp, element) VALUES (now(), '${element}')`
    ).toPromise();
    res.sendStatus(204);
  } catch (err) {
    console.error('Click insert error:', err);
    res.status(500).send('Error inserting click');
  }
});

// scroll endpoint
app.post('/scroll', async (req, res) => {
  try {
    const { depth } = req.body;
    await clickhouse.query(
      `INSERT INTO scrolls (timestamp, depth) VALUES (now(), ${depth})`
    ).toPromise();
    res.sendStatus(204);
  } catch (err) {
    console.error('Scroll insert error:', err);
    res.status(500).send('Error inserting scroll');
  }
});

const PORT = 6000;
app.listen(PORT, () => console.log(`📊 Analytics Service running at http://localhost:${PORT}`));
