import home from "@/assets/images/sidebar/home.png";
import auction from "@/assets/images/sidebar/auction.png";
import calendar from "@/assets/images/sidebar/calendar.png";
import search from "@/assets/images/sidebar/search.png";
import mypage from "@/assets/images/sidebar/mypage.png";
import alarm from "@/assets/images/sidebar/alarm.png";
import message from "@/assets/images/sidebar/message.png";

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
    path: "/schedule",
    icon: calendar,
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
    path: "/nofity",
    icon: alarm,
    badgeCount: 0,
  },
  {
    path: "/message",
    icon: message,
  },
];
