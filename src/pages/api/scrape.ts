import axios from 'axios';
import { load } from 'cheerio';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { date } = req.query;
  try {
    const url = `https://floridamanbirthday.org/${date}`;
    const response = await axios.get(url);
    const $ = load(response.data);
    const title = $("p").slice(0, 1).text();
    const description = $("p").slice(1, 4).text();
    const img = $("img").eq(1).prop('src');
    res.status(200).json({ title, description, img });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
}