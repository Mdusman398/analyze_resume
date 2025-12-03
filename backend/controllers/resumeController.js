

// // const asyncHandler = require('express-async-handler');
// // const Analysis = require('../models/analysisModel'); 
// // const ai = {
// //     models: {
// //         generateContent: async ({ contents, config }) => {
// //             console.log("--- Executing AI Placeholder ---");
           
// //             return {
// //                 text: JSON.stringify({
// //                     custom_score: 88,
// //                     ats_score: 95,
// //                     job_match_details: "Excellent match, strong alignment with core requirements.",
// //                     improvement_points: [ 
// //                         "Quantify achievements in the last job role.",
// //                         "Add experience relevant to the specific software mentioned in the JD.",
// //                         "Ensure the resume is exactly one page for entry-level roles."
// //                     ]
// //                 })
// //             };
// //         }
// //     }
// // };

// // // JSON response schema for the AI (AI ko batane ke liye)
// // const analysisSchema = {
// //     type: "object",
// //     properties: {
// //         custom_score: { type: "number" },
// //         ats_score: { type: "number" },
// //         job_match_details: { type: "string" },
// //         improvement_points: {
// //             type: "array",
// //             items: { type: "string" }
// //         }
// //     },
// //     required: ["custom_score", "ats_score", "job_match_details", "improvement_points"]
// // };


// // const analyzeResume = asyncHandler(async (req, res) => {
    
// //     const userId = req.user._id; 
    
// //     const { jobTitle, jobDescription, resumeText } = req.body; 

// //     if (!jobTitle || !jobDescription || !resumeText) {
// //         res.status(400);
// //         throw new Error('Please fill all fields for analysis.');
// //     }

// //     try {
// //         const prompt = `
// //             You are an expert ATS and HR resume analyzer. Compare the Resume Text against the Job Description. 
// //             Job Title: ${jobTitle}
// //             Job Description: ${jobDescription}
// //             Resume Text: ${resumeText}
// //             Return the analysis as a single JSON object.
// //         `;

// //         const aiResponse = await ai.models.generateContent({ 
// //             model: 'gemini-2.5-flash', 
// //             contents: prompt,
// //             config: {
// //                 responseMimeType: "application/json", 
// //                 responseSchema: analysisSchema,      
// //             },
// //         });
        
// //         const aiResponseText = aiResponse.text.trim();
// //         const rawAnalysisData = JSON.parse(aiResponseText);
        

// //         const mappedData = {
// //             user: userId,
// //             jobTitle: jobTitle,
// //             jobDescription: jobDescription,
// //             resumeText: resumeText,
            
// //             // MAPPING LOGIC:
// //             customScore: rawAnalysisData.custom_score, 
// //             atsScore: rawAnalysisData.ats_score,       
// //             jobMatchDetails: rawAnalysisData.job_match_details, 
// //             suggestions: rawAnalysisData.improvement_points,
// //         };

// //         const newAnalysis = await Analysis.create(mappedData); 

// //         // Frontend ko wahi data bhej rahe hain jo save hua (Mongoose object)
// //         res.status(200).json(newAnalysis);

// //     } catch (error) {
// //         console.error("AI Analysis Failed or JSON Parse Error:", error);
// //         res.status(500).json({ 
// //             message: 'Analysis failed due to an internal server or AI parsing error. Check server logs.',
// //             errorDetails: error.message 
// //         });
// //     }
// // });


// // const getAnalysisHistory = asyncHandler(async (req, res) => {
// //     // History ko database se fetch karne ki logic
// //     const history = await Analysis.find({ user: req.user._id }).sort({ createdAt: -1 });
   
// //     const historyFormatted = history.map(item => ({
       
// //         ...item._doc,
// //         analysisData: {
// //             custom_score: item.customScore, 
// //             ats_score: item.atsScore, 
// //             custom_score: item.customScore
            
// //         }
// //     }));
    
// //     res.status(200).json(history);
// // });


// // const getSingleAnalysis = asyncHandler(async (req, res) => {
// //     const analysisId = req.params.id;
// //     const userId = req.user._id;

   
// //     const analysis = await Analysis.findById(analysisId);

