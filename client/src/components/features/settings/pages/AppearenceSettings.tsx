import { Switch } from "@/components/ui/Switch";
import { useTheme } from "@/hooks/useTheme";
import { SettingsBlock } from "../components/SettingsBlock";

export const AppearenceSettings = () => {
    const { isDarkTheme, setIsDarkTheme } = useTheme();

    return (
        <SettingsBlock title="Aparência" description="Personalize a aparência do aplicativo.">
            <div className="mt-4 flex items-center justify-between">
                <div>
                    <h4 className="font-medium">Modo Escuro</h4>
                    <p className="text-subtitle text-sm">
                        Ative o modo escuro para reduzir o cansaço visual.
                    </p>
                </div>
                <Switch checked={isDarkTheme} onChange={setIsDarkTheme} />
            </div>
        </SettingsBlock>
    );
};
