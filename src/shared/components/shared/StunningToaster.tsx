"use client";

import { Toaster, toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Info, AlertCircle, X, Loader2 } from "lucide-react";

export const StunningToaster = () => {
  return (
    <Toaster position="bottom-center">
      {(t) => (
        <AnimatePresence mode="wait">
          {t.visible && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.98 }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              className={`
                flex items-center gap-3 px-4 py-2.5 rounded-2xl
                bg-card/90 backdrop-blur-xl border border-border
                text-card-foreground shadow-xl dark:shadow-primary/5
                min-w-[280px] max-w-[90vw] md:max-w-md pointer-events-auto
                ring-1 ring-foreground/5
              `}
              style={{
                 ...t.style,
              }}
            >
              <div className="flex shrink-0">
                {t.type === 'success' && (
                   <div className="bg-primary/10 text-primary rounded-full p-1">
                     <Check size={14} strokeWidth={3} />
                   </div>
                )}
                {t.type === 'error' && (
                   <div className="bg-destructive/10 text-destructive rounded-full p-1">
                     <AlertCircle size={14} strokeWidth={3} />
                   </div>
                )}
                {t.type === 'loading' && (
                   <Loader2 size={16} className="text-primary animate-spin" />
                )}
                {t.type === 'blank' && (
                   <Info size={16} className="text-muted-foreground" />
                )}
              </div>
              
              <span className="text-sm font-medium tracking-tight flex-1">
                {typeof t.message === 'function' ? t.message(t) : t.message}
              </span>

              {t.type !== 'loading' && (
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="p-1 hover:bg-foreground/5 rounded-full transition-colors opacity-40 hover:opacity-100"
                >
                  <X size={14} />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </Toaster>
  );
};