// //     if (!analysis) {
// //         res.status(404);
// //         throw new Error('Analysis entry not found.');
// //     }

    
// //     if (!analysis.user.equals(userId)) {
// //         res.status(401);
// //         throw new Error('User not authorized to view this analysis.');
// //     }

    
// //     res.status(200).json(analysis);
// // });



// // const deleteAnalysis = asyncHandler(async (req, res) => {
// //     const analysisId = req.params.id;
// //     const userId = req.user._id;

// //     const analysis = await Analysis.findById(analysisId);

   
// //     if (!analysis) {
// //         res.status(404);
// //         throw new Error('Analysis entry not found.');
// //     }

   
// //     if (!analysis.user.equals(userId)) {
// //         res.status(401);
// //         throw new Error('User not authorized to delete this analysis.');
// //     }


// //     await Analysis.deleteOne({ _id: analysisId }); 
// //     res.status(200).json({ 
// //         message: 'Analysis entry deleted successfully',
// //         id: analysisId
// //     });
// // });







// // const updateAnalysis = asyncHandler(async (req, res) => {
// //     const analysisId = req.params.id;
// //     const userId = req.user._id;
// //     const { jobTitle } = req.body; 
// //     const analysis = await Analysis.findById(analysisId);

 
// //     if (!analysis) {
// //         res.status(404);
// //         throw new Error('Analysis entry not found.');
// //     }

   
// //     if (!analysis.user.equals(userId)) {
// //         res.status(401);
// //         throw new Error('User not authorized to update this analysis.');
// //     }
    

// //     const updatedAnalysis = await Analysis.findByIdAndUpdate(
// //         analysisId,
// //         { jobTitle: jobTitle },
// //         { new: true, runValidators: true } 
// //     );

// //     res.status(200).json({ 
// //         message: 'Analysis job title updated successfully',
// //         updatedAnalysis 
// //     });
// // });




// // module.exports = { 
// //     analyzeResume,
// //     getAnalysisHistory,
// //     getSingleAnalysis,
// //     updateAnalysis,
// //     deleteAnalysis
// // };


// const asyncHandler = require('express-async-handler');
// const Analysis = require('../models/analysisModel'); 
// const ai = {
//     models: {
//         generateContent: async ({ contents, config }) => {
//             console.log("--- Executing AI Placeholder ---");
            
//             return {
//                 text: JSON.stringify({
//                     custom_score: 35,
//                     ats_score: 45,    
//                     job_match_details: "Major Domain Mismatch: The CV focuses heavily on Web Development, while the Job Description is clearly for a Computer Operator role. The core technical skills do not align.",
//                     suggestions: [ 
//                         "The CV must be rewritten to include skills specific to the Computer Operator role (e.g., MS Office Suite, Data Entry, Administrative Support).",
//                         "Critical keywords like 'Excel Proficiency', 'Typing Speed', and 'Hardware Troubleshooting' are completely missing.",
//                         "Quantify experience related to daily operational tasks, not software development projects.",
//                         "Ensure the resume structure is simple and focuses on relevant administrative experience.",
//                         "The current experience in React/Node.js is irrelevant to the JD; highlight transferrable skills like attention to detail only."
//                     ]
//                 })
//             };
//         }
//     }
// };

// const analysisSchema = {
//     type: "object",
//     properties: {
//         custom_score: { type: "number" },
//         ats_score: { type: "number" },
//         job_match_details: { type: "string" },
//         improvement_points: {
//             type: "array",
//             items: { type: "string" }
//         }
//     },
//     required: ["custom_score", "ats_score", "job_match_details", "improvement_points"]
// };


// const analyzeResume = asyncHandler(async (req, res) => {
    
//     const userId = req.user._id; 
    
//     const { jobTitle, jobDescription, resumeText } = req.body; 

//     if (!jobTitle || !jobDescription || !resumeText) {
//         res.status(400);
//         throw new Error('Please fill all fields for analysis.');
//     }

//     try {
//         const prompt = `
//             You are an expert Resume and Job Description (JD) matching tool. Your task is to compare the provided Resume text against the Job Description and provide highly accurate, critical, and domain-specific analysis.

