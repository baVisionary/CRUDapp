import * as mongoose from 'mongoose';

export interface Car extends mongoose.Document {
  make: string;
  carModel: string;
  year: number;
}

let carSchema = new mongoose.Schema({
  make: {
    type: String,
    maxlength: 50,
    required: true
  },
  carModel: {
    type: String,
    maxlength: 50,
    required: true
  },
  year: {
    type: Number,
    min: 1900,
    max: 2050,
    minlength: 4,
    maxlength: 4,
    required: true
  }
});

export default mongoose.model<Car>('Car', carSchema);
