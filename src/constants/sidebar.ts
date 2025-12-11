import home from "../../public/images/sidebar/home.png";
import auction from "../../public/images/sidebar/auction.png";
import calender from "../../public/images/sidebar/calender.png";
import search from "../../public/images/sidebar/search.png";
import mypage from "../../public/images/sidebar/mypage.png";
import alarm from "../../public/images/sidebar/alarm.png";
import message from "../../public/images/sidebar/message.png";

const defaultPath = "../../public/images/sidebar";

export const sidebarItems = [
  {
    path: "/",
    icon: home,
  },
  {
    path: "/auction",
    icon: auction,
  },
  {
    path: "/calender",
    icon: calender,
  },
  {
    path: "/search",
    icon: search,
  },
  {
    path: "/mypage",
    icon: mypage,
  },
  {
    path: "/alert",
    icon: alarm,
    badgeCount: 0,
  },
  {
    path: "/message",
    icon: message,
  },
];