//             **STRICT INSTRUCTION:** You MUST perform a deep skill and domain context comparison. If the core domain of the Resume (e.g., 'Web Development') does not match the core domain of the JD (e.g., 'Computer Operator'), the scores MUST be low (below 50%), and the feedback MUST highlight the domain mismatch clearly.

//             ---
//             **Job Title:** "${jobTitle}"
//             **Job Description (JD):**
//             "${jobDescription}"

//             **Resume Text (CV):**
//             "${resumeText}"
//             ---

//             Based on the comparison, generate a JSON object with the following structure. Do not include any text, notes, or markdown outside the JSON object:

//             {
//               "atsScore": number,
//               "customScore": number,
//               "jobMatchDetails": string,
//               "suggestions": [string, string, string, string, string]
//             }

//             ### SCORING CRITERIA:

//             1.  **atsScore (0-100%):** This score reflects **ATS compliance and basic relevance**.
//                 * Start at 80%. Deduct points heavily if:
//                     * Required technical keywords from the JD are completely missing or not relevant to the CV's domain (Deduct 30-50%).
//                     * If a major domain mismatch exists (e.g., Web Dev vs. Data Entry), the ATS score MUST be **below 50%**.

//             2.  **customScore (0-100%):** This is the **Technical and Experience Matching Score**.
//                 * This MUST strictly assess the overlap of technical skills, required experience level, and domain expertise.
//                 * **If core skills or experience years required in the JD are not present in the CV, the score should reflect this low match (e.g., 20%-40%).**
//                 * If the CV is perfect but for a *different job* (major mismatch), this score should be **lower than the ATS score**.

//             ### OUTPUT CRITERIA:

//             1.  **jobMatchDetails (string):** A one-paragraph summary. Start by stating the **Domain Match/Mismatch** clearly.
//             2.  **suggestions (array of 5 strings):** Provide **five specific, actionable points**.
//                 * Point 1: MUST address the **domain mismatch** if applicable.
//                 * Point 2: List a **critical skill** missing from the CV that the JD requires.
//         `;

//         const aiResponse = await ai.models.generateContent({ 
//             model: 'gemini-2.5-flash', 
//             contents: prompt,
//             config: {
//                 responseMimeType: "application/json", 
//                 responseSchema: analysisSchema,      
//             },
//         });
        
//         const aiResponseText = aiResponse.text.trim();
//         const rawAnalysisData = JSON.parse(aiResponseText);
        

//         const mappedData = {
//             user: userId,
//             jobTitle: jobTitle,
//             jobDescription: jobDescription,
//             resumeText: resumeText,
            
//             customScore: rawAnalysisData.custom_score, 
//             atsScore: rawAnalysisData.ats_score,      
//             jobMatchDetails: rawAnalysisData.job_match_details, 
//             suggestions: rawAnalysisData.improvement_points,
//         };

//         const newAnalysis = await Analysis.create(mappedData); 

//         res.status(200).json(newAnalysis);

//     } catch (error) {
//         console.error("AI Analysis Failed or JSON Parse Error:", error);
//         res.status(500).json({ 
//             message: 'Analysis failed due to an internal server or AI parsing error. Check server logs.',
//             errorDetails: error.message 
//         });
//     }
// });


// const getAnalysisHistory = asyncHandler(async (req, res) => {
//     const history = await Analysis.find({ user: req.user._id }).sort({ createdAt: -1 });
    
//     res.status(200).json(history);
// });


// const getSingleAnalysis = asyncHandler(async (req, res) => {
//     const analysisId = req.params.id;
//     const userId = req.user._id;

    
//     const analysis = await Analysis.findById(analysisId);

//     if (!analysis) {
//         res.status(404);
//         throw new Error('Analysis entry not found.');
//     }

    
//     if (!analysis.user.equals(userId)) {
//         res.status(401);
//         throw new Error('User not authorized to view this analysis.');
//     }

    
//     res.status(200).json(analysis);
// });



// const deleteAnalysis = asyncHandler(async (req, res) => {
//     const analysisId = req.params.id;
//     const userId = req.user._id;

