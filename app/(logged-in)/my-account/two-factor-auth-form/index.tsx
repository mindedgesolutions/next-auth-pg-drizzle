'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { get2FaSecret } from '../actions';
import { toast } from 'sonner';
import { QRCodeCanvas } from 'qrcode.react';

export default function TwoFactorAuthForm({ active }: { active: boolean }) {
  const [isactivated, setIsActivated] = useState(active);
  const [step, setStep] = useState(1);
  const [generatedSecret, setGeneratedSecret] = useState<string | null>(null);

  const handleEnable = async () => {
    const response = await get2FaSecret();

    if (response.error) {
      return toast.error(response.message);
    }

    setStep(2);
    setGeneratedSecret(response.twoFactorSecret ?? '');
  };

  return (
    <div>
      {!isactivated && (
        <div>
          {step === 1 && (
            <Button
              type="button"
              className="mt-6 capitalize"
              onClick={() => handleEnable()}
            >
              enable two-factor authentication
            </Button>
          )}
          {step === 2 && (
            <div className="flex flex-col gap-1 mt-4">
              <p className="text-muted-foreground text-sm tracking-wide my-3">
                Scan the QR below in Google authenticator app to activate
                Two-Factor authentication
              </p>
              <QRCodeCanvas value={generatedSecret as string} />
              <div className="mt-4 flex gap-4">
                <Button type="button" onClick={() => setStep(3)}>
                  I have scanned the QR code
                </Button>
                <Button
                  type="button"
                  variant={'outline'}
                  onClick={() => setStep(1)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
