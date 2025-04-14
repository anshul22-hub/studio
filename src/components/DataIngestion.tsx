
"use client";

import { useState } from 'react';
import { ClickHouseConfig } from '@/services/clickhouse';
import { FlatFileConfig } from '@/services/flat-file';
import { Button } from "@/components/ui/button"

interface DataIngestionProps {
  sourceType: 'clickhouse' | 'flatfile' | null;
  clickhouseConfig: ClickHouseConfig | null;
  flatFileConfig: FlatFileConfig | null;
  selectedColumns: string[];
  onIngestionComplete: (count: number) => void;
}

const DataIngestion: React.FC<DataIngestionProps> = ({
  sourceType,
  clickhouseConfig,
  flatFileConfig,
  selectedColumns,
  onIngestionComplete
}) => {
  const [isIngesting, setIsIngesting] = useState(false);

  const handleStartIngestion = async () => {
    setIsIngesting(true);
    // Simulate data ingestion process
    await new Promise(resolve => setTimeout(resolve, 2000));
    const ingestedCount = Math.floor(Math.random() * 1000);
    onIngestionComplete(ingestedCount);
    setIsIngesting(false);
  };

  return (
    <div className="mt-4">
      <Button disabled={isIngesting} onClick={handleStartIngestion}>
        {isIngesting ? 'Ingesting...' : 'Start Ingestion'}
      </Button>
    </div>
  );
};

export default DataIngestion;
