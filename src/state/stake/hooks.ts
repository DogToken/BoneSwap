import { ChainId, CurrencyAmount, JSBI, Token, TokenAmount, Pair } from '@uniswap/sdk'
import { useMemo, useEffect/** , useState */ } from 'react'
import { usePair } from '../../data/Reserves'

import { client, healthClient } from '../../apollo/client'
import {
  GLOBAL_DATA,
  PAIRS_BULK,
  PAIRS_HISTORICAL_BULK,
  SUBGRAPH_HEALTH
} from '../../apollo/queries'
import { 
  UNI,
  USDC,
  ETHER,
  QUICK,
  MATIC,
  LAIR_ADDRESS,
  DQUICK,
  TEL,
  DERC,
  WSG,
  PDDOLLAR,
  QUIDD,
  FIN,
  QUICKNEW,
  LCD,
  TUSD,
  PAE,
  XBONE} from '../../constants'
import { STAKING_REWARDS_INTERFACE, STAKING_DUAL_REWARDS_INTERFACE } from '../../constants/abis/staking-rewards'
import { useActiveWeb3React } from '../../hooks'
import { NEVER_RELOAD, useMultipleContractSingleData, useSingleCallResult, useSingleContractMultipleData } from '../multicall/hooks'
import { tryParseAmount } from '../swap/hooks'
import Web3 from 'web3';
import { useLairContract, useQUICKContract } from '../../hooks/useContract'
import useUSDCPrice from '../../utils/useUSDCPrice'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import { AppState } from '..'
import { getBlockFromTimestamp } from '../../utils'

dayjs.extend(utc);

const web3 = new Web3("https://polygon-rpc.com/");

export const STAKING_GENESIS = 1714250884;

export const REWARDS_DURATION_DAYS = 7;

var pairs:any = undefined;

var dualPairs:any = undefined;

export const SYRUP_REWARDS_INFO: {
  [chainId in ChainId]?: {
    token: Token
    stakingRewardAddress: string
    ended: boolean
    name: string
    lp: string
    baseToken: Token
    rate: Number
    ending: Number //DATE IN UNIX TIMESTAMP
    stakingToken: Token
  }[]
} = {
  [ChainId.MATIC]: [
    {
      token: PAE,
      stakingRewardAddress: '0x7b9B6F2bf9A0472761A65BACFDA97Ef3B87B170b',
      ended: false,
      lp: '',
      name: '',
      baseToken: MATIC,
      rate: 58.89,
      ending: 1664237536,
      stakingToken: QUICKNEW
    },
    {
      token: TEL,
      stakingRewardAddress: '0xbaef1B35798bA6C2FA95d340dc6aAf284BBe2EEe',
      ended: true,
      lp: '',
      name: '',
      baseToken: ETHER,
      rate: 222222.22,
      ending: 1661995203,
      stakingToken: QUICKNEW
    }
]
}

export const OLD_SYRUP_REWARDS_INFO: {
  [chainId in ChainId]?: {
    token: Token
    stakingRewardAddress: string
    ended: boolean
    name: string
    lp: string
    baseToken: Token
    rate: Number
    ending: Number //DATE IN UNIX TIMESTAMP
    stakingToken: Token
  }[]
} = {
  [ChainId.MATIC]: [
    {
      token: QUICK,
      stakingRewardAddress: '0xD479406F55C4B2C3976C5EC1a41347CA6Ac90128',
      ended: false,
      lp: '0xDf33126f2906013e79F58b250AD719b072ac2738',
      name: 'xBONE',
      baseToken: XBONE,
      rate: 25,
      ending: 1722108689,
      stakingToken: XBONE
    },  
    {
      token: DERC,
      stakingRewardAddress: '0x09ecE0A8fF76AEa30d82480E8a89ec9fEeca9B0F',
      ended: true,
      lp: '',
      name: '',
      baseToken: USDC,
      rate: 988.89,
      ending: 1654558436,
      stakingToken: QUICK
    }
]
}

var oneDayVol:any = undefined;

export const STAKING_DUAL_REWARDS_INFO: {
  [chainId in ChainId]?: {
    tokens: [Token, Token]
    stakingRewardAddress: string
    ended: boolean
    name: string
    lp: string
    baseToken: Token
    rewardTokenA: Token
    rewardTokenB: Token
    rewardTokenBBase: Token
    rateA: Number
    rateB: Number
    pair: string
  }[]
} = {
  [ChainId.MATIC]: [
    {
      tokens: [LCD,MATIC],
      stakingRewardAddress: '0xaCBD412b649b55d0F3f7565293492637DE7c53Cb',
      ended: false,
      lp: '',
      name: '',
      baseToken: MATIC,
      rewardTokenBBase: MATIC,
      rewardTokenA: DQUICK,
      rewardTokenB: LCD,
      rateA: 1.98,
      rateB: 80000,
      pair: '0xaab5254e17380511887aaba7e96a5339a519e26a'
    },
    {
      tokens: [TUSD,USDC],
      stakingRewardAddress: '0x1661C61b66A2A2C54970F271f2B86556cdf18B97',
      ended: false,
      lp: '',
      name: '',
      baseToken: USDC,
      rewardTokenBBase: USDC,
      rewardTokenA: DQUICK,
      rewardTokenB: TUSD,
      rateA: 7.92,
      rateB: 833,
      pair: '0x17a7829cc1167ecda8b9668414a5405050846f8a'
    }
  ]
}
// TODO add staking rewards addresses here
export const STAKING_REWARDS_INFO: {
  [chainId in ChainId]?: {
    tokens: [Token, Token]
    stakingRewardAddress: string
    ended: boolean
    name: string
    lp: string
    baseToken: Token
    rate: Number
    pair: string
  }[]
} = {
  [ChainId.MATIC]: [{
    tokens: [ ETHER, USDC ],
    stakingRewardAddress: '0xbB703E95348424FF9e94fbE4FB524f6d280331B8',
    ended: false,
    lp: '',
    name: '',
    baseToken: USDC,
    rate: 24.96,
    pair: '0x853ee4b2a13f8a742d64c8f088be7ba2131f670d'
  }
]
}

export const OLD_STAKING_REWARDS_INFO: {
  [chainId in ChainId]?: {
    tokens: [Token, Token]
    stakingRewardAddress: string
    ended: boolean
    name: string
    lp: string
    baseToken: Token
    rate: Number
    pair: string
  }[]
} = {
  [ChainId.MATIC]: [
    {
      tokens: [ MATIC, QUIDD ],
      stakingRewardAddress: '0x3E3eB91c928734fbab0AC41cA40C118F25ab28a7',
      ended: true,
      lp: '',
      name: '',
      baseToken: MATIC,
      rate: 0,
      pair: '0xADBd183ff04FF3dc9cd980F07b308c25dF77E860'
    },
    {
      tokens: [ MATIC, PDDOLLAR ],
      stakingRewardAddress: '0x1bd082eC458Cf2EB4a2918C5de3b4b6cc655e977',
      ended: true,
      lp: '',
      name: '',
      baseToken: MATIC,
      rate: 0,
      pair: '0xEBcA34c9Fc0be6a37dEAF62DDd064941f53Ed246'
    }
  ]
}

export const VERY_OLD_STAKING_REWARDS_INFO: {
  [chainId in ChainId]?: {
    tokens: [Token, Token]
    stakingRewardAddress: string
    ended: boolean
    name: string
    lp: string
    baseToken: Token
    rate: Number
    pair: string
  }[]
} = {
  [ChainId.MATIC]: [//TODO: MATIC
  {
    tokens: [ MATIC, FIN ],
    stakingRewardAddress: '0xe5eB096d43BD4f3cfabbbcCA37c29038A1AF5e3A',
    ended: true,
    lp: '',
    name: '',
    baseToken: MATIC,
    rate: 0,
    pair: '0xB5a458A583Ff7c9FEc0EcECc4Eea8ca8B8A12C76'
  },
  {
    tokens: [ ETHER, WSG ],
    stakingRewardAddress: '0x102aBFc497ecC62E9491e7AdC4A3321cf9E08B77',
    ended: true,
    lp: '',
    name: '',
    baseToken: ETHER,
    rate: 0,
    pair: '0xCCB65f861266EF7dEF8bF35D4247e3ffA03563c7'
  }
]
}

export interface LairInfo {
  lairAddress: string

