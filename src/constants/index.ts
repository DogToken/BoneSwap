import { ChainId, JSBI, Percent, Token, WETH } from '@uniswap/sdk'
import { AbstractConnector } from '@web3-react/abstract-connector'

import { injected, walletconnect, walletlink, portis, arkaneconnect, safeApp, bitski } from '../connectors'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const LAIR_ADDRESS = '0xf28164a485b0b2c90639e47b0f377b4a438a16b1';

export const QUICK_ADDRESS = '0x831753DD7087CaC61aB5644b308642cc1c33Dc13';

export const QUICK_ADDRESS_MUMBAI = "0x55bee1bd3eb9986f6d2d963278de09ee92a3ef1d";

export const CONVERTER_ADDRESS = "0x333068d06563a8dfdbf330a0e04a9d128e98bf5a";

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

//Remove these 2 after testing
export const TOKENA = new Token(ChainId.MATIC, '0xd46422d62c1d3b6b6934727be2f8aad4162a88dc', 18, 'TokenA', 'TokenA')
export const TOKENB = new Token(ChainId.MATIC, '0xc447b32a05819d82b06bf95f9bb878f6ae9c7ecc', 18, 'TokenB', 'TokenA')


export const EMPTY = new Token(ChainId.MATIC, '0x0000000000000000000000000000000000000000', 0, 'EMPTY', 'EMPTY')
export const DAI = new Token(ChainId.MATIC, '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', 18, 'DAI', 'Dai Stablecoin')
export const USDC = new Token(ChainId.MATIC, '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', 6, 'USDC', 'USDC')
export const USDT = new Token(ChainId.MATIC, '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', 6, 'USDT', 'Tether USD')
export const COMP = new Token(ChainId.MATIC, '0x8505b9d2254A7Ae468c0E9dd10Ccea3A837aef5c', 18, 'COMP', 'Compound')
export const UNITOKEN = new Token(ChainId.MATIC, '0xb33EaAd8d922B1083446DC23f610c2567fB5180f', 18, 'UNI', 'Uniswap')
//export const TT01 = new Token(ChainId.MATIC, '0x55BeE1bD3Eb9986f6d2d963278de09eE92a3eF1D', 18, 'TT01', 'Test Token 01')
//export const TT02 = new Token(ChainId.MATIC, '0xF6Ad3CcF71Abb3E12beCf6b3D2a74C963859ADCd', 18, 'TT01', 'Test Token 02')
export const ETHER = new Token(ChainId.MATIC, '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', 18, 'ETH', 'Ether')
export const QUICK = new Token(ChainId.MATIC, '0x831753DD7087CaC61aB5644b308642cc1c33Dc13', 18, 'QUICK', 'QuickSwap')
export const WBTC  = new Token(ChainId.MATIC, '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6', 18, 'wBTC', 'Wrapped Bitcoin')
export const IGG  = new Token(ChainId.MATIC, '0xe6FC6C7CB6d2c31b359A49A33eF08aB87F4dE7CE', 18, 'IGG', 'IG Gold')
export const OM  = new Token(ChainId.MATIC, '0xC3Ec80343D2bae2F8E680FDADDe7C17E71E114ea', 18, 'OM', 'OM Mantra DAO')
export const GHST  = new Token(ChainId.MATIC, '0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7', 18, 'GHST', 'Aavegotchi GHST Token')
export const MAUSDC  = new Token(ChainId.MATIC, '0x9719d867A500Ef117cC201206B8ab51e794d3F82', 6, 'maUSDC', 'Matic Aave interest bearing USDC')
export const MADAI  = new Token(ChainId.MATIC, '0xE0b22E0037B130A9F56bBb537684E6fA18192341', 18, 'maDAI', 'Matic Aave interest bearing DAI')
//export const SWG  = new Token(ChainId.MATIC, '0x043a3aa319b563ac25d4e342d32bffb51298db7b', 18, 'SWG', 'Swirge')
//export const RBAL  = new Token(ChainId.MATIC, '0x03247a4368A280bEc8133300cD930A3a61d604f6', 18, 'RBAL', 'Rebalance Token')
export const DG  = new Token(ChainId.MATIC, '0xef938b6da8576a896f6E0321ef80996F4890f9c4', 18, 'DG', 'decentral.games')
export const SX  = new Token(ChainId.MATIC, '0x840195888Db4D6A99ED9F73FcD3B225Bb3cB1A79', 18, 'SX', 'SportX')
//export const WRX  = new Token(ChainId.MATIC, '0x72d6066F486bd0052eefB9114B66ae40e0A6031a', 8, 'WRX', 'WazirX')
//export const MUST  = new Token(ChainId.MATIC, '0x9C78EE466D6Cb57A4d01Fd887D2b5dFb2D46288f', 18, 'MUST', 'Must')
export const FRAX  = new Token(ChainId.MATIC, '0x45c32fA6DF82ead1e2EF74d17b76547EDdFaFF89', 18, 'FRAX', 'FRAX')
export const FXS  = new Token(ChainId.MATIC, '0x3e121107F6F22DA4911079845a470757aF4e1A1b', 18, 'FXS', 'Frax Shares')
export const MAWETH  = new Token(ChainId.MATIC, '0x20D3922b4a1A8560E1aC99FBA4faDe0c849e2142', 18, 'maWETH', 'Matic Aave interest bearing WETH')
export const MAAAVE  = new Token(ChainId.MATIC, '0x823CD4264C1b951C9209aD0DeAea9988fE8429bF', 18, 'maAAVE', 'Matic Aave interest bearing AAVE')
export const MALINK  = new Token(ChainId.MATIC, '0x98ea609569bD25119707451eF982b90E3eb719cD', 18, 'maLINK', 'Matic Aave interest bearing LINK')
export const MAUSDT  = new Token(ChainId.MATIC, '0xDAE5F1590db13E3B40423B5b5c5fbf175515910b', 6, 'maUSDT', 'Matic Aave interest bearing USDT')
export const MATUSD  = new Token(ChainId.MATIC, '0xF4b8888427b00d7caf21654408B7CBA2eCf4EbD9', 18, 'maTUSD', 'Matic Aave interest bearing TUSD')
export const MAUNI  = new Token(ChainId.MATIC, '0x8c8bdBe9CeE455732525086264a4Bf9Cf821C498', 18, 'maUNI', 'Matic Aave interest bearing UNI')
export const MAYFI  = new Token(ChainId.MATIC, '0xe20f7d1f0eC39C4d5DB01f53554F2EF54c71f613', 18, 'maYFI', 'Matic Aave interest bearing YFI')
//export const MRBAL  = new Token(ChainId.MATIC, '0x66768ad00746aC4d68ded9f64886d55d5243f5Ec', 18, 'mRBAL', 'Matic Rebalance Token')
export const GAME  = new Token(ChainId.MATIC, '0x8d1566569d5b695d44a9a234540f68D393cDC40D', 18, 'GAME', 'GAME Credits')
//export const SENT  = new Token(ChainId.MATIC, '0x48e3883233461C2eF4cB3FcF419D6db07fb86CeA', 8, 'SENT', 'Sentinel')
export const ELET  = new Token(ChainId.MATIC, '0x07738Eb4ce8932CA961c815Cb12C9d4ab5Bd0Da4', 18, 'ELET', 'Elementum')
export const HEX  = new Token(ChainId.MATIC, '0x23D29D30e35C5e8D321e1dc9A8a61BFD846D4C5C', 8, 'HEX', 'HEXX')
export const SWAP  = new Token(ChainId.MATIC, '0x3809dcDd5dDe24B37AbE64A5a339784c3323c44F', 18, 'SWAP', 'TrustSwap Token')
export const DB  = new Token(ChainId.MATIC, '0x0e59D50adD2d90f5111aca875baE0a72D95B4762', 18, 'DB', 'Dark.Build')
//export const ZUT  = new Token(ChainId.MATIC, '0xe86E8beb7340659DDDCE61727E500e3A5aD75a90', 18, 'ZUT', 'ZeroUtility')

