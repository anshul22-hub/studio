
"use client";

import { useState, useEffect } from 'react';
import { ClickHouseConfig, getClickHouseTableSchema, getClickHouseTables } from '@/services/clickhouse';
import { FlatFileConfig, inferFlatFileSchema } from '@/services/flat-file';
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface ColumnSelectionProps {
  sourceType: 'clickhouse' | 'flatfile' | null;
  clickhouseConfig: ClickHouseConfig | null;
  flatFileConfig: FlatFileConfig | null;
  onColumnSelect: (columns: string[]) => void;
}

const ColumnSelection: React.FC<ColumnSelectionProps> = ({ sourceType, clickhouseConfig, flatFileConfig, onColumnSelect }) => {
  const [availableColumns, setAvailableColumns] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  useEffect(() => {
    const loadColumns = async () => {
      if (sourceType === 'clickhouse' && clickhouseConfig && selectedTable) {
        try {
          const schema = await getClickHouseTableSchema(clickhouseConfig, selectedTable);
          setAvailableColumns(schema.columnNames);
        } catch (error) {
          console.error("Error fetching ClickHouse table schema:", error);
        }
      } else if (sourceType === 'flatfile' && flatFileConfig) {
        try {
          const schema = await inferFlatFileSchema(flatFileConfig);
          setAvailableColumns(schema.columnNames);
        } catch (error) {
          console.error("Error inferring Flat File schema:", error);
        }
      }
    };

    loadColumns();
  }, [sourceType, clickhouseConfig, flatFileConfig, selectedTable]);

  useEffect(() => {
    const loadTables = async () => {
      if (sourceType === 'clickhouse' && clickhouseConfig) {
        try {
          const tables = await getClickHouseTables(clickhouseConfig);
          setTables(tables);
        } catch (error) {
          console.error("Error fetching ClickHouse tables:", error);
        }
      }
    };

    loadTables();
  }, [sourceType, clickhouseConfig]);

  const handleColumnSelect = (column: string) => {
    setSelectedColumns(prevColumns => {
      if (prevColumns.includes(column)) {
        return prevColumns.filter(col => col !== column);
      } else {
        return [...prevColumns, column];
      }
    });
  };

  useEffect(() => {
    onColumnSelect(selectedColumns);
  }, [selectedColumns, onColumnSelect]);

  if (!sourceType || (!clickhouseConfig && !flatFileConfig)) {
    return null;
  }

  return (
    <div>
      {sourceType === 'clickhouse' && (
        <div>
          <label htmlFor="tableSelect" className="block text-sm font-medium text-foreground">Select Table:</label>
          <select
            id="tableSelect"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            onChange={(e) => setSelectedTable(e.target.value)}
            value={selectedTable || ''}
          >
            <option value="">Select a table</option>
            {tables.map(table => (
              <option key={table} value={table}>{table}</option>
            ))}
          </select>
        </div>
      )}

      {availableColumns.length > 0 && (
        <div className="mt-4">
          <p className="block text-sm font-medium text-foreground">Select Columns:</p>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {availableColumns.map(column => (
              <div key={column} className="flex items-center">
                <Checkbox
                  id={`column-${column}`}
                  checked={selectedColumns.includes(column)}
                  onCheckedChange={() => handleColumnSelect(column)}
                />
                <Label htmlFor={`column-${column}`} className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {column}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColumnSelection;
