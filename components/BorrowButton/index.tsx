"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { getAddress, parseEther } from "viem";
import { managerAbi } from "@/app/abi/managerABI";
import { managerAddress } from "@/app/abi/addresses";
import { formatUnits, parseUnits } from 'viem';

const BorrowButton = () => {
  const { address: userAddress } = useAccount();
  const [tokensDeposited, setTokensDeposited] = useState<bigint | null>(null);
  const [amountBorrowed, setAmountBorrowed] = useState<bigint | null>(null);
  const [borrowAmount, setBorrowAmount] = useState<string>("");

  // Use useReadContract to get the current position
  const { data: positionData, refetch: refetchPosition } = useReadContract({
    abi: managerAbi,
    address: managerAddress,
    functionName: 'getPosition',
    args: [userAddress],
  });

  useEffect(() => {
    if (positionData) {
      setTokensDeposited(BigInt(positionData.tokensDeposited));
      setAmountBorrowed(BigInt(positionData.amountBorrowed));
    }
  }, [positionData]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetchPosition();
    }, 10000); // Refetch every 10 seconds

    return () => clearInterval(interval);
  }, [refetchPosition]);

  // Use useWriteContract for borrowing
  const { writeContract, isPending, isSuccess, isError, error: writeError } = useWriteContract();

  const handleBorrow = async () => {
    try {
      const borrowAmountWei = parseUnits(borrowAmount, 18); // Convert ether to wei
      await writeContract({
        abi: managerAbi,
        address: managerAddress,
        functionName: 'borrow',
        args: [borrowAmountWei],
      });
      console.log("Borrow successful");
    } catch (error) {
      console.error("Borrow failed", error);
    }
  };

  return (
    <div>
      <div>
        <p>Tokens Deposited: {tokensDeposited !== null ? formatUnits(tokensDeposited, 18) : 'Loading...'}</p>
        <p>Amount Borrowed: {amountBorrowed !== null ? formatUnits(amountBorrowed, 18) : 'Loading...'}</p>
      </div>
      <div>
        <Input
          type="number"
          placeholder="Enter amount to borrow"
          value={borrowAmount}
          onChange={(e) => setBorrowAmount(e.target.value)}
        />
        <Button onClick={handleBorrow} disabled={isPending || !borrowAmount}>
          {isPending ? 'Borrowing...' : 'Borrow sBTC'}
        </Button>
      </div>
      {isError && (
        <p>Error: {writeError?.message}</p>
      )}
    </div>
  );
};

export default BorrowButton;
