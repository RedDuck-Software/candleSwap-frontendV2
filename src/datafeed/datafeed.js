import { getPairs, makeApiRequest, resolutionToSeconds, tokenList } from "./helpers.js";
import { subscribeOnStream, unsubscribeFromStream } from "./streaming.js";
import { ethers } from "ethers";
import { generateSymbol } from "./helpers";

const ERC20_ABI = [
  { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, {
      "indexed": true,
      "internalType": "address",
      "name": "spender",
      "type": "address"
    }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }],
    "name": "Approval",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{ "indexed": false, "internalType": "uint256", "name": "minTokensBeforeSwap", "type": "uint256" }],
    "name": "MinTokensBeforeSwapUpdated",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "previousOwner",
      "type": "address"
    }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }],
    "name": "OwnershipTransferred",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "internalType": "uint256",
      "name": "tokensSwapped",
      "type": "uint256"
    }, { "indexed": false, "internalType": "uint256", "name": "ethReceived", "type": "uint256" }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "tokensIntoLiqudity",
      "type": "uint256"
    }],
    "name": "SwapAndLiquify",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{ "indexed": false, "internalType": "bool", "name": "enabled", "type": "bool" }],
    "name": "SwapAndLiquifyEnabledUpdated",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, {
      "indexed": true,
      "internalType": "address",
      "name": "to",
      "type": "address"
    }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }],
    "name": "Transfer",
    "type": "event"
  }, {
    "inputs": [],
    "name": "_liquidityFee",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "_maxTxAmount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "_taxFee",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, {
      "internalType": "address",
      "name": "spender",
      "type": "address"
    }],
    "name": "allowance",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }],
    "name": "approve",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "decimals",
    "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, {
      "internalType": "uint256",
      "name": "subtractedValue",
      "type": "uint256"
    }],
    "name": "decreaseAllowance",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{ "internalType": "uint256", "name": "tAmount", "type": "uint256" }],
    "name": "deliver",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "excludeFromFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "excludeFromReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [],
    "name": "geUnlockTime",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "includeInFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "includeInReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, {
      "internalType": "uint256",
      "name": "addedValue",
      "type": "uint256"
    }],
    "name": "increaseAllowance",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "isExcludedFromFee",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "isExcludedFromReward",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{ "internalType": "uint256", "name": "time", "type": "uint256" }],
    "name": "lock",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [],
    "name": "name",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "owner",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{ "internalType": "uint256", "name": "tAmount", "type": "uint256" }, {
      "internalType": "bool",
      "name": "deductTransferFee",
      "type": "bool"
    }],
    "name": "reflectionFromToken",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{ "internalType": "uint256", "name": "liquidityFee", "type": "uint256" }],
    "name": "setLiquidityFeePercent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{ "internalType": "uint256", "name": "maxTxPercent", "type": "uint256" }],
    "name": "setMaxTxPercent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{ "internalType": "bool", "name": "_enabled", "type": "bool" }],
    "name": "setSwapAndLiquifyEnabled",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{ "internalType": "uint256", "name": "taxFee", "type": "uint256" }],
    "name": "setTaxFeePercent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [],
    "name": "swapAndLiquifyEnabled",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "symbol",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{ "internalType": "uint256", "name": "rAmount", "type": "uint256" }],
    "name": "tokenFromReflection",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "totalFees",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }],
    "name": "transfer",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, {
      "internalType": "address",
      "name": "recipient",
      "type": "address"
    }, { "internalType": "uint256", "name": "amount", "type": "uint256" }],
    "name": "transferFrom",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [],
    "name": "uniswapV2Pair",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "uniswapV2Router",
    "outputs": [{ "internalType": "contract IUniswapV2Router02", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "unlock",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, { "stateMutability": "payable", "type": "receive" }];

export const getTokenSymbol = (address) => {
  const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
  const TokenContract = new ethers.Contract(address, ERC20_ABI, provider);
  return TokenContract.symbol();
};

const lastBarsCache = new Map();

const configurationData = {
  supported_resolutions: ["10s", "15S", "30S", "1", "3", "5", "15", "60", "D", "W"],
  exchanges: [{
    value: "DogeCharts",
    name: "DogeCharts",
    desc: "DogeCharts"
  }
  ],
  symbols_types: [{
    name: "crypto",
    value: "crypto"
  }],
  supports_marks: true,
  supports_timescale_marks: true,
  supports_time: true
};

export const updateToValidSymbol = (symbol) => {
  switch (symbol) {
    case "BTC":
      return "BTCB";
    case "BNB":
      return "WBNB";
    default:
      return symbol;
  }

};

async function getAllSymbols() {
  const data = await getPairs();
  let allSymbols = [];
  const pairs = data.Data["Binance"].pairs;
  for (const leftPairPart of Object.keys(pairs)) {
    const symbols = pairs[leftPairPart].map(rightPairPart => {
      const symbol = generateSymbol("DogeCharts", updateToValidSymbol(leftPairPart), updateToValidSymbol(rightPairPart));
      return {
        symbol: symbol.short,
        full_name: symbol.full,
        description: symbol.short,
        exchange: "DogeCharts",
        type: "crypto"
      };
    });
    allSymbols = [...allSymbols, ...symbols];
  }
  allSymbols = allSymbols.filter(symbol => {
    const [symbol1, symbol2] = symbol.symbol.split("/");
    const token1 = tokenList.find(token => symbol1 === token.symbol);
    const token2 = tokenList.find(token => symbol2 === token.symbol);
    return !!(token1 && token2);
  });
  if (localStorage.getItem("customPairs")) {
    const localStoragePairs = JSON.parse(localStorage.getItem("customPairs")).map(pair => {
      const symbol = generateSymbol("DogeCharts", updateToValidSymbol(pair.token0Symbol), updateToValidSymbol(pair.token1Symbol));
      return {
        symbol: symbol.short,
        full_name: symbol.full,
        description: symbol.short,
        exchange: "DogeCharts",
        type: "crypto"
      };
    });
    allSymbols = [...allSymbols, ...localStoragePairs];
  }
  return allSymbols;
  // return {symbols: allSymbols, symbolsAddresses: parsedData};
}

export default {
  onReady: (callback) => {
    console.log("[onReady]: Method call");
    setTimeout(() => callback(configurationData));
  },

  searchSymbols: async (
    userInput,
    exchange,
    symbolType,
    onResultReadyCallback
  ) => {
    console.log("[searchSymbols]: Method call");
    const symbols = await getAllSymbols();
    const newSymbols = symbols.filter(symbol => {
      const isExchangeValid = exchange === "" || symbol.exchange === exchange;
      const isFullSymbolContainsInput = symbol.full_name
        .toLowerCase()
        .indexOf(userInput.toLowerCase()) !== -1;
      return isExchangeValid && isFullSymbolContainsInput;
    });
    onResultReadyCallback(newSymbols);
  },

  resolveSymbol: async (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback
  ) => {
    console.log("[resolveSymbol]: Method call", symbolName);
    const symbols = await getAllSymbols();
    const symbolItem = symbols.find(({ full_name }) => full_name === symbolName);             
    const [symbol0, symbol1] = symbolItem.symbol.split("/");
    let symbol0Address;
    symbol0Address = tokenList.find(token => token.symbol.trim().toLowerCase() === symbol0.trim().toLowerCase())?.address;
    if(!symbol0Address){
      const localStoragePairs = JSON.parse(localStorage.getItem("customPairs"));
      const middle = localStoragePairs.find(pair => pair.token0Symbol === symbol0 || pair.token1Symbol === symbol0);
      if(middle.token0Symbol === symbol0){
        symbol0Address = middle.token0Address;
      }
      if(middle.token1Symbol === symbol0){
        symbol0Address = middle.token1Address;
      }
    }
    let symbol1Address;
    symbol1Address = tokenList.find(token => token.symbol.trim().toLowerCase() === symbol1.trim().toLowerCase())?.address;
    if(!symbol1Address){
      const localStoragePairs = JSON.parse(localStorage.getItem("customPairs"));
      const middle = localStoragePairs.find(pair => pair.token0Symbol === symbol1 || pair.token1Symbol === symbol1);
      if(middle.token0Symbol === symbol1){
        symbol1Address = middle.token0Address;
      }
      if(middle.token1Symbol === symbol1){
        symbol1Address = middle.token1Address;
      }
    }
    if (!symbolItem) {
      console.log("[resolveSymbol]: Cannot resolve symbol", symbolName);
      onResolveErrorCallback("cannot resolve symbol");
      return;
    }
    const symbolInfo = {
      ticker: symbolItem.full_name,
      name: symbolItem.symbol,
      description: symbolItem.description,
      type: symbolItem.type,
      session: "24x7",
      exchange: symbolItem.exchange,
      minmov: 1,
      pricescale: 10000000000000,
      timezone: "Etc/UTC",
      has_intraday: true,
      has_no_volume: true,
      has_weekly_and_monthly: true,
      supported_resolutions: configurationData.supported_resolutions,
      volume_precision: 2,
      data_status: "streaming",
      token0Id: symbol0Address,
      token1Id: symbol1Address
    };

    console.log("[resolveSymbol]: Symbol resolved", symbolName);
    onSymbolResolvedCallback(symbolInfo);
  },

  getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
    const { from, to, firstDataRequest } = periodParams;
    console.log("[getBars]: Method call", symbolInfo, resolution, from, to);
    console.log("Start time", from)
    const urlParameters = {
      token0Id: symbolInfo.token0Id,
      token1Id: symbolInfo.token1Id,
      periodSeconds: resolutionToSeconds(resolution),
      startTime: `${new Date(from * 100).toISOString()}`,
      endTime: `${new Date(to * 1000).toISOString()}`,
      intervalType: resolutionToSeconds(resolution).split("(")[0]
    };
    try {
      let data = await makeApiRequest(urlParameters.token0Id, urlParameters.token1Id, urlParameters.startTime, urlParameters.endTime, urlParameters.periodSeconds, urlParameters.intervalType);
      if (data.length === 0 || !data) {
        // "noData" should be set if there is no data in the requested period.
        onHistoryCallback([], {
          noData: true
        });
        return;
      }
      let bars = data.map(bar => ({
        time: new Date(bar.timeInterval[urlParameters.intervalType]).getTime(),
        low: bar["minimum_price"],
        high: bar["maximum_price"],
        open: bar["open_price"],
        close: bar["close_price"]
      }));
      let prevBar = null;
      bars = bars.map(bar => {
        if(prevBar){
          const isDolbaebPick = +bar.high > (+prevBar.high * 8);
          if(isDolbaebPick){
            return {
              ...bar, high: `${+prevBar.high * 1.2}`
            }
          }
        }
        prevBar = bar;
        return bar
      });
      if (firstDataRequest) {
        lastBarsCache.set(symbolInfo.full_name, {
          ...bars[bars.length - 1]
        });
      }
      console.log(`[getBars]: returned ${bars.length} bar(s)`);
      onHistoryCallback(bars, {
        noData: false
      });
    } catch (error) {
      console.log("[getBars]: Get error", error);
      onErrorCallback(error);
    }
  },

  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscribeUID,
    onResetCacheNeededCallback
  ) => {
    console.log("[subscribeBars]: Method call with subscribeUID:", subscribeUID);
    subscribeOnStream(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscribeUID,
      onResetCacheNeededCallback,
      lastBarsCache.get(symbolInfo.full_name)
    );
  },

  unsubscribeBars: (subscriberUID) => {
    console.log("[unsubscribeBars]: Method call with subscriberUID:", subscriberUID);
    subscriberUID = subscriberUID.replace(/[^0-9]/g, '');
    unsubscribeFromStream(subscriberUID);
  }
};
