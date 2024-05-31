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
import { Input } from "../ui/input"; // Correct the import path for Input
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { DoubleSlider } from "../DoubleSlider";

const formSchema = z.object({
  btcAmount: z.number().positive(),
  minMaxBounds: z.tuple([z.number(), z.number()]),
  sbtcBorrow: z.number().positive(),
});

export default function AddBTCForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      btcAmount: 0,
      minMaxBounds: [0, 100],
      sbtcBorrow: 0,
    },
  });

  const { control } = form;

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
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
          name="minMaxBounds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Min and Max Bounds</FormLabel>
              <FormControl>
                <Controller
                  name="minMaxBounds"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DoubleSlider
                      minValue={value[0]}
                      maxValue={value[1]}
                      onValueChange={onChange}
                    />
                  )}
                />
              </FormControl>
              <FormDescription>
                Adjust the minimum and maximum bounds.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="sbtcBorrow"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount of sBTC to Borrow</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter sBTC amount"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormControl>
                <Controller
                  name="sbtcBorrow"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Slider
                      min={0}
                      max={100}
                      value={[value]} // Assuming a single value, not a range
                      onValueChange={(newValue) => onChange(newValue[0])}
                    />
                  )}
                />
              </FormControl>
              <FormDescription>
                Enter the amount of sBTC you want to borrow.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
