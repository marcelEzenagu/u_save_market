let ENVIRONMENT = {};

if (process.env.NODE_ENV === "development") {
  ENVIRONMENT = { 
    DOMAIN: "localhost",
  };
} else {
  ENVIRONMENT = {
    DOMAIN: "checklos.com",
  };
}

export const ENV = ENVIRONMENT;


