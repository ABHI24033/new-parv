import { Button } from "@/components/ui/button";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export default function Filter({ arr, id, setValue, column }) {
  console.log(arr);

  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-row items-start justify-start gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {arr.filter((e) => e.isChecked).length > 0
              ? `${column.columnDef.header} (${arr.filter((e) => e.isChecked).length})`
              : `Select ${column.columnDef.header}...`}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder={`Search ...${column.columnDef.header}`} />
            <CommandList>
              <CommandEmpty>No Item found.</CommandEmpty>
              <CommandGroup>
                {arr.map((item, index) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      setValue((filterState) => {
                        let newState = {
                          ...filterState,
                          [id]: [...filterState[id]], // Create a new array for the nested structure
                        };

                        // let newState = { ...filterState };
                        // let index = filterState[id].findIndex(
                        //   (item) => item.value == currentValue
                        // );
                        let isChecked = newState[id][index].isChecked;
                        console.log("old state", newState);

                        newState[id][index] = {
                          ...newState[id][index],
                          isChecked: !isChecked,
                        };

                        // newState[id][index].isChecked = !isChecked;
                        console.log("new state", newState);
                        return newState;
                      });

                      let filterValue = column.getFilterValue();
                      let isIncluded = filterValue.indexOf(currentValue);
                      console.log("filterValue", filterValue);
                      if (isIncluded == -1) {
                        column.setFilterValue([...filterValue, currentValue]);
                      } else {
                        filterValue.splice(isIncluded, 1);
                        column.setFilterValue([...filterValue]);
                      }
                    }}
                  >
                    {item.value}
                    {item.isChecked ? (
                      <Check className="ml-auto opacity-100" />
                    ) : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
