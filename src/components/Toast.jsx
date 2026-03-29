import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useMenu } from '../context/MenuContext';

export default function Toast() {
  const { toast } = useMenu();

  if (!toast) return null;

  return (
    <div
      className={`toast toast-${toast.type}`}
      role="status"
      aria-live="polite"
    >
      {toast.type === 'success'
        ? <CheckCircle2 size={18} />
        : <AlertCircle size={18} />}
      {toast.message}
    </div>
  );
}
