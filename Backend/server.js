

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/analyze-homework', upload.single('image'), async (req, res) => {
  const filePath = req.file.path;
  const mimeType = req.file.mimetype;

  try {
    const base64Image = fs.readFileSync(filePath, { encoding: 'base64' });

    const prompt = `
      You are an educational AI trained to analyze student math worksheets from handwritten images.

      Step-by-step:

      1. Use OCR to extract the handwritten math problems and student answers from the image.
      2. Identify common math errors (e.g., sign mistakes, wrong distribution, order of operations).
      3. Analyze which topics the student struggles with.
      4. Estimate the student's grade and confidence score.
      5. Suggest focus areas for improvement.

      👉 If the handwriting is too unclear or illegible, return:
      {
        "error": "Unclear image"
      }

      👉 Otherwise, return this JSON format:

      {
        "subject": "Mathematics",
        "estimatedGrade": "B",
        "topics": {
          "Algebra": "Needs Improvement",
          "Geometry": "Good",
          "Fractions": "Average"
        },
        "focusAreas": [
          "Review Algebra equations",
          "Practice fraction simplification"
        ],
        "confidenceScore": 0.87,
        "feedback": {
          "answersOnly": [
            "Q1: x = 4",
            "Q2: y = -2",
            "Q3: 2x + 3 = 11 → x = 4"
          ],
          "answersWithHints": [
            "Q1: x = 4 (Check sign when moving terms)",
            "Q2: y = -2 (Be careful when dividing by negative)",
            "Q3: Combine like terms first before solving"
          ],
          "fullSolutions": [
            "Q1: 2x = 8 → x = 4",
            "Q2: -3y = 6 → y = -2",
            "Q3: 2x + 3 = 11 → 2x = 8 → x = 4"
          ]
        }
      }
      `;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o',
        max_tokens: 1500,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              {
                type: 'image_url',
                image_url: {
                  url: `data:${mimeType};base64,${base64Image}`
                }
              }
            ]
          }
        ]
      })
    });

    const resultData = await response.json();

    fs.unlinkSync(filePath); // Clean up uploaded image

    if (!response.ok) {
      console.error('OpenRouter API error:', resultData);
      return res.status(500).json({ error: resultData.error || 'API request failed' });
    }

    const resultText = resultData.choices[0].message.content;

    try {
    let cleaned = resultText.trim();

    // Remove Markdown code block wrapper if present
    if (cleaned.startsWith('```json') || cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/```json|```/g, '').trim();
    }

    const resultJson = JSON.parse(cleaned);
    res.json(resultJson);   //returns back to the frontend as a response
    } 
    catch (err) {
        console.error('Failed to parse JSON from OpenRouter response:', resultText);
        res.status(500).json({
            error: 'Failed to parse AI response. Try again.',
            raw: resultText // optionally include raw for debugging
    });
    }

  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to analyze image' });
  }
});

app.get('/', (req, res) => {
  res.send('STREAK backend running ✅');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend running on http://localhost:${port}`);
});

//'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'