"use client";

import backgroundImg from "@/assets/home/bannerBackground.svg";
import grandFather from "@/assets/home/frontGrandpapa.svg";
import Image from "next/image";
import live from "@/assets/home/redLive.svg";

import { motion } from "framer-motion";

export default function HomeBanner() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
      <section className="bg-content-area relative mb-5 h-[220px] w-full overflow-hidden rounded-sm sm:h-[240px] md:h-[300px] lg:h-[360px] xl:h-[420px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          <Image
            src={backgroundImg}
            alt="stage background"
            priority
            fill
            className="object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -6, y: 20 }}
          animate={{ opacity: 1, scale: 0.9, rotate: -3, y: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="bg-bg-main border-border-main absolute top-4 left-3 flex w-[90%] flex-col items-center justify-center rounded-xl border-3 px-6 py-4 shadow-[2px_2px_0_#A1887F] sm:top-5 sm:left-10 sm:w-[450px] md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rotate-0 lg:top-40 lg:left-90 lg:w-[570px] lg:-rotate-3"
        >
          <div>
            <p className="text-custom-dark-brown text-[32px] font-bold sm:text-[44px] lg:text-[65px]">
              지금, 경매가
            </p>
            <p className="text-custom-dark-brown text-[32px] font-bold sm:ml-20 sm:text-[44px] lg:text-[65px]">
              시작됩니다!
            </p>
          </div>

          <p className="text-text-white-brown mt-2 text-[16px] sm:text-[18px] lg:text-[25px]">
            실시간으로 참여하는 짜릿한 라이브 경매의 무대!
          </p>
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="border-border-main bg-home-banner-sub absolute bottom-7 left-35 hidden h-[55px] w-[410px] rotate-3 items-center justify-center rounded-xl border-3 xl:flex"
        >
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <Image src={live} alt="빨간 불" width={30} height={30} />
          </motion.div>
          <p className="text-custom-dark-brown text-[25px]">10분 전부터 입장 가능</p>
        </motion.div>
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            delay: 0.4,
            duration: 0.5,
            ease: "easeOut",
          }}
          className="absolute -right-7 hidden lg:block xl:right-20"
        >
          <Image src={grandFather} alt="grandfather" width={440} height={590} />
        </motion.div>
      </section>
    </motion.div>
  );
}
