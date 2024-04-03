import { SitecoreCloudResults } from './sitecoreCloud';

export type SitecoreProduct = {
  id: string;
  productName: string;
  productDescription: string;
  lightIcon: string;
  darkIcon: string;
  sitecoreCloud: SitecoreCloudResults;
};
export default SitecoreProduct;

export type SitecoreProductResults = {
  total: string;
  results: SitecoreProduct[];
};
