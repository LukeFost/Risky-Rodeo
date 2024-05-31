"use client";

import React, { useEffect } from 'react';
import { useReadContract, useAccount } from 'wagmi';
import { useAtom } from 'jotai';
import { tokenApprovalSBTCAtom, tokenApprovalVBTCAtom, errorAtom } from '@/app/atom';
import { getAddress } from 'viem';
import { erc20ABI } from '@/app/abi/erc20Abi';
import { sBTC, vBTC, managerAddress } from '@/app/abi/addresses';

const BlockchainWatcher: React.FC = () => {
  const { address: userAddress } = useAccount();
  const [, setTokenApprovalSBTC] = useAtom(tokenApprovalSBTCAtom);
  const [, setTokenApprovalVBTC] = useAtom(tokenApprovalVBTCAtom);
  const [, setError] = useAtom(errorAtom);

  const { data: approvalDataSBTC, refetch: refetchSBTC, error: errorSBTC } = useReadContract({
    abi: erc20ABI,
    address: sBTC,
    functionName: 'allowance',
    args: [userAddress ? getAddress(userAddress) : userAddress, managerAddress],
  });

  const { data: approvalDataVBTC, refetch: refetchVBTC, error: errorVBTC } = useReadContract({
    abi: erc20ABI,
    address: vBTC,
    functionName: 'allowance',
    args: [userAddress ? getAddress(userAddress) : userAddress, managerAddress],
  });

  useEffect(() => {
    if (approvalDataSBTC !== undefined) {
      setTokenApprovalSBTC(Number(approvalDataSBTC));
      setError(null);
    } else if (errorSBTC) {
      setError(errorSBTC.message);
    }
  }, [approvalDataSBTC, errorSBTC, setTokenApprovalSBTC, setError]);

  useEffect(() => {
    if (approvalDataVBTC !== undefined) {
      setTokenApprovalVBTC(Number(approvalDataVBTC));
      setError(null);
    } else if (errorVBTC) {
      setError(errorVBTC.message);
    }
  }, [approvalDataVBTC, errorVBTC, setTokenApprovalVBTC, setError]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetchSBTC();
      refetchVBTC();
    }, 10000); // Refetch every 10 seconds

    return () => clearInterval(interval);
  }, [refetchSBTC, refetchVBTC]);

  return null;
};

export default BlockchainWatcher;
