// Sidebar imports
import {UilTicket, UilEstate, UilBill, UilUsersAlt, UilStore, UilListUl, UilUsdSquare, UilMoneyWithdrawal, UilReceiptAlt} from '@iconscout/react-unicons'



export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Thống kê",
    path: ""
  },
  {
    icon: UilListUl,
    heading: "Danh mục",
    path: "category"
  },
  {
    icon: UilStore,
    heading: "Sản phẩm",
    path: "product"
  },
  {
    icon: UilBill,
    heading: "Hóa đơn",
    path: "invoice"
  },
  {
    icon: UilTicket,
    heading: "Khuyến mãi",
    path: "voucher"
  },
  {
    icon: UilUsersAlt,
    heading: "Tài khoản",
    path: "user"
  },

]

export const CardsData = [
  {
    title: "Hóa đơn",
    color: {
      background: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "25,970",
    png: UilUsdSquare,
    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ]
  },
  {
    title: "Revenue",
    color: {
      background: "linear-gradient(180deg, #ff919d 0%, #fc929d 100%)",
      boxShadow: "0px 10px 20px 0px #fdc0c7",
    },
    barValue: 80,
    value: "14,270",
    png: UilMoneyWithdrawal,
    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ]
  },
  {
    title: "Expenses",
    color: {
      background: "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #f9d59b",
    },
    barValue: 60,
    value: "4,270",
    png: UilReceiptAlt,
    series: [
      {
        name: "Expenses",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ]
  }
]