  dQUICKtoQUICK: TokenAmount

  QUICKtodQUICK: TokenAmount

  dQUICKBalance: TokenAmount

  QUICKBalance: TokenAmount

  totalQuickBalance: TokenAmount

  quickPrice: Number

  dQuickTotalSupply: TokenAmount

  oneDayVol: Number
}

export interface StakingInfo {
  // the address of the reward contract
  stakingRewardAddress: string
  // the tokens involved in this pair
  tokens: [Token, Token]
  // the amount of token currently staked, or undefined if no account
  stakedAmount: TokenAmount
  // the amount of reward token earned by the active account, or undefined if no account
  earnedAmount: TokenAmount
  // the total amount of token staked in the contract
  totalStakedAmount: TokenAmount
  // the amount of token distributed per second to all LPs, constant
  totalRewardRate: TokenAmount
  // the current amount of token distributed to the active account per second.
  // equivalent to percent of total supply * reward rate
  rewardRate: TokenAmount
  // when the period ends
  periodFinish: Date | undefined

  ended: boolean

  name: string

  lp: string

  baseToken: Token

  pair: string

  quickPrice: Number

  rate: Number

  oneYearFeeAPY: Number

  oneDayFee: Number

  accountFee: Number
  dQuickToQuick: Number
  // calculates a hypothetical amount of token distributed to the active account per second.
  getHypotheticalRewardRate: (
    stakedAmount: TokenAmount,
    totalStakedAmount: TokenAmount,
    totalRewardRate: TokenAmount
  ) => TokenAmount
}

export interface DualStakingInfo {
  // the address of the reward contract
  stakingRewardAddress: string
  // the tokens involved in this pair
  tokens: [Token, Token]

  rewardTokenA: Token,
  rewardTokenB: Token,
  rewardTokenBBase: Token,
  // the amount of token currently staked, or undefined if no account
  stakedAmount: TokenAmount
  // the amount of reward token earned by the active account, or undefined if no account
  earnedAmountA: TokenAmount
  earnedAmountB: TokenAmount
  // the total amount of token staked in the contract
  totalStakedAmount: TokenAmount
  // the amount of token distributed per second to all LPs, constant
  totalRewardRateA: TokenAmount
  totalRewardRateB: TokenAmount
  // the current amount of token distributed to the active account per second.
  // equivalent to percent of total supply * reward rate
  rewardRateA: TokenAmount
  rewardRateB: TokenAmount
  // when the period ends
  periodFinish: Date | undefined

  ended: boolean

  name: string

  lp: string

  baseToken: Token

  pair: string

  quickPrice: Number
  maticPrice: Number
  ethPrice: Number

  rateA: Number
  rateB: Number

  oneYearFeeAPY: Number

  oneDayFee: Number

  accountFee: Number
  dQuickToQuick: Number
  // calculates a hypothetical amount of token distributed to the active account per second.
  getHypotheticalRewardRate: (
    stakedAmount: TokenAmount,
    totalStakedAmount: TokenAmount,
    totalRewardRate: TokenAmount
  ) => TokenAmount
}

export interface SyrupInfo {
  // the address of the reward contract
  stakingRewardAddress: string
  // the reward token involved in this staking
  token: Token
  //staking token
  stakingToken: Token
  // the amount of token currently staked, or undefined if no account
  stakedAmount: TokenAmount
  // the amount of reward token earned by the active account, or undefined if no account
  earnedAmount: TokenAmount
  // the total amount of token staked in the contract
  totalStakedAmount: TokenAmount
  // the amount of token distributed per second to all stakers, constant
  totalRewardRate: TokenAmount
  // the current amount of token distributed to the active account per second.
  // equivalent to percent of total supply * reward rate
  rewardRate: TokenAmount
  // when the period ends
  periodFinish: Number

  ended: boolean

  name: string

  lp: string

  baseToken: Token

  quickPrice: Number

  rate: Number

  dQUICKtoQUICK: TokenAmount

  dQuickTotalSupply: TokenAmount

  oneDayVol: Number

  valueOfTotalStakedAmountInUSDC: Number

  valueOfMyStakedAmountInUSDC: Number
  

  // calculates a hypothetical amount of token distributed to the active account per second.
  getHypotheticalRewardRate: (
    stakedAmount: TokenAmount,
    totalStakedAmount: TokenAmount,
    totalRewardRate: TokenAmount
  ) => TokenAmount
}

export function useSyrupInfo(tokenToFilterBy?: Token | null): SyrupInfo[] {
  const { chainId, account } = useActiveWeb3React()
  //const [quickPrice,setQuickPrice] = useState(0);
  const [, quickUsdcPair] = usePair(QUICK, USDC);
  const quickPrice = Number(quickUsdcPair?.priceOf(QUICK)?.toSignificant(6))
  const info = useMemo(
    () =>
      chainId
        ? SYRUP_REWARDS_INFO[chainId]?.filter(stakingRewardInfo =>
          tokenToFilterBy === undefined
              ? true
              : tokenToFilterBy === null
              ? true
              : tokenToFilterBy.equals(stakingRewardInfo.token) &&
              tokenToFilterBy.equals(stakingRewardInfo.token)
          ) ?? []
        : [],
    [chainId, tokenToFilterBy]
  )

  const uni = chainId ? UNI[chainId] : undefined

  const rewardsAddresses = useMemo(() => info.map(({ stakingRewardAddress }) => stakingRewardAddress), [info])
  
  const accountArg = useMemo(() => [account ?? undefined], [account])
  const lair = useLairContract()

  const inputs = ['1000000000000000000']
  const USDPrice = useUSDCPrice(QUICK)

   
  // get all the info from the staking rewards contracts
  const balances = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'balanceOf', accountArg)
  const earnedAmounts = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'earned', accountArg)
  const totalSupplies = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'totalSupply')
  const dQuickToQuick = useSingleCallResult(lair, 'dQUICKForQUICK', inputs);
  const _dQuickTotalSupply = useSingleCallResult(lair, 'totalSupply', []);

  const periodFinishes = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'periodFinish',
    undefined,
    NEVER_RELOAD
  )
  const rewardRates = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'rewardRate',
    undefined,
    NEVER_RELOAD
  )

  useEffect(() => {
 
    getOneDayVolume().then((data)=>{
      console.log(data);
    })
  }, [])

  return useMemo(() => {
    if (!chainId || !uni) return []

    return rewardsAddresses.reduce<SyrupInfo[]>((memo, rewardsAddress, index) => {
      // these two are dependent on account
      const balanceState = balances[index]
      const earnedAmountState = earnedAmounts[index]

      // these get fetched regardless of account
      const totalSupplyState = totalSupplies[index]
      const rewardRateState = rewardRates[index]
      const periodFinishState = periodFinishes[index]

      if (
        // these may be undefined if not logged in
        !dQuickToQuick?.loading &&
        !balanceState?.loading &&
        !earnedAmountState?.loading &&
        // always need these
        totalSupplyState &&
        !totalSupplyState.loading &&
        rewardRateState &&
        !rewardRateState.loading &&
        periodFinishState &&
        !periodFinishState.loading
      ) {
        if (
          dQuickToQuick?.error ||
          balanceState?.error ||
          earnedAmountState?.error ||
          totalSupplyState.error ||
          rewardRateState.error ||
          periodFinishState.error
        ) {
          console.error('Failed to load syrup rewards info')
          return memo
        }
        // get the LP token
        const token = info[index].token

        // check for account, if no account set to 0
        const lp = info[index].lp;
        // @ts-ignore
        const rate = web3.utils.toWei(info[index].rate.toString());
        const stakedAmount = new TokenAmount(lp && lp !== '' ? new Token(137, lp, 18, "SLP", "Staked LP") : info[index].stakingToken, JSBI.BigInt(balanceState?.result?.[0] ?? 0))
        const totalStakedAmount = new TokenAmount(lp && lp !== '' ? new Token(137, lp, 18, "SLP", "Staked LP") : info[index].stakingToken, JSBI.BigInt(totalSupplyState.result?.[0]))
        const totalRewardRate = new TokenAmount(token, JSBI.BigInt(rate))
        //const pair = info[index].pair.toLowerCase();
        //@ts-ignore
        //const fees = (pairData && pairData[pair] ? pairData[pair].oneDayVolumeUSD * 0.0025: 0);
        const totalRewardRate01 = new TokenAmount(token, JSBI.BigInt(rewardRateState.result?.[0]))
        const getHypotheticalRewardRate = (
          stakedAmount: TokenAmount,
          totalStakedAmount: TokenAmount,
          totalRewardRate: TokenAmount
        ): TokenAmount => {
          return new TokenAmount(
            token,
            JSBI.greaterThan(totalStakedAmount.raw, JSBI.BigInt(0))
              ? JSBI.divide(JSBI.multiply(totalRewardRate01.raw, stakedAmount.raw), totalStakedAmount.raw)
              : JSBI.BigInt(0)
          )
        }

        const individualRewardRate = getHypotheticalRewardRate(stakedAmount, totalStakedAmount, totalRewardRate01)

        const periodFinishMs = info[index].ending
        const dQUICKtoQUICK = new TokenAmount(QUICK, JSBI.BigInt(dQuickToQuick?.result?.[0] ?? 0))

        

        //@ts-ignore
        let valueOfTotalStakedAmountInUSDC = 0;
        let valueOfMyStakedAmountInUSDC = 0;
        
        if (info[index].stakingToken.equals(QUICKNEW)) {
          //@ts-ignore
          valueOfTotalStakedAmountInUSDC = totalStakedAmount.toSignificant(6) * USDPrice?.toSignificant(6) / 1000
          //@ts-ignore
          valueOfMyStakedAmountInUSDC = stakedAmount.toSignificant(6) * USDPrice?.toSignificant(6) /1000
        }

        else if (info[index].stakingToken.equals(QUICK)) {
          //@ts-ignore
          valueOfTotalStakedAmountInUSDC = totalStakedAmount.toSignificant(6) * USDPrice?.toSignificant(6)
          //@ts-ignore
          valueOfMyStakedAmountInUSDC = stakedAmount.toSignificant(6) * USDPrice?.toSignificant(6)
        }
        else {
          //@ts-ignore
          valueOfTotalStakedAmountInUSDC = totalStakedAmount.toSignificant(6) * dQUICKtoQUICK.toSignificant(6) * USDPrice?.toSignificant(6)

          //@ts-ignore
          valueOfMyStakedAmountInUSDC = stakedAmount.toSignificant(6) * dQUICKtoQUICK.toSignificant(6) * USDPrice?.toSignificant(6)

        }
  
        memo.push({
          stakingRewardAddress: rewardsAddress,
          token: info[index].token,
          ended: info[index].ended,
          name: info[index].name,
          lp: info[index].lp,
          periodFinish: periodFinishMs,
          earnedAmount: new TokenAmount(token, JSBI.BigInt(earnedAmountState?.result?.[0] ?? 0)),
          rewardRate: individualRewardRate,
          totalRewardRate: totalRewardRate,
          stakedAmount: stakedAmount,
          totalStakedAmount: totalStakedAmount,
          getHypotheticalRewardRate,
          baseToken: info[index].baseToken,
          quickPrice: quickPrice,
          rate: info[index].rate,
          dQUICKtoQUICK: dQUICKtoQUICK,
          dQuickTotalSupply: new TokenAmount(DQUICK, JSBI.BigInt(_dQuickTotalSupply?.result?.[0] ?? 0)),
          valueOfTotalStakedAmountInUSDC: valueOfTotalStakedAmountInUSDC,
          valueOfMyStakedAmountInUSDC :valueOfMyStakedAmountInUSDC,
          oneDayVol: oneDayVol,
          stakingToken: info[index].stakingToken
        })
      }
      return memo
    }, [])
  }, [balances, chainId, earnedAmounts, info, periodFinishes, rewardsAddresses, totalSupplies, uni, dQuickToQuick, USDPrice, _dQuickTotalSupply, quickPrice, rewardRates])
}

