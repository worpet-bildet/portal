export default {
  indexer: import.meta.env.VITE_INDEXER,
  googleAnalyticsId: import.meta.env.VITE_GA_PROPERTY_ID,
  chainId: import.meta.env.VITE_ETH_CHAIN_ID,
  env: import.meta.env.VITE_ENV,
  openai: import.meta.env.VITE_OPENAI_API_KEY,
  aiEnabled: import.meta.env.VITE_AI_ENABLED,
};