//     const analysis = await Analysis.findById(analysisId);

    
//     if (!analysis) {
//         res.status(404);
//         throw new Error('Analysis entry not found.');
//     }

    
//     if (!analysis.user.equals(userId)) {
//         res.status(401);
//         throw new Error('User not authorized to delete this analysis.');
//     }


//     await Analysis.deleteOne({ _id: analysisId }); 
//     res.status(200).json({ 
//         message: 'Analysis entry deleted successfully',
//         id: analysisId
//     });
// });


// const updateAnalysis = asyncHandler(async (req, res) => {
//     const analysisId = req.params.id;
//     const userId = req.user._id;
//     const { jobTitle } = req.body; 
//     const analysis = await Analysis.findById(analysisId);

 
//     if (!analysis) {
//         res.status(404);
//         throw new Error('Analysis entry not found.');
//     }

    
//     if (!analysis.user.equals(userId)) {
//         res.status(401);
//         throw new Error('User not authorized to update this analysis.');
//     }
    

//     const updatedAnalysis = await Analysis.findByIdAndUpdate(
//         analysisId,
//         { jobTitle: jobTitle },
//         { new: true, runValidators: true } 
//     );

//     res.status(200).json({ 
//         message: 'Analysis job title updated successfully',
//         updatedAnalysis 
//     });
// });


// module.exports = { 
//     analyzeResume,
//     getAnalysisHistory,
//     getSingleAnalysis,
//     updateAnalysis,
//     deleteAnalysis
// };


// const asyncHandler = require('express-async-handler');
// const Analysis = require('../models/analysisModel'); 

// // 🚨 FIX: AI Placeholder ko Mongoose Model ke field names (camelCase) ke mutabiq kiya gaya hai.
// const ai = {
//     models: {
//         generateContent: async ({ contents, config }) => {
//             console.log("--- Executing AI Placeholder ---");
            
//             // Ye response data Mongoose mapping ke baad front-end ko jaana chahiye.
//             // Hum isko un fields ke mutabiq set kar rahe hain jo Mongoose 'Analysis.create' se aayenge.
//             return {
//                 text: JSON.stringify({
//                     // Mongoose Model fields: customScore, atsScore, jobMatchDetails, suggestions
//                     // Ye data AnalyzeResume function ke JSON.parse se aayega, jo hum neeche Mongoose fields mein map kar rahe hain.
//                     custom_score: 35, // Ye field analysisSchema mein hai
//                     ats_score: 45,    // Ye field analysisSchema mein hai
//                     job_match_details: "Major Domain Mismatch: The CV focuses heavily on Web Development, while the Job Description is clearly for a Computer Operator role. The core technical skills do not align.", // Ye field analysisSchema mein hai
//                     improvement_points: [ // Ye field analysisSchema mein hai
//                         "Point 1: The CV must be rewritten to include skills specific to the Computer Operator role (e.g., MS Office Suite, Data Entry, Administrative Support).",
//                         "Point 2: Critical keywords like 'Excel Proficiency', 'Typing Speed', and 'Hardware Troubleshooting' are completely missing.",
//                         "Point 3: Quantify experience related to daily operational tasks, not software development projects.",
//                         "Point 4: Ensure the resume structure is simple and focuses on relevant administrative experience.",
//                         "Point 5: The current experience in React/Node.js is irrelevant to the JD; highlight transferrable skills like attention to detail only."
//                     ]
//                 })
//             };
//         }
//     }
// };

// // JSON response schema for the AI (Gemini ko batane ke liye)
// const analysisSchema = {
//     type: "object",
//     properties: {
//         custom_score: { type: "number" },
//         ats_score: { type: "number" },
//         job_match_details: { type: "string" },
//         improvement_points: {
//             type: "array",
//             items: { type: "string" }
//         }
//     },
//     required: ["custom_score", "ats_score", "job_match_details", "improvement_points"]
// };


// const analyzeResume = asyncHandler(async (req, res) => {
    
//     const userId = req.user._id; 
    
//     const { jobTitle, jobDescription, resumeText } = req.body; 

