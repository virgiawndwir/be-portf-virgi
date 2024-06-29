const Guest = require('../models/Guest').Guest
const moment = require('moment');
const sendEmail = require('../config/nodemailerConfig');

const getAllGuests = async (req, res) => {
  try {
    const guests = await Guest.findAll()

    // Date conversion for created_at
    const formattedGuests = guests.map(guest => {
      return {
        ...guest.toJSON(),
        created_at: moment(guest.created_at).format('YYYY-MM-DD HH:mm:ss')
      };
    });
    res.status(200).json({ statusCode: 200, message: "Success", data: formattedGuests })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: err.message });
  }
}

const createGuest = async (req, res) => {
  try {
    const { name, email, phone_number, wa_number, institution, subject, descriptions } = req.body

    await sendEmail({
      from: email, // sender
      to: "virgiawndwir@gmail.com", // receiver
      subject: `${subject} | Tamu dari ${name} - ${institution}`,
      html: `
      <h4>Pesan ini dikirim pada : ${moment().format("LLLL")}</h4>
      <p><b>Dari</b>: ${name}</p>
      <p><b>Email</b>: ${email}</p>
      <p><b>Nomor Telp</b>: ${phone_number}</p>
      <p><b>Nomor WhatsApp</b>: ${wa_number}</p>
      <p><b>Institusi</b>: ${institution}</p>
      <p><b>Keterangan</b>: <br> ${descriptions}</p>
      `,
    });

    const newGuest = await Guest.create({
      name,
      email,
      phone_number,
      wa_number,
      institution,
      subject,
      descriptions,
      created_at: moment().format("YYYY-MM-DD HH:mm:ss")
    })
    res.status(201).json({newGuest})
  } catch (error) {

    res.status(500).json({ message: error.message });
  }
}

module.exports = { getAllGuests, createGuest };