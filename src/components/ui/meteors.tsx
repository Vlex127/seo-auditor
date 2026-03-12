"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>([]);

  useEffect(() => {
    const styles = new Array(number || 20).fill(0).map(() => ({
      top: Math.random() * 100 + "vh",
      left: Math.random() * 100 + "vw",
      animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
      animationDuration: Math.random() * (10 - 2) + 2 + "s",
    }));
    setMeteorStyles(styles);
  }, [number]);

  if (meteorStyles.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 z-0 h-full w-full pointer-events-none"
    >
      {meteorStyles.map((style, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute h-0.5 w-[2px] rounded-[9999px] bg-amber-400 shadow-[0_0_0_1px_#fbbf2430]",
            "before:absolute before:top-1/2 before:h-[2px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-amber-400 before:to-transparent before:content-['']",
            className,
          )}
          style={style}
        ></span>
      ))}
    </motion.div>
  );
};
