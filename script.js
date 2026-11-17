document.addEventListener('DOMContentLoaded', function() {
  
  Papa.parse('musicrevenue.csv', {
    download: true,
    header: true,
    skipEmptyLines: true,
    
    complete: function(results) {
      console.log("Data loaded successfully!");
      console.log(results.data);
      
      // Render table
      const tbody = document.querySelector('#dataTable tbody');
      results.data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.Platform}</td>
          <td>${row.PayoutPerStreamUSD}</td>
          <td>${row.MonthlyUsersMillions}</td>
          <td>${row.Type}</td>
          <td>${row.StreamsForUSMonthlyMinimumWage}</td>
        `;
        tbody.appendChild(tr);
      });
      
      // Render chart
      const labels = [];
      const values = [];
      
      results.data.forEach(row => {
        labels.push(row.Platform);
        values.push(cleanNumber(row.StreamsForUSMonthlyMinimumWage));
      });
      
      new Chart(
        document.getElementById('revenueChart'),
        {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Streams Needed for Monthly Minimum Wage',
              data: values,
              backgroundColor: '#4e79a7'
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Number of Streams'
                }
              }
            }
          }
        }
      );
    },
    
    error: function(err) {
      console.error("Failed to load data:", err);
      alert("Error reading CSV file. Please check the file name and path.");
    }
  });
  
  function cleanNumber(value) {
    return Number(String(value).replace(/[^0-9.-]/g, ''));
  }
});
