import { Pinecone } from "@pinecone-database/pinecone";
import { ChatOpenAI } from "@langchain/openai";

export const chatModel = new ChatOpenAI({
  openAIApiKey: "",
});
