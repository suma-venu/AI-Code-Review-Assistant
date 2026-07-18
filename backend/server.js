const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { exec } = require("child_process");
const axios = require("axios");
const { createClient } = require("@supabase/supabase-js");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

app.post("/review", (req, res) => {
  const { code, user_id } = req.body;

  if (!code || code.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Code is required.",
    });
  }

  if (!user_id) {
    return res.status(401).json({
      success: false,
      message: "User ID is required.",
    });
  }

  fs.writeFileSync("temp.js", code);

  exec("npx eslint temp.js --format json", async (error, stdout, stderr) => {
    try {
      if (stdout) {
        const eslintResult = JSON.parse(stdout);
        const messages = eslintResult[0]?.messages ?? [];

        if (messages.length === 0) {
          return res.json({
            success: true,
            review: eslintResult,
            aiExplanation: "✅ Great! No issues were found by ESLint.",
          });
        }

        const issue = messages[0].message;

        let explanation =
          "AI explanation is temporarily unavailable. Please try again later.";

        try {
          const aiResponse = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
              contents: [
                {
                  parts: [
                    {
                      text: `You are an AI code review assistant.

Explain the following ESLint issue in a beginner-friendly way.

Issue:
${issue}

Respond in this format:

What it means:
(1-2 short sentences)

Why it matters:
(1-2 short sentences)

How to fix it:
(Show a short JavaScript example.)

Keep the explanation under 120 words.`,
                    },
                  ],
                },
              ],
            }
          );

          explanation =
            aiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text ??
            explanation;
        } catch (geminiError) {
          console.error(
            "Gemini request failed:",
            geminiError.response?.data || geminiError.message
          );
        }

        const { error: dbError } = await supabase.from("reviews").insert([
          {
            user_id,
            code,
            issue,
            ai_explanation: explanation,
          },
        ]);

        if (dbError) {
          console.error("Supabase insert failed:", dbError);
        }

        return res.json({
          success: true,
          review: eslintResult,
          aiExplanation: explanation,
        });
      }

      if (stderr) {
        console.error("ESLint error:", stderr);

        return res.status(500).json({
          success: false,
          message: "Static code analysis failed.",
        });
      }

      return res.json({
        success: true,
        review: "✅ No issues found!",
        aiExplanation: "✅ Great! No issues were found by ESLint.",
      });
    } catch (reviewError) {
      console.error("Review processing failed:", reviewError);

      return res.status(500).json({
        success: false,
        message: "Unable to process the code review.",
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});