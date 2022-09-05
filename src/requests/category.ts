export const transformToCategoryModel = (input: any) => {
  return {
    name: input.name,
    slug: input.slug,
  };
};
