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
import React, { useEffect, useState } from "react";
import BlockchainWatcher from '@/components/BlockchainWatcher'; // Correct the import path for BlockchainWatcher
import { parseEther } from "viem";

const formSchema = z.object({
  sbtcPayBack: z.number().positive(),
});

export default function PayBackForm() {
  const [sbtcPayBack, setSbtcPayBack] = useAtom(sbtcPayBackAtom);
  const [submittedValue, setSubmittedValue] = useState<number | null>(null);
  const tokenApproval = useAtomValue(tokenApprovalAtom);
  const error = useAtomValue(errorAtom);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sbtcPayBack,
    },
  });

  const { control } = form;

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Save form values to Jotai state.
    setSbtcPayBack(values.sbtcPayBack);
    setSubmittedValue(values.sbtcPayBack);

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
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
          {tokenApproval < parseEther('100') || null ? <Button>Approve</Button> : <Button type="submit">Submit</Button>}
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
        {error && (
          <p>
            Error: {error}
          </p>
        )}
      </Form>
      <BlockchainWatcher />
    </div>
  );
}
