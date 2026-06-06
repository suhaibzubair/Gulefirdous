export type PricingPlan = {
    title: string;
    price: string;
    description: string;
    features: string[];
    sale?: boolean;
    oldPrice?: string;
    newPrice?: string;
  }