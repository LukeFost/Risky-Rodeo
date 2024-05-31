"use client";

import React from 'react';
import { useAtomValue } from 'jotai';
import { btcAmountAtom, minMaxBoundsAtom, sbtcBorrowAtom } from '@/app/atom'; // Correct the import path for atoms

const WatcherComponent: React.FC = () => {
  const btcAmount = useAtomValue(btcAmountAtom);
  const minMaxBounds = useAtomValue(minMaxBoundsAtom);
  const sbtcBorrow = useAtomValue(sbtcBorrowAtom);

  return (
    <div>
      <p>BTC Amount: {btcAmount}</p>
      <p>Min and Max Bounds: {minMaxBounds.join(', ')}</p>
      <p>sBTC Borrow: {sbtcBorrow}</p>
    </div>
  );
};

export default WatcherComponent;
