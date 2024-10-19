import { FilterItems, isFilterProps } from "@assets/props";
import React from "react";
import { RxCross2 } from "react-icons/rx";

interface SelectedCardProps {
  label: string;
  setFilter: (isFilter: isFilterProps) => void;
  isFilter: isFilterProps;
  item: "category" | "trademark" | "group";
}

const SelectedCard = ({
  label,
  setFilter,
  isFilter,
  item,
}: SelectedCardProps) => {
  return (
    <div className="text-white bg-mainOrange px-[5px] py-1 flex items-center gap-1">
      {label}
      <RxCross2
        className="text-[16px] cursor-pointer"
        onClick={() => {
          const rmCategory = isFilter[item].filter(
            (Citem) => Citem.label !== label
          );

          setFilter({ ...isFilter, [item]: rmCategory });
        }}
      />
    </div>
  );
};

export default SelectedCard;