//     if (!jobTitle || !jobDescription || !resumeText) {
//         res.status(400);
//         throw new Error('Please fill all fields for analysis.');
//     }

//     try {
//         const prompt = `
//             You are an expert Resume and Job Description (JD) matching tool. Your task is to compare the provided Resume text against the Job Description and provide highly accurate, critical, and domain-specific analysis.

//             **STRICT INSTRUCTION:** You MUST perform a deep skill and domain context comparison. If the core domain of the Resume (e.g., 'Web Development') does not match the core domain of the JD (e.g., 'Computer Operator'), the scores MUST be low (below 50%), and the feedback MUST highlight the domain mismatch clearly.

//             ---
//             **Job Title:** "${jobTitle}"
//             **Job Description (JD):**
//             "${jobDescription}"

//             **Resume Text (CV):**
//             "${resumeText}"
//             ---

//             Based on the comparison, generate a JSON object with the following structure. Do not include any text, notes, or markdown outside the JSON object:

//             {
//               "custom_score": number,
//               "ats_score": number,
//               "job_match_details": string,
//               "improvement_points": [string, string, string, string, string]
//             }

//             ### SCORING CRITERIA:

//             1.  **ats_score (0-100%):** This score reflects **ATS compliance and basic relevance**.
//                 * Start at 80%. Deduct points heavily if:
//                     * Required technical keywords from the JD are completely missing or not relevant to the CV's domain (Deduct 30-50%).
//                     * If a major domain mismatch exists (e.g., Web Dev vs. Data Entry), the ATS score MUST be **below 50%**.

//             2.  **custom_score (0-100%):** This is the **Technical and Experience Matching Score**.
//                 * This MUST strictly assess the overlap of technical skills, required experience level, and domain expertise.
//                 * **If core skills or experience years required in the JD are not present in the CV, the score should reflect this low match (e.g., 20%-40%).**
//                 * If the CV is perfect but for a *different job* (major mismatch), this score should be **lower than the ATS score**.

//             ### OUTPUT CRITERIA:

//             1.  **job_match_details (string):** A one-paragraph summary. Start by stating the **Domain Match/Mismatch** clearly.
//             2.  **improvement_points (array of 5 strings):** Provide **five specific, actionable points**.
//                 * Point 1: MUST address the **domain mismatch** if applicable.
//                 * Point 2: List a **critical skill** missing from the CV that the JD requires.
//         `;

//         const aiResponse = await ai.models.generateContent({ 
//             model: 'gemini-2.5-flash', 
//             contents: prompt,
//             config: {
//                 responseMimeType: "application/json", 
//                 responseSchema: analysisSchema,      
//             },
//         });
        
//         const aiResponseText = aiResponse.text.trim();
//         const rawAnalysisData = JSON.parse(aiResponseText);
        

//         const mappedData = {
//             user: userId,
//             jobTitle: jobTitle,
//             jobDescription: jobDescription,
//             resumeText: resumeText,
            
//             // MAPPING LOGIC: rawAnalysisData (snake_case from AI) ko Mongoose fields (camelCase) mein map karna
//             customScore: rawAnalysisData.custom_score, 
//             atsScore: rawAnalysisData.ats_score,      
//             jobMatchDetails: rawAnalysisData.job_match_details, 
//             suggestions: rawAnalysisData.improvement_points, // improvement_points ko suggestions field mein map kiya
//         };

//         const newAnalysis = await Analysis.create(mappedData); 

//         // Frontend ko wahi data bhej rahe hain jo save hua (Mongoose object)
//         // Mongoose object mein suggestions field ka naam 'suggestions' hoga.
//         res.status(200).json(newAnalysis);

//     } catch (error) {
//         console.error("AI Analysis Failed or JSON Parse Error:", error);
//         res.status(500).json({ 
//             message: 'Analysis failed due to an internal server or AI parsing error. Check server logs.',
//             errorDetails: error.message 
//         });
//     }
// });


// const getAnalysisHistory = asyncHandler(async (req, res) => {
//     const history = await Analysis.find({ user: req.user._id }).sort({ createdAt: -1 });
    
//     res.status(200).json(history);
// });


