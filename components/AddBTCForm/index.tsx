"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAtom, useAtomValue } from 'jotai';
import { btcAmountAtom, symBoundsAtom, tokenApprovalAtom, errorAtom } from '@/app/atom'; // Correct the import path for atoms
import React, { useState } from "react";
import BlockchainWatcher from '@/components/BlockchainWatcher'; // Correct the import path for BlockchainWatcher
import { useWriteContract } from 'wagmi';
import { getAddress, parseEther } from "viem";
import { erc20ABI } from '@/app/abi/erc20Abi'; // Correct the import path for the ABI
import { BTC, managerAddress } from "@/app/abi/addresses"; // Correct the import path for the contract address
import { managerAbi } from "@/app/abi/managerABI";

const formSchema = z.object({
  btcAmount: z.number().positive(),
  symBounds: z.number().positive(),
});

const contractAddress = getAddress(BTC); // Ensure the address is checksummed

export default function AddBTCForm() {
  const [btcAmount, setBtcAmount] = useAtom(btcAmountAtom);
  const [symBounds, setSymBounds] = useAtom(symBoundsAtom);
  const tokenApproval = useAtomValue(tokenApprovalAtom);
  const error = useAtomValue(errorAtom);

  const [submittedValue, setSubmittedValue] = useState<number | null>(null);

  // Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      btcAmount,
      symBounds,
    },
  });

  const { control } = form;

  // Define the approval amount
  const approvalAmount = parseEther('100000000000000000');

  // Use useWriteContract for approval and deposit
  const { writeContract, isPending, isSuccess, isError, error: writeError } = useWriteContract();

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Save form values to Jotai state.
    setBtcAmount(values.btcAmount);
    setSymBounds(values.symBounds);
    setSubmittedValue(values.btcAmount);

    // Do something with the form values.
    console.log(values);

    // Connect this to wagmi or other logic here
    try {
      await writeContract({
        abi: managerAbi,
        address: managerAddress,
        functionName: 'deposit',
        args: [parseEther(values.btcAmount.toString()), values.symBounds, true]
      });
      console.log("Deposit successful");
    } catch (error) {
      console.error("Deposit failed", error);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={control}
            name="btcAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount of BTC</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter BTC amount"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Enter the amount of BTC you want to use.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="symBounds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sym Bounds</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter Sym Bounds"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Enter the Sym Bounds value.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
           <div className="space-x-4">
            <Button
              onClick={() => writeContract({
                abi: erc20ABI,
                address: contractAddress,
                functionName: 'approve',
                args: [managerAddress, approvalAmount],
              })}
              disabled={isPending}
            >
              {isPending ? 'Approving...' : isSuccess ? 'Success!' : 'Approve'}
            </Button>
            <Button type="submit">
              Submit
            </Button>
          </div>
        </form>
        {submittedValue !== null && (
          <p>
            The updated BTC Amount value is: {btcAmount}
          </p>
        )}
        {isError && (
          <p>
            Error: {writeError?.message}
          </p>
        )}
      </Form>
      <BlockchainWatcher />
    </div>
  );
}
