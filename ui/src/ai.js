import cosineSimilarity from 'compute-cosine-similarity';
import config from '@root/config';
import { fromUrbitTime } from '@root/util';

const minimumScore = -1;

const extractStrings = (items) => {
  return items
    .map((item) => {
      const ship = item.keyObj.ship;
      const time = item.keyObj.time.replace(/\.\.[^\.]*$/, '');
      const blurb = item.bespoke.blurb;
      const type = item.keyObj.struc;
      const reference = item.bespoke.ref ? item.bespoke.ref : null;

      let referenceString = '';
      if (reference) {
        referenceString = `\nreference: ${JSON.stringify(reference, null, 2)}`;
      }
      return `user: ${ship}\ndatetime: ${time}\ntext: ${blurb}\ntype: ${type}${referenceString}`;
    })
    .filter((i) => !!i)
    .sort((a, b) => fromUrbitTime(b.time) - fromUrbitTime(a.time));
};

export const scoreItems = async (items, positivePrompt, negativePrompt, sortedPals) => {
  if (!positivePrompt)
    positivePrompt = 'Wholesome tweet, kindness, love, fun banter';
  if (!negativePrompt) negativePrompt = 'anger, negativity';
  const itemStrings = extractStrings(items)
    .concat([positivePrompt])
    .concat([negativePrompt]);

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

  console.log({sortedPals});

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

    // hard-coded heuristics
    const wordCount = item.bespoke.blurb
      ? item.bespoke.blurb.split(' ').length
      : null;
    const containsLink = item.bespoke.blurb
      ? item.bespoke.blurb.includes('http')
      : null;
    const postMentionsPal = item.keyObj.ship
      ? Object.keys(sortedPals).includes(item.keyObj.ship)
      : null;
    var score = positiveScore - negativeScore;

    if (
      (wordCount > 50 && positivePrompt.includes('high wordCount')) ||
      (containsLink && positivePrompt.includes('https://')) ||
      (postMentionsPal && positivePrompt.includes('pals'))
    ) {
      score++;
    }

    return { ...item, score };
  });
  items = items.filter((item) => !item.score > minimumScore);
  console.log({items});
  return items;
};
