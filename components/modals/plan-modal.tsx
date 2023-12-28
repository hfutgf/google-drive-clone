"use client";
import { usePlan } from "@/hooks/use-plan";
import React from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import Image from "next/image";
import PlanCard from "../card/plan-card";

const PlanModal = () => {
  const { isOpen, onClose } = usePlan();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <Image
            src={"/images/one.png"}
            width={50}
            height={50}
            alt="one-image"
          />
        </DialogHeader>
        <div className="opacity-75 text-center">
          Choose the Google plan that's right for you
        </div>
        <div className="grid grid-cols-2 gap-4">
          {planArr.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const planArr = [
  {
    name: "Basic",
    description: "1.5 GB",
    price: "Free",
    options: "15 GB of storage",
  },
  {
    name: "Basic pro",
    description: "15 GB",
    price: "10",
    options:
      "100 GB of storage, Access to Google exprets, Share with up to 5 others. Extra member beznefits, More Google Photos editing features",
    priceId: "price_1OSGAqKnf95WGNtEGt4mkYjg",
  },
];
export default PlanModal;