export const UBT  = new Token(ChainId.MATIC, '0x7FBc10850caE055B27039aF31bD258430e714c62', 8, 'UBT', 'Unibright')
export const VISION  = new Token(ChainId.MATIC, '0x034b2090b579228482520c589dbD397c53Fc51cC', 18, 'VISION', 'Vision Token')
export const IFARM  = new Token(ChainId.MATIC, '0xab0b2ddB9C7e440fAc8E140A89c0dbCBf2d7Bbff', 18, 'iFARM', 'iFARM')
//export const PPDEX  = new Token(ChainId.MATIC, '0x127984b5E6d5c59f81DACc9F1C8b3Bdc8494572e', 18, 'PPDEX', 'Pepedex')

export const CEL  = new Token(ChainId.MATIC, '0xd85d1e945766fea5eda9103f918bd915fbca63e6', 4, 'CEL', 'Celsius')
export const ARIA20  = new Token(ChainId.MATIC, '0x46F48FbdedAa6F5500993BEDE9539ef85F4BeE8e', 18, 'ARIA20', 'ARIANEE')
//export const CFI  = new Token(ChainId.MATIC, '0xeCf8f2FA183b1C4d2A269BF98A54fCe86C812d3e', 18, 'CFI', 'CyberFi Token')
export const DSLA  = new Token(ChainId.MATIC, '0xa0E390e9ceA0D0e8cd40048ced9fA9EA10D71639', 18, 'DSLA', 'DSLA')
//export const DRC  = new Token(ChainId.MATIC, '0xFeD16c746CB5BFeD009730f9E3e6A673006105c7', 0, 'DRC', 'Digital Reserve Currency')
export const LINK  = new Token(ChainId.MATIC, '0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39', 18, 'LINK', 'Chainlink Token')

export const SUPER  = new Token(ChainId.MATIC, '0xa1428174F516F527fafdD146b883bB4428682737', 18, 'SUPER', 'SuperFarm')
//export const XMARK  = new Token(ChainId.MATIC, '0xf153eff70dc0bf3b085134928daeea248d9b30d0', 9, 'xMARK', 'Standard')
export const DEFI5  = new Token(ChainId.MATIC, '0x42435F467D33e5C4146a4E8893976ef12BBCE762', 18, 'DEFI5', 'DEFI Top 5 Tokens Index')
//export const AZUKI  = new Token(ChainId.MATIC, '0x7CdC0421469398e0F3aA8890693d86c840Ac8931', 18, 'AZUKI', 'DokiDokiAzuki')
//export const HH  = new Token(ChainId.MATIC, '0x521CddC0CBa84F14c69C1E99249F781AA73Ee0BC', 18, 'HH', 'Holyheld')
//export const MDEF  = new Token(ChainId.MATIC, '0x82B6205002ecd05e97642D38D61e2cFeaC0E18cE', 9, 'mDEF', 'Matic Deflect Protocol')
//export const DMT  = new Token(ChainId.MATIC, '0xd28449BB9bB659725aCcAd52947677ccE3719fD7', 18, 'DMT', 'Dark Matter Token')
export const DEGEN  = new Token(ChainId.MATIC, '0x8a2870fb69A90000D6439b7aDfB01d4bA383A415', 18, 'DEGEN', 'DEGEN Index')
export const DQUICK = new Token(ChainId.MATIC, '0xf28164A485B0B2C90639E47b0f377b4a438a16B1', 18, 'dQUICK', 'Dragon QUICK')
export const MONA  = new Token(ChainId.MATIC, '0x6968105460f67c3BF751bE7C15f92F5286Fd0CE5', 18, 'MONA', 'Monavale')
export const WISE  = new Token(ChainId.MATIC, '0xB77e62709e39aD1cbeEBE77cF493745AeC0F453a', 18, 'WISE', 'Wise Token')
export const CC10  = new Token(ChainId.MATIC, '0x9c49BA0212Bb5Db371e66b59D1565b7c06E4894e', 18, 'CC10', 'Cryptocurrency Top Tokens Index')
export const MOCEAN  = new Token(ChainId.MATIC, '0x282d8efCe846A88B159800bd4130ad77443Fa1A1', 18, 'mOCEAN', 'Ocean Token')
//export const ZUZ  = new Token(ChainId.MATIC, '0x232eaB56c4fB3f84c6Fb0a50c087c74b7B43c6Ad', 18, 'ZUZ', 'Zeus')

//export const BTU  = new Token(ChainId.MATIC, '0xFdc26CDA2d2440d0E83CD1DeE8E8bE48405806DC', 18, 'BTU', 'BTU Protocol')
export const WOLF  = new Token(ChainId.MATIC, '0x8f18dC399594b451EdA8c5da02d0563c0b2d0f16', 9, 'WOLF', 'moonwolf.io')
export const AGA  = new Token(ChainId.MATIC, '0x033d942A6b495C4071083f4CDe1f17e986FE856c', 4, 'AGA', 'AGA Token')
export const AGAr  = new Token(ChainId.MATIC, '0xF84BD51eab957c2e7B7D646A3427C5A50848281D', 8, 'AGAr', 'AGA Rewards')
//export const CTSI  = new Token(ChainId.MATIC, '0x2727Ab1c2D22170ABc9b595177B2D5C6E1Ab7B7B', 18, 'CTSI', 'Cartesi Token')
export const TEL  = new Token(ChainId.MATIC, '0xdF7837DE1F2Fa4631D716CF2502f8b230F1dcc32', 2, 'TEL', 'Telcoin')

export const GFARM2  = new Token(ChainId.MATIC, '0x7075cAB6bCCA06613e2d071bd918D1a0241379E2', 18, 'GFARM2', 'Gains V2')
//export const NFTP  = new Token(ChainId.MATIC, '0xf7d9e281c5Cb4C6796284C5b663b3593D2037aF2', 18, 'NFTP', 'NFT Platform Index')

export const AAVE  = new Token(ChainId.MATIC, '0xD6DF932A45C0f255f85145f286eA0b292B21C90B', 18, 'AAVE', 'Aave')
//export const FSN  = new Token(ChainId.MATIC, '0x2bF9b864cdc97b08B6D79ad4663e71B8aB65c45c', 18, 'FSN', 'Fusion')
//export const ANY  = new Token(ChainId.MATIC, '0x6aB6d61428fde76768D7b45D8BFeec19c6eF91A8', 18, 'Any', 'Anyswap')
//export const PLOT  = new Token(ChainId.MATIC, '0xe82808eaA78339b06a691fd92E1Be79671cAd8D3', 18, 'PLOT', 'PLOT')
//export const OPU  = new Token(ChainId.MATIC, '0x7ff2FC33E161E3b1C6511B934F0209D304267857', 18, 'OPU', 'Opu Coin')
//export const KRILL  = new Token(ChainId.MATIC, '0x05089C9EBFFa4F0AcA269e32056b1b36B37ED71b', 18, 'Krill', 'Krill')
//export const FISH  = new Token(ChainId.MATIC, '0x3a3Df212b7AA91Aa0402B9035b098891d276572B', 18, 'FISH', 'Fish')

export const BIFI  = new Token(ChainId.MATIC, '0xFbdd194376de19a88118e84E279b977f165d01b8', 18, 'BIFI', 'beefy.finance')
export const QI  = new Token(ChainId.MATIC, '0x580A84C73811E1839F75d86d75d88cCa0c241fF4', 18, 'QI', 'Qi Dao')
export const MI  = new Token(ChainId.MATIC, '0xa3Fa99A148fA48D14Ed51d610c367C61876997F1', 18, 'MAI', 'miMATIC')
export const POLYDOGE  = new Token(ChainId.MATIC, '0x8A953CfE442c5E8855cc6c61b1293FA648BAE472', 18, 'PolyDoge', 'PolyDoge')
export const EMON  = new Token(ChainId.MATIC, '0xd6a5ab46ead26f49b03bbb1f9eb1ad5c1767974a', 18, 'EMON', 'EthermonToken')

//export const MOON  = new Token(ChainId.MATIC, '0xc56d17dD519e5eB43a19C9759b5D5372115220BD', 18, 'MOON', 'Polywolf')
export const ADDY  = new Token(ChainId.MATIC, '0xc3FdbadC7c795EF1D6Ba111e06fF8F16A20Ea539', 18, 'ADDY', 'Adamant')
export const QuickChart  = new Token(ChainId.MATIC, '0x0Af77B096cbDF53B5c39c2fcff8F14C5E3a36356', 9, 'QuickChart', 'QuickChart')
export const PAUTO  = new Token(ChainId.MATIC, '0x7f426F6Dc648e50464a0392E60E1BB465a67E9cf', 18, 'PAUTO', 'Orbit Bridge Polygon AUTOv2')
export const UFT  = new Token(ChainId.MATIC, '0x5B4CF2C120A9702225814E18543ee658c5f8631e', 18, 'UFT', 'UniLend Finance Token')

