import home from "@/assets/images/sidebar/home.png";
import auction from "@/assets/images/sidebar/auction.png";
import calendar from "@/assets/images/sidebar/calendar.png";
import search from "@/assets/images/sidebar/search.png";
import alarm from "@/assets/images/sidebar/alarm.png";
import message from "@/assets/images/sidebar/message.png";

export const sidebarItems = [
  {
    path: "/",
    icon: home,
    label: "홈",
  },
  {
    path: "/auction",
    icon: auction,
    label: "경매",
  },
  {
    path: "/schedule",
    icon: calendar,
    label: "시간표",
  },
  {
    path: "/search",
    icon: search,
    label: "검색",
  },
  {
    path: "/notify",
    icon: alarm,
    badgeCount: 0,
    label: "알림",
  },
  {
    path: "/message",
    icon: message,
    label: "채팅",
  },
];
