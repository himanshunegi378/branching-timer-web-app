import { ReactNode } from "react";
import React from "react";
import SoundPlayerContext from "../contexts/SoundPlayerContext";

type Props = {
    children: ReactNode;
};
export default function SoundPlayerProvider(props: Props) {
    const { children } = props
    return (
        <SoundPlayerContext.Provider value={'Himanshu'}>
            {children}
        </SoundPlayerContext.Provider>
    );
}