export const signUpSchema = {
  email: {
    trim: {},
    notEmpty: {
      errorMessage: "Email is required",
    },
    isEmail: {
      errorMessage: "Email is invalid",
    },
    isLength: {
      options: {
        max: 255,
      },
      errorMessage: "Email exceeds 255 characters",
    },
  },
  password: {
    trim: {},
    notEmpty: {
      errorMessage: "Password is required",
    },
    custom: {
      options: (value: string) => {
        if (value.length < 6) {
          return Promise.reject("Password must be at least 6 characters long");
        } else if (value.length > 255) {
          return Promise.reject("Password exceeds 255 characters");
        }
        return value;
      },
    },
  },
  firstName: {
    optional: {
      options: {
        nullable: true,
      },
    },
    trim: {},
    isLength: {
      options: {
        max: 255,
      },
      errorMessage: "First name exceeds 255 characters",
    },
  },
  lastName: {
    optional: {
      options: {
        nullable: true,
      },
    },
    trim: {},
    isLength: {
      options: {
        max: 255,
      },
      errorMessage: "Last name exceeds 255 characters",
    },
  },
  phoneNumber: {
    optional: {
      options: {
        nullable: true,
      },
    },
    trim: {},
    isLength: {
      options: {
        max: 30,
      },
      errorMessage: "Phone number exceeds 30 characters",
    },
  },
  dateOfBirth: {
    optional: {
      options: {
        checkFalsy: true,
      },
    },
    trim: {},
    isISO8601: {
      errorMessage: "Date of birth is invalid",
    },
  },
};
