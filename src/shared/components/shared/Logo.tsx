"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";

export const Logo = (props: HTMLMotionProps<"div">) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      {...props}
      className={cn("flex flex-row items-center gap-3 cursor-pointer group select-none whitespace-nowrap", props.className)}
    >
      <div className="relative size-9 flex items-center justify-center">
        {/* Layer 1: Background Glow */}
        <div className="absolute inset-0 bg-primary/20 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-500 blur-sm" />
        
        {/* Layer 2: Frosted Glass */}
        <div className="absolute inset-0 bg-background/40 backdrop-blur-md border border-foreground/10 rounded-xl shadow-lg" />
        
        {/* Layer 3: The Icon (A sharp 'P' fragment) */}
        <svg 
           viewBox="0 0 24 24" 
           className="relative size-5 text-primary" 
           fill="none" 
           stroke="currentColor" 
           strokeWidth="3" 
           strokeLinecap="round" 
           strokeLinejoin="round"
        >
          <path d="M5 3v18" />
          <path d="M5 3h10c3 0 5 2 5 5s-2 5-5 5H5" />
          <motion.circle 
            cx="15" cy="8" r="1.5" 
            className="fill-primary"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
      </div>
      
      <div className="flex flex-col">
        <span className="text-xl font-black tracking-[0.2em] uppercase text-foreground leading-none">
          Post<span className="text-primary group-hover:text-primary/80 transition-colors">inger</span>
        </span>
        <div className="h-[1px] w-0 group-hover:w-full bg-primary transition-all duration-700 mt-1 opacity-50" />
      </div>
    </motion.div>
  );
};
