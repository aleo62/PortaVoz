export const portaVozLogo = (isDarkTheme: boolean, simple?: boolean) =>
    isDarkTheme
        ? simple
            ? "https://res.cloudinary.com/di5bma0gm/image/upload/v1762799471/logo-2-dark-mode_pkbqc9.png"
            : "https://res.cloudinary.com/di5bma0gm/image/upload/v1761170904/logo-dark-mode.png"
        : simple
          ? "https://res.cloudinary.com/di5bma0gm/image/upload/v1762799472/logo-2-white-mode_dt55vo.png"
          : "https://res.cloudinary.com/di5bma0gm/image/upload/v1761170938/logo-light-mode.png";
