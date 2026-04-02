export const parser = (json: string) => {
  try {
    const parsed = JSON.parse(json);
    return parsed;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw error;
    }

    throw new Error("Unknown error at parser");
  }
};
