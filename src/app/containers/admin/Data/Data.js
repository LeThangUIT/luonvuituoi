// Sidebar imports
import {UilTicket, UilEstate, UilBill, UilUsersAlt, UilStore, UilListUl, UilUsdSquare, UilMoneyWithdrawal, UilReceiptAlt} from '@iconscout/react-unicons'

import img1 from '../../../assets/images/Rose.jpg';
import img2 from '../../../assets/images/Lisa.jpg';
import img3 from '../../../assets/images/Jisoo.jpg';


export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Dashboard",
    path: ""
  },
  {
    icon: UilStore,
    heading: "Products",
    path: "product"
  },
  {
    icon: UilListUl,
    heading: "Category",
    path: "category"
  },
  {
    icon: UilBill,
    heading: "Invoices",
    path: "invoice"
  },
  {
    icon: UilTicket,
    heading: "Vouchers",
    path: "voucher"
  },
  {
    icon: UilUsersAlt,
    heading: "Users",
    path: "user"
  },

]

export const CardsData = [
  {
    title: "Sales",
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

export const UpdatesData = [
  {
    img: img1,
    name: "Andrew Thomas",
    noti: "has ordered Apple smart watch 2500mh battery. ",
    time: "25 seconds ago"
  },
  {
    img: img2,
    name: "James Bond",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago"
  },
  {
    img: img3,
    name: "Iron Man",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago"
  }
]