export const IRON  = new Token(ChainId.MATIC, '0xD86b5923F3AD7b585eD81B448170ae026c65ae9a', 18, 'IRON', 'IRON Stablecoin')
export const TITAN  = new Token(ChainId.MATIC, '0xaAa5B9e6c589642f98a1cDA99B9D024B8407285A', 18, 'TITAN', 'IRON Titanium Token')
//export const ZEE  = new Token(ChainId.MATIC, '0xfd4959c06FbCc02250952DAEbf8e0Fb38cF9FD8C', 18, 'ZEE', 'ZeroSwapToken')
export const FFF  = new Token(ChainId.MATIC, '0x9aCeB6f749396d1930aBc9e263eFc449E5e82c13', 18, 'FFF', 'Future of Finance Fund')
export const IQ  = new Token(ChainId.MATIC, '0xB9638272aD6998708de56BBC0A290a1dE534a578', 18, 'IQ', 'Everipedia IQ')
//export const INRP  = new Token(ChainId.MATIC, '0xde485931674F4EdD3Ed3bf22e86E7d3C7D5347a1', 18, 'INRP', 'Rupeeto')


//export const GFI  = new Token(ChainId.MATIC, '0x874e178A2f3f3F9d34db862453Cd756E7eAb0381', 18, 'GFI', 'Gravity Finance')
export const CHUM  = new Token(ChainId.MATIC, '0x2e2DDe47952b9c7deFDE7424d00dD2341AD927Ca', 18, 'CHUM', 'ChumHum')
//export const ELE  = new Token(ChainId.MATIC, '0xAcD7B3D9c10e97d0efA418903C0c7669E702E4C0', 18, 'ELE', 'Eleven.finance')
//export const CRV  = new Token(ChainId.MATIC, '0x172370d5Cd63279eFa6d502DAB29171933a610AF', 18, 'CRV', 'CRV')

export const PBNB  = new Token(ChainId.MATIC, '0x7e9928aFe96FefB820b85B4CE6597B8F660Fe4F4', 18, 'PBNB', 'Orbit Bridge Polygon Binance Coin')
export const IOI  = new Token(ChainId.MATIC, '0xAF24765F631C8830B5528B57002241eE7eef1C14', 6, 'IOI', 'IOI Token')
export const ERN  = new Token(ChainId.MATIC, '0x0E50BEA95Fe001A370A4F1C220C49AEdCB982DeC', 18, 'ERN', 'Ethernity Chain')
export const RAMP  = new Token(ChainId.MATIC, '0xaECeBfcF604AD245Eaf0D5BD68459C3a7A6399c2', 18, 'RAMP', 'RAMP')
export const RUSD  = new Token(ChainId.MATIC, '0xfC40a4F89b410a1b855b5e205064a38fC29F5eb5', 18, 'rUSD', 'rUSD')
//export const MEM  = new Token(ChainId.MATIC, '0x42dbBd5ae373FEA2FC320F62d44C058522Bb3758', 18, 'MEM', 'Memecoin')
export const WBUSD  = new Token(ChainId.MATIC, '0x87ff96aba480f1813aF5c780387d8De7cf7D8261', 18, 'WBUSD', 'Wrapped BUSD')
//export const BORING  = new Token(ChainId.MATIC, '0xff88434E29d1E2333aD6baa08D358b436196da6b', 18, 'BORING', 'BoringDAO')
export const WOO  = new Token(ChainId.MATIC, '0x1B815d120B3eF02039Ee11dC2d33DE7aA4a8C603', 18, 'WOO', 'Wootrade Network')

export const START  = new Token(ChainId.MATIC, '0x6Ccf12B480A99C54b23647c995f4525D544A7E72', 18, 'START', 'BSCstarter')
//export const SAFU  = new Token(ChainId.MATIC, '0x26f6Cb841F9D4D72b68D7dCb6fDB5d6C832dD2A7', 9, 'SAFU', 'polySAFU')
export const HONOR  = new Token(ChainId.MATIC, '0xb82A20B4522680951F11c94c54B8800c1C237693', 18, 'HONOR', 'HONOR')
//export const FSW  = new Token(ChainId.MATIC, '0xad5dc12E88C6534Eea8cFe2265851D9d4A1472AD', 18, 'FSW', 'FalconSwap Token')
export const YAYO  = new Token(ChainId.MATIC, '0xf7058856f405542cd660e8ce4751248F2d037f2B', 4, 'YAYO', 'YAYO Coin')
export const CGG  = new Token(ChainId.MATIC, '0x2Ab4f9aC80F33071211729e45Cfc346C1f8446d5', 18, 'CGG', 'ChainGuardians Governance Token')

export const BUNNY  = new Token(ChainId.MATIC, '0x4C16f69302CcB511c5Fac682c7626B9eF0Dc126a', 18, 'polyBUNNY', 'Polygon BUNNY Token')
export const GBTS  = new Token(ChainId.MATIC, '0xbe9512e2754cb938dd69Bbb96c8a09Cb28a02D6D', 18, 'GBTS', 'GemBites')

export const FOR  = new Token(ChainId.MATIC, '0x546b4c391520E6652897c65153074088BFC0A909', 18, 'FOR', 'The Force Token')
export const RDOGE  = new Token(ChainId.MATIC, '0xcE829A89d4A55a63418bcC43F00145adef0eDB8E', 8, 'renDOGE', 'renDOGE')

export const COMBO  = new Token(ChainId.MATIC, '0x6DdB31002abC64e1479Fc439692F7eA061e78165', 18, 'COMBO', 'Furucombo')
export const FEAR  = new Token(ChainId.MATIC, '0xa2CA40DBe72028D3Ac78B5250a8CB8c404e7Fb8C', 18, 'FEAR', 'Fear NFTs')

export const MBTM  = new Token(ChainId.MATIC, '0xA16EbA3b7562FC92597579A80Fe53a92DCab7122', 8, 'mBTM', 'Bytom minted')
export const RENDGB  = new Token(ChainId.MATIC, '0x2628568509E87c4429fBb5c664Ed11391BE1BD29', 8, 'renDGB', 'renDGB')
export const NEXO  = new Token(ChainId.MATIC, '0x41b3966B4FF7b427969ddf5da3627d6AEAE9a48E', 18, 'NEXO', 'Nexo')

export const GNO  = new Token(ChainId.MATIC, '0x5FFD62D3C3eE2E81C00A7b9079FB248e7dF024A8', 18, 'GNO', 'Gnosis Token')

export const BEL  = new Token(ChainId.MATIC, '0x28C388FB1F4fa9F9eB445f0579666849EE5eeb42', 18, 'BEL', 'Bella')
export const SOL  = new Token(ChainId.MATIC, '0x7DfF46370e9eA5f0Bad3C4E29711aD50062EA7A4', 18, 'SOL', 'SOL')
export const PUSD  = new Token(ChainId.MATIC, '0x9aF3b7DC29D3C4B1A5731408B6A9656fA7aC3b72', 18, 'PUSD', 'PUSD')
export const DINO  = new Token(ChainId.MATIC, '0xAa9654BECca45B5BDFA5ac646c939C62b527D394', 18, 'DINO', 'DinoSwap')
export const PYR  = new Token(ChainId.MATIC, '0x348e62131fce2F4e0d5ead3Fe1719Bc039B380A9', 18, 'PYR', 'PYR Token')
export const YAMP  = new Token(ChainId.MATIC, '0x87f654c4b347230C60CAD8d7ea9cF0D7238bcc79', 18, 'YAMP', 'YAMP.FINANCE')

