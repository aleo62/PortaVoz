import { Server } from "@/api/Server";
import { ModalDefaultProps, useModal } from "@/contexts/ModalContext";
import { ModalProvider } from "@/contexts/ModalProvider";
import { useStoreUser } from "@/stores/userStore";
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type ReportLimitModalProps = ModalDefaultProps & {
    remainingReports?: number;
    resetAt?: Date | string;
};

const formatDuration = (milliseconds: number | null) => {
    if (milliseconds === null) return "—";
    if (milliseconds <= 0) return "00:00:00";

    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const hh = String(hours).padStart(2, "0");
    const mm = String(minutes).padStart(2, "0");
    const ss = String(seconds).padStart(2, "0");

    return days > 0 ? `${days}d ${hh}:${mm}:${ss}` : `${hh}:${mm}:${ss}`;
};

export const ReportLimitModal = ({
    zIndex,
    remainingReports = 0,
    resetAt,
}: ReportLimitModalProps) => {
    const { closeModal } = useModal();
    const { user, updateUser } = useStoreUser();
    const resetAtDate = useMemo(() => (resetAt ? new Date(resetAt) : null), [resetAt]);
    const [timeLeft, setTimeLeft] = useState(() =>
        formatDuration(resetAtDate ? resetAtDate.getTime() - Date.now() : null),
    );
    const [isRefreshing, setIsRefreshing] = useState(false);
    const hasReloadedRef = useRef(false);

    const getMillisecondsUntilReset = useCallback(() => {
        if (!resetAtDate) return null;
        return resetAtDate.getTime() - Date.now();
    }, [resetAtDate]);

    const refreshUserLimits = useCallback(async () => {
        if (!user?._id || !user.meta) return;

        setIsRefreshing(true);
        try {
            const data = await Server.getRemainingReports(user._id);

            updateUser({
                meta: {
                    ...user.meta,
                    limits: {
                        ...user.meta.limits,
                        remainingReports: data.remaining,
                        reportsResetAt: data.resetAt,
                        totalReports: user.meta.limits.totalReports,
                    },
                },
            });
        } catch (error) {
            console.error("Erro ao atualizar limites de denúncias/posts:", error);
        } finally {
            setIsRefreshing(false);
        }
    }, [updateUser, user]);

    useEffect(() => {
        const updateTimer = () => {
            const ms = getMillisecondsUntilReset();
            if (ms === null) {
                setTimeLeft("—");
                return;
            }

            if (ms <= 0) {
                setTimeLeft("00:00:00");
                if (!hasReloadedRef.current) {
                    hasReloadedRef.current = true;
                    refreshUserLimits();
                }
                return;
            }

            setTimeLeft(formatDuration(ms));
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [getMillisecondsUntilReset, refreshUserLimits]);

    useEffect(() => {
        if ((user?.meta?.limits?.remainingReports ?? 0) > 0) {
            closeModal();
        }
    }, [closeModal, user?.meta?.limits?.remainingReports]);

    return (
        <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="my-auto h-fit w-full max-w-[97%] rounded-2xl bg-white pb-6 shadow-xl lg:max-w-lg dark:bg-zinc-900"
            style={{ zIndex }}
            onClick={(e) => e.stopPropagation()}
        >
            <header className="flex items-center justify-between border-b border-zinc-200 px-6 py-5 dark:border-zinc-800">
                <div>
                    <p className="text-sm text-red-500">Limite atingido</p>
                    <h3 className="font-title text-xl lg:text-2xl text-title">Você não pode postar agora</h3>
                </div>
                <ModalProvider.Close />
            </header>

            <main className="flex flex-col gap-5 px-6  py-5">
                <p className="text-subtitle text-sm leading-relaxed">
                    Você atingiu o limite de postagens/denúncias disponíveis. Aguarde o próximo
                    ciclo para tentar novamente. Recarregaremos suas permissões automaticamente
                    quando o tempo zerar.
                </p>

                <div className="grid grid-cols-1 gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm lg:grid-cols-2 dark:border-zinc-800 dark:bg-zinc-900/60">
                    <div className="flex flex-col gap-1">
                        <span className="text-subtitle">Postagens/denúncias restantes</span>
                        <strong className="text-title text-2xl font-semibold">
                            {remainingReports}
                        </strong>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-subtitle">Novo ciclo em</span>
                        <strong className="text-title text-2xl font-semibold">{timeLeft}</strong>
                        {resetAtDate && (
                            <span className="text-subtitle text-xs">
                                Limite reinicia em {resetAtDate.toLocaleString()}
                            </span>
                        )}
                        {isRefreshing && (
                            <span className="text-xs text-blue-500">
                                Recarregando permissões...
                            </span>
                        )}
                    </div>
                </div>

                <p className="text-subtitle text-xs">
                    Se preferir, você pode fechar esta janela e voltar mais tarde. Assim que o tempo
                    zerar, atualizaremos automaticamente seu usuário para liberar novos envios.
                </p>
            </main>
        </motion.div>
    );
};
