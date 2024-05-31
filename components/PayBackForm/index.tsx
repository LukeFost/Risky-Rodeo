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
import { sbtcPayBackAtom, tokenApprovalAtom, errorAtom } from '@/app/atom'; // Correct the import path for atoms
import React, { useState, useEffect } from "react";
import BlockchainWatcher from '@/components/BlockchainWatcher'; // Correct the import path for BlockchainWatcher
import { useWriteContract } from 'wagmi';
import { getAddress, parseEther } from "viem";
import { erc20ABI } from '@/app/abi/erc20Abi'; // Correct the import path for the ABI

const formSchema = z.object({
  sbtcPayBack: z.number().positive(),
});

const rawContractAddress = '0xA7c167f58833C5e25848837F45a1372491a535ED';
const contractAddress = getAddress(rawContractAddress); // Ensure the address is checksummed

export default function PayBackForm() {
  const [sbtcPayBack, setSbtcPayBack] = useAtom(sbtcPayBackAtom);
  const [submittedValue, setSubmittedValue] = useState<number | null>(null);
  const tokenApproval = useAtomValue(tokenApprovalAtom);
  const error = useAtomValue(errorAtom);

  // Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sbtcPayBack,
    },
  });

  const { control } = form;

  // Define the approval amount
  const approvalAmount = parseEther('100000000000000000');

  // Use useWriteContract for approval
  const { writeContract, isPending, isSuccess, isError, error: writeError } = useWriteContract();

  // Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Save form values to Jotai state.
    setSbtcPayBack(values.sbtcPayBack);
    setSubmittedValue(values.sbtcPayBack);

    // Do something with the form values.
    console.log(values);

    // Connect this to wagmi or other logic here
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={control}
            name="sbtcPayBack"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount of sBTC to Pay Back</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter sBTC amount"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Enter the amount of sBTC you want to pay back.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {tokenApproval < approvalAmount ? (
            <Button
              onClick={() => writeContract({
                abi: erc20ABI,
                address: contractAddress,
                functionName: 'approve',
                args: [contractAddress, approvalAmount],
              })}
              disabled={isPending}
            >
              {isPending ? 'Approving...' : isSuccess ? 'Success!' : 'Approve'}
            </Button>
          ) : (
            <Button
            onClick={() => writeContract({
              abi:erc20ABI,
              address: contractAddress,
              functionName: 'transfer',
              args: [contractAddress,parseEther('1')]
            })}
            type="submit">Submit</Button>
          )}
        </form>
        {submittedValue !== null && (
          <p>
            The updated sBTC Pay Back value is: {sbtcPayBack}
          </p>
        )}
        {tokenApproval !== null && (
          <p>
            Current Token Approval: {tokenApproval}
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