export const OMEN  = new Token(ChainId.MATIC, '0x76e63a3E7Ba1e2E61D3DA86a87479f983dE89a7E', 18, 'OMEN', 'Augury Finance')
export const KOGECOIN  = new Token(ChainId.MATIC, '0x13748d548D95D78a3c83fe3F32604B4796CFfa23', 9, 'KOGECOIN', 'kogecoin.io')
export const MEEB  = new Token(ChainId.MATIC, '0x64aFDF9e28946419E325d801Fb3053d8B8FFdC23', 18, 'MEEB', 'MeebMaster.com Token')
export const IMX  = new Token(ChainId.MATIC, '0x60bB3D364B765C497C8cE50AE0Ae3f0882c5bD05', 18, 'IMX', 'Impermax')
export const AVAX  = new Token(ChainId.MATIC, '0x2C89bbc92BD86F8075d1DEcc58C7F4E0107f286b', 18, 'AVAX', 'Avalanche Token')
export const GUARD  = new Token(ChainId.MATIC, '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8', 18, 'Guard', 'Helmet.insure on Polygon')
export const YEL  = new Token(ChainId.MATIC, '0xD3b71117E6C1558c1553305b44988cd944e97300', 18, 'YEL', 'YEL Token')
export const PSWAMP = new Token(ChainId.MATIC, '0x5f1657896B38c4761dbc5484473c7A7C845910b6', 18, 'pSwamp', 'pSwampy')
export const RELAY = new Token(ChainId.MATIC, '0x904371845Bc56dCbBcf0225ef84a669b2fD6bd0d', 18, 'RELAY', 'Relay Token')

export const ADS = new Token(ChainId.MATIC, '0x598e49f01bEfeB1753737934a5b11fea9119C796', 11, 'ADS', 'Adshares')
export const O3 = new Token(ChainId.MATIC, '0xEe9801669C6138E84bD50dEB500827b776777d28', 18, 'O3', 'O3 Swap Token')
export const EZ = new Token(ChainId.MATIC, '0x34C1b299A74588D6Abdc1b85A53345A48428a521', 18, 'EZ', 'EASY V2')
export const DNXC = new Token(ChainId.MATIC, '0xcaF5191fc480F43e4DF80106c7695ECA56E48B18', 18, 'DNXC', 'DinoX Coin')
export const POOL = new Token(ChainId.MATIC, '0x25788a1a171ec66Da6502f9975a15B609fF54CF6', 18, 'POOL', 'PoolTogether')

export const MOD = new Token(ChainId.MATIC, '0x8346Ab8d5EA7A9Db0209aEd2d1806AFA0E2c4C21', 18, 'MOD', 'MODEFI')
export const CHICK = new Token(ChainId.MATIC, '0x9e725Cf7265D12fd5f59499AFf1258CA92CAc74d', 18, 'CHICK', 'loserchick')
export const HT = new Token(ChainId.MATIC, '0xA731349fa468614c1698fc46ebf06Da6F380239e', 18, 'HT', 'Huobi Token')

export const CIOTX = new Token(ChainId.MATIC, '0x300211Def2a644b036A9bdd3e58159bb2074d388', 18, 'CIOTX', 'Crosschain IOTX')
export const REVV = new Token(ChainId.MATIC, '0x70c006878a5A50Ed185ac4C87d837633923De296', 18, 'REVV', 'REVV')

export const XCAD = new Token(ChainId.MATIC, '0xA55870278d6389ec5B524553D03C04F5677c061E', 18, 'XCAD', 'XCAD Token')
export const XED = new Token(ChainId.MATIC, '0x2fe8733dcb25BFbbA79292294347415417510067', 18, 'XED', 'Exeedme')
export const OOE = new Token(ChainId.MATIC, '0x9d5565dA88e596730522CbC5a918d2A89dbC16d9', 18, 'OOE', 'OpenOcean')
export const MOONED = new Token(ChainId.MATIC, '0x7E4c577ca35913af564ee2a24d882a4946Ec492B', 18, 'MOONED', 'MoonEdge')
export const DHV = new Token(ChainId.MATIC, '0x5fCB9de282Af6122ce3518CDe28B7089c9F97b26', 18, 'DHV', 'DeHive.')
export const WOW = new Token(ChainId.MATIC, '0x855D4248672a1fCE482165e8DBE1207b94b1968a', 18, 'WOW', 'WOWswap')

export const ANRX = new Token(ChainId.MATIC, '0x554f074d9cCda8F483d1812d4874cBebD682644E', 18, 'ANRX', 'AnRKey X')
export const MASK = new Token(ChainId.MATIC, '0x2B9E7ccDF0F4e5B24757c1E1a80e311E34Cb10c7', 18, 'MASK', 'Mask Network')
export const RING = new Token(ChainId.MATIC, '0x9C1C23E60B72Bc88a043bf64aFdb16A02540Ae8f', 18, 'Ring', 'Darwinia')
export const TCP = new Token(ChainId.MATIC, '0x032F85b8FbF8540a92B986d953e4C3A61C76d39E', 18, 'TCP', 'The Crypto Prophecies')
export const ANGEL = new Token(ChainId.MATIC, '0x0B6afe834dab840335F87d99b45C2a4bd81A93c7', 18, 'ANGEL', 'Angel')
export const UGT = new Token(ChainId.MATIC, '0xBa4c54Ea2d66b904C82847A7d2357d22B857E812', 18, 'UGT', 'Unreal Governance Token')
export const KOM = new Token(ChainId.MATIC, '0xC004e2318722EA2b15499D6375905d75Ee5390B8', 8, 'KOM', 'Kommunitas')
export const UST = new Token(ChainId.MATIC, '0xE6469Ba6D2fD6130788E0eA9C0a0515900563b59', 6, 'UST', 'Wrapped UST Token')
export const CNTR = new Token(ChainId.MATIC, '0xdae89dA41a96956e9e70320Ac9c0dd077070D3a5', 18, 'CNTR', 'Centaur Token')
export const TRADE = new Token(ChainId.MATIC, '0x692AC1e363ae34b6B489148152b12e2785a3d8d6', 18, 'TRADE', 'Polytrade')

export const PLR = new Token(ChainId.MATIC, '0xa6b37fC85d870711C56FbcB8afe2f8dB049AE774', 18, 'PLR', 'PILLAR')
export const RENBTC = new Token(ChainId.MATIC, '0xDBf31dF14B66535aF65AaC99C32e9eA844e14501', 8, 'renBTC', 'renBTC')
export const ORBS = new Token(ChainId.MATIC, '0x614389EaAE0A6821DC49062D56BDA3d9d45Fa2ff', 18, 'ORBS', 'Orbs')
export const SHI3LD = new Token(ChainId.MATIC, '0xF239E69ce434c7Fb408b05a0Da416b14917d934e', 18, 'SHI3LD', 'PolyShield')
export const BABYQUICK = new Token(ChainId.MATIC, '0x9a05D1FF699ea187Dc8523E333eD63503f0d82db', 18, 'BABYQUICK', 'BABYQUICK')
export const PERA = new Token(ChainId.MATIC, '0xe95fD76CF16008c12FF3b3a937CB16Cd9Cc20284', 18, 'PERA', 'PERA')
//export const IRIS = new Token(ChainId.MATIC, '0xdaB35042e63E93Cc8556c9bAE482E5415B5Ac4B1', 18, 'IRIS', 'Iris')
export const XCASH = new Token(ChainId.MATIC, '0x03678f2c2c762DC63c2Bb738c3a837D366eDa560', 18, 'XCASH', 'X-Cash')
export const SNK = new Token(ChainId.MATIC, '0x689f8e5913C158fFB5Ac5aeb83b3C875F5d20309', 18, 'SNK', 'Snook')

export const BNB = new Token(ChainId.MATIC, '0x5c4b7CCBF908E64F32e12c6650ec0C96d717f03F', 18, 'BNB', 'Binance Token')
export const ETHA = new Token(ChainId.MATIC, '0x59E9261255644c411AfDd00bD89162d09D862e38', 18, 'ETHA', 'ETHA')
export const MITX = new Token(ChainId.MATIC, '0x31042A4E66eDa0d12143ffc8cC1552D611dA4cbA', 18, 'MITx', 'Morpheus Infrastructure Token')
export const ZUSD = new Token(ChainId.MATIC, '0x5668F6d40E15188045a1dE6295054103C13ffAc1', 18, 'zUSD', 'Zerogoki USD')
export const REI = new Token(ChainId.MATIC, '0xB9f9e37c2CdbaFF928C3Da730b02F06fE09aE70E', 18, 'REI', 'Zerogoki Token')
export const PHX = new Token(ChainId.MATIC, '0x9C6BfEdc14b5C23E3900889436Edca7805170f01', 18, 'PHX', 'Phoenix Token')
export const ODDZ = new Token(ChainId.MATIC, '0x4e830F67Ec499E69930867f9017AEb5B3f629c73', 18, 'ODDZ', 'OddzToken')


