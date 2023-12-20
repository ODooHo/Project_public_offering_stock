

export const calculateTotalProfitRate = (trades) => {
    let totalProfit = 0;
    let totalInvestment = 0;
    
    trades.forEach(trade => {
      if (trade.buyPrice && trade.sellPrice) {
        const sellPrice = trade.sellPrice;
        const buyPrice = trade.buyPrice;
        const profit = (sellPrice - buyPrice) * trade.tradeQuantity - trade.tradeFee;
        totalProfit += profit;
        totalInvestment += buyPrice * trade.tradeQuantity;
      }
    });
  
    return totalInvestment > 0 ? ((totalProfit / totalInvestment) * 100).toFixed(2) : '0.00';
  };
  