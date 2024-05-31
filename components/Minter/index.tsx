"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { useAccount, useWriteContract } from 'wagmi';
import { erc20ABI } from '@/app/abi/erc20Abi'; // Correct the import path for the ABI
import { parseEther } from "viem";
import BlockchainWatcher from '@/components/BlockchainWatcher'; // Correct the import path for BlockchainWatcher
import { useAtomValue } from 'jotai';
import { tokenApprovalSBTCAtom, tokenApprovalVBTCAtom } from '@/app/atom';
import { sBTC, vBTC } from "@/app/abi/addresses";

const Minter = ({ contractAddress, buttonText }) => {
  const [minting, setMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [mintError, setMintError] = useState(null);

  const tokenApprovalSBTC = useAtomValue(tokenApprovalSBTCAtom);
  const tokenApprovalVBTC = useAtomValue(tokenApprovalVBTCAtom);

  const { writeContract, isPending, isSuccess, isError, error: writeError } = useWriteContract();
  const { address } = useAccount();

  const handleMint = async () => {
    setMinting(true);
    setMintSuccess(false);
    setMintError(null);

    try {
      await writeContract({
        abi: erc20ABI,
        address: contractAddress,
        functionName: 'mint',
        args: [address, parseEther('100000')]
      });
      setMintSuccess(true);
    } catch (error) {
      setMintError(error);
    } finally {
      setMinting(false);
    }
  };

  const renderTokenApproval = () => {
    if (contractAddress === sBTC) {
      return <p>Token Approval sBTC: {tokenApprovalSBTC !== null ? tokenApprovalSBTC : 'Loading...'}</p>;
    } else if (contractAddress === vBTC) {
      return <p>Token Approval vBTC: {tokenApprovalVBTC !== null ? tokenApprovalVBTC : 'Loading...'}</p>;
    } else {
      return null;
    }
  };

  return (
    <div>
      <Button onClick={handleMint} disabled={minting}>
        {minting ? 'Minting...' : buttonText}
      </Button>
      {mintSuccess && <p>Minting successful!</p>}
      {isError && <p>Error: {writeError?.message}</p>}
      {renderTokenApproval()}
      <BlockchainWatcher />
    </div>
  );
}

export default Minter;
