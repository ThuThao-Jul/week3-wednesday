const cryptoURL =
"https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=5&convert=USD&CMC_PRO_API_KEY=10289dce-8825-4b2e-94b1-3d4734cd9cae";

// async function getCryptoPrices() {
//     const response = await fetch(cryptoURL);
//     const json = await response.json();
//     const coin = json.data[0];
//     renderLineGraph(coin);

//     console.log(json)
//     console.log(coin);
//   }

// getCryptoPrices()



async function getCryptoPrices() {
    const response = await fetch(cryptoURL);
    const json = await response.json();
    const coin = [json.data[0], json.data[1], json.data[2], json.data[3], json.data[4]]
  
    renderLineGraph(coin)
    
    

    console.log(json)
    console.log(coin);
  }

getCryptoPrices()

let i=0;

  function data(coin){
    let colors =["red", "blue", "#4F0E0E", "#D62AD0", "#81B214"]

    let data = {
      label: coin.name,
      borderWidth: 1,
      data: getHistoricPrices(coin.quote.USD),
      borderColor: colors[i],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
    }
    i+=1;
    return data
  }
 

  function renderLineGraph(coin) {
      
    const ctx = document.getElementById("myChart");
    const price = coin[0].quote.USD.price; 
    const [ninetyAgoPrice] = getHistoricPrices(coin[0].quote.USD); 
    const timeAgo = ["90d", "60d", "30d", "7d", "24h", "1h", "Current"];
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["90d", "60d", "30d", "7d", "24h", "1h", "Current"],
        datasets: [ data(coin[0]), data(coin[1]), data(coin[2]), data(coin[3]), data(coin[4])
          // {
          //   label: coin.name,
          //   borderWidth: 1,
          //   data: getHistoricPrices(coin.quote.USD),
          //   borderColor: "rgba(255, 99, 132, 1)",
          //   backgroundColor: "rgba(255, 99, 132, 0.2)",
          // },
        ],
      },
      options: {
        tooltips: {
          enabled: true,
          mode: "nearest",
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
                suggestedMax: price,
                suggestedMin: ninetyAgoPrice,
              },
            },
          ],
        },
      },
    });

  }



  function getHistoricPrices(prices) {
    const {
      percent_change_90d,
      percent_change_60d,
      percent_change_30d,
      percent_change_7d,
      percent_change_24h,
      percent_change_1h,
      price,
    } = prices;
   
    const ninetyAgoPrice = calculatePriceFromPercentageChange(
      price,
      percent_change_90d
    );
    const sixtyAgoPrice = calculatePriceFromPercentageChange(
      price,
      percent_change_60d
    );
    const thirtyAgoPrice = calculatePriceFromPercentageChange(
      price,
      percent_change_30d
    );
    const sevenAgoPrice = calculatePriceFromPercentageChange(
      price,
      percent_change_7d
    );
    const dayAgoPrice = calculatePriceFromPercentageChange(
      price,
      percent_change_24h
    );
    const hourAgoPrice = calculatePriceFromPercentageChange(
      price,
      percent_change_1h
    );
  
    return [
      ninetyAgoPrice,
      sixtyAgoPrice,
      thirtyAgoPrice,
      sevenAgoPrice,
      dayAgoPrice,
      hourAgoPrice,
      price,
    ];
  }



  function calculatePriceFromPercentageChange(currentPrice, percentageChange) {
    let denominator;
    let historicPrice;
    if (percentageChange >= 100) {
      percentageChange = percentageChange + 100;
      denominator = percentageChange * 0.01;
      historicPrice = currentPrice / denominator;
    }
  
    if (percentageChange < 100 && percentageChange > 0) {
      denominator = 1 + percentageChange / 100;
      historicPrice = currentPrice / denominator;
    }
  
    if (percentageChange < 0) {
      const original = (currentPrice / (100 + percentageChange)) * 100;
      historicPrice = original;
    }
    return historicPrice;
  }
