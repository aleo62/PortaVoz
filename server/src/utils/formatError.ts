type ErrorsObject = {
    [key: string]: any;
};

export const formatError = (errorMessage: string) => {
    let errors: ErrorsObject = {};

    if (!errorMessage.includes(",")) return errorMessage;

    errorMessage.split(",").forEach((err) => {
        err = err.replace("Post validation failed: ", "");

        if (err.includes(".")) {
            const [key, subkeyAndValue] = err.split(".");
            const [subkey, value] = subkeyAndValue.split(": ");

            if (!errors[key.trim()]) errors[key.trim()] = {};
            errors[key.trim()][subkey.trim()] = value ? value.trim() : "";

            return;
        }

        const [key, value] = err.split(": ");
        errors[key.trim()] = value;
    });

    return errors;
};
