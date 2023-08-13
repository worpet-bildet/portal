import _ from 'lodash';
import { get, writable } from 'svelte/store';
import { api } from '@root/api';
import { save, load } from '@root/storage';
import config from '@root/config';
import { fromUrbitTime } from '@root/util';

export const state = writable(load() || {});
export const feed = writable({});

export const toggleDarkmode = () => {
  state.update((s) => {
    s.darkmode = !s.darkmode;
    save({ darkmode: s.darkmode });
    return s;
  });
};
import { OpenAI } from "llamaindex";

export const refreshPortalItems = async () => {

  api.portal.get.items().then(async ({ items }) => {

    if (useLLM) {

      const itemStrings = extractStrings(items).concat(actualPositivePrompts).concat(actualNegativePrompts);

      let positivePromptEmbeddings = [];
      let negativePromptEmbeddings = [];
      const embeddingsResponse = await fetch("https://api.openai.com/v1/embeddings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
          model: "text-embedding-ada-002",
          input: itemStrings,
        }),
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch((error) => {
        console.error('Error:', error);
      });

      console.log(embeddingsResponse);

      items = items.map((item, index) => {
        return { ...item, embedding: embeddingsResponse[index] };
      });
      positivePromptEmbeddings = embeddingsResponse.slice(
        items.length,
        items.length + actualPositivePrompts.length
      );
      negativePromptEmbeddings = embeddingsResponse.slice(
        items.length + actualPositivePrompts.length,
        items.length +
          actualPositivePrompts.length +
          actualNegativePrompts.length
      );

      items = items.map((item) => {
        const positiveScore = max(
          positivePromptEmbeddings.map((e, i) =>
            cosineSimilarity(item.embedding, e)
          )
        );
        const negativeScore = max(
          negativePromptEmbeddings.map((e, i) =>
            cosineSimilarity(item.embedding, e)
          )
        );
        const score = positiveScore - negativeScore;

        return { ...item, score };
      });
      items = items.filter((item) => !item.score > minimumScore);
      if (sorting === "score") {
        items.sort((a, b) => !b.score - !a.score);
      }
    }

    state.update((s) => {
      items.forEach((i) => {
        s[i.keyStr] = i;
      });
      s.isLoaded = true;
      return s;
    });

  });

};