export const D11 = new Token(ChainId.MATIC, '0xc58158c14D4757EF36Ce25e493758F2fcEEDec5D', 18, 'D11', 'DeFi11')
export const PBR = new Token(ChainId.MATIC, '0x0D6ae2a429df13e44A07Cd2969E085e4833f64A0', 18, 'PBR', 'PolkaBridge')
export const MVERSE = new Token(ChainId.MATIC, '0x0B313b4C589A3BD3350f625f2e94DC80AB50017E', 18, 'Mverse', 'MaticVerse')
export const TECH = new Token(ChainId.MATIC, '0x6286A9e6f7e745A6D884561D88F94542d6715698', 18, 'TECH', 'Cryptomeda')
export const GMEE = new Token(ChainId.MATIC, '0xcf32822ff397Ef82425153a9dcb726E5fF61DCA7', 18, 'GAMEE', 'GMEE')

export const YFDAI = new Token(ChainId.MATIC, '0x7E7fF932FAb08A0af569f93Ce65e7b8b23698Ad8', 18, 'Yf-DAI', 'YfDAI.finance')
export const MOT = new Token(ChainId.MATIC, '0x2db0Db271a10661e7090b6758350E18F6798a49D', 18, 'MOT', 'Mobius Token')
export const NSDX = new Token(ChainId.MATIC, '0xE8d17b127BA8b9899a160D9a07b69bCa8E08bfc6', 18, 'NSDX', 'NASDEX Token')
export const EROWAN = new Token(ChainId.MATIC, '0xa7051C5a22d963b81D71C2BA64D46a877fBc1821', 18, 'EROWAN', 'SifChain (erowan)')
export const ATOM = new Token(ChainId.MATIC, '0xac51C4c48Dc3116487eD4BC16542e27B5694Da1b', 18, 'ATOM', 'Cosmos')

export const WATCH = new Token(ChainId.MATIC, '0x09211Dc67f9fe98Fb7bBB91Be0ef05f4a12FA2b2', 18, 'WATCH', 'yieldwatch')
export const MCASH = new Token(ChainId.MATIC, '0xa25610a77077390A75aD9072A084c5FbC7d43A0d', 18, 'MCASH', 'Monsoon Finance')
export const KNIGHT = new Token(ChainId.MATIC, '0x4455eF8B4B4A007a93DaA12DE63a47EEAC700D9D', 18, 'KNIGHT', 'Forest Knight')
export const JRT = new Token(ChainId.MATIC, '0x596eBE76e2DB4470966ea395B0d063aC6197A8C5', 18, 'JRT', 'Jarvis Reward Token')

export const BLOK = new Token(ChainId.MATIC, '0x229b1b6C23ff8953D663C4cBB519717e323a0a84', 18, 'BLOK', 'BLOK')
export const ALN = new Token(ChainId.MATIC, '0xa8fcEe762642f156b5D757b6FabC36E06b6d4A1A', 18, 'ALN', 'Aluna')
export const XPRT = new Token(ChainId.MATIC, '0xb3b9c016AD1E9f7EFdAE451b04EF696e05658b32', 6, 'XPRT', 'Persistence')
export const IRIS = new Token(ChainId.MATIC, '0x3dc6052a693E4a2fc28Eb2Ea12fe0CfD3BD221D1', 6, 'IRIS', 'IRISnet')
export const AKT = new Token(ChainId.MATIC, '0xf14fbC6B30e2c4BC05A1D4fbE34bf9f14313309D', 6, 'AKT', 'Akash Network')
export const UCO = new Token(ChainId.MATIC, '0x3C720206bFaCB2d16fA3ac0ed87D2048Dbc401Fc', 18, 'UCO', 'UnirisToken')
export const REGEN = new Token(ChainId.MATIC, '0xEc482De9569a5EA3Dd9779039b79e53F15791fDE', 6, 'REGEN', 'Regen Network')

export const DPI = new Token(ChainId.MATIC, '0x85955046DF4668e1DD369D2DE9f3AEB98DD2A369', 18, 'DPI', 'DefiPulse Index')
export const FTM = new Token(ChainId.MATIC, '0xB85517b87BF64942adf3A0B9E4c71E4Bc5Caa4e5', 18, 'FTM', 'Fantom Token')
export const ELON = new Token(ChainId.MATIC, '0xE0339c80fFDE91F3e20494Df88d4206D86024cdF', 18, 'ELON', 'Dogelon')
export const SHIB = new Token(ChainId.MATIC, '0x6f8a06447Ff6FcF75d803135a7de15CE88C1d4ec', 18, 'SHIB', 'SHIBA INU')
export const DES = new Token(ChainId.MATIC, '0xa062fc09cA6bdeb2f6E3b77E1d4e09C42C964742', 18, 'DES', 'DeSpace Protocol')
export const SNE = new Token(ChainId.MATIC, '0x32934CB16DA43fd661116468c1B225Fc26CF9A8c', 18, 'SNE', 'StrongNodeEdge Token')

export const ICE = new Token(ChainId.MATIC, '0xc6C855AD634dCDAd23e64DA71Ba85b8C51E5aD7c', 18, 'ICE', 'Decentral Games ICE')
export const UFI = new Token(ChainId.MATIC, '0x3c205C8B3e02421Da82064646788c82f7bd753B9', 18, 'UFI', 'PureFi Token')
export const TETU = new Token(ChainId.MATIC, '0x255707B70BF90aa112006E1b07B9AeA6De021424', 18, 'TETU', 'TETU Reward Token')
export const GNS = new Token(ChainId.MATIC, '0xE5417Af564e4bFDA1c483642db72007871397896', 18, 'GNS', 'Gains Network')
export const SCA = new Token(ChainId.MATIC, '0x11a819Beb0AA3327E39f52F90d65Cc9bCA499F33', 18, 'SCA', 'ScaleSwapToken')

export const JPYC = new Token(ChainId.MATIC, '0x6AE7Dfc73E0dDE2aa99ac063DcF7e8A63265108c', 18, 'JPYC', 'JPY Coin')
export const GENESIS = new Token(ChainId.MATIC, '0x51869836681BcE74a514625c856aFb697a013797', 18, 'GENESIS', 'Genesis')
export const LMT = new Token(ChainId.MATIC, '0x873801Ae2ff12d816Db9a7B082F5796BEC64C82C', 18, 'LMT', 'Lympo Market Token')
export const MCRN = new Token(ChainId.MATIC, '0xBA25B552C8A098AFdf276324C32C71fE28e0Ad40', 18, 'MCRN', 'MacaronSwap Token')
export const PNT = new Token(ChainId.MATIC, '0xB6bcae6468760bc0CDFb9C8ef4Ee75C9dd23e1Ed', 18, 'PNT', 'pTokens PNT')
export const PBTC = new Token(ChainId.MATIC, '0xd7ecf95Cf7eF5256990BeAf4ac895cD9e64cb947', 18, 'pBTC', 'pTokens BTC')
export const HBAR = new Token(ChainId.MATIC, '0x1646C835d70F76D9030DF6BaAeec8f65c250353d', 8, 'HBAR', 'HBAR')
export const MM = new Token(ChainId.MATIC, '0x5647Fe4281F8F6F01E84BCE775AD4b828A7b8927', 18, 'MM', 'Million')
export const CHAMPS = new Token(ChainId.MATIC, '0x8f9E8e833A69Aa467E42c46cCA640da84DD4585f', 18, 'CHAMPS', 'NFT Champions')
export const AUMI = new Token(ChainId.MATIC, '0x3eB177A6693eC81d1E170136f8AD02fffBE172a7', 18, 'AUMI', 'AutoMatic')
export const UM = new Token(ChainId.MATIC, '0x3B1A0c9252ee7403093fF55b4a5886d49a3d837a', 18, 'UM', 'Continuum')
export const WSG = new Token(ChainId.MATIC, '0x3C1BB39bb696B443a1D80BB2b3a3d950Ba9DEE87', 18, 'WSG', 'Wall Street Games')
export const DERC = new Token(ChainId.MATIC, '0xB35fcBCF1fD489fCe02Ee146599e893FDCdC60e6', 18, 'DERC', 'DeRace Token')

