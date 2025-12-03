const { GoogleGenAI } = require("@google/genai");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GEMINI_KEY; // Dono naam check kar rahe hain

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const model = "gemini-2.5-flash";

/**
 * CV aur Job Description ka analysis karta hai aur structured data wapis karta hai.
  @param {string} jobDescription Job description ka plain text.
 @param {string} resumeText Resume/CV ka plain text.
 * @returns {object} Analysis ka JSON object.
 */
const analyzeResume = async (jobDescription, resumeText) => {
  if (!GEMINI_API_KEY) {
    throw new Error(
      "Gemini API key set nahi hai. Kripya .env file check karein."
    );
  }

  const systemInstruction = `
        Aap ek expert Resume Analyst aur Career Coach hain.
        Aapka kaam hai ek resume ko di gayi job description se compare karna aur ek structured JSON object mein detailed analysis provide karna.
        Resume aur Job Description dono ko dhiyan se parhna.
        Analysis mein hamesha in char (4) fields ko shamil karein:
        1. ats_score: 0 se 100 tak ka score jo ATS optimization batata hai.
        2. custom_score: 0 se 100 tak ka score jo overall quality aur job match darshata hai.
        3. improvement_points: Aik list (array) of strings jis mein woh zaroori nukaat hon jo resume ko behtar bana sakein.
        4. job_match_details: Aik detailed paragraph jo bataye ke resume job description se kitna aur kyun match karta hai.
        
        Sirf JSON object return karein, aur koi extra text shamil na karein.
    `;

  // Prompt tayyar karna
  const prompt = `
        Job Description: ${jobDescription}
        ---
        Resume Text: ${resumeText}
    `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        // JSON output ke liye responseMimeType aur responseSchema use karna
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            ats_score: { type: "number", description: "ATS score out of 100." },
            custom_score: {
              type: "number",
              description: "Custom match score out of 100.",
            },
            improvement_points: {
              type: "array",
              items: { type: "string" },
              description: "List of actionable points to improve the resume.",
            },
            job_match_details: {
              type: "string",
              description: "A detailed summary of the job match.",
            },
          },
          required: [
            "ats_score",
            "custom_score",
            "improvement_points",
            "job_match_details",
          ],
        },
      },
    });

    const jsonResponse = JSON.parse(response.text);
    return jsonResponse;
  } catch (error) {
    console.error("Gemini API call failed:", error.message);
    throw new Error("Resume analysis ke dauraan Gemini API mein error aaya.");
  }
};

module.exports = {
  analyzeResume,
};
