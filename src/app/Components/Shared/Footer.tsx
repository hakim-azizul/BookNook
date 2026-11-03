"use client";

import React from "react";
import Link from "next/link";
import {
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-gray-300 pt-12 sm:pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Flex Section: Logo/Short line/Socials vs Contact Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-10 pb-10 sm:pb-12 border-b border-gray-800">
          {/* Logo, Description & Socials */}
          <div className="space-y-4 max-w-md">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-[#ff0018] text-3xl">
                <Image
                  src="/BookNook_light.png"
                  width={30}
                  height={30}
                  alt="BookNook Logo"
                />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                Book<span className="text-[#ff0018]">Nook</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your digital space to borrow, share, and discover amazing books. Connect with fellow book lovers. Read continuously, share insights, and grow community all in one place.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-[#ff0018] hover:text-white transition-all"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="X Twitter"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-[#ff0018] hover:text-white transition-all"
              >
                <FaXTwitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-[#ff0018] hover:text-white transition-all"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Pinterest"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-[#ff0018] hover:text-white transition-all"
              >
                <FaPinterestP className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Contact Info
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-[#ff0018] font-bold text-lg sm:text-xl">
                <FaPhoneAlt className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span className="break-all sm:break-normal">+880 1551 2376 4879</span>
              </div>
              <p className="text-gray-400 text-xs">
                Monday – Friday: 9:00-20:00
                <br />
                Saturday: 11:00 – 15:00
              </p>
              <p className="text-white font-medium pt-1">contact@booknook.com</p>
            </div>
          </div>
        </div>

        {/* Copyright Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>&copy; 2026 BookNook. Created by Azizul Hakim</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
