const request = require('supertest');
const express = require('express');

const app = express();
app.get('/ping', (req, res) => res.send('pong'));

test('integration: ping route works', async () => {
  const res = await request(app).get('/ping');
  expect(res.text).toBe('pong');
});
