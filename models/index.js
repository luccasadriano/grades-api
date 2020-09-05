import mongoose from 'mongoose';
import studentModel from './studentModel.js'
import dotenv from 'dotenv'

dotenv.config()

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;
db.students = studentModel(mongoose)


export { db };
