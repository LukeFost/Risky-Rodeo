"use client";

import React, { useEffect } from 'react';
import { useReadContract, useAccount } from 'wagmi';
import { useAtom } from 'jotai';
import { tokenApprovalAtom, errorAtom } from '@/app/atom';
import { getAddress } from 'viem';
import { erc20ABI } from '@/app/abi/erc20Abi';

const rawContractAddress = '0xA7c167f58833C5e25848837F45a1372491a535ED';
const contractAddress = getAddress(rawContractAddress); // Ensure the address is checksummed

const BlockchainWatcher: React.FC = () => {
  const { address: userAddress } = useAccount();
  const [, setTokenApproval] = useAtom(tokenApprovalAtom);
  const [, setError] = useAtom(errorAtom);

  const { data: approvalData, refetch, error } = useReadContract({
    abi: erc20ABI,
    address: contractAddress,
    functionName: 'allowance',
    args: [userAddress ? getAddress(userAddress) : userAddress, contractAddress],
  });

  useEffect(() => {
    if (approvalData !== undefined) {
      setTokenApproval(Number(approvalData));
      setError(null);
    } else if (error) {
      setError(error.message);
    }
  }, [approvalData, error, setTokenApproval, setError]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10000); // Refetch every 10 seconds

    return () => clearInterval(interval);
  }, [refetch]);

  return null;
};

export default BlockchainWatcher;

//TODO: Integrate approval with submit button
//TODO: Get all token Balances