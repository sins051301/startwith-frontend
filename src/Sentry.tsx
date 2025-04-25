'use client';

import React, { ReactNode } from 'react';
import * as Sentry from '@sentry/nextjs';
import SentryFallback from './components/SentryFallback';

type Props = {
  children: ReactNode;
};

function SentryProvider({ children }: Props) {
  return (
    <Sentry.ErrorBoundary fallback={SentryFallback}>
      {children}
    </Sentry.ErrorBoundary>
  );
}

export default SentryProvider;
