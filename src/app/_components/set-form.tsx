"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateStatus } from "./actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";

export const statusSchema = z.object({
  status: z.string(),
});

export function SetStatusForm({ currentStatus }: { currentStatus: string }) {
  const form = useForm<z.infer<typeof statusSchema>>({
    resolver: zodResolver(statusSchema),
    defaultValues: {
      status: currentStatus,
    },
  });

  async function onSubmit(values: z.infer<typeof statusSchema>) {
    console.log(values);
    const res = await updateStatus(values.status);
    toast(res.message);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-2 md:flex-row"
      >
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  type="text"
                  placeholder="Status"
                  className="w-full max-w-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Status</Button>
      </form>
    </Form>
  );
}
