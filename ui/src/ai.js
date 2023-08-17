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

export const scoreItems = async (items, positivePrompt, negativePrompt) => {
  if (!positivePrompt) positivePrompt = 'Wholesome tweet, kindness, love, fun banter';
  if (!negativePrompt) negativePrompt = 'anger, negativity';
  const itemStrings = extractStrings(items).concat([positivePrompt]).concat([negativePrompt]);

  let positivePromptEmbeddings = [];
  let negativePromptEmbeddings = [];
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
  console.log('fail:', embeddingsResponse);
  if (!embeddingsResponse) {
    return items;
  }
  items = items.map((item, index) => {
    return { ...item, embedding: embeddingsResponse[index] };
  });

  positivePromptEmbeddings = embeddingsResponse.slice(
    items.length,
    items.length + 1
  );
  negativePromptEmbeddings = embeddingsResponse.slice(
    items.length + 1,
    items.length + 2
  );

  // score by LLM embedding
  items = items.map((item) => {
    const positiveScore = Math.max(
      positivePromptEmbeddings.map((e, i) =>
        cosineSimilarity(item.embedding.embedding, e.embedding)
      )
    );
    const negativeScore = Math.max(
      negativePromptEmbeddings.map((e, i) =>
        cosineSimilarity(item.embedding.embedding, e.embedding)
      )
    );

    const score = positiveScore - negativeScore;

    return { ...item, score };
  });
  items = items.filter((item) => !item.score > minimumScore);
  return items;
};
