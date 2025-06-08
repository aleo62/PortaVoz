type randomIdProps = {
    prefix?: string;
    sufix?: string;
    lenght: number;
};

export const idGenerator = ({ prefix, sufix, lenght }: randomIdProps) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    let result = "";

    while (counter < lenght) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }

    return `${prefix}${result}${sufix}`;
};
