/* eslint-disable no-undef */
import express from 'express'
import request from 'supertest'
import UserDB from '../utils/db/userDB'

UserDB.findUser = jest.fn().mockResolvedValue({ phoneNumber: '321-654-9870' });

describe('testing api routes', () => {
  it('mocking db', async () => {
    const user = await UserDB.findUser('email', 'michael.williams@example.com');
    expect(user.phoneNumber).toBe('321-654-9870');
  });
});