// const getSingleAnalysis = asyncHandler(async (req, res) => {
//     const analysisId = req.params.id;
//     const userId = req.user._id;

    
//     const analysis = await Analysis.findById(analysisId);

//     if (!analysis) {
//         res.status(404);
//         throw new Error('Analysis entry not found.');
//     }

    
//     if (!analysis.user.equals(userId)) {
//         res.status(401);
//         throw new Error('User not authorized to view this analysis.');
//     }

    
//     res.status(200).json(analysis);
// });



// const deleteAnalysis = asyncHandler(async (req, res) => {
//     const analysisId = req.params.id;
//     const userId = req.user._id;

//     const analysis = await Analysis.findById(analysisId);

    
//     if (!analysis) {
//         res.status(404);
//         throw new Error('Analysis entry not found.');
//     }

    
//     if (!analysis.user.equals(userId)) {
//         res.status(401);
//         throw new Error('User not authorized to delete this analysis.');
//     }


//     await Analysis.deleteOne({ _id: analysisId }); 
//     res.status(200).json({ 
//         message: 'Analysis entry deleted successfully',
//         id: analysisId
//     });
// });


// const updateAnalysis = asyncHandler(async (req, res) => {
//     const analysisId = req.params.id;
//     const userId = req.user._id;
//     const { jobTitle } = req.body; 
//     const analysis = await Analysis.findById(analysisId);

 
//     if (!analysis) {
//         res.status(404);
//         throw new Error('Analysis entry not found.');
//     }

    
//     if (!analysis.user.equals(userId)) {
//         res.status(401);
//         throw new Error('User not authorized to update this analysis.');
//     }
    

//     const updatedAnalysis = await Analysis.findByIdAndUpdate(
//         analysisId,
//         { jobTitle: jobTitle },
//         { new: true, runValidators: true } 
//     );

//     res.status(200).json({ 
//         message: 'Analysis job title updated successfully',
//         updatedAnalysis 
//     });
// });


// module.exports = { 
//     analyzeResume,
//     getAnalysisHistory,
//     getSingleAnalysis,
//     updateAnalysis,
//     deleteAnalysis
// };


const asyncHandler = require('express-async-handler');
const Analysis = require('../models/analysisModel'); 
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); 

const analysisSchema = {
    type: "object",
    properties: {
        custom_score: { type: "number" },
        ats_score: { type: "number" },
        job_match_details: { type: "string" },
        improvement_points: {
            type: "array",
            items: { type: "string" }
        }
    },
    required: ["custom_score", "ats_score", "job_match_details", "improvement_points"]
};