export function useOldSyrupInfo(tokenToFilterBy?: Token | null): SyrupInfo[] {
  const { chainId, account } = useActiveWeb3React()
  //const [quickPrice,setQuickPrice] = useState(0);
  const [, quickUsdcPair] = usePair(QUICK, USDC);
  const quickPrice = Number(quickUsdcPair?.priceOf(QUICK)?.toSignificant(6))
  const info = useMemo(
    () =>
      chainId
        ? OLD_SYRUP_REWARDS_INFO[chainId]?.filter(stakingRewardInfo =>
          tokenToFilterBy === undefined
              ? true
              : tokenToFilterBy === null
              ? true
              : tokenToFilterBy.equals(stakingRewardInfo.token) &&
              tokenToFilterBy.equals(stakingRewardInfo.token)
          ) ?? []
        : [],
    [chainId, tokenToFilterBy]
  )

  const uni = chainId ? UNI[chainId] : undefined

  const rewardsAddresses = useMemo(() => info.map(({ stakingRewardAddress }) => stakingRewardAddress), [info])
  
  const accountArg = useMemo(() => [account ?? undefined], [account])

  const USDPrice = useUSDCPrice(QUICK)
   
  // get all the info from the staking rewards contracts
  const balances = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'balanceOf', accountArg)
  const earnedAmounts = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'earned', accountArg)
  const totalSupplies = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'totalSupply')

  const periodFinishes = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'periodFinish',
    undefined,
    NEVER_RELOAD
  )
  const rewardRates = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'rewardRate',
    undefined,
    NEVER_RELOAD
  )

  return useMemo(() => {
    if (!chainId || !uni) return []

    return rewardsAddresses.reduce<SyrupInfo[]>((memo, rewardsAddress, index) => {
      // these two are dependent on account
      const balanceState = balances[index]
      const earnedAmountState = earnedAmounts[index]

      // these get fetched regardless of account
      const totalSupplyState = totalSupplies[index]
      const rewardRateState = rewardRates[index]
      const periodFinishState = periodFinishes[index]

      if (
        // these may be undefined if not logged in
        !balanceState?.loading &&
        !earnedAmountState?.loading &&
        // always need these
        totalSupplyState &&
        !totalSupplyState.loading &&
        rewardRateState &&
        !rewardRateState.loading &&
        periodFinishState &&
        !periodFinishState.loading
      ) {
        if (
          balanceState?.error ||
          earnedAmountState?.error ||
          totalSupplyState.error ||
          rewardRateState.error ||
          periodFinishState.error
        ) {
          console.error('Failed to load syrup rewards info')
          return memo
        }
        // get the LP token
        const token = info[index].token

        // check for account, if no account set to 0
        const lp = info[index].lp;
        // @ts-ignore
        const rate = web3.utils.toWei(info[index].rate.toString());
        const stakedAmount = new TokenAmount(lp && lp !== '' ? new Token(137, lp, 18, "SLP", "Staked LP") : DQUICK, JSBI.BigInt(balanceState?.result?.[0] ?? 0))
        const totalStakedAmount = new TokenAmount(lp && lp !== '' ? new Token(137, lp, 18, "SLP", "Staked LP") : DQUICK, JSBI.BigInt(totalSupplyState.result?.[0]))
        const totalRewardRate = new TokenAmount(token, JSBI.BigInt(rate))
        //const pair = info[index].pair.toLowerCase();
        //@ts-ignore
        //const fees = (pairData && pairData[pair] ? pairData[pair].oneDayVolumeUSD * 0.0025: 0);
        const totalRewardRate01 = new TokenAmount(token, JSBI.BigInt(rewardRateState.result?.[0]))
        const getHypotheticalRewardRate = (
          stakedAmount: TokenAmount,
          totalStakedAmount: TokenAmount,
          totalRewardRate: TokenAmount
        ): TokenAmount => {
          return new TokenAmount(
            token,
            JSBI.greaterThan(totalStakedAmount.raw, JSBI.BigInt(0))
              ? JSBI.divide(JSBI.multiply(totalRewardRate01.raw, stakedAmount.raw), totalStakedAmount.raw)
              : JSBI.BigInt(0)
          )
        }

        const individualRewardRate = getHypotheticalRewardRate(stakedAmount, totalStakedAmount, totalRewardRate01)

        const periodFinishMs = info[index].ending
        const dQUICKtoQUICK = new TokenAmount(QUICK, JSBI.BigInt(0))
        //@ts-ignore
        let valueOfTotalStakedAmountInUSDC = 0;
        let valueOfMyStakedAmountInUSDC = 0;

        if (info[index].stakingToken.equals(QUICK)) {
          //@ts-ignore
          valueOfTotalStakedAmountInUSDC = totalStakedAmount.toSignificant(6) * USDPrice?.toSignificant(6)
          //@ts-ignore
          valueOfMyStakedAmountInUSDC = stakedAmount.toSignificant(6) * USDPrice?.toSignificant(6)
        }
        else {
          //@ts-ignore
          valueOfTotalStakedAmountInUSDC = totalStakedAmount.toSignificant(6) * dQUICKtoQUICK.toSignificant(6) * USDPrice?.toSignificant(6)

          //@ts-ignore
          valueOfMyStakedAmountInUSDC = stakedAmount.toSignificant(6) * dQUICKtoQUICK.toSignificant(6) * USDPrice?.toSignificant(6)

        }
  
        memo.push({
          stakingRewardAddress: rewardsAddress,
          token: info[index].token,
          ended: info[index].ended,
          name: info[index].name,
          lp: info[index].lp,
          periodFinish: periodFinishMs,
          earnedAmount: new TokenAmount(token, JSBI.BigInt(earnedAmountState?.result?.[0] ?? 0)),
          rewardRate: individualRewardRate,
          totalRewardRate: totalRewardRate,
          stakedAmount: stakedAmount,
          totalStakedAmount: totalStakedAmount,
          getHypotheticalRewardRate,
          baseToken: info[index].baseToken,
          quickPrice: quickPrice,
          rate: 0,
          dQUICKtoQUICK: dQUICKtoQUICK,
          dQuickTotalSupply: new TokenAmount(DQUICK, JSBI.BigInt(0)),
          valueOfTotalStakedAmountInUSDC: valueOfTotalStakedAmountInUSDC,
          valueOfMyStakedAmountInUSDC: valueOfMyStakedAmountInUSDC,
          oneDayVol: 0,
          stakingToken: info[index].stakingToken
        })
      }
      return memo
    }, [])
  }, [balances, chainId, earnedAmounts, info, periodFinishes, rewardsAddresses, totalSupplies, uni, USDPrice, quickPrice, rewardRates])
}

 const getBulkPairData = async(pairList: any) => {
   //@ts-ignore
  if(pairs !== undefined) {
    return;
  }
  const current = await web3.eth.getBlockNumber();
  const oneDayOldBlock = current - 44000;
  
  try {
    let current = await client.query({
      query: PAIRS_BULK(pairList),
      variables: {
        allPairs: pairList,
      },
      fetchPolicy: 'cache-first',
    })

    let [oneDayResult] = await Promise.all(
      [oneDayOldBlock].map(async (block) => {
        let result = client.query({
          query: PAIRS_HISTORICAL_BULK(block, pairList),
          fetchPolicy: 'cache-first',
        })
        return result
      })
    )

    let oneDayData = oneDayResult?.data?.pairs.reduce((obj:any, cur:any, i:any) => {
      return { ...obj, [cur.id]: cur }
    }, {});

    let pairData = await Promise.all(
      current &&
        current.data.pairs.map(async (pair:any) => {
          let data = pair
          let oneDayHistory = oneDayData?.[pair.id]
          
          data = parseData(data, oneDayHistory)
          return data
        })
    )
    
    const object = convertArrayToObject(pairData, 'id');
    if (Object.keys(object).length > 0){
      pairs = object;
      return object;
    }
    return object

  } catch (e) {
    console.log(e)
    return;
  }
}

