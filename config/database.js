const { Pool } = require('pg');

if (!process.env.DATABASE_URL) {
  throw new Error('Set DATABASE_URL to the PostgreSQL connection string for the newsroom database.');
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

function toPostgres(sql) {
  let parameter = 0;
  return sql.replace(/\?/g, () => `$${++parameter}`);
}

function postgresResult(result) {
  if (result.command === 'SELECT') return [result.rows];
  return [{ affectedRows: result.rowCount, insertId: result.rows[0]?.id }];
}

const query = pool.query.bind(pool);
pool.query = async (sql, values = []) => postgresResult(await query(toPostgres(sql), values));
pool.getConnection = async () => {
  const client = await pool.connect();
  return {
    query: async (sql, values = []) => postgresResult(await client.query(toPostgres(sql), values)),
    beginTransaction: () => client.query('BEGIN'),
    commit: () => client.query('COMMIT'),
    rollback: () => client.query('ROLLBACK'),
    release: () => client.release(),
  };
};

module.exports = pool;
