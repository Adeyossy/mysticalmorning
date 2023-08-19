import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import type { Response } from "@netlify/functions/dist/function/response";

const firebaseConfig = {
  apiKey: process.env["API_KEY"],
  authDomain: process.env["AUTH_DOMAIN"],
  projectId: process.env["PROJECT_ID"],
  storageBucket: process.env["STORAGE_BUCKET"],
  messagingSenderId: process.env["MESSAGING_SENDER_ID"],
  appId: process.env["APP_ID"],
  measurementId: process.env["MEASUREMENT_ID"]
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext): Promise<Response> => {
  return {
    statusCode: 200,
    body: JSON.stringify(firebaseConfig)
  }
}

export { handler }