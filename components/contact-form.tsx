"use client";

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from './ui/button';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('sending');
    setErrorMessage('');

    try {
      await emailjs.sendForm(
        'service_rdgvc9s',
        'template_waugfxa',
        formRef.current,
        'pNjrs0uZg-C9-AauA'
      );
      setStatus('success');
      formRef.current.reset();

      // Reset back to idle after 4 seconds
      setTimeout(() => setStatus('idle'), 4000);
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error?.text || 'Something went wrong. Please try again.');

      // Reset back to idle after 4 seconds
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-[480px] md:ml-auto w-full z-10"
    >
      <input
        type="text"
        name="from_name"
        placeholder="Name"
        required
        className="w-full bg-white rounded-[12px] px-5 py-4 outline-none text-zinc-900 placeholder:text-[#8E9CA9] font-sans text-[14px] focus:ring-2 focus:ring-white/30 transition-all"
      />
      <input
        type="email"
        name="from_email"
        placeholder="Email"
        required
        className="w-full bg-white rounded-[12px] px-5 py-4 outline-none text-zinc-900 placeholder:text-[#8E9CA9] font-sans text-[14px] focus:ring-2 focus:ring-white/30 transition-all"
      />
      <textarea
        name="message"
        placeholder="Type your message here"
        rows={6}
        required
        className="w-full bg-white rounded-[12px] px-5 py-4 outline-none text-zinc-900 placeholder:text-[#8E9CA9] font-sans text-[14px] resize-none focus:ring-2 focus:ring-white/30 transition-all"
      />

      <Button
        type="submit"
        disabled={status === 'sending'}
        className="h-14 w-full bg-white text-[#0B70F8] hover:bg-white/90 disabled:opacity-70 font-semibold text-[15px] transition-all duration-200"
      >
        {status === 'sending' && (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </span>
        )}
        {status === 'success' && (
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Message Sent!
          </span>
        )}
        {status === 'error' && (
          <span className="inline-flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Failed — Try Again
          </span>
        )}
        {status === 'idle' && 'Submit'}
      </Button>

      {status === 'error' && errorMessage && (
        <p className="text-white/80 text-[13px] font-sans text-center">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
