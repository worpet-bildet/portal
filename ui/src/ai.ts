import { OutgoingPals } from '$types/apps/pals';
import { Item } from '$types/portal/item';

import config from '@root/config';
import cosineSimilarity from 'compute-cosine-similarity';

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
        referenceString = `\\nreference: ${JSON.stringify(reference, null, 2)}`;
      }
      return `user: ${ship}\\ndatetime: ${time}\\ntext: ${blurb}\\ntype: ${type}${referenceString}`;
    })
    .filter((i) => !!i);
  // .sort((a, b) => fromUrbitTime(b.time) - fromUrbitTime(a.time));
};

export const scoreItems = async (
  items: Item[],
  positivePrompt: string,
  negativePrompt: string,
  pals: OutgoingPals
) => {
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

  // score by LLM embedding
  items = items
    .map((item) => {
      const positiveScore = Math.max(
        ...positivePromptEmbeddings.map((e) =>
          cosineSimilarity(item.embedding.embedding, e.embedding)
        )
      );
      const negativeScore = Math.max(
        ...negativePromptEmbeddings.map((e) =>
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

      // if user enters query really quickly, pals haven't loaded yet and this can malfunction
      const fromPals = item.keyObj.ship
        ? pals[item.keyObj.ship.replace('~', '')]
        : null;
      let score = positiveScore - negativeScore;

      if (
        (wordCount > 50 && positivePrompt.includes('high wordCount')) ||
        (containsLink && positivePrompt.includes('https://')) ||
        (fromPals && positivePrompt.includes('from my pals'))
      ) {
        score += 1;
      } else if (!fromPals && positivePrompt.includes('from my pals')) {
        return;
      }

      return { ...item, score };
    })
    .filter((i) => !!i);

  return items;
};
