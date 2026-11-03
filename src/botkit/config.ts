/**
 * 目录的默认地址和签名公钥。公钥留空时不联网，目录就是空的，App 的行为和没有这个功能时一样：
 * 上线目录时先 amb-bot keygen，把公钥填到这里（私钥只放发布环境），再把 amb-bot pack 的产物放到这个地址。
 * 开发和测试用环境变量 AMB_CATALOG_URL、AMB_CATALOG_PUBKEY 覆盖。
 */
export const CATALOG_URL = "https://anymodel.bot/catalog/index.json";
export const CATALOG_PUBLIC_KEY = "";

export function catalogConfig(env: NodeJS.ProcessEnv = process.env): { url: string; publicKey: string } {
  return { url: env.AMB_CATALOG_URL || CATALOG_URL, publicKey: env.AMB_CATALOG_PUBKEY || CATALOG_PUBLIC_KEY };
}
