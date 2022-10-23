import React from "react";
import car from "../../../../../assets/images/car-product.jpg";
import car1 from "../../../../../assets/images/car2.jpg"
export let listProduct: { id: number, name: string, price: number, image: string[], discount: number, sold: number }[] = [
    { "id": 0, "name": "Sữa Vinamilk ColosGold số 1 800g", "price": 200000, "image": [car], "discount": 33, "sold":2   },
    { "id": 1, "name": "Sữa Vinamilk ColosGold số 2 800g", "price": 150000, "image": [car1], "discount": 63, "sold":1   },
    { "id": 2, "name": "Sữa Vinamilk ColosGold số 3 800g", "price": 500000, "image": [car1], "discount": 50, "sold":3   },
    { "id": 3, "name": "Sữa Vinamilk ColosGold số 4 800g", "price": 600000, "image": [car], "discount": 99, "sold":5   },
    { "id": 4, "name": "Sữa Vinamilk ColosGold số 5 800g", "price": 207000, "image": [car], "discount": 12, "sold":50   },
    { "id": 5, "name": "Sữa Vinamilk ColosGold số 6 800g", "price": 8000000, "image": [car1], "discount": 5, "sold":6   },
    { "id": 6, "name": "Sữa Vinamilk ColosGold số 7 800g", "price": 900000, "image": [car], "discount": 20, "sold":15   },
];