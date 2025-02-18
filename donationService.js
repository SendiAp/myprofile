class DonationService {
    constructor(apiKey) {
        this._apiKey = apiKey;
        this._endpoint = 'https://atlantich2h.com'; // Ganti dengan endpoint yang sesuai
    }

    async createDonation(reffId, nominal, type, method) {
        try {
            const params = new URLSearchParams();
            params.append("api_key", this._apiKey);
            params.append("reff_id", reffId);
            params.append("nominal", nominal);
            params.append("type", type);
            params.append("metode", method);

            const response = await axios.post(
                `${this._endpoint}/deposit/create`,
                params.toString(),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw { error: error.message };
        }
    }
}

export default DonationService;
