import { z } from "zod";

import { pageableDtoBaseModel } from "../shared/shared.models";

export const flowerDtoModel = z
  .object({
    id: z.number(),
    name: z.string(),
    latin_name: z.string(),
    sightings: z.number(),
    profile_picture: z.string(),
    favorite: z.boolean(),
  })
  .transform((flower) => ({
    id: flower.id,
    name: flower.name,
    latinName: flower.latin_name,
    sightings: flower.sightings,
    profilePictureUrl: flower.profile_picture,
    isFavorite: flower.favorite,
  }));

export type Flower = z.infer<typeof flowerDtoModel>;

export const flowersListDtoModel = pageableDtoBaseModel.extend({
  flowers: z.array(flowerDtoModel),
});

export type FlowersList = z.infer<typeof flowersListDtoModel>;

export const createFlowerModel = z.object({
  name: z
    .string({ error: (iss) => (iss.input === undefined ? "Required" : "Invalid input") })
    .min(1, { error: "Required" }),
  latinName: z
    .string({ error: (iss) => (iss.input === undefined ? "Required" : "Invalid input") })
    .min(1, { error: "Required" }),
  description: z.string().max(140, { error: "String must contain at most 140 character(s)" }).optional(),
});

export type CreateFlowerValues = z.infer<typeof createFlowerModel>;

export const createFlowerDtoModel = createFlowerModel.transform((values) => ({
  name: values.name,
  latin_name: values.latinName,
  description: values.description,
}));

export type CreateFlowerDto = z.infer<typeof createFlowerDtoModel>;
