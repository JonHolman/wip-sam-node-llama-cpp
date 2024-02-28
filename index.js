import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { LlamaModel, LlamaContext, LlamaChatSession } from "node-llama-cpp";

const modelFilename = "mistral-7b-instruct-v0.2.Q2_K.gguf";
const modelPath = join(dirname(fileURLToPath(import.meta.url)), modelFilename);

let session;

async function initializeLlamaComponents(responseStream) {
  if (!session) {
    responseStream.write(`<p>Loading ${modelFilename} model...</p>`);

    const model = new LlamaModel({ modelPath });
    const context = new LlamaContext({ model });
    session = new LlamaChatSession({ context });

    responseStream.write(`<p>${modelFilename} model loaded.</p>`);
  } else {
    responseStream.write(`<p>${modelFilename} model is already loaded.</p>`);
  }
}

export const handler = awslambda.streamifyResponse(async (event, responseStream) => {
  responseStream.setContentType("text/html");

  // to handle favicon requests from a web browser, but still allow sam local invoke to make a real request
  if (event.rawPath !== "/" && Object.keys(event).length) {
    responseStream.end();
    return;
  }

  responseStream.write("<html>");

  responseStream.write("<p>First write!</p>");

  responseStream.write("<h1>Streaming h1</h1>");
  await new Promise((r) => setTimeout(r, 100));

  responseStream.write("<h2>Streaming h2</h2>");
  await new Promise((r) => setTimeout(r, 100));

  responseStream.write("<h3>Streaming h3</h3>");
  await new Promise((r) => setTimeout(r, 100));

  await initializeLlamaComponents(responseStream);

  const question = "Who is the greatest basketball player of all time?";

  responseStream.write(`<p>User: ${question}</p><p>AI:`);

  await session.prompt(question, {
    onToken: (chunk) => responseStream.write(session.context.decode(chunk)),
  });

  responseStream.write("</p><p>DONE!</p></html>");
  responseStream.end();

  session.context.printTimings();
});
