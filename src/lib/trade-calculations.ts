
/**
 * Calculate pips between entry and exit prices
 */
export function calculatePips(
  symbol: string,
  direction: "buy" | "sell" | "long" | "short",
  entryPrice: number,
  exitPrice: number
): number {
  const pipMultiplier = getPipMultiplier(symbol);
  
  // Normalize direction values
  const isLong = direction === "buy" || direction === "long";
  
  if (isLong) {
    return (exitPrice - entryPrice) * pipMultiplier;
  } else {
    return (entryPrice - exitPrice) * pipMultiplier;
  }
}

/**
 * Calculate risk-reward ratio
 */
export function calculateRiskRewardRatio(
  symbol: string,
  direction: "buy" | "sell" | "long" | "short",
  entryPrice: number,
  stopLoss: number,
  takeProfit: number
): string {
  const pipMultiplier = getPipMultiplier(symbol);
  let risk = 0;
  let reward = 0;
  
  // Normalize direction values
  const isLong = direction === "buy" || direction === "long";
  
  if (isLong) {
    risk = Math.abs(entryPrice - stopLoss) * pipMultiplier;
    reward = Math.abs(takeProfit - entryPrice) * pipMultiplier;
  } else {
    risk = Math.abs(stopLoss - entryPrice) * pipMultiplier;
    reward = Math.abs(entryPrice - takeProfit) * pipMultiplier;
  }
  
  if (risk > 0 && reward > 0) {
    const ratio = (reward / risk).toFixed(1);
    return `1:${ratio}`;
  }
  
  return "0:0";
}

/**
 * Get pip multiplier for a given pair
 */
export function getPipMultiplier(symbol: string): number {
  // Most forex pairs have 10000 pip multiplier (4 decimal places)
  let multiplier = 10000;
  
  // JPY pairs have 100 pip multiplier (2 decimal places)
  if (symbol.includes('JPY')) {
    multiplier = 100;
  }
  
  // XAU/USD (Gold) uses 100 pip multiplier
  if (symbol === 'XAU/USD') {
    multiplier = 100;
  }
  
  return multiplier;
}

/**
 * Get pip value for a given pair and lot size
 */
export function getPipValue(symbol: string, lotSize: number): number {
  // Standard pip value for 1 standard lot (100,000 units) is $10 for most USD pairs
  let pipValue = 10;
  
  // For simplicity, we're using a fixed value
  // In a real application, this would be calculated based on the pair and current rates
  
  // Adjust for lot size
  pipValue = pipValue * lotSize;
  
  return pipValue;
}
