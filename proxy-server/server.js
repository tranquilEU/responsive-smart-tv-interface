import cors from 'cors';
import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(cors());

app.get('/proxy', async (req, res) => {
	const targetUrl = req.query.url;
	const response = await fetch(targetUrl);
	const text = await response.text();
	res.send(text);
});

app.listen(4000, () => console.log('Proxy running on http://localhost:4000'));
