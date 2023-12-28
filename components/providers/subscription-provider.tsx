"use client";
import { useSubscription } from "@/hooks/use-subscription";
import { LayoutChildProps } from "@/types";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect } from "react";

const SubscriptionProvider = ({ children }: LayoutChildProps) => {
  const { user, isLoaded } = useUser();
  const { setIsLoading, setSubsription } = useSubscription();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        `/api/subscription?email=${user?.emailAddresses[0].emailAddress}`
      );
      setSubsription(data);
      setIsLoading(false);
    };
    if (isLoaded) {
      getData();
    }
  }, [user, isLoaded]);
  return children;
};

export default SubscriptionProvider;
