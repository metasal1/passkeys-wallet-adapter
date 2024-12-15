"use client";

import React, { useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { createWallet } from '@passkeys/core';
import { WalletProvider as PasskeysWalletProvider } from '@passkeys/react';
// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";

// imports here

export default function AppWalletProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallet = createWallet({
        appId: '38268374-86a8-4d21-8caf-f350a8ff62ab', // Only required for production, contact us to get yours.
        providers: {
            solana: true,
        },
    });

    const wallets = useMemo(
        () => [
            // manually add any legacy wallet adapters here
            // new UnsafeBurnerWalletAdapter(),
        ],
        [network],
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <PasskeysWalletProvider wallet={wallet}>
                <WalletProvider wallets={wallets}>
                    <WalletModalProvider>
                        {children}
                    </WalletModalProvider>
                </WalletProvider>
            </PasskeysWalletProvider>
        </ConnectionProvider>
    );
}
