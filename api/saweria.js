// api/saweria.js
import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { userId, payload } = req.body;

        try {
            const response = await axios.post(`https://backend.saweria.co/donations/${userId}`, payload);
            res.status(200).json(response.data);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
