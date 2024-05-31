"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import React, { useState } from "react";
import BlockchainWatcher from '@/components/BlockchainWatcher'; // Correct the import path for BlockchainWatcher
import { useWriteContract } from 'wagmi';
import { getAddress, parseEther, formatUnits } from "viem";
import { erc20ABI } from '@/app/abi/erc20Abi'; // Correct the import path for the ABI
import { managerAddress, sBTC } from "@/app/abi/addresses";
import { managerAbi } from "@/app/abi/managerABI";

const formSchema = z.object({
  sbtcPayBack: z.number().positive(),
});


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
  const { writeContract: writeApprove, isPending: isPendingApprove, isSuccess: isSuccessApprove, isError: isErrorApprove, error: writeErrorApprove } = useWriteContract();
  
  // Use useWriteContract for payback
  const { writeContract: writePayBack, isPending: isPendingPayBack, isSuccess: isSuccessPayBack, isError: isErrorPayBack, error: writeErrorPayBack } = useWriteContract();

  // Define an approval handler.
  const handleApprove = async () => {
    try {
      await writeApprove({
        abi: erc20ABI,
        address: getAddress(sBTC),
        functionName: 'approve',
        args: [managerAddress, approvalAmount],
      });
      console.log('Approval successful');
    } catch (error) {
      console.error('Approval failed', error);
    }
  };

  // Define a submit handler.
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    // Save form values to Jotai state.
    setSbtcPayBack(values.sbtcPayBack);
    setSubmittedValue(values.sbtcPayBack);

    // Do something with the form values.
    console.log(values);

    try {
      await writePayBack({
        abi: managerAbi,
        address: managerAddress,
        functionName: 'payBack',
        args: [parseEther(values.sbtcPayBack.toString())],
      });
      console.log('PayBack successful');
    } catch (error) {
      console.error('PayBack failed', error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
          <div className="space-x-4">
            <Button
              onClick={handleApprove}
            >
              {isPendingApprove ? 'Approving...' : isSuccessApprove ? 'Approved' : 'Approve'}
            </Button>
            <Button type="submit">
              {isPendingPayBack ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
        {submittedValue !== null && (
          <p>
            The updated sBTC Pay Back value is: {sbtcPayBack}
          </p>
        )}
        {isErrorApprove && (
          <p>
            Error during approval: {writeErrorApprove?.message}
          </p>
        )}
        {isErrorPayBack && (
          <p>
            Error during payback: {writeErrorPayBack?.message}
          </p>
        )}
      </Form>
      <BlockchainWatcher />
    </div>
  );
}