export const KIRO = new Token(ChainId.MATIC, '0xB382C1cfA622795a534e5bd56Fac93d59BAc8B0D', 18, 'KIRO', 'Kirobo')
export const RNDR = new Token(ChainId.MATIC, '0x61299774020dA444Af134c82fa83E3810b309991', 18, 'RNDR', 'Render Token')

export const WCRO = new Token(ChainId.MATIC, '0xf2D8124b8F9267DaD61351c7aD252362880C6638', 18, 'WCRO', 'Wrapped CRO')
export const PECO = new Token(ChainId.MATIC, '0xA9536B9c75A9E0faE3B56a96AC8EdF76AbC91978', 18, 'PECO', 'Polygon Ecosystem Index')
export const WELT = new Token(ChainId.MATIC, '0x23E8B6A3f6891254988B84Da3738D2bfe5E703b9', 18, 'WELT', 'FABWELT')
export const MASQ = new Token(ChainId.MATIC, '0xEe9A352F6aAc4aF1A5B9f467F6a93E0ffBe9Dd35', 18, 'MASQ', 'MASQ')
export const ELIXIR = new Token(ChainId.MATIC, '0xED0bb69f9F96E8C5FffdF16c468eceC385134eA5', 18, 'ELIXIR', 'Starchi Liquid Luck')
export const ZIG = new Token(ChainId.MATIC, '0x7BeBd226154E865954A87650FAefA8F485d36081', 18, 'ZIG', 'ZigCoin')
export const MANA = new Token(ChainId.MATIC, '0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4', 18, 'MANA', 'Decentraland MANA')

export const GAIA = new Token(ChainId.MATIC, '0x723B17718289A91AF252D616DE2C77944962d122', 18, 'GAIA', 'GAIA Everworld')
export const SAND = new Token(ChainId.MATIC, '0xBbba073C31bF03b8ACf7c28EF0738DeCF3695683', 18, 'SAND', 'SAND')
export const ORARE = new Token(ChainId.MATIC, '0xFF2382Bd52efaceF02Cc895bcBFc4618608AA56F', 18, 'ORARE', 'One Rare Token')
export const MOCA = new Token(ChainId.MATIC, '0xcE899f26928a2B21c6a2Fddd393EF37c61dbA918', 18, 'MOCA', 'Museum of Crypto Art')
export const MTCL = new Token(ChainId.MATIC, '0x3642c3c8eBe0b36a29e37809e1c9A7DE06BC0B26', 18, 'MTCL', 'MaticLaunch')
export const XDG = new Token(ChainId.MATIC, '0xc6480Da81151B2277761024599E8Db2Ad4C388C8', 18, 'xDG', 'Decentral Games Governance')
export const BLANK = new Token(ChainId.MATIC, '0xf4C83080E80AE530d6f8180572cBbf1Ac9D5d435', 18, 'BLANK', 'GoBlank Token')
export const AGEUR = new Token(ChainId.MATIC, '0xE0B52e49357Fd4DAf2c15e02058DCE6BC0057db4', 18, 'agEUR', 'agEUR')
export const GAMER = new Token(ChainId.MATIC, '0x3f6b3595ecF70735D3f48D69b09C4E4506DB3F47', 18, 'GAMER', 'GameStation')

export const TOMB = new Token(ChainId.MATIC, '0x0e98C977B943f06075b2D795794238fBfB9b9a34', 18, 'TOMB', 'TOMB')
export const CLAM2 = new Token(ChainId.MATIC, '0xC250e9987A032ACAC293d838726C511E6E1C029d', 9, 'CLAM', 'Otter Clam')
export const FODL = new Token(ChainId.MATIC, '0x5314bA045a459f63906Aa7C76d9F337DcB7d6995', 18, 'FODL', 'Fodl')
export const POLYPUG = new Token(ChainId.MATIC, '0xF13bfC42bFcc421Db1fD471EC49Bb865Cede7270', 18, 'PolyPug', 'PolyPug')
export const MYST = new Token(ChainId.MATIC, '0x1379E8886A944d2D9d440b3d88DF536Aea08d9F3', 18, 'MYST', 'Mysterium')
export const THX = new Token(ChainId.MATIC, '0x2934b36ca9A4B31E633C5BE670C8C8b28b6aA015', 18, 'THX', 'THX Network')
export const EGG = new Token(ChainId.MATIC, '0x51dE72b17c7bD12E9E6d69eb506a669EB6b5249E', 18, 'EGG', 'Waves Ducks')
export const MSHEESHA = new Token(ChainId.MATIC, '0x88C949b4eB85a90071f2C0beF861BDDEe1a7479D', 18, 'mSHEESHA', 'SHEESHA POLYGON')
export const ORION = new Token(ChainId.MATIC, '0x5E0294Af1732498C77F8dB015a2d52a76298542B', 18, 'ORION', 'Orion Money Token (Wormhole)')
export const WONE = new Token(ChainId.MATIC, '0x80c0CBDB8d0B190238795d376f0bD57fd40525F2', 18, 'WONE', 'Wrapped ONE')
export const STZ = new Token(ChainId.MATIC, '0x2c92a8A41f4b806a6f6F1F7C9D9DEc78DCd8c18e', 18, 'STZ', '99Starz')
export const PSP = new Token(ChainId.MATIC, '0x42d61D766B85431666B39B89C43011f24451bFf6', 18, 'PSP', 'ParaSwap')

export const BCMC = new Token(ChainId.MATIC, '0xc10358f062663448a3489fC258139944534592ac', 18, 'BCMC', 'Blockchain Monster Coin')

export const NACHO = new Token(ChainId.MATIC, '0xcD86152047e800d67BDf00A4c635A8B6C0e5C4c2', 18, 'NACHO', 'NACHO')
export const NSHARE = new Token(ChainId.MATIC, '0x948D0a28b600BDBd77AF4ea30E6F338167034181', 18, 'NSHARE', 'NSHARE')

export const UART = new Token(ChainId.MATIC, '0xf244E91A46A9cdd48da295cA5d0B27894f8032B1', 12, 'UART', 'UniArts Network Token')
export const SFF = new Token(ChainId.MATIC, '0xdf9B4b57865B403e08c85568442f95c26b7896b0', 18, 'SFF', 'Sunflower Farm')

export const MCO2 = new Token(ChainId.MATIC, '0xAa7DbD1598251f856C12f63557A4C4397c253Cea', 18, 'MCO2', 'Moss Carbon Credit')
export const DOGIRA = new Token(ChainId.MATIC, '0xdDa40cdfe4A0090f42Ff49f264A831402ADB801A', 9, 'DOGIRA', 'Dogira')
export const ATLX = new Token(ChainId.MATIC, '0x0b68782eFF3177f1F9240B64A7e2F8E0497e2454', 18, 'ATLX', 'Atlantis')
export const SAFLE = new Token(ChainId.MATIC, '0x04b33078Ea1aEf29bf3fB29c6aB7B200C58ea126', 18, 'SAFLE', 'Safle')
export const MCHC = new Token(ChainId.MATIC, '0xee7666aACAEFaa6efeeF62ea40176d3eB21953B9', 18, 'MCHC', 'MCHCoin')
export const AWX = new Token(ChainId.MATIC, '0x56A0eFEFC9F1FBb54FBd25629Ac2aA764F1b56F7', 18, 'AWX', 'AurusDeFi')
export const AWS = new Token(ChainId.MATIC, '0xA96D47c621a8316d4F9539E3B38180C7067e84CA', 18, 'AWS', 'AurusSILVER')
export const BOOK = new Token(ChainId.MATIC, '0x8192759Bf7f247cC92F74E39B3A4225516624fC1', 8, 'BOOK', 'Bookie')
export const VOXEL = new Token(ChainId.MATIC, '0xd0258a3fD00f38aa8090dfee343f10A9D4d30D3F', 18, 'VOXEL', 'VOXEL Token')
export const KEYFI = new Token(ChainId.MATIC, '0xD1A5f2A049343fc4D5F8d478f734eBa51B22375E', 18, 'KEYFI', 'KeyFi Token')

