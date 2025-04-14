
"use client";

import { useState } from 'react';
import { ClickHouseConfig } from '@/services/clickhouse';
import { FlatFileConfig } from '@/services/flat-file';
import DataSourceConfig from '@/components/DataSourceConfig';
import ColumnSelection from '@/components/ColumnSelection';
import DataIngestion from '@/components/DataIngestion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [sourceType, setSourceType] = useState<'clickhouse' | 'flatfile' | null>(null);
  const [clickhouseConfig, setClickhouseConfig] = useState<ClickHouseConfig | null>(null);
  const [flatFileConfig, setFlatFileConfig] = useState<FlatFileConfig | null>(null);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [ingestedRecords, setIngestedRecords] = useState<number | null>(null);

  const handleSourceTypeSelect = (type: 'clickhouse' | 'flatfile') => {
    setSourceType(type);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-3xl mx-auto mt-8">
        <CardHeader>
          <CardTitle>DataPump</CardTitle>
          <CardDescription>
            Ingest data from ClickHouse or Flat File to your destination.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {!sourceType ? (
            <div className="flex justify-center space-x-4">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/80" onClick={() => handleSourceTypeSelect('clickhouse')}>
                ClickHouse
              </button>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/80" onClick={() => handleSourceTypeSelect('flatfile')}>
                Flat File
              </button>
            </div>
          ) : (
            <>
              <DataSourceConfig
                sourceType={sourceType}
                onConfigChange={(config) => {
                  if (sourceType === 'clickhouse') {
                    setClickhouseConfig(config as ClickHouseConfig);
                  } else {
                    setFlatFileConfig(config as FlatFileConfig);
                  }
                }}
              />
              {(clickhouseConfig || flatFileConfig) && (
                <ColumnSelection
                  sourceType={sourceType}
                  clickhouseConfig={clickhouseConfig}
                  flatFileConfig={flatFileConfig}
                  onColumnSelect={(columns) => setSelectedColumns(columns)}
                />
              )}
              {selectedColumns.length > 0 && (
                <DataIngestion
                  sourceType={sourceType}
                  clickhouseConfig={clickhouseConfig}
                  flatFileConfig={flatFileConfig}
                  selectedColumns={selectedColumns}
                  onIngestionComplete={(count) => setIngestedRecords(count)}
                />
              )}
              {ingestedRecords !== null && (
                <div className="mt-4 p-4 bg-accent text-accent-foreground rounded">
                  Ingestion Complete: {ingestedRecords} records ingested.
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
