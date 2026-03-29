import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useMenu } from '../context/MenuContext';

export default function Toast() {
  const { toast } = useMenu();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.message}
          className={`toast toast-${toast.type}`}
          initial={{ opacity: 0, y: 20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, x: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          role="status"
          aria-live="polite"
        >
          {toast.type === 'success'
            ? <CheckCircle2 size={18} />
            : <AlertCircle size={18} />}
          {toast.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
