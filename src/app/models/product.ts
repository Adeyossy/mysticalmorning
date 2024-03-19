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
    id: string;
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

export class Product {
    id: string;
    name: string;
    price: number;
    category: string;
    description = "";
    nutritionalValue = "";
    rating = 0;
    reviews = "";
    images = "";
    lifestyleImages = ""

    constructor(id="", name="", price = -1, category="") {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
    }
}