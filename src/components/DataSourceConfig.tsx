
"use client";

import { useState, useEffect } from 'react';
import { ClickHouseConfig } from '@/services/clickhouse';
import { FlatFileConfig } from '@/services/flat-file';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DataSourceConfigProps {
  sourceType: 'clickhouse' | 'flatfile' | null;
  onConfigChange: (config: ClickHouseConfig | FlatFileConfig) => void;
}

const DataSourceConfig: React.FC<DataSourceConfigProps> = ({ sourceType, onConfigChange }) => {
  const [clickhouseConfig, setClickhouseConfig] = useState<ClickHouseConfig>({
    host: '',
    port: 9000,
    database: '',
    user: '',
    jwtToken: '',
  });

  const [flatFileConfig, setFlatFileConfig] = useState<FlatFileConfig>({
    filePath: '',
    delimiter: ',',
  });

  useEffect(() => {
    if (sourceType === 'clickhouse') {
      onConfigChange(clickhouseConfig);
    } else if (sourceType === 'flatfile') {
      onConfigChange(flatFileConfig);
    }
  }, [clickhouseConfig, flatFileConfig, onConfigChange, sourceType]);

  const handleClickHouseConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClickhouseConfig(prevConfig => ({
      ...prevConfig,
      [name]: value,
    }));
  };

  const handleFlatFileConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFlatFileConfig(prevConfig => ({
      ...prevConfig,
      [name]: value,
    }));
  };

  if (!sourceType) {
    return null;
  }

  return (
    <div>
      {sourceType === 'clickhouse' ? (
        <div className="grid gap-2">
          <Label htmlFor="host">ClickHouse Host</Label>
          <Input type="text" id="host" name="host" value={clickhouseConfig.host} onChange={handleClickHouseConfigChange} />

          <Label htmlFor="port">ClickHouse Port</Label>
          <Input type="number" id="port" name="port" value={clickhouseConfig.port} onChange={handleClickHouseConfigChange} />

          <Label htmlFor="database">ClickHouse Database</Label>
          <Input type="text" id="database" name="database" value={clickhouseConfig.database} onChange={handleClickHouseConfigChange} />

          <Label htmlFor="user">ClickHouse User</Label>
          <Input type="text" id="user" name="user" value={clickhouseConfig.user} onChange={handleClickHouseConfigChange} />

          <Label htmlFor="jwtToken">JWT Token</Label>
          <Input type="text" id="jwtToken" name="jwtToken" value={clickhouseConfig.jwtToken} onChange={handleClickHouseConfigChange} />
        </div>
      ) : (
        <div className="grid gap-2">
          <Label htmlFor="filePath">Flat File Path</Label>
          <Input type="text" id="filePath" name="filePath" value={flatFileConfig.filePath} onChange={handleFlatFileConfigChange} />

          <Label htmlFor="delimiter">Delimiter</Label>
          <Input type="text" id="delimiter" name="delimiter" value={flatFileConfig.delimiter} onChange={handleFlatFileConfigChange} />
        </div>
      )}
    </div>
  );
};

export default DataSourceConfig;