const getDualBulkPairData = async(pairList: any) => {
  //@ts-ignore
 if(dualPairs !== undefined) {
   return;
 }
 const current = await web3.eth.getBlockNumber();
 const oneDayOldBlock = current - 44000;
 
 try {
   let current = await client.query({
     query: PAIRS_BULK(pairList),
     variables: {
       allPairs: pairList,
     },
     fetchPolicy: 'cache-first',
   })

   let [oneDayResult] = await Promise.all(
     [oneDayOldBlock].map(async (block) => {
       let result = client.query({
         query: PAIRS_HISTORICAL_BULK(block, pairList),
         fetchPolicy: 'cache-first',
       })
       return result
     })
   )

   let oneDayData = oneDayResult?.data?.pairs.reduce((obj:any, cur:any, i:any) => {
     return { ...obj, [cur.id]: cur }
   }, {});

   let pairData = await Promise.all(
     current &&
       current.data.pairs.map(async (pair:any) => {
         let data = pair
         let oneDayHistory = oneDayData?.[pair.id]
         
         data = parseData(data, oneDayHistory)
         return data
       })
   )
   
   const object = convertArrayToObject(pairData, 'id');
   if (Object.keys(object).length > 0){
    dualPairs = object;
     return object;
   }
   return object

 } catch (e) {
   console.log(e)
   return;
 }
}

const getOneDayVolume = async() => {
  let data: any = {}
  let oneDayData: any = {}
  
  let healthInfo = await healthClient
  .query({
    query: SUBGRAPH_HEALTH,
  })
  let current = Number(healthInfo.data.indexingStatusForCurrentVersion.chains[0].latestBlock.number)
  const currentTime = dayjs();
  const utcOneDayBack = currentTime.subtract(1, 'day').unix();

  const oneDayOldBlock = await getBlockFromTimestamp(utcOneDayBack);
  
  let result = await client.query({
    query: GLOBAL_DATA(current),
    fetchPolicy: 'network-only',
  })
  data = result.data.uniswapFactories[0]

  // fetch the historical data
  let oneDayResult = await client.query({
    query: GLOBAL_DATA(oneDayOldBlock),
    fetchPolicy: 'network-only',
  })
  oneDayData = oneDayResult.data.uniswapFactories[0]

  let oneDayVolumeUSD:any = 0;

  if (data && oneDayData) {
    oneDayVolumeUSD = get2DayPercentChange(
      data.totalVolumeUSD,
      oneDayData.totalVolumeUSD ? oneDayData.totalVolumeUSD : 0)
    oneDayVol = oneDayVolumeUSD;
  }

  return oneDayVolumeUSD;

}

