/* eslint-disable require-jsdoc */
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

async function exploreController(req, res) {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // User-provided information
  const age = 35;
  const familySize = 5;
  const kids = 2;
  const kidAges = [2, 15];
  const location = "Kigali";
  const workLocation = "Kigali";
  const propertyType = "apartment";

  // Additional variables for flexibility
  const budget = 1000; // Adjust based on user input
  const deposit = true; // Adjust based on user input
  const furnished = true; // Adjust based on user input
  const neighborhoodPreference = "quiet, residential"; // Adjust based on user input
  const amenities = ["swimming pool", "gym", "playground"]; // Adjust based on user input
  const bedrooms = 3; // Adjust based on user input
  const bathrooms = 2; // Adjust based on user input
  const balcony = true; // Adjust based on user input
  const parking = true; // Adjust based on user input
  const security = "high"; // Adjust based on user input

  // Prompt with more detailed information and flexibility
  const prompt = `Find a ${propertyType} in ${location} for a family of ${familySize} with ${kids} children aged 
                 ${kidAges}. The family has a budget of ${budget} RWF per month, is willing to pay a deposit of 
                 ${deposit ? "yes" : "no"}, and prefers a ${furnished ? "furnished" : "unfurnished"} apartment. 
                 They are interested in a ${neighborhoodPreference} neighborhood with easy access to schools, 
                 hospitals, and other amenities. The apartment should have at least ${bedrooms} bedrooms,
                  ${bathrooms} bathrooms, ${balcony ? "a balcony" : "no balcony"}, and ${parking ? "parking" : "no parking"}.
                   They prioritize ${security} security, ${amenities.join(", ")} amenities, and an overall family-friendly 
                   atmosphere. Please provide recommendations with detailed information about each apartment, including location, price, 
                   amenities, and any additional relevant details.`;

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  res.json({
    status: 200,
    message: result.response.text()
  });
}

export default exploreController;
