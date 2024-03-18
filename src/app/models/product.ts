export interface Review {
    userId: string;
    summary: string;
    description: string;
    overallRating: number;
    productId: string;
    foodQualityRating: number;
    deliveryRating: number;
    customerServiceRating: number;
    valueForMoneyRating: number;
    willRecommend: number;  // should translate from 100%, 75%, 50%, 25%, 0%
}

export interface Product {
    productId: string;
    name: string;
    category: string;
    price: number;
    description: string;
    nutritionalValue: string;
    rating: number;
    reviews: string; // concat string Ids into a single string to save space
    images: string; // concat the links of each image into a single string
    lifestyleImages: string;
}