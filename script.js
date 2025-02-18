import DonationService from './donationService.js';

const donationService = new DonationService('YOUR_API_KEY_HERE'); // Ganti dengan API key Anda

function generateRandomReffId() {
    return 'reff_' + Math.random().toString(36).substr(2, 9);
}

document.getElementById('donation-button').addEventListener('click', async function(event) {
    event.preventDefault();
    const donationAmount = prompt("Masukkan jumlah donasi:");
    
    if (donationAmount) {
        try {
            const reffId = generateRandomReffId();
            const type = 'ewallet';
            const method = 'QRISFAST';

            const result = await donationService.createDonation(reffId, donationAmount, type, method);
            
            if (result.status) {
                const data = result.data;
                const totalAmount = data.nominal + data.fee;
                alert(`Jumlah yang harus dibayar: ${totalAmount}\nQRIS: ${data.qr_string}`);
                
                const qrImage = document.createElement('img');
                qrImage.src = data.qr_image;
                qrImage.alt = 'QR Code';
                qrImage.style.width = '200px';
                document.body.appendChild(qrImage);
            } else {
                alert('Terjadi kesalahan: ' + result.message);
            }
        } catch (error) {
            alert('Terjadi kesalahan: ' + error.error);
        }
    }
});
