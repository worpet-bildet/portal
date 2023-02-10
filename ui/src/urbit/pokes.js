import reduce from "lodash/reduce";
import transform from "lodash/transform";
import isEmpty from "lodash/isEmpty";
import flatten from "lodash/flatten";
import { portalEvents } from "../state/faces";
import { mapInputField, shouldTransform } from "./util";

export const generateActions = () => {
  return transform(
    portalEvents,
    (acc, actions, subject) => {
      if (shouldTransform(subject)) {
        acc[subject] = transformSubject(actions, acc, subject);
      }
      return acc;
    },
    {}
  );
};

export const transformSubject = (actions, acc, subject) => {
  return transform(
    actions,
    (_acc, _value, _key) => {
      if (_key.length) {
        const FIELDS = flatten(_value.INPUTS.map(mapInputField));
        const POKES = generatePokes(actions, acc, subject);
        _acc[_key] = {
          ..._acc[_key],
          ..._value,
          FIELDS,
          POKES,
        };
        _acc.fields = {
          ..._acc.fields,
          [_value.FACE]: FIELDS,
        };
        _acc.pokes = !isEmpty(_acc.pokes) ? _acc.pokes : POKES;
      }
      return _acc;
    },
    {}
  );
};

export const generatePokes = actions => {
  return transform(
    actions,
    (_acc, _value, _key) => {
      if (_key.length) {
        _acc[_key.slice().toLowerCase()] = createPoke;
      }
      return _acc;
    },
    {}
  );
};

export const createPoke = (urbit, type) => async data => {
  const poke = buildPoke(type, data);
  console.log({ poke });
  try {
    const res = await urbit.poke(poke);
    console.log("Poke Response: ", res);
    debugger;
    return res;
  } catch (err) {
    console.error(err);
    debugger;
  }
};

export const buildPoke = (type, data) => ({
  app: "portal-manager",
  mark: "portal-action",
  json: {
    // poke: {
    [type.POKE_KEY]: structurePokeData(type.INPUTS, data),
    // },
  },
  onSucccess: console.log,
  onError: console.error,
});

export const structurePokeData = (inputs, data) => {
  return reduce(
    inputs,
    (acc, value) => {
      acc[value] = data[value];
      return acc;
    },
    {}
  );
};

export const _generateFields = action => flatten(action.INPUTS.map(mapInputField));
