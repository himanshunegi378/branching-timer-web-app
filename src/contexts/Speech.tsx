import { createContext, PropsWithChildren, useCallback, useContext } from "react";
//@ts-ignore
import { useSpeechSynthesis } from 'react-speech-kit';

type speakType = { text: string };

type contextType = {
    speak: (options: speakType) => void;
}

const context = createContext<contextType>({ speak: () => { } });

export function SpeechProvider({ children }: PropsWithChildren<{}>) {
    const { speak, cancel, speaking, supported } = useSpeechSynthesis();

    const handleSpeak = useCallback((options: speakType) => {
        if (!supported) {
            return;
        }
        if (speaking) {
            cancel();
        }
        speak(options);
    }, [cancel, speak, speaking, supported]);

    return (
        <context.Provider value={{ speak: handleSpeak }}>
            {children}
        </context.Provider>
    );
}

export function useSpeech() {
    const { speak } = useContext(context);
    return speak;
}