const analyzeResume = asyncHandler(async (req, res) => {
    
    const userId = req.user._id; 
    
    const { jobTitle, jobDescription, resumeText } = req.body; 

    if (!jobTitle || !jobDescription || !resumeText) {
        res.status(400);
        throw new Error('Please fill all fields for analysis.');
    }

    try {
        const prompt = `
            You are an expert Resume and Job Description (JD) matching tool. Your task is to compare the provided Resume text against the Job Description and provide highly accurate, critical, and domain-specific analysis.

            **STRICT INSTRUCTION:** You MUST perform a deep skill and domain context comparison. If the core domain of the Resume (e.g., 'Web Development') does not match the core domain of the JD (e.g., 'Computer Operator'), the scores MUST be low (below 50%), and the feedback MUST highlight the domain mismatch clearly.

            ---
            **Job Title:** "${jobTitle}"
            **Job Description (JD):**
            "${jobDescription}"

            **Resume Text (CV):**
            "${resumeText}"
            ---

            Based on the comparison, generate a JSON object with the following structure. Do not include any text, notes, or markdown outside the JSON object:

            {
              "custom_score": number,
              "ats_score": number,
              "job_match_details": string,
              "improvement_points": [string, string, string, string, string]
            }

            ### SCORING CRITERIA:

            1.  **ats_score (0-100%):** This score reflects **ATS compliance and basic relevance**.
                * Start at 80%. Deduct points heavily if:
                    * Required technical keywords from the JD are completely missing or not relevant to the CV's domain (Deduct 30-50%).
                    * If a major domain mismatch exists (e.g., Web Dev vs. Data Entry), the ATS score MUST be **below 50%**.

            2.  **custom_score (0-100%):** This is the **Technical and Experience Matching Score**.
                * This MUST strictly assess the overlap of technical skills, required experience level, and domain expertise.
                * **If core skills or experience years required in the JD are not present in the CV, the score should reflect this low match (e.g., 20%-40%).**
                * If the CV is perfect but for a *different job* (major mismatch), this score should be **lower than the ATS score**.

            ### OUTPUT CRITERIA:

            1.  **job_match_details (string):** A one-paragraph summary. Start by stating the **Domain Match/Mismatch** clearly.
            2.  **improvement_points (array of 5 strings):** Provide **five specific, actionable points**.
                * Point 1: MUST address the **domain mismatch** if applicable.
                * Point 2: List a **critical skill** missing from the CV that the JD requires.
        `;

       
        const response = await ai.models.generateContent({ 
            model: 'gemini-2.5-flash', 
            contents: prompt,
            config: {
                responseMimeType: "application/json", 
                responseSchema: analysisSchema,      
            },
        });
        
        const aiResponseText = response.text.trim();
        const rawAnalysisData = JSON.parse(aiResponseText);
        

        const mappedData = {
            user: userId,
            jobTitle: jobTitle,
            jobDescription: jobDescription,
            resumeText: resumeText,
            
        
            customScore: rawAnalysisData.custom_score, 
            atsScore: rawAnalysisData.ats_score,      
            jobMatchDetails: rawAnalysisData.job_match_details, 
            suggestions: rawAnalysisData.improvement_points, 
        };

        const newAnalysis = await Analysis.create(mappedData); 

        res.status(200).json(newAnalysis);

    } catch (error) {
        console.error("AI Analysis Failed or JSON Parse Error:", error);
        res.status(500).json({ 
            message: 'Analysis failed due to an internal server or AI parsing error. Check server logs.',
            errorDetails: error.message 
        });
    }
});


const getAnalysisHistory = asyncHandler(async (req, res) => {
    const history = await Analysis.find({ user: req.user._id }).sort({ createdAt: -1 });
    
    res.status(200).json(history);
});


const getSingleAnalysis = asyncHandler(async (req, res) => {
    const analysisId = req.params.id;
    const userId = req.user._id;

    
    const analysis = await Analysis.findById(analysisId);

    if (!analysis) {
        res.status(404);
        throw new Error('Analysis entry not found.');
    }

    
    if (!analysis.user.equals(userId)) {
        res.status(401);
        throw new Error('User not authorized to view this analysis.');
    }

    
    res.status(200).json(analysis);
});



const deleteAnalysis = asyncHandler(async (req, res) => {
    const analysisId = req.params.id;
    const userId = req.user._id;

    const analysis = await Analysis.findById(analysisId);

    
    if (!analysis) {
        res.status(404);
        throw new Error('Analysis entry not found.');
    }

    
    if (!analysis.user.equals(userId)) {
        res.status(401);
        throw new Error('User not authorized to delete this analysis.');
    }


    await Analysis.deleteOne({ _id: analysisId }); 
    res.status(200).json({ 
        message: 'Analysis entry deleted successfully',
        id: analysisId
    });
});


const updateAnalysis = asyncHandler(async (req, res) => {
    const analysisId = req.params.id;
    const userId = req.user._id;
    const { jobTitle } = req.body; 
    const analysis = await Analysis.findById(analysisId);

 
    if (!analysis) {
        res.status(404);
        throw new Error('Analysis entry not found.');
    }

    
    if (!analysis.user.equals(userId)) {
        res.status(401);
        throw new Error('User not authorized to update this analysis.');
    }
    

    const updatedAnalysis = await Analysis.findByIdAndUpdate(
        analysisId,
        { jobTitle: jobTitle },
        { new: true, runValidators: true } 
    );

    res.status(200).json({ 
        message: 'Analysis job title updated successfully',
        updatedAnalysis 
    });
});


module.exports = { 
    analyzeResume,
    getAnalysisHistory,
    getSingleAnalysis,
    updateAnalysis,
    deleteAnalysis
};