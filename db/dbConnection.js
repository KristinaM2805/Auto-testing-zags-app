import pg from 'pg';

const { Client } = pg;

export async function connectToDb() {
  const client = new Client({
    host: '86.57.161.116',
    port: 50432,
    user: 'user',
    password: process.env.DB_PASSWORD,
    database: 'register_office'
  });

  await client.connect();

  return client;
}