const convertArrayToObject = (array:any, key:any) => {
  const initialValue = {};
  return array.reduce((obj:any, item:any) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

export const get2DayPercentChange = (valueNow:any, value24HoursAgo:any) => {
  // get volume info for both 24 hour periods
  let currentChange = parseFloat(valueNow) - parseFloat(value24HoursAgo)
  return currentChange
}

function parseData(data: any, oneDayData: any) {
  // get volume changes
  const oneDayVolumeUSD = get2DayPercentChange(
    data?.volumeUSD,
    oneDayData?.volumeUSD ? oneDayData.volumeUSD : 0
  )
  let returnData: any = {};
  returnData.id = data.id;
  returnData.token0 = data.token0;
  returnData.token1 = data.token1;
  returnData.oneDayVolumeUSD = parseFloat(oneDayVolumeUSD?.toString())
  returnData.reserveUSD = data.reserveUSD
  returnData.totalSupply = data.totalSupply
  
  return returnData;
}

// gets the dual rewards staking info from the network for the active chain id
export function useDualStakingInfo(pairToFilterBy?: Pair | null): DualStakingInfo[] {
  const { chainId, account } = useActiveWeb3React()
  //const [quickPrice,setQuickPrice] = useState(0);
  const [, quickUsdcPair] = usePair(QUICK, USDC);
  const [, maticUsdcPair]  =usePair(MATIC, USDC);
  const [, ethUsdcPair]  =usePair(ETHER, USDC); 

  const quickPrice = Number(quickUsdcPair?.priceOf(QUICK)?.toSignificant(6))
  const maticPrice = Number(maticUsdcPair?.priceOf(MATIC)?.toSignificant(6))
  const ethPrice = Number(ethUsdcPair?.priceOf(ETHER)?.toSignificant(6))

  const info = useMemo(
    () =>
      chainId
        ? STAKING_DUAL_REWARDS_INFO[chainId]?.filter(stakingRewardInfo =>
            pairToFilterBy === undefined
              ? true
              : pairToFilterBy === null
              ? true
              : pairToFilterBy.involvesToken(stakingRewardInfo.tokens[0]) &&
                pairToFilterBy.involvesToken(stakingRewardInfo.tokens[1])
          ) ?? []
        : [],
    [chainId, pairToFilterBy]
  )

  const uni = chainId ? UNI[chainId] : undefined

  const rewardsAddresses = useMemo(() => info.map(({ stakingRewardAddress }) => stakingRewardAddress), [info])
  const pairAddresses = useMemo(() => info.map(({ pair }) => pair), [info])
  
  useEffect(() => {
 
    getDualBulkPairData(pairAddresses).then((data)=>{
    })
  }, [pairAddresses])

  const lair = useLairContract()
  const accountArg = useMemo(() => [account ?? undefined], [account])
  const args = useMemo(() => info.map(({ rateA }) => [web3.utils.toWei(rateA.toString(), "ether")]), [info])

  // get all the info from the staking rewards contracts
  const balances = useMultipleContractSingleData(rewardsAddresses, STAKING_DUAL_REWARDS_INTERFACE, 'balanceOf', accountArg)
  const earnedAAmounts = useMultipleContractSingleData(rewardsAddresses, STAKING_DUAL_REWARDS_INTERFACE, 'earnedA', accountArg)
  const earnedBAmounts = useMultipleContractSingleData(rewardsAddresses, STAKING_DUAL_REWARDS_INTERFACE, 'earnedB', accountArg)
  const totalSupplies = useMultipleContractSingleData(rewardsAddresses, STAKING_DUAL_REWARDS_INTERFACE, 'totalSupply')
  const dQuickToQuicks = useSingleContractMultipleData(lair, 'dQUICKForQUICK', args);

  const periodFinishes = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_DUAL_REWARDS_INTERFACE,
    'periodFinish',
    undefined,
    NEVER_RELOAD
  )
  const rewardRatesA = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_DUAL_REWARDS_INTERFACE,
    'rewardRateA',
    undefined,
    NEVER_RELOAD
  )

  const rewardRatesB = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_DUAL_REWARDS_INTERFACE,
    'rewardRateB',
    undefined,
    NEVER_RELOAD
  )

  return useMemo(() => {
    if (!chainId || !uni) return []

    return rewardsAddresses.reduce<DualStakingInfo[]>((memo, rewardsAddress, index) => {
      // these two are dependent on account
      const balanceState = balances[index]
      const earnedAAmountState = earnedAAmounts[index]
      const earnedBAmountState = earnedBAmounts[index]
      const dQuickToQuickState = dQuickToQuicks[index];

      // these get fetched regardless of account
      const totalSupplyState = totalSupplies[index]
      const rewardRateAState = rewardRatesA[index]
      const rewardRateBState = rewardRatesB[index]
      const periodFinishState = periodFinishes[index]

      if (
        // these may be undefined if not logged in
        !dQuickToQuickState?.loading &&
        !balanceState?.loading &&
        !earnedAAmountState?.loading &&
        !earnedBAmountState?.loading &&
        // always need these
        totalSupplyState &&
        !totalSupplyState.loading &&
        rewardRateAState &&
        !rewardRateAState.loading &&
        rewardRateBState &&
        !rewardRateBState.loading &&
        periodFinishState &&
        !periodFinishState.loading
      ) {
        if (
          dQuickToQuickState?.error ||
          balanceState?.error ||
          earnedAAmountState?.error ||
          earnedBAmountState?.error ||
          totalSupplyState.error ||
          rewardRateAState.error ||
          rewardRateBState.error ||
          periodFinishState.error
        ) {
          console.error('Failed to load staking rewards info')
          return memo
        }
        // get the LP token
        const tokens = info[index].tokens
        const dummyPair = new Pair(new TokenAmount(tokens[0], '0'), new TokenAmount(tokens[1], '0'))

        // check for account, if no account set to 0
        const lp = info[index].lp;
        // @ts-ignore
        const rateA = web3.utils.toWei(info[index].rateA.toString());
        const rateB = web3.utils.toWei(info[index].rateB.toString());
        const stakedAmount = new TokenAmount(lp && lp !== '' ? new Token(137, lp, 18, "SLP", "Staked LP") : dummyPair.liquidityToken, JSBI.BigInt(balanceState?.result?.[0] ?? 0))
        const totalStakedAmount = new TokenAmount(lp && lp !== '' ? new Token(137, lp, 18, "SLP", "Staked LP") : dummyPair.liquidityToken, JSBI.BigInt(totalSupplyState.result?.[0]))
        const totalRewardRateA = new TokenAmount(uni, JSBI.BigInt(rateA))
        const totalRewardRateB = new TokenAmount(uni, JSBI.BigInt(rateB))
        //const pair = info[index].pair.toLowerCase();
        //const fees = (pairData && pairData[pair] ? pairData[pair].oneDayVolumeUSD * 0.0025: 0);
        const totalRewardRateA01 = new TokenAmount(uni, JSBI.BigInt(rewardRateAState.result?.[0]))
        const totalRewardRateB01 = new TokenAmount(uni, JSBI.BigInt(rewardRateBState.result?.[0]))
        
        const getHypotheticalRewardRate = (
          stakedAmount: TokenAmount,
          totalStakedAmount: TokenAmount,
          totalRewardRate: TokenAmount
        ): TokenAmount => {
          return new TokenAmount(
            uni,
            JSBI.greaterThan(totalStakedAmount.raw, JSBI.BigInt(0))
              ? JSBI.divide(JSBI.multiply(totalRewardRate.raw, stakedAmount.raw), totalStakedAmount.raw)
              : JSBI.BigInt(0)
          )
        }

        const individualRewardRateA = getHypotheticalRewardRate(stakedAmount, totalStakedAmount, totalRewardRateA01)
        const individualRewardRateB = getHypotheticalRewardRate(stakedAmount, totalStakedAmount, totalRewardRateB01)

        const periodFinishMs = periodFinishState.result?.[0]?.mul(1000)?.toNumber()
        var oneYearFeeAPY = 0;
        var oneDayFee = 0;
        var accountFee = 0;
        var dQuickToQuick:any = dQuickToQuickState?.result?.[0] ?? 0 

        dQuickToQuick = web3.utils.fromWei(dQuickToQuick.toString(), 'ether');

        //@ts-ignore
        if(dualPairs !== undefined){
          //@ts-ignore
          oneYearFeeAPY = dualPairs[info[index].pair]?.oneDayVolumeUSD;
          
          if(oneYearFeeAPY) {
            const totalSupply = web3.utils.toWei(dualPairs[info[index].pair]?.totalSupply, "ether");
            const ratio = Number(totalSupplyState.result?.[0].toString()) / Number(totalSupply);
            const myRatio = Number(balanceState?.result?.[0].toString()) / Number(totalSupplyState.result?.[0].toString());
            oneDayFee = ( oneYearFeeAPY * 0.003) * ratio;
            accountFee = oneDayFee * myRatio;
            oneYearFeeAPY = ( oneYearFeeAPY * 0.003 * 365) / dualPairs[info[index].pair]?.reserveUSD
            //console.log(info[index].pair, oneYearFeeAPY);
          } 
        }
        
        memo.push({
          stakingRewardAddress: rewardsAddress,
          tokens: info[index].tokens,
          ended: info[index].ended,
          name: info[index].name,
          lp: info[index].lp,
          periodFinish: periodFinishMs > 0 ? new Date(periodFinishMs) : undefined,
          earnedAmountA: new TokenAmount(uni, JSBI.BigInt(earnedAAmountState?.result?.[0] ?? 0)),
          earnedAmountB: new TokenAmount(uni, JSBI.BigInt(earnedBAmountState?.result?.[0] ?? 0)),
          rewardRateA: individualRewardRateA,
          rewardRateB: individualRewardRateB,
          totalRewardRateA: totalRewardRateA,
          totalRewardRateB: totalRewardRateB,
          stakedAmount: stakedAmount,
          totalStakedAmount: totalStakedAmount,
          getHypotheticalRewardRate,
          baseToken: info[index].baseToken,
          pair: info[index].pair,
          quickPrice: quickPrice,
          maticPrice: maticPrice,
          ethPrice: ethPrice,
          rateA: info[index].rateA,
          rateB: info[index].rateB,
          oneYearFeeAPY: oneYearFeeAPY,
          oneDayFee,
          accountFee,
          rewardTokenA: info[index].rewardTokenA,
          rewardTokenB: info[index].rewardTokenB,
          rewardTokenBBase: info[index].rewardTokenBBase,
          dQuickToQuick: dQuickToQuick
        })
      }
      return memo
    }, [])
  }, [dQuickToQuicks, ethPrice, balances, chainId, earnedAAmounts, earnedBAmounts, info, periodFinishes, rewardsAddresses, totalSupplies, uni, quickPrice, maticPrice, rewardRatesA, rewardRatesB])
}

