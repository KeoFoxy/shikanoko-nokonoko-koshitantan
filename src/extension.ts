import * as vscode from 'vscode';
import { GifViewProvider } from './gifViewProvider';

export function activate(context: vscode.ExtensionContext) {
    const provider = new GifViewProvider(context.extensionUri);

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(GifViewProvider.viewType, provider)
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('shikanoko-nokonoko-koshitantan.showGifView', () => {
            vscode.window.showInformationMessage('GIF View command executed.');
        })
    );
}

export function deactivate() {}
