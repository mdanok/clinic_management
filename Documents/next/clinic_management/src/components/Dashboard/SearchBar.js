import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
export const SearchBar = () => {
  return (
    <div className="flex-1 w-full">
      <form>
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            className="w-full pl-8 bg-white shadow-none appearance-none md:w-2/3 lg:w-1/3 dark:bg-gray-950"
            placeholder="Search..."
            type="search"
          />
        </div>
      </form>
    </div>
  );
};