export function useLairInfo(): LairInfo {
  const { account } = useActiveWeb3React()

  let accountArg = useMemo(() => [account ?? undefined], [account])

  const inputs = ['1000000000000000000']

  const lair = useLairContract()
  const quick = useQUICKContract();
  const [, quickUsdcPair] = usePair(QUICK, USDC);
  const quickPrice = Number(quickUsdcPair?.priceOf(QUICK)?.toSignificant(6))

  const dQuickToQuick = useSingleCallResult(lair, 'dQUICKForQUICK', inputs);
  const quickToDQuick = useSingleCallResult(lair, 'QUICKForDQUICK', inputs);

  const _dQuickTotalSupply = useSingleCallResult(lair, 'totalSupply', []);

  const quickBalance = useSingleCallResult(lair, 'QUICKBalance', accountArg);
  const dQuickBalance = useSingleCallResult(lair, 'balanceOf', accountArg);

  accountArg = [LAIR_ADDRESS ?? undefined]

  const lairsQuickBalance = useSingleCallResult(quick, 'balanceOf', accountArg);

  useEffect(() => {
 
    getOneDayVolume().then((data)=>{
      console.log(data);
    })
  }, [])

  return useMemo(() => {
    return (
      {
        lairAddress: LAIR_ADDRESS,
        dQUICKtoQUICK: new TokenAmount(QUICK, JSBI.BigInt(dQuickToQuick?.result?.[0] ?? 0)),
        QUICKtodQUICK: new TokenAmount(DQUICK, JSBI.BigInt(quickToDQuick?.result?.[0] ?? 0)),
        dQUICKBalance: new TokenAmount(DQUICK, JSBI.BigInt(dQuickBalance?.result?.[0] ?? 0)),
        QUICKBalance: new TokenAmount(QUICK, JSBI.BigInt(quickBalance?.result?.[0] ?? 0)),
        totalQuickBalance: new TokenAmount(QUICK, JSBI.BigInt(lairsQuickBalance?.result?.[0] ?? 0)),
        quickPrice,
        dQuickTotalSupply: new TokenAmount(DQUICK, JSBI.BigInt(_dQuickTotalSupply?.result?.[0] ?? 0)),
        oneDayVol: oneDayVol
      }
    )
    
  }, [dQuickToQuick, quickToDQuick, quickBalance, dQuickBalance, _dQuickTotalSupply, quickPrice, lairsQuickBalance])

}

export function useStakingInfos(): StakingInfo[] {
  return useSelector((state: AppState) => state.stake.stakingInfo)
}

export function useSyrupInfos(): SyrupInfo[] {
  return useSelector((state: AppState) => state.stake.syrupInfo)
}

// gets the staking info from the network for the active chain id
export function useStakingInfo(pairToFilterBy?: Pair | null): StakingInfo[] {
  const { chainId, account } = useActiveWeb3React()
  //const [quickPrice,setQuickPrice] = useState(0);
  const [, quickUsdcPair] = usePair(QUICK, USDC);
  const quickPrice = Number(quickUsdcPair?.priceOf(QUICK)?.toSignificant(6))
  const info = useMemo(
    () =>
      chainId
        ? STAKING_REWARDS_INFO[chainId]?.filter(stakingRewardInfo =>
            pairToFilterBy === undefined
              ? true
              : pairToFilterBy === null
              ? true
              : pairToFilterBy.involvesToken(stakingRewardInfo.tokens[0]) &&
                pairToFilterBy.involvesToken(stakingRewardInfo.tokens[1])
          ) ?? []
        : [],
    [chainId, pairToFilterBy]
  )

  const uni = chainId ? UNI[chainId] : undefined

  const rewardsAddresses = useMemo(() => info.map(({ stakingRewardAddress }) => stakingRewardAddress), [info])
  const pairAddresses = useMemo(() => info.map(({ pair }) => pair.toLowerCase()), [info])
  
  useEffect(() => {
 
    getBulkPairData(pairAddresses).then((data)=>{
    })
  }, [pairAddresses])

  const lair = useLairContract()
  const args = useMemo(() => info.map(({ rate }) => [web3.utils.toWei(rate.toString(), "ether")]), [info])
  const accountArg = useMemo(() => [account ?? undefined], [account])
   
  // get all the info from the staking rewards contracts
  const balances = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'balanceOf', accountArg)
  const earnedAmounts = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'earned', accountArg)
  const totalSupplies = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'totalSupply')
  const dQuickToQuicks = useSingleContractMultipleData(lair, 'dQUICKForQUICK', args);

  const periodFinishes = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'periodFinish',
    undefined,
    NEVER_RELOAD
  )
  const rewardRates = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'rewardRate',
    undefined,
    NEVER_RELOAD
  )

  return useMemo(() => {
    if (!chainId || !uni) return []

    return rewardsAddresses.reduce<StakingInfo[]>((memo, rewardsAddress, index) => {
      // these two are dependent on account
      const balanceState = balances[index]
      const dQuickToQuickState = dQuickToQuicks[index];
      const earnedAmountState = earnedAmounts[index]

      // these get fetched regardless of account
      const totalSupplyState = totalSupplies[index]
      const rewardRateState = rewardRates[index]
      const periodFinishState = periodFinishes[index]

      if (
        // these may be undefined if not logged in
        !dQuickToQuickState?.loading &&
        !balanceState?.loading &&
        !earnedAmountState?.loading &&
        // always need these
        totalSupplyState &&
        !totalSupplyState.loading &&
        rewardRateState &&
        !rewardRateState.loading &&
        periodFinishState &&
        !periodFinishState.loading
      ) {
        if (
          dQuickToQuickState?.error ||
          balanceState?.error ||
          earnedAmountState?.error ||
          totalSupplyState.error ||
          rewardRateState.error ||
          periodFinishState.error
        ) {
          console.error('Failed to load staking rewards info')
          return memo
        }
        // get the LP token
        const tokens = info[index].tokens
        const dummyPair = new Pair(new TokenAmount(tokens[0], '0'), new TokenAmount(tokens[1], '0'))

        // check for account, if no account set to 0
        const lp = info[index].lp;
        // @ts-ignore
        const rate = web3.utils.toWei(info[index].rate.toString());
        const stakedAmount = new TokenAmount(lp && lp !== '' ? new Token(137, lp, 18, "SLP", "Staked LP") : dummyPair.liquidityToken, JSBI.BigInt(balanceState?.result?.[0] ?? 0))
        const totalStakedAmount = new TokenAmount(lp && lp !== '' ? new Token(137, lp, 18, "SLP", "Staked LP") : dummyPair.liquidityToken, JSBI.BigInt(totalSupplyState.result?.[0]))
        const totalRewardRate = new TokenAmount(uni, JSBI.BigInt(rate))
        //const pair = info[index].pair.toLowerCase();
        //@ts-ignore
        //const fees = (pairData && pairData[pair] ? pairData[pair].oneDayVolumeUSD * 0.0025: 0);
        const totalRewardRate01 = new TokenAmount(uni, JSBI.BigInt(rewardRateState.result?.[0]))
        const getHypotheticalRewardRate = (
          stakedAmount: TokenAmount,
          totalStakedAmount: TokenAmount,
          totalRewardRate: TokenAmount
        ): TokenAmount => {
          return new TokenAmount(
            uni,
            JSBI.greaterThan(totalStakedAmount.raw, JSBI.BigInt(0))
              ? JSBI.divide(JSBI.multiply(totalRewardRate01.raw, stakedAmount.raw), totalStakedAmount.raw)
              : JSBI.BigInt(0)
          )
        }

        const individualRewardRate = getHypotheticalRewardRate(stakedAmount, totalStakedAmount, totalRewardRate01)

        const periodFinishMs = periodFinishState.result?.[0]?.mul(1000)?.toNumber()
        var oneYearFeeAPY = 0;
        var oneDayFee = 0;
        var accountFee = 0;
        var dQuickToQuick:any = dQuickToQuickState?.result?.[0] ?? 0 

        dQuickToQuick = web3.utils.fromWei(dQuickToQuick.toString(), 'ether');
        //@ts-ignore
        if(pairs !== undefined){
          //@ts-ignore
          oneYearFeeAPY = pairs[info[index].pair]?.oneDayVolumeUSD;
          
          if(oneYearFeeAPY) {
            const totalSupply = web3.utils.toWei(pairs[info[index].pair]?.totalSupply, "ether");
            const ratio = Number(totalSupplyState.result?.[0].toString()) / Number(totalSupply);
            const myRatio = Number(balanceState?.result?.[0].toString()) / Number(totalSupplyState.result?.[0].toString());
            oneDayFee = ( oneYearFeeAPY * 0.003) * ratio;
            accountFee = oneDayFee * myRatio;
            oneYearFeeAPY = ( oneYearFeeAPY * 0.003 * 365) / pairs[info[index].pair]?.reserveUSD
            //console.log(info[index].pair, oneYearFeeAPY);
          } 
        }
        
        memo.push({
          stakingRewardAddress: rewardsAddress,
          tokens: info[index].tokens,
          ended: info[index].ended,
          name: info[index].name,
          lp: info[index].lp,
          periodFinish: periodFinishMs > 0 ? new Date(periodFinishMs) : undefined,
          earnedAmount: new TokenAmount(uni, JSBI.BigInt(earnedAmountState?.result?.[0] ?? 0)),
          rewardRate: individualRewardRate,
          totalRewardRate: totalRewardRate,
          stakedAmount: stakedAmount,
          totalStakedAmount: totalStakedAmount,
          getHypotheticalRewardRate,
          baseToken: info[index].baseToken,
          pair: info[index].pair,
          quickPrice: quickPrice,
          rate: info[index].rate,
          oneYearFeeAPY: oneYearFeeAPY,
          oneDayFee,
          accountFee,
          dQuickToQuick: dQuickToQuick
        })
      }
      return memo
    }, [])
  }, [balances, chainId, earnedAmounts, info, periodFinishes, rewardsAddresses, totalSupplies, uni, quickPrice, rewardRates, dQuickToQuicks])
}

