import cosineSimilarity from 'compute-cosine-similarity';
import config from '@root/config';

const DEFAULT_PROMPT = ['says'];
const positivePrompts = ['Wholesome tweet, kindness, love, fun banter'];
const negativePrompts = [
  'Angry messages, politics, people talking about gender & dating, etc.',
];
const minimumScore = -1;
const sorting = 'score';

const actualPositivePrompts = positivePrompts?.length
  ? positivePrompts
  : DEFAULT_PROMPT;
const actualNegativePrompts = negativePrompts?.length
  ? negativePrompts
  : DEFAULT_PROMPT;

const extractStrings = (items) => {
  return items.map((item) => {
    const ship = item.keyObj.ship;
    const time = item.keyObj.time.replace(/\.\.[^\.]*$/, '');
    const blurb = item.bespoke.blurb;

    return `${ship} said this at ${time}: ${blurb}`;
  });
};

export const scoreAndSortItems = async (items) => {
  const itemStrings = extractStrings(items)
    .concat(actualPositivePrompts)
    .concat(actualNegativePrompts);

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

  if (!embeddingsResponse) return items;

  items = items.map((item, index) => {
    return { ...item, embedding: embeddingsResponse[index] };
  });

  positivePromptEmbeddings = embeddingsResponse.slice(
    items.length,
    items.length + actualPositivePrompts.length
  );

  negativePromptEmbeddings = embeddingsResponse.slice(
    items.length + actualPositivePrompts.length,
    items.length + actualPositivePrompts.length + actualNegativePrompts.length
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
  if (sorting === 'score') {
    items.sort((a, b) => !b.score - !a.score);
  }
  return items;
};
