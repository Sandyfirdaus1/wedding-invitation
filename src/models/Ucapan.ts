import mongoose from 'mongoose';

const UcapanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  confirmation: {
    type: String,
    enum: ['Hadir', 'Tidak Hadir', 'Ragu-ragu'],
    default: 'Hadir',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Ucapan = mongoose.models.Ucapan || mongoose.model('Ucapan', UcapanSchema);

export default Ucapan;
