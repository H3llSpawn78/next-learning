import Anthropic from "@anthropic-ai/sdk";
//import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are a comedy writer creating original scripts in the style of Red Dwarf.

Given a list of keywords, write a humorous scene featuring characters such as Lister, Rimmer, Kryten, Cat and Holly.

Format your response using Markdown with the following structure:

# Episode Title

## Opening Scene

[Brief description of the setting]

**LISTER:** Dialogue

**RIMMER:** Dialogue

**KRYTEN:** Dialogue

## Scene 2

[Brief description of the setting]

**CAT:** Dialogue

**HOLLY:** Dialogue

## Climax

[Description]

Character dialogue continues...

## Ending

[Description]

Rules:
Rules:
- Return valid HTML only.
- Use <h1>, <h2>, <h3>.
- Do not wrap the response in \`\`\`html code fences.
- Use the supplied keywords naturally.
- Include plenty of character dialogue.
- Keep each character's personality accurate.
- Make the script funny and absurd.
- Return Markdown only.
- Do not include explanations before or after the script.
`;

// 🚨👉 ALERT: Read message below! You've been warned! 👈🚨
// If you're following along on your local machine instead of
// here on Scrimba, make sure you don't commit your API keys
// to any repositories and don't deploy your project anywhere
// live online. Otherwise, anyone could inspect your source
// and find your API keys/tokens. If you want to deploy
// this project, you'll need to create a backend of some kind,
// either your own or using some serverless architecture where
// your API calls can be made. Doing so will keep your
// API keys private.

const anthropic = new Anthropic({
  // Make sure you set an environment variable in Scrimba
  // for ANTHROPIC_API_KEY
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,

  dangerouslyAllowBrowser: true,
});

export async function getScriptFromClaude(
  keywordsArr: string[],
): Promise<string> {
  const keywordsString = keywordsArr.join(", ");
  try {
    const models = await anthropic.models.list();
    console.log(models);
  } catch (err) {
    console.error(err);
  }
  const msg = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `I have ${keywordsString}. Please give me a script for a Red Dwarf episode that uses these keywords in a comedic way.`,
      },
    ],
  });

  const firstBlock = msg.content[0];

  if (firstBlock.type === "text") {
    return firstBlock.text;
  }
  return "";
}