// gets the staking info from the network for the active chain id
export function useVeryOldStakingInfo(pairToFilterBy?: Pair | null): StakingInfo[] {
  const { chainId, account } = useActiveWeb3React()

  const info = useMemo(
    () =>
      chainId
        ? VERY_OLD_STAKING_REWARDS_INFO[chainId]?.filter(stakingRewardInfo =>
            pairToFilterBy === undefined
              ? true
              : pairToFilterBy === null
              ? true
              : pairToFilterBy.involvesToken(stakingRewardInfo.tokens[0]) &&
                pairToFilterBy.involvesToken(stakingRewardInfo.tokens[1])
          ) ?? []
        : [],
    [chainId, pairToFilterBy]
  )

  const uni = chainId ? UNI[chainId] : undefined

  const rewardsAddresses = useMemo(() => info.map(({ stakingRewardAddress }) => stakingRewardAddress), [info])

  const accountArg = useMemo(() => [account ?? undefined], [account])

  // get all the info from the staking rewards contracts
  const balances = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'balanceOf', accountArg)
  const earnedAmounts = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'earned', accountArg)
  const totalSupplies = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'totalSupply')

  const periodFinishes = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'periodFinish',
    undefined,
    NEVER_RELOAD
  )

  return useMemo(() => {
    if (!chainId || !uni) return []

    return rewardsAddresses.reduce<StakingInfo[]>((memo, rewardsAddress, index) => {
      // these two are dependent on account
      const balanceState = balances[index]
      const earnedAmountState = earnedAmounts[index]

      // these get fetched regardless of account
      const totalSupplyState = totalSupplies[index]
      const periodFinishState = periodFinishes[index]

      if (
        // these may be undefined if not logged in
        !balanceState?.loading &&
        !earnedAmountState?.loading &&
        // always need these
        totalSupplyState &&
        !totalSupplyState.loading &&
      
        periodFinishState &&
        !periodFinishState.loading
      ) {
        if (
          balanceState?.error ||
          earnedAmountState?.error ||
          totalSupplyState.error ||
          periodFinishState.error
        ) {
          console.error('Failed to load staking rewards info')
          return memo
        }

        // get the LP token
        const tokens = info[index].tokens
        const dummyPair = new Pair(new TokenAmount(tokens[0], '0'), new TokenAmount(tokens[1], '0'))

        // check for account, if no account set to 0
        const lp = info[index].lp;

        const stakedAmount = new TokenAmount(lp && lp !== '' ? new Token(137, lp, 18, "SLP", "Staked LP") : dummyPair.liquidityToken, JSBI.BigInt(balanceState?.result?.[0] ?? 0))
        const totalStakedAmount = new TokenAmount(lp && lp !== '' ? new Token(137, lp, 18, "SLP", "Staked LP") : dummyPair.liquidityToken, JSBI.BigInt(totalSupplyState.result?.[0]))
        const totalRewardRate = new TokenAmount(uni, JSBI.BigInt(0))
        const getHypotheticalRewardRate = (
          stakedAmount: TokenAmount,
          totalStakedAmount: TokenAmount,
          totalRewardRate: TokenAmount
        ): TokenAmount => {
          return new TokenAmount(
            uni,
            JSBI.greaterThan(totalStakedAmount.raw, JSBI.BigInt(0))
              ? JSBI.divide(JSBI.multiply(totalRewardRate.raw, stakedAmount.raw), totalStakedAmount.raw)
              : JSBI.BigInt(0)
          )
        }

        const individualRewardRate = getHypotheticalRewardRate(stakedAmount, totalStakedAmount, totalRewardRate)

        const periodFinishMs = periodFinishState.result?.[0]?.mul(1000)?.toNumber()

        memo.push({
          stakingRewardAddress: rewardsAddress,
          tokens: info[index].tokens,
          ended: info[index].ended,
          name: info[index].name,
          lp: info[index].lp,
          periodFinish: periodFinishMs > 0 ? new Date(periodFinishMs) : undefined,
          earnedAmount: new TokenAmount(uni, JSBI.BigInt(earnedAmountState?.result?.[0] ?? 0)),
          rewardRate: individualRewardRate,
          totalRewardRate: totalRewardRate,
          stakedAmount: stakedAmount,
          totalStakedAmount: totalStakedAmount,
          baseToken: info[index].baseToken,
          getHypotheticalRewardRate,
          pair: info[index].pair,
          quickPrice: 0,
          rate: info[index].rate,
          oneYearFeeAPY: 0,
          oneDayFee: 0,
          accountFee: 0,
          dQuickToQuick: 0
        })
      }
      return memo
    }, [])
  }, [balances, chainId, earnedAmounts, info, periodFinishes, rewardsAddresses, totalSupplies, uni])
}

