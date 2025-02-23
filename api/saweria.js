// api/saweria.js
import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { userId, payload } = req.body;

        if (!userId || !payload) {
            return res.status(400).json({ error: 'Missing userId or payload' });
        }

        try {
            const response = await axios.post(`https://backend.saweria.co/donations/${userId}`, payload);
            return res.status(200).json(response.data);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
