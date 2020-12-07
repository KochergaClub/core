import { useEffect, useRef } from 'react';

export const useFocusOnFirstInput = () => {
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!formRef.current) {
        return; // huh, form is still not ready
      }
      const maybeInput = formRef.current.querySelector('input, textarea') as
        | HTMLInputElement
        | HTMLTextAreaElement
        | null;
      if (maybeInput && 'focus' in maybeInput) {
        maybeInput.focus();
      }
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return formRef;
};
