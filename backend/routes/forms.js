const express = require('express');
const router = express.Router();
const Form = require('../models/Form');
const Response = require('../models/Response');

router.post('/', async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).json(form);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const forms = await Form.find();
  res.json(forms);
});

router.get('/:id', async (req, res) => {
  const form = await Form.findById(req.params.id);
  res.json(form);
});

router.post('/:id/responses', async (req, res) => {
  const resp = new Response({
    formId: req.params.id,
    answers: req.body.answers
  });
  await resp.save();
  res.json({ message: 'Response saved' });
});

router.get('/:id/responses', async (req, res) => {
  const responses = await Response.find({ formId: req.params.id });
  res.json(responses);
});

module.exports = router;
