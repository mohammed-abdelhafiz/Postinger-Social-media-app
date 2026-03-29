"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { MobileNav } from "./MobileNav";
import { UserProfileItem } from "./UserProfileItem";
import { Nav } from "./Nav";
import { Logo } from "@/shared/components/shared/Logo";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    scrolled: {
      backdropFilter: "blur(20px)",
      backgroundColor:
        theme === "dark" ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    },
  };

  return (
    <motion.header
      className="transition-all duration-300 px-4"
      variants={headerVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        backgroundColor: isScrolled
          ? theme === "dark"
            ? "rgba(0, 0, 0, 0.8)"
            : "rgba(255, 255, 255, 0.8)"
          : "transparent",
        boxShadow: isScrolled ? "0 8px 32px rgba(0, 0, 0, 0.1)" : "none",
      }}
    >
      <div className="flex h-16 items-center justify-between md:h-20">
        <motion.div
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link
            prefetch={false}
            href="/"
            className="flex items-center space-x-2"
          >
            <Logo />
          </Link>
        </motion.div>

        <Nav />

        <div className="hidden md:flex">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <UserProfileItem />
          </motion.div>
        </div>

        <motion.button
          className="hover:bg-muted rounded-lg p-2 transition-colors duration-200 md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileNav setIsMobileMenuOpen={setIsMobileMenuOpen} />
        )}
      </AnimatePresence>
    </motion.header>
  );
}
