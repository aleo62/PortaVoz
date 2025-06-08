### React e Tailwind

```
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    text?: string;
    Icon?: React.ElementType;
    path?: string;
    small?: boolean;
};

export const ButtonPrimary = ({
    text,
    small,
    path,
    className,
    Icon,
    ...rest
}: ButtonProps) => {
    return (
        <a href={path}>
            <button
                className={`button btn-primary ${small ? "small" : ""} ${className}`}
                {...rest}
            >
                <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap">
                    <p>{text}</p>
                    {Icon && <Icon className="size-6 stroke-[2.2]" />}
                </div>
            </button>
        </a>
    );
};

export const ButtonSecondary = ({
    text,
    small,
    path,
    className,
    Icon,
    ...rest
}: ButtonProps) => {
    return (
        <a href={path}>
            <button
                className={`button btn-secondary ${small && "small"} ${className}`}
                {...rest}
            >
                <div className="flex items-center justify-center gap-2">
                    <p className="w-20">{text}</p>
                    {Icon && <Icon className="size-5.5 stroke-[2.5]" />}
                </div>
            </button>
        </a>
    );
};

export const ButtonOutlined = ({
    text,
    small,
    path,
    className,
    Icon,
    ...rest
}: ButtonProps) => {
    return (
        <a href={path}>
            <button
                className={`button btn-outlined ${small && "small"} ${className}`}
                {...rest}
            >
                <div className="flex items-center justify-center gap-2">
                    <p className="w-20">{text}</p>
                    {Icon && <Icon className="size-5.5 stroke-[2.5]" />}
                </div>
            </button>
        </a>
    );
};
```

### Typescript

```
type UserContextType = {
    user: User | null;
    userData: UserData | DocumentData | null;
    setUserData: React.Dispatch<React.SetStateAction<UserData | DocumentData | null>>;
    updateUser: (data: Partial<UserData>) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);
```

### CSS

```
/* ? BUTTON */
.button {
    @apply text-body-background relative flex items-center justify-center gap-2 overflow-hidden rounded-[.6rem] px-[2rem] py-[.800rem] text-[13px] font-medium tracking-wider transition-[transform,translate] duration-200 active:scale-95 disabled:before:absolute disabled:before:inset-0 disabled:before:bg-black disabled:before:opacity-10 disabled:before:content-[''] disabled:hover:translate-y-[0px] md:text-[14px] lg:px-[1.4rem] lg:text-[15.5px];
}

.btn-primary {
    @apply from-accent/95 to-primary/95 hover:from-accent hover:to-primary bg-gradient-to-r shadow-[0px_4px_54px_0px_rgba(0,_0,_0,_0.2)] transition-all duration-200 hover:translate-y-[-3px];
}

.btn-secondary {
    @apply bg-secondary text-primary hover:bg-[#B5D9F5];
}

.btn-outlined {
    @apply bg-transparent text-accent ring-1 ring-accent hover:bg-accent/10;
}

.button.small {
    @apply text-(length:--size-label-sml);
}
```

### Elixir (Backend)

```
# handling upload of url and file
  def upload_request(conn, url, body) do
    headers = []

    case HTTPoison.post(url, body, headers) do
      # successful response
      {:ok, %HTTPoison.Response{status_code: 200, body: res_body}} ->
        {:ok, response_map} = Jason.decode(res_body)
        image_url = response_map["secure_url"] || response_map["url"]
        json(conn, %{message: "Upload successful", image_url: image_url, cloudinary_response: response_map})

      # some error response
      {:ok, %HTTPoison.Response{status_code: code, body: res_body}} ->
        {:ok, response_map} = Jason.decode(res_body)
        json(conn, %{error: "Upload failed", status_code: code, cloudinary_response: response_map})

      # totally error response
      {:error, error} ->
        json(conn, %{
          error: "Upload failed",
          details: inspect(error)
        })
    end

  end
```