export function useOldStakingInfo(pairToFilterBy?: Pair | null): StakingInfo[] {
  const { chainId, account } = useActiveWeb3React()

  const info = useMemo(
    () =>
      chainId
        ? OLD_STAKING_REWARDS_INFO[chainId]?.filter(stakingRewardInfo =>
            pairToFilterBy === undefined
              ? true
              : pairToFilterBy === null
              ? true
              : pairToFilterBy.involvesToken(stakingRewardInfo.tokens[0]) &&
                pairToFilterBy.involvesToken(stakingRewardInfo.tokens[1])
          ) ?? []
        : [],
    [chainId, pairToFilterBy]
  )

  const uni = chainId ? UNI[chainId] : undefined

  const rewardsAddresses = useMemo(() => info.map(({ stakingRewardAddress }) => stakingRewardAddress), [info])

  const accountArg = useMemo(() => [account ?? undefined], [account])

  // get all the info from the staking rewards contracts
  const balances = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'balanceOf', accountArg)
  const earnedAmounts = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'earned', accountArg)
  const totalSupplies = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'totalSupply')

  const periodFinishes = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'periodFinish',
    undefined,
    NEVER_RELOAD
  )

  return useMemo(() => {
    if (!chainId || !uni) return []

    return rewardsAddresses.reduce<StakingInfo[]>((memo, rewardsAddress, index) => {
      // these two are dependent on account
      const balanceState = balances[index]
      const earnedAmountState = earnedAmounts[index]

      // these get fetched regardless of account
      const totalSupplyState = totalSupplies[index]
      
      const periodFinishState = periodFinishes[index]

      if (
        // these may be undefined if not logged in
        !balanceState?.loading &&
        !earnedAmountState?.loading &&
        // always need these
        totalSupplyState &&
        !totalSupplyState.loading &&
       
        periodFinishState &&
        !periodFinishState.loading
      ) {
        if (
          balanceState?.error ||
          earnedAmountState?.error ||
          totalSupplyState.error ||
          periodFinishState.error
        ) {
          console.error('Failed to load staking rewards info')
          return memo
        }

        // get the LP token
        const tokens = info[index].tokens
        const dummyPair = new Pair(new TokenAmount(tokens[0], '0'), new TokenAmount(tokens[1], '0'))

        // check for account, if no account set to 0
        const lp = info[index].lp;

        const stakedAmount = new TokenAmount(lp && lp !== '' ? new Token(137, lp, 18, "SLP", "Staked LP") : dummyPair.liquidityToken, JSBI.BigInt(balanceState?.result?.[0] ?? 0))
        const totalStakedAmount = new TokenAmount(lp && lp !== '' ? new Token(137, lp, 18, "SLP", "Staked LP") : dummyPair.liquidityToken, JSBI.BigInt(totalSupplyState.result?.[0]))
        const totalRewardRate = new TokenAmount(uni, JSBI.BigInt(0))

        const getHypotheticalRewardRate = (
          stakedAmount: TokenAmount,
          totalStakedAmount: TokenAmount,
          totalRewardRate: TokenAmount
        ): TokenAmount => {
          return new TokenAmount(
            uni,
            JSBI.greaterThan(totalStakedAmount.raw, JSBI.BigInt(0))
              ? JSBI.divide(JSBI.multiply(totalRewardRate.raw, stakedAmount.raw), totalStakedAmount.raw)
              : JSBI.BigInt(0)
          )
        }

        const individualRewardRate = getHypotheticalRewardRate(stakedAmount, totalStakedAmount, totalRewardRate)

        const periodFinishMs = periodFinishState.result?.[0]?.mul(1000)?.toNumber()

        memo.push({
          stakingRewardAddress: rewardsAddress,
          tokens: info[index].tokens,
          ended: info[index].ended,
          name: info[index].name,
          lp: info[index].lp,
          periodFinish: periodFinishMs > 0 ? new Date(periodFinishMs) : undefined,
          earnedAmount: new TokenAmount(uni, JSBI.BigInt(earnedAmountState?.result?.[0] ?? 0)),
          rewardRate: individualRewardRate,
          totalRewardRate: totalRewardRate,
          stakedAmount: stakedAmount,
          totalStakedAmount: totalStakedAmount,
          baseToken: info[index].baseToken,
          getHypotheticalRewardRate,
          pair: info[index].pair,
          quickPrice: 0,
          rate: info[index].rate,
          oneYearFeeAPY: 0,
          oneDayFee: 0,
          accountFee: 0,
          dQuickToQuick: 0
        })
      }
      return memo
    }, [])
  }, [balances, chainId, earnedAmounts, info, periodFinishes, rewardsAddresses, totalSupplies, uni])
}

export function useTotalUniEarned(): TokenAmount | undefined {
  const { chainId } = useActiveWeb3React()
  const uni = chainId ? UNI[chainId] : undefined
  const newStakingInfos = useStakingInfo()
  const oldStakingInfos = useOldStakingInfo();
  const stakingInfos = newStakingInfos.concat(oldStakingInfos);

  return useMemo(() => {
    if (!uni) return undefined
    return (
      stakingInfos?.reduce(
        (accumulator, stakingInfo) => accumulator.add(stakingInfo.earnedAmount),
        new TokenAmount(uni, '0')
      ) ?? new TokenAmount(uni, '0')
    )
  }, [stakingInfos, uni])
}

export function useDerivedSyrupInfo(
  typedValue: string,
  stakingToken: Token,
  userLiquidityUnstaked: TokenAmount | undefined
): {
  parsedAmount?: CurrencyAmount
  error?: string
} {
  const { account } = useActiveWeb3React()

  const parsedInput: CurrencyAmount | undefined = tryParseAmount(typedValue, stakingToken)

  const parsedAmount =
    parsedInput && userLiquidityUnstaked && JSBI.lessThanOrEqual(parsedInput.raw, userLiquidityUnstaked.raw)
      ? parsedInput
      : undefined

  let error: string | undefined
  if (!account) {
    error = 'Connect Wallet'
  }
  if (!parsedAmount) {
    error = error ?? 'Enter an amount'
  }

  return {
    parsedAmount,
    error
  }
}

// based on typed value
export function useDerivedStakeInfo(
  typedValue: string,
  stakingToken: Token,
  userLiquidityUnstaked: TokenAmount | undefined
): {
  parsedAmount?: CurrencyAmount
  error?: string
} {
  const { account } = useActiveWeb3React()

  const parsedInput: CurrencyAmount | undefined = tryParseAmount(typedValue, stakingToken)

  const parsedAmount =
    parsedInput && userLiquidityUnstaked && JSBI.lessThanOrEqual(parsedInput.raw, userLiquidityUnstaked.raw)
      ? parsedInput
      : undefined

  let error: string | undefined
  if (!account) {
    error = 'Connect Wallet'
  }
  if (!parsedAmount) {
    error = error ?? 'Enter an amount'
  }

  return {
    parsedAmount,
    error
  }
}

export function useDerivedConversionInfo(
  typedValue: string,
  token: Token,
  userBalance: TokenAmount | undefined
): {
  parsedAmount?: CurrencyAmount
  error?: string
} {
  const { account } = useActiveWeb3React()

  const parsedInput: CurrencyAmount | undefined = tryParseAmount(typedValue, token)

  const parsedAmount =
    parsedInput && userBalance && JSBI.lessThanOrEqual(parsedInput.raw, userBalance.raw)
      ? parsedInput
      : undefined

  let error: string | undefined
  if (!account) {
    error = 'Connect Wallet'
  }
  if (!parsedAmount) {
    error = error ?? 'Enter an amount'
  }

  return {
    parsedAmount,
    error
  }
}

export function useDerivedLairInfo(
  typedValue: string,
  stakingToken: Token,
  userLiquidityUnstaked: TokenAmount | undefined
): {
  parsedAmount?: CurrencyAmount
  error?: string
} {
  const { account } = useActiveWeb3React()

  const parsedInput: CurrencyAmount | undefined = tryParseAmount(typedValue, stakingToken)

  const parsedAmount =
    parsedInput && userLiquidityUnstaked && JSBI.lessThanOrEqual(parsedInput.raw, userLiquidityUnstaked.raw)
      ? parsedInput
      : undefined

  let error: string | undefined
  if (!account) {
    error = 'Connect Wallet'
  }
  if (!parsedAmount) {
    error = error ?? 'Enter an amount'
  }

  return {
    parsedAmount,
    error
  }
}


// based on typed value
export function useDerivedUnstakeInfo(
  typedValue: string,
  stakingAmount: TokenAmount
): {
  parsedAmount?: CurrencyAmount
  error?: string
} {
  const { account } = useActiveWeb3React()

  const parsedInput: CurrencyAmount | undefined = tryParseAmount(typedValue, stakingAmount.token)

  const parsedAmount = parsedInput && JSBI.lessThanOrEqual(parsedInput.raw, stakingAmount.raw) ? parsedInput : undefined

  let error: string | undefined
  if (!account) {
    error = 'Connect Wallet'
  }
  if (!parsedAmount) {
    error = error ?? 'Enter an amount'
  }

  return {
    parsedAmount,
    error
  }
}

// based on typed value
export function useDerivedUnstakeLairInfo(
  typedValue: string,
  stakingAmount: TokenAmount
): {
  parsedAmount?: CurrencyAmount
  error?: string
} {
  const { account } = useActiveWeb3React()

  const parsedInput: CurrencyAmount | undefined = tryParseAmount(typedValue, stakingAmount.token)

  const parsedAmount = parsedInput && JSBI.lessThanOrEqual(parsedInput.raw, stakingAmount.raw) ? parsedInput : undefined

  let error: string | undefined
  if (!account) {
    error = 'Connect Wallet'
  }
  if (!parsedAmount) {
    error = error ?? 'Enter an amount'
  }

  return {
    parsedAmount,
    error
  }
}
