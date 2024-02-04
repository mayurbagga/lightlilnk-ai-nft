import '@/styles/globals.css';
import { darkTheme } from '@rainbow-me/rainbowkit';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig,createConfig } from 'wagmi';
import {
  RainbowKitProvider,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import '@rainbow-me/rainbowkit/styles.css';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import merge from 'lodash.merge';
import { FormProvider } from '@/context/formContext';
import { DataProvider } from '@/context/DataContext';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import
  {
  goerli,
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
    zora,
    bsc,
    opBNBTestnet,
  
} from 'wagmi/chains';
  // const opBNBTestnet = {
  //   id: 5611,
  //   name: 'opBNBTestnet',
  //   network: 'opBNBTestnet',
  //   nativeCurrency: {
  //     decimals: 18,
  //     name: 'opBNBTestnet',
  //     symbol: 'tBNB',
  //   },
  //   rpcUrls: {
  //     public: { http: ['https://opbnb-testnet-rpc.bnbchain.org'] },
  //     default: { http: ['https://opbnb-testnet-rpc.bnbchain.org'] },
  //   },
  //   blockExplorers: {
  //     default: { name: 'BSCScan', url: 'http://opbnbscan.com/' },
  //     etherscan: { name: 'BSCScan', url: 'http://opbnbscan.com/' },
  //   },
  //   testnet: true,
  // };
  const LightLinkTestnet = {
    id: 1891,
    name: 'Pegasus Testnet',
    network: 'Pegasus Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Pegasus Testnet',
      symbol: 'ETH',
    },
    rpcUrls: {
      public: { http: ['https://replicator.pegasus.lightlink.io/rpc/v1'] },
      default: { http: ['https://replicator.pegasus.lightlink.io/rpc/v1'] },
    },
    blockExplorers: {
      default: { name: 'Lightlink Scan', url: 'https://pegasus.lightlink.io/' },
      etherscan: { name: 'Lightlink Scan ', url: 'https://pegasus.lightlink.io/' },
    },
    testnet: true,
};


const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID;



const { chains, publicClient } = configureChains(
  [LightLinkTestnet,goerli],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);


const { connectors } = getDefaultWallets({
  appName: 'Light AI NFT',
  projectId: '2165464',
  chains
});


const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})


const myTheme = merge(darkTheme(), {
  colors: {
    accentColor: '#A020F0',
  },
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={myTheme} coolMode>
        <FormProvider>
          <DataProvider>
            <Component {...pageProps} />
          </DataProvider>
        </FormProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
