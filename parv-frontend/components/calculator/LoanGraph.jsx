
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement } from "chart.js";

// Registering necessary components for the pie chart and bar chart
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement);

export default function LoanGraph({ type, amount, length, interest }) {
    const monthlyInterestRate = interest / 100 / 12;
    const monthlyPayment = (amount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -length));
    const totalPayable = (monthlyPayment * length).toFixed(2);
    const totalInterest = (totalPayable - amount).toFixed(2);

    if (type === "pie") {
        // Data for Pie Chart
        const data = {
            labels: ["Principal", "Interest", "Total Payable"],
            datasets: [
                {
                    data: [amount, totalInterest, totalPayable],
                    backgroundColor: ["#4F46E5", "#F59E0B", "#10B981"],
                    hoverOffset: 4,
                },
            ],
        };

        return (
            <div className="h-80 w-full">
                <Pie data={data} />
            </div>
        );
    } else if (type === "bar") {
        // Data for Bar Chart - Monthly breakdown
        const barLabels = [];
        const principalData = [];
        const interestData = [];

        let remainingBalance = amount;
        for (let month = 1; month <= Math.min(length, 12); month++) { // Show first 12 months or all if less
            const interestPayment = remainingBalance * monthlyInterestRate;
            const principalPayment = monthlyPayment - interestPayment;
            remainingBalance -= principalPayment;

            barLabels.push(`Month ${month}`);
            principalData.push(principalPayment);
            interestData.push(interestPayment);
        }

        const barData = {
            labels: barLabels,
            datasets: [
                {
                    label: 'Principal',
                    data: principalData,
                    backgroundColor: '#4F46E5',
                    borderColor: '#4F46E5',
                    borderWidth: 1,
                },
                {
                    label: 'Interest',
                    data: interestData,
                    backgroundColor: '#F59E0B',
                    borderColor: '#F59E0B',
                    borderWidth: 1,
                },
            ],
        };

        const barOptions = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Monthly Principal vs Interest (First 12 Months)',
                    font: {
                        size: 14
                    }
                },
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value.toLocaleString();
                        }
                    }
                }
            },
        };

        return (
            <div className="h-80 w-full">
                <Bar data={barData} options={barOptions} />
            </div>
        );
    }

    return null;
}

