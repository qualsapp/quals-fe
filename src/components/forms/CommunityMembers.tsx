"use client";
import React from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const level = ["beginner", "intermediate", "advanced"];

const memberSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    skill: z.enum(level).or(z.string()),
  })
  .superRefine(({ skill }, ctx) => {
    if (skill === "") {
      ctx.addIssue({
        path: ["skill"],
        code: "custom",
        message: "Skill is required",
      });
    }

    if (!level.includes(skill.toLocaleLowerCase())) {
      ctx.addIssue({
        path: ["skill"],
        code: "custom",
        message: "Skill must be a valid level",
      });
    }
  });

const membersSchema = z.object({
  members: z.array(memberSchema),
});

const Member = ({
  index,
  form,
  onRemoveSchedule,
}: {
  index: number;
  form: UseFormReturn<z.infer<typeof membersSchema>>;
  onRemoveSchedule: (index: number) => void;
}) => {
  return (
    <div className="flex flex-row gap-3">
      <FormField
        control={form.control}
        name={`members.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Member name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`members.${index}.skill`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select one of the level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {level.map((lvl) => (
                      <SelectItem value={lvl} key={lvl} className="capitalize">
                        {lvl}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button
        variant="outline"
        className="rounded-full text-lg text-destructive border-destructive hover:bg-destructive hover:text-white transition-colors"
        size="icon-sm"
        type="button"
        onClick={() => onRemoveSchedule(index)}
      >
        -
      </Button>
    </div>
  );
};

const CommunityMembersForm = () => {
  const form = useForm<z.infer<typeof membersSchema>>({
    resolver: zodResolver(membersSchema),
    defaultValues: {
      members: [{ name: "", skill: "" }],
    },
  });

  const onSubmit = (data: z.infer<typeof membersSchema>) => {
    console.log(data);
  };

  const handleRemoveSchedule = (index: number) => {
    const members = form.getValues("members");
    members.splice(index, 1);
    form.setValue("members", members);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="border lg:p-8 rounded-md ">
          <div className="space-y-3">
            {form.watch("members").map((item, index) => (
              <Member
                form={form}
                index={index}
                key={index}
                onRemoveSchedule={handleRemoveSchedule}
              />
            ))}
          </div>

          <div className="text-right ">
            <Button
              type="button"
              variant="link"
              onClick={() =>
                form.trigger().then(() => {
                  if (form.formState.isValid) {
                    form.setValue("members", [
                      ...form.watch("members"),
                      { name: "", skill: "" },
                    ]);
                  }
                })
              }
            >
              + Add Another Member
            </Button>
          </div>
        </div>

        <div className="text-right flex justify-between items-center">
          <Button type="button" variant="outline">
            Back
          </Button>
          <Button type="submit">Finish</Button>
        </div>
      </form>
    </Form>
  );
};

export default CommunityMembersForm;
