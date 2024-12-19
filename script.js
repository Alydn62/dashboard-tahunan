
document.addEventListener('DOMContentLoaded', function () {
    const labels = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", 
                    "Agustus", "September", "Oktober", "November", "Desember"];
    const data2022 = [4017, 6135, 7091, 5841, 5036, 4547, 3467, 3970, 6313, 3595, 9207, 5945];
    const data2023 = [2416, 4136, 7935, 8004, 9505, 5026, 6108, 6343, 9404, 9280, 9287, 8689];

    if (Array.isArray(data2022) && Array.isArray(data2023) && data2022.length === data2023.length) {
        const ctx = document.getElementById('salesChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    { label: 'Penjualan 2022', data: data2022, backgroundColor: 'rgba(54, 162, 235, 0.6)' },
                    { label: 'Penjualan 2023', data: data2023, backgroundColor: 'rgba(255, 99, 132, 0.6)' }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true, title: { display: true, text: 'Jumlah Penjualan' } },
                    x: { title: { display: true, text: 'Bulan' } }
                },
                plugins: { title: { display: true, text: 'Perbandingan Penjualan Tahun 2022 dan 2023' } }
            }
        });

        const lineCtx = document.getElementById('lineChart').getContext('2d');
        new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    { label: 'Penjualan 2022', data: data2022, borderColor: 'rgba(54, 162, 235, 0.6)', fill: false },
                    { label: 'Penjualan 2023', data: data2023, borderColor: 'rgba(255, 99, 132, 0.6)', fill: false }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true, title: { display: true, text: 'Jumlah Penjualan' } },
                    x: { title: { display: true, text: 'Bulan' } }
                },
                plugins: { title: { display: true, text: 'Tren Penjualan Tahun 2022 dan 2023' } }
            }
        });

        const pieCtx = document.getElementById('pieChart').getContext('2d');
        new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [
                    { label: 'Total Penjualan', data: data2022.map((val, i) => val + data2023[i]), backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(199, 199, 199, 0.6)',
                        'rgba(83, 102, 255, 0.6)',
                        'rgba(183, 235, 64, 0.6)',
                        'rgba(255, 89, 192, 0.6)',
                        'rgba(122, 159, 64, 0.6)',
                        'rgba(83, 99, 132, 0.6)'
                    ] }
                ]
            },
            options: {
                responsive: true,
                plugins: { title: { display: true, text: 'Distribusi Total Penjualan per Bulan' } }
            }
        });

        const yearlyTableBody = document.getElementById("yearlyTableBody");
        for (let i = 0; i < labels.length; i++) {
            yearlyTableBody.innerHTML += `
                <tr>
                    <td>${labels[i]}</td>
                    <td>${data2022[i]}</td>
                    <td>${data2023[i]}</td>
                </tr>`;
        }
    } else {
        console.error("Data penjualan tidak valid");
    }

    function loadMonthlyTable() {
        const tableBody = document.getElementById("monthlyTableBody");
        tableBody.innerHTML = "";
        for (let i = 0; i < labels.length; i++) {
            const difference = data2023[i] - data2022[i];
            tableBody.innerHTML += `
                <tr>
                    <td>${labels[i]}</td>
                    <td>${data2022[i]}</td>
                    <td>${data2023[i]}</td>
                    <td>${difference}</td>
                </tr>`;
        }
    }

    window.showContent = function (section) {
        document.getElementById('dashboard').style.display = (section === 'dashboard') ? 'block' : 'none';
        document.getElementById('monthly').style.display = (section === 'monthly') ? 'block' : 'none';
        if (section === 'monthly') loadMonthlyTable();
    };

    window.toggleSidebar = function () {
        document.querySelector('.sidebar').classList.toggle('active');
        document.querySelector('.hamburger').classList.toggle('active');
    };
});
