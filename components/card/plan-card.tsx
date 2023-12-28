"use client";
import React from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Check } from "lucide-react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { useSubscription } from "@/hooks/use-subscription";

interface Props {
  plan: {
    name: string;
    description: string;
    price: string;
    options: string;
    priceId?: string;
  };
}

const PlanCard = ({ plan }: Props) => {
  const { user } = useUser();
  const { subscription } = useSubscription();

  const onSubmit = () => {
    const promise = axios
      .post(`/api/subscription`, {
        email: user?.emailAddresses[0].emailAddress,
        fullName: user?.fullName,
        userId: user?.id,
        priceId: plan.priceId,
      })
      .then((res) => {
        return window.open(res.data, "_blank");
      });

    toast.promise(promise, {
      loading: "Loading...",
      success: "Subscribed!",
      error: "Error subscribing!",
    });
  };

  return (
    <div className="border rounded-md p-4">
      <h1 className="text-center text-xl">{plan.name}</h1>
      <div className="text-center mt-4 text-3xl">{plan.description}</div>
      <div className="flex justify-center items-baseline my-8">
        <span className="text-5xl font-extralight mr-2">
          {plan.price !== "Free" ? "$" : ""}
          {plan.price}
        </span>
        <span className="text-gray-500 dark:text-gray-400">/month</span>
      </div>
      {plan.priceId ? (
        <div className="w-full flex justify-center">
          <Button onClick={onSubmit}>
            {subscription === "Basic" ? "Get offer" : "Manage subscription"}
          </Button>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <Button
            variant={subscription === "Basic" ? "destructive" : "default"}
            disabled={subscription !== "Pro"}
            onClick={onSubmit}
          >
            {subscription === "Basic" ? "Current plan" : "Manage subscription"}
          </Button>
        </div>
      )}
      <Separator className="mt-4" />
      <p className="mt-3  opacity-75 text-sm">Google One includes</p>
      <div className="flex flex-col space-y-2 mt-4">
        {plan.options.split(",").map((option) => (
          <div key={option} className="flex items-center">
            <Check className="mr-2" size={16} />
            <span className="text-sm">{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanCard;