export const GM = new Token(ChainId.MATIC, '0xE40d881Cf66e1F6D19979A5fF6c830C6Af65D278', 18, 'GM', 'Guild Member Token')
export const CYC = new Token(ChainId.MATIC, '0xcFb54a6D2dA14ABeCD231174FC5735B4436965D8', 18, 'CYC', 'Cyclone Protocol')
export const REQ = new Token(ChainId.MATIC, '0xB25e20De2F2eBb4CfFD4D16a55C7B395e8a94762', 18, 'REQ', 'Request')
export const BIOS = new Token(ChainId.MATIC, '0xe20D2Df5041f8Ed06976846470f727295cDd4D23', 18, 'BIOS', 'BIOS')
export const GOGO = new Token(ChainId.MATIC, '0xdD2AF2E723547088D3846841fbDcC6A8093313d6', 18, 'GOGO', 'GOGOcoin')
export const KLIMA = new Token(ChainId.MATIC, '0x4e78011Ce80ee02d2c3e649Fb657E45898257815', 9, 'KLIMA', 'Klima DAO')
export const FOURINT = new Token(ChainId.MATIC, '0x5CEeBB0947d58Fabde2fc026Ffe4B33ccFE1bA8B', 9, '4INT', '4INT')
export const BICO = new Token(ChainId.MATIC, '0x91c89A94567980f0e9723b487b0beD586eE96aa7', 18, 'BICO', 'Biconomy Token')
export const MV = new Token(ChainId.MATIC, '0xA3c322Ad15218fBFAEd26bA7f616249f7705D945', 18, 'MV', 'Metaverse')
export const SOFI = new Token(ChainId.MATIC, '0x7cb810ecBFd6125E65f451cFBd8Ae657dFFDd6b4', 18, 'SOFI', 'Rai.Finance')

export const CXADA = new Token(ChainId.MATIC, '0x64875Aaa68d1d5521666C67d692Ee0B926b08b2F', 18, 'cxADA', 'CelsiusX Wrapped ADA')
export const CXDOGE = new Token(ChainId.MATIC, '0x9Bd9aD490dD3a52f096D229af4483b94D63BE618', 18, 'cxDOGE', 'CelsiusX Wrapped DOGE')
export const CXETH = new Token(ChainId.MATIC, '0xfe4546feFe124F30788c4Cc1BB9AA6907A7987F9', 18, 'cxETH', 'CelsiusX Wrapped ETH')
export const MILK = new Token(ChainId.MATIC, '0x1599fE55Cda767b1F631ee7D414b41F5d6dE393d', 18, 'MILK', 'Milk')


export const TRACE = new Token(ChainId.MATIC, '0x4287F07CBE6954f9F0DecD91d0705C926d8d03A4', 18, 'TRACE', 'Trace Network')
export const DLYCOP = new Token(ChainId.MATIC, '0x1659fFb2d40DfB1671Ac226A0D9Dcc95A774521A', 18, 'DLYCOP', 'Daily COP')
export const TOWER = new Token(ChainId.MATIC, '0x2bC07124D8dAc638E290f401046Ad584546BC47b', 18, 'TOWER', 'TOWER')
export const WRLD = new Token(ChainId.MATIC, '0xD5d86FC8d5C0Ea1aC1Ac5Dfab6E529c9967a45E9', 18, 'WRLD', 'NFT Worlds')
export const WMETIS = new Token(ChainId.MATIC, '0xA863246658DEA34111C3C1DceDb2cfd5d6067334', 18, 'WMETIS', 'Wrapped METIS')
export const VOLT = new Token(ChainId.MATIC, '0xE8A05E85883F9663b18a38d7aa89853deaba56e3', 18, 'VOLT', 'VOLTAGE')
export const COT = new Token(ChainId.MATIC, '0x8d520c8E66091cfD6743fe37Fbe3A09505616C4b', 18, 'COT', 'CosplayToken')
export const XGEM = new Token(ChainId.MATIC, '0x02649C1Ff4296038De4b9bA8F491b42b940A8252', 18, 'XGEM', 'Exchange Genesis Ethlas Medium')

export const FANCY = new Token(ChainId.MATIC, '0x7f280daC515121DcdA3EaC69eB4C13a52392CACE', 18, 'FANCY', 'Fancy Games')
export const ETH2X = new Token(ChainId.MATIC, '0x3Ad707dA309f3845cd602059901E39C4dcd66473', 18, 'ETH2x-FLI-P', 'ETH 2x Flexible Leverage Index')
export const FUSE = new Token(ChainId.MATIC, '0xF915fDDa4c882731C0456a4214548Cd13A822886', 18, 'FUSE', 'Fuse')
export const ARTH = new Token(ChainId.MATIC, '0xE52509181FEb30EB4979E29EC70D50FD5C44D590', 18, 'ARTH', 'ARTH Valuecoin')
export const UND = new Token(ChainId.MATIC, '0x1eBA4B44C4F8cc2695347C6a78F0B7a002d26413', 18, 'UND', 'Unbound Dollar')
export const LUNA = new Token(ChainId.MATIC, '0x9cd6746665D9557e1B9a775819625711d0693439', 18, 'LUNA', 'LUNA (Wormhole)')

export const IXT = new Token(ChainId.MATIC, '0xE06Bd4F5aAc8D0aA337D13eC88dB6defC6eAEefE', 18, 'IXT', 'PlanetIX')
export const PENT = new Token(ChainId.MATIC, '0x283366bb42ef49a994913BAF22263c6562e588a4', 18, 'PENT', 'PENT')
export const BANANA = new Token(ChainId.MATIC, '0xbC91347e80886453F3f8bBd6d7aC07C122D87735', 18, 'BANANA', 'Banana')
export const SPHERE = new Token(ChainId.MATIC, '0x8D546026012bF75073d8A586f24A5d5ff75b9716', 18, 'SPHERE', 'Sphere Finance')


export const ATK = new Token(ChainId.MATIC, '0xF868939Ee81F04f463010BC52EAb91c0839eF08c', 18, 'ATK', 'Attack')
export const FIN = new Token(ChainId.MATIC, '0x576c990A8a3E7217122e9973b2230A3be9678E94', 18, 'FIN', 'DeFiner')
export const NITRO = new Token(ChainId.MATIC, '0x695FC8B80F344411F34bDbCb4E621aA69AdA384b', 18, 'NITRO', 'Nitro')
export const MODA = new Token(ChainId.MATIC, '0x5E430F88D1BE82EB3eF92b6fF06125168fD5DCf2', 18, 'MODA', 'moda')

export const STMATIC = new Token(ChainId.MATIC, '0x3A58a54C066FdC0f2D55FC9C89F0415C92eBf3C4', 18, 'stMATIC', 'Staked MATIC')
export const SPROCKET = new Token(ChainId.MATIC, '0x0D98EAe620491d8f6836a39Ac45E54b286FDd2d7', 18, 'SPROCKET', 'Sprocket')
export const NEAR = new Token(ChainId.MATIC, '0x72bd80445b0db58ebe3E8dB056529D4C5FAF6F2f', 18, 'NEAR', 'NEAR')
export const FOMO = new Token(ChainId.MATIC, '0x44A6e0BE76e1D9620A7F76588e4509fE4fa8E8C8', 18, 'FOMO', 'Aavegotchi FOMO')
export const FUD = new Token(ChainId.MATIC, '0x403E967b044d4Be25170310157cB1A4Bf10bdD0f', 18, 'FUD', 'Aavegotchi FUD')
export const ALPHA = new Token(ChainId.MATIC, '0x6a3E7C3c6EF65Ee26975b12293cA1AAD7e1dAeD2', 18, 'ALPHA', 'Aavegotchi ALPHA')
export const QUIDD = new Token(ChainId.MATIC, '0x123706cDD8e60324e610E9A2CC7012D0F45A5b8E', 18, 'QUIDD', 'QUIDD')
export const PDDOLLAR = new Token(ChainId.MATIC, '0x146e58D34EaB0bFf7e0a63cfe9332908d680c667', 18, 'PDDOLLAR', 'pddollar')
export const KEK = new Token(ChainId.MATIC, '0x42E5E06EF5b90Fe15F853F59299Fc96259209c5C', 18, 'KEK', 'Aavegotchi KEK')
export const LDO = new Token(ChainId.MATIC, '0xC3C7d422809852031b44ab29EEC9F1EfF2A58756', 18, 'LDO', 'Lido DAO Token')

