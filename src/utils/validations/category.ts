export const createCategorySchema = {
  name: {
    trim: {},
    notEmpty: {
      errorMessage: "Name is required",
    },
    isLength: {
      options: {
        max: 255,
      },
      errorMessage: "Name exceeds 255 characters",
    },
  },
  parentId: {
    optional: {
      options: {
        checkFalsy: true,
      },
    },
    isInt: {
      errorMessage: "Parent ID is invalid",
    },
  },
};

export const updateCategorySchema = {};
