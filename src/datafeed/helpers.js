// Make requests to  Bitquery API
import * as axios from 'axios'

// Index of ApiKeys
let idx = 0

export async function makeApiRequest(token0Id, token1Id, sinceDate, tillDate, resolution, typeInterval) {
    const apiKeys = ['BQYTp6I0POiej43Mc7LZrZl8MNQuQM0P','BQYkMIRqKAiTJTRNRSd2syo38DEep2dQ', 'BQYDtvybBM5ns6gEpVoNoepHpCBXUz72', 'BQYOK9ZAHroyH6KgwCTBdWOuFadBPLZb', 'BQYDfB4NR6yO3G6VaH8ayi6hREpZqePW', 'BQYYvx1qYnz6V4P0RQ6ywSn8z0nFF8gd', 'BQYIhrvTBsUD14RBSdKZiR9zZrIqfqhS', 'BQYvXrXt5zSJ1rJ8PDRQMyzLmXr00wqs',
    'BQYEgh0U40hPFWgn5stFrDTYgseF1won', 'BQYHjS4INC7WbmbxYZUG7zNgW2DmlEcx',
    'BQYziaXTLiDepo2twN4MIMQhhxPt4oH9', 'BQYtyJM0Nrp3VBCCcTSYNWdkiItt4Msn',
    'BQYvColro9sbnOFvjZXIFlQJaJiVKgya', 'BQYq13Ac22iqEKqnqQhLuvnk5ZR3qs16',
    'BQYAggaFkvM2y9cYW79SeauFMdXrNsQ4'
]
    console.log('Props in helpers: ', token0Id, token1Id, sinceDate, tillDate, resolution, typeInterval)
    return await axios({
        url: 'https://graphql.bitquery.io',
        method: 'post',
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": apiKeys[idx]
        },
        data: {
            query: `
                    {   
                        ethereum(network: bsc) {
                        dexTrades(options: {limit: 15000, asc: "timeInterval.${typeInterval}"}, 
                        date: {since:"${sinceDate}", till:"${tillDate}"}
                        exchangeName: {in: ["Pancake", "Pancake v2"]}, 
                        baseCurrency: {is: "${token0Id}"}, 
                        quoteCurrency: {is: "${token1Id}"}) {

                        timeInterval {
                            ${resolution}
                        }

                        maximum_price: quotePrice(calculate: maximum)
                        minimum_price: quotePrice(calculate: minimum)
                        open_price: minimum(of: block get: quote_price)
                        close_price: maximum(of: block get: quote_price)
                    }   
                }
            }
            `,
        }   
    }).then((result) => {
        console.log('Its a result: ',result.data)
        return result.data.data.ethereum.dexTrades
    }).catch((error) => {
        console.log('Its an error: ', error)
        idx++
        return data.length = 0
    })
}

export const getPairs = async () => {
    return await fetch('https://min-api.cryptocompare.com/data/v3/all/exchanges').then(response => response.json())
}

// Generate a symbol ID from a pair of the coins
export function generateSymbol(exchange, fromSymbol, toSymbol) {
    const short = `${fromSymbol}/${toSymbol}`
    return {
        short,
        full: `${exchange}:${short}`,
    }
}

export function parseFullSymbol(fullSymbol) {
    const match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/)
    if (!match) {
        return null
    }

    return {
        exchange: match[1],
        fromSymbol: match[2],
        toSymbol: match[3],
    }
}

export function resolutionToSeconds(resolution) {
    const seconds = {
        '3': 'minute(count: 3)',
        '5': 'minute(count: 5)',
        '15': 'minute(count: 15)',
        '1': 'minute(count: 1)',
        '60': 'hour(count: 1)',
        '1D': 'day(count: 1)',
        '1W': 'day(count: 7)',
        '1M': 'month(count: 1)',
        '30S': 'second(count: 30)',
        '10S': 'second(count: 10)',
        '15S': 'second(count: 25)',
    }
    return seconds[resolution]
}
export function resolutionsForSocket(resolution) {
    const seconds = {
        '3': '180',
        '5': '300',
        '15': '900',
        '1': '60',
        '60': '3600',
        '1D': '86400',
        '1W': '604800',
        '30S': '30',
        '10S': '10',
        '15S': '15',
    }
    return seconds[resolution]
}

export const tokenList = [
    {
        address: '0x0112e557d400474717056C4e6D40eDD846F38351',
        symbol: 'PHA',
    },
    {
        address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        symbol: 'WBNB',
    },
    {
        address: '0x8F0528cE5eF7B51152A59745bEfDD91D97091d2F',
        symbol: 'ALPACA',
    },
    {
        address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        symbol: 'WBNB',
    },
    {
        address: '0x0123e0c507789C942a4460C23907D4ec2A083210',
        symbol: 'DOGEWHEEL',
    },
    {
        address: '0x019C75824667B95f449D069495EE5cA7c2Ec4660',
        symbol: 'CJX',
    },
    {
        address: '0x01a78db633940579E15e7bDB8EdfEE8ecDeA4522',
        symbol: 'EBSC',
    },
    {
        address: '0x55d398326f99059fF775485246999027B3197955',
        symbol: 'USDT',
    },
    {
        address: '0x01AF3B81EBB6bCb6440B444EE1739c1Ec463085c',
        symbol: 'KFK',
    },
    {
        address: '0x0211e893a2fDd7768A1545C2E1B8E7019323D61e',
        symbol: 'OVOC',
    },
    {
        address: '0x0255af6c9f86F6B0543357baCefA262A2664f80F',
        symbol: 'DARA',
    },
    {
        address: '0x027b19B319f4381F20060606459C055c14791db1',
        symbol: 'KURAI',
    },
    {
        address: '0xAB15B79880f11cFfb58dB25eC2bc39d28c4d80d2',
        symbol: 'SMON',
    },
    {
        address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
        symbol: 'BUSD',
    },
    {
        address: '0x0288D3E353fE2299F11eA2c2e1696b4A648eCC07',
        symbol: 'ZEFI',
    },
    {
        address: '0xD41FDb03Ba84762dD66a0af1a6C8540FF1ba5dfb',
        symbol: 'SFP',
    },
    {
        address: '0x02A40C048eE2607B5f5606e445CFc3633Fb20b58',
        symbol: 'KABY',
    },
    {
        address: '0x02fF5065692783374947393723dbA9599e59F591',
        symbol: 'YOOSHI',
    },
    {
        address: '0x030ce78aa5be014976BcA9B8448e78d1d87FCe0B',
        symbol: 'BDS',
    },
    {
        address: '0x0328A69b363a16f66810B23cB0b8d32Abadb203D',
        symbol: 'KANA',
    },
    {
        address: '0x036BDd5bA9619ee0A895f8DC02867EBF453CB352',
        symbol: 'RWD',
    },
    {
        address: '0xF70c14AD93905f39eE3Df2D4fB92b87c31D779e0',
        symbol: 'MADA',
    },
    {
        address: '0x03C580eecf2c36Ab8a77a71d56d867EcD495552D',
        symbol: 'NUKE',
    },
    {
        address: '0x03f32599Ff3685FFe9c506BBDcdDD5E50659e2E6',
        symbol: 'StarMon',
    },
    {
        address: '0x03fF0ff224f904be3118461335064bB48Df47938',
        symbol: 'ONE',
    },
    {
        address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
        symbol: 'Cake',
    },
    {
        address: '0x041640eA980e3fE61e9C4ca26D9007Bc70094C15',
        symbol: 'PirateCoin☠',
    },
    {
        address: '0x043b49749e0016E965600d502E2177cA2d95B3d9',
        symbol: 'RACA',
    },
    {
        address: '0x12BB890508c125661E03b09EC06E404bc9289040',
        symbol: 'RACA',
    },
    {
        address: '0x6b23C89196DeB721e6Fd9726E6C76E4810a464bc',
        symbol: 'XWG',
    },
    {
        address: '0x7a983559e130723B70e45bd637773DbDfD3F71Db',
        symbol: 'DBZ',
    },
    {
        address: '0x045c4324039dA91c52C55DF5D785385Aab073DcF',
        symbol: 'bCFX',
    },
    {
        address: '0x04C747b40Be4D535fC83D09939fb0f626F32800B',
        symbol: 'ITAM',
    },
    {
        address: '0x8263CD1601FE73C066bf49cc09841f35348e3be0',
        symbol: 'ALU',
    },
    {
        address: '0x04d1bbf27E5Aa700A12279ba44359e4e11bB02Ef',
        symbol: 'SNOOP',
    },
    {
        address: '0x0523215DCafbF4E4aA92117d13C6985a3BeF27D7',
        symbol: 'GMR',
    },
    {
        address: '0x8aa688AB789d1848d131C65D98CEAA8875D97eF1',
        symbol: 'MTV',
    },
    {
        address: '0x057AFf3E314e1ca15BED75510df81A20098cE456',
        symbol: 'PTT',
    },
    {
        address: '0x05F2dF7B3D612A23fe12162A6c996447dCE728a5',
        symbol: 'YUMMY',
    },
    {
        address: '0x2c8368f8F474Ed9aF49b87eAc77061BEb986c2f1',
        symbol: 'LEOS',
    },
    {
        address: '0x07663837218A003e66310a01596af4bf4e44623D',
        symbol: 'rUSD',
    },
    {
        address: '0x079Dd74Cc214Ac5f892f6a7271ef0722F6D0c2e6',
        symbol: 'NasaDoge',
    },
    {
        address: '0x07af67b392B7A202fAD8E0FBc64C34F33102165B',
        symbol: 'AQUAGOAT',
    },
    {
        address: '0x339C72829AB7DD45C3C52f965E7ABe358dd8761E',
        symbol: 'WANA',
    },
    {
        address: '0x07B36F2549291d320132712a1E64d3826B1FB4D7',
        symbol: 'WIFEDOGE',
    },
    {
        address: '0xC7D43F2B51F44f09fBB8a691a0451E8FFCF36c0a',
        symbol: 'RISE',
    },
    {
        address: '0x07c1cf17b75408FbDB79806a693458cdCDA4f5B0',
        symbol: 'SMNR',
    },
    {
        address: '0x081A4D4e4A0cC74D6a7A61578f86b8C93CC950a0',
        symbol: 'GROW',
    },
    {
        address: '0x0853eABE53157D911E0137a9ef987874289ae9d0',
        symbol: 'CBT',
    },
    {
        address: '0x088BeBef4e371757509E64d3508B6Da6F376e2ac',
        symbol: 'DBall',
    },
    {
        address: '0x477bC8d23c634C154061869478bce96BE6045D12',
        symbol: 'SFUND',
    },
    {
        address: '0x82C19905B036bf4E329740989DCF6aE441AE26c1',
        symbol: 'CP',
    },
    {
        address: '0x0896f85e2BBD1472E46d42D6ce71459A66fa66ff',
        symbol: 'Onyx',
    },
    {
        address: '0x08ba0619b1e7A582E0BCe5BBE9843322C954C340',
        symbol: 'BMON',
    },
    {
        address: '0x0D8Ce2A99Bb6e3B7Db580eD848240e4a0F9aE153',
        symbol: 'FIL',
    },
    {
        address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
        symbol: 'ETH',
    },
    {
        address: '0x80E15FE54e9D155f8366187A6a32BDEF9C2366c4',
        symbol: 'BMON-Z1',
    },
    {
        address: '0x85EE8e3E0068EdeeEE960979958d7F61416a9d84',
        symbol: 'STORY',
    },
    {
        address: '0xc8a87A02053dD61Ff24179668E5A7d5Ec72FF4d1',
        symbol: 'BGPWR',
    },
    {
        address: '0xd8813B5Dfa9AbEB693F217Bb905ec99B66FB017C',
        symbol: 'BNRG',
    },
    {
        address: '0xe56842Ed550Ff2794F010738554db45E60730371',
        symbol: 'BIN',
    },
    {
        address: '0x095956B142431Eb9Cf88B99F392540B91aCbF4ad',
        symbol: 'OBS',
    },
    {
        address: '0xAc0C8dA4A4748d8d821A0973d00b157aA78C473D',
        symbol: 'YFO',
    },
    {
        address: '0x09607078980CbB0665ABa9c6D1B84b8eAD246aA0',
        symbol: 'PETG',
    },
    {
        address: '0x4338665CBB7B2485A8855A139b75D5e34AB0DB94',
        symbol: 'LTC',
    },
    {
        address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        symbol: 'USDC',
    },
    {
        address: '0x0968bF007b9e5170cE7395f735cE8dBD833ab5ff',
        symbol: 'XRPG',
    },
    {
        address: '0x099f551eA3cb85707cAc6ac507cBc36C96eC64Ff',
        symbol: 'SAFEARN',
    },
    {
        address: '0x09a6c44c3947B69E2B45F4D51b67E6a39ACfB506',
        symbol: 'UNCX',
    },
    {
        address: '0x0A169e2718782586DCF98F9C19B23dbFBF81373F',
        symbol: 'MBOGG',
    },
    {
        address: '0x0a3A21356793B49154Fd3BbE91CBc2A16c0457f5',
        symbol: 'RFOX',
    },
    {
        address: '0x893169619461d3ABA810A40b5403c62F27e703F9',
        symbol: 'FWT',
    },
    {
        address: '0x0A7bB2bddA1c0eA02d98a7b048f4bF809F40277b',
        symbol: 'THUNDERADA',
    },
    {
        address: '0x580dE58c1BD593A43DaDcF0A739d504621817c05',
        symbol: 'THOREUM',
    },
    {
        address: '0x0A927Ab3B0F48826210Ad4A43A953277AA7da8f7',
        symbol: 'TOP',
    },
    {
        address: '0x0adAB0f76ffC13360e09bE9ddffa8493DDc8fB9c',
        symbol: 'GCOIN',
    },
    {
        address: '0x0b3f42481C228F70756DbFA0309d3ddC2a5e0F6a',
        symbol: 'ULTRA',
    },
    {
        address: '0x0c1b3983D2a4Aa002666820DE5a0B43293291Ea6',
        symbol: 'PEPE',
    },
    {
        address: '0x0cf1a8F47dA44AD29865aA584813fa99D5129598',
        symbol: 'DRUNK',
    },
    {
        address: '0x0cF8dbAFDC29Ac98B45D7f2e088B26E365b455E4',
        symbol: 'CPU',
    },
    {
        address: '0x9eA326Ee59777e9f7874F4ec71f1b1F15BeBC234',
        symbol: 'HOGW',
    },
    {
        address: '0x0D472c572F4C785CC0C5a92ff7f81038Ed94Dc7D',
        symbol: 'BZSC',
    },
    {
        address: '0x0d499B25Bce7Aa72bb6c50E434E2Ed26fE1e785D',
        symbol: 'BRT',
    },
    {
        address: '0x0D77E65f231aB6214492498788cdd9441DD0cE72',
        symbol: 'FSH',
    },
    {
        address: '0x0De08C1AbE5fB86Dd7FD2ac90400AcE305138d5B',
        symbol: 'iDNA',
    },
    {
        address: '0x0E8D5504bF54D9E44260f8d153EcD5412130CaBb',
        symbol: 'UNCL',
    },
    {
        address: '0x0Eb3a705fc54725037CC9e008bDede697f62F335',
        symbol: 'ATOM',
    },
    {
        address: '0x0fA9651a0ecC19906843C13c60443300B9d37355',
        symbol: 'XMINE',
    },
    {
        address: '0x14c358b573a4cE45364a3DBD84BBb4Dae87af034',
        symbol: 'DND',
    },
    {
        address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
        symbol: 'DAI',
    },
    {
        address: '0x23396cF899Ca06c4472205fC903bDB4de249D6fC',
        symbol: 'UST',
    },
    {
        address: '0x25A528af62e56512A19ce8c3cAB427807c28CC19',
        symbol: 'FORM',
    },
    {
        address: '0x31471E0791fCdbE82fbF4C44943255e923F1b794',
        symbol: 'PVU',
    },
    {
        address: '0x330F4fe5ef44B4d0742fE8BED8ca5E29359870DF',
        symbol: 'JADE',
    },
    {
        address: '0x3780E00D4c60887AF38345cCd44f7617dBFB10A0',
        symbol: 'Doge2',
    },
    {
        address: '0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47',
        symbol: 'ADA',
    },
    {
        address: '0x3Fcca8648651E5b974DD6d3e50F61567779772A8',
        symbol: 'POTS',
    },
    {
        address: '0x40E46dE174dfB776BB89E04dF1C47d8a66855EB3',
        symbol: 'BSCDEFI',
    },
    {
        address: '0x54626300818E5C5b44Db0fcf45Ba4943CA89A9e2',
        symbol: 'CHECOIN',
    },
    {
        address: '0x5D0158A5c3ddF47d4Ea4517d8DB0D76aA2e87563',
        symbol: 'BONDLY',
    },
    {
        address: '0x68FB7F7d945b3362b45355a4Cb441FfdC9D99108',
        symbol: 'BOOBS',
    },
    {
        address: '0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402',
        symbol: 'DOT',
    },
    {
        address: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
        symbol: 'BTCB',
    },
    {
        address: '0x715D400F88C167884bbCc41C5FeA407ed4D2f8A0',
        symbol: 'AXS',
    },
    {
        address: '0x8E3BCC334657560253B83f08331d85267316e08a',
        symbol: 'BRBC',
    },
    {
        address: '0x90bdF238674569684a34F3AF8a3F55f08088bc98',
        symbol: 'SHIBCAKE',
    },
    {
        address: '0x947950BcC74888a40Ffa2593C5798F11Fc9124C4',
        symbol: 'SUSHI',
    },
    {
        address: '0xA73505453F58E367c80F16685079dAD6f4EA6b18',
        symbol: 'UMG',
    },
    {
        address: '0xADCFC6bf853a0a8ad7f9Ff4244140D10cf01363C',
        symbol: 'TPAD',
    },
    {
        address: '0xB61E0654d8b3e6F93b79de8F1983B45eBC27C3cf',
        symbol: 'ReBa',
    },
    {
        address: '0xc748673057861a797275CD8A068AbB95A902e8de',
        symbol: 'BabyDoge',
    },
    {
        address: '0xDAe6c2A48BFAA66b43815c5548b10800919c993E',
        symbol: 'KTN',
    },
    {
        address: '0xdB8D30b74bf098aF214e862C90E647bbB1fcC58c',
        symbol: 'BABYCAKE',
    },
    {
        address: '0xddD4214F0EAD50E877F25C22B460AFc16753c549',
        symbol: 'DCAKE',
    },
    {
        address: '0xe320Df552e78D57E95cF1182B6960746d5016561',
        symbol: 'DOGECOLA',
    },
    {
        address: '0xeBC76079Da0c245faE7225b58a57A54809b40618',
        symbol: 'BPAY',
    },
    {
        address: '0xf1018C71eeBe32Dd85012Ad413bAB6B940d0d51E',
        symbol: 'RHT',
    },
    {
        address: '0xF21768cCBC73Ea5B6fd3C687208a7c2def2d966e',
        symbol: 'REEF',
    },
    {
        address: '0xf3eDD4f14a018df4b6f02Bf1b2cF17A8120519A2',
        symbol: 'PWT',
    },
    {
        address: '0xf859Bf77cBe8699013d6Dbc7C2b926Aaf307F830',
        symbol: 'BRY',
    },
    {
        address: '0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD',
        symbol: 'LINK',
    },
    {
        address: '0xFa363022816aBf82f18a9C2809dCd2BB393F6AC5',
        symbol: 'HONEY',
    },
    {
        address: '0xFAfD4CB703B25CB22f43D017e7e0d75FEBc26743',
        symbol: 'WEYU',
    },
    {
        address: '0xfb62AE373acA027177D1c18Ee0862817f9080d08',
        symbol: 'DPET',
    },
    {
        address: '0x0E1BEB82DA7a8cee20bCBb00CFEf7D7F6A2f52Fd',
        symbol: 'SAVEUS',
    },
    {
        address: '0x0e4B5Ea0259eB3D66E6FCB7Cc8785817F8490a53',
        symbol: 'SOKU',
    },
    {
        address: '0x11ba78277d800502C84c5AeD1374Ff0A91f19f7E',
        symbol: 'EARN',
    },
    {
        address: '0x0E5f989ce525acC4ee45506AF91964F7f4C9f2e9',
        symbol: 'RYOSHI',
    },
    {
        address: '0x0E7BeEc376099429b85639Eb3abE7cF22694ed49',
        symbol: 'BUNI',
    },
    {
        address: '0x0ebd9537A25f56713E34c45b38F421A1e7191469',
        symbol: 'MOOV',
    },
    {
        address: '0x0Ef8cbd57FA91cdf911e0dAC6Aef215faf669E80',
        symbol: 'C98C',
    },
    {
        address: '0x1099E778846bAa6aAD3C6F26Ad42419AA7f95103',
        symbol: 'LKM',
    },
    {
        address: '0x10a49f1fC8C604eA7f1c49bcc6ab2A8E58e77EA5',
        symbol: 'BUFF',
    },
    {
        address: '0x10D9459D6b30866662d69f68C6CE853d1096DF3d',
        symbol: 'ASSFIN',
    },
    {
        address: '0x10E24a15bB2B49F6211401af82F0f3EbEd05BF71',
        symbol: 'CHEFCAKE',
    },
    {
        address: '0x10E76264489cDF4B4011F79086D0Bb6b55775E79',
        symbol: 'LTMS',
    },
    {
        address: '0x98BC4773Bd1e9A53631FD6028E06cd6cD17b7401',
        symbol: 'MBY',
    },
    {
        address: '0x10f486c5a4b62C98AE00f0bdce09972fb916EE87',
        symbol: 'MiniS',
    },
    {
        address: '0x11582Ef4642B1e7F0a023804B497656E2663bC9B',
        symbol: 'KCCPAD',
    },
    {
        address: '0x1164E6EAef5D6b57Eb6e44Db9CF593Abe2F5FA82',
        symbol: 'CRUNCH',
    },
    {
        address: '0x118B60763002f3Ba7603A3c17F946A0c7daB789F',
        symbol: 'PEARL',
    },
    {
        address: '0x11C0c93035d1302083eB09841042cFa582839A8C',
        symbol: 'KSHIB',
    },
    {
        address: '0x11c99d15e6E80249c8e7f2aAf5A9128F073663c3',
        symbol: 'AutoSushi',
    },
    {
        address: '0x11d1ac5ec23e3a193E8a491a198f5fc9ee715839',
        symbol: 'MPAD',
    },
    {
        address: '0x1251Cb6aEAe6CEE873aedB015f056FDD5C2ca2A5',
        symbol: 'BR',
    },
    {
        address: '0x40619dc9F00ea34e51D96b6EC5d8a6aD75457434',
        symbol: '1DOGE',
    },
    {
        address: '0xFbe0b4aE6E5a200c36A341299604D5f71A5F0a48',
        symbol: 'ZIN',
    },
    {
        address: '0x12e34cDf6A031a10FE241864c32fB03a4FDaD739',
        symbol: 'FREE',
    },
    {
        address: '0x133Bb423d9248a336D2b3086b8F44A7DbFF3a13C',
        symbol: 'SIL',
    },
    {
        address: '0x13E1070E3a388e53Ec35480Ff494538f9FFc5b8D',
        symbol: 'BRICKS',
    },
    {
        address: '0x14016E85a25aeb13065688cAFB43044C2ef86784',
        symbol: 'TUSD',
    },
    {
        address: '0x1633b7157e7638C4d6593436111Bf125Ee74703F',
        symbol: 'SPS',
    },
    {
        address: '0x14357D294fBabbE0fbF59503370c772d563b35b6',
        symbol: 'HMNG',
    },
    {
        address: '0x778682C19797d985c595429FbC51D67736013A86',
        symbol: 'Hegg',
    },
    {
        address: '0x1446f3CEdf4d86a9399E49f7937766E6De2A3AAB',
        symbol: 'KRW',
    },
    {
        address: '0x1496fB27D8cF1887d21cAc161987821859CA56Ba',
        symbol: 'AMC',
    },
    {
        address: '0x14A36EB3c09091bD2a88A3344fDA9e479C676091',
        symbol: 'MAY',
    },
    {
        address: '0x154A9F9cbd3449AD22FDaE23044319D6eF2a1Fab',
        symbol: 'SKILL',
    },
    {
        address: '0x20de22029ab63cf9A7Cf5fEB2b737Ca1eE4c82A6',
        symbol: 'CHESS',
    },
    {
        address: '0x4A7CDafb3C1B63029b0a11e91d0a718Bf635DAAB',
        symbol: 'DPACE',
    },
    {
        address: '0x6652462466DCeE5Cb1dda95379FaE3c3E57f6719',
        symbol: 'Key',
    },
    {
        address: '0x68E374F856bF25468D365E539b700b648Bf94B67',
        symbol: 'MIST',
    },
    {
        address: '0xD7730681B1DC8f6F969166B29D8A5EA8568616a3',
        symbol: 'NAFT',
    },
    {
        address: '0x155040625D7ae3e9caDA9a73E3E44f76D3Ed1409',
        symbol: 'REVO',
    },
    {
        address: '0x155dab50F1DdeD25c099E209E7b375456a70e504',
        symbol: 'MRCR',
    },
    {
        address: '0x157a594D16a924d99174d69edAF36CeB08Dd0c72',
        symbol: 'Forte',
    },
    {
        address: '0x158648792927eBb7a5c0D598BaB4D23417465E0B',
        symbol: 'RTT',
    },
    {
        address: '0x15D57CE57AB752a069fB6Fc76fF431812fD3aDA3',
        symbol: 'NEWO',
    },
    {
        address: '0x1613957159E9B0ac6c80e824F7Eea748a32a0AE2',
        symbol: 'CGG',
    },
    {
        address: '0x16153214E683018D5aA318864c8e692b66E16778',
        symbol: 'PWAR',
    },
    {
        address: '0x17B7163cf1Dbd286E262ddc68b553D899B93f526',
        symbol: 'QBT',
    },
    {
        address: '0x2222227E22102Fe3322098e4CBfE18cFebD57c95',
        symbol: 'TLM',
    },
    {
        address: '0xE9D7023f2132D55cbd4Ee1f78273CB7a3e74F10A',
        symbol: 'DEC',
    },
    {
        address: '0xFAc3A1ED2480Da8F5c34576C0Da13F245239717d',
        symbol: 'FAN',
    },
    {
        address: '0xFeea0bDd3D07eb6FE305938878C0caDBFa169042',
        symbol: '8PAY',
    },
    {
        address: '0x16dCc0eC78E91e868DCa64bE86aeC62bf7C61037',
        symbol: 'EverETH',
    },
    {
        address: '0x1730a0cA9de632B0B6c232EBb972CB0851FFC6Bf',
        symbol: 'SAFECITY',
    },
    {
        address: '0x1796ae0b0fa4862485106a0de9b654eFE301D0b2',
        symbol: 'PMON',
    },
    {
        address: '0x1D229B958D5DDFca92146585a8711aECbE56F095',
        symbol: 'Zoo',
    },
    {
        address: '0x17Acc21Da1Cd31d273c3f54b7d5Dd556C8715b79',
        symbol: 'CDZ',
    },
    {
        address: '0x17b17039711e61f8f5232c28d124DdAa2231BBFF',
        symbol: 'ORT',
    },
    {
        address: '0xaeF0d72a118ce24feE3cD1d43d383897D05B4e99',
        symbol: 'WIN',
    },
    {
        address: '0x17D749D3E2ac204a07e19D8096d9a05c423ea3af',
        symbol: 'LTRBT',
    },
    {
        address: '0x17D8519F57450E2B7E6aE1163E0E448322a8aF17',
        symbol: 'LOFI',
    },
    {
        address: '0x17fd3cAa66502C6F1CbD5600D8448f3aF8f2ABA1',
        symbol: 'SPY',
    },
    {
        address: '0x180dAe91D6d56235453a892d2e56a3E40Ba81DF8',
        symbol: 'DOJO',
    },
    {
        address: '0x187c01B199E1fa79b1A94AEFe3D9f85AB5AfDE79',
        symbol: 'Guevara',
    },
    {
        address: '0x18fF245c134D9DAA6fED977617654490ba4DA526',
        symbol: 'MASKDOGE',
    },
    {
        address: '0x19127D633940dB8D48412B83EE2322AFE52EB47A',
        symbol: 'BDGK',
    },
    {
        address: '0x19263F2b4693da0991c4Df046E4bAA5386F5735E',
        symbol: 'ZOO',
    },
    {
        address: '0x8461708744DAB03391961d72DDd72e6687f478F2',
        symbol: 'P2E',
    },
    {
        address: '0x197dc4bfc82ad08E3FBaa930A869485236e6A792',
        symbol: 'Knb',
    },
    {
        address: '0x198abB2D13fAA2e52e577D59209B5c23c20CD6B3',
        symbol: 'BAMBOO',
    },
    {
        address: '0x1991501f1398663F69dD7391C055bb0DF6514F76',
        symbol: 'HotDoge',
    },
    {
        address: '0x1997830B5beB723f5089bb8fc38766d419a0444d',
        symbol: 'NEWINU',
    },
    {
        address: '0xa47e75191c8FbF8Ba48e5D23a840053291CEb605',
        symbol: 'AOCO',
    },
    {
        address: '0xAC019EE3863984eA66Ab357A491d37fb2C9c6f17',
        symbol: 'BAO',
    },
    {
        address: '0x19A4866a85c652EB4a2ED44c42e4CB2863a62D51',
        symbol: 'HOD',
    },
    {
        address: '0x19B60612F9A93359bca835A788A334D4157E675B',
        symbol: 'PAWG',
    },
    {
        address: '0x1A29770F8Db6366cf2011Cb2c412d9bbCD86Cc4f',
        symbol: 'Bzzt',
    },
    {
        address: '0x1a9598dE92Af066e46dABDbBa64cdDe21284C489',
        symbol: 'WAMBO',
    },
    {
        address: '0x1AdE17B4B38B472B5259BbC938618226dF7b5Ca8',
        symbol: 'QUAM',
    },
    {
        address: '0xA656F993bD14B2B59a28d1e610476AD18849b107',
        symbol: 'SAFERMOON',
    },
    {
        address: '0xB2BD0749DBE21f623d9BABa856D3B0f0e1BFEc9C',
        symbol: 'DUSK',
    },
    {
        address: '0xb86AbCb37C3A4B64f74f59301AFF131a1BEcC787',
        symbol: 'ZIL',
    },
    {
        address: '0x1b41a1BA7722E6431b1A782327DBe466Fe1Ee9F9',
        symbol: 'KFT',
    },
    {
        address: '0x1B755B65e99AEC0Ff46afA396cf1f610e531449b',
        symbol: 'BullADA',
    },
    {
        address: '0x1b9E14122Cb416845F0f21967f38b5c3e74De774',
        symbol: 'NEBULA',
    },
    {
        address: '0x124831BB885DF3c4bf88176A478Ff1b3B95f3769',
        symbol: 'SRN',
    },
    {
        address: '0x1Bb2dDF857aFC8ccA364fF091462D607f1F37e9F',
        symbol: 'MiniSoccer',
    },
    {
        address: '0x1Bf7AedeC439D6BFE38f8f9b20CF3dc99e3571C4',
        symbol: 'TRONPAD',
    },
    {
        address: '0x1C2425F50a1e98D5631b223E56760d21BC840C53',
        symbol: '$tream',
    },
    {
        address: '0x1C64Fd4f55E1A3C1f737Dfa47ee5F97eaF413cf0',
        symbol: 'FOOT',
    },
    {
        address: '0x1c920610dB9A96c849003200Bd5Ff0687c2D5EC3',
        symbol: '1PLUS',
    },
    {
        address: '0x1cA23D55bc741366d010274553a8aeaAeFb0d583',
        symbol: 'CATGE',
    },
    {
        address: '0x1CbDdf83De068464Eba3a4E319bd3197a7EEa12c',
        symbol: 'LEAF',
    },
    {
        address: '0x1ccfbF151a8283a55b57742fc7060c4E6E3e1f6A',
        symbol: 'CINN',
    },
    {
        address: '0x1CE0c2827e2eF14D5C4f29a091d735A204794041',
        symbol: 'AVAX',
    },
    {
        address: '0x33A3d962955A3862C8093D1273344719f03cA17C',
        symbol: 'SPORE',
    },
    {
        address: '0x1cfD6813a59d7B90c41dd5990Ed99c3bf2Eb8F55',
        symbol: 'CORGIB',
    },
    {
        address: '0x1Cff458B364d0d328d4C9D59D10Be7d22d01953d',
        symbol: 'AUTO',
    },
    {
        address: '0x8C851d1a123Ff703BD1f9dabe631b69902Df5f97',
        symbol: 'BNX',
    },
    {
        address: '0x9D173E6c594f479B4d47001F8E6A95A7aDDa42bC',
        symbol: 'ZOON',
    },
    {
        address: '0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE',
        symbol: 'XRP',
    },
    {
        address: '0x2FFEE7b4DF74F7C6508A4Af4D6D91058dA5420D0',
        symbol: 'ChainCade',
    },
    {
        address: '0x1dd813524E0a0f4a36965F24D13bD8a37E51D848',
        symbol: 'GMYX',
    },
    {
        address: '0x1e446CbEa52BAdeB614FBe4Ab7610F737995fB44',
        symbol: 'SAT',
    },
    {
        address: '0x1F39Dd2Bf5A27e2D4ED691DCF933077371777CB0',
        symbol: 'Nora',
    },
    {
        address: '0x1f3Af095CDa17d63cad238358837321e95FC5915',
        symbol: 'MINT',
    },
    {
        address: '0x1f546aD641B56b86fD9dCEAc473d1C7a357276B7',
        symbol: 'PANTHER',
    },
    {
        address: '0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95',
        symbol: 'BANANA',
    },
    {
        address: '0x1F64fdAD335ED784898EFFb5ce22D54d8f432523',
        symbol: '10SET',
    },
    {
        address: '0x1Fa4a73a3F0133f0025378af00236f3aBDEE5D63',
        symbol: 'NEAR',
    },
    {
        address: '0x1fE34D34EC67Ef7020874A69A9dD1fB778CF9522',
        symbol: 'MONSTER',
    },
    {
        address: '0x1fEaf72DEBF7aFEF1E9643F02567584D574ffCC3',
        symbol: 'SOVIET',
    },
    {
        address: '0x2065E3BD318f155abE5Ad6aa263596f197112261',
        symbol: 'ULTGG',
    },
    {
        address: '0x2081a45c4B02D004673891Eb8D2E4e08c36DE7d2',
        symbol: 'EVF',
    },
    {
        address: '0x2095d2346e47Ed497d4F39FcfA59918b4346cd65',
        symbol: 'TCT',
    },
    {
        address: '0x20f663CEa80FaCE82ACDFA3aAE6862d246cE0333',
        symbol: 'DRIP',
    },
    {
        address: '0x212fE6ACbd2083BA0fd7c13Bc57100Ce8bf52e75',
        symbol: 'SFMS',
    },
    {
        address: '0x23e8a70534308a4AAF76fb8C32ec13d17a3BD89e',
        symbol: 'lUSD',
    },
    {
        address: '0x8076C74C5e3F5852037F31Ff0093Eeb8c8ADd8D3',
        symbol: 'SAFEMOON',
    },
    {
        address: '0x8597ba143AC509189E89aaB3BA28d661A5dD9830',
        symbol: 'VANCAT',
    },
    {
        address: '0x85EAC5Ac2F758618dFa09bDbe0cf174e7d574D5B',
        symbol: 'TRX',
    },
    {
        address: '0x9A624b4190F38c888BbF7F845f14198f9C951de7',
        symbol: 'ACE',
    },
    {
        address: '0xc3EAE9b061Aa0e1B9BD3436080Dc57D2d63FEdc1',
        symbol: 'BEAR',
    },
    {
        address: '0x2198B69B36B86F250549d26D69C5957912A34Ec2',
        symbol: 'MATE',
    },
    {
        address: '0x21a807b748423e5c37A914fb4Fb40850037DafDd',
        symbol: 'DAO',
    },
    {
        address: '0x4AAd6A01068c2621545d087A3c5281837112585b',
        symbol: '$TIME',
    },
    {
        address: '0x21EA8618b9168Eb8936c3e02F0809BBE901282ac',
        symbol: 'SPC',
    },
    {
        address: '0x22168882276e5D5e1da694343b41DD7726eeb288',
        symbol: 'WSB',
    },
    {
        address: '0x4c97c901B5147F8C1C7Ce3c5cF3eB83B44F244fE',
        symbol: 'MND',
    },
    {
        address: '0x225f687E4ca02c1724DEa91E518b63D4F9A25cdD',
        symbol: 'LDT',
    },
    {
        address: '0x2322AfAaC81697E770c19a58df587d8739777536',
        symbol: 'FAST',
    },
    {
        address: '0x232FB065D9d24c34708eeDbF03724f2e95ABE768',
        symbol: 'SHEESHA',
    },
    {
        address: '0xa9c41A46a6B3531d28d5c32F6633dd2fF05dFB90',
        symbol: 'WEX',
    },
    {
        address: '0x234A97aA8c9b64b69C8344BF2c59Dc3A5b1Ff2cE',
        symbol: 'VEGAS',
    },
    {
        address: '0xF4Ed363144981D3A65f42e7D0DC54FF9EEf559A1',
        symbol: 'FARA',
    },
    {
        address: '0x23EC58e45ac5313BCB6681F4f7827B8a8453AC45',
        symbol: 'ZEFU',
    },
    {
        address: '0x2406dCe4dA5aB125A18295f4fB9FD36a0f7879A2',
        symbol: 'CPD',
    },
    {
        address: '0x24A55346C17205F9561122C11F414d422E49cf75',
        symbol: 'BGame',
    },
    {
        address: '0x24D787e9B88Cb62D74e961C1C1d78E4ee47618E5',
        symbol: 'BPET',
    },
    {
        address: '0x250632378E573c6Be1AC2f97Fcdf00515d0Aa91B',
        symbol: 'BETH',
    },
    {
        address: '0x250b211EE44459dAd5Cd3bCa803dD6a7EcB5d46C',
        symbol: 'SWTH',
    },
    {
        address: '0x2541Be91fE0D220fFCbe65f11d88217a87A43bDA',
        symbol: '$Lordz',
    },
    {
        address: '0x25574Cad6F03FFacD9D08b288e8D5d88997fb2f3',
        symbol: 'REDFEG 🦍',
    },
    {
        address: '0x2571b3c14D3072b49a0fb9a2D89CD04Bd0032c9d',
        symbol: '$SWATER',
    },
    {
        address: '0x25a859Eb39F7570c14fB93939E4A40B0ecEea588',
        symbol: 'NFTMonLaunch ',
    },
    {
        address: '0x25b97cCE326A5B3674c5b269B8A1a04B818a56FA',
        symbol: 'BABYSAITAMA',
    },
    {
        address: '0x261510Dd6257494eEA1DDA7618DBe8a7b87870dd',
        symbol: 'HEROES',
    },
    {
        address: '0x261828B6e70bf05136DA9D0c8BC0FffdEeCF0aE3',
        symbol: 'YFI9',
    },
    {
        address: '0x26A4F25A411eF867972633E5FA410031D6346285',
        symbol: 'KODURO',
    },
    {
        address: '0x26Bb4102067B9308AECE87Fd914D76bBdACC8EeA',
        symbol: 'INTF2',
    },
    {
        address: '0x270388e0CA29CFd7C7E73903D9d933a23D1BAB39',
        symbol: 'TSX',
    },
    {
        address: '0x2722c9db0Fc6818DC9DD3A01254Afc3804438b64',
        symbol: 'YAG',
    },
    {
        address: '0x27340E737a5BeCBB66345D36Cf4Df6f0a95931D8',
        symbol: 'BSOCIAL',
    },
    {
        address: '0x279d3c484A58367d9b06eb21196ea05C1C84dFbc',
        symbol: 'BBC',
    },
    {
        address: '0x27A801ba58644D93A939daA506A56f95c351Eddc',
        symbol: 'LFC',
    },
    {
        address: '0x27Ae27110350B98d564b9A3eeD31bAeBc82d878d',
        symbol: 'CUMMIES',
    },
    {
        address: '0x27e89d357957cE332Ff442DB69F4b476401BbBc5',
        symbol: 'CARMA',
    },
    {
        address: '0x2802eb3a20f5892956D5B9528F6Bf13E648534DB',
        symbol: 'ODIN',
    },
    {
        address: '0x2859e4544C4bB03966803b044A93563Bd2D0DD4D',
        symbol: 'SHIB',
    },
    {
        address: '0x2881a6bD504E323f70159d032f89374222E40d22',
        symbol: 'CMC',
    },
    {
        address: '0x29324E48F6bA8AD2c5fe554a79f2e2c3D2eDc432',
        symbol: 'MTS',
    },
    {
        address: '0x297817CE1a8De777e7ddbed86C3B7f9Dc9349f2c',
        symbol: 'DUEL',
    },
    {
        address: '0x29b1E39A529d3B3cacEA55989594F71813e998Bb',
        symbol: 'DEXI',
    },
    {
        address: '0x2A17Dc11a1828725cdB318E0036ACF12727d27a2',
        symbol: 'ARENA',
    },
    {
        address: '0x2a2cD8b1F69EB9dda5d703b3498d97080C2F194F',
        symbol: 'CORIS',
    },
    {
        address: '0x2A77aeadE1e61d4ec6Bc8a3c7c9F89664546eF6B',
        symbol: 'MECA',
    },
    {
        address: '0x2A9718defF471f3Bb91FA0ECEAB14154F150a385',
        symbol: 'ElonGate',
    },
    {
        address: '0x96D67A9c5329F57384C7E7Bbb082A81475d2952F',
        symbol: 'ACE',
    },
    {
        address: '0x2B2fF80c489dad868318a19FD6F258889a026da5',
        symbol: 'DXT',
    },
    {
        address: '0x2b31b83D2a960d648e9c8d3B84dF5452c80aB947',
        symbol: 'SMD',
    },
    {
        address: '0x2B3F34e9D4b127797CE6244Ea341a83733ddd6E4',
        symbol: 'FLOKI',
    },
    {
        address: '0x39Ae8EEFB05138f418Bb27659c21632Dc1DDAb10',
        symbol: 'KAI',
    },
    {
        address: '0x86B3F23B6e90F5bbfac59b5b2661134Ef8Ffd255',
        symbol: 'DON',
    },
    {
        address: '0x2c4a33373FEaa97b9D75bD78Dfd9919aD4dAe6Da',
        symbol: 'WELB',
    },
    {
        address: '0x6AF2a7CA07dC6e234A1E3Fc4450b343ff994B1e6',
        symbol: 'WELB',
    },
    {
        address: '0x2cc970e45B359D24eE76B4902FB6E9F50375a8a6',
        symbol: 'ANM',
    },
    {
        address: '0x2cd2664Ce5639e46c6a3125257361e01d0213657',
        symbol: 'USELESS',
    },
    {
        address: '0x2d69c55baEcefC6ec815239DA0a985747B50Db6E',
        symbol: 'TFF',
    },
    {
        address: '0x2E21232c021C925b9b9e117a2024588300dbeCF0',
        symbol: 'Pipemoon',
    },
    {
        address: '0x2E291e1c9f85a86d0C58Ae15621aaC005a8b2EAD',
        symbol: 'ZEP',
    },
    {
        address: '0x2eD9a5C8C13b93955103B9a7C167B67Ef4d568a3',
        symbol: 'MASK',
    },
    {
        address: '0x2f053e33bd590830858161d42C67e9E8A9390019',
        symbol: 'VNT',
    },
    {
        address: '0x2f657932E65905eA09c7aacfe898bf79e207c1C0',
        symbol: 'ROBODOGE',
    },
    {
        address: '0x2FA5dAF6Fe0708fBD63b1A7D1592577284f52256',
        symbol: 'MARSH',
    },
    {
        address: '0x2Fb9376cFf6fb7f5fe99665aE1Ec2FdDD5099134',
        symbol: 'BCZZ',
    },
    {
        address: '0x3008eBba0131A6085Fcc230eF947ED8F8f12346F',
        symbol: 'CBN',
    },
    {
        address: '0x3051CFb958dcD408FBa70256073Adba943Fdf552',
        symbol: 'FOC',
    },
    {
        address: '0x309118620CCd4F5760CB2cC53a7479c1d7246400',
        symbol: 'NGMI',
    },
    {
        address: '0x31353E2826Cc4402735E55a175a75CE2569B4226',
        symbol: 'WOW',
    },
    {
        address: '0x3c1748D647E6A56B37B66fcD2B5626D0461D3aA0',
        symbol: 'DNXC',
    },
    {
        address: '0x4B0F1812e5Df2A09796481Ff14017e6005508003',
        symbol: 'TWT',
    },
    {
        address: '0x82030CDBD9e4B7c5bb0b811A61DA6360D69449cc',
        symbol: 'FEVR',
    },
    {
        address: '0xaF6Bd11A6F8f9c44b9D18f5FA116E403db599f8E',
        symbol: 'ALIX',
    },
    {
        address: '0xE1dfd41Fba67AB6e26a7072fA97508506093Ac01',
        symbol: 'CAKEPUNKS',
    },
    {
        address: '0xeE351682cDA9551F8EED6349F6237caB75F8c495',
        symbol: 'ELM',
    },
    {
        address: '0x31b9773f225408129a90788EF013Bd449e283865',
        symbol: 'PORN',
    },
    {
        address: '0x31Cc5AC39e2968c861830Ade3580318Bb815D633',
        symbol: 'SFUEL',
    },
    {
        address: '0x31d5e197fB1Fd648974cc9fEfdF1d58bD28fC90A',
        symbol: 'STR',
    },
    {
        address: '0x31F0Bc450C12eb62B4c617d4C876f7a66470Fcb3',
        symbol: 'FREEMOON',
    },
    {
        address: '0x3203c9E46cA618C8C1cE5dC67e7e9D75f5da2377',
        symbol: 'MBOX',
    },
    {
        address: '0x85c128eE1feEb39A59490c720A9C563554B51D33',
        symbol: 'KEY',
    },
    {
        address: '0xE338D4250A4d959F88Ff8789EaaE8c32700BD175',
        symbol: 'RELAY',
    },
    {
        address: '0x32089eafFaf278C82cda2c8d37e7b6b6faBBaAF2',
        symbol: 'SLF',
    },
    {
        address: '0x3220CCbbC29d727Bde85b7333D31b21e0d6bC6F4',
        symbol: 'PupDoge',
    },
    {
        address: '0x32299c93960bB583A43c2220Dc89152391A610c5',
        symbol: 'Kala',
    },
    {
        address: '0x3279510E89600ee1767a037DBD0aD49c974063AE',
        symbol: 'NFTBS',
    },
    {
        address: '0x330540a9d998442dcbc396165D3dDc5052077bB1',
        symbol: 'FLOKI',
    },
    {
        address: '0xacFC95585D80Ab62f67A14C566C1b7a49Fe91167',
        symbol: 'FEG',
    },
    {
        address: '0x3327D6E68830103d666467e5fd1153fEB062400B',
        symbol: 'Samoy',
    },
    {
        address: '0x337e35Ed5B38D5C7Ec9F8d7cF78fe7F43d7DEC6F',
        symbol: 'NOTSAFEMOON',
    },
    {
        address: '0x338196a509B4c66749c3f44c21C00501E6ACF7BC',
        symbol: 'DMusk',
    },
    {
        address: '0x338A09a17a7DA2E5c5a6B22344f3a49904224C79',
        symbol: 'FLOKIJR',
    },
    {
        address: '0x5D186E28934c6B0fF5Fc2feCE15D1F34f78cBd87',
        symbol: 'DUCK',
    },
    {
        address: '0xbbf33a3c83Cf86D0965A66E108669D272DFE4214',
        symbol: 'EiFI',
    },
    {
        address: '0x33A7e2e54317f8b5Cc1Ffe1C57b6198b68e3c7C9',
        symbol: 'VEGI',
    },
    {
        address: '0x34195FD824355aec1BDCeEA97697B35be691bcB3',
        symbol: 'BSCGold',
    },
    {
        address: '0x34Aa9099D924F3FB2377ff20D81b235311c15346',
        symbol: 'BLS',
    },
    {
        address: '0x34bA3af693d6c776d73C7fa67e2B2e79be8ef4ED',
        symbol: 'BALA',
    },
    {
        address: '0x35754E4650c8ab582F4e2Cb9225E77e6685be25A',
        symbol: 'CSM',
    },
    {
        address: '0x359f35085202C8527a0c767557339635A335Eb76',
        symbol: 'PITJUPITER',
    },
    {
        address: '0x362EccB1F150f47643E6Eec92a296F369D5EdbEf',
        symbol: 'NCE',
    },
    {
        address: '0x36DB129506fE81dA7Ce085648ff9C7a0D5e31ed2',
        symbol: 'SAFU',
    },
    {
        address: '0x3710cD84e0e331c99c70A34b8c6c136c2CDF91C4',
        symbol: 'OPS',
    },
    {
        address: '0x373e4b4E4D328927bc398A9B50e0082C6f91B7bb',
        symbol: 'END',
    },
    {
        address: '0x373E768f79c820aA441540d254dCA6d045c6d25b',
        symbol: 'DERC',
    },
    {
        address: '0x375483CfA7Fc18F6b455E005D835A8335FbdbB1f',
        symbol: 'ECP',
    },
    {
        address: '0x3757232B55E60da4A8793183aC030CfCE4c3865d',
        symbol: 'YDR',
    },
    {
        address: '0x376FbAC2FbA80239EcC98c48EdF6B372A9488b13',
        symbol: 'nDOGE',
    },
    {
        address: '0x37c4bcf0b8fC6f074be933Af7fb9D1DDe55f979C',
        symbol: 'Diamonds',
    },
    {
        address: '0x37dfACfaeDA801437Ff648A1559d73f4C40aAcb7',
        symbol: 'APYS',
    },
    {
        address: '0x380624A4a7e69dB1cA07deEcF764025FC224D056',
        symbol: 'SAFEBTC',
    },
    {
        address: '0x3916984fa787d89B648Ccd8d60B5ff07E0E8e4F4',
        symbol: 'PUBE',
    },
    {
        address: '0x397E6d4fd68A9E25e93fC712B8F72F826f48a8ff',
        symbol: 'DINGO',
    },
    {
        address: '0x3993a8f82F5e1a5381E678Fc237a3da668C1F4eB',
        symbol: 'UFF',
    },
    {
        address: '0x39A0dC2925BA0d17DD53F87D2dB8296a578957c6',
        symbol: 'FLOW',
    },
    {
        address: '0x3a06212763CAF64bf101DaA4b0cEbb0cD393fA1a',
        symbol: 'DLTA',
    },
    {
        address: '0x3a3AEf78886eD842e6E14626D54173E0d8f898fd',
        symbol: 'WAR',
    },
    {
        address: '0x3a6e8B36645D6c252714dadDD28eC0673535a109',
        symbol: '2CRZ',
    },
    {
        address: '0x3ADAf802a99D8A6C0B83F4Db5953764E00163100',
        symbol: 'BCM',
    },
    {
        address: '0x3aDd729f1d6C85eC6ec005205dDa9C4e7C10289f',
        symbol: 'PM',
    },
    {
        address: '0x3AefF4E27E1F9144eD75Ba65a80BdfEE345F413e',
        symbol: 'BUMN',
    },
    {
        address: '0x3B78458981eB7260d1f781cb8be2CaAC7027DbE2',
        symbol: 'LZ',
    },
    {
        address: '0x3b831d36ed418e893F42d46ff308C326C239429f',
        symbol: 'Tcake',
    },
    {
        address: '0x3be9DCC46bb27423a813b900611911aC08aa4fC0',
        symbol: 'PETS',
    },
    {
        address: '0x3C00F8FCc8791fa78DAA4A480095Ec7D475781e2',
        symbol: 'SAFESTAR',
    },
    {
        address: '0x3c2C8FC79d37C97cF41d0a2E0a4C89953E49cc4e',
        symbol: 'EURO',
    },
    {
        address: '0x3c730718C97A77562866B5D29B33228c019eAC68',
        symbol: 'BNBD',
    },
    {
        address: '0x3Ce9f4E83eC642e6aE25169061120d4d157256ef',
        symbol: 'ROMEODOGE',
    },
    {
        address: '0x3D29Aa78fB558F84112bbC48a84F371147A920C9',
        symbol: 'Dogefather',
    },
    {
        address: '0xc22e8114818A918260662375450e19aC73D32852',
        symbol: 'KCAKE',
    },
    {
        address: '0x3D4a903C771F8D85930744871EA6A5319af4FCa5',
        symbol: 'GD',
    },
    {
        address: '0x3dE0a68721BC846E950438071F6AFc1faA42EF3E',
        symbol: 'BabyLondon',
    },
    {
        address: '0x3e07a8a8f260edeeca24139B6767A073918E8674',
        symbol: 'CATGE',
    },
    {
        address: '0x3e2Db0c47bB8BEED75480762A86b56Ad30E8dC4C',
        symbol: 'GC',
    },
    {
        address: '0x3e4be9879B1a2b50827ce7dE78C96D59C1d7748F',
        symbol: 'ULTIC',
    },
    {
        address: '0x3e6C9eE69B90B53628051F8D6CB5b6b2EaCCB438',
        symbol: 'MULTI',
    },
    {
        address: '0x3e900195B93423b8E7bdDD63d1d51c02fD18CCdf',
        symbol: 'LIC',
    },
    {
        address: '0x5A68431398A6DE785994441e206259702e259C5E',
        symbol: 'REUM',
    },
    {
        address: '0x67d66e8Ec1Fd25d98B3Ccd3B19B7dc4b4b7fC493',
        symbol: 'FEED',
    },
    {
        address: '0x8a4840dc5975E424EC530ec88a8f27910a3CEF51',
        symbol: '4STC',
    },
    {
        address: '0xa395C88320bcDF825BADEae7E1470211a92CFE71',
        symbol: '$KTADA',
    },
    {
        address: '0xc029A12e4A002c6858878FD9D3cc74E227cc2DDa',
        symbol: 'VEX',
    },
    {
        address: '0x3Ef99822759A2192e7A82f64484e79e89cd90d52',
        symbol: 'TKB',
    },
    {
        address: '0x3F35A88ea8B69bF52210B3DB64c254DB34d9d6d8',
        symbol: 'MBASKETBALL',
    },
    {
        address: '0x3f3608a1896c0D29c95dF5B3F2bB549b755A5674',
        symbol: 'BISWAP',
    },
    {
        address: '0x899313832DAF1929007d16067812feBBA28Dd3CC',
        symbol: 'TBT',
    },
    {
        address: '0x78A18Db278F9c7c9657F61dA519e6Ef43794DD5D',
        symbol: 'SPI',
    },
    {
        address: '0x8519EA49c997f50cefFa444d240fB655e89248Aa',
        symbol: 'RAMP',
    },
    {
        address: '0x3fd5B5746315E3F8d43A46b09c826a001EBb977d',
        symbol: 'OXB',
    },
    {
        address: '0x40B165Fd5dDc75ad0bDDc9ADd0adAbff5431a975',
        symbol: 'MEMES',
    },
    {
        address: '0x410319197d3394652B7ddDc669E58fbe30B56090',
        symbol: 'CTF',
    },
    {
        address: '0x418236CA7c807Cfc1D04eB64475df7cE17C2F218',
        symbol: 'DDC',
    },
    {
        address: '0x42069C0CF4DA25420fC4C9d9001ba5af7846CCfd',
        symbol: 'GUH',
    },
    {
        address: '0x4211959585C8F18B06dab8B5bB0Bc825cad4c1De',
        symbol: 'LZP',
    },
    {
        address: '0x42712dF5009c20fee340B245b510c0395896cF6e',
        symbol: 'DFT',
    },
    {
        address: '0x42F6f551ae042cBe50C739158b4f0CAC0Edb9096',
        symbol: 'NRV',
    },
    {
        address: '0x430374D961450a7dCe3a47Eb3D3C26ed9C965eC0',
        symbol: 'SPE',
    },
    {
        address: '0x431e0cD023a32532BF3969CddFc002c00E98429d',
        symbol: 'XCAD',
    },
    {
        address: '0x432eF8b023aABA3c42Ca540D32351c5b1a869CF7',
        symbol: '$NFTQR',
    },
    {
        address: '0x436231D285Ad1A9E02131C603eC4530b6c4ec6e1',
        symbol: 'BDR',
    },
    {
        address: '0x436C52A8ceE41D5e9c5E6f4Cb146e66D552Fb700',
        symbol: 'EQX',
    },
    {
        address: '0x43FFFb14dB56bFD6432e7AcaAdff697121861F96',
        symbol: 'FLRS',
    },
    {
        address: '0x44754455564474A89358B2C2265883DF993b12F0',
        symbol: 'ZEE',
    },
    {
        address: '0x4495a7942155B04948d9fEA4EE57E4d228742442',
        symbol: 'ZKN',
    },
    {
        address: '0x4518231a8FDF6ac553B9BBD51Bbb86825B583263',
        symbol: 'MLT',
    },
    {
        address: '0x452698Acacc695cEcA215B5e43525f6C36f240D3',
        symbol: 'MAGO',
    },
    {
        address: '0x4556A6f454f15C4cD57167a62bdA65A6be325D1F',
        symbol: 'FAM',
    },
    {
        address: '0x45b41bf48Eb20466737B4605393734E9165D4B98',
        symbol: 'REDDOGE',
    },
    {
        address: '0x464863745ED3aF8b9f8871f1082211C55f8f884D',
        symbol: 'CTT',
    },
    {
        address: '0x46880afc2E6FA41bBbE9787c082f7c23F795465E',
        symbol: 'BMARS',
    },
    {
        address: '0x8D58a9254a84275C5449589527a5DDF85FFF6d6D',
        symbol: 'HRB',
    },
    {
        address: '0x4691937a7508860F876c9c0a2a617E7d9E945D4B',
        symbol: 'WOO',
    },
    {
        address: '0x4695e4dD1E3011045573f6E16Dc162687cdBAc44',
        symbol: 'METAGON',
    },
    {
        address: '0x46D502Fac9aEA7c5bC7B13C8Ec9D02378C33D36F',
        symbol: 'WSPP',
    },
    {
        address: '0x473Eb9Bd02Ad444D7E686FAB384afC476cC337B8',
        symbol: 'LTFM',
    },
    {
        address: '0x474021845C4643113458ea4414bdb7fB74A01A77',
        symbol: 'UNO',
    },
    {
        address: '0xAAA7A10a8ee237ea61E8AC46C50A8Db8bCC1baaa',
        symbol: 'QANX',
    },
    {
        address: '0x47b8806C2891c4a92b5c590C32CFE1Eb617648EF',
        symbol: 'KCLP',
    },
    {
        address: '0x47BEAd2563dCBf3bF2c9407fEa4dC236fAbA485A',
        symbol: 'SXP',
    },
    {
        address: '0x47fA20ba81333BA507d687913bAF7c89432182A1',
        symbol: 'Bzzone',
    },
    {
        address: '0x4823A096382f4Fa583b55d563afb9F9a58C72FC0',
        symbol: 'ABIC',
    },
    {
        address: '0x487770734490Ac571Cda3Bc06067048EcC5cAa4e',
        symbol: 'Cherry',
    },
    {
        address: '0x492793a9ed1aC780cBd6b56C930461BC3c568F47',
        symbol: 'FOLK',
    },
    {
        address: '0x49324d59327fB799813B902dB55b2a118d601547',
        symbol: 'BOSS',
    },
    {
        address: '0x493676fC6B47c87361a3b85A8c18B051E810f37D',
        symbol: 'FIDO',
    },
    {
        address: '0x49dB551fa3d8DE954b8611bA8844500862F05A68',
        symbol: 'YURI',
    },
    {
        address: '0x4a080377f83D669D7bB83B3184a8A5E61B500608',
        symbol: 'XEND',
    },
    {
        address: '0x4A713eE4DeB88a8C2ABD77afEd415201Edb6F1fa',
        symbol: 'CUMSTAR',
    },
    {
        address: '0x4a72AF9609d22Bf2fF227AEC333c7d0860f3dB36',
        symbol: 'NFTPAD',
    },
    {
        address: '0x4A824eE819955A7D769e03fe36f9E0C3Bd3Aa60b',
        symbol: 'KABOSU',
    },
    {
        address: '0x4aAf2f7afE2fa80c664bDde4dc9E4426EbBDdbB4',
        symbol: 'BDKYC',
    },
    {
        address: '0x4AFc8c2Be6a0783ea16E16066fde140d15979296',
        symbol: 'HARE',
    },
    {
        address: '0x4BA0057f784858a48fe351445C672FF2a3d43515',
        symbol: 'KALM',
    },
    {
        address: '0xCed0CE92F4bdC3c2201E255FAF12f05cf8206dA8',
        symbol: 'ORK',
    },
    {
        address: '0x4bC6e19eE0f1E034a927990C76b418c2A95e326F',
        symbol: 'SEED',
    },
    {
        address: '0xdbA266E5298862c7c4301a5959fA72d47cdEf9E9',
        symbol: 'PKK',
    },
    {
        address: '0x4BD17003473389A42DAF6a0a729f6Fdb328BbBd7',
        symbol: 'VAI',
    },
    {
        address: '0x4c0415A6e340eCCebff58131799C6c4127cc39FA',
        symbol: 'XDOGE',
    },
    {
        address: '0x16030Ed3C8b9D7ecf741AaBde04B6dC6630e12cb',
        symbol: 'ZGoat',
    },
    {
        address: '0xC9849E6fdB743d08fAeE3E34dd2D1bc69EA11a51',
        symbol: 'BUNNY',
    },
    {
        address: '0x4cbdfad03b968bF43449D0908f319Ae4A5A33371',
        symbol: 'ECOIN',
    },
    {
        address: '0x4cDa4daAd72340B28925cCd6fA78db631267D3C4',
        symbol: 'BabyDogeCash',
    },
    {
        address: '0x4d54F4Fb30F927a96c75E2fD7923Df6e3F042679',
        symbol: 'SHIBACOLA',
    },
    {
        address: '0x4D5eCA1e4FE912904544043feCEB6858DDd3d866',
        symbol: 'MAD',
    },
    {
        address: '0x6679eB24F59dFe111864AEc72B443d1Da666B360',
        symbol: 'ARV',
    },
    {
        address: '0x4D8C829c02585AA62D2bBAF562099bF749637580',
        symbol: 'India',
    },
    {
        address: '0x4D91CBE7881a141806B15803762574d2D1AACeb0',
        symbol: 'CLPAD',
    },
    {
        address: '0x4Dc7c9148A1F495872A5b31CF459ac7989cDCE79',
        symbol: 'APPLEB',
    },
    {
        address: '0x4ddba615a7F6ee612d3a23C6882B698dFBbef7E7',
        symbol: 'SHIR',
    },
    {
        address: '0x4e6415a5727ea08aAE4580057187923aeC331227',
        symbol: 'FINE',
    },
    {
        address: '0x4e9C93b621DA8ACd75B21B7572E4e785deCe8A44',
        symbol: 'OGA',
    },
    {
        address: '0x4eD1d7f6DE6652c8104891C9E8e4Ca12076d8408',
        symbol: 'WOB',
    },
    {
        address: '0x4eE438be38F8682ABB089F2BFeA48851C5E71EAF',
        symbol: 'YAE',
    },
    {
        address: '0x4Efab39b14167Da54aebed2094a61aA1FD384056',
        symbol: 'LEOPARD',
    },
    {
        address: '0x4F7B627b88651e3DddcA0240bcA68a3062632C8c',
        symbol: 'BYG',
    },
    {
        address: '0x4FA7163E153419E0E1064e418dd7A99314Ed27b6',
        symbol: 'HOTCROSS',
    },
    {
        address: '0x5020F345679a1951e1CC6A2A9000418965103a01',
        symbol: 'KUKA',
    },
    {
        address: '0x50332bdca94673F33401776365b66CC4e81aC81d',
        symbol: 'CCAR',
    },
    {
        address: '0x503464B0F3b4074cde40D532419cE0a779538fBf',
        symbol: 'LG',
    },
    {
        address: '0x5066C68cAe3B9BdaCD6A1A37c90F2d1723559D18',
        symbol: 'WIZARD',
    },
    {
        address: '0x5067c6e9E6c443372f2E62946273ABbF3Cc2f2B3',
        symbol: 'FIBO',
    },
    {
        address: '0x50fFF08D9AE671A95cB8a4CD695A5Fb2Db086E79',
        symbol: 'DES',
    },
    {
        address: '0x518445F0dB93863E5e93A7F70617c05AFa8048f1',
        symbol: 'BITT',
    },
    {
        address: '0x51F35073FF7cF54c9e86b7042E59A8cC9709FC46',
        symbol: 'ETNA',
    },
    {
        address: '0x52171FFA4ceDa60ff9795e1F111adB14c3d7025e',
        symbol: 'UTC',
    },
    {
        address: '0x52377Bd73BE79DB90324F1A951A13A02e640B57a',
        symbol: 'FBDOG',
    },
    {
        address: '0x525e56E9764CbE2c9aBc4D13FF318d94f62bBfcF',
        symbol: 'DHBNB',
    },
    {
        address: '0x52D88a9a2a20A840d7A336D21e427E9aD093dEEA',
        symbol: 'HUSKY',
    },
    {
        address: '0xe990B1B75C3C374BB1Fbd03faF20B5AFb6B525DA',
        symbol: 'FIT',
    },
    {
        address: '0x534E99ff924038eB4a3aa7fac791D1eF8BB08b37',
        symbol: 'TITS',
    },
    {
        address: '0x5392Ff4a9BD006DC272C1855af6640e17Cc5ec0B',
        symbol: 'SFEX',
    },
    {
        address: '0x53dcD4eF8E21FE014594a0854c4271a0623B31eC',
        symbol: 'X2P',
    },
    {
        address: '0x53E562b9B7E5E94b81f10e96Ee70Ad06df3D2657',
        symbol: 'BABY',
    },
    {
        address: '0xe0cA4724Bc8B97B259d25596ee3CfAb816629baD',
        symbol: 'EROS',
    },
    {
        address: '0x54277015F08531d4D670eD1b2819F8Ec4B834ABb',
        symbol: 'sushiDOGE',
    },
    {
        address: '0x545f90dC35CA1e6129f1fEd354b3e2DF12034261',
        symbol: 'NEWB',
    },
    {
        address: '0x54D0a5010D09AaBC1f429A159d1931007f4c7a6b',
        symbol: 'PYRO',
    },
    {
        address: '0x5546600f77EdA1DCF2e8817eF4D617382E7f71F5',
        symbol: 'PING',
    },
    {
        address: '0x55671114d774ee99D653D6C12460c780a67f1D18',
        symbol: 'PACOCA',
    },
    {
        address: '0x557233E794d1a5FbCc6D26dca49147379ea5073c',
        symbol: 'ALI',
    },
    {
        address: '0x0000000000004946c0e9F43F4Dee607b0eF1fA1c',
        symbol: 'CHI',
    },
    {
        address: '0x018F49822d593f88843777e0956Af74C87012219',
        symbol: 'DNF',
    },
    {
        address: '0x0391bE54E72F7e001f6BBc331777710b4f2999Ef',
        symbol: 'TRAVA',
    },
    {
        address: '0x0Cc14bC2aa9770BceF3A11d27fbFA2aD2b797BDC',
        symbol: 'AXIESWAP',
    },
    {
        address: '0x0d57C3E2be4C0d2093D2a11A116825f701392492',
        symbol: 'KDCAKE',
    },
    {
        address: '0x18359CF655A444204e46F286eDC445C9D30fFc54',
        symbol: 'DGMOON',
    },
    {
        address: '0x23125108bc4c63E4677b2E253Fa498cCb4B3298b',
        symbol: 'DOGECOIN',
    },
    {
        address: '0x35DE111558F691F77f791fb0c08b2D6B931A9d47',
        symbol: 'bCHAIN',
    },
    {
        address: '0x3b198e26E473b8faB2085b37978e36c9DE5D7f68',
        symbol: 'TIME',
    },
    {
        address: '0x3DAB450ee6451762E72647A05a205dd5697c5C2c',
        symbol: 'FSHIB',
    },
    {
        address: '0x40C3318040739d459C09aA6D32554867B358BdF5',
        symbol: 'KAI',
    },
    {
        address: '0x446320C9FfA57030ca977A1f90F8049DF4004647',
        symbol: 'BUDG',
    },
    {
        address: '0x451b5d1B2c5d2BCAEFdeF11f5D2AFa169a162610',
        symbol: 'HPTL',
    },
    {
        address: '0x46d0DAc0926fa16707042CAdC23F1EB4141fe86B',
        symbol: 'SNM',
    },
    {
        address: '0x50F525be99D4c4b48d75169817C065301ecDcEfb',
        symbol: 'PowerDoge',
    },
    {
        address: '0x587C16b84c64751760f6e3e7e32F896634704352',
        symbol: 'WHALE',
    },
    {
        address: '0x5A3010d4d8D3B5fB49f8B6E57FB9E48063f16700',
        symbol: 'BSCPAD',
    },
    {
        address: '0x5aa8fEFe03c5D2875470927818C5863189008e43',
        symbol: 'CAX',
    },
    {
        address: '0x5b4963B964bAc5C2Db83e53ffFe46E0cb83a1346',
        symbol: 'KITTY',
    },
    {
        address: '0x5CA42204cDaa70d5c773946e69dE942b85CA6706',
        symbol: 'POSI',
    },
    {
        address: '0x630d98424eFe0Ea27fB1b3Ab7741907DFFEaAd78',
        symbol: 'PEAK',
    },
    {
        address: '0x6519cb1F694CcBCc72417570b364F2D051EEfb9d',
        symbol: 'NLC',
    },
    {
        address: '0x65Fc381dF3D6d84De6f4A39705696d3aEf233245',
        symbol: 'MCU',
    },
    {
        address: '0x66D6286a09Ed05285643e08756d2Fc9dE6b5A33a',
        symbol: 'STO',
    },
    {
        address: '0x678e5f70b6b582dfADB3dBD68AF17801d34555c5',
        symbol: 'REVO',
    },
    {
        address: '0x681fd3e49a6188Fc526784eE70AA1C269ee2B887',
        symbol: 'FLy',
    },
    {
        address: '0x6a0b045Ea1cbC87946eE6ca4D118dC0B5c152455',
        symbol: 'XP',
    },
    {
        address: '0x6a6Ccf15B38DA4b5B0eF4C8fe9FefCB472A893F9',
        symbol: 'MNST',
    },
    {
        address: '0x6b236E2DDaA235256Cd7e3FECbfd940C5287dBDa',
        symbol: 'DRM',
    },
    {
        address: '0x6DDB07fB0824748AC197F9D4d157B0689Bc08Add',
        symbol: 'FRE',
    },
    {
        address: '0x6F14A18B4543A4D6779eCc5E23a6198E9fAA7Fc0',
        symbol: 'FPH',
    },
    {
        address: '0x716Ba6938756aB83996688444e5Bc284c4e7B4F0',
        symbol: 'CIC',
    },
    {
        address: '0x752d37d89CCd119f85a5607b01942d487A1dC1ce',
        symbol: 'MIST',
    },
    {
        address: '0x755f34709E369D37C6Fa52808aE84A32007d1155',
        symbol: 'NABOX',
    },
    {
        address: '0x758d08864fB6cCE3062667225ca10b8F00496cc2',
        symbol: 'NAOS',
    },
    {
        address: '0x758FB037A375F17c7e195CC634D77dA4F554255B',
        symbol: 'DVI',
    },
    {
        address: '0x793cEa0F1003411396b3A81A77d92Fe37015E7A9',
        symbol: 'CBC',
    },
    {
        address: '0x7ce98877ae066a6561e159906b69166311Fa55a9',
        symbol: 'TMT',
    },
    {
        address: '0x808f1350dff684C099F4837A01D863fC61A86BC6',
        symbol: 'MFI',
    },
    {
        address: '0x81247272074e9133Cc89c37c3bCaEBb49B64Ebff',
        symbol: 'VPX',
    },
    {
        address: '0x81A35171E52cDF6da8784AE02EBA30F0B74Cba21',
        symbol: 'DPLUS',
    },
    {
        address: '0x82A479264B36104be4FDb91618a59A4fC0F50650',
        symbol: 'BIRB',
    },
    {
        address: '0x833F307aC507D47309fD8CDD1F835BeF8D702a93',
        symbol: 'REVV',
    },
    {
        address: '0x8379B36826675450c35e1eb45d2fd1E1aE8494A4',
        symbol: 'ALKOM',
    },
    {
        address: '0x8595F9dA7b868b1822194fAEd312235E43007b49',
        symbol: 'BTT',
    },
    {
        address: '0x87A2d9a9A6b2D61B2a57798f1b4b2DDd19458Fb6',
        symbol: 'KDG',
    },
    {
        address: '0x89671544190eE39E469C8393009875dF6565457a',
        symbol: 'GRIMEX',
    },
    {
        address: '0x9133049Fb1FdDC110c92BF5b7Df635abB70C89DC',
        symbol: 'PINK',
    },
    {
        address: '0x932D851Cc084a37d03393C198723d0Be465BBF00',
        symbol: '牛魔王',
    },
    {
        address: '0x95b37684Bb2f21662b2E9d3732c7a301c1a41445',
        symbol: 'CCG',
    },
    {
        address: '0x97c6825e6911578A515B11e25B552Ecd5fE58dbA',
        symbol: 'BM',
    },
    {
        address: '0x999AEb6D778b3883C88eBC502B16A5395d011462',
        symbol: 'EBIRD',
    },
    {
        address: '0x9a946c3Cb16c08334b69aE249690C236Ebd5583E',
        symbol: 'xBLZD',
    },
    {
        address: '0x9C0C8156b268A4432191A282BdF4287019526cCe',
        symbol: 'CRYPT',
    },
    {
        address: '0x9c541bE9bd7933D60Abb2E13720B9D06A66ba5b3',
        symbol: 'LG',
    },
    {
        address: '0x9d70a3EE3079A6FA2bB16591414678b7Ad91f0b5',
        symbol: 'MEPAD',
    },
    {
        address: '0x9E24415d1e549EBc626a13a482Bb117a2B43e9CF',
        symbol: 'LOVELY',
    },
    {
        address: '0x9E993671976a5AC51bBfB3Db9E34eAC8d518fe82',
        symbol: 'KODA',
    },
    {
        address: '0x9Fa8F2418b35B7ac487604DDD00229d97f005599',
        symbol: 'NIP',
    },
    {
        address: '0xa123aB52a32267Dc357B7599739d3C6CAF856fe4',
        symbol: 'AIR',
    },
    {
        address: '0xA19B7a43455FF84369642E21cAbA62Ef3bC4c950',
        symbol: 'DOM',
    },
    {
        address: '0xA2120b9e674d3fC3875f415A7DF52e382F141225',
        symbol: 'ATA',
    },
    {
        address: '0xA4Faa13fb2492f5f137669978e3Fb62c046ADffC',
        symbol: 'MLION',
    },
    {
        address: '0xa54A5e77B126B0E920AF521133e0FF3E735B6Fa0',
        symbol: 'PAWZ',
    },
    {
        address: '0xA58950F05FeA2277d2608748412bf9F802eA4901',
        symbol: 'WSG',
    },
    {
        address: '0xa5AC316d3092BCE1453103d69Fc62929D82Ed0aA',
        symbol: 'ULTIMANCY',
    },
    {
        address: '0xA8c2B8eec3d368C0253ad3dae65a5F2BBB89c929',
        symbol: 'CTK',
    },
    {
        address: '0xac0C7d9B063eD2C0946982dDB378e03886C064E6',
        symbol: 'TREAT',
    },
    {
        address: '0xACB8f52DC63BB752a51186D1c55868ADbFfEe9C1',
        symbol: 'BP',
    },
    {
        address: '0xB09FE1613fE03E7361319d2a43eDc17422f36B09',
        symbol: 'BOG',
    },
    {
        address: '0xB26F540B3bf89C60409F96730F5D7dfD849d79Ef',
        symbol: 'DM5',
    },
    {
        address: '0xb3a6381070B1a15169DEA646166EC0699fDAeA79',
        symbol: 'Gold',
    },
    {
        address: '0xb7148ae5745F4753673511b1315D6089e64d83d1',
        symbol: 'CTH',
    },
    {
        address: '0xbA2aE424d960c26247Dd6c32edC70B295c744C43',
        symbol: 'DOGE',
    },
    {
        address: '0xBb238FcE6E2eE90781cD160C9C6eAf3a4CfAD801',
        symbol: 'BAGEL',
    },
    {
        address: '0xBB8f075b11c9298F6f702DFEB3CBc8EA1499e4f6',
        symbol: 'WINNER',
    },
    {
        address: '0xBbEB90cFb6FAFa1F69AA130B7341089AbeEF5811',
        symbol: 'UBXT',
    },
    {
        address: '0xbc194e6f748a222754C3E8b9946922c09E7d4e91',
        symbol: 'LEV',
    },
    {
        address: '0xbCC60f96eAaFc409bd914F6890e8Dd0A6Cf3234f',
        symbol: 'ROW',
    },
    {
        address: '0xbe6EeF2027Bd9C7De56bbe10c12cA77dCf856c2c',
        symbol: 'SPK',
    },
    {
        address: '0xC14dF1E2fFf3708816495e7364Ff274aCEEcAd91',
        symbol: 'N1CE',
    },
    {
        address: '0xC5a498FbBFD5F88cB7e86A7b54485Fc9697fD2Af',
        symbol: 'CFA',
    },
    {
        address: '0xC8581870Db5305B2c14588E7E58484086CC3eD4F',
        symbol: 'SITX',
    },
    {
        address: '0xC9CcBeF28e3d7F06C3799d3935698E779d62f829',
        symbol: 'mapkt.com',
    },
    {
        address: '0xCE262761DF57c72999146b7A6a752da03835db4a',
        symbol: 'MU',
    },
    {
        address: '0xCe5814eFfF15D53EFd8025B9F2006D4d7D640b9B',
        symbol: 'MOONSTAR',
    },
    {
        address: '0xcf425F0688D848c04B4F8B4B2A1a82208bDE885a',
        symbol: 'ROFI',
    },
    {
        address: '0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63',
        symbol: 'XVS',
    },
    {
        address: '0xd15C444F1199Ae72795eba15E8C1db44E47abF62',
        symbol: 'TENFI',
    },
    {
        address: '0xd1D52246271ed5a7403c543ceea3344E39A8af29',
        symbol: 'ADAMini',
    },
    {
        address: '0xd2366E92B5133a4C99669745061Ee70f42a499e5',
        symbol: 'LMX',
    },
    {
        address: '0xd32af8BeE4095A84e258a82B512356dFC0A7D2C0',
        symbol: 'GNFT',
    },
    {
        address: '0xd3BEdFa48a6182dDd80a294129ccD90086F09Fe2',
        symbol: 'SOROS',
    },
    {
        address: '0xD40bEDb44C081D2935eebA6eF5a3c8A31A1bBE13',
        symbol: 'HERO',
    },
    {
        address: '0xd944f1D1e9d5f9Bb90b62f9D45e447D989580782',
        symbol: 'IOTA',
    },
    {
        address: '0xdb607c61Aaa2a954Bf1f9d117953F12d6c319E15',
        symbol: '$HONEY',
    },
    {
        address: '0xde3dbBE30cfa9F437b293294d1fD64B26045C71A',
        symbol: 'NFTB',
    },
    {
        address: '0xe44EFa09A8001A4ff58B9dC1E5F61d0Dd2B16D27',
        symbol: 'DES',
    },
    {
        address: '0xE6FFa2e574a8BBEb5243D2109b6B11D4a459F88B',
        symbol: 'HIP',
    },
    {
        address: '0xE8176d414560cFE1Bf82Fd73B986823B89E4F545',
        symbol: 'HERO',
    },
    {
        address: '0xeAc534DD0D93dd6E17E12B1d9d635ab5548C81d3',
        symbol: 'BNFT',
    },
    {
        address: '0xECa41281c24451168a37211F0bc2b8645AF45092',
        symbol: 'TPT',
    },
    {
        address: '0xeE957bbdFfb3Dfd97615E254Abcf223A49Ddd15b',
        symbol: 'GTL',
    },
    {
        address: '0xEECF92Bf5e8f96E174510e9CD2B2a857AA039460',
        symbol: 'DCS',
    },
    {
        address: '0xF7D2b88Cdfcc3a12452c76Be7455fe1FA7f48852',
        symbol: 'XP',
    },
    {
        address: '0xf9A3FdA781c94942760860fc731c24301c83830A',
        symbol: 'RAPTOR',
    },
    {
        address: '0xF9C948B08D4c707b400C57895aC0a0f9F7125Eaf',
        symbol: 'MION',
    },
    {
        address: '0xf9E35Dd8bc0D426A6342FA07c399BF78F3De5974',
        symbol: 'WMBT',
    },
    {
        address: '0xFa17b330bCC4e7F3E2456996d89A5a54AB044831',
        symbol: '$CRDN',
    },
    {
        address: '0xFcf5CE4Cf9Ff693d931BA24fE396e578f9c1023a',
        symbol: 'SBFMOON',
    },
    {
        address: '0xfD0507faC1152faF870C778ff6beb1cA3B9f7A1F',
        symbol: 'BUST',
    },
    {
        address: '0x5621b5A3f4a8008c4CCDd1b942B121c8B1944F1f',
        symbol: 'XED',
    },
    {
        address: '0x4A5a34212404f30C5aB7eB61b078fA4A55AdC5a5',
        symbol: 'MILK2',
    },
    {
        address: '0x565b72163f17849832A692A3c5928cc502f46D69',
        symbol: 'HUNNY',
    },
    {
        address: '0x56b6fB708fC5732DEC1Afc8D8556423A2EDcCbD6',
        symbol: 'EOS',
    },
    {
        address: '0x57022eDD5C7Ed7b6bd870488853Fe961dfDD3fB6',
        symbol: 'PLX',
    },
    {
        address: '0x577c12a99D1a3283e527e42006609b27FB06D328',
        symbol: 'ManhattanCake',
    },
    {
        address: '0x5941f87EB62737eC5EBbECab3e373c40fe40566B',
        symbol: 'MNG',
    },
    {
        address: '0x59e68D828ebFccBca51A8223F6A69CcBA03b250f',
        symbol: 'NETH',
    },
    {
        address: '0x7dDEE176F665cD201F93eEDE625770E2fD911990',
        symbol: 'GALA',
    },
    {
        address: '0x5A41F637C3f7553dBa6dDC2D3cA92641096577ea',
        symbol: 'JulD',
    },
    {
        address: '0x5Ac52EE5b2a633895292Ff6d8A89bB9190451587',
        symbol: 'BSCX',
    },
    {
        address: '0x5b1BaeC64aF6dC54E6e04349315919129A6d3c23',
        symbol: 'DXCT',
    },
    {
        address: '0x5B5214c6110a2B538C2541998b243ec1CC517E24',
        symbol: 'AoE',
    },
    {
        address: '0x5b6AfBd5184638c9c49C485c3DE5ED56269ba6Cb',
        symbol: 'AUR',
    },
    {
        address: '0x5b6eF1f87D5cEc1e8508ddB5De7E895869e7A4A3',
        symbol: 'CROSS',
    },
    {
        address: '0x5B9dbeBbad94b8C6467Af9e8A851Bb120F9601c6',
        symbol: 'SLTH',
    },
    {
        address: '0x5Bb98444eFf7E0Bfe0506b6120cbD080ceB01553',
        symbol: 'HOD',
    },
    {
        address: '0x5c46c55A699A6359E451B2c99344138420c87261',
        symbol: 'iBG',
    },
    {
        address: '0x5C501ceB257700FcCd33c53FeEc9f96EDa583Dd7',
        symbol: 'TRAVEL',
    },
    {
        address: '0x5CeD26185f82B07E1516d0B013c54CcBD252A4Ad',
        symbol: 'PEACH',
    },
    {
        address: '0x5d3AfBA1924aD748776E4Ca62213BF7acf39d773',
        symbol: 'KGO',
    },
    {
        address: '0x5dd1E31E1a0e2E077aC98d2a4b781F418ca50387',
        symbol: 'ZLW',
    },
    {
        address: '0x5DE2bA7e985D8B7F6dFe547cb20A1f40884308fe',
        symbol: 'GREEN',
    },
    {
        address: '0x5de3939b2F811A61d830E6F52d13B066881412ab',
        symbol: 'XPR',
    },
    {
        address: '0x5dfA283c703Eaa927028c4702718012f1D75ECA2',
        symbol: 'Goku',
    },
    {
        address: '0x5E0B09b04d6990E76DFE9BF84552a940FD0BE05E',
        symbol: 'REX',
    },
    {
        address: '0x5e90253fbae4Dab78aa351f4E6fed08A64AB5590',
        symbol: 'BONFIRE',
    },
    {
        address: '0x5Ec3AdBDae549Dce842e24480Eb2434769e22B2E',
        symbol: 'CVP',
    },
    {
        address: '0x5EEF8c4320e2Bf8D1e6231A31500FD7a87D02985',
        symbol: 'FOMO',
    },
    {
        address: '0x5F00052b8c81a799b4f3bbC9eA2A1b7Ecd06fba6',
        symbol: 'SOLAR',
    },
    {
        address: '0x5F02C4Dcb270999282b850Caa47Af749Ce49FE00',
        symbol: 'XTRA',
    },
    {
        address: '0x5f1219644bb0Cc3Ba3B58670dd0027DE65EF9A4a',
        symbol: 'TEST',
    },
    {
        address: '0x5F31233683c125Fc254f1aC856D63B812fDF9a3f',
        symbol: 'PERRA',
    },
    {
        address: '0x5f49f9024d5dec860b110EcA79E5b805c14b5B8c',
        symbol: 'DWR',
    },
    {
        address: '0x5F6b46be0e3Cd45a7601122bC557958f40fc88eE',
        symbol: 'EarnCardano',
    },
    {
        address: '0x5F84ce30DC3cF7909101C69086c50De191895883',
        symbol: 'VRT',
    },
    {
        address: '0x5f8fc340822FF4c531A4E3B4aAB71819f60ef81a',
        symbol: 'SOC',
    },
    {
        address: '0x5fEAD99998788AC1BCA768796483d899F1Aef4c4',
        symbol: 'JIND',
    },
    {
        address: '0x602bA546A7B06e0FC7f58fD27EB6996eCC824689',
        symbol: 'PINKSALE',
    },
    {
        address: '0xD1102332a213E21faF78B69C03572031F3552c33',
        symbol: 'BTD',
    },
    {
        address: '0x6051dEd779CE26646B213E22aB69805f5bcA4dF5',
        symbol: 'Super_ADA',
    },
    {
        address: '0x609D183Fb91a0fce59550b62ab7d2c931b0Bb1BE',
        symbol: 'PkMon',
    },
    {
        address: '0x610F34da19797405a276D26F95bd5c7d8CbBD644',
        symbol: 'GON',
    },
    {
        address: '0x617724974218A18769020A70162165A539c07E8a',
        symbol: 'OLIVE',
    },
    {
        address: '0x4492cA0AFF6D603e18Aea5075B49A5ff76b9Ea06',
        symbol: 'FG',
    },
    {
        address: '0x61934700c922ccfA239E03d9b5791bB3164d0016',
        symbol: 'ZOLU',
    },
    {
        address: '0x6223a1c1E31B72578d369EA4D0f5aA4233f05077',
        symbol: 'METH',
    },
    {
        address: '0x6250B97808149873D02b1dcbce2d0F63A07908fa',
        symbol: 'SAT',
    },
    {
        address: '0x6294BA115D4BC72CB380888b51296E4E3c3516ed',
        symbol: 'Time',
    },
    {
        address: '0x631E1e455019c359b939fE214EDC761d36bF6aD6',
        symbol: 'PINKPANDA',
    },
    {
        address: '0x63870A18B6e42b01Ef1Ad8A2302ef50B7132054F',
        symbol: 'blink',
    },
    {
        address: '0xD98560689C6e748DC37bc410B4d3096B1aA3D8C2',
        symbol: 'DFY',
    },
    {
        address: '0x639AD7c49EC616a64e074c21a58608C0d843A8a3',
        symbol: 'CANDY',
    },
    {
        address: '0x6466849a30247D90f0c228A6c4b6b106ff18cAB9',
        symbol: 'CHAR',
    },
    {
        address: '0x646b8470feA7c413DaC19F41b5c97328EBF70De4',
        symbol: 'BTCN',
    },
    {
        address: '0x64A2019DdFF3a096f4DfFe09e606B6A737dC567b',
        symbol: 'MFG',
    },
    {
        address: '0x64EF755D5A2627538CAA3Eb62ee07f96f9B608E4',
        symbol: 'RAI',
    },
    {
        address: '0x659EF2aba35c0A6ad376705aC9231F3362475FCf',
        symbol: 'PCAT',
    },
    {
        address: '0x65AbE4320545b36eDd77B644095De9c7b38cfc1F',
        symbol: 'SB',
    },
    {
        address: '0x66016c16BDF7F721aF483F86a19B3353450eA39e',
        symbol: 'DRUN',
    },
    {
        address: '0x667bEbFf5cda3C4A460B514aB478Da0A8cF80910',
        symbol: 'BEST',
    },
    {
        address: '0x673Da443da2f6aE7c5c660A9F0D3DD24d1643D36',
        symbol: 'RAINBOW',
    },
    {
        address: '0x6786946C90C9AC245D49B062593ce466A7030a71',
        symbol: 'SM',
    },
    {
        address: '0x67AfaC8AaCE9C2d14367F2dC34201b9F6D2B7551',
        symbol: 'BullDoge',
    },
    {
        address: '0x67ee3Cb086F8a16f34beE3ca72FAD36F7Db929e2',
        symbol: 'DODO',
    },
    {
        address: '0x68fff3aB2B8dE1fF6AC49468b349C6BB7b3FE3cc',
        symbol: 'FAD',
    },
    {
        address: '0x6BF2Be9468314281cD28A94c35f967caFd388325',
        symbol: 'oUSD',
    },
    {
        address: '0x18aCf236eB40c0d4824Fb8f2582EBbEcD325Ef6a',
        symbol: 'OKS',
    },
    {
        address: '0x6bfd576220e8444CA4Cc5f89Efbd7f02a4C94C16',
        symbol: 'SMG',
    },
    {
        address: '0x6c1eFbEd2F57dd486Ec091dFfd08eE5235A570b1',
        symbol: 'PNDR',
    },
    {
        address: '0x6cA4BF10a3707D09DE3601901c8a6DED5b9Df3D8',
        symbol: 'WTF',
    },
    {
        address: '0x6D5C1ce968f46Fd7c2288d63C24F1810A2295b0E',
        symbol: 'NFL',
    },
    {
        address: '0xA15083664eb19899885CCc2B4Fd03977b26d3a2d',
        symbol: 'BNW',
    },
    {
        address: '0x6D8734002fBffE1c86495e32c95f732fC77F6F2A',
        symbol: 'NUX',
    },
    {
        address: '0x6d9fB3332f62Fc044d5075feEeA597A92F1ce0AD',
        symbol: 'BABYDB',
    },
    {
        address: '0x6Dd195c23f3126E03bEf84969B64dC17742e79ed',
        symbol: 'ARUS',
    },
    {
        address: '0x6f6350D5d347aA8F7E9731756b60b774a7aCf95B',
        symbol: 'TENGU',
    },
    {
        address: '0x6f8F7FD4C1C07dA8FA5C4D4e59AfbFD7b47d39C4',
        symbol: 'FStar',
    },
    {
        address: '0x6FB6BA42Ff7f2EB19438EE481Ac36acbF0321288',
        symbol: 'TOKI',
    },
    {
        address: '0x702371e0897F5E2f566B1cE8256856D0549c5857',
        symbol: 'SZCB',
    },
    {
        address: '0xD232b1b9031b99373D84EA9800B83Ac6a6F233bF',
        symbol: 'NYCoin',
    },
    {
        address: '0x708739980021A0b0B2E555383fE1283697e140e9',
        symbol: 'BLS',
    },
    {
        address: '0x708C671Aa997da536869B50B6C67FA0C32Ce80B2',
        symbol: 'XCUR',
    },
    {
        address: '0x70D697A75F74a597937D8322610015e49dE64768',
        symbol: 'ORI',
    },
    {
        address: '0x70de30C81dDEE3A54b5dbDEb7d0BA029E80d34E2',
        symbol: 'HESH',
    },
    {
        address: '0x71142268f1472e9aB9d1D1dcCD4BAAe9335eD07a',
        symbol: 'LILS',
    },
    {
        address: '0x7128E52cA302c5f5BeEB801B6aD373fDeBE3dc5E',
        symbol: 'OCAT',
    },
    {
        address: '0x7Dd1D96477cbc70a0AB899CE56321349E393CF0B',
        symbol: 'BBSWAP',
    },
    {
        address: '0xdf5Fac537aa09e1eb0F3f8DD1d34CBdC42CA1076',
        symbol: 'DKYC',
    },
    {
        address: '0xE0e514c71282b6f4e823703a39374Cf58dc3eA4f',
        symbol: 'BELT',
    },
    {
        address: '0x715c113e2dC08E7A511967B0B604beF459bF3DBF',
        symbol: 'VGW',
    },
    {
        address: '0x71afF23750db1f4edbE32C942157a478349035b2',
        symbol: 'PVM',
    },
    {
        address: '0x71DE20e0C4616E7fcBfDD3f875d568492cBE4739',
        symbol: 'SWINGBY',
    },
    {
        address: '0x71e1611075800E89A460463FCDfbA3d0FEA8c01d',
        symbol: 'ATYNE',
    },
    {
        address: '0x71FB8EE0A7dd60379145bcb22BBC4064D9585c05',
        symbol: 'MYSHOUSE',
    },
    {
        address: '0x7269d98Af4aA705e0B1A5D8512FadB4d45817d5a',
        symbol: 'SHI',
    },
    {
        address: '0x726b348229Ed1c53abd2e9a1c7Ef68f6062EBD03',
        symbol: 'doge Japan',
    },
    {
        address: '0x7428BE82fD79D4c98650a7c67de9682A64FcAb71',
        symbol: 'CPHR',
    },
    {
        address: '0x747fD09ae18ba055978B5dA7a5cef572171C847C',
        symbol: 'DELOS',
    },
    {
        address: '0x74926B3d118a63F6958922d3DC05eB9C6E6E00c6',
        symbol: 'DOGGY',
    },
    {
        address: '0x74E90f5a084f0FccAe0e003b14e61096Cea2C83a',
        symbol: 'HGR',
    },
    {
        address: '0x7565ab68D3F9DaDff127F864103C8c706Cf28235',
        symbol: 'TFI',
    },
    {
        address: '0x75a6F00AB686388E3a316c978b1a466750f42774',
        symbol: 'TipTok',
    },
    {
        address: '0x75dffAf163D67591fDCa3907a50655dB3a5516Ed',
        symbol: 'Glitchy',
    },
    {
        address: '0x762539b45A1dCcE3D36d080F74d1AED37844b878',
        symbol: 'LINA',
    },
    {
        address: '0x768d221E81524De52841AeD976370b2e4F990416',
        symbol: 'MMP',
    },
    {
        address: '0x77018282fD033DAF370337A5367E62d8811Bc885',
        symbol: 'POOLZ',
    },
    {
        address: '0x7708343575E0e57168C4Acd45A0f296939DE7415',
        symbol: 'ThaiRB',
    },
    {
        address: '0x78211875b5549f80eC4fd4CcC3b4dd2082E020a5',
        symbol: 'DIVD',
    },
    {
        address: '0x78650B139471520656b9E7aA7A5e9276814a38e9',
        symbol: 'BTCST',
    },
    {
        address: '0x7892BCCfAc9C3187c14323F30C92598b4c51F05e',
        symbol: 'BTCI',
    },
    {
        address: '0x78A499a998Bdd5a84CF8b5aBe49100D82DE12f1C',
        symbol: 'JOJO',
    },
    {
        address: '0x7919F52d0C820BE87ab62459508808D29BECf395',
        symbol: 'SAITAMA',
    },
    {
        address: '0x79236Db52E1B6fca35f2d44249cFa78277f57Cea',
        symbol: 'NOSTA',
    },
    {
        address: '0x7932c678924FAE0082971b052B71386Df57e88F0',
        symbol: 'DSF',
    },
    {
        address: '0x799e1Cf88A236e42b4A87c544A22A94aE95A6910',
        symbol: 'MCONTENT',
    },
    {
        address: '0x79eBC9A2ce02277A4b5b3A768b1C0A4ed75Bd936',
        symbol: 'CATGIRL',
    },
    {
        address: '0x7a0Fc0f70A3028e4F6d6F61d5f0DFBC2aA300e5e',
        symbol: 'LASEREYES',
    },
    {
        address: '0x7a0fFA3db812701e711fc38eacb99675352f31be',
        symbol: 'sCBD',
    },
    {
        address: '0x7A6d476fCfFA23280537bC9850Cb47bf07EaB7d1',
        symbol: 'PAN',
    },
    {
        address: '0x7a8F2Ec8218A7A9B66eeC168D9008f63E8F43Ff2',
        symbol: 'te1',
    },
    {
        address: '0x7A9f28EB62C791422Aa23CeAE1dA9C847cBeC9b0',
        symbol: 'WATCH',
    },
    {
        address: '0x7ac8A920CF1F7E7CC4f698c9C5cBC1E26F604790',
        symbol: 'ALM',
    },
    {
        address: '0x7AcF49997e9598843CB9051389fA755969E551Bb',
        symbol: 'KIDS',
    },
    {
        address: '0x7B74Fa93E623737F2219112BB9D2e3761ca48112',
        symbol: 'TINY',
    },
    {
        address: '0x7bC75e291E656E8658D66Be1cc8154A3769A35Dd',
        symbol: 'LIME',
    },
    {
        address: '0x7bD4D93bE9A2ca1aD746cE208c771a71995d1709',
        symbol: 'XLR8',
    },
    {
        address: '0x7C38870e93A1f959cB6c533eB10bBc3e438AaC11',
        symbol: 'ALM',
    },
    {
        address: '0x7c63F96fEAFACD84e75a594C00faC3693386FBf0',
        symbol: 'ASS',
    },
    {
        address: '0x7C99cc2DB44ADef4276007dc3C175454A88D7f6A',
        symbol: 'SAGES',
    },
    {
        address: '0x7CA6fD70D718cA9E6Fd48755a00C8045f2311031',
        symbol: 'BABYHMNG',
    },
    {
        address: '0x7ccE94C0B2C8aE7661f02544E62178377Fe8cF92',
        symbol: 'DaddyDoge',
    },
    {
        address: '0x7cE4AcCd9bb261508ABd20B134D6278902369057',
        symbol: 'AIN',
    },
    {
        address: '0x7D68D0CAB07F97519283b4D4e3c617CFe9a4e730',
        symbol: 'IDNFT',
    },
    {
        address: '0x7e2A35C746F2f7C240B664F1Da4DD100141AE71F',
        symbol: 'AIRI',
    },
    {
        address: '0x7e396BfC8a2f84748701167c2d622F041A1D7a17',
        symbol: 'WMASS',
    },
    {
        address: '0x7e4e3BA4675c39FF2863073e171b0a2E93A592E0',
        symbol: 'SHIBACASH',
    },
    {
        address: '0x7e8DB69dcff9209E486a100e611B0af300c3374e',
        symbol: 'TRDC',
    },
    {
        address: '0x7Ed2c7683CA89078Ea9CddA3df387589Fe821378',
        symbol: 'BabyRox',
    },
    {
        address: '0x7f1296e5aA692a98d86EaAe3ac1CD7723E74878d',
        symbol: 'BIRD',
    },
    {
        address: '0x7FBEC0bb6A7152e77C30D005B5D49cbC08A602C3',
        symbol: 'DDOS',
    },
    {
        address: '0x802C68730212295149f2bEa78C25e2Cf5A05B8A0',
        symbol: 'CORGI',
    },
    {
        address: '0x996c1bf72Ec220289ae0edd3a8d77080642121a2',
        symbol: 'DFC',
    },
    {
        address: '0x8087E4c1735C1373F0D04b88d4Dbe1FAe1149123',
        symbol: 'MOJO',
    },
    {
        address: '0x8102c6329ecA1bBa7fAa256523EaEC17832bDB9C',
        symbol: 'SPANDA',
    },
    {
        address: '0x811Ae301D0BF4DB9895535733F5677b2D727B5fb',
        symbol: 'GLY',
    },
    {
        address: '0x816Bf1E3CeD99E1EeAe60E6D76CA6b39072B40f6',
        symbol: 'DBeer',
    },
    {
        address: '0x8182ac1C5512EB67756A89C40fadB2311757bD32',
        symbol: 'NTR',
    },
    {
        address: '0x82bbd3DBae09eba3F3B1EA48d0A469140Ed9dfb5',
        symbol: 'APE',
    },
    {
        address: '0x8342b7614557B0c9849dC0d30Df2CFf375C69791',
        symbol: 'WAIV',
    },
    {
        address: '0x834613c64522725b23b458aF04ED1590D189962F',
        symbol: 'DKKS',
    },
    {
        address: '0x838bcbE35da6AEe1bFd4C48D994e0133b25465DF',
        symbol: 'VAULT',
    },
    {
        address: '0x83A86adf1a7c56e77d36d585B808052e0a2aAD0e',
        symbol: 'SYA',
    },
    {
        address: '0x843D4a358471547f51534e3e51fae91cb4Dc3F28',
        symbol: 'lowb',
    },
    {
        address: '0x8443f091997f06a61670B735ED92734F5628692F',
        symbol: 'BEL',
    },
    {
        address: '0x847a982a58f64Bb0f62c46B321Eb3c6624a510E0',
        symbol: 'NFTL',
    },
    {
        address: '0x851F7a700c5d67DB59612b871338a85526752c25',
        symbol: 'ARGON',
    },
    {
        address: '0xd0840D5F67206f865AeE7cCE075bd4484cD3cC81',
        symbol: 'AFEN',
    },
    {
        address: '0x854086dC841e1bfae50Cb615bF41f55BF432a90b',
        symbol: 'GARUDA',
    },
    {
        address: '0x856C0F9BDD671c1FB07eEf9B5f01544E35E14A16',
        symbol: 'CHIMPY',
    },
    {
        address: '0x8578Eb576e126f67913a8bC0622e0A22EBa0989A',
        symbol: 'PANDA',
    },
    {
        address: '0x8850D2c68c632E3B258e612abAA8FadA7E6958E5',
        symbol: 'PIG',
    },
    {
        address: '0x8b3b45E48bE6C31366ffd9dD4F29C1edFFcbA97D',
        symbol: 'WRAITH',
    },
    {
        address: '0xA57ac35CE91Ee92CaEfAA8dc04140C8e232c2E50',
        symbol: 'PIT',
    },
    {
        address: '0x85D0f8fa3616EB2Ca879eE77B548Ef30f31f98d6',
        symbol: 'SPK',
    },
    {
        address: '0x86c3E4FfAcdB3AF628ef985a518cd6ee22A22b28',
        symbol: 'OCTA',
    },
    {
        address: '0x87e41175921d283c10Ce42C9200AA3c8d51835A2',
        symbol: 'X22',
    },
    {
        address: '0x88c55B3255aE1e6628C953C5CDfF27Ad3Cc33C81',
        symbol: 'DLegends',
    },
    {
        address: '0x893e258ee221c9c8Da50d01108d1Ac47cFC3Dc9a',
        symbol: 'RMX',
    },
    {
        address: '0x89Aba1453f58aB08056DA973163A67EFed95A432',
        symbol: 'PK',
    },
    {
        address: '0x89F2a5463eF4e4176E57EEf2b2fDD256Bf4bC2bD',
        symbol: 'CIFI',
    },
    {
        address: '0x8A5d7FCD4c90421d21d30fCC4435948aC3618B2f',
        symbol: 'MONSTA',
    },
    {
        address: '0x33831Bee1CE63c95dAb6Cf23F83fF0B6A29a2837',
        symbol: 'MOLE',
    },
    {
        address: '0xA873e87C2C935fa11c72003231a2EEe7d391CE5f',
        symbol: 'BILL',
    },
    {
        address: '0x8b303d5BbfBbf46F1a4d9741E491e06986894e18',
        symbol: 'WOOP',
    },
    {
        address: '0x8bAc6b4AF65C8c1967a0FBc27cd37FD6059daa00',
        symbol: 'SPH',
    },
    {
        address: '0x8BAc919fBca13d67e9f901BF41537931effF0E7D',
        symbol: 'CYN',
    },
    {
        address: '0x8D3437e683004bD36BF21D4d075cC10165A863E8',
        symbol: 'HY',
    },
    {
        address: '0x8DA0F18e4deB7Ba81dBD061DF57325a894014B5a',
        symbol: 'PinkE',
    },
    {
        address: '0x8dB1D28Ee0d822367aF8d220C0dc7cB6fe9DC442',
        symbol: 'ETHPAD',
    },
    {
        address: '0x8db702D9d561921C45Be8DF38830A653e4BC0299',
        symbol: 'CRUDE',
    },
    {
        address: '0x8Dc1942E2089e711725EDA66ab06650035475441',
        symbol: 'BABYUSDT',
    },
    {
        address: '0x8e07Df508cA9c16362A84fA742b91Db3912Dd290',
        symbol: 'NST',
    },
    {
        address: '0x8E37b0638c0da2c31C22B93DD36A7e5b7aC17806',
        symbol: 'CRBRS',
    },
    {
        address: '0x8E518202c9575722183da92555Fe64940AaA9C50',
        symbol: 'CSO',
    },
    {
        address: '0x8E80C4aa22cAb0b9fc04f7B818aA85CEA737460f',
        symbol: 'UTM',
    },
    {
        address: '0x8E8538c75f273aB2dF6AdEEcD3622A9c314fcCf3',
        symbol: 'SISHI',
    },
    {
        address: '0x8F1E60D84182db487aC235acC65825e50b5477a1',
        symbol: 'LDFI',
    },
    {
        address: '0x8ff6973CAB60c4F55a6438A31db148ab8Ada6810',
        symbol: 'Floki',
    },
    {
        address: '0x8FFf93E810a2eDaaFc326eDEE51071DA9d398E83',
        symbol: 'BRISE',
    },
    {
        address: '0x901c31a669616Fec1420fe74cF7abAC9b59C8fE3',
        symbol: 'INFG',
    },
    {
        address: '0x9029FdFAe9A03135846381c7cE16595C3554e10A',
        symbol: 'OOE',
    },
    {
        address: '0x908F70a8E776FAd2c5Fae0A063A019453dCd1f59',
        symbol: 'GLEAMS',
    },
    {
        address: '0x9159F30F1c3F0317b0a2D6bC176f29266Be790eE',
        symbol: 'HEPA',
    },
    {
        address: '0x91807c199C84D77B5eF87308ed8eeDdF92F138D9',
        symbol: 'PWT',
    },
    {
        address: '0x92a42Db88Ed0F02c71D439e55962Ca7CAB0168b5',
        symbol: 'TRDG',
    },
    {
        address: '0x9452D45d33490234B8C96f42342F1Be28c0FE097',
        symbol: 'PERRY',
    },
    {
        address: '0x948b7b39e665A8adD9e128b0c378F99152172274',
        symbol: 'WRK',
    },
    {
        address: '0x959229D94c9060552daea25AC17193bcA65D7884',
        symbol: 'IOI',
    },
    {
        address: '0x959eC541152b77D34169e28a4A3De29d22A2Fd85',
        symbol: 'GUA',
    },
    {
        address: '0x95a1199EBA84ac5f19546519e287d43D2F0E1b41',
        symbol: 'RABBIT',
    },
    {
        address: '0x96058f8C3e16576D9BD68766f3836d9A33158f89',
        symbol: 'BONDLY',
    },
    {
        address: '0x9617857E191354dbEA0b714d78Bc59e57C411087',
        symbol: 'LMT',
    },
    {
        address: '0x4CfbBdfBd5BF0814472fF35C72717Bd095ADa055',
        symbol: 'Suter',
    },
    {
        address: '0x965F527D9159dCe6288a2219DB51fc6Eef120dD1',
        symbol: 'BSW',
    },
    {
        address: '0x9678E42ceBEb63F23197D726B29b1CB20d0064E5',
        symbol: 'IOTX',
    },
    {
        address: '0x97641c20355571820F591839d972AD2d38ad9F00',
        symbol: 'H2O',
    },
    {
        address: '0x97Ad911101d4285a13A3240Ee35618edC511A435',
        symbol: 'KISHUBABY',
    },
    {
        address: '0x97E8987885c4Bb46E883fa1A9d5EB060b155448F',
        symbol: 'PHIFIV2',
    },
    {
        address: '0x9839f3E4414AF0Eb94740Ee2F5071F4361330A54',
        symbol: 'TITANRISE',
    },
    {
        address: '0x984811e6f2695192add6f88615dF637bf52a5Cae',
        symbol: 'HOP',
    },
    {
        address: '0x9852104118CA0bA1776D82d219eFB53F8d5A89E7',
        symbol: 'TheMoon',
    },
    {
        address: '0x9899a98b222fCb2f3dbee7dF45d943093a4ff9ff',
        symbol: 'DFD',
    },
    {
        address: '0x98B96F9065d4902271b6A827859D489f6293E676',
        symbol: 'SURFMOON',
    },
    {
        address: '0x996F56299A5b7c4f825A44886E07daFc4660B794',
        symbol: 'DEX',
    },
    {
        address: '0x9973885595Cf0C17accD7E46f96dbd937A7E627C',
        symbol: 'GEN2',
    },
    {
        address: '0x9974F4E6FF49ac39469928E5d7cCa3E8649ae6b8',
        symbol: 'PATH',
    },
    {
        address: '0x99956D38059cf7bEDA96Ec91Aa7BB2477E0901DD',
        symbol: 'DIA',
    },
    {
        address: '0x99BB55D8B42B1e0B98479c81cdb3631643694e12',
        symbol: 'TITUC',
    },
    {
        address: '0x99dAB6065951BecaC1dECBaC0C1A16b9BbF12913',
        symbol: 'GEG',
    },
    {
        address: '0x99E3259d1D780746c62B4a90833d607b40Fb36Ce',
        symbol: 'CCDOGE',
    },
    {
        address: '0x9a12b8A7ac00FE661c4451d8405fDf588A11E5b1',
        symbol: 'RoboBUSD',
    },
    {
        address: '0x9a319b959e33369C5eaA494a770117eE3e585318',
        symbol: 'HYFI',
    },
    {
        address: '0x9AA6FC71aed1130DeE06a91A487BF5eA481dE80D',
        symbol: 'COCO',
    },
    {
        address: '0x093A60e9240269733E3C9bEf81e3066273c40fb3',
        symbol: 'AFRICA',
    },
    {
        address: '0x9abDbA20EdFbA06B782126b4D8d72A5853918FD0',
        symbol: 'TABOO',
    },
    {
        address: '0x9b17bAADf0f21F03e35249e0e59723F34994F806',
        symbol: 'SURE',
    },
    {
        address: '0x9B26e16377ad29A6CCC01770bcfB56DE3A36d8b2',
        symbol: 'HERO',
    },
    {
        address: '0x9B44Df3318972bE845d83f961735609137C4C23c',
        symbol: 'PROPEL',
    },
    {
        address: '0x9B571e36262560A817C25e3A43cff437f031947A',
        symbol: 'DOGE 2.0',
    },
    {
        address: '0x9b76D1B12Ff738c113200EB043350022EBf12Ff0',
        symbol: 'TIKI',
    },
    {
        address: '0x9C65AB58d8d978DB963e63f2bfB7121627e3a739',
        symbol: 'MDX',
    },
    {
        address: '0x9C9Ac8B098A7D47ED1834599ce2DC29cb94103e9',
        symbol: 'MSC',
    },
    {
        address: '0xBc5609612b7C44BEf426De600B5fd1379DB2EcF1',
        symbol: 'PSG',
    },
    {
        address: '0x9dC680902bcD806D90ed82DeD73c80f9838aDB63',
        symbol: 'TimeToken',
    },
    {
        address: '0x9DF263E0B2F797d1f58D312eD12632E483657821',
        symbol: 'TV2',
    },
    {
        address: '0x3192CCDdf1CDcE4Ff055EbC80f3F0231b86A7E30',
        symbol: 'INSUR',
    },
    {
        address: '0x17922598458A7F29E3ce2bF088DfF2B1b474771a',
        symbol: 'DRSL',
    },
    {
        address: '0x9e26c50B8A3b7652c3fD2B378252A8647a0C9268',
        symbol: 'WOOF',
    },
    {
        address: '0x9E6B3E35c8f563B45d864f9Ff697A144ad28A371',
        symbol: 'DOGO',
    },
    {
        address: '0x9EBD2B2e710829924ab5775EFc440627De755Ed0',
        symbol: 'FTB',
    },
    {
        address: '0x9F3BCBE48E8b754F331Dfc694A894e8E686aC31D',
        symbol: 'ACT',
    },
    {
        address: '0x9f589e3eabe42ebC94A44727b3f3531C0c877809',
        symbol: 'TKO',
    },
    {
        address: '0x9f7229aF0c4b9740e207Ea283b9094983f78ba04',
        symbol: 'TAD',
    },
    {
        address: '0xA060E0c0588D26CabA4a0009513337aCE50752dd',
        symbol: 'ZOOSHI',
    },
    {
        address: '0xa0eCAf5Edf5df69edC7768DA897dCeA7D0c8e526',
        symbol: 'FAR',
    },
    {
        address: '0xa184088a740c695E156F91f5cC086a06bb78b827',
        symbol: 'AUTO',
    },
    {
        address: '0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf',
        symbol: 'BCH',
    },
    {
        address: '0xA244Ef3f07699b4b929C17e99DDB39BeC238465B',
        symbol: 'EGGC',
    },
    {
        address: '0xA2a26349448ddAfAe34949a6Cc2cEcF78c0497aC',
        symbol: 'TSC',
    },
    {
        address: '0xA3902E6F17021121390603be54c1719DCe19aeB5',
        symbol: 'BabyADA',
    },
    {
        address: '0xA39D4A24226102765f48678D87D80387DD0C5aCb',
        symbol: 'MINIUSDC',
    },
    {
        address: '0xa411dfDb4f7A81226788B79664b52B38417d49e1',
        symbol: 'DRA',
    },
    {
        address: '0xa4838122c683f732289805FC3C207Febd55BabDD',
        symbol: 'TRIAS',
    },
    {
        address: '0xA4CB040B85e94F5c0C32ea1151B20D3aB40B3493',
        symbol: 'COLL',
    },
    {
        address: '0xA4d872235dde5694AF92a1d0df20d723E8e9E5fC',
        symbol: 'GNBU',
    },
    {
        address: '0xA532cfaA916c465A094DAF29fEa07a13e41E5B36',
        symbol: 'HIBIKI',
    },
    {
        address: '0xA53d692984E4f98d25c124dD9A63ad8968A1EE48',
        symbol: 'BINS',
    },
    {
        address: '0xA53E61578fF54f1ad70186Be99332a6e20b6ffa9',
        symbol: 'GDOGE',
    },
    {
        address: '0xA67a13c9283Da5AABB199Da54a9Cb4cD8B9b16bA',
        symbol: 'NBL',
    },
    {
        address: '0xA6850723a39fc6C5aD1C68615c65e7aCFad900d3',
        symbol: 'PAL',
    },
    {
        address: '0xA7cA04F7602cD7A939d3E4827F442f48cF8E9daD',
        symbol: 'UNFI',
    },
    {
        address: '0xA7f552078dcC247C2684336020c03648500C6d9F',
        symbol: 'EPS',
    },
    {
        address: '0xa898dF02906d40ec81900B3a5Ba36ea20d09b7Cc',
        symbol: 'TTF',
    },
    {
        address: '0xA934B8AE9001b73e5E229A6f6D742CDbC52c5AC5',
        symbol: 'WRC',
    },
    {
        address: '0xa94b7a842aADB617a0B08fA744e033C6De2f7595',
        symbol: 'FSXU',
    },
    {
        address: '0xA9776B590bfc2f956711b3419910A5Ec1F63153E',
        symbol: 'RUNE',
    },
    {
        address: '0xA998F797c96e6766c9bD679276499A693101E80D',
        symbol: 'PI',
    },
    {
        address: '0xA9ECF878d73265b9773CD298eC3aFe40C9D13fE8',
        symbol: 'BabyLowb',
    },
    {
        address: '0xAaD87f47CDEa777FAF87e7602E91e3a6AFbe4D57',
        symbol: 'PYE',
    },
    {
        address: '0xAb14952d2902343fde7c65D7dC095e5c8bE86920',
        symbol: 'GOMA',
    },
    {
        address: '0xd9025e25Bb6cF39f8c926A704039D2DD51088063',
        symbol: 'CYT',
    },
    {
        address: '0xab287e6D370C61f105630e656B5468ACB4D00423',
        symbol: 'BSR',
    },
    {
        address: '0xaB8110b1eF315F81c15c601c7DD0C18cc817E868',
        symbol: 'WOLFPACK',
    },
    {
        address: '0xaBc6790673a60b8A7f588450f59D2d256b1aeF7F',
        symbol: 'OMN',
    },
    {
        address: '0xAbc69f2025bDb12efcdB8fd048d240fFf943ca82',
        symbol: 'VNY',
    },
    {
        address: '0xAC51066d7bEC65Dc4589368da368b212745d63E8',
        symbol: 'ALICE',
    },
    {
        address: '0xAcD7B3D9c10e97d0efA418903C0c7669E702E4C0',
        symbol: 'ELE',
    },
    {
        address: '0x1e5F009d4f8cA44b5FcC4963dD301Da82b4eed09',
        symbol: 'ZABAKU',
    },
    {
        address: '0x2D81ed6edee72d454a5baF51e40704e8c377DB2A',
        symbol: 'FDOTA',
    },
    {
        address: '0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f',
        symbol: 'BURGER',
    },
    {
        address: '0xAD29AbB318791D579433D831ed122aFeAf29dcfe',
        symbol: 'FTM',
    },
    {
        address: '0xAD6cAEb32CD2c308980a548bD0Bc5AA4306c6c18',
        symbol: 'BAND',
    },
    {
        address: '0xAe67Cf598a349aFff89f6045108c6C1850f82839',
        symbol: 'CTS',
    },
    {
        address: '0xAe6e3B04d3eb991E30fA2474563fE2a89E351cdA',
        symbol: 'CAKF',
    },
    {
        address: '0xAe8D1d335364aE1d16677390750aEB4C1b2332cb',
        symbol: 'FORINT',
    },
    {
        address: '0xaEC945e04baF28b135Fa7c640f624f8D90F1C3a6',
        symbol: 'C98',
    },
    {
        address: '0xAECf6d1afF214feF70042740054f0f6D0Caa98Ab',
        symbol: 'BabyShibaInu',
    },
    {
        address: '0xAEe234825dC4687faE606485c1eBD06336052bCc',
        symbol: 'Duke',
    },
    {
        address: '0xAEEe5952bE7381Cc413b686391E1d3C2A66B008B',
        symbol: 'SHROOMS',
    },
    {
        address: '0xAF2f095ccE91c8ab6AEF7C494e8ffBEe4f8467cf',
        symbol: 'POKE',
    },
    {
        address: '0xaf96a19c2DD4a0f6B077D9481fCc8C9102FAa141',
        symbol: 'MOONARCH',
    },
    {
        address: '0xaFfbF5D4693C93F23c35a08E31439Ea53d952351',
        symbol: 'BabyETH',
    },
    {
        address: '0xB0B924C4a31b7d4581a7F78F57ceE1E65736Be1D',
        symbol: 'HAPPY',
    },
    {
        address: '0xB0e1fc65C1a741b4662B813eB787d369b8614Af1',
        symbol: 'IF',
    },
    {
        address: '0xB1035523a844371C2877f8a3b2F2f8d337403b6F',
        symbol: 'SHIBBY',
    },
    {
        address: '0xB1CeD2e320E3f4C8e3511B1DC59203303493F382',
        symbol: 'MOONLIGHT',
    },
    {
        address: '0xB1fAf4D6Ca9356526C703F594fcAaAAdA7635A96',
        symbol: 'CHC',
    },
    {
        address: '0xb2343143f814639c9b1f42961C698247171dF34a',
        symbol: 'CMCX',
    },
    {
        address: '0xB277Db4f19fc79F87569aC34EFF5d1D50d4AEb8b',
        symbol: 'CPOO',
    },
    {
        address: '0xB27ADAfFB9fEa1801459a1a81B17218288c097cc',
        symbol: 'POOCOIN',
    },
    {
        address: '0xb28a7f8f5328FafFDd862985177583c2Bb71E016',
        symbol: 'POLO',
    },
    {
        address: '0xb32aC3C79A94aC1eb258f3C830bBDbc676483c93',
        symbol: 'OSWAP',
    },
    {
        address: '0x5B6DcF557E2aBE2323c48445E8CC948910d8c2c9',
        symbol: 'MIR',
    },
    {
        address: '0xb39f922fdd02E029D506Db0D2FDF9c7174468AFF',
        symbol: '50CENTS',
    },
    {
        address: '0xB42e1c3902b85b410334f5fff79cDc51fBeE6950',
        symbol: 'GSPI',
    },
    {
        address: '0xB43ec6F9f1fdEF0fEB66dAc005718eCF7c10828E',
        symbol: 'SVV',
    },
    {
        address: '0xb4BF64B17e270B50D00658E3c0e2fBDefABDD87b',
        symbol: 'CHEESE',
    },
    {
        address: '0xb5389A679151C4b8621b1098C6E0961A3CFEe8d4',
        symbol: 'LAUNCH',
    },
    {
        address: '0xb58a579e8f987b52564A5fE08Fe5181dc2621a9c',
        symbol: 'SPHN',
    },
    {
        address: '0xb59490aB09A0f526Cc7305822aC65f2Ab12f9723',
        symbol: 'LIT',
    },
    {
        address: '0xB60501346240FCdE1615de56eA9FFf1AC1da5673',
        symbol: 'BSL',
    },
    {
        address: '0xb6090a50f66046E3c6aFB9311846a6432E45060A',
        symbol: 'PinkM',
    },
    {
        address: '0xB61dEb6e516611A05A884a11E91bE16795B5728f',
        symbol: 'YESbank',
    },
    {
        address: '0xb698AC9bC82C718D8ebA9590564B9a5AA53D58e6',
        symbol: 'LESS',
    },
    {
        address: '0xb6C53431608E626AC81a9776ac3e999c5556717c',
        symbol: 'TLOS',
    },
    {
        address: '0xb7b36CA86685Af52186f1f9394e91d115A9Da654',
        symbol: 'HAM',
    },
    {
        address: '0xB7Dba4C673beDB174DC3Ff7Ec65d17C863d39b16',
        symbol: 'FATCAKE',
    },
    {
        address: '0xB8b9e96E9576Af04480ff26eE77D964B1996216e',
        symbol: 'MXS',
    },
    {
        address: '0xb8E605313a6B315D64dA6360E8e8206c690D6686',
        symbol: '$EP',
    },
    {
        address: '0xb9D8592E16A9c1a3AE6021CDDb324EaC1Cbc70d6',
        symbol: 'PERA',
    },
    {
        address: '0xbA5b0408B0645ec091B3bB76Ee793091A9399BF2',
        symbol: 'GENIUS',
    },
    {
        address: '0xBA622A558c0A7Cc33034FAE0F26bDd01724C6DDE',
        symbol: 'LHB',
    },
    {
        address: '0xbA7Cb23f316B97E17F985a77B8A19F4536006409',
        symbol: 'ADAG',
    },
    {
        address: '0x003F83da9868AcC151Be89eeFA4D19838FFE5D64',
        symbol: 'BITD',
    },
    {
        address: '0x006DF576e2Eb243B42D79b64c8e07928234c5faF',
        symbol: 'NASTY',
    },
    {
        address: '0x0231f91e02DebD20345Ae8AB7D71A41f8E140cE7',
        symbol: 'bwJUP',
    },
    {
        address: '0x02d7F3313e8fE95d2150E0c63461fbC6944cfCaF',
        symbol: 'X2',
    },
    {
        address: '0x0321394309CaD7E0E424650844c3AB3b659315d3',
        symbol: 'XBC',
    },
    {
        address: '0x037dd2EEFc39664fCD33cF93eD840D34b50b05d0',
        symbol: 'TESLA',
    },
    {
        address: '0x04c1b4a6D48272941CFaa94bAee5D58a70278869',
        symbol: 'AVAXPRO',
    },
    {
        address: '0x050787DE0cF5Da03D9387b344334D51cAE5DD0Fd',
        symbol: 'PEKC',
    },
    {
        address: '0x0615Dbba33Fe61a31c7eD131BDA6655Ed76748B1',
        symbol: 'BACON',
    },
    {
        address: '0x06b889a7a7fa15D8cC7CFf147962C4232cCE7CF0',
        symbol: 'SAUNA',
    },
    {
        address: '0x078680b4CeA9F9cd7F55DcBcB3A56246F132Cc11',
        symbol: 'MMD',
    },
    {
        address: '0x083cfA6ECd80bbDCd295eC2046207C53DceC1645',
        symbol: 'Punk',
    },
    {
        address: '0x092BBec1342affFd16Cfb41B56343D5A299CDf0D',
        symbol: 'ShiCo',
    },
    {
        address: '0x0952dDFfDE60786497C7CEd1f49B4A14cF527f76',
        symbol: 'GHOSTFACE',
    },
    {
        address: '0x09d975C3351DBdED28617517FC6982284a787f03',
        symbol: 'CISLA',
    },
    {
        address: '0x0B2959Ef15ba7021F8EF57D4d67BE8F9566F1db7',
        symbol: 'SPACEPORT',
    },
    {
        address: '0x0D09EEC860aAaFfCF7d2910010D68F7F2Eed296d',
        symbol: 'SLP',
    },
    {
        address: '0x0d3D13eE3df3a6c8a5705301Ac1571De3eF73d5E',
        symbol: 'GORL',
    },
    {
        address: '0x0D9940E0C50BB41aE7d4E89b734BD59Ca1B88d7E',
        symbol: 'BABYBALI',
    },
    {
        address: '0x0Df62D2cd80591798721ddc93001AFe868C367Ff',
        symbol: 'VERA',
    },
    {
        address: '0x0e20E3216EA172fcf9eAa19723b119e090fD353f',
        symbol: 'XIASI',
    },
    {
        address: '0x0E2b41eA957624A314108cc4E33703e9d78f4b3C',
        symbol: 'CBD',
    },
    {
        address: '0x10bD76630349F649697Cb6c75b7DE00854381Fc5',
        symbol: 'STRAY',
    },
    {
        address: '0x10F292A6e694C38C5d570127da445143a2d882f3',
        symbol: 'COCKTAIL',
    },
    {
        address: '0x1294B0188135fd791B0Ff02974c932EDFDecE96f',
        symbol: '80085',
    },
    {
        address: '0x12Da2f2761038486271C99DA7e0FB4413e2B5E38',
        symbol: 'NBM',
    },
    {
        address: '0x1345DB2944D7254A2507d736b83a7f3cDC8762E2',
        symbol: 'COC',
    },
    {
        address: '0x141383CDB8158982fB3469C3e49cC82F8026d968',
        symbol: 'CORX',
    },
    {
        address: '0x154ECeB42679ac155EeF18820dE2Be75699263A8',
        symbol: 'MamySHIBA',
    },
    {
        address: '0x163f182C32d24A09d91EB75820cDe9FD5832b329',
        symbol: 'EDOGE',
    },
    {
        address: '0x17456d37406Cb58335747F922E5eB86B9eed5F9d',
        symbol: 'MVS',
    },
    {
        address: '0x188BbEce2FeEb29E84A2DB8C6f2d55ea95F2b764',
        symbol: 'NAIB',
    },
    {
        address: '0x18982e52a0aD5F6ECbCAdA543Ae109847E187B03',
        symbol: 'METAMASK',
    },
    {
        address: '0x1FFD0b47127fdd4097E54521C9E2c7f0D66AafC5',
        symbol: 'TXL',
    },
    {
        address: '0x201202B5c1763032bA8F7EA2aeDe0003E69C0963',
        symbol: 'KobeDoge',
    },
    {
        address: '0x20512Ee0052236B009772Af0Ed22BC58B40c27B9',
        symbol: 'MUSO',
    },
    {
        address: '0x2136cD209bB3D8E4c008ec2791B5D6790B5E33A9',
        symbol: 'ABLE',
    },
    {
        address: '0x2178C3f969923Da490154290Ac81D93ab1F36863',
        symbol: 'Xlion',
    },
    {
        address: '0x21Ed4f0669872A55cAb53c0d9De65C7e4a7Ea2C3',
        symbol: 'QUA',
    },
    {
        address: '0x21F7F2dA3bB077342908E363a2a09a4F45A844dc',
        symbol: 'RWT',
    },
    {
        address: '0x2225e64819A8e146c306b85345A9A95ac81e651C',
        symbol: 'AAVN',
    },
    {
        address: '0x231cF6F78620e42Fe00D0c5C3088b427F355d01c',
        symbol: 'MOVE',
    },
    {
        address: '0x23788081c244fec6Ef6B82d8ffcAd4e4c1532794',
        symbol: 'RHEIN',
    },
    {
        address: '0x243723ec94176a44eAcaa72C38e08CeF8EECa0Ce',
        symbol: 'FBALL',
    },
    {
        address: '0x261C02C850288F56497c06F9C0a8bde718d33D2a',
        symbol: 'ATMC',
    },
    {
        address: '0x26B007d1D0976228d71EE4eDC6Fe7993616c04bC',
        symbol: 'SHILLMOON',
    },
    {
        address: '0x26D6e280F9687c463420908740AE59f712419147',
        symbol: 'TBAKE',
    },
    {
        address: '0x271C418B045d05A1D52c6bF849d47b5B5B4d769e',
        symbol: 'VRAP',
    },
    {
        address: '0x2821989877c0189bf63837f18a2856E30297AF70',
        symbol: 'ORION',
    },
    {
        address: '0x29bFf8E619a167aa64cE414Ec10D1b21Db646bca',
        symbol: 'MBNB',
    },
    {
        address: '0x2a1eB323ba7D71e5985bb6F571328618be0F4178',
        symbol: 'ClownGame',
    },
    {
        address: '0x2cbE8AeCC2dFB6b06CC9e320684Fc71F81eE0157',
        symbol: 'BNFT',
    },
    {
        address: '0x2D37170212054CBD6B704c47B97932d267D58321',
        symbol: 'DONI',
    },
    {
        address: '0x2Db0d5Cb907014C67Dc201886624716fb5c71123',
        symbol: 'AINU',
    },
    {
        address: '0x2e8C05582176Fa93b4590382e8290C73Deb82176',
        symbol: 'MOON',
    },
    {
        address: '0x2f2265206EbB359bdd2b936Ba44cfE9307D6807a',
        symbol: 'ANTX',
    },
    {
        address: '0x2F52F99DB24b0cBedD16dA57b098226D3b0831e8',
        symbol: 'littlegecko',
    },
    {
        address: '0x304c62b5B030176F8d328d3A01FEaB632FC929BA',
        symbol: 'LEV',
    },
    {
        address: '0x3122c2182d4e7C25Eb577a6b33c9DDEE70Bd4b4E',
        symbol: 'TIME',
    },
    {
        address: '0x31f22742e4987bE1776c76366f5972844e7cAC07',
        symbol: 'CHARLES',
    },
    {
        address: '0x32246B27bBc630350d98E09c6233486dc95a75a1',
        symbol: 'SOS',
    },
    {
        address: '0x33840024177A7DacA3468912363BeD8b425015c5',
        symbol: 'EBOX',
    },
    {
        address: '0x355389292D8c963719FDaF0651f7846D6c504448',
        symbol: 'TATA',
    },
    {
        address: '0x35Bd36597fF784FCc30D08EBE4Bd917374C40d4B',
        symbol: 'miniSHIB',
    },
    {
        address: '0x3699D20715C750aBa5a108bACA5c555347da034f',
        symbol: 'CDOGE',
    },
    {
        address: '0x38895e0b3E7cD13C45BD4E93aF5a402604B762E3',
        symbol: 'BabyPoo',
    },
    {
        address: '0x3aD9594151886Ce8538C1ff615EFa2385a8C3A88',
        symbol: 'SAFEMARS',
    },
    {
        address: '0x3BF46BFfb13D07C4f2EcCCE27eA342EB161322a9',
        symbol: 'TALK',
    },
    {
        address: '0x3f670f65B9Ce89b82e82121fD68c340ac22C08D6',
        symbol: 'CTI',
    },
    {
        address: '0x3Fd6068E1E85017aBedaC22B8eFEfe8A1588678D',
        symbol: 'CADAX',
    },
    {
        address: '0x3FdA9383A84C05eC8f7630Fe10AdF1fAC13241CC',
        symbol: 'DEGO',
    },
    {
        address: '0x42f3008F6945f052C31e7680F7f78c512099b904',
        symbol: 'WALBT',
    },
    {
        address: '0x4329f1fbb62deA8960237fD975A794A604c57Ff7',
        symbol: 'BWT(👶⬜️🐯)',
    },
    {
        address: '0x442d5E02276954cA61F272635Cdad07dD7992120',
        symbol: 'r4BELT',
    },
    {
        address: '0x444dF6bA60a06298855B48461138CdA4D4380ac8',
        symbol: 'TPC',
    },
    {
        address: '0x44fA4fd9211293a72fcbBa8d58fe6cf0BD4dF525',
        symbol: 'LIVENFT',
    },
    {
        address: '0x45B110fCdd1a20fCEb1805ec0F7Ca6ef3712BeFc',
        symbol: 'ELNC',
    },
    {
        address: '0x4673f018cc6d401AAD0402BdBf2abcBF43dd69F3',
        symbol: 'FCF',
    },
    {
        address: '0x46CBE14F4Ab4C665e084a0a868c49098f0Ce7704',
        symbol: 'WAVE',
    },
    {
        address: '0x47FdfeA2c5741Acd7Be0377029D6C507154D86B9',
        symbol: 'SAFEETH',
    },
    {
        address: '0x4D4F20EFA7956624ec27b906E4a5b8C5f2b5C6c7',
        symbol: 'SpritzMoon',
    },
    {
        address: '0x4dfAD9A4cBa318EFC53743b803588B113f8A84Bd',
        symbol: 'HUA',
    },
    {
        address: '0x4e6d79CDdEc12C229D53b38c11B204bcec118885',
        symbol: 'KRN',
    },
    {
        address: '0x4fe34797Fb017B1579feaDA89BAc57e07523dae6',
        symbol: 'LIFE',
    },
    {
        address: '0x5013840d96BC94434FB5eFb91697f1f3960De128',
        symbol: 'PRZ',
    },
    {
        address: '0x50976c57a3A1923B55b76393451Dac1e24A0A08d',
        symbol: 'BBY',
    },
    {
        address: '0x50ea9C9F88AEAB9f554b8ffB4d7a1017957e866A',
        symbol: 'FOXT',
    },
    {
        address: '0x5155a8739eBaDcC66D15Af81ACdC55D78f3E79bA',
        symbol: 'LEE',
    },
    {
        address: '0x5251fD6Bd2BAb58FF19A72574a7ba627542280d7',
        symbol: 'mini ADA',
    },
    {
        address: '0x552e922A0FfE42522Dbc237092F33d3e78644812',
        symbol: 'AlwaysUP',
    },
    {
        address: '0x557dd6700e66818AF340ccE17FD4508CED81fBc1',
        symbol: 'PAPEL',
    },
    {
        address: '0x56083560594E314b5cDd1680eC6a493bb851BBd8',
        symbol: 'THC',
    },
    {
        address: '0x569641e97cF794FEDC6277B490337654beA58942',
        symbol: 'PAL',
    },
    {
        address: '0x5788105375ecF7F675C29e822FD85fCd84d4cd86',
        symbol: 'HODL',
    },
    {
        address: '0x579F11C75Eb4e47F5290122e87CA411644aDCD97',
        symbol: 'CLEANOCEAN',
    },
    {
        address: '0x58BFc98F3974AeF4FED9A0168B97CcCD3512cB4A',
        symbol: 'BUBBLEGUM',
    },
    {
        address: '0x5A046a570B1F94bE19cEa560D8C5CABb18139686',
        symbol: 'BABYSOL',
    },
    {
        address: '0x5A726a26eDB0Df8Fd55f03cc30aF8A7cEa81e78D',
        symbol: 'CWT',
    },
    {
        address: '0x5Ac69C40bc7363EA7D98574C78F4f54DbecbD54B',
        symbol: 'MOONRABBIT',
    },
    {
        address: '0x5aD0B050e42184e69CF6d7c42Cee97B3aBf383B5',
        symbol: 'DM',
    },
    {
        address: '0x5AF57fE1FcD15a8F9a16286774100671d92040B0',
        symbol: 'BETTY',
    },
    {
        address: '0x5B0Dfe077B16479715C9838eb644892008abbFe6',
        symbol: 'BBTC',
    },
    {
        address: '0x5b691E8032D015892443B0887b07528F65d0Eaa8',
        symbol: 'FLF',
    },
    {
        address: '0x5B69eAbF1c748F590F60906D964158DBA0F53285',
        symbol: 'BRIGADEIRO',
    },
    {
        address: '0x5C6CdAf28F26d8ed41A90f0B5C898CcA304Ecba4',
        symbol: 'MURPHY',
    },
    {
        address: '0x5CdCB6C1A30F59D59393D1629172634056E0461C',
        symbol: 'Fwatch',
    },
    {
        address: '0x5d1F9499A00CD88BD17B615e6c6Ac2470237A913',
        symbol: '$DD',
    },
    {
        address: '0x5d684ADaf3FcFe9CFb5ceDe3abf02F0Cdd1012E3',
        symbol: 'LIEN',
    },
    {
        address: '0x5d6CDf1b7F7C35EAE688E4C563b6f16eeAC2cB6b',
        symbol: 'SMOON',
    },
    {
        address: '0x5Df4483e53871A1E8C92662B771e3637ABc0Ae02',
        symbol: 'DOTC',
    },
    {
        address: '0x6020371b0E8a2fc259A6B111d178BBa9C966A4a4',
        symbol: 'LLN',
    },
    {
        address: '0x61A3bfA69b2e42d665c9D98379F465c8d0fE6a73',
        symbol: 'LMG',
    },
    {
        address: '0x62dD69adcc638381aa138043A0CD8F9E40871BdF',
        symbol: 'DOGEPAY',
    },
    {
        address: '0x63041a8770c4CFE8193D784f3Dc7826eAb5B7Fd2',
        symbol: 'PIRATE',
    },
    {
        address: '0x63d55ecDEbF08f93D0F2D5533035ddcCaa997d7A',
        symbol: 'ETHVAULT',
    },
    {
        address: '0x651BfbB26455294408Aabc61a7ADF427bf149898',
        symbol: 'Mello',
    },
    {
        address: '0x6623929052aeC6D5279A8096AA83F1d5085D94dB',
        symbol: 'DOGETIME',
    },
    {
        address: '0x66696AB8c6aAeb22dc14a2Dc4A833682388Ea901',
        symbol: 'BWC',
    },
    {
        address: '0x6826DdFD0fefB094F298a85c92FbbfCcaB0B3e8E',
        symbol: 'RES',
    },
    {
        address: '0x6855f7bb6287F94ddcC8915E37e73a3c9fEe5CF3',
        symbol: 'STACK',
    },
    {
        address: '0x68590a47578E5060a29fd99654f4556dBfa05D10',
        symbol: 'SMRAT',
    },
    {
        address: '0x68848E1d1fFd7B38D103106C74220c1ad3494AFC',
        symbol: 'RBunny',
    },
    {
        address: '0x691D658ecDC3554672Ba007335cC139BFe67bab9',
        symbol: 'DKC',
    },
    {
        address: '0x6c1dE9907263F0c12261d88b65cA18F31163F29D',
        symbol: 'OCTI',
    },
    {
        address: '0x6F2aFbF4f5e5e804C5b954889d7Bf3768A3C9a45',
        symbol: 'HOPE',
    },
    {
        address: '0x70e8E3bC1EF8c5B9fe297C63B297612d51E575d1',
        symbol: 'Antano',
    },
    {
        address: '0x7177A01e444cf50703bDe5e9Ae32D2C677EF60E8',
        symbol: 'ORN',
    },
    {
        address: '0x720bd0B5f066BeE4965e964F79D8eAE196f99311',
        symbol: '$HONEY',
    },
    {
        address: '0x7242E0090c795d7170F3082a640559ae79d487d1',
        symbol: 'SOL',
    },
    {
        address: '0x728f8D003109d7b895cc5805FFC973de2bAd9dEf',
        symbol: 'TOP',
    },
    {
        address: '0x72A634a80D7Dd48f83785BcD04Fc603418f99ef7',
        symbol: 'BEXT',
    },
    {
        address: '0x74A6E371F95073005b3a5fAF4A9E25aE30290F94',
        symbol: 'CATBREAD',
    },
    {
        address: '0x75CC31D9a061Fdbc29739E42b763eec434dFd1D0',
        symbol: 'RagingADA',
    },
    {
        address: '0x76076880e1EBBcE597e6E15c47386cd34de4930F',
        symbol: 'OPUS',
    },
    {
        address: '0x76F34cd142ca4a5ea2E197ebffbF5234A1c29268',
        symbol: 'TITAN',
    },
    {
        address: '0x77065EeF5d448aD0F76A03886CE0fB46861B8aB0',
        symbol: 'NFD',
    },
    {
        address: '0x77A7c645144fC52faae64C72D60C8F9207ae2340',
        symbol: 'CoinMama',
    },
    {
        address: '0x785D6a4613bBf5E82DEcf41bD6226867B54272D6',
        symbol: 'LuckyBabyDoge',
    },
    {
        address: '0x7869044D36ea75975B793ca4312608cc3817895B',
        symbol: 'SENSI',
    },
    {
        address: '0x7888CbEE13cF9569249c84B448E93e10DaE0053C',
        symbol: 'MARIO',
    },
    {
        address: '0x793b6Dc07760528954C2bAd6ad129268B0347980',
        symbol: 'PUBG',
    },
    {
        address: '0x7c8Af9e06d1c06E54bd98D3FB842Afb731e0d577',
        symbol: 'KMT',
    },
    {
        address: '0x7cb32004bBA1da444FBF88FB4c46f51bbd98dd3B',
        symbol: 'ShibaThugLife',
    },
    {
        address: '0x7Ddc52c4De30e94Be3A6A0A2b259b2850f421989',
        symbol: 'GMT',
    },
    {
        address: '0x7e47998e7174d723b06Ccf7E4516af815a2D7046',
        symbol: 'NA7A',
    },
    {
        address: '0x7e52a123Ed6DB6Ac872A875552935fBbD2544c86',
        symbol: 'SYL',
    },
    {
        address: '0x7E5d52C3335C91Af0da392BEa4BB9e43F2AbA62C',
        symbol: 'Sheesh',
    },
    {
        address: '0x7EBc08B3D43c3989F2CdfB6aEFADAf28bC148665',
        symbol: 'TRM',
    },
    {
        address: '0x7Ee7F14427cC41D6dB17829eb57Dc74A26796b9D',
        symbol: 'MOONRISE',
    },
    {
        address: '0x7ef21B7B146b25068AF97b24D8B06D879199CFb1',
        symbol: 'Moon LTC',
    },
    {
        address: '0x80BD8DcEBE65A800faA5964fB58B2d02c9b2E888',
        symbol: 'ANTY',
    },
    {
        address: '0x818CEE824f8CaEAa05Fb6a1f195935e364D52Af0',
        symbol: 'Cake',
    },
    {
        address: '0x82b85748c9C30624998d4F83bE6Ab8013b88D9a7',
        symbol: 'VEC',
    },
    {
        address: '0x84A6c7123709A9f1e7a323B96f981A04c8f282CE',
        symbol: '$PENALTY',
    },
    {
        address: '0x8776884a06cB51044ED921E7Fa964D5fA3a0a16b',
        symbol: '$RVLVR',
    },
    {
        address: '0x8780fEA4C6b242677D4A397fE1110AC09Ce99ad2',
        symbol: 'BIRD',
    },
    {
        address: '0x891E4554227385c5c740F9B483E935E3CbC29F01',
        symbol: 'RBT',
    },
    {
        address: '0x893F9C19e2b9f7865f6d0f953C38B34A3a6c17cF',
        symbol: 'BTCR',
    },
    {
        address: '0x8Ac25bC121ea3E727C84AC1F2ED683411Bd7349e',
        symbol: 'BULL',
    },
    {
        address: '0x8d32605B25921B548EEfcCDABc11e46543597Aa7',
        symbol: 'BT',
    },
    {
        address: '0x8D3E3A57c5F140B5f9Feb0d43D37A347ee01c851',
        symbol: 'CMERGE',
    },
    {
        address: '0x8dA443F84fEA710266C8eB6bC34B71702d033EF2',
        symbol: 'CTSI',
    },
    {
        address: '0x8DDD62949700937458A5C6535d1Ee5DbEBE62B77',
        symbol: 'CMD',
    },
    {
        address: '0x8E56f77fbD2f58256f8Ab81C6BB7eED0959ACE04',
        symbol: 'VAL',
    },
    {
        address: '0x8e87DB40C5E9335a8FE19333Ffc19AD95C665f60',
        symbol: 'DOO',
    },
    {
        address: '0x9015bE4D38e7DF2DC2715bb393Fc52a7d8e01073',
        symbol: 'LBNB',
    },
    {
        address: '0x904d2E72D76f502609d0d1B87c06074D7f29f796',
        symbol: 'QANX',
    },
    {
        address: '0x90c7e271F8307E64d9A1bd86eF30961e5e1031e7',
        symbol: 'DANGERMOON',
    },
    {
        address: '0x9176fDD9645937CFD3415EaEf9fcc59d48237AF7',
        symbol: 'AkitaBall',
    },
    {
        address: '0x9358A2c091444B5A319c4B966dCecB561ae9F2d9',
        symbol: 'PDoX',
    },
    {
        address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
        symbol: 'Helmet',
    },
    {
        address: '0x95AB219126EF4902eDd15AA710E723f496a8D6F0',
        symbol: '$SNF',
    },
    {
        address: '0x967d417ED58EFB0c428F3F4c8514038Ff1e93200',
        symbol: 'LZR',
    },
    {
        address: '0x97F4e15606cf335B7a6DAEC2BA02449Fb5Da69C6',
        symbol: 'VANCATDOG',
    },
    {
        address: '0x9853A30C69474BeD37595F9B149ad634b5c323d9',
        symbol: 'TENDIE',
    },
    {
        address: '0x987BBF060479E06784F8e59d0ca7FA02A47f3986',
        symbol: 'NFT CAR',
    },
    {
        address: '0x994c82eDFA25fBB9840EA724952E88040Cc02D80',
        symbol: 'AM',
    },
    {
        address: '0x9A2f5556e9A637e8fBcE886d8e3cf8b316a1D8a2',
        symbol: 'BIDR',
    },
    {
        address: '0x9bcaB88763c33a95e73bc6DCf80fcf27a77090b2',
        symbol: 'VICS',
    },
    {
        address: '0x9c9d4302A1A550b446401e56000F76Bc761C3A33',
        symbol: 'GLASS',
    },
    {
        address: '0x9ce5222A0419cc4d25Ece978AAA5d8C31b3565E6',
        symbol: 'GROUPER',
    },
    {
        address: '0x9D986A3f147212327Dd658F712d5264a73a1fdB0',
        symbol: 'LAND',
    },
    {
        address: '0x9DAAa05946e486ADd2c81e0d32D936866B8449D9',
        symbol: 'NSFW',
    },
    {
        address: '0x9dD6626e3dC415EB5DcBbeEB19bC345BfFe388a2',
        symbol: 'LBNB',
    },
    {
        address: '0x9F0F7aCC4C49bfb8D5D65df0FC822fBC920b71DE',
        symbol: 'RB',
    },
    {
        address: '0x9fef7c407F2b9aD6FCc4B1F373060352a88fF932',
        symbol: 'BLOK',
    },
    {
        address: '0xa04F6F3F4EF9BBE7875ed2831C4C3fE22D908483',
        symbol: 'Baby',
    },
    {
        address: '0xa16976133D3450f78766ECaa1d743621E237e1A5',
        symbol: 'SUGAR',
    },
    {
        address: '0xa1faa113cbE53436Df28FF0aEe54275c13B40975',
        symbol: 'ALPHA',
    },
    {
        address: '0xa2Eb573862F1910F0537001a419Bd9B01e821c8A',
        symbol: 'LAVA',
    },
    {
        address: '0xA34b486681f85B34FBffcd2ED000B365d158f6cC',
        symbol: 'BOX',
    },
    {
        address: '0xA36D5e816A6e72c99A5B53dcAF964aF500436D3e',
        symbol: '$SOL',
    },
    {
        address: '0xa4dF555DcC41E97b17DBCa04E525ffc9F109B1C6',
        symbol: 'KILT',
    },
    {
        address: '0xA536F6459E104666b2C08118F5A835De311D8E47',
        symbol: 'TNGLv3',
    },
    {
        address: '0xA5d29bE4EC42d0bA11735aC8e1e7E98Ec9b71a13',
        symbol: '$BBUL',
    },
    {
        address: '0xa62cdd8e357Bb4407671f329dd3Dab975120c7F3',
        symbol: 'YCake',
    },
    {
        address: '0xA6fBFE3cD16BAcBc136Bf3c8c3237444FD535ebd',
        symbol: 'ASOL',
    },
    {
        address: '0xa75e17A061Ed826C65F138B7A85B44c5D3156afF',
        symbol: 'DINA',
    },
    {
        address: '0xa7d8524aaF1Adf07E509b5AD6f5D76E2091FC9b6',
        symbol: 'LADYSHIBA',
    },
    {
        address: '0xA9baa624ec00eE09FA39F1Fd2AfDB26077AFF76f',
        symbol: 'THOGE',
    },
    {
        address: '0xAa7E7C03C6864ccA116D34EC5B7103b030dE5262',
        symbol: 'ElonX',
    },
    {
        address: '0xacb2d47827C9813AE26De80965845D80935afd0B',
        symbol: 'MCRN',
    },
    {
        address: '0xAD86d0E9764ba90DDD68747D64BFfBd79879a238',
        symbol: 'PAID',
    },
    {
        address: '0xAd9787017e82f6368BbE4893b475CaadA2258564',
        symbol: 'BTA',
    },
    {
        address: '0xadadFbb09D4B07e3eE2C4140aE420CCA28a85D48',
        symbol: '$TIME',
    },
    {
        address: '0xaFF9084f2374585879e8B434C399E29E80ccE635',
        symbol: 'FLUX',
    },
    {
        address: '0xb21225F833f2Fb1BE7d88Ee5347aae001F5b5DB1',
        symbol: 'SPAY',
    },
    {
        address: '0xb26D2d67C7652f361b73552310dA5753041b3867',
        symbol: 'BPET',
    },
    {
        address: '0xb54A58cdC7d3fEFd93EA4454E0C1A23Da8bEdC6f',
        symbol: 'HOODRAT',
    },
    {
        address: '0xb5bEa8a26D587CF665f2d78f077CcA3C7f6341BD',
        symbol: 'POLIS',
    },
    {
        address: '0xb626213cb1D52Caa1eD71e2a0e62c0113eD8d642',
        symbol: 'HGHG',
    },
    {
        address: '0xB67754f5b4C704A24d2db68e661b2875a4dDD197',
        symbol: 'MIX',
    },
    {
        address: '0xB72842D6F5feDf91D22d56202802Bb9A79C6322E',
        symbol: 'MOMA',
    },
    {
        address: '0xB73569A56614867601cD330DEa8ab5a8f5570a2C',
        symbol: 'BurnDoge',
    },
    {
        address: '0xb7CEF49d89321e22dd3F51a212d58398Ad542640',
        symbol: 'MILK',
    },
    {
        address: '0xb84ddc645c27D4Dc4bFA325c946f9d89d3AfCc7a',
        symbol: 'BonusCake',
    },
    {
        address: '0xB913AA79a0365bC4d30c217aE2916E6E2c44c882',
        symbol: 'BASD',
    },
    {
        address: '0xb9654A42f0F5dCDEf5617DebF8bd048E33F180E7',
        symbol: 'THUNDERBNB',
    },
    {
        address: '0xBa07EED3d09055d60CAEf2bDfCa1c05792f2dFad',
        symbol: 'MiniDOGE',
    },
    {
        address: '0xbB58F5C1C7521F6dA845B76C75081505254377d7',
        symbol: 'WILDF',
    },
    {
        address: '0xBBe899c61198D1826a43e20ea19efC46E50c2B00',
        symbol: 'EnergyX',
    },
    {
        address: '0xBC2597D3f1F9565100582CDe02E3712D03B8B0f6',
        symbol: 'SMB SWAP',
    },
    {
        address: '0xBC3951F1D582f5637A76d8A915b1D2827A17941A',
        symbol: 'MNOP',
    },
    {
        address: '0xbcb24AFb019BE7E93EA9C43B7E22Bb55D5B7f45D',
        symbol: 'BSCS',
    },
    {
        address: '0xbCdfD50ead6b6da1970464985FAb894Fb83d17C0',
        symbol: 'TONE',
    },
    {
        address: '0xBd75e1012Ff55184993Bec5C344aA8b336fAccF1',
        symbol: 'RNT',
    },
    {
        address: '0xBddfE03f24C09505fB2DB5F9dF1589DAB17DdaAe',
        symbol: 'MINIBNB',
    },
    {
        address: '0xc00B4222FC8B187eAc146257Ce72DF062E3964Bd',
        symbol: 'ETHD',
    },
    {
        address: '0xC0366a104b429f0806BfA98d0008DAA9555b2BEd',
        symbol: 'SMARS',
    },
    {
        address: '0xC070C8Ae94977f78d04553D33449DEf944F24254',
        symbol: 'TCGCoin',
    },
    {
        address: '0xc0994Af94FEe0361A1e1E1ccf72BCe19d5FD86FB',
        symbol: 'RICH',
    },
    {
        address: '0xC0C6e4C6E70c6231b20979Bda581a66f062A7967',
        symbol: 'bATRI',
    },
    {
        address: '0xC18d6243AC5452aF85F298F9551091deD6bBF465',
        symbol: 'SHIBBRO',
    },
    {
        address: '0xc1CbFB96A1D5361590b8DF04EF78DE2fa3178390',
        symbol: 'PCHF',
    },
    {
        address: '0xc1e667Cf9315FB80674E5cf62ad150Ac90fE7112',
        symbol: 'TIKTOK',
    },
    {
        address: '0xc23997371bd83de427b41DAbE11846C87696f40a',
        symbol: 'cEvo',
    },
    {
        address: '0xc2CB89bBB5BBA6E21db1dFe13493Dfd7dCBabD68',
        symbol: '$MANGA',
    },
    {
        address: '0xC3241e7bECd724b887e12a13eC580200Cd6E6bC7',
        symbol: 'NERA',
    },
    {
        address: '0xC37b0F85f559f88473410f43FB6F60c78a3D8771',
        symbol: 'PAPOY',
    },
    {
        address: '0xc3A84f355253f16F9014b16b023E59cB8f21A108',
        symbol: 'UnME',
    },
    {
        address: '0xC3aee69E8f1a14EE6C2593fe0b34CD0FB966D85C',
        symbol: 'WCT',
    },
    {
        address: '0xc41689A727469C1573009757200371edf36D540e',
        symbol: 'DYNA',
    },
    {
        address: '0xC425664697Da6966a172DAfe8461f4fB17e13832',
        symbol: 'LOOT',
    },
    {
        address: '0xc49DDe62B4A0810074721fAcA54Aab52369f486a',
        symbol: 'PKR',
    },
    {
        address: '0xC4B7a73E5B1A3Ab0fcb72872E04157aF9C581faF',
        symbol: 'ULTBNB',
    },
    {
        address: '0xc53708664b99DF348dd27C3Ac0759d2DA9c40462',
        symbol: 'GUM',
    },
    {
        address: '0xC62eF0d8e137499833AbB05Dee47007D2b334bA6',
        symbol: 'GMX',
    },
    {
        address: '0xc630Af5Af786D461168300CCcD641Db4607A4b9e',
        symbol: 'WDG',
    },
    {
        address: '0xc6604D3e9dC6494098Dab71E56A4518344d9825a',
        symbol: 'PAYA',
    },
    {
        address: '0xc6660965869fae1776F83B56e68e32555067Ea85',
        symbol: 'bXUNI',
    },
    {
        address: '0xC66c8b40E9712708d0b4F27c9775Dc934B65F0d9',
        symbol: 'ETCH',
    },
    {
        address: '0xc714F62E82B01fe44D1C86cD72Ee95Cc9D8D9734',
        symbol: 'GTLN',
    },
    {
        address: '0xC72cC401122dBDC812EC88a2150AAD5a39467401',
        symbol: 'WSWAP',
    },
    {
        address: '0xc732B6586A93b6B7CF5FeD3470808Bc74998224D',
        symbol: 'KMON',
    },
    {
        address: '0xC77457D712Ec2ABFc4b098db3cB9134041d0aA85',
        symbol: '$TIME',
    },
    {
        address: '0xc77Dd3AdE7b717583E0924466E4E474A5673332c',
        symbol: 'BSTS',
    },
    {
        address: '0xc7Ad2CE38f208eED77a368613C62062fCE88f125',
        symbol: 'AER',
    },
    {
        address: '0xc80c5E6888C8671b7c5C0a8505db03eF01fB0EeF',
        symbol: 'bDEVIL',
    },
    {
        address: '0xc80F6C08Df38dA4B1B0377748A9CF7196954C676',
        symbol: 'RDOGE',
    },
    {
        address: '0xC828dEA19B9d68214a140620089853d4A70413bd',
        symbol: 'GDR',
    },
    {
        address: '0xc845341377C68b8003485036c3163b8DBcf8acb2',
        symbol: 'SW',
    },
    {
        address: '0xC878126b1609168fC7e416D16EEDb16d25157d44',
        symbol: 'BNBDOGE',
    },
    {
        address: '0xc8E8ecB2A5B5d1eCFf007BF74d15A86434aA0c5C',
        symbol: 'DRS',
    },
    {
        address: '0xC92756d42C23534397f86EC10e7Da1A21dd8298b',
        symbol: 'USDaily',
    },
    {
        address: '0xc9457161320210D22F0D0d5fC1309Acb383d4609',
        symbol: 'DOV',
    },
    {
        address: '0xC95Eec280A392820e9bc332b71FDd35D646F5302',
        symbol: 'AST',
    },
    {
        address: '0xc9Ad37E9Baf41377540Df5a77831Db98c1915128',
        symbol: 'GINUX',
    },
    {
        address: '0xcA1262e77Fb25c0a4112CFc9bad3ff54F617f2e6',
        symbol: 'WJXN',
    },
    {
        address: '0xCA3D712Cb310181Eafc82cF8a055EC36d4C9994b',
        symbol: 'DRACO',
    },
    {
        address: '0xCa3F508B8e4Dd382eE878A314789373D80A5190A',
        symbol: 'BIFI',
    },
    {
        address: '0xCA69C118Fa550387794d48900a866891217E5C9F',
        symbol: 'MOK',
    },
    {
        address: '0xCB7A1Dc3a40FB64eA57D297Cef439A103fc11E66',
        symbol: 'MILF',
    },
    {
        address: '0xcbcCf14B051947BDcd1E20b77015208a1AD5EA25',
        symbol: 'PROMISE',
    },
    {
        address: '0xcbE921fE4688862B84f1EDB2b1829F31E5908fd5',
        symbol: 'MOBI',
    },
    {
        address: '0xcc10c8AfD683c5AA86B1d170d75B555bce5a2C37',
        symbol: 'Xpose',
    },
    {
        address: '0xCC42724C6683B7E57334c4E856f4c9965ED682bD',
        symbol: 'MATIC',
    },
    {
        address: '0xCCcE542413528CB57B5761e061F4683A1247aDCB',
        symbol: 'SCAN',
    },
    {
        address: '0xCD40F2670CF58720b694968698A5514e924F742d',
        symbol: 'ODDZ',
    },
    {
        address: '0xcD657182A749554fc8487757612F02226355269d',
        symbol: 'MUSK',
    },
    {
        address: '0xCd77880edea8E7D1f2be011BE560B45B96Ba68Ad',
        symbol: 'PAPP',
    },
    {
        address: '0xCD95B05Ebe61244de4dF9c2C4123920F016a06DF',
        symbol: 'ROF',
    },
    {
        address: '0xCddb1F2E312a1adC3b821Cf41c5288fdcb9A01B7',
        symbol: 'DSC',
    },
    {
        address: '0xce4A4A15FcCD532eAd67BE3ECf7e6122c61D06bb',
        symbol: 'THUNDERCAKE',
    },
    {
        address: '0xCf2EAF1E0D0397260FA27cc652Bb1ce6d87AeaD4',
        symbol: 'NOAH',
    },
    {
        address: '0xCF9f991b14620f5ad144Eec11f9bc7Bf08987622',
        symbol: 'PORNROCKET',
    },
    {
        address: '0xCfD6bfa161413727318C4DE34bF633a3f8C7FeD0',
        symbol: 'INTIM8',
    },
    {
        address: '0xCFEfA64B0dDD611b125157C41cD3827f2e8e8615',
        symbol: 'KPAD',
    },
    {
        address: '0xD024Ac1195762F6F13f8CfDF3cdd2c97b33B248b',
        symbol: 'MiniFootball',
    },
    {
        address: '0xd0399f9FBBA65B0e479635c870d4BD3BB89be597',
        symbol: 'RCNS',
    },
    {
        address: '0xd12bf451084682970889b5CB394A69e27C654e27',
        symbol: 'TEQUILA',
    },
    {
        address: '0xd15CeE1DEaFBad6C0B3Fd7489677Cc102B141464',
        symbol: 'COVAL',
    },
    {
        address: '0xd27D3F7f329D93d897612E413F207A4dbe8bF799',
        symbol: 'MOONSHOT',
    },
    {
        address: '0xD39a081B9d368FCA3D90054A5d78478776C8909b',
        symbol: 'LEAF',
    },
    {
        address: '0xD3b77Ac07c963b8cEAD47000A5208434D9A8734d',
        symbol: 'TREES',
    },
    {
        address: '0xD50f71d0Cc64C228074332cd3c597a63556BdB67',
        symbol: 'ORE',
    },
    {
        address: '0xd52F55215d88EE3333A6875bF024beffC5c9D09B',
        symbol: 'GEST',
    },
    {
        address: '0xd54Fd5D0C349C06373f3FE914151D1555b629fB6',
        symbol: 'BTCA',
    },
    {
        address: '0xD585F9C5953CA97DA3551f20725a274c9e442ff3',
        symbol: 'PEG',
    },
    {
        address: '0xD589699b20903fC061701Ad6A35Cb78Bb5Dd734E',
        symbol: 'DRE',
    },
    {
        address: '0xd5ED16B7e253Bf179c8748FFb62A725fecA6D1AF',
        symbol: 'TIKTOK',
    },
    {
        address: '0xd5fd8C4988b1B9b5a996D5681aAc3933876Faab6',
        symbol: 'TIME',
    },
    {
        address: '0xD675fF2B0ff139E14F86D87b7a6049ca7C66d76e',
        symbol: 'DFL',
    },
    {
        address: '0xD74b782E05AA25c50e7330Af541d46E18f36661C',
        symbol: 'QUACK',
    },
    {
        address: '0xD80BeA63a208770e1c371DFBF70Cb13469D29Ae6',
        symbol: 'xAGC',
    },
    {
        address: '0xD83cec69ED9d8044597A793445C86a5e763b0E3D',
        symbol: 'STOPELON',
    },
    {
        address: '0xd8A31016cD7da048ca21FFE04256C6d08C3A2251',
        symbol: 'WENLAMBO',
    },
    {
        address: '0xd9178dDDa9e50e055f382f28741ECB5FaCb0181D',
        symbol: 'MOUSSE',
    },
    {
        address: '0xd92071d4D5eCaE0f0995dB00A9259D00429FbFDE',
        symbol: 'SHT',
    },
    {
        address: '0xD97ef5B3d8C793474232F656e611526A1751d433',
        symbol: 'BKC',
    },
    {
        address: '0xDA2946536a6e92879049fE0fAa29B7e5d8000BF8',
        symbol: 'GNP',
    },
    {
        address: '0xdA29Eac781F103EB18e6c78701EC93C26219836E',
        symbol: 'DUNK',
    },
    {
        address: '0xdB238123939637D65a03E4b2b485650B4f9D91CB',
        symbol: 'TASTE',
    },
    {
        address: '0xdB29192Fc2B487BB5185e155752328d4f249743C',
        symbol: 'UNFT',
    },
    {
        address: '0xDB5C767157b73C6f5347BdaBeF196d9818554C30',
        symbol: 'YUCT',
    },
    {
        address: '0xDcb243aEE03cb7e84D521cA70e5071252e722022',
        symbol: 'GRILLZ',
    },
    {
        address: '0xDcb624C870d73CDD0B3345762977CB14dE598cd0',
        symbol: 'YFIH2',
    },
    {
        address: '0xDcEc8F02478ED8ab432a658e77065A5Dc2C2e42a',
        symbol: 'Time',
    },
    {
        address: '0xDd848E0CbFD3771dC7845B10072d973C375271e2',
        symbol: 'LANC',
    },
    {
        address: '0xDDFE35725dcA3068C95E27a5620CcD78f74eCD72',
        symbol: 'MiniFighter',
    },
    {
        address: '0xdE009cB3371825bAfb80A01004C58f8166EE13D5',
        symbol: 'LUD',
    },
    {
        address: '0xDE13A4f5236E9E44388A90a9F5cCfC8Ed5041f73',
        symbol: 'BOOM',
    },
    {
        address: '0xdFa3b0019EcF48c753B58908B5A21d11641bA56f',
        symbol: 'TAU',
    },
    {
        address: '0xdFF8cb622790b7F92686c722b02CaB55592f152C',
        symbol: 'TEN',
    },
    {
        address: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
        symbol: 'BAKE',
    },
    {
        address: '0xe069Af87450fB51Fc0d0E044617f1C134163e591',
        symbol: 'VPP',
    },
    {
        address: '0xe0Cb8eA2b5E7009Db0a196c6d3389453266876df',
        symbol: 'MONI',
    },
    {
        address: '0xe0d02C755cf7Bb93772b8874b4df672A5e88041F',
        symbol: 'LUCKY',
    },
    {
        address: '0xe0F94Ac5462997D2BC57287Ac3a3aE4C31345D66',
        symbol: 'CEEK',
    },
    {
        address: '0xE17E933e1A4b4242C324af391d2cF1bDf21Fe8D0',
        symbol: 'MTix',
    },
    {
        address: '0xe1Faa1CD332f45e2808f8D42dC6B8451B4450Be0',
        symbol: 'Nevolet Coin',
    },
    {
        address: '0xe2a59D5E33c6540E18aAA46BF98917aC3158Db0D',
        symbol: 'UFI',
    },
    {
        address: '0xe2e6e66551E5062Acd56925B48bBa981696CcCC2',
        symbol: 'VAULT',
    },
    {
        address: '0xE2e7329499E8DDb1f2b04EE4B35a8d7f6881e4ea',
        symbol: '$ANRX',
    },
    {
        address: '0xe39e2861AE9a45FA321c1B0155D2f99196b2A992',
        symbol: 'ELOIN',
    },
    {
        address: '0xE40255C5d7fa7ceEc5120408C78C787CECB4cfdb',
        symbol: 'SWGb',
    },
    {
        address: '0xE46090CA610D064BE8D3C2Cb6c90CD18ce66650E',
        symbol: 'DAM',
    },
    {
        address: '0xE4FAE3Faa8300810C835970b9187c268f55D998F',
        symbol: 'CATE',
    },
    {
        address: '0xE540980f909873370bBE9C19Db7c3B5ba4DEF701',
        symbol: 'iLayer',
    },
    {
        address: '0xe5604B81C299dB6Ae91a4aD98519BddbeB3341Db',
        symbol: '$GRENADA',
    },
    {
        address: '0xe586A0AF5f3844F1408FEd1d284270827a116010',
        symbol: 'VDV',
    },
    {
        address: '0xE5904E9816b309d3eD4d061c922f5aa8f3B24C92',
        symbol: 'NFTL',
    },
    {
        address: '0xe5D46cC0Fd592804B36F9dc6D2ed7D4D149EBd6F',
        symbol: 'SGO',
    },
    {
        address: '0xe62ae6Bf3817196d1122683df1aE4019014dD0b5',
        symbol: 'MOON',
    },
    {
        address: '0xE6A4C9B3575AE066c485e1B092294CE69c168739',
        symbol: 'JRN',
    },
    {
        address: '0xe7a065FC41889179D32D9D0157fD83265B2c6DDa',
        symbol: 'SUNDAE',
    },
    {
        address: '0xE82896EDb055B3B4060877c369b960DFbB1965D7',
        symbol: 'USDAILY',
    },
    {
        address: '0xE84b921A39befBfebc5C8f22B640bE3239975b8F',
        symbol: 'INSTINCT',
    },
    {
        address: '0xE84CdB6AC1FfA237D7F5626754029Ab7831d4a6E',
        symbol: 'CakeReward',
    },
    {
        address: '0xe8670901E86818745b28C8b30B17986958fCe8Cc',
        symbol: 'XCT',
    },
    {
        address: '0xe896139Db963FF8C3D131658418Af5c3f7D80D3e',
        symbol: 'ECC',
    },
    {
        address: '0xEA01a1a3CF143f90b4aC6D069Bd369826574CD45',
        symbol: 'XXT',
    },
    {
        address: '0xeA50BB9bE7ca176384C89BB3a3D1ADa69B472E58',
        symbol: 'Alien',
    },
    {
        address: '0xEb18C4394b50bda5Ba423ea7b524C57a2b2ed6df',
        symbol: '🐶SHIB',
    },
    {
        address: '0xeb82389c3EbE77298106Af70a5031463C1822077',
        symbol: 'WANDER',
    },
    {
        address: '0xEC33a3B177cf4Ce8E8D2810A0A0EDEC6B5ad92F0',
        symbol: 'TICKETS',
    },
    {
        address: '0xEc807CB9161A7E2281f155A324C724fbC689CA4A',
        symbol: 'BNFT',
    },
    {
        address: '0xed0294dbd2a0e52a09c3F38a09F6e03de2C44fCf',
        symbol: 'CHNG',
    },
    {
        address: '0xeDAF1F5B8078d4feb4E13c8d5A2c8dE1365be7b6',
        symbol: 'ALTRUCOIN',
    },
    {
        address: '0xEe0847B54772cBAD3A3387C1E300B85F271bD697',
        symbol: 'CFT',
    },
    {
        address: '0xeE09Fd8E5F8cDd9A88A7a886B3959D4Fb14D906c',
        symbol: 'Arena',
    },
    {
        address: '0xEe4e2A75B3ecf6766a24234fb80AC944ce58d43E',
        symbol: 'MetaBattle',
    },
    {
        address: '0xEF2ec90e0b8D4CdFdB090989EA1Bc663F0D680BF',
        symbol: 'ORFANO',
    },
    {
        address: '0xEF34f878ff1607d4844E237501687c813693259a',
        symbol: 'DCandy',
    },
    {
        address: '0xef72Cf16DDC0407175dC7260774f403E034Dd245',
        symbol: 'ind',
    },
    {
        address: '0xEFa28173878130C12ABe8349D4295B0e54dCf939',
        symbol: 'RMC',
    },
    {
        address: '0xEfbC51BaEAb86186c0caDdcA5CCae20737669a46',
        symbol: 'RMK',
    },
    {
        address: '0xEffE44D3f6692Ec8D0bDCE980293087BfaFe905e',
        symbol: 'SPDX',
    },
    {
        address: '0xf0358a286940f91bF4F714ab4A2D0c3f921d3bb3',
        symbol: '$Time',
    },
    {
        address: '0xf07DFc2AD28AB5B09E8602418d2873Fcb95e1744',
        symbol: 'IPAD',
    },
    {
        address: '0xF0888F476bE4057E22CC938C93817a360b7b6dd4',
        symbol: '$MINISHARK',
    },
    {
        address: '0xF0902eB0049A4003793BAb33F3566A22D2834442',
        symbol: 'GLCH',
    },
    {
        address: '0xf09b7B6bA6dAb7CccC3AE477a174b164c39f4C66',
        symbol: 'MOONPIRATE',
    },
    {
        address: '0xF0A9BfbFA3dFdDD1563bCc6DEf719da8D9c97b87',
        symbol: 'SMON',
    },
    {
        address: '0xF19b09DA89722F0a6960F9bF9701A63AE891603A',
        symbol: 'TTH',
    },
    {
        address: '0xf1A52eFa2620Bc47F09c669516CCB7248c10B1a1',
        symbol: 'DXM',
    },
    {
        address: '0xF218184Af829Cf2b0019F8E6F0b2423498a36983',
        symbol: 'MATH',
    },
    {
        address: '0xf275e1AC303a4C9D987a2c48b8E555A77FeC3F1C',
        symbol: 'DPS',
    },
    {
        address: '0xf2E00684457de1a3C87361bC4BfE2DE92342306C',
        symbol: 'SHIELDNET',
    },
    {
        address: '0xf411fDF64E809CAA342927B3e269a520EA743A4b',
        symbol: 'PhoebeFinance',
    },
    {
        address: '0xf4206e5F264420630520e0D23c14D8Dd5645e6C3',
        symbol: 'LUNAR',
    },
    {
        address: '0xf4341fA52669cea0c1836095529A7E9B04b8b88D',
        symbol: 'SATOZ',
    },
    {
        address: '0xf441a269619785707EfC53511A9B8152e48a9DE0',
        symbol: '$FBSCO',
    },
    {
        address: '0xF4476e7E0FCbC84ce730fec6749D37383f3aC39E',
        symbol: 'NST',
    },
    {
        address: '0xf483af09917bA63F1E274056978036d266EB56e6',
        symbol: 'BULL',
    },
    {
        address: '0xF4b5470523cCD314C6B9dA041076e7D79E0Df267',
        symbol: 'BBANK',
    },
    {
        address: '0xf57D0B57074a5Cf1cB0DD9453eb5af4e5174D157',
        symbol: 'REDSHIBA',
    },
    {
        address: '0xF6530899dE1dAaE4388E1286EBa6379d7DDf9c8F',
        symbol: 'AURO',
    },
    {
        address: '0xF6Cb4ad242BaB681EfFc5dE40f7c8FF921a12d63',
        symbol: 'CNS',
    },
    {
        address: '0xF6F43EBd2E5090C0D62200Dbd5ECD2971eE9bDDf',
        symbol: 'ATLAS',
    },
    {
        address: '0xF73d8276C15Ce56b2f4AeE5920e62F767A7f3aEA',
        symbol: 'TCG2',
    },
    {
        address: '0xF750A26EB0aCf95556e8529E72eD530f3b60f348',
        symbol: 'GNT',
    },
    {
        address: '0xF7844CB890F4C339c497aeAb599aBDc3c874B67A',
        symbol: 'NFTART',
    },
    {
        address: '0xf78Bbc835b52D7f0e9538C3566997bA2bf050B85',
        symbol: 'SKYBORN',
    },
    {
        address: '0xf7BF4507336AeA836ab5575eC1801d96c3059483',
        symbol: 'SLOKI',
    },
    {
        address: '0xf8cdb0A8DeF55443f5abB385321Ca705EC9D0eEd',
        symbol: 'DogeDealer',
    },
    {
        address: '0xf8D954168FbbF579F8FAd5F7583d4f76f10AE97D',
        symbol: 'ALLEY',
    },
    {
        address: '0xf8E026dC4C0860771f691EcFFBbdfe2fa51c77CF',
        symbol: 'BGOV',
    },
    {
        address: '0xF94CA0B303e52d68b63626Bed7f680fa4DC3f779',
        symbol: 'DOG',
    },
    {
        address: '0xfAEce5aCc269774Eb1D544Ee8D45671A55516296',
        symbol: 'DGO',
    },
    {
        address: '0xfAEFe2e0D056243060A6f640d5735CAE307001C4',
        symbol: 'OSM',
    },
    {
        address: '0xfb288d60D3b66F9c3e231a9a39Ed3f158a4269aA',
        symbol: 'PPAY',
    },
    {
        address: '0xFB6394c0B213E6fE374BDB0F05f467254dBcDA5a',
        symbol: 'UPTREND',
    },
    {
        address: '0xFC206f429d55c71cb7294EfF40c6ADb20dC21508',
        symbol: 'DeHub',
    },
    {
        address: '0xFc3E10aB441fB357D80db42d0EB2eba719e9DD7c',
        symbol: 'FARMHUB',
    },
    {
        address: '0xFCcb3A2410860e2a07526566a91686e6b06320f4',
        symbol: 'MuskDoge',
    },
    {
        address: '0xfd290c590866f8282d89671A85Ac9964b165d682',
        symbol: 'SUB',
    },
    {
        address: '0xFd7B3A77848f1C2D67E05E54d78d174a0C850335',
        symbol: 'ONT',
    },
    {
        address: '0xfE1d7f7a8f0bdA6E415593a2e4F82c64b446d404',
        symbol: 'BLP',
    },
    {
        address: '0xBBc5418843a6dADD84eE70205124d8b8c4A6f816',
        symbol: 'eFAME',
    },
    {
        address: '0xBbE18bea525aeAbF505e613e29c2076b7d8780F3',
        symbol: 'TREE',
    },
    {
        address: '0xbbF3657F5D1b84fc4E291A1205856B3Ea37e578b',
        symbol: 'BEX',
    },
    {
        address: '0xBCA627FEd3b6E8F414C745E12B2b89371497779D',
        symbol: 'QUANT',
    },
    {
        address: '0xbcf39F0EDDa668C58371E519AF37CA705f2bFcbd',
        symbol: 'pCWS',
    },
    {
        address: '0xBD2C43Da85d007B0b3cd856FD55c299578D832bC',
        symbol: 'LQT',
    },
    {
        address: '0xBdA2354867EDb7B61cC328D6D2B4f58CFbd37C81',
        symbol: 'SPHERE',
    },
    {
        address: '0xBDAC5C8bc3FF38083437bB712D55b668F44F6DF1',
        symbol: 'SIMA',
    },
    {
        address: '0xBE2a26889CE30a1515055a192797083B1FDe8844',
        symbol: 'STRIKE',
    },
    {
        address: '0xBe4628d7E02e9257875149FA4981C400a01A49A3',
        symbol: 'JAILDOGE',
    },
    {
        address: '0xbeE0AD76ebaA6fB514689a6476877aF71a79C2cF',
        symbol: 'NFTS',
    },
    {
        address: '0xBf6Ff49FfD3d104302Ef0AB0F10f5a84324c091c',
        symbol: 'NFTFY',
    },
    {
        address: '0xbF7c81FFF98BbE61B40Ed186e4AfD6DDd01337fe',
        symbol: 'EGLD',
    },
    {
        address: '0xc080ADF0a40A38Ffe05834174b8883e60eaff3F3',
        symbol: 'ALFA',
    },
    {
        address: '0xC0eFf7749b125444953ef89682201Fb8c6A917CD',
        symbol: 'HZN',
    },
    {
        address: '0xc1168B7B85B2BBc8a5C73c007B74E7523B2DA209',
        symbol: 'BABYBNB',
    },
    {
        address: '0xC13B7a43223BB9Bf4B69BD68Ab20ca1B79d81C75',
        symbol: 'JGN',
    },
    {
        address: '0xC1A12aB2d264024c316D7f7BB380cedB243Cd899',
        symbol: 'FTSHIBA',
    },
    {
        address: '0xC1E0510A0dF7646817b6632D32CaA681A425a5e6',
        symbol: 'CFL365',
    },
    {
        address: '0xc342774492b54ce5F8ac662113ED702Fc1b34972',
        symbol: 'BGEO',
    },
    {
        address: '0xc350CaA89Eb963D5D6b964324A0a7736D8d65533',
        symbol: 'INFTEE',
    },
    {
        address: '0xc44Bf5300bE9168795DEE25Daad0bcE5a8fb779A',
        symbol: 'BBSC',
    },
    {
        address: '0xC4B35d3A24E3e8941c5d87fD21D0725642F50308',
        symbol: 'PIE',
    },
    {
        address: '0xc5A49b4CBe004b6FD55B30Ba1dE6AC360FF9765d',
        symbol: 'SWAMP',
    },
    {
        address: '0xc5a72FC4324EF3fcEBAFf9b5E729487719Eb5B7A',
        symbol: 'TDW',
    },
    {
        address: '0xc5E6689C9c8B02be7C49912Ef19e79cF24977f03',
        symbol: 'ALPA',
    },
    {
        address: '0xC6015d6E1b4a002280fb93Eb9aC39E2461fF9495',
        symbol: 'ELONBALLS',
    },
    {
        address: '0xC623D9E8bF6812852A7AEDeD140D479095cfD941',
        symbol: 'EGG',
    },
    {
        address: '0xC64c9B30C981fc2eE4e13d0CA3f08258e725fd24',
        symbol: 'POLAR',
    },
    {
        address: '0xd522A1DcE1CA4B138DDA042a78672307eb124CC2',
        symbol: 'SWAPZ',
    },
    {
        address: '0xc705E5E54F8CFF7Fb204e2F8472cA05AB6a9a421',
        symbol: 'CYNS',
    },
    {
        address: '0xc74cD0042c837Ce59210857504eBb0859E06aA22',
        symbol: 'SAFUYIELD',
    },
    {
        address: '0xC836DCC9c880D4558C301e6d439db1B1DCaF7F3a',
        symbol: 'BNB GOLD',
    },
    {
        address: '0xc9508627E3786004F796d6851260D90330b5F50E',
        symbol: 'GCX',
    },
    {
        address: '0xC9521Db3f43084313617d41CE5cA7aC687a12619',
        symbol: 'UltiCurrency',
    },
    {
        address: '0xc98992b275721d065D1b6c413D7E652173bE8E7d',
        symbol: 'BABYNAFT',
    },
    {
        address: '0xca5f1Bd4B47ECe13a7ca753202F284D9Edd85d8A',
        symbol: '$BOOB',
    },
    {
        address: '0xcAC33Ce2734D30949F5a96f7d64851830fDa7AD9',
        symbol: 'FANTA',
    },
    {
        address: '0xCaC9881a8EeCc6e98Ff3E681Ab497F263Fa88437',
        symbol: 'BTCX',
    },
    {
        address: '0xCC712a9038564f57E3181b3Ca8D8396ec01D8bF2',
        symbol: 'MSB',
    },
    {
        address: '0xCCCBf2248ef3bd8d475Ea5dE8cb06e19F4591A8E',
        symbol: 'GWSPP',
    },
    {
        address: '0xcCe7F9eB881248E04f2975a3Fb3B62631ad9eE37',
        symbol: 'SLAM',
    },
    {
        address: '0xcD27AC184e387c1f544dc79Ae8c92eb3919CE282',
        symbol: 'IAR',
    },
    {
        address: '0xcD5D75Dbe75449A9021B6C570a41959eB571C751',
        symbol: 'LORY',
    },
    {
        address: '0xCda06Cd0acB76C4E4386cb27e8F5112Ba5912025',
        symbol: 'SD',
    },
    {
        address: '0xCE393C06594A5D91210Fd4f157Cd8F6D86006D57',
        symbol: 'AquaPig',
    },
    {
        address: '0xCE62F350cbd94397085cc42935EB108D2aA6beEc',
        symbol: '$JAVA',
    },
    {
        address: '0xce666D0e507C5F2Afe0671Ee29A99cfa97954c48',
        symbol: 'ADX',
    },
    {
        address: '0xCfB24d3C3767364391340a2E6d99c64F1CBd7A3D',
        symbol: 'LPOOL',
    },
    {
        address: '0xcfcEcFe2bD2FED07A9145222E8a7ad9Cf1Ccd22A',
        symbol: 'ADS',
    },
    {
        address: '0xd21d29B38374528675C34936bf7d5Dd693D2a577',
        symbol: 'PRQ',
    },
    {
        address: '0xd22246644d2BE5d0427a8E474477d96677C3eC24',
        symbol: 'FSWAP',
    },
    {
        address: '0x41540ba32dB90269Bb72A7bE1D4b1eE18F5544f1',
        symbol: 'FLAT',
    },
    {
        address: '0xD2618bC9c9cDC40ff19e200a7d14A09799C0a152',
        symbol: 'UDOGE',
    },
    {
        address: '0xd2fF8c018A22Ff06F4BE781090579d0490B9A69f',
        symbol: 'INFT',
    },
    {
        address: '0xd32d01A43c869EdcD1117C640fBDcfCFD97d9d65',
        symbol: 'NMX',
    },
    {
        address: '0xD3b71117E6C1558c1553305b44988cd944e97300',
        symbol: 'YEL',
    },
    {
        address: '0xD48474E7444727bF500a32D5AbE01943f3A59A64',
        symbol: 'BBT',
    },
    {
        address: '0xd4CB328A82bDf5f03eB737f37Fa6B370aef3e888',
        symbol: 'CREAM',
    },
    {
        address: '0xd4D2aBBeF1b26458504e7027233D5e7F09ea476d',
        symbol: 'MNWL',
    },
    {
        address: '0xD4d55B811d9eDe2aDce61a98d67d7f91bFfcE495',
        symbol: 'PulseDoge',
    },
    {
        address: '0xd4fBc57B6233F268E7FbA3b66E62719D74deecBc',
        symbol: 'MOD',
    },
    {
        address: '0xD5755285Cc67282e0147e5dc79be1ea420B18883',
        symbol: 'GAME',
    },
    {
        address: '0xd5E3E1e39a5c57F27f8890D8B91E05039F6BAcE7',
        symbol: 'SUNI',
    },
    {
        address: '0xD6bfB1087Ec22331BF2cc929bDb4aB191f743152',
        symbol: 'DogeCakes',
    },
    {
        address: '0xD70e14A878E068ee81e412ff88b9131d915bAb8e',
        symbol: '$MFeg',
    },
    {
        address: '0xd8a7A23E9a62F6BD9DbE76C4fEb267935948Cb7C',
        symbol: 'WONDERCAKE',
    },
    {
        address: '0xD98274562eb6e18f9DeecFF23E8164fF83861a6d',
        symbol: 'SPIRIT',
    },
    {
        address: '0xDA2230c7B52A4249E69C604c43fA5DB57809Be33',
        symbol: 'NBXB',
    },
    {
        address: '0xDa318675727A4CA6F823Dc794c13324F8B79f9ED',
        symbol: 'XHL',
    },
    {
        address: '0xda81440Dd054AeafDAEA1C12bcCbA3CC3B4470d9',
        symbol: 'DBubble',
    },
    {
        address: '0xDB021b1B247fe2F1fa57e0A87C748Cc1E321F07F',
        symbol: 'AMPL',
    },
    {
        address: '0xdb204787b41418263E212b859E5fA920769B3b4E',
        symbol: 'Satan',
    },
    {
        address: '0x43acEDd39Ba4B0bfcCd92897fCe617Fb90a971d8',
        symbol: 'sBANK',
    },
    {
        address: '0xdBaAa36B347d56b77Ce0e36f050fCeEBbF9fbc38',
        symbol: 'SPE',
    },
    {
        address: '0xDC42728B0eA910349ed3c6e1c9Dc06b5FB591f98',
        symbol: 'DTH',
    },
    {
        address: '0xdD70ccF7AE9dA25149D5AE35374633F24346607E',
        symbol: 'GUCCICAKE',
    },
    {
        address: '0xDDE5B33a56f3F1C22e5a6bd8429E6ad508BFF24E',
        symbol: 'VNDC',
    },
    {
        address: '0xdE097fEB7Ecc559bF71375ca9c4AB2ea1E3C58Bb',
        symbol: 'KGS',
    },
    {
        address: '0xDE619A9E0eEeAA9F8CD39522Ed788234837F3B26',
        symbol: 'HVI',
    },
    {
        address: '0xDe8fa069707B6322Ad45D001425b617F4F1930BD',
        symbol: 'LKT',
    },
    {
        address: '0xdECE0F6864c1511369ae2c30B90Db9f5fe92832c',
        symbol: 'DSCPL',
    },
    {
        address: '0xDfDec49462f7D3C3b0A48E729F77A0645CDFA7c0',
        symbol: 'GEMS',
    },
    {
        address: '0xdFF84d3cF15F778F8e1B894e91a44db105e6a586',
        symbol: 'ERRR',
    },
    {
        address: '0xfb55496700A91725CaD93C6A3dD20930b86d8501',
        symbol: 'EDFI',
    },
    {
        address: '0xe0Aa49428480Ed362efD4d105b0f8D64D76BEe56',
        symbol: 'CNFT',
    },
    {
        address: '0xe0b0C16038845BEd3fCf70304D3e167Df81ce225',
        symbol: 'CSWAP',
    },
    {
        address: '0xe17EA0B77054016Fb1C095aA30Be7088FF036BCD',
        symbol: 'FIRECAKE',
    },
    {
        address: '0xe1DB3d1eE5CfE5C6333BE96e6421f9Bd5b85c987',
        symbol: 'SAFESPACE',
    },
    {
        address: '0xE3894CB9E92ca78524Fb6a30Ff072FA5E533c162',
        symbol: 'ELP',
    },
    {
        address: '0xe3916A4DC3C952c78348379A62d66869D9B59942',
        symbol: 'STF',
    },
    {
        address: '0xE405f6Ae74ad3efD31C23A40CE23b3D3A3B95FB9',
        symbol: 'TOKI',
    },
    {
        address: '0xE4318F2aCf2b9c3f518A3a03B5412F4999970Ddb',
        symbol: 'RHYTHM',
    },
    {
        address: '0xe4B22193d68f18f8E8eB3a26F4D64cb6D4573022',
        symbol: 'MOZ',
    },
    {
        address: '0xE4Fba1EC6A3Bf2cF97cB72bC5502d501f6eB80Ad',
        symbol: 'SIM',
    },
    {
        address: '0xE51BB42f0F6D01B872cdc7e1764d53b2a81cf0aF',
        symbol: 'MOOLAH',
    },
    {
        address: '0xe540b81133C597b31c3A33E318E5bC0f3e78DfC9',
        symbol: 'OROS',
    },
    {
        address: '0xe57Fe79a93D01d9186d6A9fBA5cF71aEA3391F33',
        symbol: 'YAH',
    },
    {
        address: '0xe60eaf5A997DFAe83739e035b005A33AfdCc6df5',
        symbol: 'DERI',
    },
    {
        address: '0xe632101fB808DE2a37C07C214f036f586acfb366',
        symbol: 'CRE',
    },
    {
        address: '0xE6BF0E14e33A469F2b0640B53949A9F90E675135',
        symbol: 'PRARE',
    },
    {
        address: '0xe6EC0F206fb14E1081150091D8256611661d5C0C',
        symbol: 'STKF',
    },
    {
        address: '0xe77011ed703ed06927dBd78e60c549baBAbF913e',
        symbol: 'mBTC',
    },
    {
        address: '0xe792f64C582698b8572AAF765bDC426AC3aEfb6B',
        symbol: 'SWG',
    },
    {
        address: '0xE7df368e774976d0E21c4E6537aE4B07904D731d',
        symbol: 'SIMURGH',
    },
    {
        address: '0xE821FF93aCd958D8EF637ff9627217d28A5B6845',
        symbol: 'PTLKX',
    },
    {
        address: '0xE82B992dc7f1633B5063a409c8cA362E16766233',
        symbol: 'YOSHI',
    },
    {
        address: '0xE861DFf2099d15185B50dE380Db8249984Cb26Ea',
        symbol: 'WOT',
    },
    {
        address: '0xe898EDc43920F357A93083F1d4460437dE6dAeC2',
        symbol: 'TITAN',
    },
    {
        address: '0x0fEAdcC3824E7F3c12f40E324a60c23cA51627fc',
        symbol: 'Warden',
    },
    {
        address: '0x0530c188397CfeF801150ccD733F4ad2E809B0d6',
        symbol: '5050',
    },
    {
        address: '0x0921d788E7f7498f80adb0A0A62B8A9476F2Db92',
        symbol: 'VLK',
    },
    {
        address: '0x0FC013E24AE732fcEc9Eb6BF8CAE12782a56bE7E',
        symbol: 'LAMA',
    },
    {
        address: '0x111111111117dC0aa78b770fA6A738034120C302',
        symbol: '1INCH',
    },
    {
        address: '0x1E9829133A2701aA9F907A1305536c3aC05E602d',
        symbol: 'UOSS',
    },
    {
        address: '0x1f2cD43797806664D0bCE1eC4284aC83840D0bF1',
        symbol: 'BLENS',
    },
    {
        address: '0x22f3997A5DF5a80e29871FEd24fE3E85741F5E82',
        symbol: 'DAO',
    },
    {
        address: '0x2AcBd937fe107a99951283C72386d0dfd38dC60f',
        symbol: 'RoyalStars',
    },
    {
        address: '0x3132e21dF9B4C18900ED3721682072048F3eA48D',
        symbol: 'FOREX',
    },
    {
        address: '0x3Ae112f0fF3893C8e8675De170FD72406e9580F2',
        symbol: 'ZENNY',
    },
    {
        address: '0x42d1B21EaBE04D308148eA9Ab90Be674b64b4eef',
        symbol: 'ZFARM',
    },
    {
        address: '0x44836677FbedECaF0e7Ab32D6Dd082ef539b5f92',
        symbol: 'PROFITCAKE',
    },
    {
        address: '0x46328f831cFF23F44D65fa5e53a7217a660554Aa',
        symbol: 'HMOON',
    },
    {
        address: '0x47541848D3B3d9702Ed9a66e519bbacaCB45fD0d',
        symbol: 'Pie',
    },
    {
        address: '0x52ce7b689eAa83FCa5456CF9D56131103a950322',
        symbol: 'AGLD',
    },
    {
        address: '0x5D2F9a9DF1ba3C8C00303D0b4C431897eBc6626A',
        symbol: 'OMC',
    },
    {
        address: '0x5dFA2A5F5bb3A905513DC1aAEd0509bb2D0bb756',
        symbol: 'ATLAS',
    },
    {
        address: '0x64ae368f8C4E243aD471b182B8986836c1bD0FF8',
        symbol: 'SGOR',
    },
    {
        address: '0x64D3638a7d8747EEE7bD5D402CC5f5bD00dc27dc',
        symbol: 'sYSL',
    },
    {
        address: '0x651Cd665bD558175A956fb3D72206eA08Eb3dF5b',
        symbol: 'ROSN',
    },
    {
        address: '0x7e624FA0E1c4AbFD309cC15719b7E2580887f570',
        symbol: 'POLS',
    },
    {
        address: '0x88f1A5ae2A3BF98AEAF342D26B30a79438c9142e',
        symbol: 'YFI',
    },
    {
        address: '0x8CEF274596d334FFa10f8976a920DDC81ba6e29b',
        symbol: 'GROW',
    },
    {
        address: '0x96aC1E773677FA02726B5A670CA96a7aDf7F8523',
        symbol: 'MOLLYDOGE ⭐',
    },
    {
        address: '0xa1D04A189f8b6d5d64e8Fea7c38846AB6fa0F823',
        symbol: 'SATS',
    },
    {
        address: '0xA44b8ab2Dd6F9c621C09E14c773da62F55a214f2',
        symbol: '$HONEY',
    },
    {
        address: '0xaA9E582e5751d703F85912903bacADdFed26484C',
        symbol: 'HAI',
    },
    {
        address: '0xB46049c79D77fF1D555a67835FbA6978536581Af',
        symbol: 'MFO',
    },
    {
        address: '0xBb53FcAB7A3616C5be33B9C0AF612f0462b01734',
        symbol: 'SBF',
    },
    {
        address: '0xBf5140A22578168FD562DCcF235E5D43A02ce9B1',
        symbol: 'UNI',
    },
    {
        address: '0xc3b613982460Ebd50571799Ce91623e7AB7c8803',
        symbol: 'TKREV',
    },
    {
        address: '0xC460c98B39E24b4984AF73aD38DDFB577D6c3ff2',
        symbol: 'CMC',
    },
    {
        address: '0xCA6d25C10dad43ae8Be0bc2af4D3CD1114583C08',
        symbol: 'SISTA',
    },
    {
        address: '0xcC7BEE57Ec7B52eDBf6c8FC696e4b62617078103',
        symbol: 'ELXR',
    },
    {
        address: '0xCEBeFb92419615A069A3Fa65603F01d73632C9e8',
        symbol: 'WOOL',
    },
    {
        address: '0xd1ECFDD45c49057479c4Ca95E045855370bC4F5B',
        symbol: 'GART',
    },
    {
        address: '0xd4d573e7C39a313adc98B8b51b88a0a773321169',
        symbol: 'SOLPAD',
    },
    {
        address: '0xE29aC6Ea53Dea5211155f9d7C8c41BeEE852EfA0',
        symbol: 'POLX',
    },
    {
        address: '0xEa01D8D9EaCCa9996Db6Bb3377c1Fe64308e7328',
        symbol: 'BGLG',
    },
    {
        address: '0xEFDcc8996F00c76a1f855D801164e44A1AbFdC5a',
        symbol: '🐨KOALA',
    },
    {
        address: '0xF315cfC8550F6FcA969D397cA8b807C5033fA122',
        symbol: 'GAT',
    },
    {
        address: '0xf317932ee2C30fa5d0E14416775977801734812D',
        symbol: 'DINO',
    },
    {
        address: '0xf67932D8C28227C586D971b6b51749d35Dc03558',
        symbol: 'PALG',
    },
    {
        address: '0xF878D657926BE3372e1f17973F289ffb6cd17c3b',
        symbol: 'OPS',
    },
    {
        address: '0xEae2BBBC0000F605bD37A02c7fE346a3b68B03eb',
        symbol: 'MSH',
    },
    {
        address: '0xEB010e7075c12303A27B8b0d286842e63B4992aD',
        symbol: 'APT',
    },
    {
        address: '0xEB35aCBD23CF9D1C13D276815B9969eFfC5c878f',
        symbol: 'MiniSHIBA',
    },
    {
        address: '0xeB953eDA0DC65e3246f43DC8fa13f35623bDd5eD',
        symbol: 'RAINI',
    },
    {
        address: '0xEbb02733e131415e2578B6342c20baD4B68be221',
        symbol: 'ECASH',
    },
    {
        address: '0xEBB07b888cf4Bc1276203408aA0B2022E633A34c',
        symbol: 'SIR',
    },
    {
        address: '0xec15a508a187e8DDfe572A5423Faa82Bbdd65120',
        symbol: 'BABI',
    },
    {
        address: '0xED3f226e2E666be256CeEf3bB139c6e5A7aa6eD3',
        symbol: 'WINATESLA',
    },
    {
        address: '0xed4C1c07898305ECF01163842666116deb406CA3',
        symbol: 'sDOGE',
    },
    {
        address: '0xedeCfB4801C04F3EB394b89397c6Aafa4ADDa15B',
        symbol: 'PYRAM',
    },
    {
        address: '0xeE3Fd930Ac87A2990D5B74E4b76fACf715f2a3A5',
        symbol: 'RTF',
    },
    {
        address: '0xEE738a9e5FB78c24D26ceCD30389ED977C38D0Ca',
        symbol: 'FSAFE',
    },
    {
        address: '0xeE814F5B2bF700D2e843Dc56835D28d095161dd9',
        symbol: 'GRAND',
    },
    {
        address: '0xEe9801669C6138E84bD50dEB500827b776777d28',
        symbol: 'O3',
    },
    {
        address: '0xeea06FC74182B195f679f31d735D95EE502f03F3',
        symbol: 'VICE',
    },
    {
        address: '0xeec55F32Ae06b5ce616C9C6772D861C35008cCD7',
        symbol: 'JRM',
    },
    {
        address: '0xEFbA8b41e3495ad52258DFe916199Dc643F99dA2',
        symbol: 'SWASS',
    },
    {
        address: '0xF017E2773e4ee0590C81D79ccbcF1B2De1D22877',
        symbol: 'SAFEMOONCASH',
    },
    {
        address: '0xF0186490B18CB74619816CfC7FeB51cdbe4ae7b9',
        symbol: 'zUSD',
    },
    {
        address: '0xf06C4058C4D0C364163982Ae49302357B97fd594',
        symbol: 'SupShiba',
    },
    {
        address: '0xf07a32Eb035b786898c00bB1C64d8c6F8E7a46D5',
        symbol: 'WELL',
    },
    {
        address: '0xF0b6e29C429BBb8E1448340f0776bE933805344e',
        symbol: 'UEDC',
    },
    {
        address: '0xf16e81dce15B08F326220742020379B855B87DF9',
        symbol: 'ICE',
    },
    {
        address: '0xF1afb5674Bf946458BD1163163F62dE683B07D65',
        symbol: 'tEXO',
    },
    {
        address: '0xf24FBC7F4219Ebdc6ca1A66E0b43f549f4A453B1',
        symbol: 'FC',
    },
    {
        address: '0xf2Ba89A6f9670459ed5AeEfbd8Db52Be912228b8',
        symbol: 'BIPX',
    },
    {
        address: '0xf2eEb1011F5FD83f5165A6387bD14baD17DC7EE9',
        symbol: 'LITEBULB',
    },
    {
        address: '0xF565aaf0b8EB813a1c8C956D2C59F1ce27FD2366',
        symbol: 'MSHLD',
    },
    {
        address: '0xF68C9Df95a18B2A5a5fa1124d79EEEffBaD0B6Fa',
        symbol: 'ANY',
    },
    {
        address: '0xF952Fc3ca7325Cc27D15885d37117676d25BfdA6',
        symbol: 'EGG',
    },
    {
        address: '0xf9CeC8d50f6c8ad3Fb6dcCEC577e05aA32B224FE',
        symbol: 'CHR',
    },
    {
        address: '0xFaAb744dB9def8e13194600Ed02bC5D5BEd3B85C',
        symbol: 'NFT',
    },
    {
        address: '0xfAC1f65C835F0E2AF6B77B671bBfBBf9edBD8AAe',
        symbol: 'Fdoge',
    },
    {
        address: '0xFAd8E46123D7b4e77496491769C167FF894d2ACB',
        symbol: 'FOX',
    },
    {
        address: '0xfCb520B47f5601031E0Eb316F553A3641FF4B13C',
        symbol: 'LIZ',
    },
    {
        address: '0xfD21Ba4A4E973e99796Da627CAdECC0DEeB9019A',
        symbol: 'PEACE',
    },
    {
        address: '0xFF43463B7aF597297970b41A5f42FF6B8D23e9C3',
        symbol: 'ALIENA',
    },
    {
        address: '0x00E7DAF0E5FD1F5331C92D09E3C825A8E4FC6515',
        symbol: 'SAFEMOONC',
    },
    {
        address: '0xBB4CDB9CBD36B01BD1CBAEBF2DE08D9173BC095C',
        symbol: 'WBNB',
    },
    {
        address: '0x0112E557D400474717056C4E6D40EDD846F38351',
        symbol: 'PHA',
    },
    {
        address: '0xE9E7CEA3DEDCA5984780BAFC599BD69ADD087D56',
        symbol: 'BUSD',
    },
    {
        address: '0x016CF83732F1468150D87DCC5BDF67730B3934D3',
        symbol: 'AIRT',
    },
    {
        address: '0x01872B5F0003F6E209B9BA4D0045487BD6F67AC0',
        symbol: 'TOKIE',
    },
    {
        address: '0x018F49822D593F88843777E0956AF74C87012219',
        symbol: 'DNF',
    },
    {
        address: '0xA123AB52A32267DC357B7599739D3C6CAF856FE4',
        symbol: 'AIR',
    },
    {
        address: '0x01AF3B81EBB6BCB6440B444EE1739C1EC463085C',
        symbol: 'KFK',
    },
    {
        address: '0x01E9611DF08548994C883E4CA729B0128E73470F',
        symbol: 'RZE',
    },
    {
        address: '0x01F959F4B637ECA434682B620542454572D07042',
        symbol: 'TLT',
    },
    {
        address: '0x027B19B319F4381F20060606459C055C14791DB1',
        symbol: 'KURAI',
    },
    {
        address: '0x02A40C048EE2607B5F5606E445CFC3633FB20B58',
        symbol: 'KABY',
    },
    {
        address: '0x339C72829AB7DD45C3C52F965E7ABE358DD8761E',
        symbol: 'WANA',
    },
    {
        address: '0x373E768F79C820AA441540D254DCA6D045C6D25B',
        symbol: 'DERC',
    },
    {
        address: '0x02FF5065692783374947393723DBA9599E59F591',
        symbol: 'YOOSHI',
    },
    {
        address: '0x07B36F2549291D320132712A1E64D3826B1FB4D7',
        symbol: 'WIFEDOGE',
    },
    {
        address: '0x0E09FABB73BD3ADE0A17ECC321FD13A19E81CE82',
        symbol: 'Cake',
    },
    {
        address: '0x1AF3F329E8BE154074D8769D1FFA4EE058B1DBC3',
        symbol: 'DAI',
    },
    {
        address: '0x55D398326F99059FF775485246999027B3197955',
        symbol: 'USDT',
    },
    {
        address: '0x0391BE54E72F7E001F6BBC331777710B4F2999EF',
        symbol: 'TRAVA',
    },
    {
        address: '0xBA7FC2931193EBB5DAD01BADCBC47C46EF6B9208',
        symbol: 'DDOGE',
    },
    {
        address: '0x0406A5718EEF9D5177FA3C295460C5CFC9994AFD',
        symbol: 'BLACKINU',
    },
    {
        address: '0x041640EA980E3FE61E9C4CA26D9007BC70094C15',
        symbol: 'PirateCoin☠',
    },
    {
        address: '0x04C747B40BE4D535FC83D09939FB0F626F32800B',
        symbol: 'ITAM',
    },
    {
        address: '0x2322AFAAC81697E770C19A58DF587D8739777536',
        symbol: 'FAST',
    },
    {
        address: '0x04D7B2606F321BF897BF754DECC948FF7BC09650',
        symbol: 'GRNFI',
    },
    {
        address: '0x0742B62EFB5F2EABBC14567DFC0860CE0565BCF4',
        symbol: 'SOTA',
    },
    {
        address: '0x07663837218A003E66310A01596AF4BF4E44623D',
        symbol: 'rUSD',
    },
    {
        address: '0x076DDCE096C93DCF5D51FE346062BF0BA9523493',
        symbol: 'PARA',
    },
    {
        address: '0x079DD74CC214AC5F892F6A7271EF0722F6D0C2E6',
        symbol: 'NasaDoge',
    },
    {
        address: '0x07A89CB06726DFFC73DD666173214CBC79B4D9CA',
        symbol: 'MINIBMON',
    },
    {
        address: '0x07AF67B392B7A202FAD8E0FBC64C34F33102165B',
        symbol: 'AQUAGOAT',
    },
    {
        address: '0x2163913BF7094EC9683401225E7947B698A741FF',
        symbol: 'GKCAKE',
    },
    {
        address: '0xBDDFE03F24C09505FB2DB5F9DF1589DAB17DDAAE',
        symbol: 'MINIBNB',
    },
    {
        address: '0xF70C14AD93905F39EE3DF2D4FB92B87C31D779E0',
        symbol: 'MADA',
    },
    {
        address: '0x07C1CF17B75408FBDB79806A693458CDCDA4F5B0',
        symbol: 'SMNR',
    },
    {
        address: '0x07F5CEDED6B3DBA557B3663EDC8941FB37B63945',
        symbol: 'LAB v2',
    },
    {
        address: '0x088BEBEF4E371757509E64D3508B6DA6F376E2AC',
        symbol: 'DBall',
    },
    {
        address: '0x08BA0619B1E7A582E0BCE5BBE9843322C954C340',
        symbol: 'BMON',
    },
    {
        address: '0x80E15FE54E9D155F8366187A6A32BDEF9C2366C4',
        symbol: 'BMON-Z1',
    },
    {
        address: '0x8AC76A51CC950D9822D68B83FE1AD97B32CD580D',
        symbol: 'USDC',
    },
    {
        address: '0xA58950F05FEA2277D2608748412BF9F802EA4901',
        symbol: 'WSG',
    },
    {
        address: '0xC8A87A02053DD61FF24179668E5A7D5EC72FF4D1',
        symbol: 'BGPWR',
    },
    {
        address: '0xE4FAE3FAA8300810C835970B9187C268F55D998F',
        symbol: 'CATE',
    },
    {
        address: '0x093A60E9240269733E3C9BEF81E3066273C40FB3',
        symbol: 'AFRICA',
    },
    {
        address: '0x09607078980CBB0665ABA9C6D1B84B8EAD246AA0',
        symbol: 'PETG',
    },
    {
        address: '0x099F551EA3CB85707CAC6AC507CBC36C96EC64FF',
        symbol: 'SAFEARN',
    },
    {
        address: '0x09A6C44C3947B69E2B45F4D51B67E6A39ACFB506',
        symbol: 'UNCX',
    },
    {
        address: '0x09D975C3351DBDED28617517FC6982284A787F03',
        symbol: 'CISLA',
    },
    {
        address: '0x0A4D0A1731DB8D0ACA14CDF5B6CAA71D56F64724',
        symbol: '$RIOTS',
    },
    {
        address: '0x0ADAB0F76FFC13360E09BE9DDFFA8493DDC8FB9C',
        symbol: 'GCOIN',
    },
    {
        address: '0x0AEA2D721CDBFAED70F52103B01CA7CD29C17ED1',
        symbol: 'SNFT',
    },
    {
        address: '0x0B15DDF19D47E6A86A56148FB4AFFFC6929BCB89',
        symbol: 'IDIA',
    },
    {
        address: '0x0B3F42481C228F70756DBFA0309D3DDC2A5E0F6A',
        symbol: 'ULTRA',
    },
    {
        address: '0x0C692B62C4E85171FD1C05FBA889C9F873B81317',
        symbol: 'THOGE',
    },
    {
        address: '0x0CD3A8CE155A8D9DAAF19E5CAA642E72A2A24CD8',
        symbol: 'KROOT',
    },
    {
        address: '0x0CF8DBAFDC29AC98B45D7F2E088B26E365B455E4',
        symbol: 'CPU',
    },
    {
        address: '0x0D77E65F231AB6214492498788CDD9441DD0CE72',
        symbol: 'FSH',
    },
    {
        address: '0x0D89A8F99D0A41B3F789AF628B3094ABF4E846E0',
        symbol: 'RISK',
    },
    {
        address: '0x0D8CE2A99BB6E3B7DB580ED848240E4A0F9AE153',
        symbol: 'FIL',
    },
    {
        address: '0x0DF1B3F30865C5B324797F8DB9D339514CAC4E94',
        symbol: 'BETU',
    },
    {
        address: '0x31471E0791FCDBE82FBF4C44943255E923F1B794',
        symbol: 'PVU',
    },
    {
        address: '0x0DF7F2F0F2A9B64C67F14AC5F1FFAC133F1AFF7F',
        symbol: 'KILL',
    },
    {
        address: '0x154A9F9CBD3449AD22FDAE23044319D6EF2A1FAB',
        symbol: 'SKILL',
    },
    {
        address: '0x1633B7157E7638C4D6593436111BF125EE74703F',
        symbol: 'SPS',
    },
    {
        address: '0x1796AE0B0FA4862485106A0DE9B654EFE301D0B2',
        symbol: 'PMON',
    },
    {
        address: '0x1D229B958D5DDFCA92146585A8711AECBE56F095',
        symbol: 'Zoo',
    },
    {
        address: '0x2170ED0880AC9A755FD29B2688956BD959F933F8',
        symbol: 'ETH',
    },
    {
        address: '0x3203C9E46CA618C8C1CE5DC67E7E9D75F5DA2377',
        symbol: 'MBOX',
    },
    {
        address: '0x474021845C4643113458EA4414BDB7FB74A01A77',
        symbol: 'UNO',
    },
    {
        address: '0x4FA7163E153419E0E1064E418DD7A99314ED27B6',
        symbol: 'HOTCROSS',
    },
    {
        address: '0x565B72163F17849832A692A3C5928CC502F46D69',
        symbol: 'HUNNY',
    },
    {
        address: '0x5CA42204CDAA70D5C773946E69DE942B85CA6706',
        symbol: 'POSI',
    },
    {
        address: '0x7130D2A12B9BCBFAE4F2634D864A1EE1CE3EAD9C',
        symbol: 'BTCB',
    },
    {
        address: '0xC748673057861A797275CD8A068ABB95A902E8DE',
        symbol: 'BabyDoge',
    },
    {
        address: '0xC9849E6FDB743D08FAEE3E34DD2D1BC69EA11A51',
        symbol: 'BUNNY',
    },
    {
        address: '0xD21D29B38374528675C34936BF7D5DD693D2A577',
        symbol: 'PRQ',
    },
    {
        address: '0xDE619A9E0EEEAA9F8CD39522ED788234837F3B26',
        symbol: 'HVI',
    },
    {
        address: '0xE7F72BC0252CA7B16DBB72EEEE1AFCDB2429F2DD',
        symbol: 'NFTL',
    },
    {
        address: '0xE8176D414560CFE1BF82FD73B986823B89E4F545',
        symbol: 'HERO',
    },
    {
        address: '0xFB62AE373ACA027177D1C18EE0862817F9080D08',
        symbol: 'DPET',
    },
    {
        address: '0x0E7BEEC376099429B85639EB3ABE7CF22694ED49',
        symbol: 'BUNI',
    },
    {
        address: '0xF3EDD4F14A018DF4B6F02BF1B2CF17A8120519A2',
        symbol: 'PWT',
    },
    {
        address: '0x0E8D5504BF54D9E44260F8D153ECD5412130CABB',
        symbol: 'UNCL',
    },
    {
        address: '0x0EB3A705FC54725037CC9E008BDEDE697F62F335',
        symbol: 'ATOM',
    },
    {
        address: '0x0EBD9537A25F56713E34C45B38F421A1E7191469',
        symbol: 'MOOV',
    },
    {
        address: '0x0F8EB0182F87A06FA460E730487A373F64175CE7',
        symbol: 'PHXT',
    },
    {
        address: '0x0FEADCC3824E7F3C12F40E324A60C23CA51627FC',
        symbol: 'Warden',
    },
    {
        address: '0x101D82428437127BF1608F699CD651E6ABF9766E',
        symbol: 'BAT',
    },
    {
        address: '0x11582EF4642B1E7F0A023804B497656E2663BC9B',
        symbol: 'KCCPAD',
    },
    {
        address: '0x11BA78277D800502C84C5AED1374FF0A91F19F7E',
        symbol: 'EARN',
    },
    {
        address: '0x11D1AC5EC23E3A193E8A491A198F5FC9EE715839',
        symbol: 'MPAD',
    },
    {
        address: '0x12B83D77A606D8F5C4CE29DFFDB592C523364995',
        symbol: 'BabyYooshi',
    },
    {
        address: '0x46880AFC2E6FA41BBBE9787C082F7C23F795465E',
        symbol: 'BMARS',
    },
    {
        address: '0x12BB890508C125661E03B09EC06E404BC9289040',
        symbol: 'RACA',
    },
    {
        address: '0xAB15B79880F11CFFB58DB25EC2BC39D28C4D80D2',
        symbol: 'SMON',
    },
    {
        address: '0xF4ED363144981D3A65F42E7D0DC54FF9EEF559A1',
        symbol: 'FARA',
    },
    {
        address: '0x12DA2F2761038486271C99DA7E0FB4413E2B5E38',
        symbol: 'NBM',
    },
    {
        address: '0x12E34CDF6A031A10FE241864C32FB03A4FDAD739',
        symbol: 'FREE',
    },
    {
        address: '0x133BB423D9248A336D2B3086B8F44A7DBFF3A13C',
        symbol: 'SIL',
    },
    {
        address: '0x14016E85A25AEB13065688CAFB43044C2EF86784',
        symbol: 'TUSD',
    },
    {
        address: '0x14357D294FBABBE0FBF59503370C772D563B35B6',
        symbol: 'HMNG',
    },
    {
        address: '0x1446F3CEDF4D86A9399E49F7937766E6DE2A3AAB',
        symbol: 'KRW',
    },
    {
        address: '0x1496FB27D8CF1887D21CAC161987821859CA56BA',
        symbol: 'AMC',
    },
    {
        address: '0x3B78458981EB7260D1F781CB8BE2CAAC7027DBE2',
        symbol: 'LZ',
    },
    {
        address: '0x155040625D7AE3E9CADA9A73E3E44F76D3ED1409',
        symbol: 'REVO',
    },
    {
        address: '0x23662F3F9F35DAAB7A8D10654B5A4C1F3E57FC7A',
        symbol: 'FTS',
    },
    {
        address: '0x1591A8960360705CA92018A0AEB6AF7105920425',
        symbol: '$ENCHILADA',
    },
    {
        address: '0x15FBCE6467E2E834D0D182BF7EF06D2A7B64EA11',
        symbol: 'MiniMarvel',
    },
    {
        address: '0x16030ED3C8B9D7ECF741AABDE04B6DC6630E12CB',
        symbol: 'ZGoat',
    },
    {
        address: '0x1608692B3A9506CE48FA208C9E4A171C064947DF',
        symbol: 'PRINCEDOGE',
    },
    {
        address: '0x16153214E683018D5AA318864C8E692B66E16778',
        symbol: 'PWAR',
    },
    {
        address: '0x16939EF78684453BFDFB47825F8A5F714F12623A',
        symbol: 'XTZ',
    },
    {
        address: '0x170B9DD40D66C7B751D38521C8D62FC066BFD00D',
        symbol: 'JAGUAR',
    },
    {
        address: '0x17B17039711E61F8F5232C28D124DDAA2231BBFF',
        symbol: 'ORT',
    },
    {
        address: '0x17B7163CF1DBD286E262DDC68B553D899B93F526',
        symbol: 'QBT',
    },
    {
        address: '0x17D8519F57450E2B7E6AE1163E0E448322A8AF17',
        symbol: 'LOFI',
    },
    {
        address: '0x17DA381161F7BACAD1584685A7145409372DE6AA',
        symbol: 'SXHC',
    },
    {
        address: '0x17FD3CAA66502C6F1CBD5600D8448F3AF8F2ABA1',
        symbol: 'SPY',
    },
    {
        address: '0x18B426813731C144108C6D7FAF5EDE71A258FD9A',
        symbol: 'OLYMPUS',
    },
    {
        address: '0x19127D633940DB8D48412B83EE2322AFE52EB47A',
        symbol: 'BDGK',
    },
    {
        address: '0x19263F2B4693DA0991C4DF046E4BAA5386F5735E',
        symbol: 'ZOO',
    },
    {
        address: '0x192E9321B6244D204D4301AFA507EB29CA84D9EF',
        symbol: 'BOXER',
    },
    {
        address: '0x1997830B5BEB723F5089BB8FC38766D419A0444D',
        symbol: 'NEWINU',
    },
    {
        address: '0x19A4866A85C652EB4A2ED44C42E4CB2863A62D51',
        symbol: 'HOD',
    },
    {
        address: '0x19B60612F9A93359BCA835A788A334D4157E675B',
        symbol: 'PAWG',
    },
    {
        address: '0x1A2FB0AF670D0234C2857FAD35B789F8CB725584',
        symbol: 'KUN',
    },
    {
        address: '0x1A3057027032A1AF433F6F596CAB15271E4D8196',
        symbol: 'ROAD',
    },
    {
        address: '0x04F73A09E2EB410205BE256054794FB452F0D245',
        symbol: 'SALE',
    },
    {
        address: '0x7E624FA0E1C4ABFD309CC15719B7E2580887F570',
        symbol: 'POLS',
    },
    {
        address: '0xCF6BB5389C92BDDA8A3747DDB454CB7A64626C63',
        symbol: 'XVS',
    },
    {
        address: '0x1B311E08C89C1B0BB66CF1FFC2A6F0096D6821F5',
        symbol: 'MAYE',
    },
    {
        address: '0x1BB2DDF857AFC8CCA364FF091462D607F1F37E9F',
        symbol: 'MiniSoccer',
    },
    {
        address: '0x1BF7AEDEC439D6BFE38F8F9B20CF3DC99E3571C4',
        symbol: 'TRONPAD',
    },
    {
        address: '0x1C4C6D69486ECA5DF3653AC3D1F5C9849FF048BA',
        symbol: 'T-Shiba',
    },
    {
        address: '0x1CBDDF83DE068464EBA3A4E319BD3197A7EEA12C',
        symbol: 'LEAF',
    },
    {
        address: '0x1CFD6813A59D7B90C41DD5990ED99C3BF2EB8F55',
        symbol: 'CORGIB',
    },
    {
        address: '0x1D003B4CBBCB367B290CF16E9C00570E532B5E17',
        symbol: 'MiniBB',
    },
    {
        address: '0x3F35A88EA8B69BF52210B3DB64C254DB34D9D6D8',
        symbol: 'MBASKETBALL',
    },
    {
        address: '0x1D2F0DA169CEB9FC7B3144628DB156F3F6C60DBE',
        symbol: 'XRP',
    },
    {
        address: '0x37C4BCF0B8FC6F074BE933AF7FB9D1DDE55F979C',
        symbol: 'Diamonds',
    },
    {
        address: '0x3EE2200EFB3400FABB9AACF31297CBDD1D435D47',
        symbol: 'ADA',
    },
    {
        address: '0x609D183FB91A0FCE59550B62AB7D2C931B0BB1BE',
        symbol: 'PkMon',
    },
    {
        address: '0x1E446CBEA52BADEB614FBE4AB7610F737995FB44',
        symbol: 'SAT',
    },
    {
        address: '0x1E5F009D4F8CA44B5FCC4963DD301DA82B4EED09',
        symbol: 'ZABAKU',
    },
    {
        address: '0x1EC51A4A06F7E6A89284A4234004F3CBE42061A1',
        symbol: 'πu',
    },
    {
        address: '0x1F3AF095CDA17D63CAD238358837321E95FC5915',
        symbol: 'MINT',
    },
    {
        address: '0x1F623F0AAB194BB967EF947E2A34FC67D5E52CD3',
        symbol: 'HerofiFarm ',
    },
    {
        address: '0x1F64FDAD335ED784898EFFB5CE22D54D8F432523',
        symbol: '10SET',
    },
    {
        address: '0x1FE34D34EC67EF7020874A69A9DD1FB778CF9522',
        symbol: 'MONSTER',
    },
    {
        address: '0x20DE22029AB63CF9A7CF5FEB2B737CA1EE4C82A6',
        symbol: 'CHESS',
    },
    {
        address: '0x20F663CEA80FACE82ACDFA3AAE6862D246CE0333',
        symbol: 'DRIP',
    },
    {
        address: '0x2136CD209BB3D8E4C008EC2791B5D6790B5E33A9',
        symbol: 'ABLE',
    },
    {
        address: '0xF7BF4507336AEA836AB5575EC1801D96C3059483',
        symbol: 'SLOKI',
    },
    {
        address: '0x95A1199EBA84AC5F19546519E287D43D2F0E1B41',
        symbol: 'RABBIT',
    },
    {
        address: '0xDB021B1B247FE2F1FA57E0A87C748CC1E321F07F',
        symbol: 'AMPL',
    },
    {
        address: '0xDE3DBBE30CFA9F437B293294D1FD64B26045C71A',
        symbol: 'NFTB',
    },
    {
        address: '0x2178C3F969923DA490154290AC81D93AB1F36863',
        symbol: 'Xlion',
    },
    {
        address: '0x21EA8618B9168EB8936C3E02F0809BBE901282AC',
        symbol: 'SPC',
    },
    {
        address: '0x22168882276E5D5E1DA694343B41DD7726EEB288',
        symbol: 'WSB',
    },
    {
        address: '0x2222227E22102FE3322098E4CBFE18CFEBD57C95',
        symbol: 'TLM',
    },
    {
        address: '0x23125108BC4C63E4677B2E253FA498CCB4B3298B',
        symbol: 'DOGECOIN',
    },
    {
        address: '0x23396CF899CA06C4472205FC903BDB4DE249D6FC',
        symbol: 'UST',
    },
    {
        address: '0x24CD30FC26C5C9BD5C4B8C1CBDEA2F22C94610A7',
        symbol: 'VPC',
    },
    {
        address: '0x24D787E9B88CB62D74E961C1C1D78E4EE47618E5',
        symbol: 'BPET',
    },
    {
        address: '0x250632378E573C6BE1AC2F97FCDF00515D0AA91B',
        symbol: 'BETH',
    },
    {
        address: '0x2541BE91FE0D220FFCBE65F11D88217A87A43BDA',
        symbol: '$Lordz',
    },
    {
        address: '0x25A604019CF40FD1C7281E0D83856556D7226F45',
        symbol: 'DOJO',
    },
    {
        address: '0x25ABC9A43B172FA24EB4208B93AF2A5FAAC08181',
        symbol: 'CHTR',
    },
    {
        address: '0x261510DD6257494EEA1DDA7618DBE8A7B87870DD',
        symbol: 'HEROES',
    },
    {
        address: '0x261828B6E70BF05136DA9D0C8BC0FFFDEECF0AE3',
        symbol: 'YFI9',
    },
    {
        address: '0x270388E0CA29CFD7C7E73903D9D933A23D1BAB39',
        symbol: 'TSX',
    },
    {
        address: '0x270877FBDADD2E28C7EAF08E528691B95684207E',
        symbol: 'LAIKA',
    },
    {
        address: '0x2722C9DB0FC6818DC9DD3A01254AFC3804438B64',
        symbol: 'YAG',
    },
    {
        address: '0x9D173E6C594F479B4D47001F8E6A95A7ADDA42BC',
        symbol: 'ZOON',
    },
    {
        address: '0xE8C93310AF068AA50BD7BF0EBFA459DF2A02CEBA',
        symbol: 'MOON',
    },
    {
        address: '0x27AE27110350B98D564B9A3EED31BAEBC82D878D',
        symbol: 'CUMMIES',
    },
    {
        address: '0x27E89D357957CE332FF442DB69F4B476401BBBC5',
        symbol: 'CARMA',
    },
    {
        address: '0x280F1638A642FA379E7CB8094411FC7FAC919D70',
        symbol: 'BTN',
    },
    {
        address: '0x28135CF62257831F5A53345048A951CF094660D6',
        symbol: 'BabyDopeToken',
    },
    {
        address: '0x29324E48F6BA8AD2C5FE554A79F2E2C3D2EDC432',
        symbol: 'MTS',
    },
    {
        address: '0x297817CE1A8DE777E7DDBED86C3B7F9DC9349F2C',
        symbol: 'DUEL',
    },
    {
        address: '0x2A2CD8B1F69EB9DDA5D703B3498D97080C2F194F',
        symbol: 'CORIS',
    },
    {
        address: '0x2B3F34E9D4B127797CE6244EA341A83733DDD6E4',
        symbol: 'FLOKI',
    },
    {
        address: '0x2C80BC9BFA4EC680EFB949C51806BDDEE5AC8299',
        symbol: 'BARMY',
    },
    {
        address: '0x2CA5BDBA85F7EA35AE63BCF6E1B673663D7C2C0A',
        symbol: 'GNS',
    },
    {
        address: '0x2CD2664CE5639E46C6A3125257361E01D0213657',
        symbol: 'USELESS',
    },
    {
        address: '0x2E21232C021C925B9B9E117A2024588300DBECF0',
        symbol: 'Pipemoon',
    },
    {
        address: '0x2E310FC34EADB9FDC7743A0F2FCD419D3DCF7AC3',
        symbol: 'KINBA',
    },
    {
        address: '0x3DAB450EE6451762E72647A05A205DD5697C5C2C',
        symbol: 'FSHIB',
    },
    {
        address: '0x2ED9A5C8C13B93955103B9A7C167B67EF4D568A3',
        symbol: 'MASK',
    },
    {
        address: '0x2F657932E65905EA09C7AACFE898BF79E207C1C0',
        symbol: 'ROBODOGE',
    },
    {
        address: '0x2FA80212CB11751BC07C243089FF2EFC4EA4194E',
        symbol: 'SME',
    },
    {
        address: '0x2FA84B17016D5C603500920BA6D7D86D9AB1180E',
        symbol: 'ANB',
    },
    {
        address: '0x2FFEE7B4DF74F7C6508A4AF4D6D91058DA5420D0',
        symbol: 'ChainCade',
    },
    {
        address: '0x3045D1A840364C3657B8DF6C6F86A4359C23472B',
        symbol: 'ORI',
    },
    {
        address: '0x50332BDCA94673F33401776365B66CC4E81AC81D',
        symbol: 'CCAR',
    },
    {
        address: '0x610F34DA19797405A276D26F95BD5C7D8CBBD644',
        symbol: 'GON',
    },
    {
        address: '0xB72842D6F5FEDF91D22D56202802BB9A79C6322E',
        symbol: 'MOMA',
    },
    {
        address: '0xC49DDE62B4A0810074721FACA54AAB52369F486A',
        symbol: 'PKR',
    },
    {
        address: '0x31CC5AC39E2968C861830ADE3580318BB815D633',
        symbol: 'SFUEL',
    },
    {
        address: '0x31DE61D9A39CB9F479570BD3DC3AC93BC0402CDB',
        symbol: 'NFTPUNK',
    },
    {
        address: '0xB6C53431608E626AC81A9776AC3E999C5556717C',
        symbol: 'TLOS',
    },
    {
        address: '0x3220CCBBC29D727BDE85B7333D31B21E0D6BC6F4',
        symbol: 'PupDoge',
    },
    {
        address: '0x32299C93960BB583A43C2220DC89152391A610C5',
        symbol: 'Kala',
    },
    {
        address: '0x323273B8EE5AE6247B47C38C81DB45E1BEF13E6F',
        symbol: 'MTG',
    },
    {
        address: '0x323B7AAAFE4F8518980579A7D788DC3A105EC0A0',
        symbol: 'Totomon',
    },
    {
        address: '0x33831BEE1CE63C95DAB6CF23F83FF0B6A29A2837',
        symbol: 'MOLE',
    },
    {
        address: '0x338A09A17A7DA2E5C5A6B22344F3A49904224C79',
        symbol: 'FLOKIJR',
    },
    {
        address: '0x33A3D962955A3862C8093D1273344719F03CA17C',
        symbol: 'SPORE',
    },
    {
        address: '0x33D08D8C7A168333A85285A68C0042B39FC3741D',
        symbol: 'AIOZ',
    },
    {
        address: '0x34BA3AF693D6C776D73C7FA67E2B2E79BE8EF4ED',
        symbol: 'BALA',
    },
    {
        address: '0x34EA3F7162E6F6ED16BD171267EC180FD5C848DA',
        symbol: 'DND',
    },
    {
        address: '0x35754E4650C8AB582F4E2CB9225E77E6685BE25A',
        symbol: 'CSM',
    },
    {
        address: '0x362ECCB1F150F47643E6EEC92A296F369D5EDBEF',
        symbol: 'NCE',
    },
    {
        address: '0x36F66D61DB3497F7FDBA22EFD2A251753A95D0E2',
        symbol: 'LTN',
    },
    {
        address: '0x3780E00D4C60887AF38345CCD44F7617DBFB10A0',
        symbol: 'Doge2',
    },
    {
        address: '0x4BF0B64664C4625CD3F15968A8400165962CB728',
        symbol: 'BOO',
    },
    {
        address: '0x3916984FA787D89B648CCD8D60B5FF07E0E8E4F4',
        symbol: 'PUBE',
    },
    {
        address: '0x393D87E44C7B1F5BA521B351532C24ECE253B849',
        symbol: 'BLES',
    },
    {
        address: '0x3993A8F82F5E1A5381E678FC237A3DA668C1F4EB',
        symbol: 'UFF',
    },
    {
        address: '0x39AE8EEFB05138F418BB27659C21632DC1DDAB10',
        symbol: 'KAI',
    },
    {
        address: '0x3A3AEF78886ED842E6E14626D54173E0D8F898FD',
        symbol: 'WAR',
    },
    {
        address: '0x3AB63309F85DF5D4C3351FF8EACB87980E05DA4E',
        symbol: 'WHEAT',
    },
    {
        address: '0x3BC5798416C1122BCFD7CB0E055D50061F23850D',
        symbol: 'CSS',
    },
    {
        address: '0x3C00F8FCC8791FA78DAA4A480095EC7D475781E2',
        symbol: 'SAFESTAR',
    },
    {
        address: '0x3C4822CF5F5897D052335D3EC5B8D2F56430249A',
        symbol: 'SkyX',
    },
    {
        address: '0x3CB7AEC62FD08413784B3C926B7E1CBE447DC214',
        symbol: 'EMAS',
    },
    {
        address: '0x3CE9F4E83EC642E6AE25169061120D4D157256EF',
        symbol: 'ROMEODOGE',
    },
    {
        address: '0x3DB6B7022DB6F4D991F1882AA983F90E95515257',
        symbol: 'BLOOD',
    },
    {
        address: '0x3E6C9EE69B90B53628051F8D6CB5B6B2EACCB438',
        symbol: 'MULTI',
    },
    {
        address: '0x430374D961450A7DCE3A47EB3D3C26ED9C965EC0',
        symbol: 'SPE',
    },
    {
        address: '0xACFC95585D80AB62F67A14C566C1B7A49FE91167',
        symbol: 'FEG',
    },
    {
        address: '0x3EF99822759A2192E7A82F64484E79E89CD90D52',
        symbol: 'TKB',
    },
    {
        address: '0x3F3608A1896C0D29C95DF5B3F2BB549B755A5674',
        symbol: 'BISWAP',
    },
    {
        address: '0x3FAAE5B5F4B55897A1A33040D5EB97A8433AD064',
        symbol: 'FBW',
    },
    {
        address: '0x3FCCA8648651E5B974DD6D3E50F61567779772A8',
        symbol: 'POTS',
    },
    {
        address: '0x8F0528CE5EF7B51152A59745BEFDD91D97091D2F',
        symbol: 'ALPACA',
    },
    {
        address: '0x3FDA9383A84C05EC8F7630FE10ADF1FAC13241CC',
        symbol: 'DEGO',
    },
    {
        address: '0x400613F184D1207F5C07A67D67040A4E23E92FEB',
        symbol: 'UPDOG',
    },
    {
        address: '0x40BE8529226DE4507B19F5D88E52E511BEF22E9A',
        symbol: 'BEANS',
    },
    {
        address: '0x4131B87F74415190425CCD873048C708F8005823',
        symbol: 'bMXX',
    },
    {
        address: '0xA2B726B1145A4773F68593CF171187D8EBE4D495',
        symbol: 'INJ',
    },
    {
        address: '0x418236CA7C807CFC1D04EB64475DF7CE17C2F218',
        symbol: 'DDC',
    },
    {
        address: '0x4198B601F9F9B725CE522A19B702AA849128463C',
        symbol: 'MMS',
    },
    {
        address: '0x42F6F551AE042CBE50C739158B4F0CAC0EDB9096',
        symbol: 'NRV',
    },
    {
        address: '0x431E0CD023A32532BF3969CDDFC002C00E98429D',
        symbol: 'XCAD',
    },
    {
        address: '0x4329F1FBB62DEA8960237FD975A794A604C57FF7',
        symbol: 'BWT(👶⬜️🐯)',
    },
    {
        address: '0x4338665CBB7B2485A8855A139B75D5E34AB0DB94',
        symbol: 'LTC',
    },
    {
        address: '0x435D4CCB66003B1BAC9BD9EF1AED72AD3F869145',
        symbol: 'CHOW',
    },
    {
        address: '0x435D4FD0BFDEB588626FE5ABF6A6EB2EF2E26988',
        symbol: 'MNOP',
    },
    {
        address: '0x442D5E02276954CA61F272635CDAD07DD7992120',
        symbol: 'r4BELT',
    },
    {
        address: '0x44754455564474A89358B2C2265883DF993B12F0',
        symbol: 'ZEE',
    },
    {
        address: '0x4495A7942155B04948D9FEA4EE57E4D228742442',
        symbol: 'ZKN',
    },
    {
        address: '0x464863745ED3AF8B9F8871F1082211C55F8F884D',
        symbol: 'CTT',
    },
    {
        address: '0x46D502FAC9AEA7C5BC7B13C8EC9D02378C33D36F',
        symbol: 'WSPP',
    },
    {
        address: '0x477BC8D23C634C154061869478BCE96BE6045D12',
        symbol: 'SFUND',
    },
    {
        address: '0x158648792927EBB7A5C0D598BAB4D23417465E0B',
        symbol: 'RTT',
    },
    {
        address: '0x47B8806C2891C4A92B5C590C32CFE1EB617648EF',
        symbol: 'KCLP',
    },
    {
        address: '0x47FA20BA81333BA507D687913BAF7C89432182A1',
        symbol: 'Bzzone',
    },
    {
        address: '0x487770734490AC571CDA3BC06067048ECC5CAA4E',
        symbol: 'Cherry',
    },
    {
        address: '0x492793A9ED1AC780CBD6B56C930461BC3C568F47',
        symbol: 'FOLK',
    },
    {
        address: '0x493676FC6B47C87361A3B85A8C18B051E810F37D',
        symbol: 'FIDO',
    },
    {
        address: '0x493F2EA0361AA829D67250F401097AEE38CAC9AF',
        symbol: 'CIBC',
    },
    {
        address: '0x4A080377F83D669D7BB83B3184A8A5E61B500608',
        symbol: 'XEND',
    },
    {
        address: '0x4A68C250486A116DC8D6A0C5B0677DE07CC09C5D',
        symbol: 'POODL',
    },
    {
        address: '0x4A713EE4DEB88A8C2ABD77AFED415201EDB6F1FA',
        symbol: 'CUMSTAR',
    },
    {
        address: '0x4A72AF9609D22BF2FF227AEC333C7D0860F3DB36',
        symbol: 'NFTPAD',
    },
    {
        address: '0x4A7CDAFB3C1B63029B0A11E91D0A718BF635DAAB',
        symbol: 'DPACE',
    },
    {
        address: '0x4AAD6A01068C2621545D087A3C5281837112585B',
        symbol: '$TIME',
    },
    {
        address: '0x4AFC8C2BE6A0783EA16E16066FDE140D15979296',
        symbol: 'HARE',
    },
    {
        address: '0x4B0F1812E5DF2A09796481FF14017E6005508003',
        symbol: 'TWT',
    },
    {
        address: '0x53E562B9B7E5E94B81F10E96EE70AD06DF3D2657',
        symbol: 'BABY',
    },
    {
        address: '0x4BA0057F784858A48FE351445C672FF2A3D43515',
        symbol: 'KALM',
    },
    {
        address: '0x4BD17003473389A42DAF6A0A729F6FDB328BBBD7',
        symbol: 'VAI',
    },
    {
        address: '0xF8A0BF9CF54BB92F17374D9E9A321E6A111A51BD',
        symbol: 'LINK',
    },
    {
        address: '0x4C0415A6E340ECCEBFF58131799C6C4127CC39FA',
        symbol: 'XDOGE',
    },
    {
        address: '0x4C97C901B5147F8C1C7CE3C5CF3EB83B44F244FE',
        symbol: 'MND',
    },
    {
        address: '0x4CA72C5D7085D677230E48E899CA985F8D3B14E0',
        symbol: 'CaptainADA',
    },
    {
        address: '0x4CBDFAD03B968BF43449D0908F319AE4A5A33371',
        symbol: 'ECOIN',
    },
    {
        address: '0x4CE5F6BF8E996AE54709C75865709ACA5127DD54',
        symbol: 'AMT',
    },
    {
        address: '0x4D61577D8FD2208A0AFB814EA089FDEAE19ED202',
        symbol: 'VFOX',
    },
    {
        address: '0x0A3A21356793B49154FD3BBE91CBC2A16C0457F5',
        symbol: 'RFOX',
    },
    {
        address: '0x4D8C829C02585AA62D2BBAF562099BF749637580',
        symbol: 'India',
    },
    {
        address: '0x4E6415A5727EA08AAE4580057187923AEC331227',
        symbol: 'FINE',
    },
    {
        address: '0x4E6D79CDDEC12C229D53B38C11B204BCEC118885',
        symbol: 'KRN',
    },
    {
        address: '0x5013840D96BC94434FB5EFB91697F1F3960DE128',
        symbol: 'PRZ',
    },
    {
        address: '0x5066C68CAE3B9BDACD6A1A37C90F2D1723559D18',
        symbol: 'WIZARD',
    },
    {
        address: '0x8D58A9254A84275C5449589527A5DDF85FFF6D6D',
        symbol: 'HRB',
    },
    {
        address: '0x5067C6E9E6C443372F2E62946273ABBF3CC2F2B3',
        symbol: 'FIBO',
    },
    {
        address: '0x50F525BE99D4C4B48D75169817C065301ECDCEFB',
        symbol: 'PowerDoge',
    },
    {
        address: '0x51F35073FF7CF54C9E86B7042E59A8CC9709FC46',
        symbol: 'ETNA',
    },
    {
        address: '0x5392FF4A9BD006DC272C1855AF6640E17CC5EC0B',
        symbol: 'SFEX',
    },
    {
        address: '0xC3EAE9B061AA0E1B9BD3436080DC57D2D63FEDC1',
        symbol: 'BEAR',
    },
    {
        address: '0x5419291D81C68C103363E06046F40A9056AB2B7F',
        symbol: 'DZOO',
    },
    {
        address: '0x545F90DC35CA1E6129F1FED354B3E2DF12034261',
        symbol: 'NEWB',
    },
    {
        address: '0x552E922A0FFE42522DBC237092F33D3E78644812',
        symbol: 'AlwaysUP',
    },
    {
        address: '0x5546600F77EDA1DCF2E8817EF4D617382E7F71F5',
        symbol: 'PING',
    },
    {
        address: '0x04BAF95FD4C52FD09A56D840BAEE0AB8D7357BF0',
        symbol: 'ONE',
    },
    {
        address: '0x118B60763002F3BA7603A3C17F946A0C7DAB789F',
        symbol: 'PEARL',
    },
    {
        address: '0x157A594D16A924D99174D69EDAF36CEB08DD0C72',
        symbol: 'Forte',
    },
    {
        address: '0x184079CA987F562AE6A0C59F4BE5CADB20323863',
        symbol: 'MARSRISE',
    },
    {
        address: '0x1A29770F8DB6366CF2011CB2C412D9BBCD86CC4F',
        symbol: 'Bzzt',
    },
    {
        address: '0x1DA1C14FCDA3D5A616D4199F91128D5CA6F4F0F3',
        symbol: 'Killer',
    },
    {
        address: '0x3008EBBA0131A6085FCC230EF947ED8F8F12346F',
        symbol: 'CBN',
    },
    {
        address: '0x3710CD84E0E331C99C70A34B8C6C136C2CDF91C4',
        symbol: 'OPS',
    },
    {
        address: '0x39647D0D700EF077C6D90DE963CF6989EF38E341',
        symbol: 'TYC',
    },
    {
        address: '0x3A3435809D4443AE703DCDC765A583B0E16C846A',
        symbol: 'VBS',
    },
    {
        address: '0x5DE3939B2F811A61D830E6F52D13B066881412AB',
        symbol: 'XPR',
    },
    {
        address: '0x5F49F9024D5DEC860B110ECA79E5B805C14B5B8C',
        symbol: 'DWR',
    },
    {
        address: '0x630D98424EFE0EA27FB1B3AB7741907DFFEAAD78',
        symbol: 'PEAK',
    },
    {
        address: '0x6652462466DCEE5CB1DDA95379FAE3C3E57F6719',
        symbol: 'Key',
    },
    {
        address: '0x6F14A18B4543A4D6779ECC5E23A6198E9FAA7FC0',
        symbol: 'FPH',
    },
    {
        address: '0x702371E0897F5E2F566B1CE8256856D0549C5857',
        symbol: 'SZCB',
    },
    {
        address: '0x7269D98AF4AA705E0B1A5D8512FADB4D45817D5A',
        symbol: 'SHI',
    },
    {
        address: '0x758FB037A375F17C7E195CC634D77DA4F554255B',
        symbol: 'DVI',
    },
    {
        address: '0x75A06C9324189D46BF07956576CAC15E5C4D7CC2',
        symbol: 'Tax',
    },
    {
        address: '0x7969DC3C6E925BCCBEA9F7FC466A63C74F0115B8',
        symbol: 'LION',
    },
    {
        address: '0x7B0B4C304B9149B692C1ACBC9DB4F4A1C17B2B91',
        symbol: 'BabyPig',
    },
    {
        address: '0x7CD082201C841CF2EA42F5B8B54AD7C0603E3A2C',
        symbol: 'BlueCat',
    },
    {
        address: '0x7EE7F14427CC41D6DB17829EB57DC74A26796B9D',
        symbol: 'MOONRISE',
    },
    {
        address: '0x822DC83FA4DC997FFF24D0BC0A66FCB2954A6156',
        symbol: 'BINS',
    },
    {
        address: '0x8244609023097AEF71C702CCBAEFC0BDE5B48694',
        symbol: 'WSBT',
    },
    {
        address: '0x82A479264B36104BE4FDB91618A59A4FC0F50650',
        symbol: 'BIRB',
    },
    {
        address: '0x82C19905B036BF4E329740989DCF6AE441AE26C1',
        symbol: 'CP',
    },
    {
        address: '0x85EAC5AC2F758618DFA09BDBE0CF174E7D574D5B',
        symbol: 'TRX',
    },
    {
        address: '0x898D0D2CC5A167696612BCB35CB87832D743F782',
        symbol: 'MB',
    },
    {
        address: '0x8C851D1A123FF703BD1F9DABE631B69902DF5F97',
        symbol: 'BNX',
    },
    {
        address: '0x9602E6EF32159E59FDCDA4722F122DE4FE84BDF5',
        symbol: 'UT',
    },
    {
        address: '0x97B96CF314BAB6D637A90FB04F8A657CEBA19DF9',
        symbol: 'MNSTRS',
    },
    {
        address: '0x9AA6FC71AED1130DEE06A91A487BF5EA481DE80D',
        symbol: 'COCO',
    },
    {
        address: '0x9E24415D1E549EBC626A13A482BB117A2B43E9CF',
        symbol: 'LOVELY',
    },
    {
        address: '0x9FA8F2418B35B7AC487604DDD00229D97F005599',
        symbol: 'NIP',
    },
    {
        address: '0xA6C897CAACA3DB7FD6E2D2CE1A00744F40AB87BB',
        symbol: 'DRACE',
    },
    {
        address: '0xA73505453F58E367C80F16685079DAD6F4EA6B18',
        symbol: 'UMG',
    },
    {
        address: '0xACB8F52DC63BB752A51186D1C55868ADBFFEE9C1',
        symbol: 'BP',
    },
    {
        address: '0xAD29ABB318791D579433D831ED122AFEAF29DCFE',
        symbol: 'FTM',
    },
    {
        address: '0xAEC945E04BAF28B135FA7C640F624F8D90F1C3A6',
        symbol: 'C98',
    },
    {
        address: '0xAF6BD11A6F8F9C44B9D18F5FA116E403DB599F8E',
        symbol: 'ALIX',
    },
    {
        address: '0xB3A6381070B1A15169DEA646166EC0699FDAEA79',
        symbol: 'Gold',
    },
    {
        address: '0xB84DDC645C27D4DC4BFA325C946F9D89D3AFCC7A',
        symbol: 'BonusCake',
    },
    {
        address: '0xBA2AE424D960C26247DD6C32EDC70B295C744C43',
        symbol: 'DOGE',
    },
    {
        address: '0xBB8F075B11C9298F6F702DFEB3CBC8EA1499E4F6',
        symbol: 'WINNER',
    },
    {
        address: '0xBC2597D3F1F9565100582CDE02E3712D03B8B0F6',
        symbol: 'SMB SWAP',
    },
    {
        address: '0xBCC60F96EAAFC409BD914F6890E8DD0A6CF3234F',
        symbol: 'ROW',
    },
    {
        address: '0xBE6EEF2027BD9C7DE56BBE10C12CA77DCF856C2C',
        symbol: 'SPK',
    },
    {
        address: '0xBF38AE857024262B4D035BAB391C1EE291DAF356',
        symbol: 'RedSun',
    },
    {
        address: '0xC2CB89BBB5BBA6E21DB1DFE13493DFD7DCBABD68',
        symbol: '$MANGA',
    },
    {
        address: '0xC41689A727469C1573009757200371EDF36D540E',
        symbol: 'DYNA',
    },
    {
        address: '0xC5A498FBBFD5F88CB7E86A7B54485FC9697FD2AF',
        symbol: 'CFA',
    },
    {
        address: '0xC6E364E105735CCDA3AA4DB99ACBA554A374BCF4',
        symbol: 'NAN',
    },
    {
        address: '0xCC29B8701A0465E6D5B2A2A062CD9A8726A6CF53',
        symbol: 'RGSN',
    },
    {
        address: '0xCDA06CD0ACB76C4E4386CB27E8F5112BA5912025',
        symbol: 'SD',
    },
    {
        address: '0xD1ECFDD45C49057479C4CA95E045855370BC4F5B',
        symbol: 'GART',
    },
    {
        address: '0xD32AF8BEE4095A84E258A82B512356DFC0A7D2C0',
        symbol: 'GNFT',
    },
    {
        address: '0xD40BEDB44C081D2935EEBA6EF5A3C8A31A1BBE13',
        symbol: 'HERO',
    },
    {
        address: '0xD48474E7444727BF500A32D5ABE01943F3A59A64',
        symbol: 'BBT',
    },
    {
        address: '0xD50F71D0CC64C228074332CD3C597A63556BDB67',
        symbol: 'ORE',
    },
    {
        address: '0xD522A1DCE1CA4B138DDA042A78672307EB124CC2',
        symbol: 'SWAPZ',
    },
    {
        address: '0xD632BD021A07AF70592CE1E18717AB9AA126DECB',
        symbol: 'bKANGAL',
    },
    {
        address: '0xDE097FEB7ECC559BF71375CA9C4AB2EA1E3C58BB',
        symbol: 'KGS',
    },
    {
        address: '0xE0E514C71282B6F4E823703A39374CF58DC3EA4F',
        symbol: 'BELT',
    },
    {
        address: '0xE320DF552E78D57E95CF1182B6960746D5016561',
        symbol: 'DOGECOLA',
    },
    {
        address: '0xE56842ED550FF2794F010738554DB45E60730371',
        symbol: 'BIN',
    },
    {
        address: '0xE5904E9816B309D3ED4D061C922F5AA8F3B24C92',
        symbol: 'NFTL',
    },
    {
        address: '0xE632101FB808DE2A37C07C214F036F586ACFB366',
        symbol: 'CRE',
    },
    {
        address: '0xE6FFA2E574A8BBEB5243D2109B6B11D4A459F88B',
        symbol: 'HIP',
    },
    {
        address: '0xEB953EDA0DC65E3246F43DC8FA13F35623BDD5ED',
        symbol: 'RAINI',
    },
    {
        address: '0xEBC76079DA0C245FAE7225B58A57A54809B40618',
        symbol: 'BPAY',
    },
    {
        address: '0xEE957BBDFFB3DFD97615E254ABCF223A49DDD15B',
        symbol: 'GTL',
    },
    {
        address: '0xEE9801669C6138E84BD50DEB500827B776777D28',
        symbol: 'O3',
    },
    {
        address: '0xEECF92BF5E8F96E174510E9CD2B2A857AA039460',
        symbol: 'DCS',
    },
    {
        address: '0xF218184AF829CF2B0019F8E6F0B2423498A36983',
        symbol: 'MATH',
    },
    {
        address: '0xF79037F6F6BE66832DE4E7516BE52826BC3CBCC4',
        symbol: 'HARD',
    },
    {
        address: '0xF9C948B08D4C707B400C57895AC0A0F9F7125EAF',
        symbol: 'MION',
    },
    {
        address: '0xFAFD4CB703B25CB22F43D017E7E0D75FEBC26743',
        symbol: 'WEYU',
    },
    {
        address: '0xFBE0B4AE6E5A200C36A341299604D5F71A5F0A48',
        symbol: 'ZIN',
    },
    {
        address: '0xFCB520B47F5601031E0EB316F553A3641FF4B13C',
        symbol: 'LIZ',
    },
    {
        address: '0xFF6080C748D813D7F4752F279C1E6325F6BF5C75',
        symbol: 'MUCNFT',
    },
    {
        address: '0x56A18BB7D004F9A63E74478A61FB7DA776371673',
        symbol: 'WAKE',
    },
    {
        address: '0x57457B5D725D85A70A3625D6A71818304E773618',
        symbol: 'PETN',
    },
    {
        address: '0x5788105375ECF7F675C29E822FD85FCD84D4CD86',
        symbol: 'HODL',
    },
    {
        address: '0x57F239E1E62ABD0F68D7B7C0FE11DF25B3217D99',
        symbol: 'KCCM',
    },
    {
        address: '0x5801D0E1C7D977D78E4890880B8E579EB4943276',
        symbol: 'USDO',
    },
    {
        address: '0x580DE58C1BD593A43DADCF0A739D504621817C05',
        symbol: 'THOREUM',
    },
    {
        address: '0x584D77AC190E4887AC6E910AF9C8357346ECEB6F',
        symbol: 'CAN',
    },
    {
        address: '0x587C16B84C64751760F6E3E7E32F896634704352',
        symbol: 'WHALE',
    },
    {
        address: '0x5921DEE8556C4593EEFCFAD3CA5E2F618606483B',
        symbol: 'anyMTLX',
    },
    {
        address: '0x5941F87EB62737EC5EBBECAB3E373C40FE40566B',
        symbol: 'MNG',
    },
    {
        address: '0x5A3010D4D8D3B5FB49F8B6E57FB9E48063F16700',
        symbol: 'BSCPAD',
    },
    {
        address: '0x33A46B5B71F4689FF290DA93E08972917A5E6634',
        symbol: 'bURUS',
    },
    {
        address: '0x5A726A26EDB0DF8FD55F03CC30AF8A7CEA81E78D',
        symbol: 'CWT',
    },
    {
        address: '0x5AC69C40BC7363EA7D98574C78F4F54DBECBD54B',
        symbol: 'MOONRABBIT',
    },
    {
        address: '0x5B1BAEC64AF6DC54E6E04349315919129A6D3C23',
        symbol: 'DXCT',
    },
    {
        address: '0x5B321324791A65DC3759ABBC3AF031E98ECD47CF',
        symbol: 'O3hacker',
    },
    {
        address: '0x5C46C55A699A6359E451B2C99344138420C87261',
        symbol: 'iBG',
    },
    {
        address: '0x5D0158A5C3DDF47D4EA4517D8DB0D76AA2E87563',
        symbol: 'BONDLY',
    },
    {
        address: '0x5DD1E31E1A0E2E077AC98D2A4B781F418CA50387',
        symbol: 'ZLW',
    },
    {
        address: '0x5DDB331C3BA48A1D68CBF50DD3BC7AAC407DC115',
        symbol: 'NMBTC',
    },
    {
        address: '0x7083609FCE4D1D8DC0C979AAB8C869EA2C873402',
        symbol: 'DOT',
    },
    {
        address: '0x5DE2BA7E985D8B7F6DFE547CB20A1F40884308FE',
        symbol: 'GREEN',
    },
    {
        address: '0x5E0B09B04D6990E76DFE9BF84552A940FD0BE05E',
        symbol: 'REX',
    },
    {
        address: '0x5E7414411DC698A344B8061CE33896AC24666883',
        symbol: 'FAM',
    },
    {
        address: '0x8F8A854865C7B16F75F2B8F251475558045D29A3',
        symbol: 'FENIX',
    },
    {
        address: '0x5E90253FBAE4DAB78AA351F4E6FED08A64AB5590',
        symbol: 'BONFIRE',
    },
    {
        address: '0x5F31233683C125FC254F1AC856D63B812FDF9A3F',
        symbol: 'PERRA',
    },
    {
        address: '0x5FC8A176CECCB9D65779804F17632CE6571FBE29',
        symbol: 'TUTU',
    },
    {
        address: '0x8E518202C9575722183DA92555FE64940AAA9C50',
        symbol: 'CSO',
    },
    {
        address: '0x6051DED779CE26646B213E22AB69805F5BCA4DF5',
        symbol: 'Super_ADA',
    },
    {
        address: '0x60B3BC37593853C04410C4F07FE4D6748245BF77',
        symbol: 'SHIELD',
    },
    {
        address: '0x617724974218A18769020A70162165A539C07E8A',
        symbol: 'OLIVE',
    },
    {
        address: '0x0328A69B363A16F66810B23CB0B8D32ABADB203D',
        symbol: 'KANA',
    },
    {
        address: '0x631E1E455019C359B939FE214EDC761D36BF6AD6',
        symbol: 'PINKPANDA',
    },
    {
        address: '0x641A6DC991A49F7BE9FE3C72C5D0FBB223EDB12F',
        symbol: 'REFI',
    },
    {
        address: '0x6452D525532658B23484EB1897AF8B9325CA67B9',
        symbol: 'ROVER',
    },
    {
        address: '0x64D3638A7D8747EEE7BD5D402CC5F5BD00DC27DC',
        symbol: 'sYSL',
    },
    {
        address: '0x64F36701138F0E85CC10C34EA535FDBADCB54147',
        symbol: 'AINU',
    },
    {
        address: '0x658E64FFCF40D240A43D52CA9342140316AE44FA',
        symbol: 'OIN',
    },
    {
        address: '0x667BEBFF5CDA3C4A460B514AB478DA0A8CF80910',
        symbol: 'BEST',
    },
    {
        address: '0x673DA443DA2F6AE7C5C660A9F0D3DD24D1643D36',
        symbol: 'RAINBOW',
    },
    {
        address: '0x67D66E8EC1FD25D98B3CCD3B19B7DC4B4B7FC493',
        symbol: 'FEED',
    },
    {
        address: '0x67EE3CB086F8A16F34BEE3CA72FAD36F7DB929E2',
        symbol: 'DODO',
    },
    {
        address: '0x681FD3E49A6188FC526784EE70AA1C269EE2B887',
        symbol: 'FLy',
    },
    {
        address: '0x6826DDFD0FEFB094F298A85C92FBBFCCAB0B3E8E',
        symbol: 'RES',
    },
    {
        address: '0x68848E1D1FFD7B38D103106C74220C1AD3494AFC',
        symbol: 'RBunny',
    },
    {
        address: '0x68E374F856BF25468D365E539B700B648BF94B67',
        symbol: 'MIST',
    },
    {
        address: '0x68FB7F7D945B3362B45355A4CB441FFDC9D99108',
        symbol: 'BOOBS',
    },
    {
        address: '0x6B23C89196DEB721E6FD9726E6C76E4810A464BC',
        symbol: 'XWG',
    },
    {
        address: '0x6B65310B0A053E3E67492A0258A1A204322A6AE4',
        symbol: 'EYERA',
    },
    {
        address: '0x6BFD576220E8444CA4CC5F89EFBD7F02A4C94C16',
        symbol: 'SMG',
    },
    {
        address: '0x6C1DE9907263F0C12261D88B65CA18F31163F29D',
        symbol: 'OCTI',
    },
    {
        address: '0x6C1EFBED2F57DD486EC091DFFD08EE5235A570B1',
        symbol: 'PNDR',
    },
    {
        address: '0x6CB288F6FEBEE2AB7CA775B8EAB37B77FC138EE8',
        symbol: 'MIGO',
    },
    {
        address: '0x6EBCD816FA093EFEF6EF9345C56D5F103FB0D798',
        symbol: 'JDW',
    },
    {
        address: '0x6ED390BEFBB50F4B492F08EA0965735906034F81',
        symbol: 'QBERT',
    },
    {
        address: '0x6F6350D5D347AA8F7E9731756B60B774A7ACF95B',
        symbol: 'TENGU',
    },
    {
        address: '0x6F8F7FD4C1C07DA8FA5C4D4E59AFBFD7B47D39C4',
        symbol: 'FStar',
    },
    {
        address: '0x70802AF0BA10DD5BB33276B5B37574B6451DB3D9',
        symbol: 'WUDO',
    },
    {
        address: '0x708739980021A0B0B2E555383FE1283697E140E9',
        symbol: 'BLS',
    },
    {
        address: '0x7097F42B083526E5416FD2C653856B4BD2E54370',
        symbol: 'PitAkita',
    },
    {
        address: '0x70A44672B9BBCF4D49DCEAA610EB580BD3C94C52',
        symbol: 'GAMESAFE',
    },
    {
        address: '0x7128E52CA302C5F5BEEB801B6AD373FDEBE3DC5E',
        symbol: 'OCAT',
    },
    {
        address: '0x715D400F88C167884BBCC41C5FEA407ED4D2F8A0',
        symbol: 'AXS',
    },
    {
        address: '0x72A634A80D7DD48F83785BCD04FC603418F99EF7',
        symbol: 'BEXT',
    },
    {
        address: '0x72EB1AFDDB5652E0F5C7B9A6CC1C3241348B16C6',
        symbol: 'PIZZA',
    },
    {
        address: '0x73F67AE7F934FF15BEABF55A28C2DA1EEB9B56EC',
        symbol: 'NFT11',
    },
    {
        address: '0x7428BE82FD79D4C98650A7C67DE9682A64FCAB71',
        symbol: 'CPHR',
    },
    {
        address: '0x7475A30F545FFCC1B43AA6206116534AC2F54BE6',
        symbol: 'SLDoge',
    },
    {
        address: '0x74926B3D118A63F6958922D3DC05EB9C6E6E00C6',
        symbol: 'DOGGY',
    },
    {
        address: '0x755D69452DA7F62FDF820A984C400DDE3A7B945D',
        symbol: 'FATE',
    },
    {
        address: '0x762539B45A1DCCE3D36D080F74D1AED37844B878',
        symbol: 'LINA',
    },
    {
        address: '0x23E8A70534308A4AAF76FB8C32EC13D17A3BD89E',
        symbol: 'lUSD',
    },
    {
        address: '0x7665CB7B0D01DF1C9F9B9CC66019F00ABD6959BA',
        symbol: 'OWN',
    },
    {
        address: '0x77018282FD033DAF370337A5367E62D8811BC885',
        symbol: 'POOLZ',
    },
    {
        address: '0x7708343575E0E57168C4ACD45A0F296939DE7415',
        symbol: 'ThaiRB',
    },
    {
        address: '0x7762A14082AB475C06D3868B385E46AE27017231',
        symbol: 'PRV',
    },
    {
        address: '0x778682C19797D985C595429FBC51D67736013A86',
        symbol: 'Hegg',
    },
    {
        address: '0x782D8C5C0150BEDC70D94FE6737763EDE839F205',
        symbol: 'ShibaRocket',
    },
    {
        address: '0x78650B139471520656B9E7AA7A5E9276814A38E9',
        symbol: 'BTCST',
    },
    {
        address: '0x78A499A998BDD5A84CF8B5ABE49100D82DE12F1C',
        symbol: 'JOJO',
    },
    {
        address: '0x79D288F4D2A3FEB3709CF0471CEFE94002BB1C16',
        symbol: 'BuBa',
    },
    {
        address: '0x7A9F28EB62C791422AA23CEAE1DA9C847CBEC9B0',
        symbol: 'WATCH',
    },
    {
        address: '0x7BC75E291E656E8658D66BE1CC8154A3769A35DD',
        symbol: 'LIME',
    },
    {
        address: '0x7C38870E93A1F959CB6C533EB10BBC3E438AAC11',
        symbol: 'ALM',
    },
    {
        address: '0x7C67DCCB04B67D4666FD97B2A00BB6D9B8D82E3F',
        symbol: 'GOAT',
    },
    {
        address: '0x7CCE94C0B2C8AE7661F02544E62178377FE8CF92',
        symbol: 'DaddyDoge',
    },
    {
        address: '0x7D0A4735B6191ED58A36CD151895A780B7703D0C',
        symbol: 'ZBB',
    },
    {
        address: '0x7D0FA3B5771D9A71B188F9FF3D2EBAABF3FAF299',
        symbol: 'OMINO',
    },
    {
        address: '0x7DD1D96477CBC70A0AB899CE56321349E393CF0B',
        symbol: 'BBSWAP',
    },
    {
        address: '0x7E35D0E9180BF3A1FC47B0D110BE7A21A10B41FE',
        symbol: 'OVR',
    },
    {
        address: '0x7E47998E7174D723B06CCF7E4516AF815A2D7046',
        symbol: 'NA7A',
    },
    {
        address: '0x7FBEC0BB6A7152E77C30D005B5D49CBC08A602C3',
        symbol: 'DDOS',
    },
    {
        address: '0x802C68730212295149F2BEA78C25E2CF5A05B8A0',
        symbol: 'CORGI',
    },
    {
        address: '0x8076C74C5E3F5852037F31FF0093EEB8C8ADD8D3',
        symbol: 'SAFEMOON',
    },
    {
        address: '0xBE510DA084E084E3C27B20D79C135DC841135C7F',
        symbol: 'POLX',
    },
    {
        address: '0x810EE35443639348ADBBC467B33310D2AB43C168',
        symbol: 'CYC',
    },
    {
        address: '0x8239F3C231B50FBD25E8287B2738BE00D105D4B3',
        symbol: 'Elon inu',
    },
    {
        address: '0x8263CD1601FE73C066BF49CC09841F35348E3BE0',
        symbol: 'ALU',
    },
    {
        address: '0xD7730681B1DC8F6F969166B29D8A5EA8568616A3',
        symbol: 'NAFT',
    },
    {
        address: '0x833F307AC507D47309FD8CDD1F835BEF8D702A93',
        symbol: 'REVV',
    },
    {
        address: '0x834613C64522725B23B458AF04ED1590D189962F',
        symbol: 'DKKS',
    },
    {
        address: '0x835B6D2B89727B0F2C84B0327F7F2CAB6B32BD61',
        symbol: '$NWF',
    },
    {
        address: '0x8379B36826675450C35E1EB45D2FD1E1AE8494A4',
        symbol: 'ALKOM',
    },
    {
        address: '0x8429726DBFF5C2F9BCCA80A5E6BA1DE79F42CDBE',
        symbol: 'GTEA',
    },
    {
        address: '0x843D4A358471547F51534E3E51FAE91CB4DC3F28',
        symbol: 'lowb',
    },
    {
        address: '0x844FA82F1E54824655470970F7004DD90546BB28',
        symbol: 'DOP',
    },
    {
        address: '0x8461708744DAB03391961D72DDD72E6687F478F2',
        symbol: 'P2E',
    },
    {
        address: '0x8578EB576E126F67913A8BC0622E0A22EBA0989A',
        symbol: 'PANDA',
    },
    {
        address: '0x8595F9DA7B868B1822194FAED312235E43007B49',
        symbol: 'BTT',
    },
    {
        address: '0x85C128EE1FEEB39A59490C720A9C563554B51D33',
        symbol: 'KEY',
    },
    {
        address: '0x85EE8E3E0068EDEEEE960979958D7F61416A9D84',
        symbol: 'STORY',
    },
    {
        address: '0x864612D802CB25364C9F95C51E1E59ABC442C828',
        symbol: 'ODIN',
    },
    {
        address: '0x8789337A176E6E7223FF115F1CD85C993D42C25C',
        symbol: 'COP',
    },
    {
        address: '0x8850D2C68C632E3B258E612ABAA8FADA7E6958E5',
        symbol: 'PIG',
    },
    {
        address: '0x8855CFBA493D8A22F924A5CE1B06EFBCEA68FFEC',
        symbol: 'BIMP',
    },
    {
        address: '0x88C55B3255AE1E6628C953C5CDFF27AD3CC33C81',
        symbol: 'DLegends',
    },
    {
        address: '0xA6CB08514BFF2AC5F7583959818E4842EF91E74F',
        symbol: 'TRE',
    },
    {
        address: '0x890CC7D14948478C98A6CD7F511E1F7F7F99F397',
        symbol: 'SAFU',
    },
    {
        address: '0x89671544190EE39E469C8393009875DF6565457A',
        symbol: 'GRIMEX',
    },
    {
        address: '0x899313832DAF1929007D16067812FEBBA28DD3CC',
        symbol: 'TBT',
    },
    {
        address: '0x8A5D7FCD4C90421D21D30FCC4435948AC3618B2F',
        symbol: 'MONSTA',
    },
    {
        address: '0x8A646EC31EE33B12FF47E6C7DAAF4BC4DF9AE54A',
        symbol: 'FAIRLIFE',
    },
    {
        address: '0x8AA688AB789D1848D131C65D98CEAA8875D97EF1',
        symbol: 'MTV',
    },
    {
        address: '0x8DB1D28EE0D822367AF8D220C0DC7CB6FE9DC442',
        symbol: 'ETHPAD',
    },
    {
        address: '0xA39D4A24226102765F48678D87D80387DD0C5ACB',
        symbol: 'MINIUSDC',
    },
    {
        address: '0xC8CDD8B226461C736BBE5FCC7978014BE08CB99E',
        symbol: 'HGN',
    },
    {
        address: '0x8B3B45E48BE6C31366FFD9DD4F29C1EDFFCBA97D',
        symbol: 'WRAITH',
    },
    {
        address: '0x8BAC919FBCA13D67E9F901BF41537931EFFF0E7D',
        symbol: 'CYN',
    },
    {
        address: '0xC705E5E54F8CFF7FB204E2F8472CA05AB6A9A421',
        symbol: 'CYNS',
    },
    {
        address: '0x8D03E069840D6FB103ABC4F640C8CC07F7F4BC10',
        symbol: 'BLOSM',
    },
    {
        address: '0x8D238F79EB1BBACB407AC411BA94F04A331E5257',
        symbol: 'DFH',
    },
    {
        address: '0x8D32605B25921B548EEFCCDABC11E46543597AA7',
        symbol: 'BT',
    },
    {
        address: '0x8E3BCC334657560253B83F08331D85267316E08A',
        symbol: 'BRBC',
    },
    {
        address: '0x8E984E03AB35795C60242C902ECE2450242C90E9',
        symbol: 'KAMPAY',
    },
    {
        address: '0x8E9A916B6920136110A77E9ACAF878862358A467',
        symbol: 'EGR',
    },
    {
        address: '0x8F1E60D84182DB487AC235ACC65825E50B5477A1',
        symbol: 'LDFI',
    },
    {
        address: '0x9029FDFAE9A03135846381C7CE16595C3554E10A',
        symbol: 'OOE',
    },
    {
        address: '0x90DB4C8DDC0055AE03CDE0B4E83FBDE7DE711464',
        symbol: 'BULL',
    },
    {
        address: '0x9133049FB1FDDC110C92BF5B7DF635ABB70C89DC',
        symbol: 'PINK',
    },
    {
        address: '0x92A42DB88ED0F02C71D439E55962CA7CAB0168B5',
        symbol: 'TRDG',
    },
    {
        address: '0x932D851CC084A37D03393C198723D0BE465BBF00',
        symbol: '牛魔王',
    },
    {
        address: '0x9400AA8EB5126D20CDE45C7822836BFB70F19878',
        symbol: 'DRF',
    },
    {
        address: '0x94018906D88C9EFCBCA50F7E0221321AD503E9EB',
        symbol: 'BABYPUNK',
    },
    {
        address: '0x9452D45D33490234B8C96F42342F1BE28C0FE097',
        symbol: 'PERRY',
    },
    {
        address: '0x947950BCC74888A40FFA2593C5798F11FC9124C4',
        symbol: 'SUSHI',
    },
    {
        address: '0x948B7B39E665A8ADD9E128B0C378F99152172274',
        symbol: 'WRK',
    },
    {
        address: '0x94FF3E9C00A683D60DDEE1F02968419ABB3C2454',
        symbol: 'MINIWIZI',
    },
    {
        address: '0x954BE3E377661A2B01841E487CA294C4204DBB79',
        symbol: 'SHIBM',
    },
    {
        address: '0x9617857E191354DBEA0B714D78BC59E57C411087',
        symbol: 'LMT',
    },
    {
        address: '0x968F6F898A6DF937FC1859B323AC2F14643E3FED',
        symbol: 'NWC',
    },
    {
        address: '0xCA3D712CB310181EAFC82CF8A055EC36D4C9994B',
        symbol: 'DRACO',
    },
    {
        address: '0x96D6C33CD7CE1D07B3351FCFCEBF8B325684E8E0',
        symbol: 'KBIT',
    },
    {
        address: '0x97641C20355571820F591839D972AD2D38AD9F00',
        symbol: 'H2O',
    },
    {
        address: '0x97C6825E6911578A515B11E25B552ECD5FE58DBA',
        symbol: 'BM',
    },
    {
        address: '0x984811E6F2695192ADD6F88615DF637BF52A5CAE',
        symbol: 'HOP',
    },
    {
        address: '0x989B8F0219EB7AA0BED22E24F053EB2B155F4394',
        symbol: 'MommyDoge',
    },
    {
        address: '0x9974F4E6FF49AC39469928E5D7CCA3E8649AE6B8',
        symbol: 'PATH',
    },
    {
        address: '0x99DAB6065951BECAC1DECBAC0C1A16B9BBF12913',
        symbol: 'GEG',
    },
    {
        address: '0x99E3259D1D780746C62B4A90833D607B40FB36CE',
        symbol: 'CCDOGE',
    },
    {
        address: '0x9A3077F34CC30F9BF8E93A0369119BAE0113D9CC',
        symbol: 'PLAY',
    },
    {
        address: '0x0ABD3E3502C15EC252F90F64341CBA74A24FBA06',
        symbol: 'SPACE',
    },
    {
        address: '0x9A624B4190F38C888BBF7F845F14198F9C951DE7',
        symbol: 'ACE',
    },
    {
        address: '0x9B26E16377AD29A6CCC01770BCFB56DE3A36D8B2',
        symbol: 'HERO',
    },
    {
        address: '0x9BA70E671E425DA859A854F26025100C93436CED',
        symbol: 'IGNIS',
    },
    {
        address: '0x9C541BE9BD7933D60ABB2E13720B9D06A66BA5B3',
        symbol: 'LG',
    },
    {
        address: '0x9C65AB58D8D978DB963E63F2BFB7121627E3A739',
        symbol: 'MDX',
    },
    {
        address: '0x965F527D9159DCE6288A2219DB51FC6EEF120DD1',
        symbol: 'BSW',
    },
    {
        address: '0x9C9D4302A1A550B446401E56000F76BC761C3A33',
        symbol: 'GLASS',
    },
    {
        address: '0x9D70A3EE3079A6FA2BB16591414678B7AD91F0B5',
        symbol: 'MEPAD',
    },
    {
        address: '0x9D986A3F147212327DD658F712D5264A73A1FDB0',
        symbol: 'LAND',
    },
    {
        address: '0x9E95CB3D0560F9CBA88991F828322526851BFB56',
        symbol: 'CODEX',
    },
    {
        address: '0x9F589E3EABE42EBC94A44727B3F3531C0C877809',
        symbol: 'TKO',
    },
    {
        address: '0xA0C2A0A34C04135429A38F7F9A4354090E00145A',
        symbol: 'PRX',
    },
    {
        address: '0xA0ECAF5EDF5DF69EDC7768DA897DCEA7D0C8E526',
        symbol: 'FAR',
    },
    {
        address: '0xA184088A740C695E156F91F5CC086A06BB78B827',
        symbol: 'AUTO',
    },
    {
        address: '0xA19B7A43455FF84369642E21CABA62EF3BC4C950',
        symbol: 'DOM',
    },
    {
        address: '0xA1FAA113CBE53436DF28FF0AEE54275C13B40975',
        symbol: 'ALPHA',
    },
    {
        address: '0xA2120B9E674D3FC3875F415A7DF52E382F141225',
        symbol: 'ATA',
    },
    {
        address: '0xA2A26349448DDAFAE34949A6CC2CECF78C0497AC',
        symbol: 'TSC',
    },
    {
        address: '0xA38898A4AE982CB0131104A6746F77FA0DA57AAA',
        symbol: 'QBIT',
    },
    {
        address: '0xA4F93159CE0A4B533B443C74B89967C60A5969F8',
        symbol: 'BFT',
    },
    {
        address: '0xA532CFAA916C465A094DAF29FEA07A13E41E5B36',
        symbol: 'HIBIKI',
    },
    {
        address: '0xA53E61578FF54F1AD70186BE99332A6E20B6FFA9',
        symbol: 'GDOGE',
    },
    {
        address: '0xA57AC35CE91EE92CAEFAA8DC04140C8E232C2E50',
        symbol: 'PIT',
    },
    {
        address: '0xA656F993BD14B2B59A28D1E610476AD18849B107',
        symbol: 'SAFERMOON',
    },
    {
        address: '0xA677BC9BDB10329E488A4D8387ED7A08B2FC9005',
        symbol: 'MGP',
    },
    {
        address: '0xA67A13C9283DA5AABB199DA54A9CB4CD8B9B16BA',
        symbol: 'NBL',
    },
    {
        address: '0xA6CD33635AA4ED2CDF1A059973F077C2480BE3A6',
        symbol: 'ZENY',
    },
    {
        address: '0xA79EE2EC8B18BCE6F13A53CA229D4F490A02FD86',
        symbol: 'BBB',
    },
    {
        address: '0xA7F552078DCC247C2684336020C03648500C6D9F',
        symbol: 'EPS',
    },
    {
        address: '0xA9C41A46A6B3531D28D5C32F6633DD2FF05DFB90',
        symbol: 'WEX',
    },
    {
        address: '0xAAA7A10A8EE237EA61E8AC46C50A8DB8BCC1BAAA',
        symbol: 'QANX',
    },
    {
        address: '0xAAD87F47CDEA777FAF87E7602E91E3A6AFBE4D57',
        symbol: 'PYE',
    },
    {
        address: '0xAB14952D2902343FDE7C65D7DC095E5C8BE86920',
        symbol: 'GOMA',
    },
    {
        address: '0x96D67A9C5329F57384C7E7BBB082A81475D2952F',
        symbol: 'ACE',
    },
    {
        address: '0xAB6B429C73C22ECABC763635DACE7EFAC524993C',
        symbol: 'DAOvc',
    },
    {
        address: '0xABC6790673A60B8A7F588450F59D2D256B1AEF7F',
        symbol: 'OMN',
    },
    {
        address: '0xAC322D41F66242E41F86CD069D99F1C24BC2185B',
        symbol: 'VDM',
    },
    {
        address: '0xAC51066D7BEC65DC4589368DA368B212745D63E8',
        symbol: 'ALICE',
    },
    {
        address: '0xAC789DCAD2437C3224C25A009AE103AB6D1A9128',
        symbol: 'MSG',
    },
    {
        address: '0xAC86E5F9BA48D680516DF50C72928C2EC50F3025',
        symbol: 'PHX',
    },
    {
        address: '0xACB2D47827C9813AE26DE80965845D80935AFD0B',
        symbol: 'MCRN',
    },
    {
        address: '0xECA41281C24451168A37211F0BC2B8645AF45092',
        symbol: 'TPT',
    },
    {
        address: '0xAD6CAEB32CD2C308980A548BD0BC5AA4306C6C18',
        symbol: 'BAND',
    },
    {
        address: '0xAD86D0E9764BA90DDD68747D64BFFBD79879A238',
        symbol: 'PAID',
    },
    {
        address: '0xAD9787017E82F6368BBE4893B475CAADA2258564',
        symbol: 'BTA',
    },
    {
        address: '0xADCFC6BF853A0A8AD7F9FF4244140D10CF01363C',
        symbol: 'TPAD',
    },
    {
        address: '0xAEF0D72A118CE24FEE3CD1D43D383897D05B4E99',
        symbol: 'WIN',
    },
    {
        address: '0xAF2F095CCE91C8AB6AEF7C494E8FFBEE4F8467CF',
        symbol: 'POKE',
    },
    {
        address: '0xAF7E9EA4BC4720DE73956793FE106F5CAD9BE562',
        symbol: 'PNK',
    },
    {
        address: '0xAF83F292FCED83032F52CED45EF7DBDDB586441A',
        symbol: 'TWIN',
    },
    {
        address: '0xAFB2997FE9A99022E61C7E01B974E0E3D7704B02',
        symbol: 'MOMO',
    },
    {
        address: '0x6A6CCF15B38DA4B5B0EF4C8FE9FEFCB472A893F9',
        symbol: 'MNST',
    },
    {
        address: '0xAFFBF5D4693C93F23C35A08E31439EA53D952351',
        symbol: 'BabyETH',
    },
    {
        address: '0xB09FE1613FE03E7361319D2A43EDC17422F36B09',
        symbol: 'BOG',
    },
    {
        address: '0xB1CED2E320E3F4C8E3511B1DC59203303493F382',
        symbol: 'MOONLIGHT',
    },
    {
        address: '0xB26D2D67C7652F361B73552310DA5753041B3867',
        symbol: 'BPET',
    },
    {
        address: '0xB26F540B3BF89C60409F96730F5D7DFD849D79EF',
        symbol: 'DM5',
    },
    {
        address: '0xB277DB4F19FC79F87569AC34EFF5D1D50D4AEB8B',
        symbol: 'CPOO',
    },
    {
        address: '0xB27ADAFFB9FEA1801459A1A81B17218288C097CC',
        symbol: 'POOCOIN',
    },
    {
        address: '0xB28A7F8F5328FAFFDD862985177583C2BB71E016',
        symbol: 'POLO',
    },
    {
        address: '0xE7CB24F449973D5B3520E5B93D88B405903C75FB',
        symbol: 'BNBTC',
    },
    {
        address: '0xB49B7E0742ECB4240FFE91661D2A580677460B6A',
        symbol: 'PERI',
    },
    {
        address: '0xB4BF64B17E270B50D00658E3C0E2FBDEFABDD87B',
        symbol: 'CHEESE',
    },
    {
        address: '0xB61E0654D8B3E6F93B79DE8F1983B45EBC27C3CF',
        symbol: 'ReBa',
    },
    {
        address: '0xB626213CB1D52CAA1ED71E2A0E62C0113ED8D642',
        symbol: 'HGHG',
    },
    {
        address: '0xB7148AE5745F4753673511B1315D6089E64D83D1',
        symbol: 'CTH',
    },
    {
        address: '0xB73569A56614867601CD330DEA8AB5A8F5570A2C',
        symbol: 'BurnDoge',
    },
    {
        address: '0xB7B36CA86685AF52186F1F9394E91D115A9DA654',
        symbol: 'HAM',
    },
    {
        address: '0xB93BA7DC61ECFCED69067151FC00C41CA369A797',
        symbol: 'WENMOON',
    },
    {
        address: '0xB9654A42F0F5DCDEF5617DEBF8BD048E33F180E7',
        symbol: 'THUNDERBNB',
    },
    {
        address: '0xB98D864DDCB573567B3A2258C9E5CAB58FE7974E',
        symbol: 'PHX',
    },
    {
        address: '0xBA07EED3D09055D60CAEF2BDFCA1C05792F2DFAD',
        symbol: 'MiniDOGE',
    },
    {
        address: '0x016C285D5B918B92AA85EF1E147498BADFE30D69',
        symbol: '100x',
    },
    {
        address: '0x0211E893A2FDD7768A1545C2E1B8E7019323D61E',
        symbol: 'OVOC',
    },
    {
        address: '0x02618C556D075D2C5ACA9021BE2773764969BB51',
        symbol: 'Ralph',
    },
    {
        address: '0x02D2905A63087ED02C245142F2B65C7DCF49DEB6',
        symbol: 'AR',
    },
    {
        address: '0x03031384C44E3FE060467418E0853E976F48DF65',
        symbol: 'LCAT',
    },
    {
        address: '0x035E8DF41CFB23765927B85D2CFA97A20D025363',
        symbol: 'BABYDOPE',
    },
    {
        address: '0x043B49749E0016E965600D502E2177CA2D95B3D9',
        symbol: 'RACA',
    },
    {
        address: '0x0523215DCAFBF4E4AA92117D13C6985A3BEF27D7',
        symbol: 'GMR',
    },
    {
        address: '0x06B889A7A7FA15D8CC7CFF147962C4232CCE7CF0',
        symbol: 'SAUNA',
    },
    {
        address: '0x09EB6E636DE17E4EA0D6356352E60A10DB1C83AE',
        symbol: 'THTKC',
    },
    {
        address: '0x0A7BB2BDDA1C0EA02D98A7B048F4BF809F40277B',
        symbol: 'THUNDERADA',
    },
    {
        address: '0x0A927AB3B0F48826210AD4A43A953277AA7DA8F7',
        symbol: 'TOP',
    },
    {
        address: '0x0B34D4A7C5BFC7004B9A193F8309523E99CA766E',
        symbol: 'SHON',
    },
    {
        address: '0x0C1B3983D2A4AA002666820DE5A0B43293291EA6',
        symbol: 'PEPE',
    },
    {
        address: '0x0CC14BC2AA9770BCEF3A11D27FBFA2AD2B797BDC',
        symbol: 'AXIESWAP',
    },
    {
        address: '0x0DE08C1ABE5FB86DD7FD2AC90400ACE305138D5B',
        symbol: 'iDNA',
    },
    {
        address: '0x0E2EB4C2F02D16380A740376B30734300708629A',
        symbol: 'GRAPE',
    },
    {
        address: '0x0E5F989CE525ACC4EE45506AF91964F7F4C9F2E9',
        symbol: 'RYOSHI',
    },
    {
        address: '0x10BD76630349F649697CB6C75B7DE00854381FC5',
        symbol: 'STRAY',
    },
    {
        address: '0x11C0C93035D1302083EB09841042CFA582839A8C',
        symbol: 'KSHIB',
    },
    {
        address: '0x1251CB6AEAE6CEE873AEDB015F056FDD5C2CA2A5',
        symbol: 'BR',
    },
    {
        address: '0x14E757051046FABC3CD624C3D08638377779DBF9',
        symbol: 'DARA',
    },
    {
        address: '0x150159C72F0F9EF9000BF95E242DE6682480D6D3',
        symbol: 'MNSTP',
    },
    {
        address: '0x15AAC2236DD3F14C2F0AA0F60D70580A8A1961B2',
        symbol: 'TDG',
    },
    {
        address: '0x15B36B27094A2C618E65C1B54EAFBD20A9D83924',
        symbol: 'HOLDMOON',
    },
    {
        address: '0x17922598458A7F29E3CE2BF088DFF2B1B474771A',
        symbol: 'DRSL',
    },
    {
        address: '0x17ACC21DA1CD31D273C3F54B7D5DD556C8715B79',
        symbol: 'CDZ',
    },
    {
        address: '0x17D749D3E2AC204A07E19D8096D9A05C423EA3AF',
        symbol: 'LTRBT',
    },
    {
        address: '0x18FF245C134D9DAA6FED977617654490BA4DA526',
        symbol: 'MASKDOGE',
    },
    {
        address: '0x1ADE17B4B38B472B5259BBC938618226DF7B5CA8',
        symbol: 'QUAM',
    },
    {
        address: '0x1B41821625D8CFAD21CD56491DACD57ECACC83DE',
        symbol: 'NDC',
    },
    {
        address: '0x1FFD0B47127FDD4097E54521C9E2C7F0D66AAFC5',
        symbol: 'TXL',
    },
    {
        address: '0x20275F1F6BD60B57D0F7FB0E9F2C1FCD5788C36D',
        symbol: 'WIFE',
    },
    {
        address: '0x20512EE0052236B009772AF0ED22BC58B40C27B9',
        symbol: 'MUSO',
    },
    {
        address: '0x2065E3BD318F155ABE5AD6AA263596F197112261',
        symbol: 'ULTGG',
    },
    {
        address: '0x21828B72F3B9A9DC59B8B9B225DA992B2B192E9A',
        symbol: 'MINISHARK',
    },
    {
        address: '0x2270528DD9C3AA19906C501ADB279BF88292FA1F',
        symbol: 'ROCKETDOGE',
    },
    {
        address: '0x231CF6F78620E42FE00D0C5C3088B427F355D01C',
        symbol: 'MOVE',
    },
    {
        address: '0x23C28E9346C82228FB2B62B20B6FE5D75989F5B2',
        symbol: 'COVIDTOKEN',
    },
    {
        address: '0x2406DCE4DA5AB125A18295F4FB9FD36A0F7879A2',
        symbol: 'CPD',
    },
    {
        address: '0x25B070898A6C899B31E81DE686B82241F5964AB4',
        symbol: 'BR',
    },
    {
        address: '0x27A881D1D6B538FD24BE740F035C95D0D828EEAD',
        symbol: 'MDynamix',
    },
    {
        address: '0x2859E4544C4BB03966803B044A93563BD2D0DD4D',
        symbol: 'SHIB',
    },
    {
        address: '0x2881A6BD504E323F70159D032F89374222E40D22',
        symbol: 'CMC',
    },
    {
        address: '0x289F347AC469BC1B7359ED95C87C75AC2C3EB16F',
        symbol: 'FCN',
    },
    {
        address: '0x29C182E9D6BCDA4F7331A903DEFA025E7B416964',
        symbol: 'FUCKMUSK',
    },
    {
        address: '0x2A9718DEFF471F3BB91FA0ECEAB14154F150A385',
        symbol: 'ElonGate',
    },
    {
        address: '0x2B31B83D2A960D648E9C8D3B84DF5452C80AB947',
        symbol: 'SMD',
    },
    {
        address: '0x2CC970E45B359D24EE76B4902FB6E9F50375A8A6',
        symbol: 'ANM',
    },
    {
        address: '0x2CFAF30EB82940D52EC7C59495F44F6CE4892AAF',
        symbol: 'HOOKERS',
    },
    {
        address: '0x2EED4682197834708C0EA8D11D683440BBE104D1',
        symbol: 'Nafty',
    },
    {
        address: '0x2F053E33BD590830858161D42C67E9E8A9390019',
        symbol: 'VNT',
    },
    {
        address: '0x2F52F99DB24B0CBEDD16DA57B098226D3B0831E8',
        symbol: 'littlegecko',
    },
    {
        address: '0x303DE4BDB189B951F875EB4A8ECDE2985138161E',
        symbol: 'USDs',
    },
    {
        address: '0x330F4FE5EF44B4D0742FE8BED8CA5E29359870DF',
        symbol: 'JADE',
    },
    {
        address: '0x3699D20715C750ABA5A108BACA5C555347DA034F',
        symbol: 'CDOGE',
    },
    {
        address: '0x39495112F06ED3BF3BE508BA520C0F2176EF9BD9',
        symbol: 'MOONASCENT',
    },
    {
        address: '0x398F7827DCCBEFE6990478876BBF3612D93BAF05',
        symbol: 'MIX',
    },
    {
        address: '0x3AD405EF7AEA80CCB41BEEF0A74510E18FEEF190',
        symbol: 'SDBY',
    },
    {
        address: '0x3AEFF4E27E1F9144ED75BA65A80BDFEE345F413E',
        symbol: 'BUMN',
    },
    {
        address: '0x3BF7E66B905BF2AAA08C45F0BDAB0C4B26C36D4A',
        symbol: 'SBD',
    },
    {
        address: '0x3C1748D647E6A56B37B66FCD2B5626D0461D3AA0',
        symbol: 'DNXC',
    },
    {
        address: '0x3C3F3A78A3D5BD3AC97E45A01F3E95499C6DAA69',
        symbol: 'CTR',
    },
    {
        address: '0x3C45A24D36AB6FC1925533C1F57BC7E1B6FBA8A4',
        symbol: 'ROOM',
    },
    {
        address: '0x3DC2D7434BDBB4CA1A8A6BCC8A8075AEAE2D2179',
        symbol: 'QUAI',
    },
    {
        address: '0x3E68D0543B70CFBA796ED86B06340BD29242BCCD',
        symbol: 'SafeHold',
    },
    {
        address: '0x3ED0F7438FD06E560CC0E12AF56107AC56DC59D6',
        symbol: 'BITBOX',
    },
    {
        address: '0x42B2E2D3D59634BC2470BF9ED678373182164F73',
        symbol: 'ENK',
    },
    {
        address: '0x42F3008F6945F052C31E7680F7F78C512099B904',
        symbol: 'WALBT',
    },
    {
        address: '0x43FFFB14DB56BFD6432E7ACAADFF697121861F96',
        symbol: 'FLRS',
    },
    {
        address: '0x4477B28E8B797EBAEBD2539BB24290FDFCC27807',
        symbol: '$RFG',
    },
    {
        address: '0x44FA4FD9211293A72FCBBA8D58FE6CF0BD4DF525',
        symbol: 'LIVENFT',
    },
    {
        address: '0x47F8C633AD941F3531E0A14E0EB8CC014C970072',
        symbol: 'CANDY',
    },
    {
        address: '0x49324D59327FB799813B902DB55B2A118D601547',
        symbol: 'BOSS',
    },
    {
        address: '0x4A824EE819955A7D769E03FE36F9E0C3BD3AA60B',
        symbol: 'KABOSU',
    },
    {
        address: '0x4BACB027E0BF98025D8EC91493F6512B9F0FA0DC',
        symbol: 'XOS',
    },
    {
        address: '0x4DDBA615A7F6EE612D3A23C6882B698DFBBEF7E7',
        symbol: 'SHIR',
    },
    {
        address: '0x50EA9C9F88AEAB9F554B8FFB4D7A1017957E866A',
        symbol: 'FOXT',
    },
    {
        address: '0x51B74EF86B121BED7FD08BA161326ED43E67F93E',
        symbol: 'MWA',
    },
    {
        address: '0x52DCF5BEDC061604D8C592B0079A0FF2CEA22EB7',
        symbol: 'AXO',
    },
    {
        address: '0x536372B3102E05CA9FAF123917E5F2478E6FF1A7',
        symbol: 'BEANSTALK',
    },
    {
        address: '0x53DCD4EF8E21FE014594A0854C4271A0623B31EC',
        symbol: 'X2P',
    },
    {
        address: '0x54626300818E5C5B44DB0FCF45BA4943CA89A9E2',
        symbol: 'CHECOIN',
    },
    {
        address: '0x55671114D774EE99D653D6C12460C780A67F1D18',
        symbol: 'PACOCA',
    },
    {
        address: '0x56083560594E314B5CDD1680EC6A493BB851BBD8',
        symbol: 'THC',
    },
    {
        address: '0x56B6FB708FC5732DEC1AFC8D8556423A2EDCCBD6',
        symbol: 'EOS',
    },
    {
        address: '0x5760ED58D66BA764C4C3073FC58AA471EA442EFC',
        symbol: 'XRPP',
    },
    {
        address: '0x5A68431398A6DE785994441E206259702E259C5E',
        symbol: 'REUM',
    },
    {
        address: '0x5AC52EE5B2A633895292FF6D8A89BB9190451587',
        symbol: 'BSCX',
    },
    {
        address: '0x5B0DFE077B16479715C9838EB644892008ABBFE6',
        symbol: 'BBTC',
    },
    {
        address: '0x5B30D51A8867AF1EFD19F8C21FADA82D0CE86ADD',
        symbol: 'BTC BROS',
    },
    {
        address: '0x5B5806F42D89E7A8E1E8CBB58C512B37CA01B95B',
        symbol: 'BABYALICE',
    },
    {
        address: '0x5C501CEB257700FCCD33C53FEEC9F96EDA583DD7',
        symbol: 'TRAVEL',
    },
    {
        address: '0x5C734CC8754DE9F465617570314E075BC18133F7',
        symbol: '$SafeMC',
    },
    {
        address: '0x5D0AEEB089BE5090495A3F397714779CEF313A49',
        symbol: 'PuppyDoge',
    },
    {
        address: '0x5F84CE30DC3CF7909101C69086C50DE191895883',
        symbol: 'VRT',
    },
    {
        address: '0x632B8C4E95B2F8A9309417F8D990AB9C04C77369',
        symbol: 'WET',
    },
    {
        address: '0x645E89804E29006C24F7F07D70510C849F06EB8A',
        symbol: 'BBHAM',
    },
    {
        address: '0x651BFBB26455294408AABC61A7ADF427BF149898',
        symbol: 'Mello',
    },
    {
        address: '0x68FFF3AB2B8DE1FF6AC49468B349C6BB7B3FE3CC',
        symbol: 'FAD',
    },
    {
        address: '0x69D4D2B858B3CBDDA3F365A5CE9566EAFB043D9C',
        symbol: 'TREX',
    },
    {
        address: '0x6D8734002FBFFE1C86495E32C95F732FC77F6F2A',
        symbol: 'NUX',
    },
    {
        address: '0x6D9FB3332F62FC044D5075FEEEA597A92F1CE0AD',
        symbol: 'BABYDB',
    },
    {
        address: '0x6DBCA766119226BF16D6D72E4DB5393FA2995CCB',
        symbol: 'SB',
    },
    {
        address: '0x6F51815427D9A64DFF7CDF1332D6DBB9EA93DF34',
        symbol: '$FFARM',
    },
    {
        address: '0x70DE30C81DDEE3A54B5DBDEB7D0BA029E80D34E2',
        symbol: 'HESH',
    },
    {
        address: '0x72FAA679E1008AD8382959FF48E392042A8B06F7',
        symbol: 'bALBT',
    },
    {
        address: '0x74741A079DA85312BABCA1B47AE856322BDED4F6',
        symbol: 'AVAXRP',
    },
    {
        address: '0x752D37D89CCD119F85A5607B01942D487A1DC1CE',
        symbol: 'MIST',
    },
    {
        address: '0x767B28A30E3A15DCECE7BFF7A020ADFDE9D19CF8',
        symbol: 'MRXb',
    },
    {
        address: '0x78022CE9490DF3934FDE32B20A7F61CE6A8CE633',
        symbol: 'CakeGold',
    },
    {
        address: '0x787E5285AEFE32A147F14219886FEB0BB7340371',
        symbol: 'BBTRX',
    },
    {
        address: '0x7892BCCFAC9C3187C14323F30C92598B4C51F05E',
        symbol: 'BTCI',
    },
    {
        address: '0x793B6DC07760528954C2BAD6AD129268B0347980',
        symbol: 'PUBG',
    },
    {
        address: '0x793CEA0F1003411396B3A81A77D92FE37015E7A9',
        symbol: 'CBC',
    },
    {
        address: '0x7A2C3C3EB14CF8D7E4481402E0D05C5D51A1CDFF',
        symbol: 'AHT',
    },
    {
        address: '0x7A7B1C272F7CBE1950E11134078075FF07D68310',
        symbol: 'HE-3',
    },
    {
        address: '0x7A8F2EC8218A7A9B66EEC168D9008F63E8F43FF2',
        symbol: 'te1',
    },
    {
        address: '0x7C48834445F81F2F4453EAED510EB8A3A47A7CFA',
        symbol: 'BEE',
    },
    {
        address: '0x7F2C4B118513DAFC5114EB407FF064D1426ABC8B',
        symbol: 'SURPRISE',
    },
    {
        address: '0x7F479D78380AD00341FDD7322FE8AEF766E29E5A',
        symbol: 'WHIRL',
    },
    {
        address: '0x810C76BDAD505788EA55024354A4F609153AAFD6',
        symbol: 'Samurai Cat',
    },
    {
        address: '0x812337CDC82741AA444EF95DC71222E67314F683',
        symbol: 'ENC',
    },
    {
        address: '0x81E14F0AFC175776B96F5AA864B819B74AC83330',
        symbol: 'ERIS',
    },
    {
        address: '0x82BB9E7B8D681571A68B619A01FF546C364F467A',
        symbol: 'BabyIoTeX',
    },
    {
        address: '0x838BCBE35DA6AEE1BFD4C48D994E0133B25465DF',
        symbol: 'VAULT',
    },
    {
        address: '0x851F7A700C5D67DB59612B871338A85526752C25',
        symbol: 'ARGON',
    },
    {
        address: '0x8597BA143AC509189E89AAB3BA28D661A5DD9830',
        symbol: 'VANCAT',
    },
    {
        address: '0x86B3F23B6E90F5BBFAC59B5B2661134EF8FFD255',
        symbol: 'DON',
    },
    {
        address: '0x887CB01EAEAD4946C4DB1A5D357B60A1EAFC7A16',
        symbol: 'PEECAT',
    },
    {
        address: '0x895109A3EA9F09C8B0A17C0737E4F2A9DB7EABDF',
        symbol: 'BTCMINI',
    },
    {
        address: '0x896FFEA66A487B183B4AF9E75BA5922025994F08',
        symbol: 'bELX',
    },
    {
        address: '0x89D453108BD94B497BBB4496729CD26F92ABA533',
        symbol: 'SSN',
    },
    {
        address: '0x8A8EFF0CFEF46D249D0189E238BC92CABCB985DA',
        symbol: 'BABYUSDT',
    },
    {
        address: '0x8BBA61E0668D3821413786D2BD49B4D44AD5D26D',
        symbol: 'BABYSHIB',
    },
    {
        address: '0x8BEABAA4F025D00B4699D56A683758D692D17F20',
        symbol: 'BBYXRP',
    },
    {
        address: '0x8D3E3A57C5F140B5F9FEB0D43D37A347EE01C851',
        symbol: 'CMERGE',
    },
    {
        address: '0x8DC1942E2089E711725EDA66AB06650035475441',
        symbol: 'BABYUSDT',
    },
    {
        address: '0x8E80C4AA22CAB0B9FC04F7B818AA85CEA737460F',
        symbol: 'UTM',
    },
    {
        address: '0x8FF795A6F4D97E7887C79BEA79ABA5CC76444ADF',
        symbol: 'BCH',
    },
    {
        address: '0x9001FD53504F7BF253296CFFADF5B6030CD61ABB',
        symbol: 'CYFM',
    },
    {
        address: '0x928E55DAB735AA8260AF3CEDADA18B5F70C72F1B',
        symbol: 'FRONT',
    },
    {
        address: '0x93D5A19A993D195CFC75ACDD736A994428290A59',
        symbol: 'ORE',
    },
    {
        address: '0x94BA29D58D419BD798B282476DB3DD9D97BA8C23',
        symbol: 'FROSTEDCAKE',
    },
    {
        address: '0x95750EE7B35BC8575FBB1D41B161C1900E7D0275',
        symbol: 'DRACE',
    },
    {
        address: '0x959426AC421010D305764B73F27FB5110D135415',
        symbol: 'TBUNNY',
    },
    {
        address: '0x9678E42CEBEB63F23197D726B29B1CB20D0064E5',
        symbol: 'IOTX',
    },
    {
        address: '0x97300A4F628701672096460B5469C41A8D3ECB1A',
        symbol: '1TRC',
    },
    {
        address: '0x97464D689E958C7339BBCD37DBA6C8B594F62A42',
        symbol: 'LATT',
    },
    {
        address: '0x97E8987885C4BB46E883FA1A9D5EB060B155448F',
        symbol: 'PHIFIV2',
    },
    {
        address: '0x98631C69602083D04F83934576A53E2A133D482F',
        symbol: 'xM',
    },
    {
        address: '0x9D71D138C8D300FD389334D9F616CBEC9B2ADF88',
        symbol: 'VOLT',
    },
    {
        address: '0x9E6B3E35C8F563B45D864F9FF697A144AD28A371',
        symbol: 'DOGO',
    },
    {
        address: '0x9E993671976A5AC51BBFB3DB9E34EAC8D518FE82',
        symbol: 'KODA',
    },
    {
        address: '0x9F3BCBE48E8B754F331DFC694A894E8E686AC31D',
        symbol: 'ACT',
    },
    {
        address: '0x9F42F1143784E2D34C618A3BFBDA2099C1662E36',
        symbol: 'CBT',
    },
    {
        address: '0xA016F295A5957CB80D03D8E5464A429007555124',
        symbol: 'SAFEHAMSTERS',
    },
    {
        address: '0xA1B0A232DFDD81BCEC5C5623C0604AB0EC38DAF4',
        symbol: 'INP',
    },
    {
        address: '0xA277385850B3BF6C2F0D50543CB1D491075E5359',
        symbol: '🎲DnD',
    },
    {
        address: '0xA2D3E8E0723C6CD0FBC0409FEC13B9E67B2420BC',
        symbol: 'NFTSHIBA',
    },
    {
        address: '0xA4FFFC757E8C4F24E7B209C033C123D20983AD40',
        symbol: 'HOGE',
    },
    {
        address: '0xA6850723A39FC6C5AD1C68615C65E7ACFAD900D3',
        symbol: 'PAL',
    },
    {
        address: '0xA8C2B8EEC3D368C0253AD3DAE65A5F2BBB89C929',
        symbol: 'CTK',
    },
    {
        address: '0xA923180EF71E81F21B36941FB62D954AF21C60A3',
        symbol: 'RAGSCOIN',
    },
    {
        address: '0xAB9D0FAE6EB062F2698C2D429A1BE9185A5D4F6E',
        symbol: 'PASTA',
    },
    {
        address: '0xABC69F2025BDB12EFCDB8FD048D240FFF943CA82',
        symbol: 'VNY',
    },
    {
        address: '0xACD7B3D9C10E97D0EFA418903C0C7669E702E4C0',
        symbol: 'ELE',
    },
    {
        address: '0xAECF6D1AFF214FEF70042740054F0F6D0CAA98AB',
        symbol: 'BabyShibaInu',
    },
    {
        address: '0xAEE234825DC4687FAE606485C1EBD06336052BCC',
        symbol: 'Duke',
    },
    {
        address: '0xB3BDFBE8C08C53ABF97F4C14FB43322BF22D67E0',
        symbol: 'PKD',
    },
    {
        address: '0xB573C8C952C1F55C995CF504DC07A7D5E290A5A9',
        symbol: 'GreddyDoge',
    },
    {
        address: '0xB5BBA78B4DF2D47DD46078514A3E296AB3C344FE',
        symbol: 'HTZ',
    },
    {
        address: '0xB92BDC8B3EE29D7BFD6233537A8955E99FE94CF3',
        symbol: 'XMON',
    },
    {
        address: '0xBBF33A3C83CF86D0965A66E108669D272DFE4214',
        symbol: 'EiFI',
    },
    {
        address: '0xBC3951F1D582F5637A76D8A915B1D2827A17941A',
        symbol: 'MNOP',
    },
    {
        address: '0xBCB24AFB019BE7E93EA9C43B7E22BB55D5B7F45D',
        symbol: 'BSCS',
    },
    {
        address: '0xBCBA01F7D6CC0A950464A4B98BA8358C4F6B69A0',
        symbol: 'BME',
    },
    {
        address: '0xBE2A26889CE30A1515055A192797083B1FDE8844',
        symbol: 'STRIKE',
    },
    {
        address: '0xBF5140A22578168FD562DCCF235E5D43A02CE9B1',
        symbol: 'UNI',
    },
    {
        address: '0xC03E21B2580B627FBD32CAEA53714282B623853C',
        symbol: 'PINADA',
    },
    {
        address: '0xC080ADF0A40A38FFE05834174B8883E60EAFF3F3',
        symbol: 'ALFA',
    },
    {
        address: '0xC1E667CF9315FB80674E5CF62AD150AC90FE7112',
        symbol: 'TIKTOK',
    },
    {
        address: '0xC22E8114818A918260662375450E19AC73D32852',
        symbol: 'KCAKE',
    },
    {
        address: '0xC37B0F85F559F88473410F43FB6F60C78A3D8771',
        symbol: 'PAPOY',
    },
    {
        address: '0xC53708664B99DF348DD27C3AC0759D2DA9C40462',
        symbol: 'GUM',
    },
    {
        address: '0xC62EF0D8E137499833ABB05DEE47007D2B334BA6',
        symbol: 'GMX',
    },
    {
        address: '0xC72CC401122DBDC812EC88A2150AAD5A39467401',
        symbol: 'WSWAP',
    },
    {
        address: '0xC77DD3ADE7B717583E0924466E4E474A5673332C',
        symbol: 'BSTS',
    },
    {
        address: '0xC7D43F2B51F44F09FBB8A691A0451E8FFCF36C0A',
        symbol: 'RISE',
    },
    {
        address: '0xC7DB04D5A8A9D9A411F44411F94927C4CC1923DC',
        symbol: 'DripX',
    },
    {
        address: '0xC828DEA19B9D68214A140620089853D4A70413BD',
        symbol: 'GDR',
    },
    {
        address: '0xC8E8ECB2A5B5D1ECFF007BF74D15A86434AA0C5C',
        symbol: 'DRS',
    },
    {
        address: '0xC9C4D6355443FB06216303CDA81DACC6344FC16E',
        symbol: 'HFI',
    },
    {
        address: '0xCBCCF14B051947BDCD1E20B77015208A1AD5EA25',
        symbol: 'PROMISE',
    },
    {
        address: '0xCC39FFB0B219EFAF4394D1D724696B8FAFEE670A',
        symbol: 'MONI',
    },
    {
        address: '0xCD40F2670CF58720B694968698A5514E924F742D',
        symbol: 'ODDZ',
    },
    {
        address: '0xCD77880EDEA8E7D1F2BE011BE560B45B96BA68AD',
        symbol: 'PAPP',
    },
    {
        address: '0xCD95B05EBE61244DE4DF9C2C4123920F016A06DF',
        symbol: 'ROF',
    },
    {
        address: '0xCE393C06594A5D91210FD4F157CD8F6D86006D57',
        symbol: 'AquaPig',
    },
    {
        address: '0xCE4A4A15FCCD532EAD67BE3ECF7E6122C61D06BB',
        symbol: 'THUNDERCAKE',
    },
    {
        address: '0xCE842FD2EBE59AED59C30C728FCC2C3E1A9E88C4',
        symbol: 'WAR',
    },
    {
        address: '0xCF665FB62DC6EE3DCA000E7E3FD938902F2721C5',
        symbol: 'EDOG',
    },
    {
        address: '0xCFCECFE2BD2FED07A9145222E8A7AD9CF1CCD22A',
        symbol: 'ADS',
    },
    {
        address: '0xD024AC1195762F6F13F8CFDF3CDD2C97B33B248B',
        symbol: 'MiniFootball',
    },
    {
        address: '0xD0F4AFA85A667D27837E9C07C81169869C16DD16',
        symbol: 'bPRIVA',
    },
    {
        address: '0xD15E2F1EFA9F4DA011E1AFA62E54396CFC7007EA',
        symbol: 'WARMON',
    },
    {
        address: '0xD223C9ECA447BC03628FA2256890BE886C9767C4',
        symbol: 'INF',
    },
    {
        address: '0xD2618BC9C9CDC40FF19E200A7D14A09799C0A152',
        symbol: 'UDOGE',
    },
    {
        address: '0xD30CDFE2837C457B4480ABB472AEF09F468CAF18',
        symbol: 'MARS',
    },
    {
        address: '0xD41FDB03BA84762DD66A0AF1A6C8540FF1BA5DFB',
        symbol: 'SFP',
    },
    {
        address: '0xD53E008A5E3EBD82FC65E6562F1F4C3DF56667A7',
        symbol: 'McCardanos',
    },
    {
        address: '0xD53F89A893C825C09AFD39E02369CA0BCF27D03D',
        symbol: 'BRAIN',
    },
    {
        address: '0xD585F9C5953CA97DA3551F20725A274C9E442FF3',
        symbol: 'PEG',
    },
    {
        address: '0xD675FF2B0FF139E14F86D87B7A6049CA7C66D76E',
        symbol: 'DFL',
    },
    {
        address: '0xD6CA9451BBA47E26706A701AE05BE45A712D4B1B',
        symbol: 'ADAFlect',
    },
    {
        address: '0xD74B782E05AA25C50E7330AF541D46E18F36661C',
        symbol: 'QUACK',
    },
    {
        address: '0xD819D96F9D28EA85C1DD78E66D7241134E8D4AB4',
        symbol: 'kUSD',
    },
    {
        address: '0xD9025E25BB6CF39F8C926A704039D2DD51088063',
        symbol: 'CYT',
    },
    {
        address: '0xD98560689C6E748DC37BC410B4D3096B1AA3D8C2',
        symbol: 'DFY',
    },
    {
        address: '0xDAE5A6571930692A5243DF6F2820688B20C10168',
        symbol: 'IBT',
    },
    {
        address: '0xDB238123939637D65A03E4B2B485650B4F9D91CB',
        symbol: 'TASTE',
    },
    {
        address: '0xDB5C767157B73C6F5347BDABEF196D9818554C30',
        symbol: 'YUCT',
    },
    {
        address: '0xDB607C61AAA2A954BF1F9D117953F12D6C319E15',
        symbol: '$HONEY',
    },
    {
        address: '0xDB8D30B74BF098AF214E862C90E647BBB1FCC58C',
        symbol: 'BABYCAKE',
    },
    {
        address: '0xDBA266E5298862C7C4301A5959FA72D47CDEF9E9',
        symbol: 'PKK',
    },
    {
        address: '0xDBAAFC89723CFC078EE8EAC427627E4F83ACF09E',
        symbol: 'RCT',
    },
    {
        address: '0xDE009CB3371825BAFB80A01004C58F8166EE13D5',
        symbol: 'LUD',
    },
    {
        address: '0xDF5FAC537AA09E1EB0F3F8DD1D34CBDC42CA1076',
        symbol: 'DKYC',
    },
    {
        address: '0xDFA3B0019ECF48C753B58908B5A21D11641BA56F',
        symbol: 'TAU',
    },
    {
        address: '0xE069AF87450FB51FC0D0E044617F1C134163E591',
        symbol: 'VPP',
    },
    {
        address: '0xE0B0C16038845BED3FCF70304D3E167DF81CE225',
        symbol: 'CSWAP',
    },
    {
        address: '0xE0CA4724BC8B97B259D25596EE3CFAB816629BAD',
        symbol: 'EROS',
    },
    {
        address: '0xE0CB8EA2B5E7009DB0A196C6D3389453266876DF',
        symbol: 'MONI',
    },
    {
        address: '0xE2A59D5E33C6540E18AAA46BF98917AC3158DB0D',
        symbol: 'UFI',
    },
    {
        address: '0xE331539F1FC7D96B6E6A1A1738A43AFF5CD74BCE',
        symbol: 'KITTEN',
    },
    {
        address: '0xE39E2861AE9A45FA321C1B0155D2F99196B2A992',
        symbol: 'ELOIN',
    },
    {
        address: '0xE40255C5D7FA7CEEC5120408C78C787CECB4CFDB',
        symbol: 'SWGb',
    },
    {
        address: '0xE50947AE0D86B889B384CD791D3A24FA1054906B',
        symbol: 'PCN',
    },
    {
        address: '0xE540980F909873370BBE9C19DB7C3B5BA4DEF701',
        symbol: 'iLayer',
    },
    {
        address: '0xE540B81133C597B31C3A33E318E5BC0F3E78DFC9',
        symbol: 'OROS',
    },
    {
        address: '0xE79DD5D65A7AE4DABA58D3380E1956B46AA0B4F0',
        symbol: 'EURC',
    },
    {
        address: '0xE84B921A39BEFBFEBC5C8F22B640BE3239975B8F',
        symbol: 'INSTINCT',
    },
    {
        address: '0xE889C7735C1585AE5482BB29C414BEE695FEF512',
        symbol: 'PATAKA',
    },
    {
        address: '0xE891A4048F27A4EEA1B27A4E2B72B37203A1D27D',
        symbol: 'KURAMA',
    },
    {
        address: '0xE94A34714753FF48A3A7D82554DB6E9D120ECA7C',
        symbol: 'HOOD',
    },
    {
        address: '0xEAA2BADD888324100669481E46D2329796531EF1',
        symbol: 'ETHST',
    },
    {
        address: '0xEB1112AC78D537853150E2A07E8B765E29D3F019',
        symbol: 'HASH',
    },
    {
        address: '0xEB35ACBD23CF9D1C13D276815B9969EFFC5C878F',
        symbol: 'MiniSHIBA',
    },
    {
        address: '0xEC053AC91094683EF0CD52126527110854D6E67F',
        symbol: 'GOTCHA',
    },
    {
        address: '0xEDD822B00C48D8A1C416EE17507BEFC2AD71D8C4',
        symbol: 'Shiba',
    },
    {
        address: '0xEEA06FC74182B195F679F31D735D95EE502F03F3',
        symbol: 'VICE',
    },
    {
        address: '0xEFA28173878130C12ABE8349D4295B0E54DCF939',
        symbol: 'RMC',
    },
    {
        address: '0xF1B26ECA3CE0AAA87034DABFAF90FFC2CF4636BC',
        symbol: 'DOGEX',
    },
    {
        address: '0xF28709F1DAA6CEE2847C5B9526CEBA457331742B',
        symbol: '$MLNX',
    },
    {
        address: '0xF36F22D8D583FBAFC034450F50110925C76D40D7',
        symbol: 'SIAM',
    },
    {
        address: '0xF41082C4CB71FB4628A9B17214B2624E0E2048A9',
        symbol: 'RTTv2',
    },
    {
        address: '0xF4206E5F264420630520E0D23C14D8DD5645E6C3',
        symbol: 'LUNAR',
    },
    {
        address: '0xF4341FA52669CEA0C1836095529A7E9B04B8B88D',
        symbol: 'SATOZ',
    },
    {
        address: '0xF65130742121FB4702C9FA2BB002B81F7DC30D3C',
        symbol: 'PROD',
    },
    {
        address: '0xF7844CB890F4C339C497AEAB599ABDC3C874B67A',
        symbol: 'NFTART',
    },
    {
        address: '0xF952FC3CA7325CC27D15885D37117676D25BFDA6',
        symbol: 'EGG',
    },
    {
        address: '0xF9CEC8D50F6C8AD3FB6DCCEC577E05AA32B224FE',
        symbol: 'CHR',
    },
    {
        address: '0xFA0CAFAA22FB5996A541D15F53EC0C8F0C4881F1',
        symbol: 'GodZ',
    },
    {
        address: '0xFA17B330BCC4E7F3E2456996D89A5A54AB044831',
        symbol: '$CRDN',
    },
    {
        address: '0xFA344C08C93066A4D6266063C6EBC63925A18467',
        symbol: 'SAFEBULL',
    },
    {
        address: '0xFA363022816ABF82F18A9C2809DCD2BB393F6AC5',
        symbol: 'HONEY',
    },
    {
        address: '0xFA51E9F40B49E5E8803F01D0CA15769EF0AC81B0',
        symbol: 'DRACE',
    },
    {
        address: '0xFAAB744DB9DEF8E13194600ED02BC5D5BED3B85C',
        symbol: 'NFT',
    },
    {
        address: '0xFAC3A1ED2480DA8F5C34576C0DA13F245239717D',
        symbol: 'FAN',
    },
    {
        address: '0xFBEBFBB72B061F36A4828D2E21A8AA74A8FC919B',
        symbol: 'SPC',
    },
    {
        address: '0xFC206F429D55C71CB7294EFF40C6ADB20DC21508',
        symbol: 'DeHub',
    },
    {
        address: '0xFD290C590866F8282D89671A85AC9964B165D682',
        symbol: 'SUB',
    },
    {
        address: '0xFF0258B39432493A92AA1A182362B62808132935',
        symbol: '$CTN',
    },
    {
        address: '0xBB58F5C1C7521F6DA845B76C75081505254377D7',
        symbol: 'WILDF',
    },
    {
        address: '0xBBC22E1F55430B8EAB1894DD0B7EC1E67B9EAF4E',
        symbol: '$MVP',
    },
    {
        address: '0xBBE899C61198D1826A43E20EA19EFC46E50C2B00',
        symbol: 'EnergyX',
    },
    {
        address: '0x03FF0FF224F904BE3118461335064BB48DF47938',
        symbol: 'ONE',
    },
    {
        address: '0xBCDFD50EAD6B6DA1970464985FAB894FB83D17C0',
        symbol: 'TONE',
    },
    {
        address: '0xBCF39F0EDDA668C58371E519AF37CA705F2BFCBD',
        symbol: 'pCWS',
    },
    {
        address: '0xBF7C81FFF98BBE61B40ED186E4AFD6DDD01337FE',
        symbol: 'EGLD',
    },
    {
        address: '0xBFBEE3DAC982148AC793161F7362344925506903',
        symbol: 'CATZ',
    },
    {
        address: '0xC003F5193CABE3A6CBB56948DFEAAE2276A6AA5E',
        symbol: 'TRUBGR',
    },
    {
        address: '0xC0366A104B429F0806BFA98D0008DAA9555B2BED',
        symbol: 'SMARS',
    },
    {
        address: '0xC0C6E4C6E70C6231B20979BDA581A66F062A7967',
        symbol: 'bATRI',
    },
    {
        address: '0xC0EFF7749B125444953EF89682201FB8C6A917CD',
        symbol: 'HZN',
    },
    {
        address: '0xC2FE5153F611781CD8481268B3DC7826A3413959',
        symbol: 'BABYBTC',
    },
    {
        address: '0xC3D91FFDF44EAFC32A9E4489A4EFE188489FC183',
        symbol: 'bUPX',
    },
    {
        address: '0xC409EC8A33F31437ED753C82EED3C5F16D6D7E22',
        symbol: 'TOKAU',
    },
    {
        address: '0xC51EF828319B131B595B7EC4B28210ECF4D05AD0',
        symbol: 'EFX',
    },
    {
        address: '0xC5A72FC4324EF3FCEBAFF9B5E729487719EB5B7A',
        symbol: 'TDW',
    },
    {
        address: '0xC5DDCBD748EDA2E147B477F9A742637DDA2A03EC',
        symbol: 'PGNS',
    },
    {
        address: '0xC64C9B30C981FC2EE4E13D0CA3F08258E725FD24',
        symbol: 'POLAR',
    },
    {
        address: '0xC732B6586A93B6B7CF5FED3470808BC74998224D',
        symbol: 'KMON',
    },
    {
        address: '0xC836DCC9C880D4558C301E6D439DB1B1DCAF7F3A',
        symbol: 'BNB GOLD',
    },
    {
        address: '0xC87F504E9570DBAD926A2E85627CB8CF916682A2',
        symbol: 'MAYORDOGE',
    },
    {
        address: '0xC899CC3DB271E49E74294C556D8621043838D2E9',
        symbol: 'ELPS',
    },
    {
        address: '0xE3894CB9E92CA78524FB6A30FF072FA5E533C162',
        symbol: 'ELP',
    },
    {
        address: '0xC9CE0AC23F14196546502C5F8C232B2B8A854754',
        symbol: 'CFT',
    },
    {
        address: '0xCA3F508B8E4DD382EE878A314789373D80A5190A',
        symbol: 'BIFI',
    },
    {
        address: '0xCC42724C6683B7E57334C4E856F4C9965ED682BD',
        symbol: 'MATIC',
    },
    {
        address: '0xCC9B175E4B88A22543C44F1CC65B73F63B0D4EFE',
        symbol: 'SHARK',
    },
    {
        address: '0xCCCE542413528CB57B5761E061F4683A1247ADCB',
        symbol: 'SCAN',
    },
    {
        address: '0xCD657182A749554FC8487757612F02226355269D',
        symbol: 'MUSK',
    },
    {
        address: '0xCFD6BFA161413727318C4DE34BF633A3F8C7FED0',
        symbol: 'INTIM8',
    },
    {
        address: '0xCFEFA64B0DDD611B125157C41CD3827F2E8E8615',
        symbol: 'KPAD',
    },
    {
        address: '0xD05622FA4AB615FBEBFB7ADC182E78D41D15FD1B',
        symbol: 'yBTC',
    },
    {
        address: '0xD0840D5F67206F865AEE7CCE075BD4484CD3CC81',
        symbol: 'AFEN',
    },
    {
        address: '0xD1587EE50E0333F0C4ADCF261379A61B1486C5D2',
        symbol: 'WINDY',
    },
    {
        address: '0xD15C444F1199AE72795EBA15E8C1DB44E47ABF62',
        symbol: 'TENFI',
    },
    {
        address: '0xD22246644D2BE5D0427A8E474477D96677C3EC24',
        symbol: 'FSWAP',
    },
    {
        address: '0xD4D2ABBEF1B26458504E7027233D5E7F09EA476D',
        symbol: 'MNWL',
    },
    {
        address: '0xD4D55B811D9EDE2ADCE61A98D67D7F91BFFCE495',
        symbol: 'PulseDoge',
    },
    {
        address: '0xD9CBC18E554AEC0D99E9D99324DECC9B4B473AF0',
        symbol: 'INPA',
    },
    {
        address: '0xDA4714FEE90AD7DE50BC185CCD06B175D23906C1',
        symbol: 'GODZ',
    },
    {
        address: '0xDB0F88270741DD480972AAE29D2F5ABE21683807',
        symbol: 'IS2',
    },
    {
        address: '0xDB26C9866F43B50C82617808B1F2328F4365A66F',
        symbol: 'BabySmars',
    },
    {
        address: '0xDB29192FC2B487BB5185E155752328D4F249743C',
        symbol: 'UNFT',
    },
    {
        address: '0xDBAAA36B347D56B77CE0E36F050FCEEBBF9FBC38',
        symbol: 'SPE',
    },
    {
        address: '0xDD70CCF7AE9DA25149D5AE35374633F24346607E',
        symbol: 'GUCCICAKE',
    },
    {
        address: '0xDDD4214F0EAD50E877F25C22B460AFC16753C549',
        symbol: 'DCAKE',
    },
    {
        address: '0xDECE0F6864C1511369AE2C30B90DB9F5FE92832C',
        symbol: 'DSCPL',
    },
    {
        address: '0xDF0816CC717216C8B0863AF8D4F0FC20BC65D643',
        symbol: 'SHIBSC',
    },
    {
        address: '0xDF27D57AB53A3F303DBCB95B5F1CA19C3662DDF6',
        symbol: 'MiniCu',
    },
    {
        address: '0xDFAFA678E1420CF155EE4FAB6E98C15B01E76FDE',
        symbol: 'ScooBNBDoo',
    },
    {
        address: '0xDFD9E2A17596CAD6295ECFFDA42D9B6F63F7B5D5',
        symbol: 'FNX',
    },
    {
        address: '0xE02DF9E3E622DEBDD69FB838BB799E3F168902C5',
        symbol: 'BAKE',
    },
    {
        address: '0xE0C07D3C48502D6B43B5356C69772F2E59A10BBE',
        symbol: 'SFF',
    },
    {
        address: '0xE0F94AC5462997D2BC57287AC3A3AE4C31345D66',
        symbol: 'CEEK',
    },
    {
        address: '0xE1DFD41FBA67AB6E26A7072FA97508506093AC01',
        symbol: 'CAKEPUNKS',
    },
    {
        address: '0xE51BB42F0F6D01B872CDC7E1764D53B2A81CF0AF',
        symbol: 'MOOLAH',
    },
    {
        address: '0xC227F8EECC481A8E8BAA30A4754B109B81C4DFA4',
        symbol: 'VOXb',
    },
    {
        address: '0xE7E565ABADB06A8F09AB3932AFE9B29C89FDFCCD',
        symbol: 'BNBKitty',
    },
    {
        address: '0xE8658B07C555E9604329A6A0A82FF6D9C6F68D2F',
        symbol: 'MEOW',
    },
    {
        address: '0xE9D7023F2132D55CBD4EE1F78273CB7A3E74F10A',
        symbol: 'DEC',
    },
    {
        address: '0xE9DB02A654B74CA04734B26EF3B2A79808D43404',
        symbol: 'OKBOOMER',
    },
    {
        address: '0x0530C188397CFEF801150CCD733F4AD2E809B0D6',
        symbol: '5050',
    },
    {
        address: '0x07BBBD89A1175AEB78050C1DB1A9BEBC336E7A83',
        symbol: 'IMM',
    },
    {
        address: '0x0F9E4D49F25DE22C2202AF916B681FBB3790497B',
        symbol: 'PERL',
    },
    {
        address: '0x111111111117DC0AA78B770FA6A738034120C302',
        symbol: '1INCH',
    },
    {
        address: '0x14C358B573A4CE45364A3DBD84BBB4DAE87AF034',
        symbol: 'DND',
    },
    {
        address: '0x25A528AF62E56512A19CE8C3CAB427807C28CC19',
        symbol: 'FORM',
    },
    {
        address: '0x34AA9099D924F3FB2377FF20D81B235311C15346',
        symbol: 'BLS',
    },
    {
        address: '0x5507F52C96E64E5E5C3DF0EA90D3515FC0C7D9DF',
        symbol: 'GAX',
    },
    {
        address: '0x5FEAD99998788AC1BCA768796483D899F1AEF4C4',
        symbol: 'JIND',
    },
    {
        address: '0x603C7F932ED1FC6575303D8FB018FDCBB0F39A95',
        symbol: 'BANANA',
    },
    {
        address: '0x61C911B6D1B46DCADBB61BFA7100290A6FAAD53D',
        symbol: 'RiseUp',
    },
    {
        address: '0x73C499099BFC964D3CBCD7425026B074869748CE',
        symbol: 'THUNDERETH',
    },
    {
        address: '0x74738A577434F78467184CDDECB58E71391E41F2',
        symbol: 'RBTC',
    },
    {
        address: '0x76BEED9649C0C297CB6DE10D07EFD66DB38E3C47',
        symbol: 'ZINA',
    },
    {
        address: '0x7E396BFC8A2F84748701167C2D622F041A1D7A17',
        symbol: 'WMASS',
    },
    {
        address: '0x965B0DF5BDA0E7A0649324D78F03D5F7F2DE086A',
        symbol: 'COOK',
    },
    {
        address: '0x9A946C3CB16C08334B69AE249690C236EBD5583E',
        symbol: 'xBLZD',
    },
    {
        address: '0xAB287E6D370C61F105630E656B5468ACB4D00423',
        symbol: 'BSR',
    },
    {
        address: '0xB2986C72B389C6D29168D4DFC5209B1EDC55D616',
        symbol: 'MELO',
    },
    {
        address: '0xB32AC3C79A94AC1EB258F3C830BBDBC676483C93',
        symbol: 'OSWAP',
    },
    {
        address: '0xB60501346240FCDE1615DE56EA9FFF1AC1DA5673',
        symbol: 'BSL',
    },
    {
        address: '0xBA8AEABCA4F1C55973582A7F7D76D61A75E370FA',
        symbol: 'CORN',
    },
    {
        address: '0xBB238FCE6E2EE90781CD160C9C6EAF3A4CFAD801',
        symbol: 'BAGEL',
    },
    {
        address: '0xC13B7A43223BB9BF4B69BD68AB20CA1B79D81C75',
        symbol: 'JGN',
    },
    {
        address: '0xC350CAA89EB963D5D6B964324A0A7736D8D65533',
        symbol: 'INFTEE',
    },
    {
        address: '0xCADF559EDE783E027B3E75D11E8B06AFD520CF8B',
        symbol: 'DRACE',
    },
    {
        address: '0xCFB24D3C3767364391340A2E6D99C64F1CBD7A3D',
        symbol: 'LPOOL',
    },
    {
        address: '0xD3BEDFA48A6182DDD80A294129CCD90086F09FE2',
        symbol: 'SOROS',
    },
    {
        address: '0xE6327CA27686D5231A4E8CD821E338DF67D7C731',
        symbol: 'SBTC',
    },
    {
        address: '0xF21768CCBC73EA5B6FD3C687208A7C2DEF2D966E',
        symbol: 'REEF',
    },
    {
        address: '0xF317932EE2C30FA5D0E14416775977801734812D',
        symbol: 'DINO',
    },
    {
        address: '0xF67932D8C28227C586D971B6B51749D35DC03558',
        symbol: 'PALG',
    },
    {
        address: '0xEA01A1A3CF143F90B4AC6D069BD369826574CD45',
        symbol: 'XXT',
    },
    {
        address: '0xEAC534DD0D93DD6E17E12B1D9D635AB5548C81D3',
        symbol: 'BNFT',
    },
    {
        address: '0xEBB07B888CF4BC1276203408AA0B2022E633A34C',
        symbol: 'SIR',
    },
    {
        address: '0xED0294DBD2A0E52A09C3F38A09F6E03DE2C44FCF',
        symbol: 'CHNG',
    },
    {
        address: '0xEDAF1F5B8078D4FEB4E13C8D5A2C8DE1365BE7B6',
        symbol: 'ALTRUCOIN',
    },
    {
        address: '0xEDECFB4801C04F3EB394B89397C6AAFA4ADDA15B',
        symbol: 'PYRAM',
    },
    {
        address: '0xEF032F652FCE3A0EFFCE3796A68EB978B465A336',
        symbol: 'MOOCHII',
    },
    {
        address: '0xF017E2773E4EE0590C81D79CCBCF1B2DE1D22877',
        symbol: 'SAFEMOONCASH',
    },
    {
        address: '0xF1018C71EEBE32DD85012AD413BAB6B940D0D51E',
        symbol: 'RHT',
    },
    {
        address: '0xF16E81DCE15B08F326220742020379B855B87DF9',
        symbol: 'ICE',
    },
    {
        address: '0xF215A127A196E3988C09D052E16BCFD365CD7AA3',
        symbol: 'mTSLA',
    },
    {
        address: '0xF315CFC8550F6FCA969D397CA8B807C5033FA122',
        symbol: 'GAT',
    },
    {
        address: '0xF483AF09917BA63F1E274056978036D266EB56E6',
        symbol: 'BULL',
    },
    {
        address: '0xF57D0B57074A5CF1CB0DD9453EB5AF4E5174D157',
        symbol: 'REDSHIBA',
    },
    {
        address: '0xF68C9DF95A18B2A5A5FA1124D79EEEFFBAD0B6FA',
        symbol: 'ANY',
    },
    {
        address: '0xF6CB4AD242BAB681EFFC5DE40F7C8FF921A12D63',
        symbol: 'CNS',
    },
    {
        address: '0xF71F22E0E27418EEB78BFC910C0BAC74F5D271F9',
        symbol: 'MDF',
    },
    {
        address: '0xB46049C79D77FF1D555A67835FBA6978536581AF',
        symbol: 'MFO',
    },
    {
        address: '0xF8D954168FBBF579F8FAD5F7583D4F76F10AE97D',
        symbol: 'ALLEY',
    },
    {
        address: '0xFA90D5D5FF08D9A06C9FDF89B4B22217B9DBC418',
        symbol: 'NIU',
    },
    {
        address: '0xFD78AAED1E3F2D06DBDE9510C6DC14112ECA896D',
        symbol: 'ANON',
    },
    {
        address: '0xFD7B3A77848F1C2D67E05E54D78D174A0C850335',
        symbol: 'ONT',
    },
    {
        address: '0xFD91FA8FAB5CA11569E256FA8844BC2ABECC331D',
        symbol: 'VGD',
    },
    {
        address: '0x2ED7CBFFEF349A56F8600DBE86E9392E400EDBC1',
        symbol: 'VSWAP',
    },
    {
        address: '0xFE1D7F7A8F0BDA6E415593A2E4F82C64B446D404',
        symbol: 'BLP',
    },
    {
        address: '0xFEEA0BDD3D07EB6FE305938878C0CADBFA169042',
        symbol: '8PAY',
    },
    {
        address: '0xFFC4C75C3F648D7C6B43228118E535179319CA0F',
        symbol: 'WPAY',
    },
]

export const whitePairsList = [
    {
        token0Symbol: "ETH",
        token1Symbol: "BUSD",
        token0Address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "ETH",
        token1Symbol: "USDC",
        token0Address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
        token1Address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"
    },
    {
        token0Symbol: "ETH",
        token1Symbol: "BTCB",
        token0Address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
        token1Address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c"
    },
    {
        token0Symbol: "ETH",
        token1Symbol: "USDT",
        token0Address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "ADA",
        token1Symbol: "WBNB",
        token0Address: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "ADA",
        token1Symbol: "USDT",
        token0Address: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "ADA",
        token1Symbol: "BUSD",
        token0Address: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "BTCB",
        token1Symbol: "USDC",
        token0Address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
        token1Address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"
    },
    {
        token0Symbol: "BTCB",
        token1Symbol: "BUSD",
        token0Address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "BTCB",
        token1Symbol: "USDT",
        token0Address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "XRP",
        token1Symbol: "WBNB",
        token0Address: "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "XRP",
        token1Symbol: "USDT",
        token0Address: "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "XRP",
        token1Symbol: "BUSD",
        token0Address: "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "HARD",
        token1Symbol: "WBNB",
        token0Address: "0xF79037F6F6BE66832DE4E7516BE52826BC3CBCC4",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "BIFI",
        token1Symbol: "BUSD",
        token0Address: "0xCa3F508B8e4Dd382eE878A314789373D80A5190A",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "BIFI",
        token1Symbol: "WBNB",
        token0Address: "0xCa3F508B8e4Dd382eE878A314789373D80A5190A",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "LINA",
        token1Symbol: "BUSD",
        token0Address: "0x762539b45A1dCcE3D36d080F74d1AED37844b878",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "C98",
        token1Symbol: "BUSD",
        token0Address: "0xaEC945e04baF28b135Fa7c640f624f8D90F1C3a6",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "C98",
        token1Symbol: "WBNB",
        token0Address: "0xaEC945e04baF28b135Fa7c640f624f8D90F1C3a6",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "C98",
        token1Symbol: "USDT",
        token0Address: "0xaEC945e04baF28b135Fa7c640f624f8D90F1C3a6",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "POLS",
        token1Symbol: "BUSD",
        token0Address: "0x7e624FA0E1c4AbFD309cC15719b7E2580887f570",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "POLS",
        token1Symbol: "WBNB",
        token0Address: "0x7e624FA0E1c4AbFD309cC15719b7E2580887f570",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "TKO",
        token1Symbol: "BUSD",
        token0Address: "0x9f589e3eabe42ebC94A44727b3f3531C0c877809",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },  
    {
        token0Symbol: "EOS",
        token1Symbol: "BUSD",
        token0Address: "0x56b6fB708fC5732DEC1Afc8D8556423A2EDcCbD6",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "EOS",
        token1Symbol: "ETH",
        token0Address: "0x56b6fB708fC5732DEC1Afc8D8556423A2EDcCbD6",
        token1Address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8"
    },
    {
        token0Symbol: "EOS",
        token1Symbol: "USDT",
        token0Address: "0x56b6fB708fC5732DEC1Afc8D8556423A2EDcCbD6",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "EOS",
        token1Symbol: "WBNB",
        token0Address: "0x56b6fB708fC5732DEC1Afc8D8556423A2EDcCbD6",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "BUSD",
        token1Symbol: "DAI",
        token0Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
        token1Address: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3"
    },
    {
        token0Symbol: "BUSD",
        token1Symbol: "VAI",
        token0Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
        token1Address: "0x4BD17003473389A42DAF6a0a729f6Fdb328BbBd7"
    },
    {
        token0Symbol: "BUSD",
        token1Symbol: "USDT",
        token0Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "IOTX",
        token1Symbol: "USDT",
        token0Address: "0x9678E42ceBEb63F23197D726B29b1CB20d0064E5",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "IOTX",
        token1Symbol: "BUSD",
        token0Address: "0x9678E42ceBEb63F23197D726B29b1CB20d0064E5",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "CTSI",
        token1Symbol: "WBNB",
        token0Address: "0x8dA443F84fEA710266C8eB6bC34B71702d033EF2",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "CTSI",
        token1Symbol: "BUSD",
        token0Address: "0x8dA443F84fEA710266C8eB6bC34B71702d033EF2",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "PHA",
        token1Symbol: "BUSD",
        token0Address: "0x0112e557d400474717056C4e6D40eDD846F38351",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "ALPACA",
        token1Symbol: "BTCB",
        token0Address: "0x8F0528cE5eF7B51152A59745bEfDD91D97091d2F",
        token1Address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c"
    },
    {
        token0Symbol: "ALPACA",
        token1Symbol: "BUSD",
        token0Address: "0x8F0528cE5eF7B51152A59745bEfDD91D97091d2F",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "ALPACA",
        token1Symbol: "WBNB",
        token0Address: "0x8F0528cE5eF7B51152A59745bEfDD91D97091d2F",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "ALPACA",
        token1Symbol: "USDT",
        token0Address: "0x8F0528cE5eF7B51152A59745bEfDD91D97091d2F",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "USDT",
        token1Symbol: "DAI",
        token0Address: "0x55d398326f99059fF775485246999027B3197955",
        token1Address: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3"
    },
    {
        token0Symbol: "LTC",
        token1Symbol: "BUSD",
        token0Address: "0x4338665CBB7B2485A8855A139b75D5e34AB0DB94",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "LTC",
        token1Symbol: "WBNB",
        token0Address: "0x4338665CBB7B2485A8855A139b75D5e34AB0DB94",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "LTC",
        token1Symbol: "ETH",
        token0Address: "0x4338665CBB7B2485A8855A139b75D5e34AB0DB94",
        token1Address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8"
    },
    {
        token0Symbol: "MATIC",
        token1Symbol: "WBNB",
        token0Address: "0xCC42724C6683B7E57334c4E856f4c9965ED682bD",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "MATIC",
        token1Symbol: "BUSD",
        token0Address: "0xCC42724C6683B7E57334c4E856f4c9965ED682bD",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "MATIC",
        token1Symbol: "USDT",
        token0Address: "0xCC42724C6683B7E57334c4E856f4c9965ED682bD",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "SUSHI",
        token1Symbol: "WBNB",
        token0Address: "0x947950BcC74888a40Ffa2593C5798F11Fc9124C4",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "SUSHI",
        token1Symbol: "USDT",
        token0Address: "0x947950BcC74888a40Ffa2593C5798F11Fc9124C4",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "SXP",
        token1Symbol: "BUSD",
        token0Address: "0x47BEAd2563dCBf3bF2c9407fEa4dC236fAbA485A",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "SXP",
        token1Symbol: "WBNB",
        token0Address: "0x47BEAd2563dCBf3bF2c9407fEa4dC236fAbA485A",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "WBNB",
        token1Symbol: "BIDR",
        token0Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        token1Address: "0x9A2f5556e9A637e8fBcE886d8e3cf8b316a1D8a2"
    },
    {
        token0Symbol: "WBNB",
        token1Symbol: "USDT",
        token0Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "WBNB",
        token1Symbol: "BTCB",
        token0Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        token1Address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c"
    },
    {
        token0Symbol: "WBNB",
        token1Symbol: "ETH",
        token0Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        token1Address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8"
    },
    {
        token0Symbol: "WBNB",
        token1Symbol: "BUSD",
        token0Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "WBNB",
        token1Symbol: "USDC",
        token0Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        token1Address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"
    },
    {
        token0Symbol: "WBNB",
        token1Symbol: "TUSD",
        token0Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        token1Address: "0x14016E85a25aeb13065688cAFB43044C2ef86784"
    },
    {
        token0Symbol: "WBNB",
        token1Symbol: "DAI",
        token0Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        token1Address: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3"
    },
    {
        token0Symbol: "REEF",
        token1Symbol: "BUSD",
        token0Address: "0xF21768cCBC73Ea5B6fd3C687208a7c2def2d966e",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "ONT",
        token1Symbol: "BUSD",
        token0Address: "0xFd7B3A77848f1C2D67E05E54d78d174a0C850335",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "ONT",
        token1Symbol: "WBNB",
        token0Address: "0xFd7B3A77848f1C2D67E05E54d78d174a0C850335",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "ONT",
        token1Symbol: "USDC",
        token0Address: "0xFd7B3A77848f1C2D67E05E54d78d174a0C850335",
        token1Address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"
    },
    {
        token0Symbol: "PERL",
        token1Symbol: "WBNB",
        token0Address: "0x0F9E4D49F25DE22C2202AF916B681FBB3790497B",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "TLM",
        token1Symbol: "BUSD",
        token0Address: "0x2222227E22102Fe3322098e4CBfE18cFebD57c95",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "TLM",
        token1Symbol: "USDT",
        token0Address: "0x2222227E22102Fe3322098e4CBfE18cFebD57c95",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "ADX",
        token1Symbol: "WBNB",
        token0Address: "0xce666D0e507C5F2Afe0671Ee29A99cfa97954c48",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "ADX",
        token1Symbol: "BUSD",
        token0Address: "0xce666D0e507C5F2Afe0671Ee29A99cfa97954c48",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "FIL",
        token1Symbol: "WBNB",
        token0Address: "0x0D8Ce2A99Bb6e3B7Db580eD848240e4a0F9aE153",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "FIL",
        token1Symbol: "BUSD",
        token0Address: "0x0D8Ce2A99Bb6e3B7Db580eD848240e4a0F9aE153",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "MDX",
        token1Symbol: "WBNB",
        token0Address: "0x9C65AB58d8d978DB963e63f2bfB7121627e3a739",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "MDX",
        token1Symbol: "BUSD",
        token0Address: "0x9C65AB58d8d978DB963e63f2bfB7121627e3a739",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "TWT",
        token1Symbol: "USDT",
        token0Address: "0x4B0F1812e5Df2A09796481Ff14017e6005508003",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "TWT",
        token1Symbol: "BUSD",
        token0Address: "0x4B0F1812e5Df2A09796481Ff14017e6005508003",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "TWT",
        token1Symbol: "BTCB",
        token0Address: "0x4B0F1812e5Df2A09796481Ff14017e6005508003",
        token1Address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c"
    },
    {
        token0Symbol: "NEAR",
        token1Symbol: "WBNB",
        token0Address: "0x1Fa4a73a3F0133f0025378af00236f3aBDEE5D63",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "TRX",
        token1Symbol: "WBNB",
        token0Address: "0x85EAC5Ac2F758618dFa09bDbe0cf174e7d574D5B",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "TRX",
        token1Symbol: "BUSD",
        token0Address: "0x85EAC5Ac2F758618dFa09bDbe0cf174e7d574D5B",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "TRX",
        token1Symbol: "USDT",
        token0Address: "0x85EAC5Ac2F758618dFa09bDbe0cf174e7d574D5B",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "TRX",
        token1Symbol: "ETH",
        token0Address: "0x85EAC5Ac2F758618dFa09bDbe0cf174e7d574D5B",
        token1Address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8"
    },  
    {
        token0Symbol: "DOT",
        token1Symbol: "WBNB",
        token0Address: "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "DOT",
        token1Symbol: "BUSD",
        token0Address: "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "DOT",
        token1Symbol: "USDT",
        token0Address: "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "BURGER",
        token1Symbol: "WBNB",
        token0Address: "0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "INJ",
        token1Symbol: "WBNB",
        token0Address: "0xA2B726B1145A4773F68593CF171187D8EBE4D495",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "BCH",
        token1Symbol: "BUSD",
        token0Address: "0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "BCH",
        token1Symbol: "ETH",
        token0Address: "0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf",
        token1Address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8"
    },
    {
        token0Symbol: "BCH",
        token1Symbol: "WBNB",
        token0Address: "0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "FTM",
        token1Symbol: "USDT",
        token0Address: "0xAD29AbB318791D579433D831ed122aFeAf29dcfe",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "FTM",
        token1Symbol: "WBNB",
        token0Address: "0xAD29AbB318791D579433D831ed122aFeAf29dcfe",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "BAT",
        token1Symbol: "WBNB",
        token0Address: "0x101D82428437127BF1608F699CD651E6ABF9766E",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "BAT",
        token1Symbol: "BUSD",
        token0Address: "0x101D82428437127BF1608F699CD651E6ABF9766E",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "ZIL",
        token1Symbol: "USDT",
        token0Address: "0xb86AbCb37C3A4B64f74f59301AFF131a1BEcC787",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "ZIL",
        token1Symbol: "WBNB",
        token0Address: "0xb86AbCb37C3A4B64f74f59301AFF131a1BEcC787",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "1INCH",
        token1Symbol: "BUSD",
        token0Address: "0x111111111117dC0aa78b770fA6A738034120C302",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "XTZ",
        token1Symbol: "WBNB",
        token0Address: "0x16939EF78684453BFDFB47825F8A5F714F12623A",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "LINK",
        token1Symbol: "BUSD",
        token0Address: "0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "BEL",
        token1Symbol: "WBNB",
        token0Address: "0x8443f091997f06a61670B735ED92734F5628692F",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "BETH",
        token1Symbol: "ETH",
        token0Address: "0x250632378E573c6Be1AC2f97Fcdf00515d0Aa91B",
        token1Address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8"
    },
    {
        token0Symbol: "DUSK",
        token1Symbol: "WBNB",
        token0Address: "0xB2BD0749DBE21f623d9BABa856D3B0f0e1BFEc9C",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "XVS",
        token1Symbol: "WBNB",
        token0Address: "0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "XVS",
        token1Symbol: "USDT",
        token0Address: "0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "XVS",
        token1Symbol: "BUSD",
        token0Address: "0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "ATOM",
        token1Symbol: "USDT",
        token0Address: "0x0Eb3a705fc54725037CC9e008bDede697f62F335",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "ATOM",
        token1Symbol: "BUSD",
        token0Address: "0x0Eb3a705fc54725037CC9e008bDede697f62F335",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "ATOM",
        token1Symbol: "WBNB",
        token0Address: "0x0Eb3a705fc54725037CC9e008bDede697f62F335",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "ATOM",
        token1Symbol: "BTCB",
        token0Address: "0x0Eb3a705fc54725037CC9e008bDede697f62F335",
        token1Address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c"
    },
    {
        token0Symbol: "BAND",
        token1Symbol: "WBNB",
        token0Address: "0xAD6cAEb32CD2c308980a548bD0Bc5AA4306c6c18",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "CTK",
        token1Symbol: "BUSD",
        token0Address: "0xA8c2B8eec3d368C0253ad3dae65a5F2BBB89c929",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "CTK",
        token1Symbol: "WBNB",
        token0Address: "0xA8c2B8eec3d368C0253ad3dae65a5F2BBB89c929",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "CTK",
        token1Symbol: "USDT",
        token0Address: "0xA8c2B8eec3d368C0253ad3dae65a5F2BBB89c929",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },  
    {
        token0Symbol: "DIA",
        token1Symbol: "BUSD",
        token0Address: "0x99956D38059cf7bEDA96Ec91Aa7BB2477E0901DD",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "FLOW",
        token1Symbol: "WBNB",
        token0Address: "0x39A0dC2925BA0d17DD53F87D2dB8296a578957c6",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "WIN",
        token1Symbol: "WBNB",
        token0Address: "0xaeF0d72a118ce24feE3cD1d43d383897D05B4e99",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "WIN",
        token1Symbol: "BUSD",
        token0Address: "0xaeF0d72a118ce24feE3cD1d43d383897D05B4e99",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "DOGE",
        token1Symbol: "BUSD",
        token0Address: "0xbA2aE424d960c26247Dd6c32edC70B295c744C43",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "DOGE",
        token1Symbol: "WBNB",
        token0Address: "0xbA2aE424d960c26247Dd6c32edC70B295c744C43",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "MBOX",
        token1Symbol: "WBNB",
        token0Address: "0x3203c9E46cA618C8C1cE5dC67e7e9D75f5da2377",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "MBOX",
        token1Symbol: "USDT",
        token0Address: "0x3203c9E46cA618C8C1cE5dC67e7e9D75f5da2377",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "MBOX",
        token1Symbol: "BUSD",
        token0Address: "0x3203c9E46cA618C8C1cE5dC67e7e9D75f5da2377",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "BAKE",
        token1Symbol: "BUSD",
        token0Address: "0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "BAKE",
        token1Symbol: "WBNB",
        token0Address: "0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "BAKE",
        token1Symbol: "USDT",
        token0Address: "0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "USDC",
        token1Symbol: "BUSD",
        token0Address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "USDC",
        token1Symbol: "WBNB",
        token0Address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "USDC",
        token1Symbol: "USDT",
        token0Address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "SOL",
        token1Symbol: "WBNB",
        token0Address: "0x7242E0090c795d7170F3082a640559ae79d487d1",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "BEAR",
        token1Symbol: "BUSD",
        token0Address: "0xc3EAE9b061Aa0e1B9BD3436080Dc57D2d63FEdc1",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "ATA",
        token1Symbol: "BUSD",
        token0Address: "0xA2120b9e674d3fC3875f415A7DF52e382F141225",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "ATA",
        token1Symbol: "USDT",
        token0Address: "0xA2120b9e674d3fC3875f415A7DF52e382F141225",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "ATA",
        token1Symbol: "WBNB",
        token0Address: "0xA2120b9e674d3fC3875f415A7DF52e382F141225",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "MASK",
        token1Symbol: "WBNB",
        token0Address: "0x2eD9a5C8C13b93955103B9a7C167B67Ef4d568a3",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "MASK",
        token1Symbol: "BUSD",
        token0Address: "0x2eD9a5C8C13b93955103B9a7C167B67Ef4d568a3",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "BTT",
        token1Symbol: "USDT",
        token0Address: "0x8595F9dA7b868b1822194fAEd312235E43007b49",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "BTT",
        token1Symbol: "WBNB",
        token0Address: "0x8595F9dA7b868b1822194fAEd312235E43007b49",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "BTT",
        token1Symbol: "BUSD",
        token0Address: "0x8595F9dA7b868b1822194fAEd312235E43007b49",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "YFI",
        token1Symbol: "WBNB",
        token0Address: "0x88f1A5ae2A3BF98AEAF342D26B30a79438c9142e",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "SHIB",
        token1Symbol: "USDT",
        token0Address: "0x2859e4544C4bB03966803b044A93563Bd2D0DD4D",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "SHIB",
        token1Symbol: "BUSD",
        token0Address: "0x2859e4544C4bB03966803b044A93563Bd2D0DD4D",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "UNFI",
        token1Symbol: "BUSD",
        token0Address: "0xA7cA04F7602cD7A939d3E4827F442f48cF8E9daD",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "UNFI",
        token1Symbol: "WBNB",
        token0Address: "0xA7cA04F7602cD7A939d3E4827F442f48cF8E9daD",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "AXS",
        token1Symbol: "BUSD",
        token0Address: "0x715D400F88C167884bbCc41C5FeA407ed4D2f8A0",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "AXS",
        token1Symbol: "WBNB",
        token0Address: "0x715D400F88C167884bbCc41C5FeA407ed4D2f8A0",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "AVAX",
        token1Symbol: "WBNB",
        token0Address: "0x1CE0c2827e2eF14D5C4f29a091d735A204794041",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "AVAX",
        token1Symbol: "BTCB",
        token0Address: "0x1CE0c2827e2eF14D5C4f29a091d735A204794041",
        token1Address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c"
    },
    {
        token0Symbol: "ALICE",
        token1Symbol: "USDT",
        token0Address: "0xAC51066d7bEC65Dc4589368da368b212745d63E8",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "ALICE",
        token1Symbol: "BUSD",
        token0Address: "0xAC51066d7bEC65Dc4589368da368b212745d63E8",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "PHX",
        token1Symbol: "WBNB",
        token0Address: "0xAC86E5F9BA48D680516DF50C72928C2EC50F3025",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "TUSD",
        token1Symbol: "USDT",
        token0Address: "0x14016E85a25aeb13065688cAFB43044C2ef86784",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "TUSD",
        token1Symbol: "WBNB",
        token0Address: "0x14016E85a25aeb13065688cAFB43044C2ef86784",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "TUSD",
        token1Symbol: "BUSD",
        token0Address: "0x14016E85a25aeb13065688cAFB43044C2ef86784",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "ALPHA",
        token1Symbol: "BUSD",
        token0Address: "0xa1faa113cbE53436Df28FF0aEe54275c13B40975",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "ALPHA",
        token1Symbol: "WBNB",
        token0Address: "0xa1faa113cbE53436Df28FF0aEe54275c13B40975",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "UNI",
        token1Symbol: "WBNB",
        token0Address: "0xBf5140A22578168FD562DCcF235E5D43A02ce9B1",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "UNI",
        token1Symbol: "BUSD",
        token0Address: "0xBf5140A22578168FD562DCcF235E5D43A02ce9B1",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "FRONT",
        token1Symbol: "WBNB",
        token0Address: "0x928E55DAB735AA8260AF3CEDADA18B5F70C72F1B",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "ONE",
        token1Symbol: "BUSD",
        token0Address: "0x03fF0ff224f904be3118461335064bB48Df47938",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "ONE",
        token1Symbol: "WBNB",
        token0Address: "0x03fF0ff224f904be3118461335064bB48Df47938",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "RAMP",
        token1Symbol: "BUSD",
        token0Address: "0x8519EA49c997f50cefFa444d240fB655e89248Aa",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "CHR",
        token1Symbol: "WBNB",
        token0Address: "0xf9CeC8d50f6c8ad3Fb6dcCEC577e05aA32B224FE",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "CHR",
        token1Symbol: "BUSD",
        token0Address: "0xf9CeC8d50f6c8ad3Fb6dcCEC577e05aA32B224FE",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "DAI",
        token1Symbol: "BUSD",
        token0Address: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "DAI",
        token1Symbol: "USDT",
        token0Address: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "DAI",
        token1Symbol: "WBNB",
        token0Address: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "DAI",
        token1Symbol: "BTCB",
        token0Address: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
        token1Address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c"
    },
    {
        token0Symbol: "RUNE",
        token1Symbol: "BUSD",
        token0Address: "0xA9776B590bfc2f956711b3419910A5Ec1F63153E",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "RUNE",
        token1Symbol: "WBNB",
        token0Address: "0xA9776B590bfc2f956711b3419910A5Ec1F63153E",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "EGLD",
        token1Symbol: "WBNB",
        token0Address: "0xbF7c81FFF98BbE61B40Ed186e4AfD6DDd01337fe",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "EGLD",
        token1Symbol: "BUSD",
        token0Address: "0xbF7c81FFF98BbE61B40Ed186e4AfD6DDd01337fe",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "EGLD",
        token1Symbol: "USDT",
        token0Address: "0xbF7c81FFF98BbE61B40Ed186e4AfD6DDd01337fe",
        token1Address: "0x55d398326f99059fF775485246999027B3197955"
    },
    {
        token0Symbol: "DODO",
        token1Symbol: "BUSD",
        token0Address: "0x67ee3Cb086F8a16f34beE3ca72FAD36F7Db929e2",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "TCT",
        token1Symbol: "WBNB",
        token0Address: "0x2095d2346e47Ed497d4F39FcfA59918b4346cd65",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "GALA",
        token1Symbol: "WBNB",
        token0Address: "0x7dDEE176F665cD201F93eEDE625770E2fD911990",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "BTCST",
        token1Symbol: "BUSD",
        token0Address: "0x78650B139471520656b9E7aA7A5e9276814a38e9",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "BTCST",
        token1Symbol: "BTCB",
        token0Address: "0x78650B139471520656b9E7aA7A5e9276814a38e9",
        token1Address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c"
    },
    {
        token0Symbol: "CREAM",
        token1Symbol: "BUSD",
        token0Address: "0xd4CB328A82bDf5f03eB737f37Fa6B370aef3e888",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    },
    {
        token0Symbol: "CREAM",
        token1Symbol: "WBNB",
        token0Address: "0xd4CB328A82bDf5f03eB737f37Fa6B370aef3e888",
        token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
    {
        token0Symbol: "SFP",
        token1Symbol: "BUSD",
        token0Address: "0xD41FDb03Ba84762dD66a0af1a6C8540FF1ba5dfb",
        token1Address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    }
]