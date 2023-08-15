import cosineSimilarity from 'compute-cosine-similarity';
import config from '@root/config';

const minimumScore = -1;

const extractStrings = (items) => {
  return items.map((item) => {
    const ship = item.keyObj.ship;
    const time = item.keyObj.time.replace(/\.\.[^\.]*$/, '');
    const blurb = item.bespoke.blurb;

    return `${ship} said this at ${time}: ${blurb}`;
  });
};

export const scoreItems = async (items, prompt) => {
  if (!prompt) prompt = 'Wholesome tweet, kindness, love, fun banter';
  const itemStrings = extractStrings(items).concat([prompt]);

  let positivePromptEmbeddings = [];
  const embeddingsResponse = await fetch(
    'https://api.openai.com/v1/embeddings',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.openai}`,
      },
      body: JSON.stringify({
        model: 'text-embedding-ada-002',
        input: itemStrings,
      }),
    }
  )
    .then((embeddingsResponse) => embeddingsResponse.json())
    .then((embeddingsResponse) => {
      return embeddingsResponse.data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  if (!embeddingsResponse) return items;

  items = items.map((item, index) => {
    return { ...item, embedding: embeddingsResponse[index] };
  });

  positivePromptEmbeddings = embeddingsResponse.slice(
    items.length,
    items.length + 1
  );

  // score by LLM embedding
  items = items.map((item) => {
    const positiveScore = Math.max(
      positivePromptEmbeddings.map((e, i) =>
        cosineSimilarity(item.embedding.embedding, e.embedding)
      )
    );

    const score = positiveScore;

    return { ...item, score };
  });
  items = items.filter((item) => !item.score > minimumScore);
  return items;
};
