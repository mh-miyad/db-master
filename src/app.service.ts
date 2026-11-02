import { Injectable } from '@nestjs/common';
import { InjectDrizzle } from '@nestjs/drizzle';
import { sql } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

type DatabaseInfo = {
  database: string;
  username: string;
  postgres_version: string;
  server_time: string;
  current_date: string;
};

@Injectable()
export class AppService {
  constructor(
    @InjectDrizzle()
    private readonly db: NodePgDatabase,
  ) {}

  async createDatabase() {
    const result = await this.db.execute<DatabaseInfo>(
      sql`
        SELECT
          current_database() AS database,
          current_user AS username,
          version() AS postgres_version,
          NOW() AS server_time,
          CURRENT_DATE AS current_date
      `,
      'objects',
    );

    return {
      connected: true,
      data: result[0] ?? null,
    };
  }
}
