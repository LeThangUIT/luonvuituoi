import React from "react";

export let listMenu: {
  name: string;
  subMenu: { name1: string; subMenu1: string[] }[];
}[] = [
  {
    name: "Thương hiệu",
    subMenu: [
      { name1: "Nike", subMenu1: [] },
      { name1: "Adidas", subMenu1: [] },
      { name1: "Converse", subMenu1: [] },
      { name1: "Vans", subMenu1: [] },
      { name1: "Puma", subMenu1: [] },
      { name1: "Balenciaga", subMenu1: [] },
    ],
  },
  {
    name: "Giới thiệu",
    subMenu: [
    ],
  },
  {
    name: "Liên hệ",
    subMenu: [
    ],
  },
  {
    name: "Blog",
    subMenu: [
    ],
  },
  {
    name: "Tra cứu đơn hàng",
    subMenu: [
    ],
  },
  {
    name: "Theo dõi đơn hàng",
    subMenu: [
    ],
  },
];
