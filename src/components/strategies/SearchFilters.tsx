
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SearchFiltersProps {
  onFilter: (filters: any) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    search: '',
    searchType: 'all'
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const resetFilters = () => {
    const resetFilters = {
      search: '',
      searchType: 'all'
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search strategies..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="pl-10 h-12 text-base dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600"
          />
        </div>
        
        <div className="w-full md:w-48">
          <Select value={filters.searchType} onValueChange={(value) => handleFilterChange('searchType', value)}>
            <SelectTrigger className="h-12 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600">
              <SelectValue placeholder="Search in..." />
            </SelectTrigger>
            <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
              <SelectItem value="all">All Fields</SelectItem>
              <SelectItem value="name">Strategy Name</SelectItem>
              <SelectItem value="entryStrategy">Entry Strategy</SelectItem>
              <SelectItem value="holdingStrategy">Holding Strategy</SelectItem>
              <SelectItem value="exitStrategy">Exit Strategy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          variant="outline" 
          onClick={resetFilters}
          className="h-12 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-600"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;