export const TRY = new Token(ChainId.MATIC, '0xEFeE2de82343BE622Dcb4E545f75a3b9f50c272D', 18, 'TRY', 'TryHards')
export const PDSHARE = new Token(ChainId.MATIC, '0x3068382885602FC0089aeC774944b5ad6123ae60', 18, 'PDSHARE', 'PDSHARE')
export const SD = new Token(ChainId.MATIC, '0x1d734A02eF1e1f5886e66b0673b71Af5B53ffA94', 18, 'SD', 'Stader')
export const MATICX = new Token(ChainId.MATIC, '0xfa68FB4628DFF1028CFEc22b4162FCcd0d45efb6', 18, 'MaticX', 'Liquid Staking Matic')
export const ACRE = new Token(ChainId.MATIC, '0x011734f6Ed20E8D011d85Cf7894814B897420acf', 18, 'ACRE', 'Arable Protocol')
export const GOO = new Token(ChainId.MATIC, '0x6F3Cc27E17a0f2e52D8e7693FF0d892Cea1854bF', 9, 'GOO', 'Goo')
export const NSFW = new Token(ChainId.MATIC, '0x8f006D1e1D9dC6C98996F50a4c810F17a47fBF19', 18, 'NSFW', 'Pleasure Coin')
export const QUICKNEW = new Token(ChainId.MATIC, '0xB5C064F955D8e7F38fE0460C556a72987494eE17', 18, 'QUICK(NEW)', 'QuickSwap(NEW)')

export const PS1 = new Token(ChainId.MATIC, '0x32Cd1BCB75473845b5d1dB6ecE60AEC6E41d8518', 18, 'PS1', 'PolysportsToken')
export const EMT = new Token(ChainId.MATIC, '0x3fB256CFefedb6A54De7465c0EE86dC574AE464D', 18, 'EMT', 'Emanate')
export const LCD = new Token(ChainId.MATIC, '0xc2A45FE7d40bCAc8369371B08419DDAFd3131b4a', 18, 'LCD', 'Lucidao')

export const CXBTC = new Token(ChainId.MATIC, '0xD30DC92b8ec0fa8de625768d208f51A93C10aFF2', 18, 'cxBTC', 'CelsiusX Wrapped BTC')
export const BETS = new Token(ChainId.MATIC, '0x9246a5F10A79a5a939b0C2a75A3AD196aAfDB43b', 18, 'BETS', 'BetSwirl Token')
export const CVOL = new Token(ChainId.MATIC, '0x9CD552551EC130b50c1421649C8d11E76aC821e1', 18, 'CVOL', 'Crypto Volatility Token')

export const USDD = new Token(ChainId.MATIC, '0xFFA4D863C96e743A2e1513824EA006B8D0353C57', 18, 'USDD', 'Decentralized USD')
export const TUSD = new Token(ChainId.MATIC, '0x2e1AD108fF1D8C782fcBbB89AAd783aC49586756', 18, 'TUSD', 'TrueUSD')
export const PAE = new Token(ChainId.MATIC, '0x8063037ea50E4a066bF1430EA1E3e609CD5cEf6B', 18, 'PAE', 'Ripae')
export const PMATIC = new Token(ChainId.MATIC, '0xA0dF47432d9d88bcc040E9ee66dDC7E17A882715', 18, 'pMATIC', 'pMATIC')
export const GLTR = new Token(ChainId.MATIC, '0x3801C3B3B5c98F88a9c9005966AA96aa440B9Afc', 18, 'GLTR', 'GAX Liquidity Token Reward')

export const LunaFi = new Token(ChainId.MATIC, '0xCa7BF3C514d412AC12D10Eff302301A81153F557', 18, 'LFI', 'LunaFi')
export const USDPLUS = new Token(ChainId.MATIC, '0x236eeC6359fb44CCe8f97E99387aa7F8cd5cdE1f', 6, 'USD+', 'USD+')

export const RVLT = new Token(ChainId.MATIC, '0xf0f9D895aCa5c8678f706FB8216fa22957685A13', 18, 'RVLT', 'Revolt 2 Earn')
export const PAXG = new Token(ChainId.MATIC, '0x553d3D295e0f695B9228246232eDF400ed3560B5', 18, 'PAXG', 'Paxos Gold')
export const ALGB = new Token(ChainId.MATIC, '0x0169eC1f8f639B32Eec6D923e24C2A2ff45B9DD6', 18, 'ALGB', 'Algebra')
export const SFL = new Token(ChainId.MATIC, '0xD1f9c58e33933a993A3891F8acFe05a68E1afC05', 18, 'SFL', 'Sunflower Land')


//export const TT = new Token(ChainId.MATIC, '0x16887befea6772175240a8b3aa797c460f80a08e', 18, 'TT', 'Test Token')
export const MATIC = WETH[ChainId.MATIC];
// TODO this is only approximate, it's actually based on blocks
export const PROPOSAL_LENGTH_IN_DAYS = 7

export const GOVERNANCE_ADDRESS = '0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F'//TODO: MATIC

export const UNI: { [chainId in ChainId]: Token } = {
  [ChainId.MATIC]: new Token(ChainId.MATIC, QUICK_ADDRESS, 18, 'QUICK', 'Quickswap'),
  [ChainId.MUMBAI]: new Token(ChainId.MUMBAI, QUICK_ADDRESS_MUMBAI, 18, 'QUICK', 'Quickswap')
}

// TODO: specify merkle distributor for mainnet
export const ROUTER_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.MATIC]: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
  [ChainId.MUMBAI]: '0x4F9E902BB622D4920C0101D4c227BE53213a1A9f'
}

// TODO: specify merkle distributor for mainnet
export const MERKLE_DISTRIBUTOR_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.MATIC]: '0x4087F566796b46eEB01A38174c06E2f9924eAea8'
}

const WETH_ONLY: ChainTokenList = {
  
  [ChainId.MUMBAI]: [WETH[ChainId.MUMBAI]],
  [ChainId.MATIC]: [WETH[ChainId.MATIC]]
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MATIC]: [...WETH_ONLY[ChainId.MATIC], USDC, USDT, QUICK, ETHER, WBTC, DAI, MI, CXETH, GHST]
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MATIC]: [...WETH_ONLY[ChainId.MATIC], DAI, USDC, USDT, QUICK, ETHER, WBTC, SAND, MI]
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MATIC]: [...WETH_ONLY[ChainId.MATIC],DAI, USDC, USDT, QUICK, ETHER, WBTC]
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MATIC]: [
    
    [USDC, USDT],
    [USDC, DAI],
    [ETHER, USDC],
    [WBTC, ETHER],
    [WETH[ChainId.MATIC], USDT],
    [WETH[ChainId.MATIC], USDC],
    [WETH[ChainId.MATIC], ETHER],
    [ETHER, QUICK]
  ]
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  WALLET_LINK: {
    connector: walletlink,
    name: 'Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5'
  },
  BITSKI: {
    connector: bitski,
    name: 'Bitski',
    iconName: 'bitski.svg',
    description: 'Bitski Wallet.',
    href: null,
    color: '#E8831D'
  },
  BITKEEP: {
    connector: injected,
    name: 'BitKeep',
    iconName: 'bitkeep.png',
    description: 'BitKeep browser extension.',
    href: null,
    color: '#E8831D'
  },
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true
  },
  
  SAFE_APP: {
    connector: safeApp,
    name: 'Gnosis Safe App',
    iconName: 'gnosis_safe.png',
    description: 'Login using gnosis safe app',
    href: null,
    color: '#4196FC',
    mobile: true
  },
  ARKANE_CONNECT: {
    connector: arkaneconnect,
    name: 'Venly',
    iconName: 'venly.svg',
    description: 'Login using Venly hosted wallet.',
    href: null,
    color: '#4196FC',
  },
  Portis: {
    connector: portis,
    name: 'Portis',
    iconName: 'portisIcon.png',
    description: 'Login using Portis hosted wallet',
    href: null,
    color: '#4A6C9B',
    mobile: true
  },
  
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconName: 'walletConnectIcon.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true
  }
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

export const BIG_INT_ZERO = JSBI.BigInt(0)

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
export const BETTER_TRADE_LINK_THRESHOLD = new Percent(JSBI.BigInt(75), JSBI.BigInt(10000))

// the Uniswap Default token list lives here
export const DEFAULT_TOKEN_LIST_URL = 'https://unpkg.com/quickswap-default-token-list@latest/build/quickswap-default.tokenlist.json'
